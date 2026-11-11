import { pageMetadata } from "@sites/shell";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("compound-interest-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "What is the compound interest formula?",
    a: "A = P(1 + r/n)^(nt), where P is the principal, r is the annual rate as a decimal, n is the number of compounding periods per year, and t is the time in years. The total interest earned is A minus P.",
  },
  {
    q: "What's the difference between compound and simple interest?",
    a: "Simple interest is calculated only on the original principal, so it grows by the same amount every period. Compound interest is calculated on the principal plus all interest already earned, so it grows by more each period, accelerating over time.",
  },
  {
    q: "Does compounding frequency make a big difference?",
    a: "It makes some difference, more as the rate and time increase, but far less than the rate or time themselves. Monthly compounding beats annual compounding at the same quoted rate, but a higher rate or a longer period moves the result much more.",
  },
  {
    q: "Which investments actually pay compound interest?",
    a: "Bank fixed deposits, recurring deposits and many bonds compound at a stated frequency. Mutual funds don't pay a fixed rate at all; for those, see the SIP calculator, which models market-linked, assumed returns instead.",
  },
  {
    q: "Why does my bank's figure differ slightly from this calculator?",
    a: "Banks sometimes use day-count conventions (actual days in a quarter, for instance) rather than a clean fraction of a year, and may round at each compounding date. Those add small differences versus the textbook formula used here.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="compound-interest-calculator"
      lede="Enter a principal amount, annual rate, time and compounding frequency to see the maturity value, total interest, and how the balance grows year by year."
      widget={<CompoundInterestCalculator />}
      faq={faq}
      related={["sip-calculator", "percentage-calculator", "emi-calculator"]}
    >
      <h2>The formula</h2>
      <p>
        <strong>A = P(1 + r/n)^(nt)</strong>
      </p>
      <ul>
        <li>P is the principal amount invested.</li>
        <li>r is the annual interest rate, as a decimal (8% is 0.08).</li>
        <li>n is how many times a year interest compounds (1 annually, 4 quarterly, 12 monthly).</li>
        <li>t is the time in years.</li>
      </ul>

      <h2>Worked example</h2>
      <p>
        ₹1,00,000 at 8% a year for 10 years, compounding annually, grows to about ₹2,15,892 — ₹1,15,892 in
        interest. Compounding the same rate monthly instead grows it slightly further, to about ₹2,21,964.
      </p>
    </ToolPage>
  );
}
