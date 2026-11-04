"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  businessDays,
  daysBetween,
  diffYMD,
  formatDate,
  parseDate,
  todayLocalIso,
  weekdayName,
} from "@/lib/dates";
import { fmt, num } from "@/lib/percent";
import { Field, Hint, Tile } from "./ui";

/** Days, weeks, months and working days between two dates. */
export function DateDiffCalculator() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [inclusive, setInclusive] = useState(false);

  useEffect(() => {
    const t = todayLocalIso();
    setFrom(t);
    setTo(t);
  }, []);

  const r = useMemo(() => {
    const a = parseDate(from);
    const b = parseDate(to);
    if (!a || !b) {
      return null;
    }
    const [start, end] = a.getTime() <= b.getTime() ? [a, b] : [b, a];
    const days = daysBetween(start, end) + (inclusive ? 1 : 0);
    return {
      reversed: a.getTime() > b.getTime(),
      days,
      weeks: Math.floor(days / 7),
      rest: days % 7,
      ymd: diffYMD(start, end),
      work: businessDays(start, inclusive ? addDays(end, 1) : end),
    };
  }, [from, to, inclusive]);

  return (
    <div className="tool">
      <div className="fields">
        <Field id="dd-from" label="Start date" type="date" value={from} onChange={setFrom} />
        <Field id="dd-to" label="End date" type="date" value={to} onChange={setTo} />
        <label className="opt">
          <input type="checkbox" checked={inclusive} onChange={(e) => setInclusive(e.target.checked)} /> Count
          the end date too
        </label>
      </div>
      {!r ? (
        <Hint>Choose both dates.</Hint>
      ) : (
        <div role="status" aria-live="polite">
          <div className="tile-grid">
            <Tile hero label="Days between" value={fmt(r.days, 0)} />
            <Tile label="In weeks" value={`${fmt(r.weeks, 0)} weeks, ${r.rest} days`} />
            <Tile label="In months" value={`${r.ymd.years * 12 + r.ymd.months} months, ${r.ymd.days} days`} />
          </div>
          <table className="result-table">
            <tbody>
              <tr>
                <th scope="row">Years, months, days</th>
                <td className="text-right">
                  {r.ymd.years}y {r.ymd.months}m {r.ymd.days}d
                </td>
              </tr>
              <tr>
                <th scope="row">Working days (Mon to Fri)</th>
                <td className="text-right">{fmt(r.work, 0)}</td>
              </tr>
            </tbody>
          </table>
          {r.reversed && (
            <p className="meta mt-3">The end date is before the start date, so the dates were swapped.</p>
          )}
          <p className="meta mt-3">Working days exclude weekends only, not public holidays.</p>
        </div>
      )}
    </div>
  );
}

/** Add or subtract years, months and days from a date. */
export function DateAddCalculator() {
  const [start, setStart] = useState("");
  const [op, setOp] = useState<"add" | "subtract">("add");
  const [years, setYears] = useState("0");
  const [months, setMonths] = useState("0");
  const [days, setDays] = useState("30");

  useEffect(() => {
    setStart(todayLocalIso());
  }, []);

  const result = useMemo(() => {
    const d = parseDate(start);
    const y = num(years);
    const m = num(months);
    const n = num(days);
    if (!d || ![y, m, n].every((x) => Number.isInteger(x))) {
      return null;
    }
    const sign = op === "add" ? 1 : -1;
    return addDays(addMonths(d, sign * (y * 12 + m)), sign * n);
  }, [start, op, years, months, days]);

  return (
    <div className="tool">
      <div className="fields">
        <Field id="da-start" label="Start date" type="date" value={start} onChange={setStart} />
        <div className="fld">
          <label htmlFor="da-op">Operation</label>
          <select id="da-op" value={op} onChange={(e) => setOp(e.target.value as "add" | "subtract")}>
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
          </select>
        </div>
        <Field id="da-y" label="Years" value={years} onChange={setYears} />
        <Field id="da-m" label="Months" value={months} onChange={setMonths} />
        <Field id="da-d" label="Days" value={days} onChange={setDays} />
      </div>
      {!result ? (
        <Hint>Choose a start date and enter whole numbers for years, months and days.</Hint>
      ) : (
        <div role="status" aria-live="polite">
          <div className="tile-grid">
            <Tile
              hero
              label={op === "add" ? "Date after adding" : "Date after subtracting"}
              value={formatDate(result)}
            />
            <Tile label="Day of the week" value={weekdayName(result)} />
          </div>
          <p className="meta mt-3">
            Months are added first, then days. If the day does not exist in the target month, it moves to the
            last day of that month.
          </p>
        </div>
      )}
    </div>
  );
}
