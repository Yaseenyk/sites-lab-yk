"use client";

import { useMemo, useState } from "react";
import { fmt, num, parseNumbers, simplifyRatio, solveRatio, stats } from "@/lib/percent";
import { Block, Field, Hint, Tile } from "./ui";

/** Simplify a ratio, and solve A:B = C:X for the missing value. */
export function RatioCalculator() {
  const [a, setA] = useState("6");
  const [b, setB] = useState("4");
  const [c, setC] = useState("30");

  const simple = simplifyRatio(num(a), num(b));
  const x = solveRatio(num(a), num(b), num(c));

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
    </div>
  );
}

/** Mean, median, mode, sum and range for a pasted list of numbers. */
export function AverageCalculator() {
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
            <Tile hero label="Mean (average)" value={fmt(s.mean)} />
            <Tile label="Median" value={fmt(s.median)} />
            <Tile label="Mode" value={s.modes.length ? s.modes.map((m) => fmt(m)).join(", ") : "none"} />
          </div>
          <table className="result-table">
            <tbody>
              {[
                ["Count", fmt(s.count, 0)],
                ["Sum", fmt(s.sum)],
                ["Minimum", fmt(s.min)],
                ["Maximum", fmt(s.max)],
                ["Range", fmt(s.range)],
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
