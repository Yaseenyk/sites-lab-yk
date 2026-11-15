import Link from "next/link";
import { AdSlot, pageMetadata } from "@sites/shell";
import GuideHead from "@/components/GuideHead";
import { AD_SLOT_CONTENT, site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "How to Convert Salary to Hourly Pay (the 2,080-Hour Rule)",
  description:
    "How to turn an annual salary into an hourly wage and back, why 2,080 hours is the standard, and when to use a different number.",
  path: "/guides/salary-to-hourly/",
  type: "article",
});

export default function Page() {
  return (
    <>
      <GuideHead slug="salary-to-hourly" />
      <article className="doc">
        <h1>How to convert salary to hourly pay (the 2,080-hour rule)</h1>
        <p>
          To compare a salaried job with an hourly one, or to see what your time is worth, convert one into
          the other. The method is short, and the one number that matters is how many hours the year contains.
        </p>

        <h2>The formula</h2>
        <pre>{`hourly pay = annual salary / (hours per week x weeks per year)`}</pre>
        <p>
          For a standard full-time job that is 40 hours x 52 weeks = <strong>2,080 hours</strong>. So a
          $60,000 salary is $60,000 / 2,080 = $28.85 an hour. Going the other way, $28.85 x 2,080 comes back
          to about $60,000.
        </p>

        <h2>Where 2,080 comes from</h2>
        <p>
          It is nothing more than 40 x 52. It treats every week of the year as a paid, 40-hour week, which
          includes paid vacation, paid holidays and sick days, because a salary pays for those weeks too. That
          is why the same number works for people who do not literally clock 2,080 hours.
        </p>

        <h2>Other ways to count</h2>
        <ul>
          <li>
            <strong>2,087 hours:</strong> some employers, including the US federal government&apos;s pay
            system, divide by 2,087, a year of about 52.18 weeks. The answer differs from 2,080 by roughly a
            third of a percent.
          </li>
          <li>
            <strong>Unpaid time off:</strong> if you take unpaid weeks, use fewer weeks. $60,000 over 50 weeks
            of 40 hours (2,000 hours) is $30.00 an hour.
          </li>
          <li>
            <strong>Part-time:</strong> use your real hours. A $30,000 salary at 25 hours a week is $30,000 /
            (25 x 52) = $23.08 an hour.
          </li>
        </ul>

        <AdSlot slot={AD_SLOT_CONTENT} placement="in-article" />

        <h2>Your effective hourly rate</h2>
        <p>
          A salary does not rise when you work longer, so extra hours cut your real hourly pay. A $60,000
          salary is $28.85 an hour at 40 hours a week but $23.08 at 50 hours: $60,000 / (50 x 52). Use your
          actual hours when you compare offers.
        </p>

        <h2>Monthly and weekly pay to hourly</h2>
        <p>
          Convert to a yearly figure first. A monthly salary times 12 is the annual salary; a weekly pay times
          52 is the annual salary; a bi-weekly check times 26 is the annual salary. Then divide by 2,080. A
          $5,000 monthly salary is $60,000 a year, or $28.85 an hour.
        </p>

        <h2>Try it</h2>
        <p>
          The <Link href="/salary-to-hourly-calculator">salary to hourly calculator</Link> does this for any
          salary and schedule, and the{" "}
          <Link href="/hourly-to-salary-calculator">hourly to salary calculator</Link> goes the other way. The{" "}
          <Link href="/salary-calculator">salary calculator</Link> shows every pay period at once.
        </p>
        <h2>Worked example: comparing two offers</h2>
        <p>
          Offer A is a $65,000 salary with an expected 45-hour week. Offer B is $31 an hour for 40 hours, paid
          for the hours worked. Offer A is $65,000 / (45 x 52) = $65,000 / 2,340 = <strong>$27.78</strong> an
          hour in practice, against $65,000 / 2,080 = $31.25 on paper. Offer B pays $31 x 2,080 = $64,480 a
          year if you work every week, and extra hours would earn overtime if you are non-exempt. On paper the
          two look the same; counting the real hours, B pays about $3 more per hour worked. The paper
          comparison and the real one only agree when the hours do.
        </p>

        <h2>What the 2,080-hour method leaves out</h2>
        <ul>
          <li>
            <strong>Benefits.</strong> Health insurance, retirement matching and paid leave have value that a
            plain hourly figure ignores. Compare them separately, in money, before deciding.
          </li>
          <li>
            <strong>Taxes.</strong> Every figure here is gross, before tax. Net pay depends on the country,
            state, filing status and deductions; see the{" "}
            <Link href="/paycheck-calculator">paycheck calculator</Link> for a US estimate.
          </li>
          <li>
            <strong>Unpaid and paid weeks.</strong> If your contract pays for fewer than 52 weeks, divide by
            the weeks you are actually paid for.
          </li>
          <li>
            <strong>Commute and unpaid prep time.</strong> They are real hours of your life even when they are
            not paid hours.
          </li>
        </ul>

        <h2>Source</h2>
        <p>
          The 2,087-hour divisor used by the US federal government is explained in the Office of Personnel
          Management fact sheet{" "}
          <a
            href="https://www.opm.gov/policy-data-oversight/pay-leave/pay-administration/fact-sheets/computing-hourly-rates-of-pay-using-the-2087-hour-divisor/"
            rel="noopener noreferrer"
          >
            Computing Hourly Rates of Pay Using the 2087-Hour Divisor
          </a>
          . The 2,080-hour figure is plain arithmetic (40 x 52) and is the common private-sector convention,
          not a legal definition; an employer or a contract may specify a different divisor.
        </p>
        <AdSlot slot={AD_SLOT_CONTENT} placement="article-end" />
      </article>
    </>
  );
}
