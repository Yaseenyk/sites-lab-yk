import Link from "next/link";
import { AdSlot, pageMetadata } from "@sites/shell";
import GuideHead from "@/components/GuideHead";
import { AD_SLOT_CONTENT, site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "How to Count Days Between Dates: Inclusive, Exclusive, Working",
  description:
    "Why two people can get different answers for the same two dates, and how inclusive counting, leap years, month lengths and working days are handled.",
  path: "/guides/counting-days-between-dates/",
  type: "article",
});

export default function Page() {
  return (
    <>
      <GuideHead slug="counting-days-between-dates" />
      <article className="doc">
        <h1>How to count days between dates: inclusive, exclusive and working days</h1>
        <p>
          Asking how many days there are between two dates sounds simple, yet two people can honestly give
          different answers. The difference is almost always whether the first and last day are counted.
        </p>

        <h2>Exclusive and inclusive counting</h2>
        <p>
          The usual calculation subtracts the earlier date from the later one. From 1 January to 31 December
          2026 that is 364 days: the start date is day zero and the end date is day 364. Counting both ends
          gives 365, which is what you want when you ask how many days an event covers. A course that runs
          Monday to Wednesday covers 3 days, but the difference between the two dates is 2.
        </p>
        <p>
          Use the <Link href="/days-between-dates-calculator">days between dates calculator</Link> and tick{" "}
          <em>Count the end date too</em> to switch between them.
        </p>

        <h2>Leap years</h2>
        <p>
          A year has 366 days if it is divisible by 4, except century years, which must be divisible by 400.
          So 2024 and 2000 were leap years and 1900 was not. From 1 January 2024 to 1 January 2025 is 366
          days.
        </p>

        <AdSlot slot={AD_SLOT_CONTENT} placement="in-article" />

        <h2>Years, months and days</h2>
        <p>
          Age and contract periods are quoted in years, months and days. The method is to add whole calendar
          months to the start date for as long as the result does not pass the end date, then count the days
          left. Someone born on 15 May 1990 is, on 4 November 2026, 36 years, 5 months and 20 days old: 15 May
          1990 plus 36 years and 5 months is 15 October 2026, and 20 days later is 4 November.
        </p>
        <p>
          When the day does not exist in a month, such as the 31st in a 30-day month, the date moves to the
          last day of that month. Try it with the <Link href="/age-calculator">age calculator</Link> or the{" "}
          <Link href="/date-calculator">date calculator</Link>.
        </p>

        <h2>Working days</h2>
        <p>
          Working days exclude Saturdays and Sundays. From Monday 2 November to Monday 9 November 2026 there
          are 7 days but 5 working days. Public holidays differ by country and region, so they are not
          subtracted; take them off by hand.
        </p>

        <h2>29 February birthdays</h2>
        <p>
          A leap-day birthday has no exact anniversary in three years out of four. Calculators here treat 28
          February as the anniversary. Some countries&apos; laws use 1 March instead, so use the rule that
          applies where it matters legally.
        </p>
        <h2>Worked example: a seven-week countdown</h2>
        <p>
          Wednesday 4 November 2026 to Friday 25 December 2026. Subtracting the dates gives{" "}
          <strong>51 days</strong> (26 days left in November after the 4th, plus 25 in December). Counting
          both ends gives 52. In weeks that is 7 weeks and 2 days, since 7 x 7 = 49. Because the range starts
          on a Wednesday and ends on a Friday, the working days (Monday to Friday) are 37 if the last day is
          not counted and 38 if it is. Public holidays inside the range, such as 25 December itself, would
          come off that number by hand. Adding days works the same way in reverse: 15 March 2026 plus 100 days
          is 23 June 2026.
        </p>

        <h2>Why computers get this wrong</h2>
        <p>
          A common bug is to subtract two timestamps and divide by 24 hours. In a time zone that changes its
          clocks, a day can be 23 or 25 hours long, so the result is off by a fraction and rounds the wrong
          way. A calendar-date subtraction, which ignores the time of day, avoids it. The calculators here
          work on calendar dates, not on timestamps, for that reason.
        </p>

        <h2>Checking a result by hand</h2>
        <ul>
          <li>
            Same year: subtract the day numbers of the year. 4 November is day 308 and 25 December is day 359
            of 2026, and 359 - 308 = 51.
          </li>
          <li>One year later, same date: 365 days, or 366 if 29 February falls between the two dates.</li>
          <li>
            Weeks: divide by 7 and keep the remainder. 51 / 7 is 7 with 2 left over, so 7 weeks and 2 days.
          </li>
        </ul>

        <h2>Date formats</h2>
        <p>
          Numeric dates such as 04/11/2026 mean 4 November in much of the world and 11 April in the United
          States, which is a frequent source of off-by-months mistakes. The calculators take a date picker
          value, not typed text, to avoid the ambiguity. For anything written down for others, the unambiguous
          form is year-month-day (2026-11-04), the format of ISO 8601 and of RFC 3339 (
          <a href="https://www.rfc-editor.org/rfc/rfc3339" rel="noopener noreferrer">
            rfc-editor.org/rfc/rfc3339
          </a>
          ).
        </p>
        <p>
          Limits: the working day count skips Saturdays and Sundays only. Some countries have a different
          working week and every country has its own public holidays, so for payroll, legal or contract
          deadlines check the rule in the document that governs them.
        </p>
        <AdSlot slot={AD_SLOT_CONTENT} placement="article-end" />
      </article>
    </>
  );
}
