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
        <AdSlot slot={AD_SLOT_CONTENT} placement="article-end" />
      </article>
    </>
  );
}
