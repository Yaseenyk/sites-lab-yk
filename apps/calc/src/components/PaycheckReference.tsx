import {
  ADDITIONAL_MEDICARE_THRESHOLD,
  BRACKETS,
  FILING_LABEL,
  SS_WAGE_BASE,
  STANDARD_DEDUCTION,
  TAX_YEAR,
  paycheck,
  type FilingStatus,
} from "@/lib/paycheck";
import { FLAT_TAX_STATES, NO_TAX_STATES } from "@/lib/states";
import { money } from "@/lib/pay";

const STATUSES: FilingStatus[] = ["single", "married", "head"];

/** Salaries shown in the example table; the figures are computed, never typed in. */
const EXAMPLE_SALARIES = [30_000, 45_000, 60_000, 80_000, 100_000, 150_000];

export function ExampleTable() {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Yearly salary</th>
          <th scope="col">Federal tax</th>
          <th scope="col">Social Security + Medicare</th>
          <th scope="col">Take-home, per year</th>
          <th scope="col">Take-home, every 2 weeks</th>
        </tr>
      </thead>
      <tbody>
        {EXAMPLE_SALARIES.map((salary) => {
          const p = paycheck({
            annualGross: salary,
            periodsPerYear: 26,
            status: "single",
            retirement: 0,
            benefits: 0,
            afterTax: 0,
            statePercent: 0,
          });
          return (
            <tr key={salary}>
              <th scope="row">{money(salary, 0)}</th>
              <td>{money(p.annual.federal, 0)}</td>
              <td>{money(p.annual.socialSecurity + p.annual.medicare, 0)}</td>
              <td>{money(p.annual.net, 0)}</td>
              <td>{money(p.perPeriod.net, 2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function PaycheckReference() {
  return (
    <>
      <h2>How a paycheck is calculated</h2>
      <ol>
        <li>
          <strong>Start with gross pay</strong>, the amount before anything is taken out.
        </li>
        <li>
          <strong>Subtract pre-tax deductions.</strong> Retirement contributions such as a 401(k) lower the
          pay your income tax is based on. Health premiums and similar benefits also lower the pay Social
          Security and Medicare are based on.
        </li>
        <li>
          <strong>Subtract the standard deduction</strong> to get taxable income (
          {money(STANDARD_DEDUCTION.single, 0)} single, {money(STANDARD_DEDUCTION.married, 0)} married filing
          jointly, {money(STANDARD_DEDUCTION.head, 0)} head of household in {TAX_YEAR}).
        </li>
        <li>
          <strong>Apply the tax brackets.</strong> Each rate applies only to the slice of income inside its
          bracket, not to all of it.
        </li>
        <li>
          <strong>Add Social Security and Medicare</strong> (together called FICA).
        </li>
        <li>
          <strong>Add state and local tax,</strong> then any after-tax deductions. What is left is take-home
          pay.
        </li>
      </ol>

      <h2>{TAX_YEAR} federal income tax brackets</h2>
      <p>
        The rate applies to taxable income inside each range. These are the figures the IRS published for{" "}
        {TAX_YEAR} in Revenue Procedure 2025-32.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Rate</th>
            {STATUSES.map((s) => (
              <th key={s} scope="col">
                {FILING_LABEL[s]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BRACKETS.single.map((b, i) => (
            <tr key={b.rate}>
              <th scope="row">{(b.rate * 100).toFixed(0)}%</th>
              {STATUSES.map((s) => {
                const list = BRACKETS[s];
                const from = i === 0 ? 0 : (list[i - 1]?.upTo ?? 0);
                const to = list[i]?.upTo ?? Infinity;
                return (
                  <td key={s}>
                    {to === Infinity ? `Over ${money(from, 0)}` : `${money(from, 0)} to ${money(to, 0)}`}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Social Security and Medicare</h2>
      <ul>
        <li>
          <strong>Social Security:</strong> 6.2% of wages, up to {money(SS_WAGE_BASE, 0)} a year in {TAX_YEAR}
          . Pay above that is not charged Social Security tax.
        </li>
        <li>
          <strong>Medicare:</strong> 1.45% of all wages, plus an extra 0.9% on wages above{" "}
          {money(ADDITIONAL_MEDICARE_THRESHOLD, 0)}.
        </li>
        <li>Your employer pays a matching share on top. It does not come out of your check.</li>
      </ul>

      <h2>State income tax</h2>
      <p>
        State rules differ, so this is the part to check against your own state. {NO_TAX_STATES.length} states
        do not tax wages: {NO_TAX_STATES.map((s) => s.name).join(", ")}. {FLAT_TAX_STATES.length} states
        charge one flat rate, and the calculator fills those in when you pick the state. The rest use
        graduated rates, so enter your own percentage. Many cities and counties add a local tax, which you can
        include in the same box.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">State with a flat rate</th>
            <th scope="col">{TAX_YEAR} rate</th>
          </tr>
        </thead>
        <tbody>
          {FLAT_TAX_STATES.map((s) => (
            <tr key={s.name}>
              <th scope="row">{s.name}</th>
              <td>{s.percent}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>What this estimate leaves out</h2>
      <p>
        Real withholding depends on the Form W-4 you gave your employer and on IRS Publication 15-T, so a
        paycheck can differ from this estimate by a few dollars. The calculator does not include the child tax
        credit or other credits, extra income, overtime or bonuses, state standard deductions or exemptions,
        or payroll taxes some states add (such as state disability insurance). Use it to plan, and your pay
        stub for the exact figure.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href="https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" rel="noopener noreferrer">
            IRS Revenue Procedure 2025-32
          </a>{" "}
          (brackets and standard deduction), checked 4 November 2026.
        </li>
        <li>
          <a href="https://www.ssa.gov/oact/cola/cbb.html" rel="noopener noreferrer">
            Social Security Administration: contribution and benefit base
          </a>
          , checked 4 November 2026.
        </li>
        <li>
          <a href="https://www.irs.gov/taxtopics/tc751" rel="noopener noreferrer">
            IRS Topic 751: Social Security and Medicare withholding rates
          </a>
          .
        </li>
        <li>
          <a
            href="https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/"
            rel="noopener noreferrer"
          >
            Tax Foundation: state income tax rates for 2026
          </a>
          , checked 4 November 2026.
        </li>
      </ul>
    </>
  );
}
