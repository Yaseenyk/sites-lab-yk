"use client";

import { useMemo, useState } from "react";
import { convert, currencySymbol } from "@/lib/currency";
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
import CurrencySelect from "./CurrencySelect";
import RateNote from "./RateNote";
import { useRates } from "./useRates";

/**
 * Convert one pay figure into every other pay period, in any currency. `focus` highlights the result the page
 * is about. Optionally shows the same figures in a second currency using live exchange rates.
 */
export default function PayConverter({
  initialAmount,
  initialUnit,
  initialCurrency = "USD",
  initialTarget = "",
  focus,
}: {
  initialAmount: string;
  initialUnit: Unit;
  initialCurrency?: string;
  initialTarget?: string;
  focus?: Unit;
}) {
  const [amount, setAmount] = useState(initialAmount);
  const [unit, setUnit] = useState<Unit>(initialUnit);
  const [currency, setCurrency] = useState(initialCurrency);
  const [target, setTarget] = useState(initialTarget);
  const [hours, setHours] = useState(String(DEFAULT_SCHEDULE.hoursPerWeek));
  const [days, setDays] = useState(String(DEFAULT_SCHEDULE.daysPerWeek));
  const [weeks, setWeeks] = useState(String(DEFAULT_SCHEDULE.weeksPerYear));

  const wantsTarget = target !== "" && target !== currency;
  const rates = useRates(wantsTarget);

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
  const showTarget = wantsTarget && rates.status === "ok";
  const toTarget = (n: number) =>
    rates.status === "ok" ? convert(n, currency, target, rates.data.rates) : NaN;
  const digitsFor = (u: Unit) => (u === "annual" || u === "quarterly" ? 0 : 2);

  return (
    <div className="tool">
      <div className="fields">
        <div className="fld">
          <label htmlFor="pay-amount">Pay amount ({currencySymbol(currency)})</label>
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
          <label htmlFor="pay-currency">Currency</label>
          <CurrencySelect id="pay-currency" value={currency} onChange={setCurrency} />
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
        <div className="fld">
          <label htmlFor="pay-target">Also show in</label>
          <CurrencySelect
            id="pay-target"
            value={target}
            onChange={setTarget}
            allowNone
            noneLabel="Same currency only"
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
                {money(result.values[highlight], digitsFor(highlight), currency)}
              </span>
            </div>
            {showTarget && (
              <div className="tile">
                <span className="tile-label">
                  {UNIT_LABEL[highlight]} in {target}
                </span>
                <span className="tile-value">
                  {money(toTarget(result.values[highlight]), "auto", target)}
                </span>
              </div>
            )}
          </div>
          <table className="result-table">
            <thead>
              <tr>
                <th scope="col">Pay period</th>
                <th scope="col" className="text-right">
                  Gross pay ({currency})
                </th>
                {showTarget && (
                  <th scope="col" className="text-right">
                    In {target}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {UNITS.map((u) => (
                <tr key={u} className={u === highlight ? "is-focus" : ""}>
                  <th scope="row">{UNIT_LABEL[u]}</th>
                  <td className="text-right">{money(result.values[u], digitsFor(u), currency)}</td>
                  {showTarget && (
                    <td className="text-right">{money(toTarget(result.values[u]), "auto", target)}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {wantsTarget && rates.status === "loading" && (
            <p className="meta mt-3">Loading live exchange rates...</p>
          )}
          {wantsTarget && rates.status === "error" && (
            <p className="meta mt-3">
              Live exchange rates could not be loaded, so the second currency is hidden.
            </p>
          )}
          {showTarget && rates.status === "ok" && <RateNote data={rates.data} />}
          <p className="meta mt-3">Gross pay, before taxes and deductions.</p>
        </div>
      )}
    </div>
  );
}
