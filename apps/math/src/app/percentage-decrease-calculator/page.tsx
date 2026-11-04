import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PercentChangeTool from "@/components/PercentChangeTool";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("percentage-decrease-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I calculate a percentage decrease?",
    a: "Subtract the new value from the old value, divide by the old value, and multiply by 100. From 80 to 60 is (80 - 60) / 80 x 100 = 25%.",
  },
  {
    q: "How do I reduce a number by a percentage?",
    a: "Multiply it by 1 minus the percentage as a decimal. Reducing 200 by 15% is 200 x 0.85 = 170.",
  },
  {
    q: "How do I work out a sale price?",
    a: "Multiply the original price by 1 minus the discount. A $50 item at 30% off costs 50 x 0.70 = $35.",
  },
  {
    q: "What do two discounts in a row add up to?",
    a: "They multiply, they do not add. 20% off and then a further 10% off leaves 0.80 x 0.90 = 0.72 of the price, which is 28% off in total, not 30%.",
  },
  {
    q: "If a value falls 50% and then rises 50%, do I get back to the start?",
    a: "No. 100 falls to 50, and 50 rising by 50% is only 75. A percentage always applies to the current value, so the rise starts from a smaller number.",
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
        "percentage-calculator",
        "ratio-calculator",
      ]}
    >
      <h2>The formulas</h2>
      <pre>{`percentage decrease = (old - new) / old x 100
new value           = old x (1 - decrease / 100)`}</pre>

      <h2>Worked examples</h2>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Working</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Reduce 200 by 15%</td>
            <td>200 x 0.85</td>
            <td>170</td>
          </tr>
          <tr>
            <td>Percent decrease from 80 to 60</td>
            <td>(80 - 60) / 80 x 100</td>
            <td>25%</td>
          </tr>
          <tr>
            <td>$50 item, 30% off</td>
            <td>50 x 0.70</td>
            <td>$35</td>
          </tr>
        </tbody>
      </table>
      <p>
        If the new number is larger than the old one, the result shows as an increase. For a rise, use the{" "}
        <Link href="/percentage-increase-calculator">percentage increase calculator</Link>, or the{" "}
        <Link href="/percent-change-calculator">percent change calculator</Link> to see either direction.
      </p>
    </ToolPage>
  );
}
