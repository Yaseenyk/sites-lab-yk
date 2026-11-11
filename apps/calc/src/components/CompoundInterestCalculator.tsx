"use client";

import { useMemo, useState } from "react";
import { compoundInterest, compoundYearlyGrowth } from "@/lib/compoundInterest";
import { money, num } from "@/lib/pay";

const FREQUENCIES = [
  { label: "Annually", value: 1 },
  { label: "Semi-annually", value: 2 },
  { label: "Quarterly", value: 4 },
  { label: "Monthly", value: 12 },
] as const;

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("8");
  const [years, setYears] = useState("10");
  const [frequency, setFrequency] = useState("1");

  const result = useMemo(() => {
    const p = num(principal);
    if (!Number.isFinite(p) || p <= 0) {
      return { kind: "idle" as const, text: "Enter the principal amount." };
    }
    const r = num(rate);
    if (!Number.isFinite(r) || r < 0 || r > 50) {
      return { kind: "idle" as const, text: "Enter an interest rate between 0 and 50 percent." };
    }
    const y = num(years);
    if (!Number.isFinite(y) || y <= 0 || y > 50) {
      return { kind: "idle" as const, text: "Enter a duration between 1 and 50 years." };
    }
    const n = Number(frequency);
    return {
      kind: "ok" as const,
      c: compoundInterest(p, r, y, n),
      yearly: compoundYearlyGrowth(p, r, y, n),
    };
  }, [principal, rate, years, frequency]);

  return (
    <div className="tool">
      <div className="fields">
        <div className="fld">
          <label htmlFor="ci-principal">Principal amount (₹)</label>
          <input
            id="ci-principal"
            type="text"
            inputMode="decimal"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="ci-rate">Annual interest rate (%)</label>
          <input id="ci-rate" type="text" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
        <div className="fld">
          <label htmlFor="ci-years">Time (years)</label>
          <input
            id="ci-years"
            type="text"
            inputMode="decimal"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="ci-freq">Compounding frequency</label>
          <select id="ci-freq" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
            {FREQUENCIES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {result.kind !== "ok" ? (
        <p className="status" role="status" aria-live="polite">
          {result.text}
        </p>
      ) : (
        <div role="status" aria-live="polite">
          <div className="tile-grid">
            <div className="tile hero-tile">
              <span className="tile-label">Maturity value</span>
              <span className="tile-value">{money(result.c.maturityValue, 0, "INR")}</span>
            </div>
            <div className="tile">
              <span className="tile-label">Total interest</span>
              <span className="tile-value">{money(result.c.totalInterest, 0, "INR")}</span>
            </div>
          </div>
          <h3 className="mb-2 mt-6 text-sm font-semibold text-zinc-300">Year-by-year growth</h3>
          <table className="result-table">
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col" className="text-right">
                  Value
                </th>
                <th scope="col" className="text-right">
                  Interest that year
                </th>
              </tr>
            </thead>
            <tbody>
              {result.yearly.map((y) => (
                <tr key={y.year}>
                  <th scope="row">Year {y.year}</th>
                  <td className="text-right">{money(y.value, 0, "INR")}</td>
                  <td className="text-right">{money(y.interestThisYear, 0, "INR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
