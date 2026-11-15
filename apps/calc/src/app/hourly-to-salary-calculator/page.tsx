import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PayConverter from "@/components/PayConverter";
import ToolPage from "@/components/ToolPage";
import { DEFAULT_SCHEDULE, convertAll, money, toAnnual } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("hourly-to-salary-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const S = DEFAULT_SCHEDULE;
/** Hourly wages shown in the main table; each row is computed with the standard 2,080-hour year. */
const RATES = [12, 15, 18, 20, 25, 30, 40, 50, 75];
const HOURS = [20, 30, 35, 40];
const WEEKS = [52, 50, 48];
const annualAt = (rate: number, hours: number, weeks: number) =>
  toAnnual(rate, "hourly", { hoursPerWeek: hours, daysPerWeek: 5, weeksPerYear: weeks });

const faq = [
  {
    q: "How do I turn an hourly wage into a salary?",
    a: `Multiply the hourly rate by hours per week and by 52. Full-time at 40 hours is 2,080 hours a year, so $25 an hour is $25 x 2,080 = ${money(annualAt(25, 40, 52), 0)}.`,
  },
  {
    q: "How much is $15 an hour per year?",
    a: `${money(annualAt(15, 40, 52), 0)} a year at 40 hours a week for 52 weeks, which is ${money(convertAll(15, "hourly", S).monthly, 2)} a month before tax.`,
  },
  {
    q: "How much is $20 an hour per year?",
    a: `${money(annualAt(20, 40, 52), 0)} a year at 40 hours a week for 52 weeks, or ${money(convertAll(20, "hourly", S).monthly, 2)} a month before tax.`,
  },
  {
    q: "How much is $30 an hour per year?",
    a: `${money(annualAt(30, 40, 52), 0)} a year at 40 hours a week for 52 weeks, or ${money(convertAll(30, "hourly", S).monthly, 2)} a month before tax.`,
  },
  {
    q: "How do I calculate salary for part-time hours?",
    a: `Use your real weekly hours. At $18 an hour and 30 hours a week, annual pay is $18 x 30 x 52 = ${money(annualAt(18, 30, 52), 0)}.`,
  },
  {
    q: "What if I do not work all 52 weeks?",
    a: `Change weeks per year. At $25 an hour, 40 hours a week and 50 paid weeks, annual pay is $25 x 40 x 50 = ${money(annualAt(25, 40, 50), 0)}. Paid vacation and holidays count as worked weeks; unpaid time off does not.`,
  },
  {
    q: "How do I get monthly pay from an hourly wage?",
    a: `Work out the annual figure first, then divide by 12. $25 an hour is ${money(annualAt(25, 40, 52), 0)} a year, so ${money(convertAll(25, "hourly", S).monthly, 2)} a month, not four weeks of pay, because a year has more than 48 weeks.`,
  },
  {
    q: "Does this include overtime?",
    a: "No. It assumes the same hours every week. Use the overtime pay calculator to add hours paid at a higher rate.",
  },
  {
    q: "Is the answer before tax?",
    a: "Yes. It is gross pay before income tax and other deductions. The hourly paycheck calculator shows take-home pay.",
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
        "hourly-paycheck-calculator",
        "overtime-pay-calculator",
        "pay-raise-calculator",
      ]}
    >
      <h2>How to convert hourly pay to a yearly salary</h2>
      <p>
        <strong>Annual salary = hourly rate x hours per week x weeks per year.</strong> The standard full-time
        year is 40 hours x 52 weeks = 2,080 hours, which is the default here. Divide the annual figure by 12
        for monthly pay, by 26 for bi-weekly pay, or by 52 for weekly pay.
      </p>
      <ol>
        <li>
          <strong>Find your hours.</strong> Use the hours you are paid for in a typical week, 40 for full
          time.
        </li>
        <li>
          <strong>Multiply by the weeks you are paid.</strong> 52 if you are paid all year, including paid
          holidays and leave.
        </li>
        <li>
          <strong>Multiply by your hourly rate.</strong> That is the annual salary before tax.
        </li>
      </ol>
      <p>
        Worked example: $25 an hour, 40 hours, 52 weeks. 40 x 52 = 2,080 hours, and 2,080 x $25 ={" "}
        {money(annualAt(25, 40, 52), 0)} a year. That is {money(convertAll(25, "hourly", S).monthly, 2)} a
        month, {money(convertAll(25, "hourly", S).biweekly, 2)} every two weeks and{" "}
        {money(convertAll(25, "hourly", S).weekly, 2)} a week.
      </p>

      <h2>Hourly wage to salary chart</h2>
      <p>Full-time (40 hours, 52 weeks) pay for common hourly rates.</p>
      <table>
        <thead>
          <tr>
            <th scope="col">Hourly rate</th>
            <th scope="col">Annual</th>
            <th scope="col">Monthly</th>
            <th scope="col">Bi-weekly</th>
            <th scope="col">Weekly</th>
          </tr>
        </thead>
        <tbody>
          {RATES.map((r) => {
            const v = convertAll(r, "hourly", S);
            return (
              <tr key={r}>
                <th scope="row">{money(r, 2)}</th>
                <td>{money(v.annual, 0)}</td>
                <td>{money(v.monthly, 2)}</td>
                <td>{money(v.biweekly, 2)}</td>
                <td>{money(v.weekly, 2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>How hours and weeks change the answer</h2>
      <p>
        The yearly figure depends on your schedule as much as your rate. This table shows $25 an hour with
        different hours a week (down) and paid weeks a year (across).
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Hours a week</th>
            {WEEKS.map((w) => (
              <th key={w} scope="col">
                {w} weeks
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HOURS.map((h) => (
            <tr key={h}>
              <th scope="row">{h} hours</th>
              {WEEKS.map((w) => (
                <td key={w}>{money(annualAt(25, h, w), 0)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Hourly pay versus salary</h2>
      <p>
        An hourly wage pays for every hour you work, including overtime at a higher rate where the law
        requires it. A salary is a fixed amount per year, so the real value of a salary depends on how many
        hours the job takes. When you compare an hourly offer with a salaried one, convert the salary to
        hourly with the <Link href="/salary-to-hourly-calculator">salary to hourly calculator</Link> using the
        hours the job really takes.
      </p>

      <h2>What this calculator leaves out</h2>
      <p>
        It assumes the same hours every week. It does not add overtime, shift differentials, bonuses or tips,
        and it does not take off tax. For a week with overtime, use the{" "}
        <Link href="/overtime-pay-calculator">overtime pay calculator</Link>; for take-home pay, use the{" "}
        <Link href="/hourly-paycheck-calculator">hourly paycheck calculator</Link>. To see the same pay in
        every period at once, use the <Link href="/salary-calculator">salary calculator</Link>.
      </p>
    </ToolPage>
  );
}
