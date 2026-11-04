import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import RaiseCalculator from "@/components/RaiseCalculator";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("pay-raise-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I calculate a percentage raise?",
    a: "Multiply your current pay by 1 plus the raise as a decimal. A 3% raise on $50,000 is $50,000 x 1.03 = $51,500, an increase of $1,500.",
  },
  {
    q: "How do I find what percent raise I got?",
    a: "Subtract your old pay from your new pay, divide by your old pay, and multiply by 100. Going from $50,000 to $55,000 is ($55,000 - $50,000) / $50,000 x 100 = 10%.",
  },
  {
    q: "Does a raise work the same for hourly pay?",
    a: "Yes. The percentage is applied to the rate, so a 4% raise on $20.00 an hour gives $20.80 an hour. Multiply by your weekly hours to see the effect on a paycheck.",
  },
  {
    q: "Is the result before or after tax?",
    a: "Before. The calculator works on gross pay. Your take-home increase will be smaller because income tax and payroll deductions apply to the extra pay.",
  },
  {
    q: "How much should a raise be to keep up with inflation?",
    a: "At least as large as the inflation rate. If prices rise 3% and your pay rises 3%, your buying power is unchanged; a smaller raise is a real pay cut.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="pay-raise-calculator"
      lede="Enter your current pay and the raise to see your new pay, or enter your old and new pay to find the percent raise. Works for salary and hourly wages."
      widget={<RaiseCalculator />}
      faq={faq}
      related={[
        "salary-calculator",
        "hourly-to-salary-calculator",
        "salary-to-hourly-calculator",
        "overtime-pay-calculator",
      ]}
    >
      <h2>How the calculator works</h2>
      <p>Three modes cover the usual questions:</p>
      <ul>
        <li>
          <strong>Raise by %:</strong> new pay = current pay x (1 + raise / 100). It also shows what your pay
          becomes if you get the same percentage raise each year for five years, compounding.
        </li>
        <li>
          <strong>Raise by $ amount:</strong> new pay = current pay + raise. The calculator reports the raise
          as a percentage of your current pay.
        </li>
        <li>
          <strong>Find the % raise:</strong> raise % = (new pay - current pay) / current pay x 100. A negative
          result means a pay cut.
        </li>
      </ul>

      <h2>Worked examples</h2>
      <table>
        <thead>
          <tr>
            <th>Current pay</th>
            <th>Raise</th>
            <th>New pay</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$60,000 a year</td>
            <td>3%</td>
            <td>$61,800 (up $1,800)</td>
          </tr>
          <tr>
            <td>$20.00 an hour</td>
            <td>4%</td>
            <td>$20.80 an hour</td>
          </tr>
          <tr>
            <td>$60,000 a year</td>
            <td>$2,500</td>
            <td>$62,500 (a 4.17% raise)</td>
          </tr>
        </tbody>
      </table>

      <h2>What a raise does to a paycheck</h2>
      <p>
        To see the effect per pay period, convert the new figure with the{" "}
        <Link href="/salary-calculator">salary calculator</Link>. A raise from $60,000 to $61,800 adds about
        $34.62 a week before tax ($1,800 divided by 52 weeks).
      </p>
    </ToolPage>
  );
}
