"use client";

import { useMemo, useState } from "react";
import { fmt, num, parseNumbers, simplifyRatio, solveRatio, stats, whatPercent } from "@/lib/percent";
import { Block, Field, Hint, Tile } from "./ui";

/** Simplify a ratio, and solve A:B = C:X for the missing value. */
export function RatioCalculator() {
  const [a, setA] = useState("6");
  const [b, setB] = useState("4");
  const [c, setC] = useState("30");
  const [total, setTotal] = useState("500");

  const simple = simplifyRatio(num(a), num(b));
  const x = solveRatio(num(a), num(b), num(c));
  const na = num(a);
  const nb = num(b);
  const nt = num(total);
  const canSplit = na >= 0 && nb >= 0 && na + nb > 0 && Number.isFinite(nt);

  return (
    <div className="tool">
      <Block title="Simplify a ratio">
        <div className="fields">
          <Field id="r-a" label="A" value={a} onChange={setA} />
          <Field id="r-b" label="B" value={b} onChange={setB} />
          <div className="fld">
            {simple ? (
              <Tile
                hero
                label={`${fmt(num(a))} : ${fmt(num(b))} simplified`}
                value={`${simple[0]} : ${simple[1]}`}
              />
            ) : (
              <Hint>Enter two numbers.</Hint>
            )}
          </div>
        </div>
        {simple && na > 0 && nb > 0 && (
          <p className="meta mt-2">
            Shares of the whole: {fmt(whatPercent(na, na + nb), 2)}% and {fmt(whatPercent(nb, na + nb), 2)}%.
            As 1 : n it is 1 : {fmt(nb / na, 4)}.
          </p>
        )}
      </Block>
      <Block title="Solve A : B = C : X">
        <div className="fields">
          <Field id="r-c" label="C" value={c} onChange={setC} />
          <div className="fld">
            {Number.isFinite(x) ? (
              <Tile
                hero
                label={`${fmt(num(a))} : ${fmt(num(b))} = ${fmt(num(c))} : X, so X =`}
                value={fmt(x)}
              />
            ) : (
              <Hint>Enter A, B and C; A cannot be 0.</Hint>
            )}
          </div>
        </div>
      </Block>
      <Block title="Divide a total in the ratio A : B">
        <div className="fields">
          <Field id="r-total" label="Total to share" value={total} onChange={setTotal} />
          <div className="fld">
            {canSplit ? (
              <Tile
                hero
                label={`${fmt(na)} : ${fmt(nb)} of ${fmt(nt)} gives`}
                value={`${fmt((nt * na) / (na + nb))} and ${fmt((nt * nb) / (na + nb))}`}
              />
            ) : (
              <Hint>Enter A, B (not both 0) and a total.</Hint>
            )}
          </div>
        </div>
      </Block>
    </div>
  );
}

/** Mean, median, mode, sum and range for a pasted list of numbers. */
export function AverageCalculator({ variant = "average" }: { variant?: "average" | "deviation" }) {
  const [text, setText] = useState("4, 8, 8, 10, 15");
  const parsed = useMemo(() => parseNumbers(text), [text]);
  const s = useMemo(() => stats(parsed.values), [parsed]);

  return (
    <div className="tool">
      <div className="field">
        <label htmlFor="avg-in" className="fld-label">
          Numbers (separated by commas, spaces or new lines)
        </label>
        <textarea
          id="avg-in"
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          className="avg-area"
        />
      </div>
      {parsed.bad.length > 0 && (
        <Hint error>
          Ignored: {parsed.bad.slice(0, 5).join(", ")}
          {parsed.bad.length > 5 ? "..." : ""}
        </Hint>
      )}
      {!s ? (
        <Hint>Enter some numbers.</Hint>
      ) : (
        <div role="status" aria-live="polite">
          <div className="tile-grid">
            {variant === "deviation" ? (
              <>
                <Tile
                  hero
                  label="Sample standard deviation (s)"
                  value={s.sampleStdDev === null ? "needs 2+ values" : fmt(s.sampleStdDev, 6)}
                />
                <Tile label="Population standard deviation (σ)" value={fmt(s.stdDev, 6)} />
                <Tile label="Mean" value={fmt(s.mean)} />
              </>
            ) : (
              <>
                <Tile hero label="Mean (average)" value={fmt(s.mean)} />
                <Tile label="Median" value={fmt(s.median)} />
                <Tile label="Mode" value={s.modes.length ? s.modes.map((m) => fmt(m)).join(", ") : "none"} />
              </>
            )}
          </div>
          <table className="result-table">
            <tbody>
              {[
                ["Count", fmt(s.count, 0)],
                ["Sum", fmt(s.sum)],
                ["Minimum", fmt(s.min)],
                ["Maximum", fmt(s.max)],
                ["Range", fmt(s.range)],
                ...(variant === "deviation"
                  ? ([
                      ["Sum of squared differences", fmt(s.variance * s.count, 6)],
                      ["Variance (population)", fmt(s.variance, 6)],
                      ["Variance (sample)", s.sampleVariance === null ? "-" : fmt(s.sampleVariance, 6)],
                    ] as [string, string][])
                  : []),
              ].map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td className="text-right">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
