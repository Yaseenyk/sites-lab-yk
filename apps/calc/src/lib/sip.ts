/**
 * SIP (systematic investment plan) future value math: a fixed amount invested at the start of
 * each month, compounding monthly. This "annuity due" form matches the formula Indian SIP
 * calculators publish, e.g. Groww's: FV = P x [((1+i)^n - 1) / i] x (1+i),
 * https://groww.in/calculators/sip-calculator, checked 11 Nov 2026.
 *
 * The return rate you enter is an assumption, not a guarantee: mutual fund returns are market-
 * linked and the actual result will differ from this projection.
 */

export interface SipResult {
  investedAmount: number;
  futureValue: number;
  estimatedReturns: number;
}

export function sipFutureValue(monthlyAmount: number, annualReturnPercent: number, years: number): SipResult {
  const n = Math.round(years * 12);
  const investedAmount = monthlyAmount > 0 ? monthlyAmount * n : 0;
  if (monthlyAmount <= 0 || n <= 0) {
    return { investedAmount, futureValue: 0, estimatedReturns: 0 };
  }
  const i = annualReturnPercent / 12 / 100;
  const futureValue = i === 0 ? investedAmount : monthlyAmount * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  return { investedAmount, futureValue, estimatedReturns: futureValue - investedAmount };
}

export interface SipYearRow {
  year: number;
  invested: number;
  value: number;
}

/** Invested amount and projected value at the end of each year, for a growth table. */
export function sipYearlyGrowth(
  monthlyAmount: number,
  annualReturnPercent: number,
  years: number,
): SipYearRow[] {
  const total = Math.round(years);
  const rows: SipYearRow[] = [];
  for (let y = 1; y <= total; y++) {
    const r = sipFutureValue(monthlyAmount, annualReturnPercent, y);
    rows.push({ year: y, invested: r.investedAmount, value: r.futureValue });
  }
  return rows;
}
