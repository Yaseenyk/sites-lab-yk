"use client";

import { useMemo, useState } from "react";
import { money, num } from "@/lib/pay";
import { isWhatPercentOf, percentChangeFrom, percentOf } from "@/lib/percentage";

const MODES = [
  { id: "of", label: "X% of Y" },
  { id: "isWhat", label: "X is what % of Y" },
  { id: "from", label: "Find the original value" },
] as const;
type ModeId = (typeof MODES)[number]["id"];

export default function PercentageCalculator() {
  const [mode, setMode] = useState<ModeId>("of");
  const [pct, setPct] = useState("25");
  const [of, setOf] = useState("80");
  const [part, setPart] = useState("20");
  const [whole, setWhole] = useState("80");
  const [result2, setResult2] = useState("110");
  const [changePct, setChangePct] = useState("10");

  const result = useMemo(() => {
    if (mode === "of") {
      const p = num(pct);
      const o = num(of);
      if (!Number.isFinite(p) || !Number.isFinite(o)) {
        return { kind: "idle" as const, text: "Enter both numbers." };
      }
      return { kind: "ok" as const, label: `${pct}% of ${money(o, 2)}`, value: percentOf(p, o) };
    }
    if (mode === "isWhat") {
      const pt = num(part);
      const w = num(whole);
      if (!Number.isFinite(pt) || !Number.isFinite(w)) {
        return { kind: "idle" as const, text: "Enter both numbers." };
      }
      const v = isWhatPercentOf(pt, w);
      if (!Number.isFinite(v)) {
        return { kind: "idle" as const, text: "The second number can't be zero." };
      }
      return { kind: "ok" as const, label: `${part} as a percent of ${whole}`, value: v, isPercent: true };
    }
    const r = num(result2);
    const c = num(changePct);
    if (!Number.isFinite(r) || !Number.isFinite(c)) {
      return { kind: "idle" as const, text: "Enter both numbers." };
    }
    return {
      kind: "ok" as const,
      label: `the value before a ${changePct}% change`,
      value: percentChangeFrom(r, c),
    };
  }, [mode, pct, of, part, whole, result2, changePct]);

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
        {mode === "of" && (
          <>
            <div className="fld">
              <label htmlFor="pc-pct">Percent (%)</label>
              <input
                id="pc-pct"
                type="text"
                inputMode="decimal"
                value={pct}
                onChange={(e) => setPct(e.target.value)}
              />
            </div>
            <div className="fld">
              <label htmlFor="pc-of">Of this number</label>
              <input
                id="pc-of"
                type="text"
                inputMode="decimal"
                value={of}
                onChange={(e) => setOf(e.target.value)}
              />
            </div>
          </>
        )}
        {mode === "isWhat" && (
          <>
            <div className="fld">
              <label htmlFor="pc-part">This number</label>
              <input
                id="pc-part"
                type="text"
                inputMode="decimal"
                value={part}
                onChange={(e) => setPart(e.target.value)}
              />
            </div>
            <div className="fld">
              <label htmlFor="pc-whole">Is what percent of</label>
              <input
                id="pc-whole"
                type="text"
                inputMode="decimal"
                value={whole}
                onChange={(e) => setWhole(e.target.value)}
              />
            </div>
          </>
        )}
        {mode === "from" && (
          <>
            <div className="fld">
              <label htmlFor="pc-result">Result after the change</label>
              <input
                id="pc-result"
                type="text"
                inputMode="decimal"
                value={result2}
                onChange={(e) => setResult2(e.target.value)}
              />
            </div>
            <div className="fld">
              <label htmlFor="pc-change">Percent change (negative for a decrease)</label>
              <input
                id="pc-change"
                type="text"
                inputMode="decimal"
                value={changePct}
                onChange={(e) => setChangePct(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      {result.kind !== "ok" ? (
        <p className="status" role="status" aria-live="polite">
          {result.text}
        </p>
      ) : (
        <div className="tile-grid" role="status" aria-live="polite">
          <div className="tile hero-tile">
            <span className="tile-label">Result</span>
            <span className="tile-value">
              {"isPercent" in result && result.isPercent
                ? `${result.value.toFixed(2)}%`
                : money(result.value, 2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
