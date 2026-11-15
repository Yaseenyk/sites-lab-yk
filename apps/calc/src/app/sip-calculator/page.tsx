import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import SipCalculator from "@/components/SipCalculator";
import ToolPage from "@/components/ToolPage";
import { compoundInterest } from "@/lib/compoundInterest";
import { money } from "@/lib/pay";
import { sipFutureValue } from "@/lib/sip";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("sip-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const inr = (n: number) => money(n, 0, "INR");
/** The example used in the prose: Rs 5,000 a month for 10 years at an assumed 12% a year. */
const AMOUNT = 5_000;
const RETURN = 12;
const YEARS = 10;
const EXAMPLE = sipFutureValue(AMOUNT, RETURN, YEARS);
/** Assumed return rates shown side by side. They are examples to compare, not forecasts. */
const RETURNS = [6, 8, 10, 12];
const DURATIONS = [5, 10, 15, 20, 25, 30];
const AMOUNTS = [1_000, 2_500, 5_000, 10_000, 25_000];
/** Waiting: the same SIP started with different time left. */
const START_YEARS = [30, 25, 20, 15, 10];
/** The same total invested as one lump sum on day one. */
const LUMP = compoundInterest(AMOUNT * YEARS * 12, RETURN, YEARS, 12);

const faq = [
  {
    q: "What is a SIP?",
    a: "A Systematic Investment Plan is a fixed amount invested into a mutual fund at a set interval, usually monthly, instead of one lump sum. You buy in at many different prices over time rather than at one price.",
  },
  {
    q: "How is SIP future value calculated?",
    a: "FV = P x [((1 + i)^n - 1) / i] x (1 + i), where P is the monthly amount, i is the assumed monthly return (annual return divided by 12 and by 100), and n is the number of months. The extra (1 + i) factor treats each instalment as invested at the start of its month.",
  },
  {
    q: "How much will a SIP of 5,000 a month be worth in 10 years?",
    a: `It depends on the return you assume, which nobody can promise. At an assumed ${RETURN}% a year, ₹5,000 a month for ${YEARS} years invests ${inr(EXAMPLE.investedAmount)} and projects to ${inr(EXAMPLE.futureValue)}. At an assumed 8% it projects to ${inr(sipFutureValue(AMOUNT, 8, YEARS).futureValue)}, and at 6% to ${inr(sipFutureValue(AMOUNT, 6, YEARS).futureValue)}.`,
  },
  {
    q: "Is the return rate guaranteed?",
    a: "No. The rate you enter is an assumption for projection only. Mutual fund SIPs are market-linked, and the actual return can be higher or lower than any rate you assume here, including negative in a bad year.",
  },
  {
    q: "What return rate should I assume?",
    a: "That is your own assumption to make, and the calculator does not suggest one. Try a low, a middle and a high figure, as the table on this page does, and plan around the low one.",
  },
  {
    q: "Does starting early matter?",
    a: `Yes, because time does more of the work than the amount. At an assumed ${RETURN}%, ₹5,000 a month for 30 years projects to ${inr(sipFutureValue(AMOUNT, RETURN, 30).futureValue)}, while 20 years projects to ${inr(sipFutureValue(AMOUNT, RETURN, 20).futureValue)}. The table on this page shows the cost of waiting.`,
  },
  {
    q: "Is SIP better than a lump sum investment?",
    a: `Neither is better in every case. With the same return assumed, a lump sum invested on day one grows more than a SIP of the same total, because more money is invested earlier: ${inr(LUMP.maturityValue)} against ${inr(EXAMPLE.futureValue)} for ${inr(EXAMPLE.investedAmount)} over ${YEARS} years at ${RETURN}%. A SIP fits money that arrives monthly, and it avoids choosing one day to invest everything.`,
  },
  {
    q: "What is the difference between a SIP and a recurring deposit?",
    a: "A recurring deposit pays a rate fixed by the bank. A mutual fund SIP buys fund units, whose value moves with the market, so there is no fixed rate. For a fixed-rate deposit, use the compound interest calculator.",
  },
  {
    q: "Does this include taxes, fees and fund charges?",
    a: "No. It shows the gross projection at the rate you enter. Fund expenses, exit loads and taxes on gains reduce what you keep, so read the fund's documents and a current tax guide.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="sip-calculator"
      lede="Enter a monthly SIP amount, an expected annual return, and a duration to project the future value of your investment, year by year."
      widget={<SipCalculator />}
      faq={faq}
      related={[
        "compound-interest-calculator",
        "emi-calculator",
        "percentage-calculator",
        "income-tax-calculator-india",
      ]}
    >
      <h2>How a SIP projection is calculated</h2>
      <p>
        <strong>Future value = P x [((1 + i)^n - 1) / i] x (1 + i)</strong>
      </p>
      <ul>
        <li>P is the amount invested each month.</li>
        <li>i is the assumed monthly return: the annual return divided by 12, then by 100.</li>
        <li>n is the number of months invested.</li>
      </ul>
      <p>
        It adds up a series of equal monthly investments, each growing at the assumed rate from the start of
        its month until the end. The first instalment grows for all n months and the last for one.
      </p>

      <h2>How to use the SIP calculator</h2>
      <ol>
        <li>
          <strong>Enter the monthly amount</strong> you could invest every month.
        </li>
        <li>
          <strong>Enter a return you assume.</strong> It is your assumption; no one can promise a return on a
          market-linked fund.
        </li>
        <li>
          <strong>Enter the years.</strong> The table shows the amount invested and the projected value at the
          end of each year.
        </li>
      </ol>
      <p>
        Worked example: {inr(AMOUNT)} a month for {YEARS} years at an assumed {RETURN}% a year. You invest{" "}
        {inr(EXAMPLE.investedAmount)} ({inr(AMOUNT)} x {YEARS * 12} months). The projected value is{" "}
        {inr(EXAMPLE.futureValue)}, so {inr(EXAMPLE.estimatedReturns)} of it is projected growth, if the{" "}
        {RETURN}% held for the whole period.
      </p>

      <h2>Projected value for different returns and durations</h2>
      <p>
        {inr(AMOUNT)} a month. The returns across the top are assumptions to compare, not predictions of what
        any fund will do.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Years</th>
            <th scope="col">Invested</th>
            {RETURNS.map((r) => (
              <th key={r} scope="col">
                At {r}% a year
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DURATIONS.map((y) => (
            <tr key={y}>
              <th scope="row">{y} years</th>
              <td>{inr(AMOUNT * y * 12)}</td>
              {RETURNS.map((r) => (
                <td key={r}>{inr(sipFutureValue(AMOUNT, r, y).futureValue)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Different monthly amounts</h2>
      <p>
        At an assumed {RETURN}% a year. A SIP scales with the amount: ten times the monthly amount gives ten
        times the projected value.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Monthly amount</th>
            <th scope="col">Invested over 10 years</th>
            <th scope="col">Projected after 10 years</th>
            <th scope="col">Projected after 20 years</th>
          </tr>
        </thead>
        <tbody>
          {AMOUNTS.map((a) => (
            <tr key={a}>
              <th scope="row">{inr(a)}</th>
              <td>{inr(a * 120)}</td>
              <td>{inr(sipFutureValue(a, RETURN, 10).futureValue)}</td>
              <td>{inr(sipFutureValue(a, RETURN, 20).futureValue)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>The cost of waiting</h2>
      <p>
        The same {inr(AMOUNT)} a month at an assumed {RETURN}%, started with different amounts of time left to
        run. Compare the projected value, not just the amount invested: the years add far more than the
        instalments do.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Years invested</th>
            <th scope="col">Invested</th>
            <th scope="col">Projected value</th>
            <th scope="col">Projected growth</th>
          </tr>
        </thead>
        <tbody>
          {START_YEARS.map((y) => {
            const r = sipFutureValue(AMOUNT, RETURN, y);
            return (
              <tr key={y}>
                <th scope="row">{y} years</th>
                <td>{inr(r.investedAmount)}</td>
                <td>{inr(r.futureValue)}</td>
                <td>{inr(r.estimatedReturns)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>SIP compared with a lump sum</h2>
      <p>
        Suppose you invest the same total, {inr(EXAMPLE.investedAmount)}, either as {inr(AMOUNT)} a month for{" "}
        {YEARS} years or as one lump sum on day one, at an assumed {RETURN}% a year in both cases. The SIP
        projects to {inr(EXAMPLE.futureValue)}. The lump sum, compounded monthly, projects to{" "}
        {inr(LUMP.maturityValue)}. The lump sum is larger only because all of the money starts working on day
        one; most people do not have it on day one. A SIP fits the way income arrives. The{" "}
        <Link href="/compound-interest-calculator">compound interest calculator</Link> handles the lump sum.
      </p>

      <h2>What this leaves out</h2>
      <p>
        This is a projection from one assumed, constant return rate. Real market returns vary from year to
        year and can be negative, so the actual result will differ. It does not include fund expenses, exit
        loads, taxes on gains, or any rise in your monthly amount over time. Read the fund&apos;s documents
        before you invest.
      </p>
    </ToolPage>
  );
}
