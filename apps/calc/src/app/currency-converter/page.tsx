import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import CurrencyConverter from "@/components/CurrencyConverter";
import ToolPage from "@/components/ToolPage";
import { PAIRS } from "@/lib/pairs";
import { money } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("currency-converter");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

/*
 * Every rate in this file is a made-up round number used to show the arithmetic. None of them is a
 * current exchange rate; the converter above loads the real rate.
 */
const EXAMPLE_USD_INR = 90;
const EXAMPLE_USD_EUR = 0.8;
const CROSS = EXAMPLE_USD_INR / EXAMPLE_USD_EUR;
const EUR_AMOUNT = 5_000;
const EUR_TO_INR = (EUR_AMOUNT / EXAMPLE_USD_EUR) * EXAMPLE_USD_INR;
const MARGINS = [0.5, 1, 2, 3, 5];
const SENT = 1_000;

const faq = [
  {
    q: "How do I convert one currency to another?",
    a: `Multiply the amount by the exchange rate from the first currency to the second. If 1 euro buys 1.25 US dollars (an example rate), then 50 euros is 50 x 1.25 = ${50 * 1.25} dollars. The converter does this with live rates.`,
  },
  {
    q: "How do I convert between two currencies that are not the dollar?",
    a: `Rates are quoted against one reference currency, so the converter goes through it. With example rates of 1 USD = ${EXAMPLE_USD_EUR} EUR and 1 USD = ${EXAMPLE_USD_INR} INR, ${EUR_AMOUNT.toLocaleString("en-US")} EUR is ${EUR_AMOUNT} / ${EXAMPLE_USD_EUR} x ${EXAMPLE_USD_INR} = ${money(EUR_TO_INR, 0, "INR")}. The direct EUR to INR rate is ${EXAMPLE_USD_INR} / ${EXAMPLE_USD_EUR} = ${CROSS}.`,
  },
  {
    q: "How do I find the reverse rate?",
    a: `Divide 1 by the rate. If 1 US dollar is ${EXAMPLE_USD_INR} rupees (an example), 1 rupee is 1 / ${EXAMPLE_USD_INR} = ${(1 / EXAMPLE_USD_INR).toFixed(4)} dollars. The converter shows both directions under the result.`,
  },
  {
    q: "Which currencies can I convert?",
    a: "Any two currencies in the lists, including US dollars, euros, pounds, rupees, Australian and Canadian dollars, dirhams, yen and many more. The pickers show the currencies your browser knows, with the popular ones first. A currency with no published rate shows a message instead of a result.",
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
    q: "How do I check whether a transfer is good value?",
    a: `Divide the amount that arrives by the amount you sent to get the rate you really got, then compare it with the mid-market rate shown here. For example, if ${SENT.toLocaleString("en-US")} dollars arrives as ${money(SENT * EXAMPLE_USD_INR * 0.985, 0, "INR")} when the example rate is ${EXAMPLE_USD_INR}, you got ${(SENT * EXAMPLE_USD_INR * 0.985) / SENT} rupees a dollar, which is ${((1 - 0.985) * 100).toFixed(1)}% below the mid-market rate. Include any fixed fee in the amount.`,
  },
  {
    q: "Why does the rate change during the day?",
    a: "Currencies trade continuously, so rates move. The feed this page uses publishes about once a day, so the rate shown can differ from a live market quote and from the rate a provider shows you.",
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

      <h2>How a currency conversion is calculated</h2>
      <p>
        <strong>Converted amount = amount x exchange rate.</strong> The rate says how much of the second
        currency one unit of the first buys. The reverse rate is one divided by it.
      </p>
      <p>
        Rates are quoted against one reference currency. To convert from currency A to currency B, the amount
        is divided by A&apos;s rate and multiplied by B&apos;s rate, which gives the same answer as the direct
        A to B rate. Worked example, with made-up rates for the arithmetic only: if 1 US dollar is{" "}
        {EXAMPLE_USD_EUR} euros and {EXAMPLE_USD_INR} rupees, then {EUR_AMOUNT.toLocaleString("en-US")} euros
        is {EUR_AMOUNT} / {EXAMPLE_USD_EUR} = {(EUR_AMOUNT / EXAMPLE_USD_EUR).toLocaleString("en-US")}{" "}
        dollars, and that is {(EUR_AMOUNT / EXAMPLE_USD_EUR).toLocaleString("en-US")} x {EXAMPLE_USD_INR} ={" "}
        {money(EUR_TO_INR, 0, "INR")}. The direct euro to rupee rate is {EXAMPLE_USD_INR} / {EXAMPLE_USD_EUR}{" "}
        = {CROSS}.
      </p>

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
      <p>
        For a salary or hourly wage in another currency, use the{" "}
        <Link href="/usd-salary-to-inr-calculator">USD salary to INR calculator</Link>, which also splits the
        result by month, week and hour.
      </p>

      <h2>What a margin costs you</h2>
      <p>
        The rate shown here is the mid-market rate. A bank, card or transfer app usually gives you a rate
        below it, a margin, and may add a fixed fee on top. This table shows what different margins take from
        a {SENT.toLocaleString("en-US")} unit transfer at an example rate of {EXAMPLE_USD_INR}. The margins
        are examples, not what any provider charges.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Margin below mid-market</th>
            <th scope="col">Rate you get</th>
            <th scope="col">You receive</th>
            <th scope="col">Lost to the margin</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">None (mid-market)</th>
            <td>{EXAMPLE_USD_INR.toFixed(2)}</td>
            <td>{(SENT * EXAMPLE_USD_INR).toLocaleString("en-US", { maximumFractionDigits: 2 })}</td>
            <td>0</td>
          </tr>
          {MARGINS.map((m) => {
            const rate = EXAMPLE_USD_INR * (1 - m / 100);
            return (
              <tr key={m}>
                <th scope="row">{m}%</th>
                <td>{rate.toFixed(2)}</td>
                <td>{(SENT * rate).toLocaleString("en-US", { maximumFractionDigits: 2 })}</td>
                <td>
                  {(SENT * (EXAMPLE_USD_INR - rate)).toLocaleString("en-US", { maximumFractionDigits: 2 })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        Compare the final amount that arrives, not the headline rate. Why your bank&apos;s number differs, and
        what a good deal looks like, is covered in{" "}
        <Link href="/guides/how-exchange-rates-work">how exchange rates work</Link>.
      </p>

      <h2>What this converter leaves out</h2>
      <p>
        It shows the mid-market reference rate, not a rate you can trade at. It does not include provider
        margins, fixed fees, or taxes on a transfer. The rate comes from a free feed updated about once a day,
        so it can be a few hours behind the market. Use it to plan and check, and confirm the final figure
        with your provider.
      </p>
    </ToolPage>
  );
}
