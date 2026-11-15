import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import EmiCalculator from "@/components/EmiCalculator";
import ToolPage from "@/components/ToolPage";
import { amortizationSchedule, emi, yearlySchedule } from "@/lib/loan";
import { money, percent } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("home-loan-emi-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const inr = (n: number) => money(n, 0, "INR");
/** The example loan: Rs 35,00,000 at 8.5% for 20 years. */
const P = 3_500_000;
const RATE = 8.5;
const YEARS = 20;
const EXAMPLE = emi(P, RATE, YEARS * 12);
const SCHEDULE = yearlySchedule(amortizationSchedule(P, RATE, YEARS * 12));
const FIRST = SCHEDULE[0];
const LAST = SCHEDULE[SCHEDULE.length - 1];
const TENURES = [10, 15, 20, 25, 30];
/** An example property price for the down payment table. */
const PRICE = 5_000_000;
const DOWN = [10, 20, 30, 40];
/** Share of the loan's first-year payments that is interest. */
const firstYearInterestShare = FIRST ? FIRST.interest / (FIRST.interest + FIRST.principal) : 0;

/** If the rate rises by `up` points: the EMI with the same tenure, and the months needed if the EMI is kept. */
function rateRise(up: number) {
  const r = (RATE + up) / 1200;
  const newEmi = emi(P, RATE + up, YEARS * 12).emi;
  const keep = EXAMPLE.emi;
  // months n such that the old EMI repays P at the new rate: n = -ln(1 - P r / E) / ln(1 + r)
  const months = -Math.log(1 - (P * r) / keep) / Math.log(1 + r);
  return { newEmi, months: Math.ceil(months) };
}
const RISE = rateRise(1);

const faq = [
  {
    q: "How is a home loan EMI calculated?",
    a: `The same reducing-balance formula as any loan: EMI = [P x R x (1 + R)^N] / [(1 + R)^N - 1], where P is the loan amount, R is the monthly interest rate and N is the number of months. For ${inr(P)} at ${RATE}% for ${YEARS} years, the EMI is ${inr(EXAMPLE.emi)}.`,
  },
  {
    q: "What is the EMI for a 50 lakh home loan?",
    a: `At ${RATE}% for ${YEARS} years, ${inr(5_000_000)} gives an EMI of ${inr(emi(5_000_000, RATE, YEARS * 12).emi)}. At the same rate for 30 years it is ${inr(emi(5_000_000, RATE, 360).emi)}. The rate is an example; use your lender's rate.`,
  },
  {
    q: "How much of my EMI goes to interest in the early years?",
    a: `A large share. On the ${inr(P)} example, ${percent(firstYearInterestShare * 100, 0)} of the first year's payments is interest. The share falls as the balance falls, and by year ${YEARS} the loan is mostly principal.`,
  },
  {
    q: "Does the down payment affect the EMI?",
    a: `Yes. A larger down payment lowers the principal you borrow, which lowers the EMI and the total interest, for the same rate and tenure. Enter the loan amount after your down payment, not the property price. On a ${inr(PRICE)} property, a 20% down payment leaves a ${inr(PRICE * 0.8)} loan.`,
  },
  {
    q: "Should I choose a longer tenure for a lower EMI?",
    a: `A longer tenure lowers the EMI but raises total interest. On ${inr(P)} at ${RATE}%, 15 years costs ${inr(emi(P, RATE, 180).totalInterest)} in interest and 25 years costs ${inr(emi(P, RATE, 300).totalInterest)}.`,
  },
  {
    q: "What happens if the interest rate rises by 1 percentage point?",
    a: `On the example loan, the EMI for the same ${YEARS} years goes from ${inr(EXAMPLE.emi)} to ${inr(RISE.newEmi)}. If you keep paying ${inr(EXAMPLE.emi)} instead, the loan takes about ${RISE.months} months (${(RISE.months / 12).toFixed(1)} years) to clear.`,
  },
  {
    q: "Is home loan interest tax-deductible in India?",
    a: "It depends on your tax regime and the property. The Income Tax Department lists a deduction for interest on a housing loan under Section 24(b): for a self-occupied property under the old regime, up to ₹2,00,000 a year. Under the new regime its list shows the Section 24(b) deduction for let-out property only. Check the department's page and your own situation before relying on it.",
  },
  {
    q: "Does the EMI include insurance and processing fees?",
    a: "No. The calculator shows interest and principal only. Processing fees, property or life insurance a lender bundles in, and other charges are separate.",
  },
  {
    q: "Can I see the month-by-month schedule?",
    a: "Yes. Open the full amortization schedule under the year-by-year table in the calculator.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="home-loan-emi-calculator"
      lede="Enter your home loan amount, interest rate and tenure to see the monthly EMI, total interest over the loan, and how the principal-to-interest split shifts year by year."
      widget={
        <EmiCalculator
          amountLabel="Home loan amount"
          defaultAmount="3500000"
          defaultRate="8.5"
          defaultYears="20"
          maxYears={30}
        />
      }
      faq={faq}
      related={[
        "emi-calculator",
        "loan-eligibility-calculator",
        "income-tax-calculator-india",
        "car-loan-emi-calculator",
      ]}
    >
      <h2>How a home loan EMI is worked out</h2>
      <p>
        A home loan EMI uses the standard reducing-balance formula:{" "}
        <strong>EMI = [P x R x (1 + R)^N] / [(1 + R)^N - 1]</strong>. P is the loan amount, R is the monthly
        rate (annual rate / 12 / 100) and N is the number of months. Home loans are usually the longest loan
        people take, so N is large (a 20-year loan is 240 months) and the total interest is large too.
      </p>
      <p>
        Worked example: {inr(P)} at {RATE}% for {YEARS} years ({YEARS * 12} months). The EMI is{" "}
        {inr(EXAMPLE.emi)} a month. Over the full term you pay {inr(EXAMPLE.totalPayment)}, of which{" "}
        {inr(EXAMPLE.totalInterest)} is interest, about {(EXAMPLE.totalInterest / P).toFixed(2)} times the
        amount borrowed.
      </p>

      <h2>Why the early years are mostly interest</h2>
      <p>
        Interest is charged on the balance you still owe. At the start the balance is the whole loan, so most
        of each EMI is interest. On the example loan, year 1 pays {FIRST ? inr(FIRST.interest) : "-"} of
        interest and only {FIRST ? inr(FIRST.principal) : "-"} of principal, so the balance falls from{" "}
        {inr(P)} to {FIRST ? inr(FIRST.balance) : "-"}. In year {YEARS} the split reverses:{" "}
        {LAST ? inr(LAST.principal) : "-"} of principal and {LAST ? inr(LAST.interest) : "-"} of interest.
      </p>

      <h2>How the tenure changes the cost</h2>
      <p>
        The same {inr(P)} at {RATE}% over different terms.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Tenure</th>
            <th scope="col">Monthly EMI</th>
            <th scope="col">Total interest</th>
            <th scope="col">Interest as a share of the loan</th>
          </tr>
        </thead>
        <tbody>
          {TENURES.map((y) => {
            const e = emi(P, RATE, y * 12);
            return (
              <tr key={y}>
                <th scope="row">{y} years</th>
                <td>{inr(e.emi)}</td>
                <td>{inr(e.totalInterest)}</td>
                <td>{percent((e.totalInterest / P) * 100, 0)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>How the down payment changes the loan</h2>
      <p>
        Enter the amount you borrow, not the property price. For an example property priced at {inr(PRICE)},
        at {RATE}% over {YEARS} years:
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Down payment</th>
            <th scope="col">Down payment amount</th>
            <th scope="col">Loan amount</th>
            <th scope="col">Monthly EMI</th>
            <th scope="col">Total interest</th>
          </tr>
        </thead>
        <tbody>
          {DOWN.map((d) => {
            const loan = PRICE * (1 - d / 100);
            const e = emi(loan, RATE, YEARS * 12);
            return (
              <tr key={d}>
                <th scope="row">{d}%</th>
                <td>{inr(PRICE * (d / 100))}</td>
                <td>{inr(loan)}</td>
                <td>{inr(e.emi)}</td>
                <td>{inr(e.totalInterest)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>If the rate changes during the loan</h2>
      <p>
        On a floating-rate loan the rate can move. On the example loan, a rise of one percentage point (to{" "}
        {RATE + 1}%) takes the EMI from {inr(EXAMPLE.emi)} to {inr(RISE.newEmi)} if the {YEARS}-year tenure
        stays. If you keep paying {inr(EXAMPLE.emi)}, the loan runs for about {RISE.months} months instead of{" "}
        {YEARS * 12}. Enter the new rate and the months left in the calculator to see your own case.
      </p>

      <h2>Tax on home loan interest</h2>
      <p>
        The Income Tax Department&apos;s guidance for salaried individuals (assessment year 2026-27) lists the
        Section 24(b) deduction for interest paid on a housing loan. For a self-occupied property under the
        old tax regime, the limit is ₹2,00,000 a year for a loan taken on or after 1 April 1999 for
        construction or purchase. Its list for the new tax regime shows the deduction for let-out property
        only. Which regime is better depends on your whole tax position; the{" "}
        <Link href="/income-tax-calculator-india">income tax calculator</Link> compares the two. Confirm
        current rules with the department or a tax adviser.
      </p>

      <h2>What this leaves out</h2>
      <p>
        This estimate does not include processing fees, property or life insurance a lender bundles in, or a
        floating rate that changes during the loan. It does not model prepayments. For whether your income
        supports a given loan size, see the{" "}
        <Link href="/loan-eligibility-calculator">loan eligibility calculator</Link>. For a general loan, use
        the <Link href="/emi-calculator">EMI calculator</Link>.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a
            href="https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1"
            rel="noopener noreferrer"
          >
            Income Tax Department: ITR guidance for salaried individuals, AY 2026-27
          </a>{" "}
          (Section 24(b) and the two regimes), checked 16 November 2026.
        </li>
      </ul>
    </ToolPage>
  );
}
