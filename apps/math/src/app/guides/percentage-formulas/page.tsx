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

        <AdSlot slot={AD_SLOT_CONTENT} placement="in-article" />

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
        <h2>Worked example: a price with a discount and tax</h2>
        <p>
          An item is listed at 1,000. It is on sale at 20% off, and 18% tax is added at the till. The order
          matters for how you describe it but not for the result of two multiplications: 1,000 x 0.80 = 800
          after the discount, then 800 x 1.18 = <strong>944</strong> with tax. Doing it the other way round,
          1,000 x 1.18 x 0.80, is also 944, because multiplication can be done in either order. What is not
          the same is adding the percentages: 1,000 x (1 + 0.18 - 0.20) would be 980, which is wrong.
        </p>

        <h2>Working backwards from a total</h2>
        <p>
          A bill is 1,180 and it includes 18% tax. The tax is not 18% of 1,180. The pre-tax price is 1,180 /
          1.18 = <strong>1,000</strong>, so the tax is 180. Taking 18% of 1,180 gives 212.40, which is the
          classic wrong answer, because 18% applies to the price before tax, not to the total. The same rule
          finds the original price before any known percentage change: divide by (1 + the change).
        </p>

        <h2>Percent change in a row</h2>
        <p>
          Successive changes multiply. Up 10% and then down 10% is 100 x 1.10 x 0.90 = 99, a net fall of 1%,
          not zero. Three years of 5% growth is 1.05 x 1.05 x 1.05 = 1.157625, so 15.76% in total, slightly
          more than 3 x 5% = 15%, because each year&apos;s growth is on a larger base. The{" "}
          <Link href="/percentage-increase-calculator">percentage increase calculator</Link> does one step;
          chain the results for several.
        </p>

        <h2>When a percentage is not enough</h2>
        <ul>
          <li>
            A percentage of a very small base looks dramatic: a rise from 2 to 4 cases is up 100%, but 2 more
            cases. Quote the counts as well.
          </li>
          <li>
            Percentages of different groups cannot be added or averaged without weighting them. If 50% of 10
            people and 20% of 90 people agree, the combined figure is (5 + 18) / 100 = 23%, not 35%.
          </li>
          <li>
            Percent difference and percent change answer different questions. Use change when one value is the
            starting point and difference when neither is.
          </li>
        </ul>
        <p>
          All of the formulas on this page are standard arithmetic definitions of percentage and need no
          external source; each example above can be checked with the calculators linked on this page or with
          any ordinary calculator.
        </p>
        <AdSlot slot={AD_SLOT_CONTENT} placement="article-end" />
      </article>
    </>
  );
}
