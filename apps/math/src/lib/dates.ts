/** Calendar arithmetic on plain dates. Everything runs in UTC so daylight saving never shifts a day. */

export interface YMD {
  years: number;
  months: number;
  days: number;
}

const MS_DAY = 86_400_000;

/** Parse yyyy-mm-dd into a UTC date. Null when the text is not a real calendar date. */
export function parseDate(text: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text.trim());
  if (!m) {
    return null;
  }
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(y, mo - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === mo - 1 && date.getUTCDate() === d
    ? date
    : null;
}

export const toIso = (d: Date): string => d.toISOString().slice(0, 10);

export const daysInMonth = (year: number, month0: number): number =>
  new Date(Date.UTC(year, month0 + 1, 0)).getUTCDate();

export const isLeapYear = (y: number): boolean => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

/** Whole days from a to b (b minus a). Negative when b is earlier. */
export const daysBetween = (a: Date, b: Date): number => Math.round((b.getTime() - a.getTime()) / MS_DAY);

export function addDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * MS_DAY);
}

/** Add calendar months. If the day does not exist in the target month it is clamped: 31 Jan + 1 month = 28/29 Feb. */
export function addMonths(d: Date, n: number): Date {
  const total = d.getUTCFullYear() * 12 + d.getUTCMonth() + n;
  const year = Math.floor(total / 12);
  const month = total - year * 12;
  const day = Math.min(d.getUTCDate(), daysInMonth(year, month));
  return new Date(Date.UTC(year, month, day));
}

/**
 * Years, months and days from `from` to `to` (`to` must not be earlier). It adds whole calendar months to `from`
 * (clamping the day, as addMonths does) for as long as that stays on or before `to`, then counts the leftover days.
 */
export function diffYMD(from: Date, to: Date): YMD {
  let months = (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + (to.getUTCMonth() - from.getUTCMonth());
  if (months < 0) {
    return { years: 0, months: 0, days: 0 };
  }
  if (addMonths(from, months).getTime() > to.getTime()) {
    months -= 1;
  }
  const anchor = addMonths(from, months);
  return { years: Math.floor(months / 12), months: months % 12, days: daysBetween(anchor, to) };
}

/** The next birthday on or after `today`. A 29 February birthday falls on 28 February in non-leap years. */
export function nextBirthday(dob: Date, today: Date): Date {
  const make = (year: number): Date =>
    new Date(
      Date.UTC(year, dob.getUTCMonth(), Math.min(dob.getUTCDate(), daysInMonth(year, dob.getUTCMonth()))),
    );
  const thisYear = make(today.getUTCFullYear());
  return thisYear.getTime() >= today.getTime() ? thisYear : make(today.getUTCFullYear() + 1);
}

/** Monday to Friday days from a (inclusive) up to b (exclusive). No public holidays are considered. */
export function businessDays(a: Date, b: Date): number {
  if (b.getTime() <= a.getTime()) {
    return 0;
  }
  const total = daysBetween(a, b);
  const fullWeeks = Math.floor(total / 7);
  let count = fullWeeks * 5;
  const start = a.getUTCDay();
  for (let i = 0; i < total % 7; i++) {
    const dow = (start + i) % 7;
    if (dow !== 0 && dow !== 6) {
      count += 1;
    }
  }
  return count;
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const weekdayName = (d: Date): string => WEEKDAYS[d.getUTCDay()] as string;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const formatDate = (d: Date): string =>
  `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()] as string} ${d.getUTCFullYear()}`;

/** Today's date in the visitor's own time zone, as yyyy-mm-dd. */
export function todayLocalIso(now = new Date()): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

/** Parse HH:MM (24 hour) into minutes since midnight. Null when invalid. */
export function parseTime(text: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(text.trim());
  if (!m) {
    return null;
  }
  const h = Number(m[1]);
  const min = Number(m[2]);
  return h <= 23 && min <= 59 ? h * 60 + min : null;
}

/** Minutes worked between two clock times; an end earlier than the start means the next day. */
export function minutesBetween(start: number, end: number): number {
  return end >= start ? end - start : end + 1440 - start;
}

/** 495 -> "8:15". */
export function formatHM(totalMinutes: number): string {
  const sign = totalMinutes < 0 ? "-" : "";
  const abs = Math.abs(Math.round(totalMinutes));
  return `${sign}${Math.floor(abs / 60)}:${String(abs % 60).padStart(2, "0")}`;
}
