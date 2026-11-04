"use client";

import { useMemo, useState } from "react";
import { formatHM, minutesBetween, parseTime } from "@/lib/dates";
import { fmt, num } from "@/lib/percent";
import { Hint, Tile } from "./ui";

interface Row {
  start: string;
  end: string;
  brk: string;
}

const blank = (): Row => ({ start: "09:00", end: "17:00", brk: "30" });

/** Hours worked per day from start and end times with a break, totalled, in H:MM and decimal hours. */
export default function HoursCalculator() {
  const [rows, setRows] = useState<Row[]>([blank()]);

  const update = (i: number, patch: Partial<Row>) =>
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  const computed = useMemo(
    () =>
      rows.map((r) => {
        const s = parseTime(r.start);
        const e = parseTime(r.end);
        const b = r.brk.trim() === "" ? 0 : num(r.brk);
        if (s === null || e === null || !Number.isFinite(b) || b < 0) {
          return null;
        }
        const worked = minutesBetween(s, e) - b;
        return worked >= 0 ? worked : null;
      }),
    [rows],
  );

  const total = computed.reduce<number>((sum, m) => sum + (m ?? 0), 0);
  const valid = computed.some((m) => m !== null);

  return (
    <div className="tool">
      <div className="hours-rows">
        {rows.map((r, i) => (
          <div key={i} className="fields hours-row">
            <div className="fld">
              <label htmlFor={`h-s-${i}`}>Day {i + 1}: start</label>
              <input
                id={`h-s-${i}`}
                type="time"
                value={r.start}
                onChange={(e) => update(i, { start: e.target.value })}
              />
            </div>
            <div className="fld">
              <label htmlFor={`h-e-${i}`}>End</label>
              <input
                id={`h-e-${i}`}
                type="time"
                value={r.end}
                onChange={(e) => update(i, { end: e.target.value })}
              />
            </div>
            <div className="fld">
              <label htmlFor={`h-b-${i}`}>Break (minutes)</label>
              <input
                id={`h-b-${i}`}
                type="text"
                inputMode="numeric"
                value={r.brk}
                onChange={(e) => update(i, { brk: e.target.value })}
              />
            </div>
            <div className="fld hours-total">
              {computed[i] === null ? (
                <span className="meta">Check the times</span>
              ) : (
                <strong>{formatHM(computed[i] as number)}</strong>
              )}
              {rows.length > 1 && (
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setRows((prev) => prev.filter((_, idx) => idx !== i))}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <button type="button" className="secondary" onClick={() => setRows((prev) => [...prev, blank()])}>
          Add another day
        </button>
      </div>
      {!valid ? (
        <Hint error>Enter valid start and end times (24-hour, like 09:00).</Hint>
      ) : (
        <div className="tile-grid" role="status" aria-live="polite">
          <Tile hero label="Total time" value={`${formatHM(total)} (${fmt(total / 60, 2)} hours)`} />
          <Tile label="Decimal hours" value={fmt(total / 60, 4)} />
          <Tile label="Days counted" value={String(computed.filter((m) => m !== null).length)} />
        </div>
      )}
      <p className="meta mt-3">
        If an end time is earlier than the start time, the shift is counted as ending the next day.
      </p>
    </div>
  );
}
