import { describe, expect, it } from "vitest";
import {
  DEFAULT_SCHEDULE as S,
  convertAll,
  fromAnnual,
  isValidSchedule,
  money,
  num,
  overtime,
  percent,
  percentChange,
  projection,
  raiseByAmount,
  raiseByPercent,
  toAnnual,
} from "./pay";

describe("toAnnual", () => {
  it("converts hourly with a 2,080-hour year", () => {
    expect(toAnnual(25, "hourly", S)).toBe(52000);
  });
  it("converts each period", () => {
    expect(toAnnual(200, "daily", S)).toBe(52000);
    expect(toAnnual(1000, "weekly", S)).toBe(52000);
    expect(toAnnual(2000, "biweekly", S)).toBe(52000);
    expect(toAnnual(2000, "semimonthly", S)).toBe(48000);
    expect(toAnnual(5000, "monthly", S)).toBe(60000);
    expect(toAnnual(15000, "quarterly", S)).toBe(60000);
    expect(toAnnual(60000, "annual", S)).toBe(60000);
  });
  it("respects a custom schedule", () => {
    expect(toAnnual(20, "hourly", { hoursPerWeek: 30, daysPerWeek: 4, weeksPerYear: 50 })).toBe(30000);
  });
});

describe("fromAnnual", () => {
  it("gives 28.85 an hour for 60,000 a year", () => {
    expect(fromAnnual(60000, "hourly", S)).toBeCloseTo(28.846, 3);
    expect(money(fromAnnual(60000, "hourly", S))).toBe("$28.85");
  });
  it("is the inverse of toAnnual for every unit", () => {
    for (const u of [
      "hourly",
      "daily",
      "weekly",
      "biweekly",
      "semimonthly",
      "monthly",
      "quarterly",
      "annual",
    ] as const) {
      expect(fromAnnual(toAnnual(123.45, u, S), u, S)).toBeCloseTo(123.45, 8);
    }
  });
});

describe("convertAll", () => {
  it("returns every unit from one input", () => {
    const r = convertAll(52000, "annual", S);
    expect(r.hourly).toBe(25);
    expect(r.weekly).toBe(1000);
    expect(r.biweekly).toBe(2000);
    expect(r.monthly).toBeCloseTo(4333.333, 3);
  });
});

describe("isValidSchedule", () => {
  it("rejects impossible schedules", () => {
    expect(isValidSchedule(S)).toBe(true);
    expect(isValidSchedule({ ...S, hoursPerWeek: 0 })).toBe(false);
    expect(isValidSchedule({ ...S, daysPerWeek: 8 })).toBe(false);
    expect(isValidSchedule({ ...S, weeksPerYear: 60 })).toBe(false);
  });
});

describe("raises", () => {
  it("applies a percent raise", () => {
    expect(raiseByPercent(60000, 3)).toBeCloseTo(61800, 6);
  });
  it("applies a flat raise", () => {
    expect(raiseByAmount(60000, 2500)).toBe(62500);
  });
  it("finds the percent between two pay rates", () => {
    expect(percentChange(50000, 55000)).toBeCloseTo(10, 10);
    expect(percentChange(20, 19)).toBeCloseTo(-5, 10);
    expect(percentChange(0, 10)).toBeNaN();
  });
  it("compounds a raise each year", () => {
    const p = projection(100, 10, 3);
    expect(p[0]).toBeCloseTo(110, 8);
    expect(p[1]).toBeCloseTo(121, 8);
    expect(p[2]).toBeCloseTo(133.1, 8);
  });
});

describe("overtime", () => {
  it("pays time and a half above 40 hours", () => {
    const r = overtime(20, 45, 40, 1.5);
    expect(r.regularPay).toBe(800);
    expect(r.overtimeHours).toBe(5);
    expect(r.overtimeRate).toBe(30);
    expect(r.overtimePay).toBe(150);
    expect(r.total).toBe(950);
  });
  it("has no overtime at or under the threshold", () => {
    const r = overtime(20, 38, 40, 1.5);
    expect(r.overtimeHours).toBe(0);
    expect(r.total).toBe(760);
  });
  it("supports double time", () => {
    expect(overtime(15, 50, 40, 2).total).toBe(600 + 300);
  });
});

describe("formatting and parsing", () => {
  it("formats money and percent", () => {
    expect(money(1234.5)).toBe("$1,234.50");
    expect(money(52000, 0)).toBe("$52,000");
    expect(money(NaN)).toBe("-");
    expect(percent(3)).toBe("3%");
    expect(percent(3.456)).toBe("3.46%");
  });
  it("parses typed numbers", () => {
    expect(num("1,250.5")).toBe(1250.5);
    expect(num("  ")).toBeNaN();
    expect(num("abc")).toBeNaN();
  });
});
