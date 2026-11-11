/**
 * India personal income tax estimate for FY 2026-27 (AY 2027-28).
 *
 * Sources, checked 11 Nov 2026:
 * - New regime slabs, the ₹75,000 standard deduction for salaried taxpayers, and the Section 87A
 *   rebate that zeroes tax up to ₹12,00,000 taxable income (₹12,75,000 gross for salaried): PIB,
 *   Union Budget 2025-26, "No Income Tax On Annual Income Upto Rs. 12 Lakh Under New Tax Regime",
 *   https://www.pib.gov.in/PressReleasePage.aspx?PRID=2098406, 1 Feb 2025.
 * - Unchanged for FY 2026-27: Union Budget 2026-27 made no change to income tax slabs or
 *   deductions — ClearTax, "Income Tax Slabs FY 2025-26 & FY 2026-27",
 *   https://cleartax.in/s/income-tax-slabs ("The Union Budget 2026 does not affect the taxation
 *   of salaried individuals for FY 2026-27. The prevailing slab rates, deductions and rebates
 *   apply without change."); the Income Tax Department's own tax-rates page also lists one rate
 *   table covering both AY 2025-26 and AY 2026-27, https://www.incometaxindia.gov.in/tax-rates.
 * - Old regime slabs (exemption of ₹2.5 lakh / ₹3 lakh / ₹5 lakh by age), its ₹50,000 salaried
 *   standard deduction, and its Section 87A rebate up to ₹5,00,000 taxable income: ClearTax, same
 *   page.
 * - Health and Education Cess, 4% of tax after rebate: Finance Bill 2026 memorandum,
 *   https://www.incometaxindia.gov.in/documents/81799/11848482/memo-2026.pdf, 2 Feb 2026.
 *
 * This is an estimate, not a filing. It leaves out surcharge on incomes above ₹50 lakh, marginal
 * relief just above the two rebate thresholds, special rates for capital gains and similar income,
 * and old-regime deductions beyond Sections 80C and 80D.
 */

export const TAX_YEAR_LABEL = "FY 2026-27 (AY 2027-28)";

export type Regime = "new" | "old";
export type AgeBand = "below60" | "senior" | "superSenior";

export const AGE_LABEL: Record<AgeBand, string> = {
  below60: "Below 60",
  senior: "60 to 79 (senior citizen)",
  superSenior: "80 and above (super senior citizen)",
};

interface Bracket {
  upTo: number;
  rate: number;
}

const NEW_BRACKETS: Bracket[] = [
  { upTo: 400_000, rate: 0 },
  { upTo: 800_000, rate: 0.05 },
  { upTo: 1_200_000, rate: 0.1 },
  { upTo: 1_600_000, rate: 0.15 },
  { upTo: 2_000_000, rate: 0.2 },
  { upTo: 2_400_000, rate: 0.25 },
  { upTo: Infinity, rate: 0.3 },
];

const OLD_EXEMPTION: Record<AgeBand, number> = {
  below60: 250_000,
  senior: 300_000,
  superSenior: 500_000,
};

function oldBrackets(age: AgeBand): Bracket[] {
  return [
    { upTo: OLD_EXEMPTION[age], rate: 0 },
    { upTo: 500_000, rate: 0.05 },
    { upTo: 1_000_000, rate: 0.2 },
    { upTo: Infinity, rate: 0.3 },
  ];
}

export const NEW_STANDARD_DEDUCTION = 75_000;
export const OLD_STANDARD_DEDUCTION = 50_000;
export const SECTION_80C_CAP = 150_000;
export const SECTION_80D_CAP = 25_000;
export const CESS_RATE = 0.04;
const NEW_REBATE_THRESHOLD = 1_200_000;
const NEW_REBATE_CAP = 60_000;
const OLD_REBATE_THRESHOLD = 500_000;
const OLD_REBATE_CAP = 12_500;

function taxFromBrackets(taxable: number, brackets: Bracket[]): number {
  let tax = 0;
  let floor = 0;
  for (const b of brackets) {
    if (taxable <= floor) {
      break;
    }
    tax += (Math.min(taxable, b.upTo) - floor) * b.rate;
    floor = b.upTo;
  }
  return tax;
}

export interface IncomeTaxInput {
  annualIncome: number;
  regime: Regime;
  isSalaried: boolean;
  age: AgeBand;
  /** Old regime only. Section 80C (investments such as PF, ELSS, life insurance) and Section 80D (health insurance). */
  section80C: number;
  section80D: number;
}

export interface IncomeTaxResult {
  grossIncome: number;
  standardDeduction: number;
  chapterVIA: number;
  taxableIncome: number;
  taxBeforeRebate: number;
  rebate: number;
  cess: number;
  totalTax: number;
  takeHome: number;
  effectiveRate: number;
}

export function incomeTax(i: IncomeTaxInput): IncomeTaxResult {
  const gross = Math.max(0, i.annualIncome);
  const standardDeduction = i.isSalaried ? (i.regime === "new" ? NEW_STANDARD_DEDUCTION : OLD_STANDARD_DEDUCTION) : 0;
  const chapterVIA =
    i.regime === "old"
      ? Math.min(Math.max(0, i.section80C), SECTION_80C_CAP) + Math.min(Math.max(0, i.section80D), SECTION_80D_CAP)
      : 0;
  const taxableIncome = Math.max(0, gross - standardDeduction - chapterVIA);
  const brackets = i.regime === "new" ? NEW_BRACKETS : oldBrackets(i.age);
  const taxBeforeRebate = taxFromBrackets(taxableIncome, brackets);
  const rebateThreshold = i.regime === "new" ? NEW_REBATE_THRESHOLD : OLD_REBATE_THRESHOLD;
  const rebateCap = i.regime === "new" ? NEW_REBATE_CAP : OLD_REBATE_CAP;
  const rebate = taxableIncome <= rebateThreshold ? Math.min(taxBeforeRebate, rebateCap) : 0;
  const taxAfterRebate = Math.max(0, taxBeforeRebate - rebate);
  const cess = taxAfterRebate * CESS_RATE;
  const totalTax = taxAfterRebate + cess;
  return {
    grossIncome: gross,
    standardDeduction,
    chapterVIA,
    taxableIncome,
    taxBeforeRebate,
    rebate,
    cess,
    totalTax,
    takeHome: gross - totalTax,
    effectiveRate: gross > 0 ? (totalTax / gross) * 100 : 0,
  };
}
