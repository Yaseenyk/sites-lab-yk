/** ISO 4217 codes offered when the browser cannot list them itself (Intl.supportedValuesOf). */
export const FALLBACK_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "AUD",
  "CAD",
  "SGD",
  "AED",
  "CHF",
  "JPY",
  "CNY",
  "HKD",
  "NZD",
  "SEK",
  "NOK",
  "DKK",
  "PLN",
  "CZK",
  "HUF",
  "RON",
  "TRY",
  "ZAR",
  "BRL",
  "MXN",
  "ARS",
  "CLP",
  "COP",
  "PEN",
  "KRW",
  "IDR",
  "MYR",
  "THB",
  "PHP",
  "VND",
  "PKR",
  "BDT",
  "LKR",
  "NPR",
  "SAR",
  "QAR",
  "KWD",
  "BHD",
  "OMR",
  "ILS",
  "EGP",
  "NGN",
  "KES",
  "GHS",
  "MAD",
  "RUB",
  "UAH",
];

/** Currencies shown first in pickers, in this order. */
export const POPULAR_CURRENCIES = ["USD", "INR", "EUR", "GBP", "AUD", "CAD", "AED", "SGD", "JPY", "CHF"];

export function listCurrencies(): string[] {
  let all: string[] = FALLBACK_CURRENCIES;
  try {
    const intl = Intl as unknown as { supportedValuesOf?: (key: string) => string[] };
    const supported = intl.supportedValuesOf?.("currency");
    if (supported && supported.length > 0) {
      all = supported;
    }
  } catch {
    // older engines: keep the fallback list
  }
  const rest = all.filter((c) => !POPULAR_CURRENCIES.includes(c)).sort();
  return [...POPULAR_CURRENCIES.filter((c) => all.includes(c)), ...rest];
}

export function currencyName(code: string): string {
  try {
    return new Intl.DisplayNames(["en"], { type: "currency" }).of(code) ?? code;
  } catch {
    return code;
  }
}

export function currencySymbol(code: string): string {
  try {
    const parts = new Intl.NumberFormat(localeFor(code), {
      style: "currency",
      currency: code,
      currencyDisplay: "narrowSymbol",
    }).formatToParts(0);
    return parts.find((p) => p.type === "currency")?.value ?? code;
  } catch {
    return code;
  }
}

/** Indian digit grouping (lakh, crore) for rupees; US-style grouping for everything else. */
export function localeFor(code: string): string {
  return code === "INR" ? "en-IN" : "en-US";
}

/** Rates are quoted per 1 unit of the base currency (USD), keyed by upper-case ISO code. */
export interface RatesResult {
  rates: Record<string, number>;
  /** Date the feed says the rates are for, as ISO yyyy-mm-dd. */
  date: string;
  source: "jsdelivr" | "pages" | "exchangerate-api";
}

/** Convert `amount` of `from` into `to`. NaN when either currency has no rate. */
export function convert(amount: number, from: string, to: string, rates: Record<string, number>): number {
  const a = rates[from];
  const b = rates[to];
  if (!a || !b) {
    return NaN;
  }
  return (amount / a) * b;
}

/** Units of `to` for one unit of `from`. */
export const rateBetween = (from: string, to: string, rates: Record<string, number>): number =>
  convert(1, from, to, rates);

function toIsoDate(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

/**
 * Read either feed shape:
 *  - currency-api:  { date: "2026-11-04", usd: { inr: 94.7, ... } }  (lower-case codes)
 *  - ExchangeRate-API: { result: "success", time_last_update_utc: "...", rates: { USD: 1, INR: 94.8 } }
 * Returns null when the payload has no usable rates.
 */
export function parseRates(json: unknown): { rates: Record<string, number>; date: string } | null {
  if (!json || typeof json !== "object") {
    return null;
  }
  const j = json as Record<string, unknown>;
  const raw = (j.usd ?? j.rates) as Record<string, unknown> | undefined;
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const rates: Record<string, number> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (typeof v === "number" && Number.isFinite(v) && v > 0 && /^[A-Za-z]{3}$/.test(k)) {
      rates[k.toUpperCase()] = v;
    }
  }
  rates.USD = 1;
  if (Object.keys(rates).length < 20 || !rates.INR || !rates.EUR) {
    return null;
  }
  const date = toIsoDate(j.date) ?? toIsoDate(j.time_last_update_utc) ?? "";
  return { rates, date };
}

const FEEDS: { url: string; source: RatesResult["source"] }[] = [
  {
    url: "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
    source: "jsdelivr",
  },
  { url: "https://latest.currency-api.pages.dev/v1/currencies/usd.json", source: "pages" },
  { url: "https://open.er-api.com/v6/latest/USD", source: "exchangerate-api" },
];

/** Fetch USD-based rates, trying each feed in turn. Rejects when every feed fails. */
export async function fetchRates(timeoutMs = 8000): Promise<RatesResult> {
  let lastError: unknown = new Error("no feeds");
  for (const feed of FEEDS) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), timeoutMs);
      const res = await fetch(feed.url, { signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const parsed = parseRates(await res.json());
      if (!parsed) {
        throw new Error("unusable payload");
      }
      return { ...parsed, source: feed.source };
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError;
}
