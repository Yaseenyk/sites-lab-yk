import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PercentChangeTool from "@/components/PercentChangeTool";
import ToolPage from "@/components/ToolPage";
import { decreaseBy, fmt, increaseBy, percentChange } from "@/lib/percent";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("percentage-decrease-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

/** Percent decrease is the size of a fall relative to the old value. */
const decrease = (from: number, to: number): number => -percentChange(from, to);

/** Falls shown in the recovery table, as percentages of a starting value of 100. */
const FALLS = [5, 10, 20, 25, 30, 40, 50, 75];
/** Rise needed to get back to the start after a fall of p%: 100 / (100 - p) - 1. */
const recover = (p: number): number => percentChange(decreaseBy(100, p), 100);

const EXAMPLES: { what: string; from: number; to: number }[] = [
  { what: "Monthly electricity bill", from: 240, to: 204 },
  { what: "Website visits in a month", from: 12_500, to: 10_000 },
  { what: "Body weight in kg", from: 90, to: 81 },
  { what: "Price of a phone", from: 600, to: 450 },
];

const faq = [
  {
    q: "How do I calculate a percentage decrease?",
    a: `Subtract the new value from the old value, divide by the old value, and multiply by 100. From 80 to 60 is (80 - 60) / 80 x 100 = ${fmt(decrease(80, 60))}%.`,
  },
  {
    q: "How do I reduce a number by a percentage?",
    a: `Multiply it by 1 minus the percentage as a decimal. Reducing 200 by 15% is 200 x 0.85 = ${fmt(decreaseBy(200, 15))}.`,
  },
  {
    q: "How do I work out a sale price?",
    a: `Multiply the original price by 1 minus the discount. A $50 item at 30% off costs 50 x 0.70 = $${fmt(decreaseBy(50, 30))}. The discount calculator also shows the saving and stacked discounts.`,
  },
  {
    q: "What is the difference between percentage decrease and percentage difference?",
    a: `Percentage decrease has a direction: it measures a fall from an old value and uses the old value as the base. Percentage difference compares two values with no starting point and uses their average as the base. For 80 and 60 the decrease is ${fmt(decrease(80, 60))}%, but the difference is 20 / 70 x 100 = ${fmt((20 / 70) * 100, 2)}%.`,
  },
  {
    q: "What do two discounts in a row add up to?",
    a: "They multiply, they do not add. 20% off and then a further 10% off leaves 0.80 x 0.90 = 0.72 of the price, which is 28% off in total, not 30%.",
  },
  {
    q: "If a value falls 50% and then rises 50%, do I get back to the start?",
    a: `No. 100 falls to ${fmt(decreaseBy(100, 50))}, and ${fmt(decreaseBy(100, 50))} rising by 50% is only ${fmt(increaseBy(decreaseBy(100, 50), 50))}. To get back you need a rise of ${fmt(recover(50))}%, because the rise starts from a smaller number.`,
  },
  {
    q: "Can a percentage decrease be more than 100%?",
    a: `Not for a value that stays at zero or above: the most it can fall is to 0, which is 100%. It can pass 100% only if the value goes negative. From 20 to -5 is a fall of ${fmt(decrease(20, -5))}%.`,
  },
  {
    q: "How do I find the original number before a decrease?",
    a: `Divide the new value by 1 minus the percentage as a decimal. If a price is 60 after a 25% cut, the original was 60 / 0.75 = ${fmt(60 / 0.75)}.`,
  },
  {
    q: "Is a fall of 5 percentage points the same as a 5% decrease?",
    a: `No. A rate going from 20% to 15% is down 5 percentage points, but it is a ${fmt(decrease(20, 15))}% decrease, because 5 / 20 x 100 = ${fmt(decrease(20, 15))}.`,
  },
  {
    q: "What happens if the new number is bigger than the old one?",
    a: "The result is shown as an increase instead, with a plus sign. For a rise, use the percentage increase calculator, or the percent change calculator to see either direction.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="percentage-decrease-calculator"
      lede="Find the percent decrease between two numbers, or reduce a number by a percentage, such as a discount. Both answers update as you type."
      widget={<PercentChangeTool kind="decrease" />}
      faq={faq}
      related={[
        "percentage-increase-calculator",
        "percent-change-calculator",
        "percentage-difference-calculator",
        "discount-calculator",
      ]}
    >
      <h2>What a percentage decrease is</h2>
      <p>
        A percentage decrease says how big a fall is compared with where the value started. The base is always
        the old value. A fall from 80 to 60 is 20 less than 80, and 20 is 25% of 80, so the decrease is 25%.
      </p>
      <pre>{`percentage decrease = (old - new) / old x 100
new value           = old x (1 - decrease / 100)
old value           = new value / (1 - decrease / 100)`}</pre>

      <h2>How to calculate it</h2>
      <ol>
        <li>Subtract the new value from the old value to get the amount of the fall.</li>
        <li>Divide that amount by the old value, not the new one.</li>
        <li>Multiply by 100 to make it a percentage.</li>
      </ol>
      <p>
        Worked example: a monthly bill drops from 240 to 204. The fall is 240 - 204 = 36. Divided by 240 that
        is 0.15, so the bill fell by {fmt(decrease(240, 204))}%. The calculator&apos;s first box works the
        other way round: type 240 and 15 and you get {fmt(decreaseBy(240, 15))}.
      </p>

      <h2>Real examples</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">What fell</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Amount of the fall</th>
            <th scope="col">Percentage decrease</th>
          </tr>
        </thead>
        <tbody>
          {EXAMPLES.map((e) => (
            <tr key={e.what}>
              <th scope="row">{e.what}</th>
              <td>{fmt(e.from)}</td>
              <td>{fmt(e.to)}</td>
              <td>{fmt(e.from - e.to)}</td>
              <td>{fmt(decrease(e.from, e.to), 2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Reducing a number: what is left</h2>
      <p>
        When you know the percentage and want the new number, multiply by what is left. This table starts from
        100 and also shows the rise needed to get back to 100.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Decrease</th>
            <th scope="col">Multiply by</th>
            <th scope="col">100 becomes</th>
            <th scope="col">Rise needed to recover</th>
          </tr>
        </thead>
        <tbody>
          {FALLS.map((p) => (
            <tr key={p}>
              <th scope="row">{p}%</th>
              <td>{fmt(1 - p / 100)}</td>
              <td>{fmt(decreaseBy(100, p))}</td>
              <td>{fmt(recover(p), 2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        The last column is why a fall hurts more than it looks. After a 50% fall you need a 100% rise to get
        back, and after a 75% fall you need {fmt(recover(75))}%.
      </p>

      <h2>When to use percentage decrease</h2>
      <p>
        Use it when one value is clearly the starting point and the other is lower: a price that was cut,
        sales that dropped, a bill that shrank, weight lost. If you are only comparing two numbers with no
        starting point, such as two measurements, use the{" "}
        <Link href="/percentage-difference-calculator">percentage difference calculator</Link>, which uses the
        average of the two as the base. If the direction could be either way, the{" "}
        <Link href="/percent-change-calculator">percent change calculator</Link> shows a minus sign for a
        fall. For the opposite case, a rise, use the{" "}
        <Link href="/percentage-increase-calculator">percentage increase calculator</Link>.
      </p>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li>
          Dividing by the new value. From 80 to 60, dividing 20 by 60 gives {fmt((20 / 60) * 100, 2)}%, which
          is the rise needed to get back, not the decrease.
        </li>
        <li>
          Adding successive decreases. Two cuts of 20% leave 0.8 x 0.8 = 0.64 of the value, which is{" "}
          {fmt(100 - 64)}% off, not 40%.
        </li>
        <li>Mixing up a percentage decrease with a drop in percentage points.</li>
      </ul>

      <h2>What this calculator leaves out</h2>
      <p>
        It handles one fall at a time. For a price with a second discount stacked on top, or to find the
        percent off from two prices with the saving shown, use the{" "}
        <Link href="/discount-calculator">discount calculator</Link>. It does not take tax or rounding into
        account, and a percentage fall is hard to read when the old value is negative or near zero, so for
        those cases look at the amount of the change as well. The{" "}
        <Link href="/guides/percentage-formulas">guide to percentage formulas</Link> covers the common
        mistakes.
      </p>
    </ToolPage>
  );
}
