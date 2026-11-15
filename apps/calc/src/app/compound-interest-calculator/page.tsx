import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import ToolPage from "@/components/ToolPage";
import { compoundInterest, effectiveAnnualRate } from "@/lib/compoundInterest";
import { money, percent } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("compound-interest-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const inr = (n: number) => money(n, 0, "INR");
/** The example used in the prose: Rs 1,00,000 at 8% for 10 years. */
const P = 100_000;
const RATE = 8;
const YEARS = 10;
const FREQUENCIES = [
  { label: "Annually", n: 1 },
  { label: "Semi-annually", n: 2 },
  { label: "Quarterly", n: 4 },
  { label: "Monthly", n: 12 },
  { label: "Daily (365)", n: 365 },
];
const RATES = [4, 6, 8, 10, 12];
const DURATIONS = [5, 10, 20, 30];
const SIMPLE = P * (1 + (RATE / 100) * YEARS);
/** Years for money to double at `rate`, compounded annually: ln 2 / ln(1 + r). */
const doublingYears = (rate: number) => Math.log(2) / Math.log(1 + rate / 100);

const annual = compoundInterest(P, RATE, YEARS, 1);
const monthly = compoundInterest(P, RATE, YEARS, 12);

const faq = [
  {
    q: "What is the compound interest formula?",
    a: "A = P(1 + r/n)^(nt), where P is the principal, r is the annual rate as a decimal, n is the number of compounding periods per year, and t is the time in years. The total interest earned is A minus P.",
  },
  {
    q: "How do I calculate compound interest on 1 lakh for 10 years?",
    a: `At an example rate of ${RATE}% compounded annually, ${inr(P)} grows to ${inr(annual.maturityValue)} in ${YEARS} years, which is ${inr(annual.totalInterest)} of interest. Compounded monthly it grows to ${inr(monthly.maturityValue)}.`,
  },
  {
    q: "What is the difference between compound and simple interest?",
    a: `Simple interest is worked out on the original principal only, so it adds the same amount each year. Compound interest is worked out on the principal plus the interest already earned. On ${inr(P)} at ${RATE}% for ${YEARS} years, simple interest gives ${inr(SIMPLE)} and annual compounding gives ${inr(annual.maturityValue)}.`,
  },
  {
    q: "Does compounding frequency make a big difference?",
    a: `It makes some difference, but less than the rate or the time. At ${RATE}% for ${YEARS} years on ${inr(P)}, annual compounding gives ${inr(annual.maturityValue)} and monthly gives ${inr(monthly.maturityValue)}, a gap of ${inr(monthly.maturityValue - annual.maturityValue)}. Raising the rate by two points to 10% changes the annual result by far more.`,
  },
  {
    q: "What is the effective annual rate?",
    a: `The yearly rate that gives the same result as the stated rate compounded more often. ${RATE}% compounded monthly has an effective annual rate of ${percent(effectiveAnnualRate(RATE, 12), 3)}. The calculator shows it as a tile.`,
  },
  {
    q: "How long does it take to double my money?",
    a: `At ${RATE}% compounded annually, a little over ${doublingYears(RATE).toFixed(1)} years. The rule of 72 estimates it as 72 divided by the rate: 72 / ${RATE} = ${72 / RATE} years.`,
  },
  {
    q: "How do I find the time needed to reach a target?",
    a: `Rearrange the formula: t = ln(A / P) / (n x ln(1 + r/n)). To grow ${inr(P)} to ${inr(2 * P)} at ${RATE}% compounded annually, t = ln(2) / ln(1.08) = ${doublingYears(RATE).toFixed(2)} years.`,
  },
  {
    q: "Which products pay compound interest?",
    a: "A deposit or bond that adds its interest to the balance and then earns interest on it compounds, at the frequency its terms state. A mutual fund does not pay a fixed rate; for market-linked, assumed returns on monthly investments, use the SIP calculator.",
  },
  {
    q: "Why does my bank's figure differ slightly from this calculator?",
    a: "A bank can use the actual number of days in a period or round at each compounding date, which gives small differences from the textbook formula used here. Your deposit receipt or account terms have the exact method.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="compound-interest-calculator"
      lede="Enter a principal amount, annual rate, time and compounding frequency to see the maturity value, total interest, and how the balance grows year by year."
      widget={<CompoundInterestCalculator />}
      faq={faq}
      related={["sip-calculator", "percentage-calculator", "emi-calculator", "gst-calculator"]}
    >
      <h2>The compound interest formula</h2>
      <p>
        <strong>A = P(1 + r/n)^(nt)</strong>
      </p>
      <ul>
        <li>P is the principal amount invested.</li>
        <li>r is the annual interest rate as a decimal (8% is 0.08).</li>
        <li>n is how many times a year interest compounds (1 annually, 4 quarterly, 12 monthly).</li>
        <li>t is the time in years.</li>
      </ul>
      <p>
        Compounding means interest is added to the balance and then earns interest itself. The interest earned
        is A minus P.
      </p>

      <h2>How to calculate compound interest</h2>
      <ol>
        <li>
          <strong>Divide the rate by the periods.</strong> {RATE}% compounded annually: 0.08 / 1 = 0.08.
          Monthly: 0.08 / 12 = {(0.08 / 12).toFixed(6)}.
        </li>
        <li>
          <strong>Count the periods.</strong> {YEARS} years x 1 = {YEARS} periods, or {YEARS} x 12 ={" "}
          {YEARS * 12} for monthly.
        </li>
        <li>
          <strong>Raise (1 + r/n) to the number of periods</strong> and multiply by the principal.
        </li>
      </ol>
      <p>
        Worked example: {inr(P)} at {RATE}% for {YEARS} years, compounded annually, grows to{" "}
        {inr(annual.maturityValue)}. That is {inr(annual.totalInterest)} of interest. Compounded monthly, the
        same {RATE}% grows it to {inr(monthly.maturityValue)}.
      </p>

      <h2>Compounding frequency compared</h2>
      <p>
        {inr(P)} at {RATE}% for {YEARS} years, changing only how often interest is added. The effective annual
        rate is the yearly rate that would give the same result.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Compounded</th>
            <th scope="col">Maturity value</th>
            <th scope="col">Interest</th>
            <th scope="col">Effective annual rate</th>
          </tr>
        </thead>
        <tbody>
          {FREQUENCIES.map((f) => {
            const c = compoundInterest(P, RATE, YEARS, f.n);
            return (
              <tr key={f.n}>
                <th scope="row">{f.label}</th>
                <td>{inr(c.maturityValue)}</td>
                <td>{inr(c.totalInterest)}</td>
                <td>{percent(effectiveAnnualRate(RATE, f.n), 3)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>Growth of {inr(P)} at different rates and times</h2>
      <p>Compounded annually. The rates are examples to compare, not rates any product pays.</p>
      <table>
        <thead>
          <tr>
            <th scope="col">Rate</th>
            {DURATIONS.map((y) => (
              <th key={y} scope="col">
                After {y} years
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RATES.map((r) => (
            <tr key={r}>
              <th scope="row">{r}%</th>
              {DURATIONS.map((y) => (
                <td key={y}>{inr(compoundInterest(P, r, y, 1).maturityValue)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Simple interest compared</h2>
      <p>
        Simple interest is P x r x t, with no interest on interest. On {inr(P)} at {RATE}% for {YEARS} years
        it is {inr(P)} x 0.08 x {YEARS} = {inr(P * 0.08 * YEARS)}, so the total is {inr(SIMPLE)}. Compound
        interest gives {inr(annual.maturityValue)}, which is {inr(annual.maturityValue - SIMPLE)} more. The
        gap widens every year, because the compounding balance keeps growing.
      </p>

      <h2>How long to double your money</h2>
      <p>
        The rule of 72 is a shortcut: years to double are about 72 divided by the rate. The exact figure for
        annual compounding is ln 2 / ln(1 + r).
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Rate</th>
            <th scope="col">Rule of 72</th>
            <th scope="col">Exact (annual compounding)</th>
          </tr>
        </thead>
        <tbody>
          {RATES.map((r) => (
            <tr key={r}>
              <th scope="row">{r}%</th>
              <td>{(72 / r).toFixed(1)} years</td>
              <td>{doublingYears(r).toFixed(1)} years</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>What this leaves out</h2>
      <p>
        It assumes one fixed rate and no deposits or withdrawals, and it does not include tax on the interest
        or any fees. Real products can use day counts or rounding rules that change the last few rupees. To
        model regular monthly investing, use the <Link href="/sip-calculator">SIP calculator</Link>, and for
        loan repayments the <Link href="/emi-calculator">EMI calculator</Link>.
      </p>
    </ToolPage>
  );
}
