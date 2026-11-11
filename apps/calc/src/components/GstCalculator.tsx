"use client";

import { useMemo, useState } from "react";
import { addGst, GST_RATES, removeGst } from "@/lib/gst";
import { money, num } from "@/lib/pay";

type Mode = "add" | "remove";

export default function GstCalculator() {
  const [mode, setMode] = useState<Mode>("add");
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState<string>("18");

  const result = useMemo(() => {
    const a = num(amount);
    if (!Number.isFinite(a) || a <= 0) {
      return { kind: "idle" as const, text: "Enter an amount." };
    }
    const r = num(rate);
    if (!Number.isFinite(r) || r < 0 || r > 100) {
      return { kind: "idle" as const, text: "Enter a GST rate between 0 and 100 percent." };
    }
    return { kind: "ok" as const, g: mode === "add" ? addGst(a, r) : removeGst(a, r) };
  }, [mode, amount, rate]);

  return (
    <div className="tool">
      <div className="tabs" role="tablist" aria-label="Calculation type">
        <button type="button" role="tab" aria-selected={mode === "add"} className={mode === "add" ? "" : "secondary"} onClick={() => setMode("add")}>
          Add GST
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "remove"}
          className={mode === "remove" ? "" : "secondary"}
          onClick={() => setMode("remove")}
        >
          Remove GST
        </button>
      </div>

      <div className="fields mt-4">
        <div className="fld">
          <label htmlFor="gst-amount">{mode === "add" ? "Amount before GST (₹)" : "Amount including GST (₹)"}</label>
          <input
            id="gst-amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="gst-rate">GST rate (%)</label>
          <select id="gst-rate" value={rate} onChange={(e) => setRate(e.target.value)}>
            {GST_RATES.map((g) => (
              <option key={g} value={g}>
                {g}%
              </option>
            ))}
            {!GST_RATES.includes(Number(rate) as (typeof GST_RATES)[number]) && (
              <option value={rate}>{rate}% (custom)</option>
            )}
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
              <span className="tile-label">{mode === "add" ? "Total, including GST" : "Amount before GST"}</span>
              <span className="tile-value">{money(mode === "add" ? result.g.total : result.g.base, 2, "INR")}</span>
            </div>
            <div className="tile">
              <span className="tile-label">GST amount</span>
              <span className="tile-value">{money(result.g.gstAmount, 2, "INR")}</span>
            </div>
            <div className="tile">
              <span className="tile-label">CGST + SGST</span>
              <span className="tile-value">
                {money(result.g.cgst, 2, "INR")} + {money(result.g.sgst, 2, "INR")}
              </span>
            </div>
          </div>
          <p className="meta mt-3">
            CGST and SGST (split evenly) apply within one state; an inter-state sale charges the same total as
            IGST instead.
          </p>
        </div>
      )}
    </div>
  );
}
