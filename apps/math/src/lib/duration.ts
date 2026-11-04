/** Arithmetic on lengths of time (days, hours, minutes, seconds). Everything is done in whole seconds. */

export interface Duration {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const ZERO: Duration = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export const toSeconds = (d: Duration): number => ((d.days * 24 + d.hours) * 60 + d.minutes) * 60 + d.seconds;

export interface Breakdown extends Duration {
  negative: boolean;
}

/** Split a number of seconds into days, hours, minutes and seconds. The sign is kept separately. */
export function fromSeconds(total: number): Breakdown {
  const negative = total < 0;
  let rest = Math.round(Math.abs(total));
  const days = Math.floor(rest / 86400);
  rest -= days * 86400;
  const hours = Math.floor(rest / 3600);
  rest -= hours * 3600;
  const minutes = Math.floor(rest / 60);
  return { negative, days, hours, minutes, seconds: rest - minutes * 60 };
}

/** Add or subtract two durations. */
export function combine(a: Duration, b: Duration, op: "add" | "subtract"): Breakdown {
  const sa = toSeconds(a);
  const sb = toSeconds(b);
  return fromSeconds(op === "add" ? sa + sb : sa - sb);
}

/** 3 days 4 h 5 m 6 s -> "3 days, 4 hours, 5 minutes, 6 seconds". Zero parts are dropped; zero total reads "0 seconds". */
export function describe(d: Breakdown): string {
  const parts: [number, string][] = [
    [d.days, "day"],
    [d.hours, "hour"],
    [d.minutes, "minute"],
    [d.seconds, "second"],
  ];
  const text = parts
    .filter(([n]) => n > 0)
    .map(([n, unit]) => `${n} ${unit}${n === 1 ? "" : "s"}`)
    .join(", ");
  if (!text) {
    return "0 seconds";
  }
  return d.negative ? `-${text}` : text;
}

/** Total of a breakdown in other units. */
export const totalIn = (d: Breakdown, unit: "hours" | "minutes" | "seconds" | "days"): number => {
  const secs = toSeconds(d) * (d.negative ? -1 : 1);
  const divisor = { seconds: 1, minutes: 60, hours: 3600, days: 86400 }[unit];
  return secs / divisor;
};
