import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import EmiCalculator from "@/components/EmiCalculator";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("car-loan-emi-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How is a car loan EMI calculated?",
    a: "The same reducing-balance formula as any EMI: EMI = [P x R x (1 + R)^N] / [(1 + R)^N - 1]. Car and two-wheeler loans are usually shorter than home loans, typically 3 to 7 years, so a smaller share of each payment is interest.",
  },
  {
    q: "Should I include the down payment in the loan amount?",
    a: "No. Enter only the amount you are borrowing, after subtracting your down payment from the vehicle's on-road price. A larger down payment lowers the EMI and the total interest paid.",
  },
  {
    q: "Is a longer car loan tenure a good idea?",
    a: "A longer tenure lowers the EMI but raises total interest, and vehicles depreciate quickly, so a long loan can outlast the car's resale value for longer than you'd want. Most lenders cap car loans around 7 years for this reason.",
  },
  {
    q: "Do used-car loans have higher rates than new-car loans?",
    a: "Usually yes. Lenders treat a used vehicle as higher risk and offer a shorter maximum tenure and a higher rate than for a new car from the same lender.",
  },
  {
    q: "Does my credit score affect the interest rate I'm offered?",
    a: "Yes, along with income, loan-to-value ratio and the lender's own policy. A higher credit score typically gets a lower rate, which is worth checking before you commit to a quoted rate.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="car-loan-emi-calculator"
      lede="Enter your car or two-wheeler loan amount, interest rate and tenure to see the monthly EMI, total interest, and a year-by-year repayment breakdown."
      widget={
        <EmiCalculator amountLabel="Loan amount" defaultAmount="800000" defaultRate="9.5" defaultYears="5" maxYears={8} />
      }
      faq={faq}
      related={["emi-calculator", "home-loan-emi-calculator", "loan-eligibility-calculator"]}
    >
      <h2>Why car loan tenures are shorter than home loans</h2>
      <p>
        A vehicle loses value from the day it&apos;s driven off the lot, while a home loan is secured against an
        asset that (usually) holds or gains value. Lenders cap car and two-wheeler loan tenures, commonly at 5
        to 7 years, so the loan doesn&apos;t outlast the vehicle&apos;s worth. A shorter tenure also means less of the
        EMI is interest compared with a long-tenure home loan.
      </p>

      <h2>Worked example</h2>
      <p>
        An ₹8,00,000 car loan at 9.5% for 5 years (60 months) comes to roughly ₹16,801 a month, with total
        interest of about ₹2,08,090 over the loan.
      </p>

      <h2>What this leaves out</h2>
      <p>
        This is the EMI math only. It doesn&apos;t include the loan processing fee, insurance the dealer may
        bundle into the financed amount, or RTO and registration charges, which are usually paid upfront rather
        than financed. To check whether a given EMI fits your budget, see the{" "}
        <Link href="/loan-eligibility-calculator">loan eligibility calculator</Link>.
      </p>
    </ToolPage>
  );
}
