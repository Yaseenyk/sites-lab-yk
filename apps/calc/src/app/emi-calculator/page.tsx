import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import EmiCalculator from "@/components/EmiCalculator";
import ToolPage from "@/components/ToolPage";
import { emi } from "@/lib/loan";
import { money, percent } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("emi-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const inr = (n: number) => money(n, 0, "INR");
/** The example loan used in the prose and tables: Rs 10,00,000 at 9% for 5 years. */
const P = 1_000_000;
const RATE = 9;
const YEARS = 5;
const EXAMPLE = emi(P, RATE, YEARS * 12);
const TENURES = [1, 2, 3, 5, 7, 10, 15];
const RATES = [7, 8, 9, 10, 11, 12];

/** Flat-rate quote: interest is charged on the full amount for the whole term. */
function flatQuote(principal: number, flatPercent: number, months: number) {
  const interest = (principal * flatPercent * months) / 1200;
  const payment = (principal + interest) / months;
  // Find the reducing-balance rate that gives the same monthly payment.
  let lo = 0;
  let hi = 100;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (emi(principal, mid, months).emi < payment) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return { interest, payment, equivalent: (lo + hi) / 2 };
}
const FLAT = flatQuote(P, RATE, YEARS * 12);

/** A lump-sum prepayment after `afterMonth` EMIs, keeping the EMI the same. */
function withPrepayment(principal: number, rate: number, months: number, afterMonth: number, lump: number) {
  const r = rate / 1200;
  const payment = emi(principal, rate, months).emi;
  let balance = principal;
  let interest = 0;
  let m = 0;
  while (balance > 0.5 && m < 1_000) {
    m += 1;
    const i = balance * r;
    interest += i;
    balance = balance + i - Math.min(payment, balance + i);
    if (m === afterMonth) {
      balance = Math.max(0, balance - lump);
    }
  }
  return { months: m, interest };
}
const PREPAY = withPrepayment(P, RATE, YEARS * 12, 12, 100_000);

const faq = [
  {
    q: "What is the EMI formula?",
    a: "EMI = [P x R x (1 + R)^N] / [(1 + R)^N - 1], where P is the loan amount, R is the monthly interest rate (annual rate divided by 12 and by 100), and N is the number of monthly instalments. It is the standard reducing-balance formula.",
  },
  {
    q: "How do I calculate EMI for 10 lakh at 9% for 5 years?",
    a: `P is 10,00,000, R is 9 / 12 / 100 = 0.0075 and N is 60. The EMI works out to ${inr(EXAMPLE.emi)} a month. Total payment is ${inr(EXAMPLE.totalPayment)}, of which ${inr(EXAMPLE.totalInterest)} is interest.`,
  },
  {
    q: "Does the EMI stay the same every month?",
    a: "Yes, for a fixed-rate reducing-balance loan the EMI is constant. What changes each month is the split inside it: early instalments are mostly interest and later ones are mostly principal, because interest is charged on the shrinking balance.",
  },
  {
    q: "What is the difference between flat-rate and reducing-balance interest?",
    a: `Reducing-balance interest, used by this calculator, charges interest only on the outstanding balance. Flat-rate interest charges on the original amount for the full term. A flat 9% on ${inr(P)} for 5 years means ${inr(FLAT.interest)} of interest and an EMI of ${inr(FLAT.payment)}, which is the same as a reducing-balance rate of about ${percent(FLAT.equivalent, 1)}.`,
  },
  {
    q: "How does a longer tenure change the EMI?",
    a: `It lowers the EMI and raises the total interest. On ${inr(P)} at ${RATE}%, 3 years gives an EMI of ${inr(emi(P, RATE, 36).emi)} and ${inr(emi(P, RATE, 36).totalInterest)} of interest; 10 years gives ${inr(emi(P, RATE, 120).emi)} and ${inr(emi(P, RATE, 120).totalInterest)}.`,
  },
  {
    q: "How can I reduce my total interest?",
    a: "A shorter tenure, a larger down payment (lower principal), a lower interest rate, or a part-prepayment during the loan each cut total interest, since each lowers either the balance interest is charged on or how long it is charged for.",
  },
  {
    q: "How much does a part-prepayment save?",
    a: `On ${inr(P)} at ${RATE}% for 5 years, paying an extra ${inr(100_000)} after the 12th EMI and keeping the EMI the same clears the loan in ${PREPAY.months} months instead of 60 and cuts total interest from ${inr(EXAMPLE.totalInterest)} to ${inr(PREPAY.interest)}. Check your loan agreement for any prepayment charge first.`,
  },
  {
    q: "What happens to my EMI if the rate changes?",
    a: "On a floating-rate loan a rate change can change the EMI or the tenure. Your loan agreement and your lender's notice say which. Enter the new rate and the remaining months in the calculator to see the new EMI.",
  },
  {
    q: "Does the EMI include processing fees or insurance?",
    a: "No. The calculator shows interest and principal only. Processing fees, insurance and other charges are separate, and your sanction letter lists them.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="emi-calculator"
      lede="Enter the loan amount, interest rate and term to see your monthly EMI, total interest, and a year-by-year breakdown of how much of each payment goes to principal versus interest."
      widget={
        <EmiCalculator
          amountLabel="Loan amount"
          defaultAmount="1000000"
          defaultRate="9"
          defaultYears="5"
          maxYears={30}
        />
      }
      faq={faq}
      related={[
        "home-loan-emi-calculator",
        "car-loan-emi-calculator",
        "loan-eligibility-calculator",
        "compound-interest-calculator",
        "sip-calculator",
      ]}
    >
      <h2>What EMI means and how it is calculated</h2>
      <p>
        EMI stands for Equated Monthly Instalment: a fixed payment made every month until the loan is repaid.
        For a reducing-balance loan, the formula is:
      </p>
      <p>
        <strong>EMI = [P x R x (1 + R)^N] / [(1 + R)^N - 1]</strong>
      </p>
      <ul>
        <li>P is the principal, the amount borrowed.</li>
        <li>R is the monthly interest rate: the annual rate divided by 12, then by 100.</li>
        <li>N is the number of monthly instalments (years x 12).</li>
      </ul>
      <p>
        Each EMI pays the interest on the balance still owed that month, and the rest reduces the principal.
        Because the balance shrinks, the interest part shrinks and the principal part grows, even though the
        EMI stays the same. The calculator above shows this split for every year, and the full monthly table
        if you open it.
      </p>

      <h2>How to calculate EMI step by step</h2>
      <ol>
        <li>
          <strong>Convert the rate.</strong> {RATE}% a year is {RATE} / 12 / 100 = {RATE / 1200} a month.
        </li>
        <li>
          <strong>Count the instalments.</strong> {YEARS} years x 12 = {YEARS * 12} months.
        </li>
        <li>
          <strong>Apply the formula.</strong> For {inr(P)}, the EMI is {inr(EXAMPLE.emi)}.
        </li>
        <li>
          <strong>Find the totals.</strong> {inr(EXAMPLE.emi)} x {YEARS * 12} = {inr(EXAMPLE.totalPayment)}{" "}
          paid, so {inr(EXAMPLE.totalInterest)} is interest.
        </li>
      </ol>

      <h2>How the tenure changes your EMI</h2>
      <p>
        The same {inr(P)} loan at {RATE}% over different terms. A longer term lowers the EMI but raises the
        interest.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Tenure</th>
            <th scope="col">Monthly EMI</th>
            <th scope="col">Total interest</th>
            <th scope="col">Total payment</th>
          </tr>
        </thead>
        <tbody>
          {TENURES.map((y) => {
            const e = emi(P, RATE, y * 12);
            return (
              <tr key={y}>
                <th scope="row">
                  {y} {y === 1 ? "year" : "years"}
                </th>
                <td>{inr(e.emi)}</td>
                <td>{inr(e.totalInterest)}</td>
                <td>{inr(e.totalPayment)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>How the interest rate changes your EMI</h2>
      <p>
        The same {inr(P)} loan over {YEARS} years at different rates.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Interest rate</th>
            <th scope="col">Monthly EMI</th>
            <th scope="col">Total interest</th>
            <th scope="col">EMI change vs {RATE}%</th>
          </tr>
        </thead>
        <tbody>
          {RATES.map((r) => {
            const e = emi(P, r, YEARS * 12);
            const diff = e.emi - EXAMPLE.emi;
            return (
              <tr key={r}>
                <th scope="row">{r}%</th>
                <td>{inr(e.emi)}</td>
                <td>{inr(e.totalInterest)}</td>
                <td>{diff === 0 ? "baseline" : `${diff > 0 ? "+" : "-"}${inr(Math.abs(diff))}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>Flat rate and reducing balance are not the same</h2>
      <p>
        Some quotes, often for small or consumer loans, state a flat rate. Flat interest is charged on the
        full amount for the whole term, even though you repay part of it every month. A flat {RATE}% on{" "}
        {inr(P)} for {YEARS} years is {inr(P)} x {RATE}% x {YEARS} = {inr(FLAT.interest)} of interest, and an
        EMI of ({inr(P)} + {inr(FLAT.interest)}) / {YEARS * 12} = {inr(FLAT.payment)}. The reducing-balance
        rate that gives that same EMI is about {percent(FLAT.equivalent, 1)}. When you compare offers, ask
        which method the quoted rate uses.
      </p>

      <h2>What a part-prepayment does</h2>
      <p>
        A lump sum paid towards the principal lowers the balance that interest is charged on. On the example
        loan, an extra {inr(100_000)} after the 12th EMI, with the EMI kept the same, clears the loan in{" "}
        {PREPAY.months} months instead of {YEARS * 12}. Total interest falls from {inr(EXAMPLE.totalInterest)}{" "}
        to {inr(PREPAY.interest)}, a saving of {inr(EXAMPLE.totalInterest - PREPAY.interest)}. Your loan
        agreement says whether a prepayment charge applies and how a prepayment is applied (shorter tenure or
        lower EMI).
      </p>

      <h2>What this leaves out</h2>
      <p>
        This is the standard EMI maths only. It does not include processing fees, insurance premiums some
        lenders bundle into the loan, GST on charges, or a floating-rate loan&apos;s rate changing mid-term.
        Your lender&apos;s sanction letter has the exact figures. For the loan size your income could support,
        see the <Link href="/loan-eligibility-calculator">loan eligibility calculator</Link>. For a specific
        loan type, use the <Link href="/home-loan-emi-calculator">home loan EMI</Link> or{" "}
        <Link href="/car-loan-emi-calculator">car loan EMI</Link> calculator.
      </p>
    </ToolPage>
  );
}
