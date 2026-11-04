"use client";

import { useState } from "react";
import { fmt, num, percentOf, whatPercent, wholeFromPart } from "@/lib/percent";
import { Block, Field, Hint, Tile } from "./ui";

/** The three classic percentage questions, each with its own live answer. */
export default function PercentCalculator() {
  const [a1, setA1] = useState("15");
  const [b1, setB1] = useState("80");
  const [a2, setA2] = useState("12");
  const [b2, setB2] = useState("80");
  const [a3, setA3] = useState("12");
  const [b3, setB3] = useState("15");

  const r1 = percentOf(num(a1), num(b1));
  const r2 = whatPercent(num(a2), num(b2));
  const r3 = wholeFromPart(num(a3), num(b3));

  return (
    <div className="tool">
      <Block title="What is X% of Y?">
        <div className="fields">
          <Field id="p1a" label="Percentage (%)" value={a1} onChange={setA1} />
          <Field id="p1b" label="Of the number" value={b1} onChange={setB1} />
          <div className="fld">
            {Number.isFinite(r1) ? (
              <Tile hero label={`${fmt(num(a1))}% of ${fmt(num(b1))} is`} value={fmt(r1)} />
            ) : (
              <Hint>Enter both numbers.</Hint>
            )}
          </div>
        </div>
      </Block>
      <Block title="X is what percent of Y?">
        <div className="fields">
          <Field id="p2a" label="Number (X)" value={a2} onChange={setA2} />
          <Field id="p2b" label="Total (Y)" value={b2} onChange={setB2} />
          <div className="fld">
            {Number.isFinite(r2) ? (
              <Tile hero label={`${fmt(num(a2))} is`} value={`${fmt(r2, 4)}% of ${fmt(num(b2))}`} />
            ) : (
              <Hint>Enter both numbers; Y cannot be 0.</Hint>
            )}
          </div>
        </div>
      </Block>
      <Block title="X is Y% of what number?">
        <div className="fields">
          <Field id="p3a" label="Number (X)" value={a3} onChange={setA3} />
          <Field id="p3b" label="Percentage (Y%)" value={b3} onChange={setB3} />
          <div className="fld">
            {Number.isFinite(r3) ? (
              <Tile hero label={`${fmt(num(a3))} is ${fmt(num(b3))}% of`} value={fmt(r3)} />
            ) : (
              <Hint>Enter both numbers; the percentage cannot be 0.</Hint>
            )}
          </div>
        </div>
      </Block>
    </div>
  );
}
