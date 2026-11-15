import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@sites/shell";
import CurrencyConverter from "@/components/CurrencyConverter";
import ToolPage from "@/components/ToolPage";
import { PAIRS, pairBySlug } from "@/lib/pairs";
import { money } from "@/lib/pay";
import { isIndexable, site } from "@/site";

export const dynamicParams = false;

/*
 * Made-up round rates, one per pair, used only to show the arithmetic. None of them is a current
 * exchange rate; the converter above the page loads the real one.
 */
const EXAMPLE_RATES: Record<string, number> = {
  "usd-to-inr": 90,
  "inr-to-usd": 0.01,
  "gbp-to-inr": 120,
  "eur-to-inr": 100,
  "cad-to-inr": 65,
  "aud-to-inr": 60,
  "aed-to-inr": 25,
};
const AMOUNTS_FROM_INR = [1_000, 10_000, 100_000, 1_000_000];
const AMOUNTS_OTHER = [1, 10, 100, 1_000, 10_000];
/** Margin used in the round-trip example, per leg. */
const MARGIN = 2;

export function generateStaticParams() {
  return PAIRS.map((p) => ({ pair: p.slug }));
}

export function generateMetadata({ params }: { params: { pair: string } }): Metadata {
  const pair = pairBySlug(params.pair);
  if (!pair) {
    return {};
  }
  return pageMetadata(site, {
    title: pair.seoTitle,
    description: pair.description,
    path: `/${pair.slug}/`,
    noindex: !isIndexable(pair.slug),
  });
}

export default function Page({ params }: { params: { pair: string } }) {
  const pair = pairBySlug(params.pair);
  if (!pair) {
    notFound();
  }
  const others = PAIRS.filter((p) => p.slug !== pair.slug)
    .slice(0, 3)
    .map((p) => p.slug);
  const isUsdInr = pair.slug === "usd-to-inr";
  const rate = EXAMPLE_RATES[pair.slug];
  const amounts = pair.from === "INR" ? AMOUNTS_FROM_INR : AMOUNTS_OTHER;
  const there = 1_000 * (1 - MARGIN / 100);
  const roundTrip = there * (1 - MARGIN / 100);

  return (
    <ToolPage
      slug={pair.slug}
      lede={pair.lede}
      widget={
        <CurrencyConverter
          initialFrom={pair.from}
          initialTo={pair.to}
          initialAmount={pair.from === "INR" ? "100000" : "1"}
        />
      }
      faq={pair.faq}
      related={[
        "currency-converter",
        ...(isUsdInr ? ["inr-to-usd", "usd-salary-to-inr-calculator"] : []),
        ...others,
      ]}
    >
      <h2>
        How to convert {pair.from} to {pair.to}
      </h2>
      <ol>
        <li>
          Type the amount in {pair.from}. The currencies are already set to {pair.from} and {pair.to}.
        </li>
        <li>The result and the exchange rate update as soon as live rates load.</li>
        <li>
          Use <strong>Swap currencies</strong> to convert {pair.to} back to {pair.from}, or pick any other
          currency from the lists.
        </li>
      </ol>

      <h2>
        About the {pair.from} to {pair.to} pair
      </h2>
      {pair.about.map((text) => (
        <p key={text}>{text}</p>
      ))}

      <h2>
        Common reasons to convert {pair.from} to {pair.to}
      </h2>
      <ul>
        {pair.uses.map((text) => (
          <li key={text}>
            {text.includes("USD salary to INR calculator") ? (
              <>
                Converting a salary or freelance payment quoted in dollars. For that, use the{" "}
                <Link href="/usd-salary-to-inr-calculator">USD salary to INR calculator</Link>, which also
                gives monthly and hourly pay.
              </>
            ) : (
              text
            )}
          </li>
        ))}
      </ul>

      {rate !== undefined && (
        <>
          <h2>
            {pair.from} to {pair.to}: the arithmetic
          </h2>
          <p>
            <strong>
              {pair.to} amount = {pair.from} amount x rate.
            </strong>{" "}
            To show the sum, this table uses a made-up round rate of 1 {pair.from} = {rate} {pair.to}. It is
            not today&apos;s rate; the converter above loads that.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">{pair.from}</th>
                <th scope="col">{pair.to} at the example rate</th>
              </tr>
            </thead>
            <tbody>
              {amounts.map((a) => (
                <tr key={a}>
                  <th scope="row">{money(a, "auto", pair.from)}</th>
                  <td>{money(a * rate, "auto", pair.to)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            To go back, divide by the rate: {money(100 * rate, "auto", pair.to)} is{" "}
            {money(100, "auto", pair.from)} at the same example rate. The reverse rate is 1 / {rate} ={" "}
            {(1 / rate).toLocaleString("en-US", { maximumFractionDigits: 6 })} {pair.from} per {pair.to}.
          </p>

          <h2>What converting there and back costs</h2>
          <p>
            A provider that takes a margin of {MARGIN}% below the mid-market rate each way (an example, not
            any provider&apos;s rate) leaves you with less than you started with. Start with{" "}
            {money(1_000, "auto", pair.from)}: after the first leg you hold the equivalent of{" "}
            {money(there, "auto", pair.from)}, and after converting back {money(roundTrip, "auto", pair.from)}
            , a loss of {money(1_000 - roundTrip, "auto", pair.from)}. Convert once, in the direction you
            need.
          </p>
        </>
      )}

      <h2>Why the rate you get is not the rate shown</h2>
      <p>
        The rate above is the mid-market rate. Banks, cards and transfer apps usually add a margin or a fee,
        so always compare the final amount that arrives.{" "}
        <Link href="/guides/how-exchange-rates-work">How exchange rates work</Link> explains the difference.
      </p>
    </ToolPage>
  );
}
