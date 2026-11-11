/** Percentage arithmetic for the percentage calculator. `percentChange` (change between two values) lives in pay.ts. */

/** `percent` percent of `of`. */
export const percentOf = (percent: number, of: number): number => (percent / 100) * of;

/** What percent `part` is of `whole`. NaN when whole is zero. */
export const isWhatPercentOf = (part: number, whole: number): number =>
  whole === 0 ? NaN : (part / whole) * 100;

/** The original value that, changed by `percent`, gives `result`. The inverse of applying a percent change. */
export const percentChangeFrom = (result: number, percent: number): number => result / (1 + percent / 100);
