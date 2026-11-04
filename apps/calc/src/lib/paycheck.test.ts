import { describe, expect, it } from "vitest";
import { BRACKETS, federalTax, paycheck, type PaycheckInput } from "./paycheck";

const base: PaycheckInput = {
  annualGross: 60_000,
  periodsPerYear: 26,
  status: "single",
  retirement: 0,
  benefits: 0,
  afterTax: 0,
  statePercent: 0,
};

describe("federalTax (2026 tables, worked by hand)", () => {
  it("is zero with no taxable income", () => {
    expect(federalTax(0, "single").tax).toBe(0);
  });

  it("single: 10% to $12,400, then 12%", () => {
    expect(federalTax(12_400, "single").tax).toBeCloseTo(1_240, 6);
    expect(federalTax(43_900, "single").tax).toBeCloseTo(1_240 + 0.12 * 31_500, 6);
    expect(federalTax(43_900, "single").marginal).toBe(0.12);
  });

  it("married filing jointly: $67,800 taxable", () => {
    expect(federalTax(67_800, "married").tax).toBeCloseTo(2_480 + 0.12 * 43_000, 6);
  });

  it("head of household: $55,850 taxable", () => {
    expect(federalTax(55_850, "head").tax).toBeCloseTo(1_770 + 0.12 * 38_150, 6);
  });

  it("matches the IRS 'plus' amount at every bracket boundary", () => {
    // Rev. Proc. 2025-32, tables 1-3: the dollar amount the IRS prints for the start of each bracket.
    const irs = {
      single: [1_240, 5_800, 17_966, 41_024, 58_448, 192_979.25],
      head: [1_770, 7_740, 16_155, 39_207, 56_631, 191_171],
      married: [2_480, 11_600, 35_932, 82_048, 116_896, 206_583.5],
    } as const;
    for (const status of ["single", "head", "married"] as const) {
      BRACKETS[status].slice(0, 6).forEach((b, i) => {
        expect(federalTax(b.upTo, status).tax).toBeCloseTo(irs[status][i]!, 2);
      });
    }
  });

  it("the top bracket is 37%", () => {
    expect(federalTax(1_000_000, "single").marginal).toBe(0.37);
  });
});

describe("paycheck", () => {
  it("$60,000 single: federal $5,020, Social Security $3,720, Medicare $870", () => {
    const p = paycheck(base);
    expect(p.annual.federal).toBeCloseTo(5_020, 6);
    expect(p.annual.socialSecurity).toBeCloseTo(3_720, 6);
    expect(p.annual.medicare).toBeCloseTo(870, 6);
    expect(p.annual.net).toBeCloseTo(50_390, 6);
    expect(p.perPeriod.net).toBeCloseTo(50_390 / 26, 6);
    expect(p.marginalRate).toBe(0.12);
  });

  it("caps Social Security at the wage base and adds the 0.9% Medicare surtax over $200,000", () => {
    const p = paycheck({ ...base, annualGross: 250_000 });
    expect(p.annual.socialSecurity).toBeCloseTo(11_439, 6);
    expect(p.annual.medicare).toBeCloseTo(0.0145 * 250_000 + 0.009 * 50_000, 6);
    expect(p.annual.federal).toBeCloseTo(51_304, 6);
    expect(p.marginalRate).toBe(0.32);
  });

  it("401(k) lowers income tax but not Social Security or Medicare", () => {
    const p = paycheck({ ...base, retirement: 6_000 });
    expect(p.annual.socialSecurity).toBeCloseTo(3_720, 6);
    expect(p.annual.medicare).toBeCloseTo(870, 6);
    expect(p.annual.federal).toBeCloseTo(1_240 + 0.12 * (60_000 - 6_000 - 16_100 - 12_400), 6);
    expect(p.annual.net).toBeCloseTo(60_000 - 6_000 - p.annual.federal - 3_720 - 870, 6);
  });

  it("health benefits lower FICA as well", () => {
    const p = paycheck({ ...base, benefits: 3_000 });
    expect(p.annual.socialSecurity).toBeCloseTo(0.062 * 57_000, 6);
    expect(p.annual.medicare).toBeCloseTo(0.0145 * 57_000, 6);
  });

  it("applies the state percent to wages after pre-tax deductions, and after-tax deductions last", () => {
    const p = paycheck({ ...base, retirement: 5_000, statePercent: 4, afterTax: 1_200 });
    expect(p.annual.state).toBeCloseTo(0.04 * 55_000, 6);
    expect(p.annual.afterTax).toBe(1_200);
    expect(p.annual.net).toBeCloseTo(
      60_000 -
        5_000 -
        p.annual.federal -
        p.annual.socialSecurity -
        p.annual.medicare -
        p.annual.state -
        1_200,
      6,
    );
  });

  it("owes no income tax under the standard deduction but still pays FICA", () => {
    const p = paycheck({ ...base, annualGross: 15_000 });
    expect(p.annual.federal).toBe(0);
    expect(p.annual.socialSecurity).toBeCloseTo(930, 6);
  });

  it("handles zero pay without dividing by zero", () => {
    const p = paycheck({ ...base, annualGross: 0 });
    expect(p.annual.net).toBe(0);
    expect(p.deductionShare).toBe(0);
  });

  it("splits evenly across the periods", () => {
    const p = paycheck({ ...base, periodsPerYear: 12 });
    expect(p.perPeriod.gross).toBe(5_000);
  });
});
