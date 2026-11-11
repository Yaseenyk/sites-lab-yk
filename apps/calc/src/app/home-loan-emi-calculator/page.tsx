import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import EmiCalculator from "@/components/EmiCalculator";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("home-loan-emi-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How is a home loan EMI calculated?",
    a: "The same reducing-balance formula as any loan: EMI = [P x R x (1 + R)^N] / [(1 + R)^N - 1], where P is the loan amount, R is the monthly interest rate, and N is the number of months. Home loans just tend to run much longer, often 15 to 30 years.",
  },
  {
    q: "How much of my EMI goes to interest in the early years?",
    a: "A large share. On a 20-year home loan, the first few years are often 70 to 80% interest, because the balance is still close to the full loan amount. The share shifts toward principal as the balance falls, which is why the year-by-year table above matters more for a home loan than a short-term one.",
  },
  {
    q: "Does the down payment affect the EMI?",
    a: "Yes. A larger down payment lowers the principal you borrow, which lowers the EMI and the total interest paid, for the same rate and tenure. Enter the loan amount after your down payment, not the property price.",
  },
  {
    q: "Is home loan interest tax-deductible in India?",
    a: "Under the old tax regime, interest on a self-occupied home loan is deductible up to ₹2,00,000 a year under Section 24(b), and principal repayment counts toward the Section 80C limit. The new regime does not allow either deduction for a self-occupied property.",
  },
  {
    q: "Should I choose a longer tenure for a lower EMI?",
    a: "A longer tenure lowers the monthly EMI but increases total interest, since interest keeps accruing on the balance for longer. Compare both the EMI and the total interest figure above before deciding.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="home-loan-emi-calculator"
      lede="Enter your home loan amount, interest rate and tenure to see the monthly EMI, total interest over the loan, and how the principal-to-interest split shifts year by year."
      widget={
        <EmiCalculator amountLabel="Home loan amount" defaultAmount="3500000" defaultRate="8.5" defaultYears="20" maxYears={30} />
      }
      faq={faq}
      related={["emi-calculator", "car-loan-emi-calculator", "loan-eligibility-calculator"]}
    >
      <h2>Why home loan interest looks so front-loaded</h2>
      <p>
        A home loan is typically the longest-tenure EMI most people take. Because interest is charged on the
        outstanding balance, and the balance stays high for most of a 15- to 30-year loan, the early years pay
        mostly interest. Each additional year of tenure adds more total interest than it saves in EMI, so it is
        worth checking the year-by-year table above rather than only the monthly figure.
      </p>

      <h2>Worked example</h2>
      <p>
        A ₹35,00,000 home loan at 8.5% for 20 years (240 months) comes to roughly ₹30,375 a month, with total
        interest of about ₹37,89,900 over the full term — more than the loan amount itself, which is normal for
        a long-tenure loan at this rate.
      </p>

      <h2>What this leaves out</h2>
      <p>
        This estimate does not include processing fees, property insurance some lenders bundle in, or a
        floating rate that changes during the loan. It also does not account for prepayments, which most home
        loans allow without penalty on a floating rate and which shorten the effective tenure. For whether your
        income supports a given loan size, see the <Link href="/loan-eligibility-calculator">loan eligibility calculator</Link>.
      </p>
    </ToolPage>
  );
}
