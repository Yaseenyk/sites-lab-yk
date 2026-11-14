import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PercentageCalculator from "@/components/PercentageCalculator";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("percentage-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
  // The sister site math.streamerosai.com owns the general percentage calculator; this copy stays
  // for readers who arrive from the finance tools, but is not a second page competing for the query.
  canonical: "https://math.streamerosai.com/percentage-calculator/",
});

const faq = [
  {
    q: "How do I find X percent of Y?",
    a: "Multiply Y by X, then divide by 100. 25% of 80 is 80 x 25 / 100 = 20.",
  },
  {
    q: "How do I find what percent one number is of another?",
    a: "Divide the part by the whole, then multiply by 100. 20 is what percent of 80? (20 / 80) x 100 = 25%.",
  },
  {
    q: "How do I find the original value before a percent change?",
    a: "Divide the result by (1 + the percent change / 100), using a negative number for a decrease. If 110 is the result of a 10% increase, the original was 110 / 1.10 = 100.",
  },
  {
    q: "Why is percentage change different from percentage points?",
    a: "A rate moving from 10% to 15% is a 5 percentage point increase, but a 50% relative increase (5 / 10 x 100). The two describe the same move differently, and mixing them up is a common source of confusion in statistics about rates.",
  },
  {
    q: "How is a percentage discount calculated?",
    a: "Multiply the original price by the discount percent to find the amount off, then subtract it from the price, or equivalently multiply by (1 - discount / 100). A 20% discount on ₹500 takes off ₹100, for a final price of ₹400.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="percentage-calculator"
      lede="Three calculators in one: find X percent of a number, find what percent one number is of another, or work backward to the original value before a percent change."
      widget={<PercentageCalculator />}
      faq={faq}
      related={["gst-calculator", "compound-interest-calculator", "pay-raise-calculator"]}
    >
      <h2>The three formulas</h2>
      <ul>
        <li>
          <strong>X% of Y:</strong> result = Y x X / 100.
        </li>
        <li>
          <strong>X is what % of Y:</strong> result = (X / Y) x 100.
        </li>
        <li>
          <strong>Find the original value:</strong> original = result / (1 + percent change / 100).
        </li>
      </ul>
      <p>
        For a raise, discount or any change applied to a pay figure specifically, the{" "}
        <Link href="/pay-raise-calculator">pay raise calculator</Link> covers the same math with pay-specific
        wording and a multi-year projection. For plain everyday percentages (increase, decrease, change,
        difference) see the{" "}
        <a href="https://math.streamerosai.com/percentage-calculator/">full percentage calculator</a> on
        StreamerOS Math Calculators.
      </p>
    </ToolPage>
  );
}
