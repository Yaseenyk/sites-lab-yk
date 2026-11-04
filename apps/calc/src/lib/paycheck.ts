/**
 * US take-home pay estimate for tax year 2026 (the figures withheld from pay in 2026).
 *
 * Sources, all checked 4 Nov 2026:
 * - Federal brackets and standard deduction: IRS Rev. Proc. 2025-32, section 4 (tables 1-3 and 4.14),
 *   https://www.irs.gov/pub/irs-drop/rp-25-32.pdf, and the IRS announcement of 2026 adjustments,
 *   https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill
 * - Social Security wage base $184,500: SSA, https://www.ssa.gov/oact/cola/cbb.html
 * - Social Security 6.2%, Medicare 1.45% and Additional Medicare 0.9% over $200,000: IRS Topic 751 and 560,
 *   https://www.irs.gov/taxtopics/tc751
 *
 * It is an estimate of annual liability spread evenly over the pay periods. Real withholding follows the
 * employee's Form W-4 and IRS Publication 15-T, so a paycheck can differ by a few dollars.
 */

export const TAX_YEAR = 2026;

export type FilingStatus = "single" | "married" | "head";

export const FILING_LABEL: Record<FilingStatus, string> = {
  single: "Single or married filing separately",
  married: "Married filing jointly",
  head: "Head of household",
};

interface Bracket {
  /** Top of the bracket in taxable dollars; Infinity for the last one. */
  upTo: number;
  rate: number;
}

const RATES = [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];
const bracketsOf = (tops: number[]): Bracket[] =>
  RATES.map((rate, i) => ({ upTo: tops[i] ?? Infinity, rate }));

export const BRACKETS: Record<FilingStatus, Bracket[]> = {
  single: bracketsOf([12_400, 50_400, 105_700, 201_775, 256_225, 640_600]),
  married: bracketsOf([24_800, 100_800, 211_400, 403_550, 512_450, 768_700]),
  head: bracketsOf([17_700, 67_450, 105_700, 201_750, 256_200, 640_600]),
};

export const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 16_100,
  married: 32_200,
  head: 24_150,
};

export const SS_RATE = 0.062;
export const SS_WAGE_BASE = 184_500;
export const MEDICARE_RATE = 0.0145;
export const ADDITIONAL_MEDICARE_RATE = 0.009;
export const ADDITIONAL_MEDICARE_THRESHOLD = 200_000;

export const FREQUENCIES = ["weekly", "biweekly", "semimonthly", "monthly"] as const;
export type Frequency = (typeof FREQUENCIES)[number];

export const PERIODS_PER_YEAR: Record<Frequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

export const FREQUENCY_LABEL: Record<Frequency, string> = {
  weekly: "Weekly",
  biweekly: "Every 2 weeks",
  semimonthly: "Twice a month",
  monthly: "Monthly",
};

/** Income tax on `taxable` dollars of taxable income, and the rate of the bracket its last dollar falls in. */
export function federalTax(taxable: number, status: FilingStatus): { tax: number; marginal: number } {
  let tax = 0;
  let floor = 0;
  let marginal = BRACKETS[status][0]?.rate ?? 0;
  for (const b of BRACKETS[status]) {
    if (taxable <= floor) {
      break;
    }
    tax += (Math.min(taxable, b.upTo) - floor) * b.rate;
    marginal = b.rate;
    floor = b.upTo;
  }
  return { tax, marginal };
}

export interface PaycheckInput {
  /** Gross pay for the year, before anything is taken out. */
  annualGross: number;
  periodsPerYear: number;
  status: FilingStatus;
  /** Yearly pre-tax retirement contributions (401(k), 403(b)): cut income tax, not Social Security or Medicare. */
  retirement: number;
  /** Yearly pre-tax benefits (health premiums, HSA/FSA through payroll): cut income tax and FICA. */
  benefits: number;
  /** Yearly deductions taken after tax (Roth 401(k), union dues, garnishments). */
  afterTax: number;
  /** State and local income tax as a flat percent of taxable wages. */
  statePercent: number;
}

export interface Paycheck {
  annual: PaycheckLines;
  perPeriod: PaycheckLines;
  /** Federal bracket of the last taxable dollar. */
  marginalRate: number;
  /** Share of gross pay that does not reach the employee. */
  deductionShare: number;
  federalTaxable: number;
}

export interface PaycheckLines {
  gross: number;
  retirement: number;
  benefits: number;
  federal: number;
  socialSecurity: number;
  medicare: number;
  state: number;
  afterTax: number;
  net: number;
}

export function paycheck(i: PaycheckInput): Paycheck {
  const gross = i.annualGross;
  const ficaWages = Math.max(0, gross - i.benefits);
  const incomeWages = Math.max(0, gross - i.benefits - i.retirement);
  const federalTaxable = Math.max(0, incomeWages - STANDARD_DEDUCTION[i.status]);
  const fed = federalTax(federalTaxable, i.status);
  const socialSecurity = SS_RATE * Math.min(ficaWages, SS_WAGE_BASE);
  const medicare =
    MEDICARE_RATE * ficaWages +
    ADDITIONAL_MEDICARE_RATE * Math.max(0, ficaWages - ADDITIONAL_MEDICARE_THRESHOLD);
  const state = (i.statePercent / 100) * incomeWages;
  const net = gross - i.benefits - i.retirement - fed.tax - socialSecurity - medicare - state - i.afterTax;
  const annual: PaycheckLines = {
    gross,
    retirement: i.retirement,
    benefits: i.benefits,
    federal: fed.tax,
    socialSecurity,
    medicare,
    state,
    afterTax: i.afterTax,
    net,
  };
  const n = i.periodsPerYear;
  const perPeriod = Object.fromEntries(
    Object.entries(annual).map(([k, v]) => [k, v / n]),
  ) as unknown as PaycheckLines;
  return {
    annual,
    perPeriod,
    marginalRate: fed.marginal,
    deductionShare: gross > 0 ? 1 - net / gross : 0,
    federalTaxable,
  };
}
