"use client";

import { useMemo, useState } from "react";
import { currencySymbol } from "@/lib/currency";
import { money, num, percent, percentChange, projection, raiseByAmount, raiseByPercent } from "@/lib/pay";
import CurrencySelect from "./CurrencySelect";

type Mode = "percent" | "amount" | "find";
type Basis = "year" | "hour" | "month" | "week";

const MODES: { id: Mode; label: string }[] = [
  { id: "percent", label: "Raise by %" },
  { id: "amount", label: "Raise by amount" },
  { id: "find", label: "Find the % raise" },
];
const BASIS_LABEL: Record<Basis, string> = {
  year: "per year",
  hour: "per hour",
  month: "per month",
  week: "per week",
};

export default function RaiseCalculator() {
  const [mode, setMode] = useState<Mode>("percent");
  const [basis, setBasis] = useState<Basis>("year");
  const [currency, setCurrency] = useState("USD");
  const [current, setCurrent] = useState("60000");
  const [pct, setPct] = useState("3");
  const [amt, setAmt] = useState("2500");
  const [next, setNext] = useState("65000");

  const digits = basis === "year" ? 0 : 2;
  const result = useMemo(() => {
    const c = num(current);
    if (!Number.isFinite(c) || c <= 0) {
      return { kind: "idle" as const, text: "Enter your current pay to see the result." };
    }
    if (mode === "percent") {
      const p = num(pct);
      if (!Number.isFinite(p)) {
        return { kind: "idle" as const, text: "Enter the raise percentage." };
      }
      const n = raiseByPercent(c, p);
      return { kind: "ok" as const, next: n, diff: n - c, pct: p, years: projection(c, p, 5) };
    }
    if (mode === "amount") {
      const a = num(amt);
      if (!Number.isFinite(a)) {
        return { kind: "idle" as const, text: "Enter the raise amount." };
      }
      const n = raiseByAmount(c, a);
      return { kind: "ok" as const, next: n, diff: a, pct: percentChange(c, n), years: null };
    }
    const n = num(next);
    if (!Number.isFinite(n)) {
      return { kind: "idle" as const, text: "Enter your new pay." };
    }
    return { kind: "ok" as const, next: n, diff: n - c, pct: percentChange(c, n), years: null };
  }, [mode, current, pct, amt, next]);

  return (
    <div className="tool">
      <div className="tabs" role="tablist" aria-label="Calculation type">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={mode === m.id}
            className={mode === m.id ? "" : "secondary"}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="fields mt-4">
        <div className="fld">
          <label htmlFor="r-current">Current pay ({currencySymbol(currency)})</label>
          <input
            id="r-current"
            type="text"
            inputMode="decimal"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="r-basis">Pay basis</label>
          <select id="r-basis" value={basis} onChange={(e) => setBasis(e.target.value as Basis)}>
            {(Object.keys(BASIS_LABEL) as Basis[]).map((b) => (
              <option key={b} value={b}>
                {BASIS_LABEL[b]}
              </option>
            ))}
          </select>
        </div>
        <div className="fld">
          <label htmlFor="r-currency">Currency</label>
          <CurrencySelect id="r-currency" value={currency} onChange={setCurrency} />
        </div>
        {mode === "percent" && (
          <div className="fld">
            <label htmlFor="r-pct">Raise (%)</label>
            <input
              id="r-pct"
              type="text"
              inputMode="decimal"
              value={pct}
              onChange={(e) => setPct(e.target.value)}
            />
          </div>
        )}
        {mode === "amount" && (
          <div className="fld">
            <label htmlFor="r-amt">
              Raise ({currencySymbol(currency)} {BASIS_LABEL[basis]})
            </label>
            <input
              id="r-amt"
              type="text"
              inputMode="decimal"
              value={amt}
              onChange={(e) => setAmt(e.target.value)}
            />
          </div>
        )}
        {mode === "find" && (
          <div className="fld">
            <label htmlFor="r-next">
              New pay ({currencySymbol(currency)} {BASIS_LABEL[basis]})
            </label>
            <input
              id="r-next"
              type="text"
              inputMode="decimal"
              value={next}
              onChange={(e) => setNext(e.target.value)}
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
              <span className="tile-label">New pay {BASIS_LABEL[basis]}</span>
              <span className="tile-value">{money(result.next, digits, currency)}</span>
            </div>
            <div className="tile">
              <span className="tile-label">Increase</span>
              <span className="tile-value">{money(result.diff, digits, currency)}</span>
            </div>
            <div className="tile">
              <span className="tile-label">Raise</span>
              <span className="tile-value">{percent(result.pct)}</span>
            </div>
          </div>
          {result.years && (
            <>
              <h3 className="mb-2 mt-6 text-sm font-semibold text-zinc-300">
                If you get this raise every year
              </h3>
              <table className="result-table">
                <thead>
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col" className="text-right">
                      Pay {BASIS_LABEL[basis]}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.years.map((v, i) => (
                    <tr key={i}>
                      <th scope="row">Year {i + 1}</th>
                      <td className="text-right">{money(v, digits, currency)}</td>
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
