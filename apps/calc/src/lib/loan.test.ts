import { describe, expect, it } from "vitest";
import { amortizationSchedule, emi, loanEligibility, maxLoanAmount, yearlySchedule } from "./loan";

describe("emi", () => {
  it("matches a hand-worked example: 10,00,000 at 9% for 60 months", () => {
    // r = 0.0075, factor = 1.0075^60 = 1.565681..., EMI = 1,000,000 * 0.0075 * factor / (factor - 1)
    const r = 0.0075;
    const factor = Math.pow(1 + r, 60);
    const expected = (1_000_000 * r * factor) / (factor - 1);
    expect(emi(1_000_000, 9, 60).emi).toBeCloseTo(expected, 6);
    expect(emi(1_000_000, 9, 60).emi).toBeCloseTo(20_758.36, 1);
  });

  it("total payment minus principal equals total interest", () => {
    const r = emi(500_000, 8.5, 36);
    expect(r.totalPayment).toBeCloseTo(r.emi * 36, 6);
    expect(r.totalInterest).toBeCloseTo(r.totalPayment - 500_000, 6);
  });

  it("a 0% loan is just the principal spread evenly, with no interest", () => {
    const r = emi(120_000, 0, 12);
    expect(r.emi).toBeCloseTo(10_000, 6);
    expect(r.totalInterest).toBe(0);
  });

  it("is all zero for a non-positive principal or term", () => {
    expect(emi(0, 9, 12).emi).toBe(0);
    expect(emi(100_000, 9, 0).emi).toBe(0);
  });
});

describe("amortizationSchedule", () => {
  it("has one row per month, and the balance reaches exactly zero", () => {
    const rows = amortizationSchedule(300_000, 10, 24);
    expect(rows).toHaveLength(24);
    expect(rows[23]!.balance).toBe(0);
  });

  it("each row's principal + interest equals its payment", () => {
    const rows = amortizationSchedule(300_000, 10, 24);
    for (const r of rows) {
      expect(r.principal + r.interest).toBeCloseTo(r.payment, 6);
    }
  });

  it("interest falls and principal rises as the balance shrinks", () => {
    const rows = amortizationSchedule(300_000, 10, 24);
    expect(rows[0]!.interest).toBeGreaterThan(rows[23]!.interest);
    expect(rows[0]!.principal).toBeLessThan(rows[23]!.principal);
  });

  it("sums to the total principal across all rows", () => {
    const rows = amortizationSchedule(300_000, 10, 24);
    const totalPrincipal = rows.reduce((s, r) => s + r.principal, 0);
    expect(totalPrincipal).toBeCloseTo(300_000, 4);
  });
});

describe("yearlySchedule", () => {
  it("rolls 24 monthly rows into 2 yearly rows", () => {
    const years = yearlySchedule(amortizationSchedule(300_000, 10, 24));
    expect(years).toHaveLength(2);
    expect(years[1]!.balance).toBe(0);
  });
});

describe("maxLoanAmount", () => {
  it("is the inverse of emi()", () => {
    const { emi: payment } = emi(1_000_000, 9, 60);
    expect(maxLoanAmount(payment, 9, 60)).toBeCloseTo(1_000_000, 2);
  });

  it("is zero for a non-positive EMI budget or term", () => {
    expect(maxLoanAmount(0, 9, 60)).toBe(0);
    expect(maxLoanAmount(20_000, 9, 0)).toBe(0);
  });
});

describe("loanEligibility", () => {
  it("caps the affordable EMI at FOIR percent of income, minus existing EMIs", () => {
    const r = loanEligibility(100_000, 10_000, 50, 9, 60);
    expect(r.affordableEmi).toBe(40_000);
    expect(r.maxLoan).toBeCloseTo(maxLoanAmount(40_000, 9, 60), 6);
  });

  it("never goes negative when existing EMIs exceed the FOIR share", () => {
    const r = loanEligibility(50_000, 40_000, 40, 9, 60);
    expect(r.affordableEmi).toBe(0);
    expect(r.maxLoan).toBe(0);
  });
});
