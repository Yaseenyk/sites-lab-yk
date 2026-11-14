import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PercentChangeTool from "@/components/PercentChangeTool";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("percentage-increase-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I calculate a percentage increase?",
    a: "Subtract the old value from the new value, divide by the old value, and multiply by 100. From 50 to 65 is (65 - 50) / 50 x 100 = 30%.",
  },
  {
    q: "How do I increase a number by a percentage?",
    a: "Multiply it by 1 plus the percentage as a decimal. Increasing 80 by 25% is 80 x 1.25 = 100.",
  },
  {
    q: "Why is going from 50 to 100 a 100% increase but 100 to 50 only a 50% decrease?",
    a: "Percent change is measured against the starting value. Doubling adds 100% of 50. Halving removes 50% of 100. The same gap of 50 is a different share of a different starting point.",
  },
  {
    q: "What is the difference between a percent and a percentage point?",
    a: "A rate rising from 4% to 5% is a rise of 1 percentage point, but a 25% increase, because 1 is a quarter of 4.",
  },
  {
    q: "Can a percentage increase be more than 100%?",
    a: "Yes. Any new value more than double the old value is an increase over 100%. From 20 to 70 is (70 - 20) / 20 x 100 = 250%.",
  },
  {
    q: "How do I find the original number before a percentage increase?",
    a: "Divide the new value by 1 plus the percentage as a decimal. If a price is 125 after a 25% rise, the original was 125 / 1.25 = 100.",
  },
  {
    q: "What happens if a number goes up 20% and then down 20%?",
    a: "It ends lower than it started. 100 up 20% is 120, and 120 down 20% is 96, a net fall of 4%, because the 20% drop is taken from the bigger number.",
  },
  {
    q: "How do I work out growth over several years?",
    a: "Multiply by 1 plus the rate once per year. Three years of 5% growth is 1.05 x 1.05 x 1.05 = 1.157625, a total increase of about 15.76%, not 15%.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="percentage-increase-calculator"
      lede="Find the percent increase between two numbers, or raise a number by a percentage. Both answers update as you type."
      widget={<PercentChangeTool kind="increase" />}
      faq={faq}
      related={[
        "percentage-decrease-calculator",
        "percent-change-calculator",
        "percentage-calculator",
        "average-calculator",
      ]}
    >
      <h2>The formulas</h2>
      <pre>{`percentage increase = (new - old) / old x 100
new value          = old x (1 + increase / 100)`}</pre>

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
            <td>Increase 80 by 25%</td>
            <td>80 x 1.25</td>
            <td>100</td>
          </tr>
          <tr>
            <td>Percent increase from 50 to 65</td>
            <td>(65 - 50) / 50 x 100</td>
            <td>30%</td>
          </tr>
          <tr>
            <td>Percent increase from 20 to 70</td>
            <td>(70 - 20) / 20 x 100</td>
            <td>250%</td>
          </tr>
        </tbody>
      </table>
      <h2>Real-world examples</h2>
      <table>
        <thead>
          <tr>
            <th>Change</th>
            <th>Working</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rent from 12,000 to 13,200</td>
            <td>(13,200 - 12,000) / 12,000 x 100</td>
            <td>10% increase</td>
          </tr>
          <tr>
            <td>A 40 item now costs 46</td>
            <td>(46 - 40) / 40 x 100</td>
            <td>15% increase</td>
          </tr>
          <tr>
            <td>Salary 50,000 raised by 8%</td>
            <td>50,000 x 1.08</td>
            <td>54,000</td>
          </tr>
          <tr>
            <td>Users from 1.2 million to 1.5 million</td>
            <td>(1.5 - 1.2) / 1.2 x 100</td>
            <td>25% increase</td>
          </tr>
        </tbody>
      </table>

      <h2>Percentage increase or percent change?</h2>
      <p>
        They use the same formula. A positive answer is an increase and a negative one a decrease, which the{" "}
        <Link href="/percent-change-calculator">percent change calculator</Link> labels for you. If neither
        value is the starting point, use the{" "}
        <Link href="/percentage-difference-calculator">percentage difference calculator</Link>.
      </p>
      <p>
        Prices, salaries, rents and populations are all compared this way. For a pay rise specifically, use
        the <a href="https://calc.streamerosai.com/pay-raise-calculator/">pay raise calculator</a>. For a
        fall, see the <Link href="/percentage-decrease-calculator">percentage decrease calculator</Link>.
      </p>
    </ToolPage>
  );
}
