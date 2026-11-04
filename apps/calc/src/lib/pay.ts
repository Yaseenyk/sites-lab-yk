export const UNITS = [
  "hourly",
  "daily",
  "weekly",
  "biweekly",
  "semimonthly",
  "monthly",
  "quarterly",
  "annual",
] as const;
export type Unit = (typeof UNITS)[number];

export const UNIT_LABEL: Record<Unit, string> = {
  hourly: "Hourly",
  daily: "Daily",
  weekly: "Weekly",
  biweekly: "Bi-weekly (every 2 weeks)",
  semimonthly: "Semi-monthly (twice a month)",
  monthly: "Monthly",
  quarterly: "Quarterly",
  annual: "Annual",
};

export interface Schedule {
  hoursPerWeek: number;
  daysPerWeek: number;
  weeksPerYear: number;
}

/** A standard full-time year: 40 hours a week, 5 days a week, 52 weeks (2,080 hours). */
export const DEFAULT_SCHEDULE: Schedule = { hoursPerWeek: 40, daysPerWeek: 5, weeksPerYear: 52 };

/** Annual pay for an amount quoted per `unit`. */
export function toAnnual(amount: number, unit: Unit, s: Schedule): number {
  switch (unit) {
    case "hourly":
      return amount * s.hoursPerWeek * s.weeksPerYear;
    case "daily":
      return amount * s.daysPerWeek * s.weeksPerYear;
    case "weekly":
      return amount * s.weeksPerYear;
    case "biweekly":
      return (amount * s.weeksPerYear) / 2;
    case "semimonthly":
      return amount * 24;
    case "monthly":
      return amount * 12;
    case "quarterly":
      return amount * 4;
    case "annual":
      return amount;
  }
}

/** Pay per `unit` for an annual amount. The inverse of toAnnual. */
export function fromAnnual(annual: number, unit: Unit, s: Schedule): number {
  switch (unit) {
    case "hourly":
      return annual / (s.hoursPerWeek * s.weeksPerYear);
    case "daily":
      return annual / (s.daysPerWeek * s.weeksPerYear);
    case "weekly":
      return annual / s.weeksPerYear;
    case "biweekly":
      return annual / (s.weeksPerYear / 2);
    case "semimonthly":
      return annual / 24;
    case "monthly":
      return annual / 12;
    case "quarterly":
      return annual / 4;
    case "annual":
      return annual;
  }
}

export function convertAll(amount: number, unit: Unit, s: Schedule): Record<Unit, number> {
  const annual = toAnnual(amount, unit, s);
  const out = {} as Record<Unit, number>;
  for (const u of UNITS) {
    out[u] = fromAnnual(annual, u, s);
  }
  return out;
}

export function isValidSchedule(s: Schedule): boolean {
  return (
    s.hoursPerWeek > 0 &&
    s.hoursPerWeek <= 168 &&
    s.daysPerWeek > 0 &&
    s.daysPerWeek <= 7 &&
    s.weeksPerYear > 0 &&
    s.weeksPerYear <= 53
  );
}

export const raiseByPercent = (current: number, percent: number): number => current * (1 + percent / 100);
export const raiseByAmount = (current: number, amount: number): number => current + amount;
/** Percentage change from `current` to `next`. NaN when `current` is zero. */
export const percentChange = (current: number, next: number): number =>
  current === 0 ? NaN : ((next - current) / current) * 100;

/** Pay after each of `years` consecutive raises of `percent`, compounding. Index 0 is year 1. */
export function projection(current: number, percent: number, years: number): number[] {
  const out: number[] = [];
  let pay = current;
  for (let i = 0; i < years; i++) {
    pay = raiseByPercent(pay, percent);
    out.push(pay);
  }
  return out;
}

export interface OvertimeResult {
  regularHours: number;
  overtimeHours: number;
  regularPay: number;
  overtimeRate: number;
  overtimePay: number;
  total: number;
}

/** Pay for one week: hours up to `threshold` at the base rate, hours beyond it at rate x multiplier. */
export function overtime(
  rate: number,
  hoursWorked: number,
  threshold: number,
  multiplier: number,
): OvertimeResult {
  const regularHours = Math.min(hoursWorked, threshold);
  const overtimeHours = Math.max(0, hoursWorked - threshold);
  const overtimeRate = rate * multiplier;
  const regularPay = regularHours * rate;
  const overtimePay = overtimeHours * overtimeRate;
  return {
    regularHours,
    overtimeHours,
    regularPay,
    overtimeRate,
    overtimePay,
    total: regularPay + overtimePay,
  };
}

const usd = (digits: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
const cache: Record<number, Intl.NumberFormat> = {};

export function money(n: number, digits = 2): string {
  if (!Number.isFinite(n)) {
    return "-";
  }
  return (cache[digits] ??= usd(digits)).format(n);
}

export function percent(n: number, digits = 2): string {
  if (!Number.isFinite(n)) {
    return "-";
  }
  return `${n.toFixed(digits).replace(/\.?0+$/, "")}%`;
}

/** Parse a user-typed number; empty or invalid input gives NaN. */
export function num(value: string): number {
  const v = value.trim().replace(/,/g, "");
  return v === "" ? NaN : Number(v);
}
