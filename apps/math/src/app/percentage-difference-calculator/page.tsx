import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PercentChangeTool from "@/components/PercentChangeTool";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("percentage-difference-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I calculate the percentage difference between two numbers?",
    a: "Divide the gap between them by their average, then multiply by 100. For 40 and 50 the gap is 10 and the average is 45, so the difference is 10 / 45 x 100 = 22.22%.",
  },
  {
    q: "What is the difference between percentage difference and percent change?",
    a: "Percent change measures a move from an old value to a new one and uses the old value as the base. Percentage difference compares two values neither of which is the starting point, using their average as the base, so the order does not matter.",
  },
  {
    q: "Why not just divide by one of the numbers?",
    a: "Then the answer would depend on which number you chose. Using the average treats both equally: 40 and 50 give 22.22% in either order, while a change from 40 to 50 is +25% and from 50 to 40 is -20%.",
  },
  {
    q: "When should I use percentage difference?",
    a: "When you compare two measurements of the same kind with no obvious starting point, such as two lab results, two prices from different shops, or two estimates.",
  },
  {
    q: "What if one number is zero?",
    a: "It still works as long as the average is not zero. 0 and 10 have an average of 5, so the difference is 10 / 5 x 100 = 200%. Two numbers that cancel, such as -5 and 5, have an average of 0 and no percentage difference.",
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
      <h2>The formula</h2>
      <pre>{`percentage difference = |a - b| / ((a + b) / 2) x 100`}</pre>

      <h2>Worked examples</h2>
      <table>
        <thead>
          <tr>
            <th>Values</th>
            <th>Working</th>
            <th>Difference</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>40 and 50</td>
            <td>10 / 45 x 100</td>
            <td>22.22%</td>
          </tr>
          <tr>
            <td>100 and 150</td>
            <td>50 / 125 x 100</td>
            <td>40%</td>
          </tr>
          <tr>
            <td>0 and 10</td>
            <td>10 / 5 x 100</td>
            <td>200%</td>
          </tr>
        </tbody>
      </table>
      <p>
        If one value is clearly the starting point, use the{" "}
        <Link href="/percent-change-calculator">percent change calculator</Link> instead. The{" "}
        <Link href="/guides/percentage-formulas">guide to percentage formulas</Link> explains when each
        applies.
      </p>
    </ToolPage>
  );
}
