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

        <AdSlot slot={AD_SLOT_CONTENT} />

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
      </article>
    </>
  );
}
