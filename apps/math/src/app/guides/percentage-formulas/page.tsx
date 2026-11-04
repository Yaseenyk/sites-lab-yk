import Link from "next/link";
import { AdSlot, pageMetadata } from "@sites/shell";
import GuideHead from "@/components/GuideHead";
import { AD_SLOT_CONTENT, site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Percentage Formulas Explained: Of, Is-What-Percent, Change",
  description:
    "The percentage formulas you need, with worked examples, plus common mistakes like percent versus percentage points and why +50% then -50% is not zero.",
  path: "/guides/percentage-formulas/",
  type: "article",
});

export default function Page() {
  return (
    <>
      <GuideHead slug="percentage-formulas" />
      <article className="doc">
        <h1>Percentage formulas explained: of, is-what-percent and percent change</h1>
        <p>
          &quot;Percent&quot; means per hundred, so 15% is 15 out of every 100, or 0.15. Almost every
          percentage question is one of the five below. The{" "}
          <Link href="/percentage-calculator">percentage calculator</Link> does each of them with your own
          numbers.
        </p>

        <h2>The five formulas</h2>
        <pre>{`X% of Y              = X / 100 x Y          15% of 80  = 12
X is what % of Y     = X / Y x 100          12 of 80   = 15%
X is Y% of what      = X / (Y / 100)        12 is 15%  -> 80
percent change       = (new - old) / old x 100       40 -> 50 = +25%
new after Y% change  = old x (1 +/- Y / 100)         80 +25%  = 100`}</pre>

        <h2>Mistake 1: percent versus percentage points</h2>
        <p>
          If an interest rate rises from 4% to 5%, it has risen by <strong>1 percentage point</strong>. As a
          percent change it is up <strong>25%</strong>, because 1 is a quarter of 4. News stories mix the two,
          so check which one is meant.
        </p>

        <h2>Mistake 2: a rise and a fall do not cancel</h2>
        <p>
          A percentage always applies to the current value. 100 falling by 50% is 50, and 50 rising by 50% is
          only 75. To get back to 100 from 50 you need a rise of 100%. This is why a share price that halves
          has to double to recover.
        </p>

        <AdSlot slot={AD_SLOT_CONTENT} />

        <h2>Mistake 3: adding discounts</h2>
        <p>
          Two discounts multiply. 20% off and then 10% off leaves 0.80 x 0.90 = 0.72 of the price, which is
          28% off, not 30%. The{" "}
          <Link href="/percentage-decrease-calculator">percentage decrease calculator</Link> shows the result
          for one step at a time.
        </p>

        <h2>Mistake 4: using the wrong base</h2>
        <p>
          Percent change is measured against the starting value. From 40 to 50 is +25%, but from 50 to 40 is
          -20%. If neither value is the starting point, use percent difference, which divides by the average
          and gives the same answer both ways: 22.22% for 40 and 50. The{" "}
          <Link href="/percent-change-calculator">percent change calculator</Link> shows both.
        </p>

        <h2>Mental shortcuts</h2>
        <ul>
          <li>10% of a number: move the decimal point one place left.</li>
          <li>5%: half of 10%. 1%: move the decimal point two places.</li>
          <li>15% is 10% plus 5%. 25% is a quarter. 50% is half.</li>
        </ul>
      </article>
    </>
  );
}
