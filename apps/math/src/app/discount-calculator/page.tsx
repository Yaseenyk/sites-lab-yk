import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import ToolPage from "@/components/ToolPage";
import { DiscountCalculator } from "@/components/TimeAndDiscount";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("discount-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I calculate a sale price?",
    a: "Multiply the original price by 1 minus the discount as a decimal. An $80 item at 25% off costs 80 x 0.75 = $60, so you save $20.",
  },
  {
    q: "How do I find the percent off from two prices?",
    a: "Subtract the sale price from the original, divide by the original, and multiply by 100. From $120 down to $90 is (120 - 90) / 120 x 100 = 25% off.",
  },
  {
    q: "What do two discounts in a row add up to?",
    a: "They multiply, they do not add. 20% off and then a further 10% off leaves 0.80 x 0.90 = 72% of the price, which is 28% off in total, not 30%. Use the extra discount box to see it.",
  },
  {
    q: "How do I work out the original price from the sale price?",
    a: "Divide the sale price by 1 minus the discount. If an item costs $60 after 25% off, the original price was 60 / 0.75 = $80.",
  },
  {
    q: "Does it include sales tax?",
    a: "No. The calculator works on the price you enter. Sales tax is usually added after the discount, so multiply the sale price by 1 plus your tax rate.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="discount-calculator"
      lede="Find the sale price and how much you save, stack a second discount, or work out what percent off a sale price really is."
      widget={<DiscountCalculator />}
      faq={faq}
      related={[
        "percentage-decrease-calculator",
        "percentage-calculator",
        "percent-change-calculator",
        "ratio-calculator",
      ]}
    >
      <h2>The formulas</h2>
      <pre>{`sale price     = original x (1 - discount / 100)
you save       = original - sale price
percent off    = (original - sale) / original x 100`}</pre>

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
            <td>$80 at 25% off</td>
            <td>80 x 0.75</td>
            <td>$60 (save $20)</td>
          </tr>
          <tr>
            <td>$100 at 20% then 10% off</td>
            <td>100 x 0.80 x 0.90</td>
            <td>$72 (28% off)</td>
          </tr>
          <tr>
            <td>$120 reduced to $90</td>
            <td>(120 - 90) / 120</td>
            <td>25% off</td>
          </tr>
        </tbody>
      </table>
      <p>
        The same sums apply to any percentage fall: see the{" "}
        <Link href="/percentage-decrease-calculator">percentage decrease calculator</Link> and the{" "}
        <Link href="/guides/percentage-formulas">guide to percentage formulas</Link>.
      </p>
    </ToolPage>
  );
}
