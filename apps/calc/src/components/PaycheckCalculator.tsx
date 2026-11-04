"use client";

import { useMemo, useState } from "react";
import { money, num } from "@/lib/pay";
import { STATES } from "@/lib/states";
import {
  FILING_LABEL,
  FREQUENCIES,
  FREQUENCY_LABEL,
  PERIODS_PER_YEAR,
  TAX_YEAR,
  paycheck,
  type FilingStatus,
  type Frequency,
} from "@/lib/paycheck";

/**
 * "salary": enter a yearly salary. "hourly": enter an hourly rate and weekly hours.
 * Everything else (deductions, filing status, state) is the same.
 */
export default function PaycheckCalculator({ mode }: { mode: "salary" | "hourly" }) {
  const [amount, setAmount] = useState(mode === "salary" ? "60000" : "25");
  const [hours, setHours] = useState("40");
  const [frequency, setFrequency] = useState<Frequency>("biweekly");
  const [status, setStatus] = useState<FilingStatus>("single");
  const [stateName, setStateName] = useState("");
  const [statePct, setStatePct] = useState("0");
  const [retirement, setRetirement] = useState("0");
  const [benefits, setBenefits] = useState("0");
  const [afterTax, setAfterTax] = useState("0");

  const result = useMemo(() => {
    const a = num(amount);
    if (!Number.isFinite(a) || a < 0) {
      return {
        kind: "idle" as const,
        text: mode === "salary" ? "Enter your yearly salary." : "Enter your hourly rate.",
      };
    }
    const h = num(hours);
    if (mode === "hourly" && (!Number.isFinite(h) || h < 0 || h > 168)) {
      return { kind: "idle" as const, text: "Enter the hours you work in a week (0 to 168)." };
    }
    const s = num(statePct);
    if (!Number.isFinite(s) || s < 0 || s > 25) {
      return { kind: "idle" as const, text: "Enter a state tax rate between 0 and 25 percent." };
    }
    const n = PERIODS_PER_YEAR[frequency];
    // The three per-paycheck deductions default to blank-as-zero.
    const perCheck = (v: string) => (v.trim() === "" ? 0 : num(v));
    const r = perCheck(retirement);
    const b = perCheck(benefits);
    const t = perCheck(afterTax);
    if ([r, b, t].some((v) => !Number.isFinite(v) || v < 0)) {
      return { kind: "idle" as const, text: "Deductions must be zero or more." };
    }
    const annualGross = mode === "salary" ? a : a * h * 52;
    if (r * n + b * n > annualGross) {
      return { kind: "idle" as const, text: "Your deductions are larger than your pay." };
    }
    const p = paycheck({
      annualGross,
      periodsPerYear: n,
      status,
      retirement: r * n,
      benefits: b * n,
      afterTax: t * n,
      statePercent: s,
    });
    if (p.annual.net < 0) {
      return { kind: "idle" as const, text: "Your deductions are larger than your pay." };
    }
    return { kind: "ok" as const, p, n, s };
  }, [mode, amount, hours, frequency, status, statePct, retirement, benefits, afterTax]);

  const field = (id: string, label: string, value: string, set: (v: string) => void, hint?: string) => (
    <div className="fld">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" inputMode="decimal" value={value} onChange={(e) => set(e.target.value)} />
      {hint && <span className="text-xs text-zinc-500">{hint}</span>}
    </div>
  );

  return (
    <div className="tool">
      <div className="fields">
        {field(
          "pc-amount",
          mode === "salary" ? "Yearly salary before tax ($)" : "Hourly rate ($)",
          amount,
          setAmount,
        )}
        {mode === "hourly" && field("pc-hours", "Hours per week", hours, setHours)}
        <div className="fld">
          <label htmlFor="pc-freq">Paid</label>
          <select id="pc-freq" value={frequency} onChange={(e) => setFrequency(e.target.value as Frequency)}>
            {FREQUENCIES.map((f) => (
              <option key={f} value={f}>
                {FREQUENCY_LABEL[f]}
              </option>
            ))}
          </select>
        </div>
        <div className="fld">
          <label htmlFor="pc-status">Filing status</label>
          <select id="pc-status" value={status} onChange={(e) => setStatus(e.target.value as FilingStatus)}>
            {(Object.keys(FILING_LABEL) as FilingStatus[]).map((k) => (
              <option key={k} value={k}>
                {FILING_LABEL[k]}
              </option>
            ))}
          </select>
        </div>
        <div className="fld">
          <label htmlFor="pc-statename">State</label>
          <select
            id="pc-statename"
            value={stateName}
            onChange={(e) => {
              setStateName(e.target.value);
              const found = STATES.find((x) => x.name === e.target.value);
              if (found) {
                setStatePct(String(found.percent));
              }
            }}
          >
            <option value="">Other state (enter rate below)</option>
            {STATES.map((x) => (
              <option key={x.name} value={x.name}>
                {x.name} ({x.percent === 0 ? "no wage tax" : `${x.percent}% flat`})
              </option>
            ))}
          </select>
        </div>
        {field(
          "pc-state",
          "State and local income tax (%)",
          statePct,
          (v) => {
            setStateName("");
            setStatePct(v);
          },
          "Your own rate, if your state has graduated rates",
        )}
        {field("pc-401k", "Pre-tax retirement per paycheck ($)", retirement, setRetirement, "401(k), 403(b)")}
        {field(
          "pc-benefits",
          "Pre-tax benefits per paycheck ($)",
          benefits,
          setBenefits,
          "Health, dental, HSA, FSA",
        )}
        {field(
          "pc-after",
          "After-tax deductions per paycheck ($)",
          afterTax,
          setAfterTax,
          "Roth 401(k), dues",
        )}
      </div>

      {result.kind !== "ok" ? (
        <p className="status" role="status" aria-live="polite">
          {result.text}
        </p>
      ) : (
        <div role="status" aria-live="polite">
          <div className="tile-grid">
            <div className="tile hero-tile">
              <span className="tile-label">Take-home per paycheck</span>
              <span className="tile-value">{money(result.p.perPeriod.net, 2)}</span>
            </div>
            <div className="tile">
              <span className="tile-label">Take-home per year</span>
              <span className="tile-value">{money(result.p.annual.net, 0)}</span>
            </div>
            <div className="tile">
              <span className="tile-label">Kept from gross pay</span>
              <span className="tile-value">{((1 - result.p.deductionShare) * 100).toFixed(1)}%</span>
            </div>
          </div>
          <table className="result-table">
            <thead>
              <tr>
                <th scope="col">{TAX_YEAR} estimate</th>
                <th scope="col" className="text-right">
                  Per paycheck
                </th>
                <th scope="col" className="text-right">
                  Per year
                </th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Gross pay", "gross", false],
                  ["Pre-tax retirement", "retirement", true],
                  ["Pre-tax benefits", "benefits", true],
                  ["Federal income tax", "federal", true],
                  ["Social Security (6.2%)", "socialSecurity", true],
                  ["Medicare", "medicare", true],
                  ["State and local tax", "state", true],
                  ["After-tax deductions", "afterTax", true],
                ] as const
              ).map(([label, key, minus]) => (
                <tr key={key}>
                  <th scope="row">{label}</th>
                  <td className="text-right">
                    {minus && result.p.perPeriod[key] > 0 ? "-" : ""}
                    {money(result.p.perPeriod[key], 2)}
                  </td>
                  <td className="text-right">
                    {minus && result.p.annual[key] > 0 ? "-" : ""}
                    {money(result.p.annual[key], 0)}
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row">Take-home pay</th>
                <td className="text-right">
                  <strong>{money(result.p.perPeriod.net, 2)}</strong>
                </td>
                <td className="text-right">
                  <strong>{money(result.p.annual.net, 0)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3 text-sm text-zinc-400">
            Federal bracket on your last dollar: {(result.p.marginalRate * 100).toFixed(0)}%. Taxable income
            after the standard deduction: {money(result.p.federalTaxable, 0)}.
            {result.s === 0 && " State tax is set to 0%."}
          </p>
        </div>
      )}
    </div>
  );
}
