import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PayConverter from "@/components/PayConverter";
import ToolPage from "@/components/ToolPage";
import { DEFAULT_SCHEDULE, convertAll, money } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("usd-salary-to-inr-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

/*
 * The rates below are made-up round numbers to show the arithmetic and how sensitive the result is to
 * the rate. They are not current exchange rates; the calculator above loads the real one.
 */
const RATE = 90;
const RATES = [80, 90, 100];
const SALARIES = [40_000, 60_000, 80_000, 100_000, 150_000];
const HOURLY = [15, 25, 40, 60];
const S = DEFAULT_SCHEDULE;
const inr = (n: number) => money(n, 0, "INR");
const inr2 = (n: number) => money(n, 2, "INR");
const SIXTY = convertAll(60_000, "annual", S);

const faq = [
  {
    q: "How do I convert a USD salary to INR?",
    a: `Multiply the dollar salary by the USD to INR exchange rate. At an example rate of ${RATE}, a $60,000 salary is 60,000 x ${RATE} = ${money(60_000 * RATE, 0, "INR")} a year. The calculator uses the live rate and also splits the result by month, week and hour.`,
  },
  {
    q: "How much is a $100,000 salary in rupees?",
    a: `It depends on the rate on the day. At example rates of 80, 90 and 100, it is ${inr(100_000 * 80)}, ${inr(100_000 * 90)} and ${inr(100_000 * 100)} a year. Enter the amount above for today's figure.`,
  },
  {
    q: "How do I convert a dollar monthly salary to INR?",
    a: `Multiply by the rate. At an example rate of ${RATE}, $5,000 a month is 5,000 x ${RATE} = ${inr(5_000 * RATE)} a month, and ${inr(5_000 * RATE * 12)} a year.`,
  },
  {
    q: "How do I convert an hourly wage in dollars to rupees?",
    a: `Choose Hourly in the Per list and enter the dollar rate. You get the hourly figure in rupees plus the annual, monthly and weekly amounts, using your own hours per week. At an example rate of ${RATE}, $25 an hour is ${inr(25 * RATE)} an hour, or ${inr(convertAll(25, "hourly", S).annual * RATE)} a year at 2,080 hours.`,
  },
  {
    q: "Is the rupee figure what lands in my bank account?",
    a: "No. It is the gross amount at the mid-market rate. Income tax, deductions, and the margin or fees of the bank or transfer service all reduce what you receive.",
  },
  {
    q: "How much does a change in the rate matter?",
    a: `On a $60,000 salary, every 1 rupee of change in the rate moves the yearly rupee amount by ${inr(60_000)}, which is ${inr(5_000)} a month. A move from 90 to 91 is ${inr(60_000)} a year.`,
  },
  {
    q: "Which rate does the calculator use?",
    a: "The latest mid-market USD to INR rate from a free public feed, loaded when you open the page. The date is shown under the result.",
  },
  {
    q: "Can I use another currency?",
    a: "Yes. Change the currency and the Also show in list to any pair, for example a pound salary shown in rupees, or a rupee salary shown in dollars.",
  },
  {
    q: "Is a dollar salary comparable with a rupee salary?",
    a: "Only roughly. The conversion gives the same amount at the exchange rate, but taxes differ and prices differ between countries, so compare after tax and against your own costs.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="usd-salary-to-inr-calculator"
      lede="Enter a salary or hourly wage in US dollars to see it in Indian rupees by year, month, week and hour. Uses live exchange rates and your own working schedule."
      widget={
        <PayConverter
          initialAmount="60000"
          initialUnit="annual"
          initialCurrency="USD"
          initialTarget="INR"
          focus="annual"
        />
      }
      faq={faq}
      related={[
        "usd-to-inr",
        "currency-converter",
        "salary-to-hourly-calculator",
        "hourly-to-salary-calculator",
        "income-tax-calculator-india",
      ]}
    >
      <h2>How to convert a dollar salary to rupees</h2>
      <p>
        The calculator converts your pay between periods first (hourly, weekly, monthly, annual) using your
        schedule, then converts each figure from dollars to rupees at the live rate. The left column is in the
        currency you chose and the right column is in the second currency.
      </p>
      <p>
        <strong>Rupee pay = dollar pay x USD to INR rate.</strong>
      </p>
      <ol>
        <li>
          <strong>Get the dollar figure for one period.</strong> $60,000 a year, or $25 an hour.
        </li>
        <li>
          <strong>Multiply by the rate.</strong> At an example rate of {RATE}, that is {inr(60_000 * RATE)} a
          year.
        </li>
        <li>
          <strong>Split it into periods.</strong> That is {inr2(SIXTY.monthly * RATE)} a month,{" "}
          {inr2(SIXTY.weekly * RATE)} a week and {inr2(SIXTY.hourly * RATE)} an hour at 2,080 hours a year.
        </li>
      </ol>
      <p>
        The rates on this page are round example numbers to show the arithmetic. They are not today&apos;s
        rate; the calculator above loads that.
      </p>

      <h2>Dollar salaries in rupees at three example rates</h2>
      <p>
        Yearly pay, with the rupee amount at an example rate of 80, 90 and 100. Rupee amounts use Indian
        grouping, where 1,00,000 is a lakh and 1,00,00,000 is a crore. The spread shows how much the rate
        matters.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Dollar salary</th>
            {RATES.map((r) => (
              <th key={r} scope="col">
                At {r}
              </th>
            ))}
            <th scope="col">Difference, 80 to 100</th>
          </tr>
        </thead>
        <tbody>
          {SALARIES.map((s) => (
            <tr key={s}>
              <th scope="row">{money(s, 0)}</th>
              {RATES.map((r) => (
                <td key={r}>{inr(s * r)}</td>
              ))}
              <td>{inr(s * 20)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Hourly dollar wages in rupees</h2>
      <p>
        For freelancers and contractors paid per hour, at an example rate of {RATE} and a 2,080-hour year.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Dollar rate per hour</th>
            <th scope="col">Rupees per hour</th>
            <th scope="col">Rupees per month</th>
            <th scope="col">Rupees per year</th>
          </tr>
        </thead>
        <tbody>
          {HOURLY.map((h) => {
            const v = convertAll(h, "hourly", S);
            return (
              <tr key={h}>
                <th scope="row">{money(h, 2)}</th>
                <td>{inr(h * RATE)}</td>
                <td>{inr(v.monthly * RATE)}</td>
                <td>{inr(v.annual * RATE)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        If you work fewer hours or weeks, change the schedule in the calculator, or work out the dollar figure
        first with the <Link href="/hourly-to-salary-calculator">hourly to salary calculator</Link>.
      </p>

      <h2>Before you compare</h2>
      <ul>
        <li>
          <strong>Compare after tax.</strong> A US salary and an Indian salary of the same rupee value are
          taxed under different rules. See the <Link href="/paycheck-calculator">paycheck calculator</Link>{" "}
          for US take-home pay and the{" "}
          <Link href="/income-tax-calculator-india">India income tax calculator</Link> for Indian tax.
        </li>
        <li>
          <strong>Compare against your costs.</strong> The same rupee amount buys different things in
          different places, so an exchange-rate conversion alone does not tell you how well off you would be.
        </li>
        <li>
          <strong>Remember the transfer.</strong> If you are paid in dollars and spend in rupees, what you
          receive depends on the rate your bank or transfer service gives, which is below the mid-market rate
          shown here. See <Link href="/guides/how-exchange-rates-work">how exchange rates work</Link>.
        </li>
      </ul>

      <h2>What this calculator leaves out</h2>
      <p>
        It converts gross pay at the mid-market rate. It does not include income tax in either country,
        benefits, bonuses, or the margin and fees on moving money between currencies. For other pairs and a
        plain amount, use the <Link href="/currency-converter">currency converter</Link> or the{" "}
        <Link href="/usd-to-inr">USD to INR converter</Link>.
      </p>
    </ToolPage>
  );
}
