import { describe, expect, it } from "vitest";
import { isWhatPercentOf, percentChangeFrom, percentOf } from "./percentage";

describe("percentOf", () => {
  it("25% of 80 is 20", () => {
    expect(percentOf(25, 80)).toBeCloseTo(20, 6);
  });
  it("handles 0%", () => {
    expect(percentOf(0, 80)).toBe(0);
  });
});

describe("isWhatPercentOf", () => {
  it("20 is 25% of 80", () => {
    expect(isWhatPercentOf(20, 80)).toBeCloseTo(25, 6);
  });
  it("is NaN when the whole is zero", () => {
    expect(isWhatPercentOf(20, 0)).toBeNaN();
  });
});

describe("percentChangeFrom", () => {
  it("a result of 110 after a 10% increase came from 100", () => {
    expect(percentChangeFrom(110, 10)).toBeCloseTo(100, 6);
  });
  it("a result of 90 after a 10% decrease came from 100", () => {
    expect(percentChangeFrom(90, -10)).toBeCloseTo(100, 6);
  });
  it("round-trips with percentOf-style growth", () => {
    const original = 250;
    const grown = original * 1.08;
    expect(percentChangeFrom(grown, 8)).toBeCloseTo(original, 6);
  });
});
