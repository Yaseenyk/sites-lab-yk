import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import RaiseCalculator from "@/components/RaiseCalculator";
import ToolPage from "@/components/ToolPage";
import { money, percent, percentChange, projection, raiseByAmount, raiseByPercent } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("pay-raise-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

/** The example salary used throughout. */
const BASE = 60_000;
/** Raise percentages shown in the table. */
const RAISES = [1, 2, 3, 4, 5, 7, 10];
/** Illustrative inflation figures for the "real raise" table. These are examples, not forecasts. */
const INFLATION_EXAMPLES = [2, 3, 4, 5];
/** A pay cut and the raise needed to climb back. */
const CUTS = [5, 10, 15, 20];
const FIVE_YEARS = projection(BASE, 3, 5);
/** Real (inflation-adjusted) change from a nominal raise and an inflation rate, in percent. */
const realChange = (raisePct: number, inflationPct: number) =>
  ((1 + raisePct / 100) / (1 + inflationPct / 100) - 1) * 100;

const faq = [
  {
    q: "How do I calculate a percentage raise?",
    a: `Multiply your current pay by 1 plus the raise as a decimal. A 3% raise on $50,000 is $50,000 x 1.03 = ${money(raiseByPercent(50_000, 3), 0)}, an increase of ${money(raiseByPercent(50_000, 3) - 50_000, 0)}.`,
  },
  {
    q: "How do I find what percent raise I got?",
    a: `Subtract your old pay from your new pay, divide by your old pay, and multiply by 100. Going from $50,000 to $55,000 is ($55,000 - $50,000) / $50,000 x 100 = ${percent(percentChange(50_000, 55_000))}.`,
  },
  {
    q: "What percent is a $5,000 raise?",
    a: `It depends on the starting pay. On $50,000 it is ${percent(percentChange(50_000, raiseByAmount(50_000, 5_000)))}; on $80,000 it is ${percent(percentChange(80_000, raiseByAmount(80_000, 5_000)), 2)}; on $100,000 it is ${percent(percentChange(100_000, raiseByAmount(100_000, 5_000)))}.`,
  },
  {
    q: "Does a raise work the same for hourly pay?",
    a: `Yes. The percentage is applied to the rate, so a 4% raise on $20.00 an hour gives ${money(raiseByPercent(20, 4), 2)} an hour. Multiply by your weekly hours to see the effect on a paycheck: at 40 hours that is ${money((raiseByPercent(20, 4) - 20) * 40, 2)} more a week.`,
  },
  {
    q: "How much more per paycheck is a raise?",
    a: `Divide the yearly increase by the number of paychecks. A raise from $60,000 to ${money(raiseByPercent(BASE, 3), 0)} adds ${money((raiseByPercent(BASE, 3) - BASE) / 26, 2)} to each bi-weekly check and ${money((raiseByPercent(BASE, 3) - BASE) / 52, 2)} a week, before tax.`,
  },
  {
    q: "Is the result before or after tax?",
    a: "Before. The calculator works on gross pay. Your take-home increase will be smaller because income tax and payroll deductions apply to the extra pay. The paycheck calculator shows the after-tax difference.",
  },
  {
    q: "How big does a raise need to be to keep up with inflation?",
    a: `At least as large as the rate prices are rising. If prices rise 3% and your pay rises 3%, your buying power is unchanged. A raise of 2% when prices rise 3% is a real change of ${percent(realChange(2, 3), 2)}, which is a small pay cut in buying power.`,
  },
  {
    q: "If my pay was cut, what raise gets me back?",
    a: `More than the size of the cut, because the raise applies to a smaller number. After a 10% cut you need a ${percent(100 / (1 - 0.1) - 100, 2)} raise to get back to where you were.`,
  },
  {
    q: "What is a compounding raise?",
    a: `The same percentage raise each year, each applied to the previous year's pay. Three years of 3% on $60,000 gives ${money(projection(BASE, 3, 3)[2] ?? 0, 0)}, which is more than three separate ${money(raiseByPercent(BASE, 3) - BASE, 0)} increases would give (${money(BASE + 3 * (raiseByPercent(BASE, 3) - BASE), 0)}).`,
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="pay-raise-calculator"
      lede="Enter your current pay and the raise to see your new pay, or enter your old and new pay to find the percent raise. Works for salary and hourly wages."
      widget={<RaiseCalculator />}
      faq={faq}
      related={[
        "salary-calculator",
        "paycheck-calculator",
        "hourly-to-salary-calculator",
        "salary-to-hourly-calculator",
        "overtime-pay-calculator",
      ]}
    >
      <h2>How to calculate a pay raise</h2>
      <p>Three modes cover the usual questions:</p>
      <ul>
        <li>
          <strong>Raise by %:</strong> new pay = current pay x (1 + raise / 100). It also shows what your pay
          becomes if you get the same percentage raise each year for five years, compounding.
        </li>
        <li>
          <strong>Raise by amount:</strong> new pay = current pay + raise. The calculator reports the raise as
          a percentage of your current pay.
        </li>
        <li>
          <strong>Find the % raise:</strong> raise % = (new pay - current pay) / current pay x 100. A negative
          result means a pay cut.
        </li>
      </ul>
      <p>
        Worked example: a 3% raise on {money(BASE, 0)}. {money(BASE, 0)} x 1.03 ={" "}
        {money(raiseByPercent(BASE, 3), 0)}, an increase of {money(raiseByPercent(BASE, 3) - BASE, 0)} a year.
        Going the other way, from {money(BASE, 0)} to {money(raiseByAmount(BASE, 2_500), 0)} is a{" "}
        {percent(percentChange(BASE, raiseByAmount(BASE, 2_500)))} raise.
      </p>

      <h2>What a raise is worth on {money(BASE, 0)}</h2>
      <p>
        The same starting salary at different raise percentages, with the extra amount per month and per week,
        before tax.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Raise</th>
            <th scope="col">New yearly pay</th>
            <th scope="col">Extra per year</th>
            <th scope="col">Extra per month</th>
            <th scope="col">Extra per week</th>
          </tr>
        </thead>
        <tbody>
          {RAISES.map((r) => {
            const next = raiseByPercent(BASE, r);
            const extra = next - BASE;
            return (
              <tr key={r}>
                <th scope="row">{r}%</th>
                <td>{money(next, 0)}</td>
                <td>{money(extra, 0)}</td>
                <td>{money(extra / 12, 2)}</td>
                <td>{money(extra / 52, 2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>A raise every year compounds</h2>
      <p>
        A percentage raise is applied to last year&apos;s pay, so the gains build on each other. Five years of
        3% raises on {money(BASE, 0)}:
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">After</th>
            <th scope="col">Yearly pay</th>
            <th scope="col">Total gain so far</th>
          </tr>
        </thead>
        <tbody>
          {FIVE_YEARS.map((pay, i) => (
            <tr key={i}>
              <th scope="row">Year {i + 1}</th>
              <td>{money(pay, 0)}</td>
              <td>{money(pay - BASE, 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Is your raise a real raise?</h2>
      <p>
        Prices change too, so a raise that matches the rise in prices leaves your buying power unchanged. The
        real change is (1 + raise) / (1 + inflation) - 1. The inflation rates below are examples to show the
        arithmetic, not forecasts; use the figure that applies to you.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Your raise</th>
            {INFLATION_EXAMPLES.map((i) => (
              <th key={i} scope="col">
                If prices rise {i}%
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[2, 3, 4, 5, 7].map((r) => (
            <tr key={r}>
              <th scope="row">{r}%</th>
              {INFLATION_EXAMPLES.map((i) => (
                <td key={i}>{percent(realChange(r, i), 2)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Getting back after a pay cut</h2>
      <p>
        A percentage cut and the same percentage raise do not cancel out, because the raise applies to the
        lower pay.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Pay cut</th>
            <th scope="col">Pay after the cut</th>
            <th scope="col">Raise needed to get back</th>
          </tr>
        </thead>
        <tbody>
          {CUTS.map((c) => (
            <tr key={c}>
              <th scope="row">{c}%</th>
              <td>{money(BASE * (1 - c / 100), 0)}</td>
              <td>{percent(100 / (1 - c / 100) - 100, 2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>What this calculator leaves out</h2>
      <p>
        It works on gross pay. A raise adds less to take-home pay than to gross pay because tax and payroll
        deductions apply to it. To see the per-period effect, convert the new figure with the{" "}
        <Link href="/salary-calculator">salary calculator</Link>, and to see the after-tax effect use the{" "}
        <Link href="/paycheck-calculator">paycheck calculator</Link> with the old and new salary.
      </p>
    </ToolPage>
  );
}
