"use client";

import { useEffect, useMemo, useState } from "react";
import {
  daysBetween,
  diffYMD,
  formatDate,
  nextBirthday,
  parseDate,
  todayLocalIso,
  weekdayName,
} from "@/lib/dates";
import { fmt } from "@/lib/percent";
import { Field, Hint, Tile } from "./ui";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState("");

  // Today depends on the visitor's clock, so it is filled in after the page loads.
  useEffect(() => {
    setAsOf(todayLocalIso());
  }, []);

  const result = useMemo(() => {
    const born = parseDate(dob);
    const at = parseDate(asOf);
    if (!born) {
      return { kind: "idle" as const, text: "Enter a date of birth to see the age." };
    }
    if (!at) {
      return { kind: "idle" as const, text: "Enter the date to measure the age on." };
    }
    if (at.getTime() < born.getTime()) {
      return { kind: "err" as const, text: "The date of birth is after the date being measured." };
    }
    const ymd = diffYMD(born, at);
    const totalDays = daysBetween(born, at);
    const next = nextBirthday(born, at);
    return {
      kind: "ok" as const,
      ymd,
      totalDays,
      totalMonths: ymd.years * 12 + ymd.months,
      weeks: Math.floor(totalDays / 7),
      next,
      untilNext: daysBetween(at, next),
      weekday: weekdayName(born),
    };
  }, [dob, asOf]);

  return (
    <div className="tool">
      <div className="fields">
        <Field id="age-dob" label="Date of birth" type="date" value={dob} onChange={setDob} />
        <Field id="age-asof" label="Age on (default: today)" type="date" value={asOf} onChange={setAsOf} />
      </div>
      {result.kind !== "ok" ? (
        <Hint error={result.kind === "err"}>{result.text}</Hint>
      ) : (
        <div role="status" aria-live="polite">
          <div className="tile-grid">
            <Tile
              hero
              label="Age"
              value={`${result.ymd.years} years, ${result.ymd.months} months, ${result.ymd.days} days`}
            />
            <Tile
              label="Next birthday"
              value={`${formatDate(result.next)} (${result.untilNext === 0 ? "today" : `in ${fmt(result.untilNext, 0)} days`})`}
            />
            <Tile label="Born on a" value={result.weekday} />
          </div>
          <table className="result-table">
            <tbody>
              <tr>
                <th scope="row">Total months</th>
                <td className="text-right">{fmt(result.totalMonths, 0)}</td>
              </tr>
              <tr>
                <th scope="row">Total weeks</th>
                <td className="text-right">{fmt(result.weeks, 0)}</td>
              </tr>
              <tr>
                <th scope="row">Total days</th>
                <td className="text-right">{fmt(result.totalDays, 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
