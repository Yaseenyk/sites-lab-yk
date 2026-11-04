import { describe, expect, it } from "vitest";
import {
  decreaseBy,
  fmt,
  gcd,
  increaseBy,
  num,
  parseNumbers,
  percentChange,
  percentDifference,
  percentOf,
  simplifyRatio,
  solveRatio,
  stats,
  whatPercent,
  wholeFromPart,
} from "./percent";

describe("percentage questions", () => {
  it("finds P% of X", () => {
    expect(percentOf(15, 80)).toBe(12);
    expect(percentOf(7.5, 200)).toBe(15);
  });

  it("finds what percent A is of B", () => {
    expect(whatPercent(12, 80)).toBe(15);
    expect(whatPercent(1, 3)).toBeCloseTo(33.3333, 4);
    expect(whatPercent(5, 0)).toBeNaN();
  });

  it("finds the whole when A is P% of it", () => {
    expect(wholeFromPart(12, 15)).toBe(80);
    expect(wholeFromPart(12, 0)).toBeNaN();
  });
});

describe("increase and decrease", () => {
  it("applies an increase", () => {
    expect(increaseBy(80, 25)).toBe(100);
  });

  it("applies a decrease", () => {
    expect(decreaseBy(200, 15)).toBe(170);
  });

  it("is not reversible: -50% then +50% is not the start", () => {
    expect(increaseBy(decreaseBy(100, 50), 50)).toBe(75);
  });
});

describe("percent change and difference", () => {
  it("is relative to the starting value", () => {
    expect(percentChange(40, 50)).toBeCloseTo(25, 10);
    expect(percentChange(50, 40)).toBeCloseTo(-20, 10);
    expect(percentChange(50, 65)).toBeCloseTo(30, 10);
    expect(percentChange(80, 60)).toBeCloseTo(-25, 10);
    expect(percentChange(0, 5)).toBeNaN();
  });

  it("percent difference is symmetric and uses the average", () => {
    expect(percentDifference(40, 50)).toBeCloseTo(22.2222, 4);
    expect(percentDifference(50, 40)).toBeCloseTo(percentDifference(40, 50), 10);
    expect(percentDifference(0, 0)).toBeNaN();
  });
});

describe("ratios", () => {
  it("computes the gcd", () => {
    expect(gcd(12, 18)).toBe(6);
    expect(gcd(7, 0)).toBe(7);
    expect(gcd(-8, 12)).toBe(4);
  });

  it("simplifies whole and decimal ratios", () => {
    expect(simplifyRatio(6, 4)).toEqual([3, 2]);
    expect(simplifyRatio(1.5, 2)).toEqual([3, 4]);
    expect(simplifyRatio(0, 0)).toBeNull();
    expect(simplifyRatio(Number.NaN, 2)).toBeNull();
  });

  it("solves a:b = c:x", () => {
    expect(solveRatio(2, 3, 10)).toBe(15);
    expect(solveRatio(0, 3, 10)).toBeNaN();
  });
});

describe("stats", () => {
  it("returns null for no data", () => {
    expect(stats([])).toBeNull();
  });

  it("computes mean, median, mode, range", () => {
    const s = stats([4, 8, 8, 10, 15]);
    expect(s).toMatchObject({
      count: 5,
      sum: 45,
      mean: 9,
      median: 8,
      modes: [8],
      min: 4,
      max: 15,
      range: 11,
    });
  });

  it("averages the middle two for an even count", () => {
    expect(stats([1, 2, 3, 4])?.median).toBe(2.5);
  });

  it("reports no mode when every value is unique, and several when tied", () => {
    expect(stats([1, 2, 3])?.modes).toEqual([]);
    expect(stats([1, 1, 2, 2, 3])?.modes).toEqual([1, 2]);
  });
});

describe("parsing and formatting", () => {
  it("parses numbers and reports bad tokens", () => {
    expect(parseNumbers("1, 2.5\n3  x 4")).toEqual({ values: [1, 2.5, 3, 4], bad: ["x"] });
  });

  it("parses typed numbers", () => {
    expect(num("1,250.5")).toBe(1250.5);
    expect(num(" ")).toBeNaN();
  });

  it("formats without trailing zeros", () => {
    expect(fmt(12)).toBe("12");
    expect(fmt(12.5)).toBe("12.5");
    expect(fmt(1 / 3, 4)).toBe("0.3333");
    expect(fmt(1234567.891)).toBe("1,234,567.891");
    expect(fmt(NaN)).toBe("-");
  });
});
