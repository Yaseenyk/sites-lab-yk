import Link from "next/link";
import { AdSlot, pageMetadata } from "@sites/shell";
import GuideHead from "@/components/GuideHead";
import { AD_SLOT_CONTENT, site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "How Exchange Rates Work: Mid-Market Rate vs the Rate You Get",
  description:
    "What an exchange rate is, what the mid-market rate means, why banks and transfer apps give you less, and how to compare what you will actually receive.",
  path: "/guides/how-exchange-rates-work/",
  type: "article",
});

export default function Page() {
  return (
    <>
      <GuideHead slug="how-exchange-rates-work" />
      <article className="doc">
        <h1>How exchange rates work: the mid-market rate vs the rate you get</h1>
        <p>
          An exchange rate is the price of one currency in another. If 1 US dollar costs 90 Indian rupees, the
          USD to INR rate is 90. The rate you see on a converter and the rate you are offered when you send
          money are often not the same number, and the gap is where the cost hides.
        </p>

        <h2>The mid-market rate</h2>
        <p>
          In the foreign exchange market every currency pair has a price to buy and a slightly higher price to
          sell. The mid-market rate is the midpoint between the two. It is the neutral benchmark that
          converters and news sites show, and it is the fairest number to compare against. The converters on
          this site use it.
        </p>

        <h2>Why you rarely get it</h2>
        <p>
          Banks, card networks, exchange counters and transfer apps make money on currency exchange in two
          ways, and often both: a margin built into the rate (they sell you a currency for more than the
          mid-market price) and a separate fee. A transfer that advertises no fee may still be expensive if
          the margin is large.
        </p>

        <AdSlot slot={AD_SLOT_CONTENT} placement="in-article" />

        <h2>How to compare offers</h2>
        <ol>
          <li>
            Find the mid-market rate for your pair with the{" "}
            <Link href="/currency-converter">currency converter</Link>.
          </li>
          <li>Ask each provider how much the recipient will receive in the end currency after all fees.</li>
          <li>Compare the received amounts, not the headline rate or the fee on its own.</li>
          <li>The difference between the mid-market result and what arrives is your real cost.</li>
        </ol>

        <h2>Why rates change</h2>
        <p>
          Most major currencies float: their prices move through the day with supply and demand in the market,
          driven by interest rates, trade, investment flows and news. A few currencies are pegged. The UAE
          dirham, for example, is held at about 3.6725 to the US dollar, so it moves against other currencies
          almost exactly as the dollar does.
        </p>

        <h2>Doing the arithmetic yourself</h2>
        <pre>{`amount in B = amount in A x rate (A to B)
rate (B to A) = 1 / rate (A to B)`}</pre>
        <p>
          If 1 euro buys 1.10 dollars, 50 euros is 55 dollars, and 1 dollar buys about 0.909 euros. See the
          converter for a live example, or open a popular pair such as{" "}
          <Link href="/usd-to-inr">USD to INR</Link>.
        </p>
        <h2>Worked example: what a transfer really costs</h2>
        <p>
          Say you want to send $1,000 to India and the mid-market rate is 90 rupees to the dollar, so the
          benchmark outcome is 90,000 rupees. The two providers below use made-up numbers to show the method;
          they are not real quotes.
        </p>
        <table>
          <thead>
            <tr>
              <th scope="col">Provider</th>
              <th scope="col">Fee</th>
              <th scope="col">Rate offered</th>
              <th scope="col">Rupees received</th>
              <th scope="col">Cost against 90,000</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">A: fee shown, wide margin</th>
              <td>$5</td>
              <td>88.20</td>
              <td>(1,000 - 5) x 88.20 = 87,759</td>
              <td>2,241 (2.49%)</td>
            </tr>
            <tr>
              <th scope="row">B: no fee, narrow margin</th>
              <td>$0</td>
              <td>89.55</td>
              <td>1,000 x 89.55 = 89,550</td>
              <td>450 (0.50%)</td>
            </tr>
          </tbody>
        </table>
        <p>
          Provider A looks fine if you only look at its $5 fee, but its rate is 2% below the mid-market rate,
          so it costs about five times as much overall. The percentage cost is (mid-market result - amount
          received) / mid-market result.
        </p>

        <h2>Paying by card abroad</h2>
        <p>
          When a card terminal or a website offers to charge you in your home currency instead of the local
          one (often called dynamic currency conversion), the shop or its processor sets the rate, and it is
          commonly worse than the rate your card network would apply. Choosing the local currency usually
          gives a better rate, though your own bank may still add a foreign transaction fee. Check your card
          terms for that fee.
        </p>

        <h2>Where the rates on this site come from</h2>
        <p>
          The converters load daily rates from free public rate feeds (an open currency API and
          exchangerate-api.com, with a fallback between them) in your browser. They are reference rates for
          planning, in the same spirit as the mid-market rate, but they are not a quote: a bank, card or
          transfer provider will give you a different number, and rates for smaller currencies may be updated
          less often than for the major ones. Do not use this page to settle a contract or a trade; ask the
          provider for a firm quote.
        </p>
        <AdSlot slot={AD_SLOT_CONTENT} placement="article-end" />
      </article>
    </>
  );
}
