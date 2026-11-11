/**
 * Reducing-balance (amortizing) loan math: EMI, the amortization schedule, and the loan amount a
 * given EMI budget supports. This is the standard formula Indian lenders use for EMI calculators,
 * e.g. Tata Capital's own worked formula: EMI = [P x R x (1 + R)^N] / [(1 + R)^N - 1],
 * https://www.tatacapital.com/personal-loan/emi-calculator.html, checked 11 Nov 2026.
 */

export interface EmiResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

/** Monthly EMI for a reducing-balance loan. `annualRate` is a percent, e.g. 9.5 for 9.5%. */
export function emi(principal: number, annualRate: number, months: number): EmiResult {
  if (principal <= 0 || months <= 0) {
    return { emi: 0, totalInterest: 0, totalPayment: 0 };
  }
  if (annualRate <= 0) {
    const flat = principal / months;
    return { emi: flat, totalInterest: 0, totalPayment: principal };
  }
  const r = annualRate / 12 / 100;
  const factor = Math.pow(1 + r, months);
  const payment = (principal * r * factor) / (factor - 1);
  return { emi: payment, totalInterest: payment * months - principal, totalPayment: payment * months };
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

/** Month-by-month principal/interest split. The last row clears the balance exactly to zero. */
export function amortizationSchedule(
  principalAmt: number,
  annualRate: number,
  months: number,
): AmortizationRow[] {
  if (principalAmt <= 0 || months <= 0) {
    return [];
  }
  const { emi: payment } = emi(principalAmt, annualRate, months);
  const r = annualRate / 12 / 100;
  let balance = principalAmt;
  const rows: AmortizationRow[] = [];
  for (let m = 1; m <= months; m++) {
    const interest = balance * r;
    let principalPaid = payment - interest;
    if (m === months || principalPaid > balance) {
      principalPaid = balance;
    }
    balance = Math.max(0, balance - principalPaid);
    rows.push({ month: m, payment: principalPaid + interest, principal: principalPaid, interest, balance });
  }
  return rows;
}

export interface YearlyRow {
  year: number;
  principal: number;
  interest: number;
  balance: number;
}

/** Yearly roll-up of an amortization schedule, for a readable summary table. */
export function yearlySchedule(rows: AmortizationRow[]): YearlyRow[] {
  const years: YearlyRow[] = [];
  for (let i = 0; i < rows.length; i += 12) {
    const chunk = rows.slice(i, i + 12);
    const last = chunk[chunk.length - 1];
    if (!last) {
      continue;
    }
    years.push({
      year: years.length + 1,
      principal: chunk.reduce((s, r) => s + r.principal, 0),
      interest: chunk.reduce((s, r) => s + r.interest, 0),
      balance: last.balance,
    });
  }
  return years;
}

/** The loan principal a given monthly EMI budget supports, at a rate and term. The inverse of emi(). */
export function maxLoanAmount(affordableEmi: number, annualRate: number, months: number): number {
  if (affordableEmi <= 0 || months <= 0) {
    return 0;
  }
  if (annualRate <= 0) {
    return affordableEmi * months;
  }
  const r = annualRate / 12 / 100;
  const factor = Math.pow(1 + r, months);
  return (affordableEmi * (factor - 1)) / (r * factor);
}

export interface EligibilityResult {
  affordableEmi: number;
  maxLoan: number;
}

/**
 * Loan eligibility from income. Lenders typically cap total EMIs (new loan plus existing ones) at
 * 40-50% of net monthly income, the Fixed Obligation to Income Ratio (FOIR); this is a widely used
 * industry rule of thumb, not a fixed regulatory figure, so the FOIR here is adjustable.
 */
export function loanEligibility(
  monthlyIncome: number,
  existingEmis: number,
  foirPercent: number,
  annualRate: number,
  months: number,
): EligibilityResult {
  const affordableEmi = Math.max(0, (monthlyIncome * foirPercent) / 100 - existingEmis);
  return { affordableEmi, maxLoan: maxLoanAmount(affordableEmi, annualRate, months) };
}
