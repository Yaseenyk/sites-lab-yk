import Link from "next/link";
import { AdSlot, pageMetadata } from "@sites/shell";
import GuideHead from "@/components/GuideHead";
import { AD_SLOT_CONTENT, site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "How Overtime Pay Works in the US: Time and a Half Explained",
  description:
    "What the federal overtime rule requires, how time and a half is calculated, who is exempt, and why some states add daily overtime.",
  path: "/guides/how-overtime-pay-works/",
  type: "article",
});

export default function Page() {
  return (
    <>
      <GuideHead slug="how-overtime-pay-works" />
      <article className="doc">
        <h1>How overtime pay works in the US: time and a half explained</h1>
        <p>
          Overtime is extra pay for working long weeks. The federal rule is simple to state, but who it covers
          and how the rate is set is where people get caught out. This guide covers the basics; it is general
          information, not legal advice.
        </p>

        <h2>The federal rule</h2>
        <p>
          Under the Fair Labor Standards Act (FLSA), covered <strong>non-exempt</strong> employees must be
          paid at least <strong>one and a half times their regular rate</strong> for each hour worked over 40
          in a workweek. A workweek is a fixed, recurring period of seven days, and each week is counted on
          its own: you cannot average 50 hours one week and 30 the next to avoid overtime.
        </p>

        <h2>How time and a half is calculated</h2>
        <pre>{`overtime rate = regular rate x 1.5
weekly pay    = regular hours x rate + overtime hours x overtime rate`}</pre>
        <p>
          At $20 an hour and 45 hours worked, the first 40 hours pay $800 and the 5 overtime hours pay 5 x $30
          = $150, for $950 in total. The <Link href="/overtime-pay-calculator">overtime pay calculator</Link>{" "}
          does this with your own rate and hours.
        </p>

        <AdSlot slot={AD_SLOT_CONTENT} placement="in-article" />

        <h2>The &quot;regular rate&quot; is not always your base wage</h2>
        <p>
          The regular rate can include more than the hourly wage, such as non-discretionary bonuses and shift
          differentials. If you receive these, your overtime rate may be higher than 1.5 times your base wage.
          Check the earnings breakdown on your payslip.
        </p>

        <h2>Exempt and non-exempt employees</h2>
        <p>
          Some employees are exempt from the federal overtime rule. Exemption depends on the duties of the job
          and the salary paid, not on the job title or on being paid a salary. Many salaried workers are
          non-exempt and are owed overtime. The US Department of Labor publishes the current tests on its
          website.
        </p>

        <h2>State rules can be stricter</h2>
        <p>
          Where state law gives more protection than federal law, the more protective rule applies.
          California, for example, requires overtime pay for hours over 8 in a day as well as over 40 in a
          week, and double time after 12 hours in a day. Check your state labor department for the exact rule.
        </p>

        <h2>Holidays and weekends</h2>
        <p>
          Federal law does not require a premium for working holidays or weekends. Extra pay for those days
          comes from an employer&apos;s policy, a union agreement or a contract. Hours on those days still
          count toward the 40-hour total. See the{" "}
          <Link href="/time-and-a-half-calculator">time and a half calculator</Link> for the rates.
        </p>
        <h2>Worked example: a bonus changes the overtime rate</h2>
        <p>
          Suppose you earn $18 an hour, work 45 hours, and are also paid a $90 non-discretionary attendance
          bonus for the week. The regular rate is all pay for the week divided by all hours worked: ($18 x 45
          + $90) / 45 = $900 / 45 = <strong>$20.00</strong> an hour, not $18. You have already been paid
          straight time for all 45 hours, so what is still owed for the 5 overtime hours is the extra half:
          0.5 x $20.00 x 5 = <strong>$50</strong>. The week comes to $900 + $50 = $950. If the bonus were
          ignored and overtime were figured on $18, the half-time premium would be only 0.5 x $18 x 5 = $45,
          which is $5 short. Small on one week, but it adds up over a year.
        </p>

        <h2>Worked example: daily overtime in California</h2>
        <p>
          A California employee at $20 an hour works five 10-hour days, 50 hours in the week. Each day has 8
          regular hours and 2 overtime hours, so 40 regular hours pay $800 and 10 overtime hours pay 10 x $30
          = $300, for $1,100. On a single 13-hour day the split is 8 regular hours ($160), 4 hours at 1.5
          times ($120) and 1 hour at double time ($40), for $320. The{" "}
          <Link href="/time-and-a-half-calculator">time and a half calculator</Link> applies the federal
          weekly rule and does not model daily overtime, so for California use the arithmetic above.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li>
            <strong>Averaging weeks.</strong> A 50-hour week followed by a 30-hour week is still 10 hours of
            overtime in the first week.
          </li>
          <li>
            <strong>Assuming a salary means no overtime.</strong> Salary alone does not make someone exempt;
            the job duties and the salary level both have to meet the Department of Labor tests.
          </li>
          <li>
            <strong>Counting unpaid breaks.</strong> A genuine, uninterrupted meal break is normally not
            working time, but a break spent answering calls is.
          </li>
          <li>
            <strong>Forgetting that rates differ.</strong> Employers can, and some do, pay more than 1.5 times
            by contract. The legal minimum is a floor, not a fixed rate.
          </li>
        </ul>

        <h2>Sources and limits</h2>
        <p>
          The federal rules come from the Fair Labor Standards Act, summarised by the US Department of Labor
          Wage and Hour Division in its fact sheet <em>Overtime Pay Requirements of the FLSA</em> (Fact Sheet
          23) and, for the regular rate, Fact Sheet 56A, both at dol.gov. California&apos;s daily rules are
          described by the state&apos;s Division of Labor Standards Enforcement at{" "}
          <a href="https://www.dir.ca.gov/dlse/faq_overtime.htm" rel="noopener noreferrer">
            dir.ca.gov/dlse/faq_overtime.htm
          </a>
          . This page explains the arithmetic. It does not decide whether a particular job is exempt, and it
          is not legal advice; if pay looks wrong, ask your employer or your state labor department.
        </p>
        <AdSlot slot={AD_SLOT_CONTENT} placement="article-end" />
      </article>
    </>
  );
}
