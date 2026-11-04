import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PayConverter from "@/components/PayConverter";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("usd-salary-to-inr-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I convert a USD salary to INR?",
    a: "Multiply the dollar salary by the USD to INR exchange rate. At a rate of 90, a $60,000 salary is 60,000 x 90 = 5,400,000 rupees a year, or 54,00,000 in Indian grouping. The calculator uses the live rate and also splits the result by month, week and hour.",
  },
  {
    q: "How do I convert an hourly wage in dollars to rupees?",
    a: "Choose Hourly in the Per list and enter the dollar rate. You get the hourly figure in rupees plus the annual, monthly and weekly amounts, using your own hours per week.",
  },
  {
    q: "Is the rupee figure what lands in my bank account?",
    a: "No. It is the gross amount at the mid-market rate. Income tax, deductions, and the margin or fees of the bank or transfer service all reduce what you receive.",
  },
  {
    q: "Which rate does the calculator use?",
    a: "The latest mid-market USD to INR rate from a free public feed, loaded when you open the page. The date is shown under the result.",
  },
  {
    q: "Can I use another currency?",
    a: "Yes. Change the currency and the Also show in list to any pair, for example a pound salary shown in rupees, or a rupee salary shown in dollars.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="usd-salary-to-inr-calculator"
      lede="Enter a salary or hourly wage in US dollars to see it in Indian rupees by year, month, week and hour. Uses live exchange rates and your own working schedule."
      widget={
        <PayConverter
          initialAmount="60000"
          initialUnit="annual"
          initialCurrency="USD"
          initialTarget="INR"
          focus="annual"
        />
      }
      faq={faq}
      related={[
        "usd-to-inr",
        "currency-converter",
        "salary-to-hourly-calculator",
        "hourly-to-salary-calculator",
      ]}
    >
      <h2>How it works</h2>
      <p>
        The calculator converts your pay between periods first (hourly, weekly, monthly, annual) using your
        schedule, then converts each figure from dollars to rupees at the live rate. The left column is in the
        currency you chose and the right column is in the second currency.
      </p>

      <h2>The formula</h2>
      <pre>{`rupee pay = dollar pay x USD to INR rate`}</pre>
      <p>
        For example, at a rate of 90 rupees per dollar, $5,000 a month is 5,000 x 90 = 4,50,000 rupees a
        month.
      </p>

      <h2>Before you compare</h2>
      <ul>
        <li>
          Compare after tax, not before. A US salary and an Indian salary of the same rupee value are taxed
          differently.
        </li>
        <li>
          Rupees buy more locally than dollars convert into, so a cost-of-living comparison tells you more
          than the exchange rate alone.
        </li>
        <li>
          If you are paid in dollars and spend in rupees, the amount you actually receive depends on the rate
          your bank or transfer service gives. See{" "}
          <Link href="/guides/how-exchange-rates-work">how exchange rates work</Link>.
        </li>
      </ul>
    </ToolPage>
  );
}
