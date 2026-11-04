import type { RatesResult } from "@/lib/currency";

const SOURCE_LABEL: Record<RatesResult["source"], string> = {
  jsdelivr: "open-source currency-api, via jsDelivr",
  pages: "open-source currency-api, via Cloudflare Pages",
  "exchangerate-api": "ExchangeRate-API",
};

/** Where the rates came from and how old they are. Always shown next to a converted figure. */
export default function RateNote({ data }: { data: RatesResult }) {
  return (
    <p className="meta mt-3">
      Mid-market reference rates for {data.date || "today"}, from the {SOURCE_LABEL[data.source]}
      {data.source === "exchangerate-api" && (
        <>
          {" "}
          (<a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>)
        </>
      )}
      . Banks and transfer services add a margin, so the rate you get will differ.
    </p>
  );
}
