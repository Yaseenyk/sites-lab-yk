import { describe, expect, it } from "vitest";
import { incomeTax, type IncomeTaxInput } from "./incomeTaxIndia";

const base: IncomeTaxInput = {
  annualIncome: 0,
  regime: "new",
  isSalaried: false,
  age: "below60",
  section80C: 0,
  section80D: 0,
};

describe("incomeTax, new regime (PIB's own worked claims, Union Budget 2025-26)", () => {
  it("a non-salaried taxable income of exactly 12,00,000 owes zero tax", () => {
    const r = incomeTax({ ...base, annualIncome: 1_200_000 });
    expect(r.taxBeforeRebate).toBeCloseTo(60_000, 6);
    expect(r.rebate).toBeCloseTo(60_000, 6);
    expect(r.totalTax).toBe(0);
  });

  it("a salaried gross of 12,75,000 is also tax-free, via the 75,000 standard deduction", () => {
    const r = incomeTax({ ...base, annualIncome: 1_275_000, isSalaried: true });
    expect(r.taxableIncome).toBeCloseTo(1_200_000, 6);
    expect(r.totalTax).toBe(0);
  });

  it("16,00,000 taxable: 1,20,000 tax before rebate, no rebate, plus 4% cess", () => {
    const r = incomeTax({ ...base, annualIncome: 1_600_000 });
    expect(r.taxBeforeRebate).toBeCloseTo(120_000, 6);
    expect(r.rebate).toBe(0);
    expect(r.cess).toBeCloseTo(4_800, 6);
    expect(r.totalTax).toBeCloseTo(124_800, 6);
  });

  it("zero income owes zero tax", () => {
    expect(incomeTax(base).totalTax).toBe(0);
  });
});

describe("incomeTax, the worked examples on the calculator page", () => {
  const salaried = { ...base, isSalaried: true };

  it("15,00,000 salary, new regime: 14,25,000 taxable, 93,750 slab tax, 97,500 total", () => {
    const r = incomeTax({ ...salaried, annualIncome: 1_500_000 });
    expect(r.taxableIncome).toBeCloseTo(1_425_000, 6);
    expect(r.taxBeforeRebate).toBeCloseTo(93_750, 6);
    expect(r.rebate).toBe(0);
    expect(r.cess).toBeCloseTo(3_750, 6);
    expect(r.totalTax).toBeCloseTo(97_500, 6);
    expect(r.effectiveRate.toFixed(1)).toBe("6.5");
  });

  it("15,00,000 salary, old regime with full 80C and 80D: 12,75,000 taxable, 2,02,800 total", () => {
    const r = incomeTax({
      ...salaried,
      regime: "old",
      annualIncome: 1_500_000,
      section80C: 150_000,
      section80D: 25_000,
    });
    expect(r.taxableIncome).toBeCloseTo(1_275_000, 6);
    expect(r.taxBeforeRebate).toBeCloseTo(195_000, 6);
    expect(r.cess).toBeCloseTo(7_800, 6);
    expect(r.totalTax).toBeCloseTo(202_800, 6);
    expect(r.effectiveRate.toFixed(1)).toBe("13.5");
  });

  it("old-regime break-even at 15,00,000: taxable 9,06,250 has the same slab tax as the new regime", () => {
    const old = incomeTax({ ...base, regime: "old", annualIncome: 906_250 });
    expect(old.taxBeforeRebate).toBeCloseTo(93_750, 6);
  });

  it("13,00,000 salary, new regime: just over the rebate line, 66,300 before marginal relief", () => {
    const r = incomeTax({ ...salaried, annualIncome: 1_300_000 });
    expect(r.taxableIncome).toBeCloseTo(1_225_000, 6);
    expect(r.taxBeforeRebate).toBeCloseTo(63_750, 6);
    expect(r.rebate).toBe(0);
    expect(r.cess).toBeCloseTo(2_550, 6);
    expect(r.totalTax).toBeCloseTo(66_300, 6);
  });
});

describe("incomeTax, old regime", () => {
  it("a below-60 taxable income of exactly 5,00,000 owes zero tax via the 87A rebate", () => {
    const r = incomeTax({ ...base, regime: "old", annualIncome: 500_000 });
    expect(r.taxBeforeRebate).toBeCloseTo(12_500, 6);
    expect(r.totalTax).toBe(0);
  });

  it("a senior citizen's exemption is 3,00,000, not 2,50,000", () => {
    const belowSixty = incomeTax({ ...base, regime: "old", annualIncome: 300_000 });
    const senior = incomeTax({ ...base, regime: "old", annualIncome: 300_000, age: "senior" });
    expect(belowSixty.taxBeforeRebate).toBeGreaterThan(0);
    expect(senior.taxBeforeRebate).toBe(0);
  });

  it("Section 80C and 80D lower taxable income, each capped", () => {
    const r = incomeTax({
      ...base,
      regime: "old",
      annualIncome: 800_000,
      section80C: 200_000,
      section80D: 40_000,
    });
    expect(r.chapterVIA).toBe(150_000 + 25_000);
    expect(r.taxableIncome).toBeCloseTo(800_000 - 175_000, 6);
  });

  it("a salaried old-regime filer gets the 50,000 standard deduction", () => {
    const r = incomeTax({ ...base, regime: "old", annualIncome: 550_000, isSalaried: true });
    expect(r.standardDeduction).toBe(50_000);
    expect(r.taxableIncome).toBeCloseTo(500_000, 6);
  });
});
