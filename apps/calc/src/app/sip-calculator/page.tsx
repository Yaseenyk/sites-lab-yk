import { pageMetadata } from "@sites/shell";
import SipCalculator from "@/components/SipCalculator";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("sip-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "What is a SIP?",
    a: "A Systematic Investment Plan is a fixed amount invested into a mutual fund at a set interval, usually monthly, rather than investing a lump sum at once. SIPs average your purchase price across market ups and downs over time.",
  },
  {
    q: "How is SIP future value calculated?",
    a: "FV = P x [((1 + i)^n - 1) / i] x (1 + i), where P is the monthly amount, i is the expected monthly return (annual return divided by 12 and by 100), and n is the number of months. The extra (1 + i) factor accounts for each instalment being invested at the start of its month, the usual SIP timing.",
  },
  {
    q: "Is the return rate guaranteed?",
    a: "No. The rate you enter is an assumption for projection purposes only. Mutual fund SIPs are market-linked, and the actual return can be higher or lower than any rate you assume here, including negative in a bad year.",
  },
  {
    q: "Is SIP better than a lump sum investment?",
    a: "Neither is universally better. A lump sum invested at the start can outperform a SIP in a rising market, since more money is invested earlier, but a SIP reduces the risk of investing everything right before a downturn. Many investors use both.",
  },
  {
    q: "What return rate should I assume?",
    a: "This is your own assumption to make, not something the calculator supplies. Equity mutual funds have historically returned in a wide range depending on the period measured; a conservative planning assumption is usually safer than an optimistic one.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="sip-calculator"
      lede="Enter a monthly SIP amount, an expected annual return, and a duration to project the future value of your investment, year by year."
      widget={<SipCalculator />}
      faq={faq}
      related={["compound-interest-calculator", "emi-calculator", "percentage-calculator"]}
    >
      <h2>How the projection is calculated</h2>
      <p>
        <strong>Future value = P x [((1 + i)^n - 1) / i] x (1 + i)</strong>
      </p>
      <ul>
        <li>P is the amount invested each month.</li>
        <li>i is the assumed monthly return: the annual return divided by 12, then by 100.</li>
        <li>n is the number of months invested.</li>
      </ul>
      <p>
        This is the standard formula for a series of equal monthly investments compounding at the assumed
        rate, with each instalment treated as invested at the start of its month (the usual SIP convention).
      </p>

      <h2>Worked example</h2>
      <p>
        ₹5,000 a month for 10 years at an assumed 12% annual return: total invested is ₹6,00,000, projecting
        to about ₹11,61,695 — roughly ₹5,61,695 in projected returns, assuming the 12% holds for the full
        period.
      </p>

      <h2>What this leaves out</h2>
      <p>
        This is a projection based on one assumed, constant return rate. It does not account for expense
        ratios, exit load, taxes on capital gains, or the real-world variability of market returns from year
        to year, which rarely stays flat even when the long-run average matches your assumption.
      </p>
    </ToolPage>
  );
}
