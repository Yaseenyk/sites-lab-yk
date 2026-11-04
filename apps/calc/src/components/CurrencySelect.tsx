"use client";

import { useEffect, useMemo, useState } from "react";
import { currencyName, listCurrencies, POPULAR_CURRENCIES } from "@/lib/currency";

/**
 * A picker with every currency the browser knows, popular ones first.
 *
 * The full list and the currency names come from the visitor's browser (Intl), and they differ from the build
 * machine's. Rendering them on the server would not match what the browser produces, so React would discard the
 * server HTML (hydration error). The first render therefore uses only the fixed popular codes, which are identical
 * everywhere, and the full list is filled in right after the page loads.
 */
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
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  const rest = useMemo(
    () => (ready ? listCurrencies().filter((c) => !POPULAR_CURRENCIES.includes(c)) : []),
    [ready],
  );
  const label = (c: string) => (ready ? `${c} - ${currencyName(c)}` : c);

  return (
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
      {allowNone && <option value="">{noneLabel}</option>}
      <optgroup label="Popular">
        {POPULAR_CURRENCIES.map((c) => (
          <option key={c} value={c}>
            {label(c)}
          </option>
        ))}
      </optgroup>
      {ready && (
        <optgroup label="All currencies">
          {rest.map((c) => (
            <option key={c} value={c}>
              {label(c)}
            </option>
          ))}
        </optgroup>
      )}
    </select>
  );
}
