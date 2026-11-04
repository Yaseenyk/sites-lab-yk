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

        <AdSlot slot={AD_SLOT_CONTENT} />

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
      </article>
    </>
  );
}
