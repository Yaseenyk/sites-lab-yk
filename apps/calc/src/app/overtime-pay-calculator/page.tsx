import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import OvertimeCalculator from "@/components/OvertimeCalculator";
import ToolPage from "@/components/ToolPage";
import { money, overtime } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("overtime-pay-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

/** The example week used in prose: 45 hours at $20, overtime after 40, time and a half. */
const EXAMPLE = overtime(20, 45, 40, 1.5);
/** Hours worked in the week table, at $20 an hour. */
const WEEK_HOURS = [40, 42, 45, 48, 50, 55, 60];
/** The federal exempt salary floor for most white-collar jobs, per week (29 CFR 541.600). */
const EXEMPT_WEEKLY = 684;

/** Bonus example from 29 CFR 778.110(b): $12 an hour, 46 hours, a $46 production bonus. */
const BONUS = (() => {
  const rate = 12;
  const hours = 46;
  const bonus = 46;
  const straight = rate * hours;
  const regularRate = (straight + bonus) / hours;
  const otHours = hours - 40;
  const premium = otHours * regularRate * 0.5;
  return { rate, hours, bonus, straight, regularRate, otHours, premium, total: straight + bonus + premium };
})();

const faq = [
  {
    q: "How is overtime pay calculated?",
    a: `Pay the regular rate for hours up to the overtime threshold, and the regular rate times the multiplier for hours beyond it. At $20 an hour, 45 hours with time and a half is 40 x $20 + 5 x $30 = ${money(EXAMPLE.total, 2)}.`,
  },
  {
    q: "How do I calculate overtime for a 50-hour week?",
    a: `At $15 an hour: 40 hours x $15 = $600, plus 10 hours x $22.50 = $225, which is ${money(overtime(15, 50, 40, 1.5).total, 2)}. If your employer pays double time instead, the 10 hours are worth $300 and the week is ${money(overtime(15, 50, 40, 2).total, 2)}.`,
  },
  {
    q: "When does overtime start?",
    a: "Under the federal Fair Labor Standards Act, a covered employee must be paid at least one and one-half times the regular rate for hours worked over 40 in a workweek. Some states add their own rules, such as California, which also counts hours over 8 in a workday.",
  },
  {
    q: "Does the 40-hour rule average across two weeks?",
    a: "No. The federal rule takes a single workweek as its standard and does not allow averaging over two or more weeks. If you work 30 hours one week and 50 the next, you are owed overtime for the 10 hours in the second week, even though the two weeks average 40.",
  },
  {
    q: "What counts as a workweek?",
    a: "A fixed, regularly recurring period of 168 hours: seven consecutive 24-hour periods. It does not have to be a calendar week and can start on any day and hour. Once your employer sets the start, it stays fixed.",
  },
  {
    q: "Are salaried employees entitled to overtime?",
    a: `It depends on whether the job is exempt, which turns on duties and pay, not on being paid a salary. For the federal white-collar exemptions the regulation currently sets a minimum salary of ${money(EXEMPT_WEEKLY, 0)} a week (${money(EXEMPT_WEEKLY * 52, 0)} a year), and the duties test must also be met. A salaried employee who is non-exempt is owed overtime.`,
  },
  {
    q: "Is a bonus part of the rate overtime is based on?",
    a: "Often, yes. The federal regular rate includes all pay for the work except specific exclusions. A bonus that is promised in advance, such as an attendance or production bonus, is part of it. A bonus left entirely to the employer's discretion, in both whether it is paid and how much, is not. The example on this page works through one.",
  },
  {
    q: "Is overtime taxed at a higher rate?",
    a: "No. It is ordinary wages. A larger check can lead to more tax being withheld that period, but there is no special overtime tax rate. The time and a half calculator page covers a separate deduction for the extra half of overtime.",
  },
  {
    q: "How do I enter double time or a daily rule?",
    a: "Choose 2x in the multiplier list for double time. To model a daily rule, set the threshold to the daily limit (for example 8) and enter the hours for that one day, then add the days together.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="overtime-pay-calculator"
      lede="Enter your hourly rate and the hours you worked this week to see regular pay, overtime pay and the total. Change the threshold or multiplier for your state or contract."
      widget={<OvertimeCalculator mode="overtime" />}
      faq={faq}
      related={[
        "time-and-a-half-calculator",
        "hourly-paycheck-calculator",
        "hourly-to-salary-calculator",
        "salary-calculator",
        "pay-raise-calculator",
      ]}
    >
      <h2>What overtime pay is</h2>
      <p>
        Overtime pay is the higher rate paid for hours beyond a weekly limit. In the US the usual limit is 40
        hours in a workweek and the usual rate is one and a half times your regular hourly rate, called time
        and a half.
      </p>
      <p>
        <strong>Weekly pay = regular hours x rate + overtime hours x rate x multiplier.</strong> Regular hours
        are the hours up to the threshold (40 by default). Overtime hours are everything beyond it. Time and a
        half uses a multiplier of 1.5 and double time uses 2.
      </p>

      <h2>How to calculate overtime pay</h2>
      <ol>
        <li>
          <strong>Split the week.</strong> Hours up to 40 are regular hours. Hours past 40 are overtime hours.
        </li>
        <li>
          <strong>Pay regular hours at your rate.</strong> 40 hours at $20 is $800.
        </li>
        <li>
          <strong>Pay overtime hours at the higher rate.</strong> $20 x 1.5 = $30, so each overtime hour pays
          $30.
        </li>
        <li>
          <strong>Add them.</strong> The two parts make the week&apos;s gross pay.
        </li>
      </ol>
      <p>
        Worked example: 45 hours at $20. Regular pay is {EXAMPLE.regularHours} x $20 ={" "}
        {money(EXAMPLE.regularPay, 2)}. Overtime pay is {EXAMPLE.overtimeHours} x $30 ={" "}
        {money(EXAMPLE.overtimePay, 2)}. The week comes to {money(EXAMPLE.total, 2)}. For the rate on its own,
        or a chart of common wages, use the{" "}
        <Link href="/time-and-a-half-calculator">time and a half calculator</Link>.
      </p>

      <h2>Weekly pay at $20 an hour, by hours worked</h2>
      <p>
        The same rate, with overtime after 40 hours. The last column is the part of the week paid at time and
        a half.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Hours worked</th>
            <th scope="col">Pay at 1.5x</th>
            <th scope="col">Pay at 2x</th>
            <th scope="col">Overtime pay at 1.5x</th>
          </tr>
        </thead>
        <tbody>
          {WEEK_HOURS.map((h) => {
            const x15 = overtime(20, h, 40, 1.5);
            const x2 = overtime(20, h, 40, 2);
            return (
              <tr key={h}>
                <th scope="row">{h}</th>
                <td>{money(x15.total, 2)}</td>
                <td>{money(x2.total, 2)}</td>
                <td>{money(x15.overtimePay, 2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>The rules that decide whether you get overtime</h2>
      <p>
        <strong>The 40-hour week.</strong> The Fair Labor Standards Act says a covered employee may not work
        more than 40 hours in a workweek unless the extra hours are paid at &ldquo;not less than one and
        one-half times the regular rate&rdquo;.
      </p>
      <p>
        <strong>Each week stands alone.</strong> The Act uses a single workweek as its standard and does not
        allow hours to be averaged over two or more weeks. A 30-hour week followed by a 50-hour week has 10
        overtime hours in the second week.
      </p>
      <p>
        <strong>The workweek.</strong> It is a fixed, regularly recurring period of 168 hours (seven
        consecutive 24-hour periods). It may begin on any day and at any hour, and once set it stays fixed.
      </p>
      <p>
        <strong>Exempt jobs.</strong> Some salaried jobs are exempt from overtime. For the federal executive,
        administrative and professional exemptions, the employee must be paid on a salary basis of at least{" "}
        {money(EXEMPT_WEEKLY, 0)} a week, which is {money(EXEMPT_WEEKLY * 52, 0)} a year, and must also meet a
        duties test. A job title or a salary alone does not make someone exempt. The{" "}
        <Link href="/guides/how-overtime-pay-works/">guide to overtime pay</Link> covers the exemptions in
        more detail.
      </p>

      <h2>Overtime rules differ by state</h2>
      <p>
        The federal rule counts hours over 40 in a week. A state can go further. California, for example,
        requires:
      </p>
      <ul>
        <li>
          one and one-half times the regular rate for hours over 8 and up to 12 in a workday, and for the
          first 8 hours on the seventh consecutive day of work in a workweek; and
        </li>
        <li>
          double the regular rate for hours over 12 in a workday, and for hours over 8 on that seventh day.
        </li>
      </ul>
      <p>
        At $20 an hour, a 10-hour day in California is 8 x $20 + 2 x $30 = {money(8 * 20 + 2 * 30, 2)} before
        any weekly overtime. Other states have their own rules and exceptions, so check your state labor
        department. To model a daily rule here, set the threshold to the daily limit and enter that day&apos;s
        hours.
      </p>

      <h2>When a bonus changes your overtime rate</h2>
      <p>
        Overtime is based on your <em>regular rate</em>, which is your total pay for the week divided by the
        hours worked, not always the base wage. A bonus promised in advance, such as an attendance or
        production bonus, counts towards it. A bonus left entirely to the employer&apos;s discretion, in both
        whether and how much, does not.
      </p>
      <p>
        The example in the federal regulations: a worker paid {money(BONUS.rate, 0)} an hour works{" "}
        {BONUS.hours} hours and earns a {money(BONUS.bonus, 0)} production bonus. Straight-time pay is{" "}
        {BONUS.hours} x {money(BONUS.rate, 0)} = {money(BONUS.straight, 0)}. Adding the bonus gives{" "}
        {money(BONUS.straight + BONUS.bonus, 0)}, and dividing by {BONUS.hours} hours gives a regular rate of{" "}
        {money(BONUS.regularRate, 2)}. The {BONUS.otHours} overtime hours earn an extra half of that rate:{" "}
        {BONUS.otHours} x {money(BONUS.regularRate / 2, 2)} = {money(BONUS.premium, 2)}. The week&apos;s total
        is {money(BONUS.total, 0)}. This calculator does not do that step for you; it uses the single rate you
        type in.
      </p>

      <h2>What this calculator leaves out</h2>
      <p>
        It works on gross pay and one rate. It does not take off tax, handle two pay rates in the same week,
        add shift differentials or bonuses to the regular rate, or apply state daily overtime on its own.
        Treat the result as an estimate and check your payslip. For take-home pay, use the{" "}
        <Link href="/hourly-paycheck-calculator">hourly paycheck calculator</Link>, and to turn a wage into a
        yearly figure use the <Link href="/hourly-to-salary-calculator">hourly to salary calculator</Link>.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href="https://www.law.cornell.edu/uscode/text/29/207" rel="noopener noreferrer">
            29 U.S.C. 207, maximum hours
          </a>{" "}
          (40 hours, one and one-half times the regular rate), checked 16 November 2026.
        </li>
        <li>
          <a href="https://www.law.cornell.edu/cfr/text/29/778.104" rel="noopener noreferrer">
            29 CFR 778.104, each workweek stands alone
          </a>{" "}
          (no averaging), checked 16 November 2026.
        </li>
        <li>
          <a href="https://www.law.cornell.edu/cfr/text/29/778.105" rel="noopener noreferrer">
            29 CFR 778.105, determining the workweek
          </a>{" "}
          (168 hours), checked 16 November 2026.
        </li>
        <li>
          <a href="https://www.law.cornell.edu/cfr/text/29/778.110" rel="noopener noreferrer">
            29 CFR 778.110, hourly rate and bonus
          </a>{" "}
          (the bonus example) and{" "}
          <a href="https://www.law.cornell.edu/cfr/text/29/778.211" rel="noopener noreferrer">
            778.211, discretionary bonuses
          </a>
          , checked 16 November 2026.
        </li>
        <li>
          <a href="https://www.law.cornell.edu/cfr/text/29/541.600" rel="noopener noreferrer">
            29 CFR 541.600, amount of salary required
          </a>{" "}
          ($684 a week), checked 16 November 2026.
        </li>
        <li>
          <a href="https://www.dir.ca.gov/dlse/faq_overtime.htm" rel="noopener noreferrer">
            California Department of Industrial Relations: overtime
          </a>
          , checked 16 November 2026.
        </li>
      </ul>
    </ToolPage>
  );
}
