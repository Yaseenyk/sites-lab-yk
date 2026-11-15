import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import EmiCalculator from "@/components/EmiCalculator";
import ToolPage from "@/components/ToolPage";
import { emi } from "@/lib/loan";
import { money, percent } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("car-loan-emi-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const inr = (n: number) => money(n, 0, "INR");
/** The example loan: Rs 8,00,000 at 9.5% for 5 years. */
const P = 800_000;
const RATE = 9.5;
const YEARS = 5;
const EXAMPLE = emi(P, RATE, YEARS * 12);
const TENURES = [3, 4, 5, 6, 7];
/** An example on-road price for the down payment table. */
const PRICE = 1_000_000;
const DOWN = [10, 20, 30, 40];
/** A small two-wheeler loan, in months, at the same example rate. */
const BIKE = 100_000;
const BIKE_MONTHS = [12, 24, 36];
/** An example processing fee, as a percent of the loan. */
const FEE = 1;

const faq = [
  {
    q: "How is a car loan EMI calculated?",
    a: `The same reducing-balance formula as any EMI: EMI = [P x R x (1 + R)^N] / [(1 + R)^N - 1]. For ${inr(P)} at ${RATE}% for ${YEARS} years, the EMI is ${inr(EXAMPLE.emi)} and the total interest is ${inr(EXAMPLE.totalInterest)}.`,
  },
  {
    q: "What is the EMI for a 5 lakh car loan?",
    a: `At ${RATE}% for 5 years, ${inr(500_000)} gives an EMI of ${inr(emi(500_000, RATE, 60).emi)}. For 3 years it is ${inr(emi(500_000, RATE, 36).emi)}. The rate is an example; use the rate in your offer.`,
  },
  {
    q: "Should I include the down payment in the loan amount?",
    a: `No. Enter only the amount you borrow, after subtracting your down payment from the vehicle's on-road price. On a ${inr(PRICE)} car, a 20% down payment means borrowing ${inr(PRICE * 0.8)}.`,
  },
  {
    q: "Is a longer car loan tenure a good idea?",
    a: `It lowers the EMI but raises the total interest. On ${inr(P)} at ${RATE}%, 3 years costs ${inr(emi(P, RATE, 36).totalInterest)} in interest and 7 years costs ${inr(emi(P, RATE, 84).totalInterest)}. Lenders set their own maximum tenure for car loans, so check the terms in your offer.`,
  },
  {
    q: "How much extra does a processing fee add?",
    a: `It is on top of the EMI. An example fee of ${FEE}% on ${inr(P)} is ${inr(P * (FEE / 100))}. Your offer states the actual fee and whether it is charged upfront or added to the loan.`,
  },
  {
    q: "How much does a one percentage point lower rate save?",
    a: `On ${inr(P)} over ${YEARS} years, ${RATE}% costs ${inr(EXAMPLE.totalInterest)} in interest and ${RATE - 1}% costs ${inr(emi(P, RATE - 1, YEARS * 12).totalInterest)}, a saving of ${inr(EXAMPLE.totalInterest - emi(P, RATE - 1, YEARS * 12).totalInterest)}.`,
  },
  {
    q: "Can I use this for a two-wheeler loan?",
    a: `Yes. Enter the amount, rate and term. For example, ${inr(BIKE)} at ${RATE}% over 24 months is an EMI of ${inr(emi(BIKE, RATE, 24).emi)}. Set the term in years, so 24 months is 2.`,
  },
  {
    q: "Does my credit score affect the rate I am offered?",
    a: "Lenders consider your credit history along with income, the loan size and their own policy, so the rate in your offer can differ from the rate you enter here. Always enter the rate from the offer you have.",
  },
  {
    q: "Does the EMI cover insurance and registration?",
    a: "No. The calculator shows principal and interest only. Insurance, registration and other charges are separate, whether you pay them upfront or finance them.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="car-loan-emi-calculator"
      lede="Enter your car or two-wheeler loan amount, interest rate and tenure to see the monthly EMI, total interest, and a year-by-year repayment breakdown."
      widget={
        <EmiCalculator
          amountLabel="Loan amount"
          defaultAmount="800000"
          defaultRate="9.5"
          defaultYears="5"
          maxYears={8}
        />
      }
      faq={faq}
      related={[
        "emi-calculator",
        "home-loan-emi-calculator",
        "loan-eligibility-calculator",
        "sip-calculator",
      ]}
    >
      <h2>How a car loan EMI is worked out</h2>
      <p>
        A car loan EMI is a fixed monthly payment on a reducing-balance loan:{" "}
        <strong>EMI = [P x R x (1 + R)^N] / [(1 + R)^N - 1]</strong>. P is the amount you borrow, R is the
        monthly rate (annual rate / 12 / 100) and N is the number of months.
      </p>
      <p>
        Worked example: {inr(P)} at {RATE}% for {YEARS} years ({YEARS * 12} months). The EMI is{" "}
        {inr(EXAMPLE.emi)} a month. You pay {inr(EXAMPLE.totalPayment)} in total, of which{" "}
        {inr(EXAMPLE.totalInterest)} is interest, or {percent((EXAMPLE.totalInterest / P) * 100, 1)} of the
        amount borrowed.
      </p>

      <h2>The loan amount is the price minus your down payment</h2>
      <p>
        Lenders finance the part of the price you do not pay yourself. For an example car with an on-road
        price of {inr(PRICE)}, at {RATE}% over {YEARS} years:
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Down payment</th>
            <th scope="col">You pay upfront</th>
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

      <h2>Choosing the tenure</h2>
      <p>
        Shorter terms cost more each month and less overall. The same {inr(P)} at {RATE}%:
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
                <th scope="row">{y} years</th>
                <td>{inr(e.emi)}</td>
                <td>{inr(e.totalInterest)}</td>
                <td>{inr(e.totalPayment)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        Before you stretch a loan to lower the EMI, compare the total payment as well as the monthly figure.
        Lenders set their own maximum tenure and rate for car loans, so use the numbers in your offer.
      </p>

      <h2>Two-wheeler and small loans</h2>
      <p>
        The same formula works for a bike or scooter. For {inr(BIKE)} at {RATE}%, shorter terms are in months
        but you enter them in years (12 months is 1, 24 is 2):
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Term</th>
            <th scope="col">Monthly EMI</th>
            <th scope="col">Total interest</th>
          </tr>
        </thead>
        <tbody>
          {BIKE_MONTHS.map((m) => {
            const e = emi(BIKE, RATE, m);
            return (
              <tr key={m}>
                <th scope="row">{m} months</th>
                <td>{inr(e.emi)}</td>
                <td>{inr(e.totalInterest)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>Costs outside the EMI</h2>
      <p>
        The EMI covers principal and interest. A processing fee is extra: an example fee of {FEE}% on {inr(P)}{" "}
        is {inr(P * (FEE / 100))}, which adds to what the loan costs you even though it is not in the EMI.
        Insurance and registration are also separate. Add them to your own budget when you compare offers.
      </p>

      <h2>What this leaves out</h2>
      <p>
        This is the EMI maths only. It does not include the processing fee, insurance the dealer may offer to
        finance, registration charges, or a rate that changes during the loan. Your offer letter has the exact
        figures. To check whether an EMI fits your income, see the{" "}
        <Link href="/loan-eligibility-calculator">loan eligibility calculator</Link>; for a larger or longer
        loan, the <Link href="/home-loan-emi-calculator">home loan EMI calculator</Link>.
      </p>
    </ToolPage>
  );
}
