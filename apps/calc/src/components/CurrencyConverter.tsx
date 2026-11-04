"use client";

import { useMemo, useState } from "react";
import { convert, currencyName, rateBetween } from "@/lib/currency";
import { money, num } from "@/lib/pay";
import CurrencySelect from "./CurrencySelect";
import RateNote from "./RateNote";
import { useRates } from "./useRates";

const QUICK_AMOUNTS = [1, 10, 100, 1000, 10000];

/** Live currency converter. Falls back to a manually entered rate when no feed can be reached. */
export default function CurrencyConverter({
  initialFrom,
  initialTo,
  initialAmount = "1",
}: {
  initialFrom: string;
  initialTo: string;
  initialAmount?: string;
}) {
  const [amount, setAmount] = useState(initialAmount);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [manualRate, setManualRate] = useState("");
  const rates = useRates(true);

  const view = useMemo(() => {
    const a = num(amount);
    if (!Number.isFinite(a) || a < 0) {
      return { kind: "idle" as const, text: "Enter an amount to convert." };
    }
    if (rates.status === "ok") {
      const r = rateBetween(from, to, rates.data.rates);
      if (!Number.isFinite(r)) {
        return { kind: "err" as const, text: `No rate is available for ${from} to ${to}.` };
      }
      return {
        kind: "ok" as const,
        a,
        rate: r,
        convertTo: (x: number) => convert(x, from, to, rates.data.rates),
      };
    }
    if (rates.status === "error") {
      const m = num(manualRate);
      if (!Number.isFinite(m) || m <= 0) {
        return {
          kind: "manual" as const,
          text: "Live rates could not be loaded. Enter the rate yourself to convert.",
        };
      }
      return { kind: "ok" as const, a, rate: m, convertTo: (x: number) => x * m };
    }
    return { kind: "idle" as const, text: "Loading live rates..." };
  }, [amount, from, to, rates, manualRate]);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setManualRate("");
  };

  return (
    <div className="tool">
      <div className="fields">
        <div className="fld">
          <label htmlFor="cc-amount">Amount</label>
          <input
            id="cc-amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="fld">
          <label htmlFor="cc-from">From</label>
          <CurrencySelect id="cc-from" value={from} onChange={setFrom} />
        </div>
        <div className="fld">
          <label htmlFor="cc-to">To</label>
          <CurrencySelect id="cc-to" value={to} onChange={setTo} />
        </div>
      </div>
      <div className="row">
        <button type="button" className="secondary" onClick={swap}>
          Swap currencies
        </button>
      </div>

      {rates.status === "error" && (
        <div className="fields mt-4">
          <div className="fld">
            <label htmlFor="cc-manual">
              Rate (1 {from} = ? {to})
            </label>
            <input
              id="cc-manual"
              type="text"
              inputMode="decimal"
              value={manualRate}
              onChange={(e) => setManualRate(e.target.value)}
              placeholder="e.g. 94.5"
            />
          </div>
        </div>
      )}

      {view.kind === "ok" ? (
        <div role="status" aria-live="polite">
          <div className="tile-grid">
            <div className="tile hero-tile sm:col-span-2">
              <span className="tile-label">
                {money(view.a, "auto", from)} {currencyName(from)} =
              </span>
              <span className="tile-value">{money(view.convertTo(view.a), "auto", to)}</span>
            </div>
            <div className="tile">
              <span className="tile-label">Exchange rate</span>
              <span className="tile-value text-lg">
                1 {from} = {view.rate.toLocaleString("en-US", { maximumFractionDigits: 6 })} {to}
              </span>
              <span className="meta">
                1 {to} = {(1 / view.rate).toLocaleString("en-US", { maximumFractionDigits: 6 })} {from}
              </span>
            </div>
          </div>
          <table className="result-table">
            <thead>
              <tr>
                <th scope="col">{from}</th>
                <th scope="col" className="text-right">
                  {to}
                </th>
              </tr>
            </thead>
            <tbody>
              {QUICK_AMOUNTS.map((q) => (
                <tr key={q}>
                  <th scope="row">{money(q, "auto", from)}</th>
                  <td className="text-right">{money(view.convertTo(q), "auto", to)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rates.status === "ok" && <RateNote data={rates.data} />}
        </div>
      ) : (
        <p
          className={`status ${view.kind === "err" || view.kind === "manual" ? "err" : ""}`}
          role="status"
          aria-live="polite"
        >
          {view.text}
        </p>
      )}
    </div>
  );
}
