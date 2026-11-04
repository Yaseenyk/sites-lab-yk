"use client";

import { useState } from "react";
import { decreaseBy, fmt, increaseBy, num, percentChange, percentDifference } from "@/lib/percent";
import { Block, Field, Hint, Tile } from "./ui";

type Kind = "increase" | "decrease" | "change" | "difference";

/**
 * increase: apply an increase, or find the percent increase between two numbers.
 * decrease: the same for a decrease.
 * change: percent change from one value to another, plus the symmetric percent difference.
 */
export default function PercentChangeTool({ kind }: { kind: Kind }) {
  const [v, setV] = useState(kind === "decrease" ? "200" : "80");
  const [p, setP] = useState(kind === "decrease" ? "15" : "25");
  const [from, setFrom] = useState(
    kind === "decrease" ? "80" : kind === "change" || kind === "difference" ? "40" : "50",
  );
  const [to, setTo] = useState(
    kind === "decrease" ? "60" : kind === "change" || kind === "difference" ? "50" : "65",
  );

  const applied = kind === "decrease" ? decreaseBy(num(v), num(p)) : increaseBy(num(v), num(p));
  const change = percentChange(num(from), num(to));
  const word = kind === "decrease" ? "decrease" : "increase";

  if (kind === "difference") {
    const pd = percentDifference(num(from), num(to));
    return (
      <div className="tool">
        <Block title="Percentage difference between two values">
          <div className="fields">
            <Field id="c-from" label="First value" value={from} onChange={setFrom} />
            <Field id="c-to" label="Second value" value={to} onChange={setTo} />
            <div className="fld">
              {Number.isFinite(pd) ? (
                <Tile hero label="Percentage difference" value={`${fmt(pd, 4)}%`} />
              ) : (
                <Hint>Enter two numbers that do not average to 0.</Hint>
              )}
            </div>
          </div>
          {Number.isFinite(pd) && (
            <div className="tile-grid">
              <Tile label="Absolute difference" value={fmt(Math.abs(num(to) - num(from)))} />
              <Tile label="Average of the two" value={fmt((num(from) + num(to)) / 2)} />
            </div>
          )}
        </Block>
      </div>
    );
  }

  return (
    <div className="tool">
      {kind !== "change" && (
        <Block
          title={
            kind === "decrease" ? "Decrease a number by a percentage" : "Increase a number by a percentage"
          }
        >
          <div className="fields">
            <Field id="c-v" label="Starting number" value={v} onChange={setV} />
            <Field
              id="c-p"
              label={`${kind === "decrease" ? "Decrease" : "Increase"} by (%)`}
              value={p}
              onChange={setP}
            />
            <div className="fld">
              {Number.isFinite(applied) ? (
                <Tile hero label={`${fmt(num(v))} ${word}d by ${fmt(num(p))}%`} value={fmt(applied)} />
              ) : (
                <Hint>Enter both numbers.</Hint>
              )}
            </div>
          </div>
          {Number.isFinite(applied) && (
            <p className="meta mt-2">
              Change: {applied - num(v) >= 0 ? "+" : ""}
              {fmt(applied - num(v))}
            </p>
          )}
        </Block>
      )}

      <Block
        title={
          kind === "change"
            ? "Percent change between two values"
            : kind === "decrease"
              ? "Find the percentage decrease between two numbers"
              : "Find the percentage increase between two numbers"
        }
      >
        <div className="fields">
          <Field id="c-from" label="From (old value)" value={from} onChange={setFrom} />
          <Field id="c-to" label="To (new value)" value={to} onChange={setTo} />
          <div className="fld">
            {Number.isFinite(change) ? (
              <Tile
                hero
                label={change >= 0 ? "Percent increase" : "Percent decrease"}
                value={`${change >= 0 ? "+" : ""}${fmt(change, 4)}%`}
              />
            ) : (
              <Hint>Enter both numbers; the old value cannot be 0.</Hint>
            )}
          </div>
        </div>
        {Number.isFinite(change) && (
          <div className="tile-grid">
            <Tile
              label="Absolute change"
              value={`${num(to) - num(from) >= 0 ? "+" : ""}${fmt(num(to) - num(from))}`}
            />
            {kind === "change" && (
              <Tile
                label="Percent difference (vs the average)"
                value={`${fmt(percentDifference(num(from), num(to)), 4)}%`}
              />
            )}
          </div>
        )}
      </Block>
    </div>
  );
}
