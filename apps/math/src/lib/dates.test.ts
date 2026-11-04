import { describe, expect, it } from "vitest";
import {
  addDays,
  addMonths,
  businessDays,
  daysBetween,
  daysInMonth,
  diffYMD,
  formatHM,
  formatDate,
  isLeapYear,
  minutesBetween,
  nextBirthday,
  parseDate,
  parseTime,
  toIso,
  todayLocalIso,
  weekdayName,
} from "./dates";

const d = (s: string): Date => parseDate(s) as Date;

describe("parseDate", () => {
  it("accepts real dates and rejects impossible ones", () => {
    expect(toIso(d("2024-02-29"))).toBe("2024-02-29");
    expect(parseDate("2023-02-29")).toBeNull();
    expect(parseDate("2024-13-01")).toBeNull();
    expect(parseDate("24-01-01")).toBeNull();
    expect(parseDate("")).toBeNull();
  });
});

describe("calendar helpers", () => {
  it("knows leap years", () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(1900)).toBe(false);
    expect(isLeapYear(2000)).toBe(true);
    expect(daysInMonth(2024, 1)).toBe(29);
    expect(daysInMonth(2023, 1)).toBe(28);
  });

  it("counts days between dates", () => {
    expect(daysBetween(d("2026-01-01"), d("2026-12-31"))).toBe(364);
    expect(daysBetween(d("2024-01-01"), d("2025-01-01"))).toBe(366);
    expect(daysBetween(d("2026-03-10"), d("2026-03-01"))).toBe(-9);
  });

  it("is not thrown off by daylight saving", () => {
    expect(daysBetween(d("2026-03-01"), d("2026-04-01"))).toBe(31);
    expect(daysBetween(d("2026-10-01"), d("2026-11-15"))).toBe(45);
  });

  it("adds days across month and year ends", () => {
    expect(toIso(addDays(d("2026-12-30"), 5))).toBe("2027-01-04");
    expect(toIso(addDays(d("2026-03-01"), -1))).toBe("2026-02-28");
  });

  it("adds months and clamps the day", () => {
    expect(toIso(addMonths(d("2026-01-31"), 1))).toBe("2026-02-28");
    expect(toIso(addMonths(d("2024-01-31"), 1))).toBe("2024-02-29");
    expect(toIso(addMonths(d("2026-11-15"), 3))).toBe("2027-02-15");
    expect(toIso(addMonths(d("2026-03-15"), -4))).toBe("2025-11-15");
    expect(toIso(addMonths(d("2024-02-29"), 12))).toBe("2025-02-28");
  });
});

describe("diffYMD", () => {
  it("measures a normal span", () => {
    expect(diffYMD(d("1990-05-15"), d("2026-11-04"))).toEqual({ years: 36, months: 5, days: 20 });
  });

  it("is zero on the same day", () => {
    expect(diffYMD(d("2026-11-04"), d("2026-11-04"))).toEqual({ years: 0, months: 0, days: 0 });
  });

  it("is exactly whole years on a birthday", () => {
    expect(diffYMD(d("2000-02-29"), d("2024-02-29"))).toEqual({ years: 24, months: 0, days: 0 });
  });

  it("borrows from the right month length", () => {
    expect(diffYMD(d("2026-01-31"), d("2026-03-01"))).toEqual({ years: 0, months: 1, days: 1 });
    expect(diffYMD(d("2023-12-25"), d("2024-01-05"))).toEqual({ years: 0, months: 0, days: 11 });
  });

  it("treats 28 February as the anniversary of a leap-day birthday", () => {
    expect(diffYMD(d("2000-02-29"), d("2001-02-28"))).toEqual({ years: 1, months: 0, days: 0 });
    expect(diffYMD(d("2000-02-29"), d("2001-02-27"))).toEqual({ years: 0, months: 11, days: 29 });
  });

  it("returns zeros if the end is before the start", () => {
    expect(diffYMD(d("2026-11-04"), d("2026-01-01"))).toEqual({ years: 0, months: 0, days: 0 });
  });
});

describe("nextBirthday", () => {
  it("is this year when it has not happened yet", () => {
    expect(toIso(nextBirthday(d("1990-12-25"), d("2026-11-04")))).toBe("2026-12-25");
  });

  it("is next year once it has passed", () => {
    expect(toIso(nextBirthday(d("1990-05-15"), d("2026-11-04")))).toBe("2027-05-15");
  });

  it("is today on the birthday itself", () => {
    expect(toIso(nextBirthday(d("1990-11-04"), d("2026-11-04")))).toBe("2026-11-04");
  });

  it("moves a 29 February birthday to 28 February in a non-leap year", () => {
    expect(toIso(nextBirthday(d("2000-02-29"), d("2026-11-04")))).toBe("2027-02-28");
    expect(toIso(nextBirthday(d("2000-02-29"), d("2027-11-04")))).toBe("2028-02-29");
  });
});

describe("businessDays", () => {
  it("counts Monday to Friday, start inclusive and end exclusive", () => {
    // Mon 2026-11-02 to Mon 2026-11-09 is one working week.
    expect(businessDays(d("2026-11-02"), d("2026-11-09"))).toBe(5);
    expect(businessDays(d("2026-11-02"), d("2026-11-03"))).toBe(1);
    expect(businessDays(d("2026-11-06"), d("2026-11-09"))).toBe(1);
  });

  it("is zero for a weekend or reversed range", () => {
    expect(businessDays(d("2026-11-07"), d("2026-11-09"))).toBe(0);
    expect(businessDays(d("2026-11-09"), d("2026-11-02"))).toBe(0);
  });

  it("handles long spans", () => {
    expect(businessDays(d("2026-01-01"), d("2027-01-01"))).toBe(261);
  });
});

describe("formatting", () => {
  it("names weekdays and formats dates", () => {
    expect(weekdayName(d("2026-11-04"))).toBe("Wednesday");
    expect(formatDate(d("2026-11-04"))).toBe("4 November 2026");
  });

  it("formats today in local time", () => {
    expect(todayLocalIso(new Date(2026, 10, 4, 23, 59))).toBe("2026-11-04");
  });
});

describe("clock times", () => {
  it("parses HH:MM", () => {
    expect(parseTime("09:30")).toBe(570);
    expect(parseTime("9:05")).toBe(545);
    expect(parseTime("24:00")).toBeNull();
    expect(parseTime("12:60")).toBeNull();
    expect(parseTime("abc")).toBeNull();
  });

  it("measures time worked, wrapping past midnight", () => {
    expect(minutesBetween(parseTime("09:00") as number, parseTime("17:30") as number)).toBe(510);
    expect(minutesBetween(parseTime("22:00") as number, parseTime("06:00") as number)).toBe(480);
  });

  it("formats minutes as H:MM", () => {
    expect(formatHM(495)).toBe("8:15");
    expect(formatHM(60)).toBe("1:00");
    expect(formatHM(-75)).toBe("-1:15");
  });
});
