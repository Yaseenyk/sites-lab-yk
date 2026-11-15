import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PaycheckCalculator from "@/components/PaycheckCalculator";
import PaycheckReference from "@/components/PaycheckReference";
import ToolPage from "@/components/ToolPage";
import { money, overtime } from "@/lib/pay";
import { STANDARD_DEDUCTION, paycheck } from "@/lib/paycheck";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("hourly-paycheck-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

/** Weekly take-home for an hourly worker: single filer, no state tax, no deductions, paid weekly. */
function weekly(rate: number, hours: number) {
  return paycheck({
    annualGross: rate * hours * 52,
    periodsPerYear: 52,
    status: "single",
    retirement: 0,
    benefits: 0,
    afterTax: 0,
    statePercent: 0,
  });
}
const RATES = [15, 20, 25, 30, 40];
const HOURS = [20, 30, 40];
/** The federal minimum wage (29 U.S.C. 206). */
const MIN_WAGE = 7.25;
const OT_WEEK = overtime(20, 45, 40, 1.5);

const faq = [
  {
    q: "How do I calculate an hourly paycheck?",
    a: "Multiply your hourly rate by the hours you work in a week, then by 52 for the year. Subtract pre-tax deductions and the standard deduction, apply the federal brackets, and add Social Security, Medicare and state tax. Divide by your number of paychecks for the amount per check.",
  },
  {
    q: "How much is $20 an hour after taxes?",
    a: `At 40 hours a week, $20 an hour is ${money(20 * 40 * 52, 0)} a year before tax. For a single filer with no state tax and no other deductions, take-home pay comes to about ${money(weekly(20, 40).annual.net, 0)} a year, or ${money(weekly(20, 40).perPeriod.net, 2)} a week. Enter your own details above for your filing status and state.`,
  },
  {
    q: "Does this include overtime?",
    a: `No. It assumes the same hours every week. To estimate a week with overtime, work out the gross pay with the overtime calculator, then use the average hours per week here for a rough take-home figure. A 45-hour week at $20 with time and a half is ${money(OT_WEEK.total, 2)} gross.`,
  },
  {
    q: "Why does my hourly paycheck change from week to week?",
    a: "Hours change, and the tax withheld changes with them. Employers also annualise each paycheck to decide the withholding, so a larger check can look taxed more heavily even though the final tax is calculated on the whole year.",
  },
  {
    q: "How much is take-home pay at 30 hours a week?",
    a: `At $20 an hour and 30 hours a week, gross pay is ${money(20 * 30 * 52, 0)} a year, and take-home is about ${money(weekly(20, 30).annual.net, 0)} a year (${money(weekly(20, 30).perPeriod.net, 2)} a week) for a single filer with no state tax.`,
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
        "pay-raise-calculator",
      ]}
    >
      <h2>How an hourly wage becomes take-home pay</h2>
      <p>
        <strong>Gross pay = hourly rate x hours per week x 52.</strong> The calculator treats that as your
        yearly income, works out the tax on it, and divides by the number of paychecks. A $20 hourly rate at
        40 hours is {money(20 * 40 * 52, 0)} a year; at 25 hours it is {money(20 * 25 * 52, 0)}.
      </p>

      <h2>Take-home pay by hourly rate</h2>
      <p>
        Weekly take-home at 40 hours for a single filer using the standard deduction, with no state tax, no
        retirement contributions and no other deductions. The figures are computed with the same tax tables as
        the calculator above.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Hourly rate</th>
            <th scope="col">Gross per year</th>
            <th scope="col">Federal tax per year</th>
            <th scope="col">Social Security + Medicare</th>
            <th scope="col">Take-home per week</th>
          </tr>
        </thead>
        <tbody>
          {RATES.map((r) => {
            const p = weekly(r, 40);
            return (
              <tr key={r}>
                <th scope="row">{money(r, 2)}</th>
                <td>{money(p.annual.gross, 0)}</td>
                <td>{money(p.annual.federal, 0)}</td>
                <td>{money(p.annual.socialSecurity + p.annual.medicare, 0)}</td>
                <td>{money(p.perPeriod.net, 2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>Part-time hours at $20 an hour</h2>
      <p>
        Fewer hours lower gross pay and also the share that goes to income tax, because less of the
        year&apos;s pay is above the standard deduction. Social Security and Medicare apply from the first
        dollar.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Hours a week</th>
            <th scope="col">Gross per week</th>
            <th scope="col">Federal tax per week</th>
            <th scope="col">Take-home per week</th>
            <th scope="col">Take-home as a share of gross</th>
          </tr>
        </thead>
        <tbody>
          {HOURS.map((h) => {
            const p = weekly(20, h);
            return (
              <tr key={h}>
                <th scope="row">{h} hours</th>
                <td>{money(p.perPeriod.gross, 2)}</td>
                <td>{money(p.perPeriod.federal, 2)}</td>
                <td>{money(p.perPeriod.net, 2)}</td>
                <td>{((p.annual.net / p.annual.gross) * 100).toFixed(1)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>A week with overtime</h2>
      <p>
        The calculator assumes the same hours every week. For a week with overtime, find the gross pay first.
        At $20 an hour, 45 hours with overtime after 40 at time and a half is {money(OT_WEEK.regularPay, 2)}{" "}
        for the first 40 hours plus {money(OT_WEEK.overtimePay, 2)} for 5 overtime hours, or{" "}
        {money(OT_WEEK.total, 2)} gross. If every week were like that one, take-home would be about{" "}
        {money(
          paycheck({
            annualGross: OT_WEEK.total * 52,
            periodsPerYear: 52,
            status: "single",
            retirement: 0,
            benefits: 0,
            afterTax: 0,
            statePercent: 0,
          }).perPeriod.net,
          2,
        )}{" "}
        a week on the same assumptions. Use the{" "}
        <Link href="/overtime-pay-calculator">overtime pay calculator</Link> to work out other weeks.
      </p>

      <h2>Minimum wage workers and income tax</h2>
      <p>
        The federal minimum wage is {money(MIN_WAGE, 2)} an hour. At 40 hours for 52 weeks that is{" "}
        {money(MIN_WAGE * 40 * 52, 0)} a year, below the {money(STANDARD_DEDUCTION.single, 0)} standard
        deduction for a single filer, so the federal income tax in this model is{" "}
        {money(weekly(MIN_WAGE, 40).annual.federal, 0)}. Social Security and Medicare still apply to every
        dollar. Many states and cities set a higher minimum wage and some have their own income tax, so check
        your own. Source:{" "}
        <a href="https://www.law.cornell.edu/uscode/text/29/206" rel="noopener noreferrer">
          29 U.S.C. 206
        </a>
        , checked 16 November 2026.
      </p>
      <PaycheckReference />
    </ToolPage>
  );
}
