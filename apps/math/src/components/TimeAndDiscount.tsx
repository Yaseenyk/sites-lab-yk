"use client";

import { useMemo, useState } from "react";
import { combine, describe, totalIn, type Duration } from "@/lib/duration";
import { decreaseBy, fmt, num, percentChange, stackedPrice } from "@/lib/percent";
import { Block, Field, Hint, Tile } from "./ui";

const toInt = (v: string): number => (v.trim() === "" ? 0 : Number(v));

function DurationFields({
  prefix,
  title,
  value,
  onChange,
}: {
  prefix: string;
  title: string;
  value: Record<keyof Duration, string>;
  onChange: (v: Record<keyof Duration, string>) => void;
}) {
  const keys: [keyof Duration, string][] = [
    ["days", "Days"],
    ["hours", "Hours"],
    ["minutes", "Minutes"],
    ["seconds", "Seconds"],
  ];
  return (
    <fieldset className="duration-set">
      <legend className="fld-label">{title}</legend>
      <div className="fields">
        {keys.map(([k, label]) => (
          <Field
            key={k}
            id={`${prefix}-${k}`}
            label={label}
            value={value[k]}
            onChange={(v) => onChange({ ...value, [k]: v })}
          />
        ))}
      </div>
    </fieldset>
  );
}

/** Add or subtract two lengths of time. */
export function TimeCalculator() {
  const [a, setA] = useState({ days: "0", hours: "2", minutes: "30", seconds: "0" });
  const [b, setB] = useState({ days: "0", hours: "1", minutes: "45", seconds: "0" });
  const [op, setOp] = useState<"add" | "subtract">("add");

  const result = useMemo(() => {
    const da = {
      days: toInt(a.days),
      hours: toInt(a.hours),
      minutes: toInt(a.minutes),
      seconds: toInt(a.seconds),
    };
    const db = {
      days: toInt(b.days),
      hours: toInt(b.hours),
      minutes: toInt(b.minutes),
      seconds: toInt(b.seconds),
    };
    const all = [...Object.values(da), ...Object.values(db)];
    if (!all.every((n) => Number.isFinite(n) && n >= 0 && Number.isInteger(n))) {
      return null;
    }
    return combine(da, db, op);
  }, [a, b, op]);

  return (
    <div className="tool">
      <DurationFields prefix="t1" title="First time" value={a} onChange={setA} />
      <div className="fields mt-4">
        <div className="fld">
          <label htmlFor="t-op">Operation</label>
          <select id="t-op" value={op} onChange={(e) => setOp(e.target.value as "add" | "subtract")}>
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (−)</option>
          </select>
        </div>
      </div>
      <DurationFields prefix="t2" title="Second time" value={b} onChange={setB} />
      {!result ? (
        <Hint error>Enter whole numbers of zero or more in every box.</Hint>
      ) : (
        <div role="status" aria-live="polite">
          <div className="tile-grid">
            <Tile hero label="Result" value={describe(result)} />
            <Tile label="Total hours" value={fmt(totalIn(result, "hours"), 4)} />
            <Tile label="Total minutes" value={fmt(totalIn(result, "minutes"), 2)} />
          </div>
        </div>
      )}
    </div>
  );
}

/** Sale price, savings and stacked discounts; and finding a discount from two prices. */
export function DiscountCalculator() {
  const [price, setPrice] = useState("80");
  const [d1, setD1] = useState("25");
  const [d2, setD2] = useState("");
  const [orig, setOrig] = useState("120");
  const [sale, setSale] = useState("90");

  const p = num(price);
  const first = num(d1);
  const second = d2.trim() === "" ? 0 : num(d2);
  const final = stackedPrice(p, [first, second]);
  const valid = [p, first, second].every(Number.isFinite) && p >= 0;
  const single = decreaseBy(p, first);
  const found = percentChange(num(orig), num(sale));

  return (
    <div className="tool">
      <Block title="Sale price after a discount">
        <div className="fields">
          <Field id="d-price" label="Original price" value={price} onChange={setPrice} />
          <Field id="d-d1" label="Discount (%)" value={d1} onChange={setD1} />
          <Field id="d-d2" label="Extra discount (%), optional" value={d2} onChange={setD2} />
        </div>
        {valid ? (
          <div className="tile-grid" role="status" aria-live="polite">
            <Tile hero label="Sale price" value={fmt(final, 2)} />
            <Tile label="You save" value={fmt(p - final, 2)} />
            <Tile label="Total discount" value={`${fmt(p === 0 ? 0 : ((p - final) / p) * 100, 2)}%`} />
          </div>
        ) : (
          <Hint>Enter the price and the discount.</Hint>
        )}
        {valid && second > 0 && (
          <p className="meta mt-2">With only the first discount the price would be {fmt(single, 2)}.</p>
        )}
      </Block>
      <Block title="What discount is it?">
        <div className="fields">
          <Field id="d-orig" label="Original price" value={orig} onChange={setOrig} />
          <Field id="d-sale" label="Sale price" value={sale} onChange={setSale} />
          <div className="fld">
            {Number.isFinite(found) ? (
              <Tile
                hero
                label={found <= 0 ? "Discount" : "Price went up by"}
                value={`${fmt(Math.abs(found), 2)}%`}
              />
            ) : (
              <Hint>Enter both prices; the original cannot be 0.</Hint>
            )}
          </div>
        </div>
      </Block>
    </div>
  );
}
