import { describe, expect, it } from "vitest";
import { convert, currencySymbol, listCurrencies, localeFor, parseRates, rateBetween } from "./currency";

const base = (extra: Record<string, number> = {}) => {
  const rates: Record<string, number> = {};
  for (let i = 0; i < 25; i++) {
    rates[`x${String.fromCharCode(97 + (i % 26))}${String.fromCharCode(97 + ((i * 3) % 26))}`] = 1 + i;
  }
  return { ...rates, inr: 90, eur: 0.9, gbp: 0.8, ...extra };
};

describe("parseRates", () => {
  it("reads the currency-api shape (lower-case codes)", () => {
    const out = parseRates({ date: "2026-11-04", usd: base() });
    expect(out?.rates.INR).toBe(90);
    expect(out?.rates.USD).toBe(1);
    expect(out?.date).toBe("2026-11-04");
  });

  it("reads the ExchangeRate-API shape (upper-case codes)", () => {
    const upper = Object.fromEntries(Object.entries(base()).map(([k, v]) => [k.toUpperCase(), v]));
    const out = parseRates({
      result: "success",
      time_last_update_utc: "Wed, 04 Nov 2026 00:02:31 +0000",
      rates: upper,
    });
    expect(out?.rates.EUR).toBe(0.9);
    expect(out?.date).toBe("2026-11-04");
  });

  it("drops invalid entries and codes that are not three letters", () => {
    const out = parseRates({
      date: "2026-11-04",
      usd: { ...base(), bad: 0, neg: -2, nan: "x", longcode: 5, ab: 3 },
    });
    expect(out?.rates.BAD).toBeUndefined();
    expect(out?.rates.LONGCODE).toBeUndefined();
    expect(out?.rates.AB).toBeUndefined();
  });

  it("rejects thin or malformed payloads", () => {
    expect(parseRates(null)).toBeNull();
    expect(parseRates({ usd: { inr: 90, eur: 0.9 } })).toBeNull();
    expect(parseRates({ usd: "nope" })).toBeNull();
  });
});

describe("convert", () => {
  const rates = { USD: 1, INR: 90, EUR: 0.9, GBP: 0.8 };

  it("converts from the base", () => {
    expect(convert(100, "USD", "INR", rates)).toBe(9000);
  });

  it("converts into the base", () => {
    expect(convert(9000, "INR", "USD", rates)).toBe(100);
  });

  it("crosses two non-base currencies through the base", () => {
    expect(convert(1, "GBP", "INR", rates)).toBeCloseTo(112.5, 10);
    expect(convert(1, "EUR", "GBP", rates)).toBeCloseTo(0.8889, 4);
  });

  it("is the identity for the same currency", () => {
    expect(convert(12.34, "EUR", "EUR", rates)).toBeCloseTo(12.34, 10);
  });

  it("returns NaN for an unknown currency", () => {
    expect(convert(1, "USD", "ZZZ", rates)).toBeNaN();
  });

  it("round-trips", () => {
    expect(convert(convert(250, "GBP", "INR", rates), "INR", "GBP", rates)).toBeCloseTo(250, 8);
  });

  it("gives the unit rate", () => {
    expect(rateBetween("USD", "INR", rates)).toBe(90);
  });
});

describe("currency helpers", () => {
  it("lists popular currencies first", () => {
    const list = listCurrencies();
    expect(list.slice(0, 3)).toEqual(["USD", "INR", "EUR"]);
    expect(new Set(list).size).toBe(list.length);
  });

  it("uses Indian grouping only for rupees", () => {
    expect(localeFor("INR")).toBe("en-IN");
    expect(localeFor("USD")).toBe("en-US");
  });

  it("returns a symbol", () => {
    expect(currencySymbol("USD")).toBe("$");
    expect(currencySymbol("INR")).toBe("₹");
  });
});
