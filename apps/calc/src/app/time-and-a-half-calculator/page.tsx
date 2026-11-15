import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import OvertimeCalculator from "@/components/OvertimeCalculator";
import ToolPage from "@/components/ToolPage";
import { money } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("time-and-a-half-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

/** Hourly rates shown in the chart. Every other figure in the chart is computed from these. */
const CHART_RATES = [7.25, 10, 12, 15, 16, 18, 20, 22, 25, 28, 30, 35, 40, 50];
/** Salaries shown in the salary table; a standard year is 40 hours x 52 weeks = 2,080 hours. */
const SALARIES = [40_000, 50_000, 60_000, 75_000, 100_000];
const HOURS_PER_YEAR = 2_080;

const faq = [
  {
    q: "What is time and a half?",
    a: "Pay at 1.5 times your regular hourly rate. If you earn $20 an hour, time and a half is $20 x 1.5 = $30 an hour. The extra $10 is the 'half'.",
  },
  {
    q: "How do I calculate time and a half?",
    a: "Multiply your hourly rate by 1.5. To find pay for overtime hours, multiply that rate by the hours: 5 hours at $30 is $150.",
  },
  {
    q: "What is time and a half for $15 an hour?",
    a: "$22.50 an hour ($15 x 1.5). At $18 an hour it is $27.00, and at $25 an hour it is $37.50. The chart on this page lists more rates.",
  },
  {
    q: "Is time and a half the same as overtime?",
    a: "Usually, but not always. Overtime is the hours beyond a limit, and time and a half is the usual rate paid for them. Some overtime is paid at double time, and some employers pay time and a half for hours that are not overtime, such as holidays.",
  },
  {
    q: "What is double time?",
    a: "Pay at twice your regular rate. At $20 an hour, double time is $40 an hour. It is set by employer policy, union contract or state law, not by the federal overtime rule.",
  },
  {
    q: "Do I get time and a half for working holidays or weekends?",
    a: "Not under federal law. The Fair Labor Standards Act only requires it for hours over 40 in a workweek. A premium for a holiday or weekend comes from your employer's policy or contract, unless those hours also take you past 40 for the week.",
  },
  {
    q: "Do salaried employees get time and a half?",
    a: "Only if the job is non-exempt. A salary alone does not remove the right to overtime; the exemption depends on the duties of the job and the pay level. An exempt salaried employee is not owed overtime under the federal rule.",
  },
  {
    q: "How do I calculate time and a half from a salary?",
    a: "First convert the salary to an hourly rate (annual salary / 2,080 for a standard year), then multiply by 1.5. A $60,000 salary is $28.85 an hour, so time and a half is about $43.27.",
  },
  {
    q: "Is time-and-a-half pay taxed differently?",
    a: "It is ordinary wages, but for tax years 2025 through 2028 the IRS allows a deduction for the 'half' portion of overtime required by the Fair Labor Standards Act, up to $12,500 a year ($25,000 for joint filers). The deduction phases out above $150,000 of modified adjusted gross income ($300,000 for joint filers).",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="time-and-a-half-calculator"
      lede="Enter your regular hourly rate to see your time-and-a-half rate, what your overtime hours are worth, and how much of that is extra on top of regular pay."
      widget={<OvertimeCalculator mode="timehalf" />}
      faq={faq}
      related={[
        "overtime-pay-calculator",
        "hourly-paycheck-calculator",
        "salary-to-hourly-calculator",
        "hourly-to-salary-calculator",
        "pay-raise-calculator",
      ]}
    >
      <h2>What time and a half means</h2>
      <p>
        Time and a half is your regular hourly rate multiplied by 1.5. The &ldquo;time&rdquo; is your normal
        rate and the &ldquo;half&rdquo; is an extra 50% on top. At $20 an hour that is $20 + $10 = $30 an
        hour.
      </p>
      <p>
        <strong>Time and a half rate = regular hourly rate x 1.5</strong>
      </p>

      <h2>How to calculate time and a half</h2>
      <ol>
        <li>
          <strong>Find your regular hourly rate.</strong> If you are paid a salary, divide the yearly figure
          by 2,080 (40 hours x 52 weeks).
        </li>
        <li>
          <strong>Multiply it by 1.5.</strong> That is the rate for each overtime hour.
        </li>
        <li>
          <strong>Multiply by the overtime hours.</strong> That is your overtime pay before tax.
        </li>
      </ol>
      <p>
        A worked week: 45 hours at $20 an hour, with overtime after 40. The first 40 hours pay 40 x $20 =
        $800. The 5 overtime hours pay 5 x $30 = $150. The week comes to $950, which is $50 more than 45 hours
        at the regular rate. To run a whole week like this, use the{" "}
        <Link href="/overtime-pay-calculator">overtime pay calculator</Link>.
      </p>

      <h2>Time and a half chart</h2>
      <p>Rates at common hourly wages, and what 5 and 10 hours at time and a half are worth before tax.</p>
      <table>
        <thead>
          <tr>
            <th scope="col">Regular rate</th>
            <th scope="col">Time and a half (1.5x)</th>
            <th scope="col">Double time (2x)</th>
            <th scope="col">5 hours at 1.5x</th>
            <th scope="col">10 hours at 1.5x</th>
          </tr>
        </thead>
        <tbody>
          {CHART_RATES.map((r) => (
            <tr key={r}>
              <th scope="row">
                {money(r, 2)}
                {r === 7.25 && " (federal minimum wage)"}
              </th>
              <td>{money(r * 1.5, 2)}</td>
              <td>{money(r * 2, 2)}</td>
              <td>{money(r * 1.5 * 5, 2)}</td>
              <td>{money(r * 1.5 * 10, 2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Time and a half from a salary</h2>
      <p>
        Divide the yearly salary by 2,080 to get an hourly rate, then multiply by 1.5. Change the 2,080 if
        your standard week is not 40 hours; the{" "}
        <Link href="/salary-to-hourly-calculator">salary to hourly calculator</Link> does that for you.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Yearly salary</th>
            <th scope="col">Hourly rate (2,080 hours)</th>
            <th scope="col">Time and a half</th>
          </tr>
        </thead>
        <tbody>
          {SALARIES.map((s) => (
            <tr key={s}>
              <th scope="row">{money(s, 0)}</th>
              <td>{money(s / HOURS_PER_YEAR, 2)}</td>
              <td>{money((s / HOURS_PER_YEAR) * 1.5, 2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        A salary does not by itself decide whether you are owed overtime. That depends on whether the job is
        exempt, which the <Link href="/guides/how-overtime-pay-works/">guide to overtime pay</Link> explains.
      </p>

      <h2>When the law requires time and a half</h2>
      <p>
        <strong>Federal rule.</strong> The Fair Labor Standards Act says a covered employee may not work more
        than 40 hours in a workweek unless the extra hours are paid at &ldquo;not less than one and one-half
        times the regular rate&rdquo;. The count is per workweek, not per day, and the federal rule does not
        add a premium for nights, weekends or holidays.
      </p>
      <p>
        <strong>States can go further.</strong> California, for example, requires time and a half for hours
        over 8 and up to 12 in a workday and for the first 8 hours on the seventh day in a row of a workweek,
        and double time for hours over 12 in a workday and over 8 on that seventh day. Check your own
        state&apos;s labor department for the rule that applies to you.
      </p>
      <p>
        <strong>Employer policy.</strong> Many employers pay time and a half or double time for holidays or
        hard-to-fill shifts by choice or by contract. That is on top of what the law requires, so the terms
        are in your contract or handbook.
      </p>

      <h2>Tax on the extra half</h2>
      <p>
        Overtime pay is ordinary wages. For tax years 2025 through 2028 the IRS allows a deduction for the pay
        that exceeds your regular rate, the &ldquo;half&rdquo; in time and a half, when that overtime is
        required by the Fair Labor Standards Act. The most you can deduct is $12,500 a year ($25,000 for joint
        filers), and it phases out above $150,000 of modified adjusted gross income ($300,000 for joint
        filers). At $20 an hour, $10 of each $30 overtime hour is the half that can count. It is claimed on
        your tax return, so read the IRS page below for who qualifies.
      </p>

      <h2>What this calculator leaves out</h2>
      <p>
        It works on gross pay and one hourly rate. It does not take off tax, and it does not handle a regular
        rate that includes bonuses, shift differentials or two different pay rates in one week, which can
        raise the rate overtime is based on. For take-home pay after tax, use the{" "}
        <Link href="/hourly-paycheck-calculator">hourly paycheck calculator</Link>.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href="https://www.law.cornell.edu/uscode/text/29/207" rel="noopener noreferrer">
            29 U.S.C. 207, maximum hours
          </a>{" "}
          (the federal 40-hour, one-and-one-half-times rule), checked 15 November 2026.
        </li>
        <li>
          <a href="https://www.law.cornell.edu/uscode/text/29/206" rel="noopener noreferrer">
            29 U.S.C. 206, minimum wage
          </a>{" "}
          ($7.25 an hour), checked 15 November 2026.
        </li>
        <li>
          <a href="https://www.dir.ca.gov/dlse/faq_overtime.htm" rel="noopener noreferrer">
            California Department of Industrial Relations: overtime
          </a>
          , checked 15 November 2026.
        </li>
        <li>
          <a
            href="https://www.irs.gov/newsroom/one-big-beautiful-bill-act-tax-deductions-for-working-americans-and-seniors"
            rel="noopener noreferrer"
          >
            IRS: tax deductions for working Americans and seniors
          </a>{" "}
          (the overtime deduction), checked 15 November 2026.
        </li>
      </ul>
    </ToolPage>
  );
}
