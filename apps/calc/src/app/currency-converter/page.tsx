import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import CurrencyConverter from "@/components/CurrencyConverter";
import ToolPage from "@/components/ToolPage";
import { PAIRS } from "@/lib/pairs";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("currency-converter");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I convert one currency to another?",
    a: "Multiply the amount by the exchange rate from the first currency to the second. If 1 euro buys 1.10 US dollars, then 50 euros is 50 x 1.10 = 55 dollars. The converter does this with live rates.",
  },
  {
    q: "Which currencies can I convert?",
    a: "Any two currencies in the lists, including US dollars, euros, pounds, rupees, Australian and Canadian dollars, dirhams, yen and many more. The pickers show every currency your browser knows, with the popular ones first.",
  },
  {
    q: "Where do the exchange rates come from?",
    a: "From a free public rates feed that publishes mid-market reference rates about once a day, with two backup feeds. The date of the rates is shown under each result.",
  },
  {
    q: "Is this the rate I will get at a bank or exchange counter?",
    a: "No. This is the mid-market rate. Banks, card networks and transfer apps apply their own margin or fee, so the amount you receive is lower. Compare the final amount, not the headline rate.",
  },
  {
    q: "What if the rates will not load?",
    a: "If none of the feeds can be reached, the converter lets you type a rate yourself, so you can still do the sum.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="currency-converter"
      lede="Convert between any two currencies at live exchange rates. Pick the currencies, enter an amount, and see the result, the rate and a table of common amounts."
      widget={<CurrencyConverter initialFrom="USD" initialTo="EUR" initialAmount="100" />}
      faq={faq}
      related={["usd-to-inr", "usd-salary-to-inr-calculator", "salary-calculator", "pay-raise-calculator"]}
    >
      <h2>How to use the converter</h2>
      <ol>
        <li>Enter the amount you want to convert.</li>
        <li>
          Choose the currency you have in <strong>From</strong> and the one you want in <strong>To</strong>.
        </li>
        <li>
          Read the converted amount and the rate. Use <strong>Swap currencies</strong> to reverse the
          direction.
        </li>
      </ol>

      <h2>Popular pairs</h2>
      <p>
        These pages open the converter with the pair already selected, with notes specific to each currency:
      </p>
      <ul>
        {PAIRS.map((p) => (
          <li key={p.slug}>
            <Link href={`/${p.slug}`}>
              {p.from} to {p.to}
            </Link>
          </li>
        ))}
      </ul>

      <h2>How the conversion is calculated</h2>
      <p>
        Rates are quoted against one reference currency. To convert from currency A to currency B, the amount
        is divided by A&apos;s rate and multiplied by B&apos;s rate, which gives the same answer as using the
        direct A to B rate. The inverse rate is simply one divided by the rate: if 1 US dollar is 90 rupees, 1
        rupee is about 0.0111 dollars.
      </p>
      <p>
        Why your bank&apos;s number differs, and what a good deal looks like, is covered in{" "}
        <Link href="/guides/how-exchange-rates-work">how exchange rates work</Link>.
      </p>
    </ToolPage>
  );
}
