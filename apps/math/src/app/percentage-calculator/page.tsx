import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import LanguageHint from "@/components/LanguageHint";
import PercentCalculator from "@/components/PercentCalculator";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("percentage-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
  languages: {
    en: `${site.url}${tool.path}`,
    "zh-CN": `${site.url}/zh/percentage-calculator/`,
    "x-default": `${site.url}${tool.path}`,
  },
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
  {
    q: "How do I work out a test score as a percentage?",
    a: "Divide the marks you got by the total marks and multiply by 100. 42 out of 60 is 42 / 60 x 100 = 70%.",
  },
  {
    q: "Why does adding 10% twice not give 20%?",
    a: "The second 10% is taken from the already-increased number. 100 up 10% is 110, and 110 up 10% is 121, which is a 21% total rise, not 20%.",
  },
  {
    q: "What is the difference between a percentage and a percentage point?",
    a: "A percentage point is a plain subtraction of two percentages. A rate moving from 10% to 15% is up 5 percentage points, which is a 50% relative increase (5 / 10 x 100).",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="percentage-calculator"
      lede="Three answers in one place: what is X% of Y, X is what percent of Y, and X is Y% of what number. Type in any box and the result updates."
      widget={
        <>
          <LanguageHint href="/zh/percentage-calculator/" text="中文版：百分比计算器" to="zh" />
          <PercentCalculator />
        </>
      }
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

      <h2>How to use the calculator</h2>
      <ol>
        <li>Pick the question that matches yours: X% of Y, X is what % of Y, or X is Y% of what.</li>
        <li>Type your two numbers in that block. The answer appears as you type; there is no button.</li>
        <li>Check the answer against the formula table above if you want to see the working.</li>
      </ol>

      <h2>Worked examples from everyday life</h2>
      <table>
        <thead>
          <tr>
            <th>Situation</th>
            <th>Working</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>An 18% tip on a 64 bill</td>
            <td>18 / 100 x 64</td>
            <td>11.52</td>
          </tr>
          <tr>
            <td>8% sales tax on 250</td>
            <td>8 / 100 x 250 = 20, then 250 + 20</td>
            <td>20 tax, 270 total</td>
          </tr>
          <tr>
            <td>42 marks out of 60</td>
            <td>42 / 60 x 100</td>
            <td>70%</td>
          </tr>
          <tr>
            <td>36 is 12% of what number?</td>
            <td>36 / 0.12</td>
            <td>300</td>
          </tr>
          <tr>
            <td>7.5% interest on 2,400</td>
            <td>7.5 / 100 x 2,400</td>
            <td>180</td>
          </tr>
        </tbody>
      </table>

      <h2>Common percentages as fractions</h2>
      <p>
        50% is 1/2, 25% is 1/4, 20% is 1/5, 12.5% is 1/8, 10% is 1/10 and 5% is 1/20. If you spot one of
        these, divide instead of multiplying: 25% of 80 is 80 / 4 = 20.
      </p>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li>
          <strong>Stacking percentages by adding them.</strong> A 10% rise followed by another 10% is 21%, not
          20%, because the second is applied to the larger number.
        </li>
        <li>
          <strong>Using the wrong base.</strong> In &quot;X is what percent of Y&quot; the total Y is the
          denominator. 20 is 25% of 80 but 80 is 400% of 20.
        </li>
        <li>
          <strong>Mixing percent and percentage points.</strong> See the guide to{" "}
          <Link href="/guides/percentage-formulas">percentage formulas</Link>.
        </li>
      </ul>
      <p>
        Working with money? The <a href="https://calc.streamerosai.com/gst-calculator/">GST calculator</a>{" "}
        adds or removes tax in one step.
      </p>

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
