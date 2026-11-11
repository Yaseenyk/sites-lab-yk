"use client";

import { useMemo, useState } from "react";
import { amortizationSchedule, emi, yearlySchedule } from "@/lib/loan";
import { money, num } from "@/lib/pay";

export default function EmiCalculator({
  amountLabel,
  defaultAmount,
  defaultRate,
  defaultYears,
  maxYears,
}: {
  amountLabel: string;
  defaultAmount: string;
  defaultRate: string;
  defaultYears: string;
  maxYears: number;
}) {
  const [amount, setAmount] = useState(defaultAmount);
  const [rate, setRate] = useState(defaultRate);
  const [years, setYears] = useState(defaultYears);
  const [showSchedule, setShowSchedule] = useState(false);

  const result = useMemo(() => {
    const p = num(amount);
    if (!Number.isFinite(p) || p <= 0) {
      return { kind: "idle" as const, text: `Enter the ${amountLabel.toLowerCase()}.` };
    }
    const r = num(rate);
    if (!Number.isFinite(r) || r < 0 || r > 50) {
      return { kind: "idle" as const, text: "Enter an interest rate between 0 and 50 percent." };
    }
    const y = num(years);
    if (!Number.isFinite(y) || y <= 0 || y > maxYears) {
      return { kind: "idle" as const, text: `Enter a loan term between 1 and ${maxYears} years.` };
    }
    const months = Math.round(y * 12);
    const e = emi(p, r, months);
    const rows = amortizationSchedule(p, r, months);
    return { kind: "ok" as const, p, e, yearly: yearlySchedule(rows), rows };
  }, [amount, rate, years, amountLabel, maxYears]);

  return (
    <div className="tool">
      <div className="fields">
        <div className="fld">
          <label htmlFor="emi-amount">{amountLabel} (₹)</label>
          <input
            id="emi-amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="emi-rate">Interest rate, per year (%)</label>
          <input
            id="emi-rate"
            type="text"
            inputMode="decimal"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="emi-years">Loan term (years)</label>
          <input
            id="emi-years"
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
              <span className="tile-label">Monthly EMI</span>
              <span className="tile-value">{money(result.e.emi, 0, "INR")}</span>
            </div>
            <div className="tile">
              <span className="tile-label">Total interest</span>
              <span className="tile-value">{money(result.e.totalInterest, 0, "INR")}</span>
            </div>
            <div className="tile">
              <span className="tile-label">Total payment</span>
              <span className="tile-value">{money(result.e.totalPayment, 0, "INR")}</span>
            </div>
          </div>

          <h3 className="mb-2 mt-6 text-sm font-semibold text-zinc-300">Year-by-year breakdown</h3>
          <table className="result-table">
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col" className="text-right">
                  Principal paid
                </th>
                <th scope="col" className="text-right">
                  Interest paid
                </th>
                <th scope="col" className="text-right">
                  Balance remaining
                </th>
              </tr>
            </thead>
            <tbody>
              {result.yearly.map((y) => (
                <tr key={y.year}>
                  <th scope="row">Year {y.year}</th>
                  <td className="text-right">{money(y.principal, 0, "INR")}</td>
                  <td className="text-right">{money(y.interest, 0, "INR")}</td>
                  <td className="text-right">{money(y.balance, 0, "INR")}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <details className="mt-4" open={showSchedule} onToggle={(e) => setShowSchedule(e.currentTarget.open)}>
            <summary>Full month-by-month amortization schedule ({result.rows.length} months)</summary>
            {showSchedule && (
              <div className="mt-3 overflow-x-auto">
                <table className="result-table">
                  <thead>
                    <tr>
                      <th scope="col">Month</th>
                      <th scope="col" className="text-right">
                        EMI
                      </th>
                      <th scope="col" className="text-right">
                        Principal
                      </th>
                      <th scope="col" className="text-right">
                        Interest
                      </th>
                      <th scope="col" className="text-right">
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row) => (
                      <tr key={row.month}>
                        <th scope="row">{row.month}</th>
                        <td className="text-right">{money(row.payment, 0, "INR")}</td>
                        <td className="text-right">{money(row.principal, 0, "INR")}</td>
                        <td className="text-right">{money(row.interest, 0, "INR")}</td>
                        <td className="text-right">{money(row.balance, 0, "INR")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </details>
        </div>
      )}
    </div>
  );
}
