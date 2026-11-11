import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import EmiCalculator from "@/components/EmiCalculator";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("emi-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "What is the EMI formula?",
    a: "EMI = [P x R x (1 + R)^N] / [(1 + R)^N - 1], where P is the loan amount, R is the monthly interest rate (annual rate divided by 12 and by 100), and N is the number of monthly instalments. This is the same reducing-balance formula lenders publish on their own EMI pages.",
  },
  {
    q: "Does the EMI stay the same every month?",
    a: "Yes, for a standard fixed-rate reducing-balance loan the EMI is constant. What changes each month is the split inside it: early instalments are mostly interest, later ones are mostly principal, because interest is charged on the shrinking balance.",
  },
  {
    q: "What's the difference between flat-rate and reducing-balance interest?",
    a: "Reducing-balance interest, used by this calculator and by virtually every bank loan, charges interest only on the outstanding balance. Flat-rate interest charges on the original amount for the full term, which works out more expensive for the same quoted rate.",
  },
  {
    q: "How can I reduce my total interest?",
    a: "A shorter tenure, a larger down payment (lower principal), a better interest rate, or a part-prepayment during the loan all cut total interest, since each lowers either the balance interest is charged on or how long it's charged for.",
  },
  {
    q: "Does prepaying a loan always save money?",
    a: "Usually, since it reduces the balance future interest is charged on. Check your lender's prepayment charges first; some loans (particularly fixed-rate ones) charge a fee that can offset part of the saving.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="emi-calculator"
      lede="Enter the loan amount, interest rate and term to see your monthly EMI, total interest, and a year-by-year breakdown of how much of each payment goes to principal versus interest."
      widget={<EmiCalculator amountLabel="Loan amount" defaultAmount="1000000" defaultRate="9" defaultYears="5" maxYears={30} />}
      faq={faq}
      related={["home-loan-emi-calculator", "car-loan-emi-calculator", "loan-eligibility-calculator", "sip-calculator"]}
    >
      <h2>How EMI is calculated</h2>
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
        Each EMI pays some interest on the balance still owed, and the rest reduces the principal. Because the
        balance shrinks every month, the interest portion shrinks too and the principal portion grows, even
        though the EMI itself stays flat. The calculator above shows this split for every year, and the full
        monthly table if you want it.
      </p>

      <h2>Worked example</h2>
      <p>
        A ₹10,00,000 loan at 9% a year for 5 years (60 months): the monthly rate is 9 / 12 / 100 = 0.0075. The
        EMI works out to about ₹20,758 a month, ₹12,45,501 paid in total, and ₹2,45,501 in interest over the
        life of the loan.
      </p>

      <h2>What this leaves out</h2>
      <p>
        This is the standard EMI math only. It does not include processing fees, insurance premiums some
        lenders bundle into the loan, GST on charges, or a floating-rate loan&apos;s rate changing mid-term.
        Your lender&apos;s sanction letter has the exact figures. For a sense of how large a loan you could
        realistically take on, see the <Link href="/loan-eligibility-calculator">loan eligibility calculator</Link>.
      </p>
    </ToolPage>
  );
}
