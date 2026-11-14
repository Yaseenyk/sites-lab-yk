import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PercentChangeTool from "@/components/PercentChangeTool";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("percent-change-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "What is percent change?",
    a: "How much a value moved, as a percentage of where it started: (new - old) / old x 100. A positive result is an increase and a negative result is a decrease.",
  },
  {
    q: "What is the difference between percent change and percent difference?",
    a: "Percent change has a direction and uses the old value as the base. Percent difference compares two values with neither as the starting point, using their average as the base, so it comes out the same whichever is first.",
  },
  {
    q: "Why does 40 to 50 give +25% but 50 to 40 gives -20%?",
    a: "Each is measured against its own starting value: 10 is 25% of 40, but only 20% of 50. Percent difference avoids this: both directions give 22.22%.",
  },
  {
    q: "What happens if the old value is zero?",
    a: "The percent change is undefined, because you cannot divide by zero. The calculator asks for a non-zero old value.",
  },
  {
    q: "How do I use it for negative numbers?",
    a: "The formula divides by the size of the old value, so a move from -50 to -25 is shown as a +50% change. For quantities that can cross zero, absolute change is often clearer than a percentage.",
  },
  {
    q: "How do I calculate percent change in a spreadsheet?",
    a: "With the old value in A1 and the new value in B1, enter =(B1-A1)/ABS(A1) and format the cell as a percentage.",
  },
  {
    q: "Is a 10% change the same as 10 percentage points?",
    a: "No. Moving from 40% to 50% is 10 percentage points, but a 25% change, because 10 / 40 x 100 = 25.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="percent-change-calculator"
      lede="Enter an old and a new value to see the percent change, the absolute change and the percent difference. It works in both directions."
      widget={<PercentChangeTool kind="change" />}
      faq={faq}
      related={[
        "percentage-increase-calculator",
        "percentage-decrease-calculator",
        "percentage-calculator",
        "average-calculator",
      ]}
    >
      <h2>The formulas</h2>
      <pre>{`percent change     = (new - old) / |old| x 100
percent difference = |a - b| / ((a + b) / 2) x 100`}</pre>

      <h2>Worked example</h2>
      <p>
        From 40 to 50: the change is 50 - 40 = 10, and 10 / 40 x 100 = <strong>+25%</strong>. From 50 back to
        40 it is -10 / 50 x 100 = <strong>-20%</strong>. The percent difference between 40 and 50 is 10 / 45 x
        100 = 22.22% either way, because the base is the average, 45.
      </p>

      <h2>More worked examples</h2>
      <table>
        <thead>
          <tr>
            <th>From, to</th>
            <th>Working</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sales 1,200 to 1,500</td>
            <td>(1,500 - 1,200) / 1,200 x 100</td>
            <td>+25%</td>
          </tr>
          <tr>
            <td>Share price 80 to 68</td>
            <td>(68 - 80) / 80 x 100</td>
            <td>-15%</td>
          </tr>
          <tr>
            <td>Test score 62 to 78</td>
            <td>(78 - 62) / 62 x 100</td>
            <td>+25.81%</td>
          </tr>
          <tr>
            <td>20 and 30 compared as a difference</td>
            <td>10 / 25 x 100</td>
            <td>40% difference (20 to 30 as a change is +50%)</td>
          </tr>
        </tbody>
      </table>

      <h2>Which one should I use?</h2>
      <ul>
        <li>
          <strong>Percent change:</strong> when one value is clearly the starting point, such as last
          year&apos;s sales and this year&apos;s.
        </li>
        <li>
          <strong>Percent difference:</strong> when you compare two values on equal footing, such as two
          measurements of the same thing.
        </li>
      </ul>
      <p>
        For a plain increase or decrease, see the <Link href="/percentage-increase-calculator">increase</Link>{" "}
        and <Link href="/percentage-decrease-calculator">decrease</Link> calculators.
      </p>
    </ToolPage>
  );
}
