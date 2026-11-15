import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import LoanEligibilityCalculator from "@/components/LoanEligibilityCalculator";
import ToolPage from "@/components/ToolPage";
import { emi, loanEligibility, maxLoanAmount } from "@/lib/loan";
import { money } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("loan-eligibility-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const inr = (n: number) => money(n, 0, "INR");
/** The example used in the prose: Rs 60,000 net monthly income, 50% limit, 9% for 5 years, no other EMIs. */
const INCOME = 60_000;
const FOIR = 50;
const RATE = 9;
const EXAMPLE = loanEligibility(INCOME, 0, FOIR, RATE, 60);
const INCOMES = [30_000, 50_000, 75_000, 100_000, 150_000];
const TERMS = [5, 10, 20];
const EXISTING = [0, 10_000, 20_000, 30_000];
const FOIRS = [30, 40, 50, 60];
const WITH_10K = loanEligibility(100_000, 10_000, FOIR, RATE, 240);

const faq = [
  {
    q: "What is FOIR, and why does it matter for loan eligibility?",
    a: `FOIR, Fixed Obligation to Income Ratio, is the share of your net monthly income that goes to all EMIs combined, including the new loan. Each lender sets its own limit. This calculator uses ${FOIR}% as a default and lets you change it. At ${FOIR}% on ${inr(INCOME)} a month, your total EMI budget is ${inr(EXAMPLE.affordableEmi)}.`,
  },
  {
    q: "How is loan eligibility calculated?",
    a: `Your EMI budget is net income x FOIR minus existing EMIs. That EMI is then run through the EMI formula in reverse, at your rate and term, to get the loan amount. ${inr(EXAMPLE.affordableEmi)} a month at ${RATE}% for 5 years supports about ${inr(EXAMPLE.maxLoan)}.`,
  },
  {
    q: "How does an existing EMI affect how much I can borrow?",
    a: `It is subtracted from your EMI budget before the new loan is sized. At a ${FOIR}% limit on ₹1,00,000 of income, the budget is ₹50,000; a ₹10,000 existing EMI leaves ₹40,000, and at ${RATE}% for 20 years that supports about ${inr(WITH_10K.maxLoan)} instead of ${inr(loanEligibility(100_000, 0, FOIR, RATE, 240).maxLoan)}.`,
  },
  {
    q: "Does a longer tenure increase how much I can borrow?",
    a: `Yes. The same EMI supports a larger principal over a longer term. ${inr(30_000)} a month at ${RATE}% supports about ${inr(maxLoanAmount(30_000, RATE, 60))} over 5 years and ${inr(maxLoanAmount(30_000, RATE, 240))} over 20 years. A longer term also means more total interest, so compare it on the EMI calculator.`,
  },
  {
    q: "Should I use gross or net income?",
    a: "Net monthly income: what reaches your account after tax and other deductions. Using gross income overstates what you can set aside for EMIs.",
  },
  {
    q: "Why might a bank approve less than this calculator shows?",
    a: "This estimate only looks at income, existing EMIs, rate and term. Lenders also look at your credit history, employment, age, the value of what you are buying and their own policy, any of which can change the amount offered.",
  },
  {
    q: "Can I include a co-applicant's income?",
    a: "Add the net incomes together and enter the total, and add the EMIs of both applicants to existing EMIs. How a lender treats a joint application is up to the lender.",
  },
  {
    q: "How can I improve my eligibility?",
    a: "Clear or reduce existing EMIs, add a co-applicant's income, choose a longer term, or look for a lower rate. Each one raises the EMI budget or the loan it supports. A longer term raises total interest.",
  },
  {
    q: "Is a loan I qualify for a loan I can afford?",
    a: "Not necessarily. A high FOIR leaves less of your income for everything else. Use the EMI calculator to check the EMI against your own monthly costs before you take the full amount.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="loan-eligibility-calculator"
      lede="Enter your monthly income, any existing EMIs, and a loan rate and tenure to see roughly how large a loan your income could support, using the FOIR approach lenders commonly apply."
      widget={<LoanEligibilityCalculator />}
      faq={faq}
      related={[
        "emi-calculator",
        "home-loan-emi-calculator",
        "car-loan-emi-calculator",
        "income-tax-calculator-india",
      ]}
    >
      <h2>How loan eligibility is estimated</h2>
      <p>
        Lenders commonly size a loan by capping all monthly EMIs, the new one plus existing ones, at a share
        of net income. That share is the Fixed Obligation to Income Ratio (FOIR). Each lender sets its own, so
        the figure is yours to change here. The estimate works in three steps:
      </p>
      <ol>
        <li>
          <strong>Take the FOIR share of your income.</strong> {FOIR}% of {inr(INCOME)} is{" "}
          {inr((INCOME * FOIR) / 100)}, your total EMI budget.
        </li>
        <li>
          <strong>Subtract your existing EMIs.</strong> With none, the whole {inr(EXAMPLE.affordableEmi)} is
          available for the new loan.
        </li>
        <li>
          <strong>Run that EMI through the formula in reverse.</strong> Loan = EMI x [(1 + R)^N - 1] / [R x (1
          + R)^N], with R the monthly rate and N the months. At {RATE}% for 5 years this gives{" "}
          {inr(EXAMPLE.maxLoan)}.
        </li>
      </ol>
      <p>
        Check: the EMI on {inr(EXAMPLE.maxLoan)} at {RATE}% for 5 years is{" "}
        {inr(emi(EXAMPLE.maxLoan, RATE, 60).emi)}. For any loan amount, the{" "}
        <Link href="/emi-calculator">EMI calculator</Link> shows the EMI directly.
      </p>

      <h2>Loan amount by income and tenure</h2>
      <p>
        With a {FOIR}% limit, no existing EMIs and an example rate of {RATE}%. The rate is an assumption for
        the table; use the rate you are offered in the calculator.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Net monthly income</th>
            <th scope="col">EMI budget</th>
            {TERMS.map((t) => (
              <th key={t} scope="col">
                Loan over {t} years
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {INCOMES.map((inc) => (
            <tr key={inc}>
              <th scope="row">{inr(inc)}</th>
              <td>{inr((inc * FOIR) / 100)}</td>
              {TERMS.map((t) => (
                <td key={t}>{inr(loanEligibility(inc, 0, FOIR, RATE, t * 12).maxLoan)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>What existing EMIs do to the amount</h2>
      <p>
        On ₹1,00,000 of net monthly income with a {FOIR}% limit, at {RATE}% for 20 years. Every rupee of
        existing EMI comes out of the budget.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Existing EMIs</th>
            <th scope="col">Budget for the new EMI</th>
            <th scope="col">Loan you could support</th>
          </tr>
        </thead>
        <tbody>
          {EXISTING.map((x) => {
            const e = loanEligibility(100_000, x, FOIR, RATE, 240);
            return (
              <tr key={x}>
                <th scope="row">{inr(x)}</th>
                <td>{inr(e.affordableEmi)}</td>
                <td>{inr(e.maxLoan)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>What a different EMI limit does</h2>
      <p>
        Because lenders set their own limit, try a few. On {inr(INCOME)} of income at {RATE}% for 5 years:
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">EMI limit (FOIR)</th>
            <th scope="col">EMI budget</th>
            <th scope="col">Loan you could support</th>
          </tr>
        </thead>
        <tbody>
          {FOIRS.map((f) => {
            const e = loanEligibility(INCOME, 0, f, RATE, 60);
            return (
              <tr key={f}>
                <th scope="row">{f}%</th>
                <td>{inr(e.affordableEmi)}</td>
                <td>{inr(e.maxLoan)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>What this leaves out</h2>
      <p>
        Real approval also depends on your credit history, how stable your employment is, your age when the
        loan would end, the value of the asset for a secured loan, and the lender&apos;s own risk policy.
        Treat the figure here as a starting estimate to plan around, not a sanction amount. It also does not
        include fees or insurance. For the full cost of a loan you are considering, use the{" "}
        <Link href="/home-loan-emi-calculator">home loan EMI</Link> or{" "}
        <Link href="/car-loan-emi-calculator">car loan EMI</Link> calculator.
      </p>
    </ToolPage>
  );
}
