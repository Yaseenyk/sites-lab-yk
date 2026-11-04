import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PayConverter from "@/components/PayConverter";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("hourly-to-salary-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I turn an hourly wage into a salary?",
    a: "Multiply the hourly rate by hours per week and by 52. Full-time at 40 hours is 2,080 hours a year, so $25 an hour is $25 x 2,080 = $52,000.",
  },
  {
    q: "How do I calculate salary for part-time hours?",
    a: "Use your real weekly hours. At $18 an hour and 30 hours a week, annual pay is $18 x 30 x 52 = $28,080.",
  },
  {
    q: "What if I do not work all 52 weeks?",
    a: "Change weeks per year. At $25 an hour, 40 hours a week and 50 paid weeks, annual pay is $25 x 40 x 50 = $50,000. Paid vacation and holidays count as worked weeks; unpaid time off does not.",
  },
  {
    q: "Does this include overtime?",
    a: "No. It assumes the same hours every week. Use the overtime pay calculator to add hours paid at a higher rate.",
  },
  {
    q: "Is the answer before tax?",
    a: "Yes. It is gross pay before income tax and other deductions.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="hourly-to-salary-calculator"
      lede="Enter your hourly wage to see your annual salary, plus monthly, bi-weekly and weekly pay. Change hours and weeks to match your schedule."
      widget={<PayConverter initialAmount="25" initialUnit="hourly" focus="annual" />}
      faq={faq}
      related={[
        "salary-to-hourly-calculator",
        "salary-calculator",
        "overtime-pay-calculator",
        "pay-raise-calculator",
      ]}
    >
      <h2>The formula</h2>
      <p>
        <strong>Annual salary = hourly rate x hours per week x weeks per year.</strong> The standard full-time
        year is 40 hours x 52 weeks = 2,080 hours, which is the default here. Divide the annual figure by 12
        for monthly pay, by 26 for bi-weekly pay, or by 52 for weekly pay.
      </p>

      <h2>Examples</h2>
      <table>
        <thead>
          <tr>
            <th>Hourly rate</th>
            <th>Schedule</th>
            <th>Annual pay</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$25.00</td>
            <td>40 hours, 52 weeks</td>
            <td>$52,000</td>
          </tr>
          <tr>
            <td>$18.00</td>
            <td>30 hours, 52 weeks</td>
            <td>$28,080</td>
          </tr>
          <tr>
            <td>$25.00</td>
            <td>40 hours, 50 weeks</td>
            <td>$50,000</td>
          </tr>
        </tbody>
      </table>

      <h2>Hourly pay versus salary</h2>
      <p>
        An hourly wage pays for every hour you work, including overtime at a higher rate where the law
        requires it. A salary is a fixed amount per year, so the real value of a salary depends on how many
        hours the job takes. Compare offers by converting both to hourly pay with the{" "}
        <Link href="/salary-to-hourly-calculator">salary to hourly calculator</Link>.
      </p>
    </ToolPage>
  );
}
