import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import OvertimeCalculator from "@/components/OvertimeCalculator";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("overtime-pay-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How is overtime pay calculated?",
    a: "Pay the regular rate for hours up to the overtime threshold, and the regular rate times the multiplier for hours beyond it. At $20 an hour, 45 hours with time and a half is 40 x $20 + 5 x $30 = $950.",
  },
  {
    q: "When does overtime start?",
    a: "Under the federal Fair Labor Standards Act (FLSA), covered non-exempt employees must be paid at least one and a half times their regular rate for hours worked over 40 in a workweek. Some states have stricter rules, such as California, which also counts hours over 8 in a day.",
  },
  {
    q: "Does the 40-hour rule average across two weeks?",
    a: "No. Each workweek stands on its own under the federal rule. Working 50 hours one week and 30 the next still means 10 hours of overtime in the first week.",
  },
  {
    q: "Are salaried employees entitled to overtime?",
    a: "It depends on whether the job is exempt, which turns on duties and salary level, not on being paid a salary. Many salaried employees are non-exempt and are owed overtime.",
  },
  {
    q: "Is this before or after tax?",
    a: "Before. Overtime is taxed like other pay, and withholding on a larger check can look higher, but the amount is not taxed at a special rate.",
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
        "hourly-to-salary-calculator",
        "salary-calculator",
        "pay-raise-calculator",
      ]}
    >
      <h2>The formula</h2>
      <p>
        <strong>Weekly pay = regular hours x rate + overtime hours x rate x multiplier.</strong> Regular hours
        are the hours up to the threshold (40 by default) and overtime hours are everything beyond it. Time
        and a half uses a multiplier of 1.5; double time uses 2.
      </p>

      <h2>Examples</h2>
      <table>
        <thead>
          <tr>
            <th>Rate</th>
            <th>Hours</th>
            <th>Multiplier</th>
            <th>Weekly pay</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$20.00</td>
            <td>45</td>
            <td>1.5x</td>
            <td>$950.00</td>
          </tr>
          <tr>
            <td>$15.00</td>
            <td>50</td>
            <td>1.5x</td>
            <td>$825.00</td>
          </tr>
          <tr>
            <td>$15.00</td>
            <td>50</td>
            <td>2x</td>
            <td>$900.00</td>
          </tr>
        </tbody>
      </table>

      <h2>Overtime rules differ by state</h2>
      <p>
        The federal rule counts hours over 40 in a workweek. A few states also count hours in a single day, so
        the same week can pay differently depending on where you work:
      </p>
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>Daily overtime rule (general case)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>California</td>
            <td>Over 8 hours in a day at time and a half; over 12 hours at double time</td>
          </tr>
          <tr>
            <td>Alaska</td>
            <td>Over 8 hours in a day, for covered employers</td>
          </tr>
          <tr>
            <td>Nevada</td>
            <td>Over 8 hours in a day for employees below a wage threshold</td>
          </tr>
          <tr>
            <td>Colorado</td>
            <td>Over 12 hours in a day, as well as over 40 in a week</td>
          </tr>
        </tbody>
      </table>
      <p>
        Exceptions, exemptions and thresholds apply, and rules change, so confirm with your state labor
        department. To model a daily rule, set the threshold to the daily limit and enter that day&apos;s
        hours.
      </p>

      <h2>What this calculator does not cover</h2>
      <p>
        The regular rate used to compute overtime is not always your base wage: some bonuses and shift
        differentials can be part of it. State rules also differ, for example on daily overtime. Treat the
        result as an estimate and check your payslip or your state labor department for the exact rule. For
        the rule in plain language, read{" "}
        <Link href="/guides/how-overtime-pay-works">how overtime pay works in the US</Link>.
      </p>
    </ToolPage>
  );
}
