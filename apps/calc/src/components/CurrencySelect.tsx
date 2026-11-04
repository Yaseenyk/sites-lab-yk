"use client";

import { useMemo } from "react";
import { currencyName, listCurrencies, POPULAR_CURRENCIES } from "@/lib/currency";

/** A picker with every currency the browser knows, popular ones first. */
export default function CurrencySelect({
  id,
  value,
  onChange,
  allowNone,
  noneLabel = "None",
}: {
  id: string;
  value: string;
  onChange: (code: string) => void;
  allowNone?: boolean;
  noneLabel?: string;
}) {
  const all = useMemo(() => listCurrencies(), []);
  const popular = all.filter((c) => POPULAR_CURRENCIES.includes(c));
  const rest = all.filter((c) => !POPULAR_CURRENCIES.includes(c));
  const label = (c: string) => `${c} - ${currencyName(c)}`;
  return (
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
      {allowNone && <option value="">{noneLabel}</option>}
      <optgroup label="Popular">
        {popular.map((c) => (
          <option key={c} value={c}>
            {label(c)}
          </option>
        ))}
      </optgroup>
      <optgroup label="All currencies">
        {rest.map((c) => (
          <option key={c} value={c}>
            {label(c)}
          </option>
        ))}
      </optgroup>
    </select>
  );
}
