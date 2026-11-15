import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PercentChangeTool from "@/components/PercentChangeTool";
import ToolPage from "@/components/ToolPage";
import { fmt, percentChange, percentDifference } from "@/lib/percent";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("percentage-difference-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const signed = (n: number): string => `${n >= 0 ? "+" : ""}${fmt(n, 2)}%`;

/** Pairs shown side by side: the symmetric difference against the change in each direction. */
const PAIRS: [number, number][] = [
  [40, 50],
  [100, 150],
  [1000, 1100],
  [20, 30],
  [1, 2],
  [0, 10],
];

/** Pairs of measurements, where percent error would need one of them to be the accepted value. */
const MEASURES: { what: string; a: number; b: number }[] = [
  { what: "Two shops sell the same item", a: 48, b: 54 },
  { what: "Two readings of the same length (cm)", a: 12.4, b: 12.9 },
  { what: "Two estimates of a project cost", a: 18_000, b: 22_000 },
];

const faq = [
  {
    q: "How do I calculate the percentage difference between two numbers?",
    a: `Divide the gap between them by their average, then multiply by 100. For 40 and 50 the gap is 10 and the average is 45, so the difference is 10 / 45 x 100 = ${fmt(percentDifference(40, 50), 2)}%.`,
  },
  {
    q: "What is the difference between percentage difference and percent change?",
    a: "Percent change measures a move from an old value to a new one and uses the old value as the base. Percentage difference compares two values neither of which is the starting point, using their average as the base, so the order does not matter.",
  },
  {
    q: "Why not just divide by one of the numbers?",
    a: `Then the answer would depend on which number you chose. Using the average treats both equally: 40 and 50 give ${fmt(percentDifference(40, 50), 2)}% in either order, while a change from 40 to 50 is ${signed(percentChange(40, 50))} and from 50 to 40 is ${signed(percentChange(50, 40))}.`,
  },
  {
    q: "When should I use percentage difference?",
    a: "When you compare two measurements of the same kind with no obvious starting point, such as two lab results, two prices from different shops, or two estimates.",
  },
  {
    q: "What if one number is zero?",
    a: `It still works as long as the average is not zero. 0 and 10 have an average of 5, so the difference is 10 / 5 x 100 = ${fmt(percentDifference(0, 10))}%. Two numbers that cancel, such as -5 and 5, have an average of 0 and no percentage difference.`,
  },
  {
    q: "What is the largest possible percentage difference?",
    a: `For two numbers that are zero or positive it is 200%, reached when one of them is 0. Always being at or below 200% is one reason it behaves differently from percent change, which has no upper limit: 10 to 100 is ${signed(percentChange(10, 100))}, while the difference between 10 and 100 is ${fmt(percentDifference(10, 100), 2)}%.`,
  },
  {
    q: "Is percentage difference the same as percent error?",
    a: "No. Percent error compares a measured value with an accepted or true value and divides by that accepted value: |measured - true| / |true| x 100. Percentage difference has no true value, so it divides by the average of the two. Use percent error when one number is the reference.",
  },
  {
    q: "Can the percentage difference be negative?",
    a: "No. It uses the size of the gap, so it is always zero or positive, and it is zero only when the two numbers are equal. If you need to know which value is bigger, use percent change.",
  },
  {
    q: "How do I turn two numbers into a percentage difference in a spreadsheet?",
    a: "With the values in A1 and B1, enter =ABS(A1-B1)/((A1+B1)/2) and format the cell as a percentage.",
  },
  {
    q: "Does the order I type the numbers in matter?",
    a: `No. That is the point of the measure. ${fmt(40)} and ${fmt(50)} give ${fmt(percentDifference(40, 50), 2)}%, and so do ${fmt(50)} and ${fmt(40)}.`,
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="percentage-difference-calculator"
      lede="Enter two numbers to see the percentage difference between them. It uses their average as the base, so the answer is the same whichever you enter first."
      widget={<PercentChangeTool kind="difference" />}
      faq={faq}
      related={[
        "percent-change-calculator",
        "percentage-increase-calculator",
        "percentage-calculator",
        "average-calculator",
      ]}
    >
      <h2>What percentage difference means</h2>
      <p>
        Percentage difference answers &ldquo;how far apart are these two numbers, as a share of their
        size?&rdquo; when neither number is the original. Because there is no starting point, the base is the
        average of the two values. That makes the answer symmetric: it does not change if you swap them.
      </p>
      <pre>{`percentage difference = |a - b| / ((a + b) / 2) x 100`}</pre>

      <h2>How to calculate it</h2>
      <ol>
        <li>Subtract one number from the other and ignore the sign. That is the gap.</li>
        <li>Add the two numbers and divide by 2. That is the average.</li>
        <li>Divide the gap by the average and multiply by 100.</li>
      </ol>
      <p>
        Worked example: two shops sell the same item for 48 and 54. The gap is 6. The average is 51. Then 6 /
        51 x 100 = {fmt(percentDifference(48, 54), 2)}%. Neither shop is the &ldquo;old&rdquo; price, so
        neither is the base.
      </p>

      <h2>Percentage difference against percent change</h2>
      <p>
        The same two numbers give three different percentages depending on the question. Percent change needs
        a starting value and has a direction. Percentage difference does not.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Values</th>
            <th scope="col">Gap</th>
            <th scope="col">Average</th>
            <th scope="col">Percentage difference</th>
            <th scope="col">Change, first to second</th>
            <th scope="col">Change, second to first</th>
          </tr>
        </thead>
        <tbody>
          {PAIRS.map(([a, b]) => (
            <tr key={`${a}-${b}`}>
              <th scope="row">
                {fmt(a)} and {fmt(b)}
              </th>
              <td>{fmt(Math.abs(b - a))}</td>
              <td>{fmt((a + b) / 2)}</td>
              <td>{fmt(percentDifference(a, b), 2)}%</td>
              <td>{a === 0 ? "undefined" : signed(percentChange(a, b))}</td>
              <td>{signed(percentChange(b, a))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Ignoring the sign, the percentage difference always sits between the two changes, and it is the same
        in both directions. When the two numbers are close, all three are close; the further apart they are,
        the more the two changes pull away from the difference.
      </p>

      <h2>Everyday comparisons</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Comparison</th>
            <th scope="col">Value 1</th>
            <th scope="col">Value 2</th>
            <th scope="col">Percentage difference</th>
          </tr>
        </thead>
        <tbody>
          {MEASURES.map((m) => (
            <tr key={m.what}>
              <th scope="row">{m.what}</th>
              <td>{fmt(m.a)}</td>
              <td>{fmt(m.b)}</td>
              <td>{fmt(percentDifference(m.a, m.b), 2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Which percentage should I use?</h2>
      <ul>
        <li>
          <strong>Percentage difference</strong> for two values on equal footing, with the average as the
          base.
        </li>
        <li>
          <strong>
            <Link href="/percent-change-calculator">Percent change</Link>
          </strong>{" "}
          when one value is the old value and you want the move from it, with a sign.
        </li>
        <li>
          <strong>Percent error</strong> when one value is a known true or accepted value. Divide by that
          value instead of the average.
        </li>
      </ul>

      <h2>What this calculator leaves out</h2>
      <p>
        It compares two numbers only. For a list of numbers, the spread is described by the{" "}
        <Link href="/standard-deviation-calculator">standard deviation</Link>. It gives no answer when the two
        numbers average to zero, because the base would be zero. It also does not say which value is larger;
        the extra line under the result shows the change in each direction. For a plain rise or fall from a
        starting value, see the <Link href="/percentage-increase-calculator">percentage increase</Link> and{" "}
        <Link href="/percentage-decrease-calculator">percentage decrease</Link> calculators. The{" "}
        <Link href="/guides/percentage-formulas">guide to percentage formulas</Link> explains when each
        applies.
      </p>
    </ToolPage>
  );
}
