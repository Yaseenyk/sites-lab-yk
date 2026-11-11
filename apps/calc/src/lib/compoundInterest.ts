/** Standard compound interest: A = P(1 + r/n)^(nt). */

export interface CompoundResult {
  principal: number;
  totalInterest: number;
  maturityValue: number;
}

export function compoundInterest(
  principal: number,
  annualRatePercent: number,
  years: number,
  periodsPerYear: number,
): CompoundResult {
  if (principal <= 0 || years <= 0 || periodsPerYear <= 0) {
    return { principal, totalInterest: 0, maturityValue: principal };
  }
  const r = annualRatePercent / 100 / periodsPerYear;
  const n = periodsPerYear * years;
  const maturityValue = principal * Math.pow(1 + r, n);
  return { principal, totalInterest: maturityValue - principal, maturityValue };
}

export interface CompoundYearRow {
  year: number;
  value: number;
  interestThisYear: number;
}

/** Maturity value at the end of each year, for a growth table. */
export function compoundYearlyGrowth(
  principal: number,
  annualRatePercent: number,
  years: number,
  periodsPerYear: number,
): CompoundYearRow[] {
  const total = Math.round(years);
  const rows: CompoundYearRow[] = [];
  let prev = principal;
  for (let y = 1; y <= total; y++) {
    const { maturityValue } = compoundInterest(principal, annualRatePercent, y, periodsPerYear);
    rows.push({ year: y, value: maturityValue, interestThisYear: maturityValue - prev });
    prev = maturityValue;
  }
  return rows;
}
