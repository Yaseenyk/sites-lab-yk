import { describe, expect, it } from "vitest";
import { combine, describe as describeDuration, fromSeconds, toSeconds, totalIn } from "./duration";
import { stackedPrice, stats } from "./percent";

describe("standard deviation", () => {
  const s = stats([2, 4, 4, 4, 5, 5, 7, 9]);

  it("computes the population standard deviation", () => {
    expect(s?.mean).toBe(5);
    expect(s?.variance).toBe(4);
    expect(s?.stdDev).toBe(2);
  });

  it("computes the sample standard deviation", () => {
    expect(s?.sampleVariance).toBeCloseTo(32 / 7, 10);
    expect(s?.sampleStdDev).toBeCloseTo(2.13809, 4);
  });

  it("has no sample deviation for a single value, and zero spread for identical values", () => {
    expect(stats([5])?.sampleStdDev).toBeNull();
    expect(stats([5])?.stdDev).toBe(0);
    expect(stats([3, 3, 3])?.stdDev).toBe(0);
  });
});

describe("stackedPrice", () => {
  it("applies discounts one after another", () => {
    expect(stackedPrice(100, [20, 10])).toBeCloseTo(72, 10);
    expect(stackedPrice(50, [30])).toBeCloseTo(35, 10);
    expect(stackedPrice(80, [])).toBe(80);
  });
});

describe("durations", () => {
  it("converts to and from seconds", () => {
    expect(toSeconds({ days: 1, hours: 2, minutes: 3, seconds: 4 })).toBe(93784);
    expect(fromSeconds(93784)).toEqual({ negative: false, days: 1, hours: 2, minutes: 3, seconds: 4 });
  });

  it("adds with carrying", () => {
    const r = combine(
      { days: 0, hours: 2, minutes: 30, seconds: 0 },
      { days: 0, hours: 1, minutes: 45, seconds: 0 },
      "add",
    );
    expect(r).toEqual({ negative: false, days: 0, hours: 4, minutes: 15, seconds: 0 });
  });

  it("rolls hours over into days", () => {
    const r = combine(
      { days: 0, hours: 20, minutes: 0, seconds: 0 },
      { days: 0, hours: 8, minutes: 0, seconds: 0 },
      "add",
    );
    expect(r).toMatchObject({ days: 1, hours: 4 });
  });

  it("subtracts, and reports a negative result", () => {
    const a = { days: 0, hours: 1, minutes: 0, seconds: 0 };
    const b = { days: 0, hours: 2, minutes: 30, seconds: 0 };
    expect(combine(b, a, "subtract")).toEqual({
      negative: false,
      days: 0,
      hours: 1,
      minutes: 30,
      seconds: 0,
    });
    expect(combine(a, b, "subtract")).toEqual({ negative: true, days: 0, hours: 1, minutes: 30, seconds: 0 });
  });

  it("describes durations in words", () => {
    expect(describeDuration(fromSeconds(93784))).toBe("1 day, 2 hours, 3 minutes, 4 seconds");
    expect(describeDuration(fromSeconds(3600))).toBe("1 hour");
    expect(describeDuration(fromSeconds(0))).toBe("0 seconds");
    expect(describeDuration(fromSeconds(-90))).toBe("-1 minute, 30 seconds");
  });

  it("totals in other units", () => {
    expect(totalIn(fromSeconds(5400), "hours")).toBe(1.5);
    expect(totalIn(fromSeconds(5400), "minutes")).toBe(90);
    expect(totalIn(fromSeconds(-5400), "minutes")).toBe(-90);
    expect(totalIn(fromSeconds(172800), "days")).toBe(2);
  });
});
