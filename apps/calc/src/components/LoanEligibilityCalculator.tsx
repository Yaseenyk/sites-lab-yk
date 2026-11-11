"use client";

import { useMemo, useState } from "react";
import { loanEligibility } from "@/lib/loan";
import { money, num } from "@/lib/pay";

export default function LoanEligibilityCalculator() {
  const [income, setIncome] = useState("60000");
  const [existingEmis, setExistingEmis] = useState("0");
  const [foir, setFoir] = useState("50");
  const [rate, setRate] = useState("9");
  const [years, setYears] = useState("5");

  const result = useMemo(() => {
    const inc = num(income);
    if (!Number.isFinite(inc) || inc <= 0) {
      return { kind: "idle" as const, text: "Enter your monthly income." };
    }
    const existing = num(existingEmis);
    if (!Number.isFinite(existing) || existing < 0) {
      return { kind: "idle" as const, text: "Existing EMIs must be zero or more." };
    }
    const f = num(foir);
    if (!Number.isFinite(f) || f <= 0 || f > 100) {
      return { kind: "idle" as const, text: "Enter a FOIR between 1 and 100 percent." };
    }
    const r = num(rate);
    if (!Number.isFinite(r) || r < 0 || r > 50) {
      return { kind: "idle" as const, text: "Enter an interest rate between 0 and 50 percent." };
    }
    const y = num(years);
    if (!Number.isFinite(y) || y <= 0 || y > 30) {
      return { kind: "idle" as const, text: "Enter a loan term between 1 and 30 years." };
    }
    return { kind: "ok" as const, e: loanEligibility(inc, existing, f, r, Math.round(y * 12)) };
  }, [income, existingEmis, foir, rate, years]);

  return (
    <div className="tool">
      <div className="fields">
        <div className="fld">
          <label htmlFor="le-income">Net monthly income (₹)</label>
          <input
            id="le-income"
            type="text"
            inputMode="decimal"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="le-existing">Existing EMIs per month (₹)</label>
          <input
            id="le-existing"
            type="text"
            inputMode="decimal"
            value={existingEmis}
            onChange={(e) => setExistingEmis(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="le-foir">Lender&apos;s EMI limit, FOIR (%)</label>
          <input
            id="le-foir"
            type="text"
            inputMode="decimal"
            value={foir}
            onChange={(e) => setFoir(e.target.value)}
          />
          <span className="text-xs text-zinc-500">Typically 40 to 50%; 50% is the default here</span>
        </div>
        <div className="fld">
          <label htmlFor="le-rate">Interest rate, per year (%)</label>
          <input
            id="le-rate"
            type="text"
            inputMode="decimal"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="le-years">Loan term (years)</label>
          <input
            id="le-years"
            type="text"
            inputMode="decimal"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
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
              <span className="tile-label">Loan amount you likely qualify for</span>
              <span className="tile-value">{money(result.e.maxLoan, 0, "INR")}</span>
            </div>
            <div className="tile">
              <span className="tile-label">Affordable EMI</span>
              <span className="tile-value">{money(result.e.affordableEmi, 0, "INR")}</span>
            </div>
          </div>
          <p className="meta mt-3">
            An estimate based on income and existing EMIs only. Lenders also weigh credit score, employment type,
            age, collateral and their own policy, so the real sanctioned amount can differ.
          </p>
        </div>
      )}
    </div>
  );
}
