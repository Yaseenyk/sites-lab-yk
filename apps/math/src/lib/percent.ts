/** Percentage arithmetic. All functions are pure; NaN is returned when the question has no answer. */

/** P% of X. */
export const percentOf = (p: number, x: number): number => (p / 100) * x;

/** A is what percent of B. */
export const whatPercent = (a: number, b: number): number => (b === 0 ? NaN : (a / b) * 100);

/** A is P% of what number. */
export const wholeFromPart = (a: number, p: number): number => (p === 0 ? NaN : a / (p / 100));

/** Increase `v` by `p` percent. */
export const increaseBy = (v: number, p: number): number => v * (1 + p / 100);

/** Decrease `v` by `p` percent. */
export const decreaseBy = (v: number, p: number): number => v * (1 - p / 100);

/** Percent change from `from` to `to`, relative to the starting value. Negative for a decrease. */
export const percentChange = (from: number, to: number): number =>
  from === 0 ? NaN : ((to - from) / Math.abs(from)) * 100;

/** Percent difference: the gap between two values relative to their average. Symmetric in a and b. */
export const percentDifference = (a: number, b: number): number => {
  const mean = (a + b) / 2;
  return mean === 0 ? NaN : (Math.abs(a - b) / Math.abs(mean)) * 100;
};

/** Format up to `max` decimals, dropping trailing zeros: 12.5, 12, 0.3333. */
export function fmt(n: number, max = 6): string {
  if (!Number.isFinite(n)) {
    return "-";
  }
  const rounded = Number(n.toFixed(max));
  return rounded.toLocaleString("en-US", { maximumFractionDigits: max });
}

/** Parse typed input: empty or invalid gives NaN. Commas are ignored. */
export function num(value: string): number {
  const v = value.trim().replace(/,/g, "");
  return v === "" ? NaN : Number(v);
}

/** Greatest common divisor of two integers. */
export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}

/** Scale decimals to integers: 1.5 and 2 become 15 and 20. Returns null for non-finite or huge inputs. */
function toIntegers(a: number, b: number): [number, number] | null {
  const decimals = (n: number) => (String(n).split(".")[1] ?? "").length;
  const places = Math.max(decimals(a), decimals(b));
  if (!Number.isFinite(a) || !Number.isFinite(b) || places > 6) {
    return null;
  }
  const k = 10 ** places;
  return [Math.round(a * k), Math.round(b * k)];
}

/** Simplify a ratio a:b to its smallest whole numbers, e.g. 6:4 -> 3:2. Null when it cannot be simplified. */
export function simplifyRatio(a: number, b: number): [number, number] | null {
  const ints = toIntegers(a, b);
  if (!ints || (ints[0] === 0 && ints[1] === 0)) {
    return null;
  }
  const g = gcd(ints[0], ints[1]);
  return [ints[0] / g, ints[1] / g];
}

/** Solve a:b = c:x for x. */
export const solveRatio = (a: number, b: number, c: number): number => (a === 0 ? NaN : (b * c) / a);

export interface Stats {
  count: number;
  sum: number;
  mean: number;
  median: number;
  modes: number[];
  min: number;
  max: number;
  range: number;
}

/** Descriptive statistics for a list of numbers. Null for an empty list. */
export function stats(values: number[]): Stats | null {
  if (values.length === 0) {
    return null;
  }
  const sorted = [...values].sort((x, y) => x - y);
  const n = sorted.length;
  const sum = sorted.reduce((s, v) => s + v, 0);
  const mid = Math.floor(n / 2);
  const median =
    n % 2 === 1 ? (sorted[mid] as number) : ((sorted[mid - 1] as number) + (sorted[mid] as number)) / 2;
  const counts = new Map<number, number>();
  for (const v of sorted) {
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  const top = Math.max(...counts.values());
  const modes = top > 1 ? [...counts.entries()].filter(([, c]) => c === top).map(([v]) => v) : [];
  const min = sorted[0] as number;
  const max = sorted[n - 1] as number;
  return { count: n, sum, mean: sum / n, median, modes, min, max, range: max - min };
}

/** Pull numbers out of free text separated by commas, spaces or new lines. Returns the numbers and any bad tokens. */
export function parseNumbers(text: string): { values: number[]; bad: string[] } {
  const tokens = text.split(/[\s,;]+/).filter(Boolean);
  const values: number[] = [];
  const bad: string[] = [];
  for (const t of tokens) {
    const v = Number(t);
    if (Number.isFinite(v)) {
      values.push(v);
    } else {
      bad.push(t);
    }
  }
  return { values, bad };
}
