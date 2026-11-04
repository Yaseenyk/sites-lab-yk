import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PercentCalculator from "@/components/PercentCalculator";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("percentage-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I calculate X% of a number?",
    a: "Divide the percentage by 100 and multiply by the number. 15% of 80 is 15 / 100 x 80 = 12.",
  },
  {
    q: "How do I find what percent one number is of another?",
    a: "Divide the first number by the second and multiply by 100. 12 is 12 / 80 x 100 = 15% of 80.",
  },
  {
    q: "How do I find the whole number when I know a part and the percentage?",
    a: "Divide the part by the percentage as a decimal. If 12 is 15% of a number, the number is 12 / 0.15 = 80.",
  },
  {
    q: "How do I calculate a percentage of a percentage?",
    a: "Multiply them as decimals. 20% of 50% is 0.20 x 0.50 = 0.10, which is 10%. Use the first calculator and enter 20 as the percentage and 50 as the number.",
  },
  {
    q: "How do I turn a percentage into a decimal?",
    a: "Divide by 100, which moves the decimal point two places left. 15% is 0.15, and 7.5% is 0.075.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="percentage-calculator"
      lede="Three answers in one place: what is X% of Y, X is what percent of Y, and X is Y% of what number. Type in any box and the result updates."
      widget={<PercentCalculator />}
      faq={faq}
      related={[
        "percentage-increase-calculator",
        "percentage-decrease-calculator",
        "percent-change-calculator",
        "ratio-calculator",
      ]}
    >
      <h2>The three formulas</h2>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Formula</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>X% of Y</td>
            <td>X / 100 x Y</td>
            <td>15% of 80 = 12</td>
          </tr>
          <tr>
            <td>X is what % of Y</td>
            <td>X / Y x 100</td>
            <td>12 is 15% of 80</td>
          </tr>
          <tr>
            <td>X is Y% of what</td>
            <td>X / (Y / 100)</td>
            <td>12 is 15% of 80</td>
          </tr>
        </tbody>
      </table>

      <h2>A quick way to do it in your head</h2>
      <p>
        Ten percent of a number is the number with the decimal point moved one place left: 10% of 80 is 8.
        Five percent is half of that, 4. So 15% of 80 is 8 + 4 = 12. One percent is the decimal point moved
        two places.
      </p>
      <p>
        To work out a rise or a fall, use the{" "}
        <Link href="/percentage-increase-calculator">percentage increase</Link> and{" "}
        <Link href="/percentage-decrease-calculator">percentage decrease</Link> calculators. The{" "}
        <Link href="/guides/percentage-formulas">guide to percentage formulas</Link> covers the common
        mistakes.
      </p>
    </ToolPage>
  );
}
