"use client";

import { useMemo, useState } from "react";
import {
  DEFAULT_SCHEDULE,
  UNITS,
  UNIT_LABEL,
  convertAll,
  isValidSchedule,
  money,
  num,
  type Unit,
} from "@/lib/pay";

/** Convert one pay figure into every other pay period. `focus` highlights the result the page is about. */
export default function PayConverter({
  initialAmount,
  initialUnit,
  focus,
}: {
  initialAmount: string;
  initialUnit: Unit;
  focus?: Unit;
}) {
  const [amount, setAmount] = useState(initialAmount);
  const [unit, setUnit] = useState<Unit>(initialUnit);
  const [hours, setHours] = useState(String(DEFAULT_SCHEDULE.hoursPerWeek));
  const [days, setDays] = useState(String(DEFAULT_SCHEDULE.daysPerWeek));
  const [weeks, setWeeks] = useState(String(DEFAULT_SCHEDULE.weeksPerYear));

  const result = useMemo(() => {
    const a = num(amount);
    const schedule = { hoursPerWeek: num(hours), daysPerWeek: num(days), weeksPerYear: num(weeks) };
    if (!Number.isFinite(a) || a < 0) {
      return { kind: "idle" as const, text: "Enter an amount to see every pay period." };
    }
    if (!isValidSchedule(schedule)) {
      return {
        kind: "err" as const,
        text: "Check your schedule: hours up to 168 a week, days up to 7, weeks up to 53.",
      };
    }
    return { kind: "ok" as const, values: convertAll(a, unit, schedule) };
  }, [amount, unit, hours, days, weeks]);

  const highlight = focus ?? "annual";

  return (
    <div className="tool">
      <div className="fields">
        <div className="fld lg:col-span-1">
          <label htmlFor="pay-amount">Pay amount ($)</label>
          <input
            id="pay-amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 25"
            autoComplete="off"
          />
        </div>
        <div className="fld">
          <label htmlFor="pay-unit">Per</label>
          <select id="pay-unit" value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
            {UNITS.map((u) => (
              <option key={u} value={u}>
                {UNIT_LABEL[u]}
              </option>
            ))}
          </select>
        </div>
        <div className="fld">
          <label htmlFor="pay-hours">Hours per week</label>
          <input
            id="pay-hours"
            type="text"
            inputMode="decimal"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="pay-days">Days per week</label>
          <input
            id="pay-days"
            type="text"
            inputMode="decimal"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="pay-weeks">Weeks per year</label>
          <input
            id="pay-weeks"
            type="text"
            inputMode="decimal"
            value={weeks}
            onChange={(e) => setWeeks(e.target.value)}
          />
        </div>
      </div>

      {result.kind !== "ok" ? (
        <p className={`status ${result.kind === "err" ? "err" : ""}`} role="status" aria-live="polite">
          {result.text}
        </p>
      ) : (
        <div role="status" aria-live="polite">
          <div className="tile-grid">
            <div className="tile hero-tile">
              <span className="tile-label">{UNIT_LABEL[highlight]}</span>
              <span className="tile-value">
                {money(result.values[highlight], highlight === "annual" ? 0 : 2)}
              </span>
            </div>
          </div>
          <table className="result-table">
            <thead>
              <tr>
                <th scope="col">Pay period</th>
                <th scope="col" className="text-right">
                  Gross pay
                </th>
              </tr>
            </thead>
            <tbody>
              {UNITS.map((u) => (
                <tr key={u} className={u === highlight ? "is-focus" : ""}>
                  <th scope="row">{UNIT_LABEL[u]}</th>
                  <td className="text-right">
                    {money(result.values[u], u === "annual" || u === "quarterly" ? 0 : 2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="meta mt-3">Gross pay, before taxes and deductions.</p>
        </div>
      )}
    </div>
  );
}
