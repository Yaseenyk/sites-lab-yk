import { describe, expect, it } from "vitest";
import { compoundInterest, compoundYearlyGrowth } from "./compoundInterest";

describe("compoundInterest", () => {
  it("matches the textbook example: 10,000 at 10% annually for 2 years = 12,100", () => {
    const r = compoundInterest(10_000, 10, 2, 1);
    expect(r.maturityValue).toBeCloseTo(12_100, 6);
    expect(r.totalInterest).toBeCloseTo(2_100, 6);
  });

  it("more compounding periods a year yields more than annual compounding", () => {
    const annual = compoundInterest(10_000, 10, 5, 1).maturityValue;
    const monthly = compoundInterest(10_000, 10, 5, 12).maturityValue;
    expect(monthly).toBeGreaterThan(annual);
  });

  it("returns just the principal for a non-positive principal, term or frequency", () => {
    expect(compoundInterest(0, 10, 5, 1).maturityValue).toBe(0);
    expect(compoundInterest(10_000, 10, 0, 1).maturityValue).toBe(10_000);
  });
});

describe("compoundYearlyGrowth", () => {
  it("has one row per year, ending at the full-term maturity value", () => {
    const rows = compoundYearlyGrowth(10_000, 10, 3, 1);
    expect(rows).toHaveLength(3);
    expect(rows[2]!.value).toBeCloseTo(compoundInterest(10_000, 10, 3, 1).maturityValue, 6);
  });

  it("each year's interest is positive and the balance keeps rising", () => {
    const rows = compoundYearlyGrowth(10_000, 10, 3, 1);
    for (const r of rows) {
      expect(r.interestThisYear).toBeGreaterThan(0);
    }
    expect(rows[1]!.value).toBeGreaterThan(rows[0]!.value);
  });
});
