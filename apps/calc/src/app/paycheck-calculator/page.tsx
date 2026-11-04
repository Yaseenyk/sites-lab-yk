import { pageMetadata } from "@sites/shell";
import PaycheckCalculator from "@/components/PaycheckCalculator";
import PaycheckReference, { ExampleTable } from "@/components/PaycheckReference";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("paycheck-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I calculate my paycheck after taxes?",
    a: "Take your gross pay, subtract pre-tax deductions such as a 401(k), subtract the standard deduction to find taxable income, and apply the federal brackets. Then add Social Security (6.2%) and Medicare (1.45%), state and local tax, and any after-tax deductions. What remains is take-home pay. This calculator does all of it from your salary.",
  },
  {
    q: "How much is taken out of a paycheck?",
    a: "For a single filer earning $60,000, about 16 percent goes to federal tax, Social Security and Medicare combined, before any state tax. The share rises with income because the brackets are marginal, and falls with pre-tax deductions such as a 401(k).",
  },
  {
    q: "Why is my real paycheck different from the estimate?",
    a: "Employers withhold using your Form W-4 and the IRS payroll method in Publication 15-T, not your final tax bill. A different W-4, extra income, credits, local taxes or benefits not entered here all change the real figure. Your pay stub is the exact number.",
  },
  {
    q: "Does a 401(k) contribution lower my tax?",
    a: "A traditional 401(k) contribution lowers the pay your income tax is based on, so your take-home pay falls by less than the amount you contribute. It does not lower Social Security or Medicare tax. A Roth 401(k) is taken after tax and does not lower income tax today.",
  },
  {
    q: "Which states have no income tax?",
    a: "Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington and Wyoming do not tax wages. Pick one of them in the calculator and the state tax is set to zero.",
  },
  {
    q: "Is bonus or overtime pay taxed differently?",
    a: "Not at a special rate. They are added to your income and taxed through the same brackets, but employers often withhold a flat percentage from a bonus, which can make the check look smaller than the final tax owed.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="paycheck-calculator"
      lede="Enter your salary to see take-home pay after federal income tax, Social Security, Medicare and state tax. Built on the 2026 IRS tax tables, with the working shown below."
      widget={<PaycheckCalculator mode="salary" />}
      faq={faq}
      related={[
        "hourly-paycheck-calculator",
        "salary-to-hourly-calculator",
        "pay-raise-calculator",
        "overtime-pay-calculator",
      ]}
    >
      <h2>Take-home pay at common salaries</h2>
      <p>
        Single filer, paid every two weeks, no pre-tax deductions and no state tax. Your own figures will
        differ, so use the calculator above.
      </p>
      <ExampleTable />
      <PaycheckReference />
    </ToolPage>
  );
}
