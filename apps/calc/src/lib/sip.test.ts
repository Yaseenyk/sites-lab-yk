import { describe, expect, it } from "vitest";
import { sipFutureValue, sipYearlyGrowth } from "./sip";

describe("sipFutureValue", () => {
  it("matches a hand-worked example: 5,000/month at 12% for 10 years", () => {
    const i = 0.01;
    const n = 120;
    const expected = 5_000 * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const r = sipFutureValue(5_000, 12, 10);
    expect(r.futureValue).toBeCloseTo(expected, 6);
    expect(r.investedAmount).toBe(600_000);
    expect(r.estimatedReturns).toBeCloseTo(expected - 600_000, 6);
  });

  it("with 0% return, the future value is just the sum invested", () => {
    const r = sipFutureValue(2_000, 0, 5);
    expect(r.futureValue).toBe(120_000);
    expect(r.estimatedReturns).toBe(0);
  });

  it("is all zero for a non-positive amount or term", () => {
    expect(sipFutureValue(0, 12, 10).futureValue).toBe(0);
    expect(sipFutureValue(5_000, 12, 0).futureValue).toBe(0);
  });

  it("a longer term compounds to more than a simple multiple of the extra months", () => {
    const five = sipFutureValue(5_000, 12, 5).futureValue;
    const ten = sipFutureValue(5_000, 12, 10).futureValue;
    expect(ten).toBeGreaterThan(five * 2);
  });
});

describe("sipYearlyGrowth", () => {
  it("has one row per year, ending at the full-term future value", () => {
    const rows = sipYearlyGrowth(5_000, 12, 10);
    expect(rows).toHaveLength(10);
    expect(rows[9]!.value).toBeCloseTo(sipFutureValue(5_000, 12, 10).futureValue, 6);
  });

  it("invested amount grows by 12 months' contribution each year", () => {
    const rows = sipYearlyGrowth(5_000, 12, 3);
    expect(rows[0]!.invested).toBe(60_000);
    expect(rows[1]!.invested).toBe(120_000);
    expect(rows[2]!.invested).toBe(180_000);
  });
});
