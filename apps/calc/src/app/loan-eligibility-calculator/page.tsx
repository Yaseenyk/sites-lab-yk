import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import LoanEligibilityCalculator from "@/components/LoanEligibilityCalculator";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("loan-eligibility-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "What is FOIR, and why does it matter for loan eligibility?",
    a: "FOIR, Fixed Obligation to Income Ratio, is the share of your net monthly income lenders will let go toward all EMIs combined, including the new loan. Lenders typically cap it at 40 to 50%; this calculator defaults to 50% and lets you set your own figure.",
  },
  {
    q: "How does an existing EMI affect how much I can borrow?",
    a: "It's subtracted from your FOIR budget before the new loan is sized. At a 50% FOIR on ₹1,00,000 income, you have ₹50,000 available for EMIs; a ₹10,000 existing EMI leaves only ₹40,000 for the new loan.",
  },
  {
    q: "Why might a bank approve less than this calculator shows?",
    a: "This estimate only looks at income, existing EMIs, rate and tenure. Lenders also weigh your credit score, employment stability, age, the loan-to-value ratio for a secured loan, and their own internal policy, any of which can lower the approved amount.",
  },
  {
    q: "Does a longer tenure increase how much I can borrow?",
    a: "Yes. The same affordable EMI supports a larger principal over a longer tenure, since each instalment covers less principal per month. It also means more total interest, so check the EMI calculator for the full repayment picture before choosing a longer term.",
  },
  {
    q: "Should I use my gross or net income here?",
    a: "Net monthly income, what actually reaches your account after tax and other deductions. Using gross income overstates what you can realistically set aside for EMIs.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="loan-eligibility-calculator"
      lede="Enter your monthly income, any existing EMIs, and a loan rate and tenure to see roughly how large a loan your income could support, using the FOIR approach lenders commonly apply."
      widget={<LoanEligibilityCalculator />}
      faq={faq}
      related={["emi-calculator", "home-loan-emi-calculator", "car-loan-emi-calculator"]}
    >
      <h2>How this estimate works</h2>
      <p>
        Lenders commonly size a loan by capping total monthly EMIs (the new one plus any existing ones) at a
        percentage of net income, the Fixed Obligation to Income Ratio or FOIR. This calculator:
      </p>
      <ol>
        <li>Takes your FOIR share of income (50% by default) as your total EMI budget.</li>
        <li>Subtracts your existing EMIs to find what&apos;s left for a new loan.</li>
        <li>Runs that affordable EMI through the EMI formula in reverse, at your chosen rate and tenure, to find the matching loan principal.</li>
      </ol>
      <p>
        It&apos;s a budgeting estimate, not a lender&apos;s underwriting model. For the EMI a specific loan amount would
        produce, use the <Link href="/emi-calculator">EMI calculator</Link> directly.
      </p>

      <h2>What this leaves out</h2>
      <p>
        Real approval also depends on credit score and history, employment type and stability, age at loan
        maturity, the asset&apos;s loan-to-value ratio for a secured loan, and the lender&apos;s own risk policy. Treat
        the figure here as a starting estimate to plan around, not a sanction amount.
      </p>
    </ToolPage>
  );
}
