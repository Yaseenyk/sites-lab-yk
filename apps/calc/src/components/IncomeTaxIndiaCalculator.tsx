"use client";

import { useMemo, useState } from "react";
import { AGE_LABEL, incomeTax, type AgeBand, type Regime } from "@/lib/incomeTaxIndia";
import { money, num } from "@/lib/pay";

export default function IncomeTaxIndiaCalculator() {
  const [income, setIncome] = useState("1200000");
  const [regime, setRegime] = useState<Regime>("new");
  const [salaried, setSalaried] = useState(true);
  const [age, setAge] = useState<AgeBand>("below60");
  const [section80C, setSection80C] = useState("0");
  const [section80D, setSection80D] = useState("0");

  const result = useMemo(() => {
    const i = num(income);
    if (!Number.isFinite(i) || i < 0) {
      return { kind: "idle" as const, text: "Enter your annual income." };
    }
    const c = regime === "old" ? num(section80C) : 0;
    const d = regime === "old" ? num(section80D) : 0;
    if (regime === "old" && (!Number.isFinite(c) || c < 0 || !Number.isFinite(d) || d < 0)) {
      return { kind: "idle" as const, text: "Deductions must be zero or more." };
    }
    return {
      kind: "ok" as const,
      t: incomeTax({ annualIncome: i, regime, isSalaried: salaried, age, section80C: c, section80D: d }),
    };
  }, [income, regime, salaried, age, section80C, section80D]);

  return (
    <div className="tool">
      <div className="tabs" role="tablist" aria-label="Tax regime">
        <button
          type="button"
          role="tab"
          aria-selected={regime === "new"}
          className={regime === "new" ? "" : "secondary"}
          onClick={() => setRegime("new")}
        >
          New regime
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={regime === "old"}
          className={regime === "old" ? "" : "secondary"}
          onClick={() => setRegime("old")}
        >
          Old regime
        </button>
      </div>

      <div className="fields mt-4">
        <div className="fld">
          <label htmlFor="it-income">Annual income (₹)</label>
          <input
            id="it-income"
            type="text"
            inputMode="decimal"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="it-salaried">Income type</label>
          <select
            id="it-salaried"
            value={salaried ? "salaried" : "other"}
            onChange={(e) => setSalaried(e.target.value === "salaried")}
          >
            <option value="salaried">Salaried (gets the standard deduction)</option>
            <option value="other">Other income (no standard deduction)</option>
          </select>
        </div>
        {regime === "old" && (
          <div className="fld">
            <label htmlFor="it-age">Age</label>
            <select id="it-age" value={age} onChange={(e) => setAge(e.target.value as AgeBand)}>
              {(Object.keys(AGE_LABEL) as AgeBand[]).map((a) => (
                <option key={a} value={a}>
                  {AGE_LABEL[a]}
                </option>
              ))}
            </select>
          </div>
        )}
        {regime === "old" && (
          <div className="fld">
            <label htmlFor="it-80c">Section 80C investments (₹, up to 1,50,000)</label>
            <input
              id="it-80c"
              type="text"
              inputMode="decimal"
              value={section80C}
              onChange={(e) => setSection80C(e.target.value)}
            />
          </div>
        )}
        {regime === "old" && (
          <div className="fld">
            <label htmlFor="it-80d">Section 80D health insurance (₹, up to 25,000)</label>
            <input
              id="it-80d"
              type="text"
              inputMode="decimal"
              value={section80D}
              onChange={(e) => setSection80D(e.target.value)}
            />
          </div>
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
              <span className="tile-label">Total tax payable</span>
              <span className="tile-value">{money(result.t.totalTax, 0, "INR")}</span>
            </div>
            <div className="tile">
              <span className="tile-label">Take-home income</span>
              <span className="tile-value">{money(result.t.takeHome, 0, "INR")}</span>
            </div>
            <div className="tile">
              <span className="tile-label">Effective tax rate</span>
              <span className="tile-value">{result.t.effectiveRate.toFixed(1)}%</span>
            </div>
          </div>
          <table className="result-table">
            <thead>
              <tr>
                <th scope="col">Working</th>
                <th scope="col" className="text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Gross income</th>
                <td className="text-right">{money(result.t.grossIncome, 0, "INR")}</td>
              </tr>
              <tr>
                <th scope="row">Standard deduction</th>
                <td className="text-right">-{money(result.t.standardDeduction, 0, "INR")}</td>
              </tr>
              {regime === "old" && (
                <tr>
                  <th scope="row">Section 80C + 80D</th>
                  <td className="text-right">-{money(result.t.chapterVIA, 0, "INR")}</td>
                </tr>
              )}
              <tr>
                <th scope="row">Taxable income</th>
                <td className="text-right">{money(result.t.taxableIncome, 0, "INR")}</td>
              </tr>
              <tr>
                <th scope="row">Tax before rebate</th>
                <td className="text-right">{money(result.t.taxBeforeRebate, 0, "INR")}</td>
              </tr>
              <tr>
                <th scope="row">Section 87A rebate</th>
                <td className="text-right">-{money(result.t.rebate, 0, "INR")}</td>
              </tr>
              <tr>
                <th scope="row">Health and education cess (4%)</th>
                <td className="text-right">{money(result.t.cess, 0, "INR")}</td>
              </tr>
              <tr>
                <th scope="row">
                  <strong>Total tax</strong>
                </th>
                <td className="text-right">
                  <strong>{money(result.t.totalTax, 0, "INR")}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
