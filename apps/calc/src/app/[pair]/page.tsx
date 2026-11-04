import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@sites/shell";
import CurrencyConverter from "@/components/CurrencyConverter";
import ToolPage from "@/components/ToolPage";
import { PAIRS, pairBySlug } from "@/lib/pairs";
import { site } from "@/site";

export const dynamicParams = false;

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

      <h2>Why the rate you get is not the rate shown</h2>
      <p>
        The rate above is the mid-market rate. Banks, cards and transfer apps usually add a margin or a fee,
        so always compare the final amount that arrives.{" "}
        <Link href="/guides/how-exchange-rates-work">How exchange rates work</Link> explains the difference.
      </p>
    </ToolPage>
  );
}
