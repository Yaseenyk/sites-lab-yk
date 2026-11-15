import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PayConverter from "@/components/PayConverter";
import ToolPage from "@/components/ToolPage";
import { DEFAULT_SCHEDULE, convertAll, money, toAnnual, type Unit } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("salary-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const S = DEFAULT_SCHEDULE;
/** One pay figure (a $60,000 salary) shown in every period, all computed. */
const FROM_60K = convertAll(60_000, "annual", S);
/** $25 an hour on the standard schedule. */
const FROM_25 = convertAll(25, "hourly", S);
/** Salaries shown in the comparison table. */
const SALARIES = [30_000, 45_000, 60_000, 80_000, 100_000, 150_000];
/** Schedules shown for one hourly rate. */
const SCHEDULES: { label: string; hours: number; days: number; weeks: number }[] = [
  { label: "Full time, all year", hours: 40, days: 5, weeks: 52 },
  { label: "Full time, 2 weeks unpaid", hours: 40, days: 5, weeks: 50 },
  { label: "35 hours a week", hours: 35, days: 5, weeks: 52 },
  { label: "Part time, 30 hours", hours: 30, days: 4, weeks: 52 },
  { label: "Part time, 20 hours", hours: 20, days: 3, weeks: 52 },
];
/** The periods listed in the formula table and what each one means. */
const PERIODS: { unit: Unit; label: string; perYear: string }[] = [
  { unit: "weekly", label: "Weekly", perYear: "52 paychecks" },
  { unit: "biweekly", label: "Bi-weekly", perYear: "26 paychecks" },
  { unit: "semimonthly", label: "Semi-monthly", perYear: "24 paychecks" },
  { unit: "monthly", label: "Monthly", perYear: "12 paychecks" },
];

const faq = [
  {
    q: "How do I convert hourly pay to annual salary?",
    a: `Multiply your hourly rate by the hours you work in a week and by the weeks you work in a year. At 40 hours and 52 weeks that is 2,080 hours, so $25 an hour is ${money(FROM_25.annual, 0)} a year.`,
  },
  {
    q: "How do I convert an annual salary to monthly pay?",
    a: `Divide by 12. A $60,000 salary is ${money(FROM_60K.monthly, 2)} a month. Do not multiply by 4 weeks; a year has 52 weeks, which is about 4.33 a month.`,
  },
  {
    q: "Why is monthly pay not just four weeks of pay?",
    a: `A year has 52 weeks, which is about 4.33 weeks a month, not 4. At $25 an hour, four weeks is ${money(FROM_25.weekly * 4, 2)}, but the true monthly figure is ${money(FROM_25.monthly, 2)}.`,
  },
  {
    q: "What is the difference between bi-weekly and semi-monthly?",
    a: `Bi-weekly means every two weeks, which is 26 paychecks a year. Semi-monthly means twice a month, which is 24. A $60,000 salary pays ${money(FROM_60K.biweekly, 2)} per bi-weekly check and ${money(FROM_60K.semimonthly, 2)} per semi-monthly check. The yearly total is the same.`,
  },
  {
    q: "Why do some years have 27 pay dates?",
    a: "With bi-weekly pay there are usually 26 pay dates a year, but over several years some calendar years have 27, because 52 weeks is 364 days and a year has 365 or 366. The US Office of Personnel Management notes this for federal pay.",
  },
  {
    q: "How do I convert daily pay to annual pay?",
    a: `Multiply the daily rate by the days you work in a week and by the weeks in a year. At ${money(FROM_60K.daily, 2)} a day, five days a week for 52 weeks, that is ${money(toAnnual(FROM_60K.daily, "daily", S), 0)}.`,
  },
  {
    q: "Can I change the hours or weeks?",
    a: "Yes. Edit hours per week, days per week and weeks per year. Use fewer weeks if you take unpaid time off, and fewer hours for part-time work. Paid holidays and paid leave count as worked.",
  },
  {
    q: "Does this include overtime or bonuses?",
    a: "No. It assumes the same pay every period. Use the overtime pay calculator to add hours at a higher rate, and add bonuses to the annual figure yourself.",
  },
  {
    q: "Is this before or after tax?",
    a: "Before. These are gross figures. For take-home pay after tax, use the paycheck calculator.",
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
        "paycheck-calculator",
        "pay-raise-calculator",
        "overtime-pay-calculator",
      ]}
    >
      <h2>How the conversion works</h2>
      <p>
        Every conversion goes through annual pay. The calculator turns your figure into a year, then divides
        the year into the period you want. With a schedule of H hours a week, D days a week and W weeks a
        year:
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">From</th>
            <th scope="col">Annual pay</th>
            <th scope="col">Back to this period</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Hourly</th>
            <td>rate x H x W</td>
            <td>annual / (H x W)</td>
          </tr>
          <tr>
            <th scope="row">Daily</th>
            <td>rate x D x W</td>
            <td>annual / (D x W)</td>
          </tr>
          <tr>
            <th scope="row">Weekly</th>
            <td>rate x W</td>
            <td>annual / W</td>
          </tr>
          <tr>
            <th scope="row">Bi-weekly</th>
            <td>rate x W / 2</td>
            <td>annual / (W / 2)</td>
          </tr>
          <tr>
            <th scope="row">Semi-monthly</th>
            <td>rate x 24</td>
            <td>annual / 24</td>
          </tr>
          <tr>
            <th scope="row">Monthly</th>
            <td>rate x 12</td>
            <td>annual / 12</td>
          </tr>
          <tr>
            <th scope="row">Quarterly</th>
            <td>rate x 4</td>
            <td>annual / 4</td>
          </tr>
        </tbody>
      </table>

      <h2>Example: a $60,000 salary in every period</h2>
      <p>
        At 40 hours a week, 5 days a week and 52 weeks a year, a $60,000 salary is the same pay written
        different ways:
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Period</th>
            <th scope="col">Pay</th>
            <th scope="col">Count in a year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Hourly</th>
            <td>{money(FROM_60K.hourly, 2)}</td>
            <td>2,080 hours</td>
          </tr>
          <tr>
            <th scope="row">Daily</th>
            <td>{money(FROM_60K.daily, 2)}</td>
            <td>260 days</td>
          </tr>
          {PERIODS.map((p) => (
            <tr key={p.unit}>
              <th scope="row">{p.label}</th>
              <td>{money(FROM_60K[p.unit], 2)}</td>
              <td>{p.perYear}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">Quarterly</th>
            <td>{money(FROM_60K.quarterly, 2)}</td>
            <td>4 payments</td>
          </tr>
        </tbody>
      </table>
      <p>
        A bi-weekly check is smaller than a semi-monthly one because there are more of them. A bi-weekly
        schedule usually has two months a year with three paychecks; a semi-monthly schedule never does. The
        US Office of Personnel Management notes that there are usually 26 bi-weekly pay dates a year, but that
        some calendar years have 27.
      </p>

      <h2>Common salaries as hourly, weekly and monthly pay</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Annual salary</th>
            <th scope="col">Monthly</th>
            <th scope="col">Bi-weekly</th>
            <th scope="col">Weekly</th>
            <th scope="col">Hourly</th>
          </tr>
        </thead>
        <tbody>
          {SALARIES.map((s) => {
            const v = convertAll(s, "annual", S);
            return (
              <tr key={s}>
                <th scope="row">{money(s, 0)}</th>
                <td>{money(v.monthly, 2)}</td>
                <td>{money(v.biweekly, 2)}</td>
                <td>{money(v.weekly, 2)}</td>
                <td>{money(v.hourly, 2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>The same $25 an hour on different schedules</h2>
      <p>
        Hours and weeks change the yearly figure, so set your own schedule in the calculator. Here is $25 an
        hour on five common ones.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Schedule</th>
            <th scope="col">Annual</th>
            <th scope="col">Monthly</th>
            <th scope="col">Weekly</th>
          </tr>
        </thead>
        <tbody>
          {SCHEDULES.map((s) => {
            const v = convertAll(25, "hourly", {
              hoursPerWeek: s.hours,
              daysPerWeek: s.days,
              weeksPerYear: s.weeks,
            });
            return (
              <tr key={s.label}>
                <th scope="row">
                  {s.label} ({s.hours} hours, {s.weeks} weeks)
                </th>
                <td>{money(v.annual, 0)}</td>
                <td>{money(v.monthly, 2)}</td>
                <td>{money(v.weekly, 2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>What this calculator leaves out</h2>
      <p>
        It gives gross pay for a steady schedule. It does not include overtime, bonuses, commissions or tips,
        and it does not take off tax or deductions. For one conversion in detail, see the{" "}
        <Link href="/hourly-to-salary-calculator">hourly to salary</Link> and{" "}
        <Link href="/salary-to-hourly-calculator">salary to hourly</Link> calculators, or read{" "}
        <Link href="/guides/salary-to-hourly/">how the 2,080-hour rule works</Link>. For what reaches your
        bank account, use the <Link href="/paycheck-calculator">paycheck calculator</Link>.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a
            href="https://www.opm.gov/policy-data-oversight/pay-leave/pay-administration/fact-sheets/computing-hourly-rates-of-pay-using-the-2087-hour-divisor/"
            rel="noopener noreferrer"
          >
            US Office of Personnel Management: computing hourly rates of pay using the 2,087-hour divisor
          </a>{" "}
          (26 pay dates a year, sometimes 27), checked 16 November 2026.
        </li>
      </ul>
    </ToolPage>
  );
}
