import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PayConverter from "@/components/PayConverter";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("salary-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I convert hourly pay to annual salary?",
    a: "Multiply your hourly rate by the hours you work in a week and by the weeks you work in a year. At 40 hours and 52 weeks that is 2,080 hours, so $25 an hour is $52,000 a year.",
  },
  {
    q: "Why is monthly pay not just four weeks of pay?",
    a: "A year has 52 weeks, which is about 4.33 weeks a month, not 4. Annual pay divided by 12 gives the correct monthly figure.",
  },
  {
    q: "What is the difference between bi-weekly and semi-monthly?",
    a: "Bi-weekly means every two weeks, which is 26 paychecks a year. Semi-monthly means twice a month, which is 24 paychecks a year. The same salary gives a slightly larger bi-weekly check than semi-monthly check.",
  },
  {
    q: "Can I change the hours or weeks?",
    a: "Yes. Edit hours per week, days per week and weeks per year. Use fewer weeks if you take unpaid time off, and fewer hours for part-time work.",
  },
  {
    q: "Is this before or after tax?",
    a: "Before. These are gross figures. Taxes and deductions are not included.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="salary-calculator"
      lede="Enter any pay figure and see it as hourly, daily, weekly, bi-weekly, semi-monthly, monthly, quarterly and annual pay. Adjust your schedule to match your job."
      widget={<PayConverter initialAmount="60000" initialUnit="annual" />}
      faq={faq}
      related={[
        "hourly-to-salary-calculator",
        "salary-to-hourly-calculator",
        "pay-raise-calculator",
        "overtime-pay-calculator",
      ]}
    >
      <h2>The formulas</h2>
      <p>
        Everything goes through annual pay. The calculator first converts your figure to a year, then converts
        the year to each period. With your schedule of H hours a week, D days a week and W weeks a year:
      </p>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>Annual pay</th>
            <th>Back to this period</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hourly</td>
            <td>rate x H x W</td>
            <td>annual / (H x W)</td>
          </tr>
          <tr>
            <td>Daily</td>
            <td>rate x D x W</td>
            <td>annual / (D x W)</td>
          </tr>
          <tr>
            <td>Weekly</td>
            <td>rate x W</td>
            <td>annual / W</td>
          </tr>
          <tr>
            <td>Bi-weekly</td>
            <td>rate x W / 2</td>
            <td>annual / (W / 2)</td>
          </tr>
          <tr>
            <td>Semi-monthly</td>
            <td>rate x 24</td>
            <td>annual / 24</td>
          </tr>
          <tr>
            <td>Monthly</td>
            <td>rate x 12</td>
            <td>annual / 12</td>
          </tr>
        </tbody>
      </table>

      <h2>Example: $25 an hour</h2>
      <p>
        At 40 hours a week for 52 weeks, $25 an hour is $52,000 a year, $4,333.33 a month, $2,000 every two
        weeks and $1,000 a week. Switch the unit to Hourly and enter 25 to see it.
      </p>
      <p>
        Need one conversion in detail? See the{" "}
        <Link href="/hourly-to-salary-calculator">hourly to salary</Link> and{" "}
        <Link href="/salary-to-hourly-calculator">salary to hourly</Link> calculators, or read{" "}
        <Link href="/guides/salary-to-hourly">how the 2,080-hour rule works</Link>.
      </p>
    </ToolPage>
  );
}
