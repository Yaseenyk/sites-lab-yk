"use client";

import { useMemo, useState } from "react";
import { money, num } from "@/lib/pay";
import { sipFutureValue, sipYearlyGrowth } from "@/lib/sip";

export default function SipCalculator() {
  const [amount, setAmount] = useState("5000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("10");

  const result = useMemo(() => {
    const a = num(amount);
    if (!Number.isFinite(a) || a <= 0) {
      return { kind: "idle" as const, text: "Enter your monthly SIP amount." };
    }
    const r = num(rate);
    if (!Number.isFinite(r) || r < 0 || r > 50) {
      return { kind: "idle" as const, text: "Enter an expected annual return between 0 and 50 percent." };
    }
    const y = num(years);
    if (!Number.isFinite(y) || y <= 0 || y > 50) {
      return { kind: "idle" as const, text: "Enter a duration between 1 and 50 years." };
    }
    return { kind: "ok" as const, r: sipFutureValue(a, r, y), yearly: sipYearlyGrowth(a, r, y) };
  }, [amount, rate, years]);

  return (
    <div className="tool">
      <div className="fields">
        <div className="fld">
          <label htmlFor="sip-amount">Monthly SIP amount (₹)</label>
          <input
            id="sip-amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="sip-rate">Expected annual return (%)</label>
          <input
            id="sip-rate"
            type="text"
            inputMode="decimal"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="sip-years">Investment period (years)</label>
          <input
            id="sip-years"
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
              <span className="tile-label">Projected value</span>
              <span className="tile-value">{money(result.r.futureValue, 0, "INR")}</span>
            </div>
            <div className="tile">
              <span className="tile-label">Amount invested</span>
              <span className="tile-value">{money(result.r.investedAmount, 0, "INR")}</span>
            </div>
            <div className="tile">
              <span className="tile-label">Estimated returns</span>
              <span className="tile-value">{money(result.r.estimatedReturns, 0, "INR")}</span>
            </div>
          </div>
          <h3 className="mb-2 mt-6 text-sm font-semibold text-zinc-300">Year-by-year growth</h3>
          <table className="result-table">
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col" className="text-right">
                  Invested so far
                </th>
                <th scope="col" className="text-right">
                  Projected value
                </th>
              </tr>
            </thead>
            <tbody>
              {result.yearly.map((y) => (
                <tr key={y.year}>
                  <th scope="row">Year {y.year}</th>
                  <td className="text-right">{money(y.invested, 0, "INR")}</td>
                  <td className="text-right">{money(y.value, 0, "INR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="meta mt-3">
            The return rate is an assumption you set, not a guarantee. Mutual fund returns are market-linked
            and will differ from this projection.
          </p>
        </div>
      )}
    </div>
  );
}
