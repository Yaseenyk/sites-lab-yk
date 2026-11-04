"use client";

import { useMemo, useState } from "react";
import { money, num, overtime } from "@/lib/pay";

/**
 * "overtime": a week of pay, with hours past a threshold paid at a multiple of the base rate.
 * "timehalf": the multiplied rate itself (time and a half, double time) and pay for N hours at it.
 */
export default function OvertimeCalculator({ mode }: { mode: "overtime" | "timehalf" }) {
  const [rate, setRate] = useState("20");
  const [hours, setHours] = useState(mode === "overtime" ? "45" : "5");
  const [threshold, setThreshold] = useState("40");
  const [multiplier, setMultiplier] = useState("1.5");

  const result = useMemo(() => {
    const r = num(rate);
    const h = num(hours);
    const m = num(multiplier);
    if (!Number.isFinite(r) || r < 0) {
      return { kind: "idle" as const, text: "Enter your hourly rate." };
    }
    if (!Number.isFinite(h) || h < 0) {
      return { kind: "idle" as const, text: "Enter the hours." };
    }
    if (mode === "overtime") {
      const t = num(threshold);
      if (!Number.isFinite(t) || t < 0) {
        return { kind: "idle" as const, text: "Enter the overtime threshold." };
      }
      return { kind: "ok" as const, ot: overtime(r, h, t, m), r, h, m };
    }
    return { kind: "ok" as const, ot: null, r, h, m };
  }, [mode, rate, hours, threshold, multiplier]);

  return (
    <div className="tool">
      <div className="fields">
        <div className="fld">
          <label htmlFor="o-rate">Regular hourly rate ($)</label>
          <input
            id="o-rate"
            type="text"
            inputMode="decimal"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="o-hours">
            {mode === "overtime" ? "Hours worked this week" : "Hours at the higher rate"}
          </label>
          <input
            id="o-hours"
            type="text"
            inputMode="decimal"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        {mode === "overtime" && (
          <div className="fld">
            <label htmlFor="o-threshold">Overtime starts after (hours)</label>
            <input
              id="o-threshold"
              type="text"
              inputMode="decimal"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
            />
          </div>
        )}
        <div className="fld">
          <label htmlFor="o-mult">Overtime multiplier</label>
          <select id="o-mult" value={multiplier} onChange={(e) => setMultiplier(e.target.value)}>
            <option value="1.5">1.5x (time and a half)</option>
            <option value="2">2x (double time)</option>
            <option value="2.5">2.5x (double time and a half)</option>
          </select>
        </div>
      </div>

      {result.kind !== "ok" ? (
        <p className="status" role="status" aria-live="polite">
          {result.text}
        </p>
      ) : (
        <div role="status" aria-live="polite">
          {result.ot ? (
            <>
              <div className="tile-grid">
                <div className="tile hero-tile">
                  <span className="tile-label">Total pay for the week</span>
                  <span className="tile-value">{money(result.ot.total)}</span>
                </div>
                <div className="tile">
                  <span className="tile-label">Overtime rate</span>
                  <span className="tile-value">{money(result.ot.overtimeRate)}/hr</span>
                </div>
                <div className="tile">
                  <span className="tile-label">Overtime pay</span>
                  <span className="tile-value">{money(result.ot.overtimePay)}</span>
                </div>
              </div>
              <table className="result-table">
                <thead>
                  <tr>
                    <th scope="col">Part of the week</th>
                    <th scope="col" className="text-right">
                      Hours
                    </th>
                    <th scope="col" className="text-right">
                      Pay
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Regular hours at {money(result.r)}</th>
                    <td className="text-right">{result.ot.regularHours}</td>
                    <td className="text-right">{money(result.ot.regularPay)}</td>
                  </tr>
                  <tr>
                    <th scope="row">Overtime hours at {money(result.ot.overtimeRate)}</th>
                    <td className="text-right">{result.ot.overtimeHours}</td>
                    <td className="text-right">{money(result.ot.overtimePay)}</td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <>
              <div className="tile-grid">
                <div className="tile hero-tile">
                  <span className="tile-label">Rate at {result.m}x</span>
                  <span className="tile-value">{money(result.r * result.m)}/hr</span>
                </div>
                <div className="tile">
                  <span className="tile-label">
                    Pay for {result.h} hour{result.h === 1 ? "" : "s"}
                  </span>
                  <span className="tile-value">{money(result.r * result.m * result.h)}</span>
                </div>
              </div>
              <table className="result-table">
                <thead>
                  <tr>
                    <th scope="col">Multiplier</th>
                    <th scope="col" className="text-right">
                      Hourly rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[1.5, 2, 2.5].map((m) => (
                    <tr key={m} className={m === result.m ? "is-focus" : ""}>
                      <th scope="row">{m}x</th>
                      <td className="text-right">{money(result.r * m)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          <p className="meta mt-3">Gross pay, before taxes and deductions.</p>
        </div>
      )}
    </div>
  );
}
