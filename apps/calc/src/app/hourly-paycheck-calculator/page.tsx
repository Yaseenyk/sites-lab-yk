import { pageMetadata } from "@sites/shell";
import PaycheckCalculator from "@/components/PaycheckCalculator";
import PaycheckReference from "@/components/PaycheckReference";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("hourly-paycheck-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I calculate an hourly paycheck?",
    a: "Multiply your hourly rate by the hours you work in a week, then by 52 for the year. Subtract pre-tax deductions and the standard deduction, apply the federal brackets, and add Social Security, Medicare and state tax. Divide by your number of paychecks for the amount per check.",
  },
  {
    q: "How much is $20 an hour after taxes?",
    a: "At 40 hours a week, $20 an hour is $41,600 a year before tax. Enter 20 and 40 above to see the take-home pay for your filing status and state.",
  },
  {
    q: "Does this include overtime?",
    a: "No. It assumes the same hours every week. To estimate a week with overtime, work out the gross pay with the overtime calculator, then use the average hours per week here for a rough take-home figure.",
  },
  {
    q: "Why does my hourly paycheck change from week to week?",
    a: "Hours change, and the tax withheld changes with them. Employers also annualise each paycheck to decide the withholding, so a larger check can look taxed more heavily even though the final tax is calculated on the whole year.",
  },
  {
    q: "Do part-time workers pay Social Security and Medicare?",
    a: "Yes. Social Security (6.2%) and Medicare (1.45%) are charged on every dollar of wages. Income tax may be zero if your yearly pay stays under the standard deduction.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="hourly-paycheck-calculator"
      lede="Enter your hourly rate and weekly hours to see take-home pay after federal income tax, Social Security, Medicare and state tax, per paycheck and per year. Uses the 2026 IRS tax tables."
      widget={<PaycheckCalculator mode="hourly" />}
      faq={faq}
      related={[
        "paycheck-calculator",
        "overtime-pay-calculator",
        "hourly-to-salary-calculator",
        "salary-to-hourly-calculator",
      ]}
    >
      <h2>How an hourly wage becomes take-home pay</h2>
      <p>
        <strong>Gross pay = hourly rate x hours per week x 52.</strong> The calculator treats that as your
        yearly income, works out the tax on it, and divides by the number of paychecks. A $20 hourly rate at
        40 hours is $41,600 a year; at 25 hours it is $26,000.
      </p>
      <PaycheckReference />
    </ToolPage>
  );
}
