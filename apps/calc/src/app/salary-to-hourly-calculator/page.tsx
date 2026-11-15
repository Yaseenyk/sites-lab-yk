import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PayConverter from "@/components/PayConverter";
import ToolPage from "@/components/ToolPage";
import { DEFAULT_SCHEDULE, convertAll, money, percent } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("salary-to-hourly-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const S = DEFAULT_SCHEDULE;
/** Salaries in the main table. */
const SALARIES = [30_000, 40_000, 50_000, 60_000, 75_000, 100_000, 150_000];
/** Hours a week for the "your real hourly rate" table. */
const REAL_HOURS = [40, 45, 50, 55, 60];
/** The US federal pay system divisor (OPM), versus the 2,080 convention. */
const OPM_DIVISOR = 2_087;
const hourlyAt = (salary: number, hours: number, weeks = 52) => salary / (hours * weeks);

const faq = [
  {
    q: "How do I convert salary to hourly?",
    a: `Divide annual salary by the hours you work in a year. For a standard full-time year that is 40 x 52 = 2,080 hours, so $60,000 a year is $60,000 / 2,080 = ${money(hourlyAt(60_000, 40), 2)} an hour.`,
  },
  {
    q: "How do I convert a monthly salary to hourly?",
    a: `Multiply the monthly amount by 12 to get the annual figure, then divide by 2,080. $5,000 a month is $60,000 a year, or ${money(hourlyAt(60_000, 40), 2)} an hour.`,
  },
  {
    q: "How much is a $50,000 salary per hour?",
    a: `${money(hourlyAt(50_000, 40), 2)} an hour at 40 hours a week for 52 weeks. At 45 hours a week it is ${money(hourlyAt(50_000, 45), 2)}.`,
  },
  {
    q: "How much is a $100,000 salary per hour?",
    a: `${money(hourlyAt(100_000, 40), 2)} an hour at 40 hours a week for 52 weeks, or ${money(hourlyAt(100_000, 50), 2)} an hour if the job regularly takes 50 hours.`,
  },
  {
    q: "What if I work more than 40 hours a week?",
    a: `Set hours per week to what you really work. A $60,000 salary at 50 hours a week is $60,000 / (50 x 52) = ${money(hourlyAt(60_000, 50), 2)} an hour, well below the ${money(hourlyAt(60_000, 40), 2)} you get at 40 hours.`,
  },
  {
    q: "Why do some people use 2,087 hours?",
    a: `The US federal pay system divides annual pay by ${OPM_DIVISOR.toLocaleString("en-US")} hours, the average number of work hours in a calendar year over a 28-year cycle, because a calendar year is 365 or 366 days, not exactly 52 weeks. 2,080 is the common convention elsewhere. The two differ by about ${percent((OPM_DIVISOR / 2_080 - 1) * 100, 2)}: on $60,000 that is ${money(hourlyAt(60_000, 40), 2)} against ${money(60_000 / OPM_DIVISOR, 2)}.`,
  },
  {
    q: "Do paid holidays and vacation count as hours?",
    a: "Yes. If you are paid for them, they are part of the salary, so keep weeks per year at 52. Reduce the weeks only for unpaid time off.",
  },
  {
    q: "Is a salaried job paid for overtime?",
    a: "Not automatically. A salaried job that is exempt from overtime pays the same however many hours you work. A salaried job that is not exempt is owed overtime. The guide to overtime pay explains the difference.",
  },
  {
    q: "Is the hourly figure before tax?",
    a: "Yes. It is gross pay.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="salary-to-hourly-calculator"
      lede="Enter your salary to see what it is worth per hour, plus daily, weekly and monthly pay. Set your real hours to see your effective hourly rate."
      widget={<PayConverter initialAmount="60000" initialUnit="annual" focus="hourly" />}
      faq={faq}
      related={[
        "hourly-to-salary-calculator",
        "salary-calculator",
        "overtime-pay-calculator",
        "paycheck-calculator",
        "pay-raise-calculator",
      ]}
    >
      <h2>How to convert a salary to an hourly rate</h2>
      <p>
        <strong>Hourly pay = annual salary / (hours per week x weeks per year).</strong> With the standard
        2,080-hour year (40 hours x 52 weeks), divide your salary by 2,080.
      </p>
      <ol>
        <li>
          <strong>Get the yearly figure.</strong> If you know a monthly salary, multiply by 12.
        </li>
        <li>
          <strong>Count your yearly hours.</strong> Hours per week times weeks per year: 40 x 52 = 2,080.
        </li>
        <li>
          <strong>Divide.</strong> Salary divided by yearly hours is the hourly rate.
        </li>
      </ol>
      <p>
        Worked example: $60,000 / 2,080 = {money(hourlyAt(60_000, 40), 2)} an hour. That is{" "}
        {money(convertAll(60_000, "annual", S).daily, 2)} a day and{" "}
        {money(convertAll(60_000, "annual", S).weekly, 2)} a week. Our{" "}
        <Link href="/guides/salary-to-hourly/">guide to the 2,080-hour rule</Link> explains where the number
        comes from.
      </p>

      <h2>Salary to hourly chart</h2>
      <p>
        Hourly pay for common salaries at 40 hours a week for 52 weeks (2,080 hours), and at the 2,087-hour
        divisor the US federal government uses.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Annual salary</th>
            <th scope="col">Hourly (2,080 hours)</th>
            <th scope="col">Hourly (2,087 hours)</th>
            <th scope="col">Weekly</th>
            <th scope="col">Monthly</th>
          </tr>
        </thead>
        <tbody>
          {SALARIES.map((s) => {
            const v = convertAll(s, "annual", S);
            return (
              <tr key={s}>
                <th scope="row">{money(s, 0)}</th>
                <td>{money(v.hourly, 2)}</td>
                <td>{money(s / OPM_DIVISOR, 2)}</td>
                <td>{money(v.weekly, 2)}</td>
                <td>{money(v.monthly, 2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>Your real hourly rate depends on your real hours</h2>
      <p>
        A salary does not change when you work extra hours, so every extra hour lowers your effective hourly
        rate. This is what a $60,000 and a $90,000 salary are worth per hour at different weekly hours.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Hours a week</th>
            <th scope="col">$60,000 a year</th>
            <th scope="col">$90,000 a year</th>
            <th scope="col">Rate vs a 40-hour week</th>
          </tr>
        </thead>
        <tbody>
          {REAL_HOURS.map((h) => (
            <tr key={h}>
              <th scope="row">{h} hours</th>
              <td>{money(hourlyAt(60_000, h), 2)}</td>
              <td>{money(hourlyAt(90_000, h), 2)}</td>
              <td>{h === 40 ? "baseline" : `${percent((40 / h - 1) * 100, 1)}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Put your real hours in the calculator before comparing a salary with an hourly offer. If an hourly job
        pays overtime and the salaried one does not, the gap is larger than the plain rates suggest; use the{" "}
        <Link href="/overtime-pay-calculator">overtime pay calculator</Link> to price the hourly week.
      </p>

      <h2>2,080 hours or 2,087 hours?</h2>
      <p>
        2,080 is 40 hours x 52 weeks and is the usual convention. A calendar year is 365 or 366 days, which is
        a little more than 52 weeks, so the US federal pay system divides annual pay by{" "}
        {OPM_DIVISOR.toLocaleString("en-US")} hours instead and rounds each hourly rate to the nearest cent.
        The Office of Personnel Management explains that 2,087 is the average number of work hours in a
        calendar year over a 28-year cycle. The difference is about{" "}
        {percent((OPM_DIVISOR / 2_080 - 1) * 100, 2)}, or{" "}
        {money(hourlyAt(60_000, 40) - 60_000 / OPM_DIVISOR, 2)} an hour on a $60,000 salary. If your employer
        states a divisor, set weeks per year to match it.
      </p>

      <h2>What this calculator leaves out</h2>
      <p>
        It gives gross pay and assumes the same hours every week. It does not model unpaid leave, bonuses or
        benefits, and it does not take off tax. To go the other way, use the{" "}
        <Link href="/hourly-to-salary-calculator">hourly to salary calculator</Link>. For take-home pay, use
        the <Link href="/paycheck-calculator">paycheck calculator</Link>.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a
            href="https://www.opm.gov/policy-data-oversight/pay-leave/pay-administration/fact-sheets/computing-hourly-rates-of-pay-using-the-2087-hour-divisor/"
            rel="noopener noreferrer"
          >
            US Office of Personnel Management: computing hourly rates of pay using the 2,087-hour divisor
          </a>
          , checked 16 November 2026.
        </li>
      </ul>
    </ToolPage>
  );
}
