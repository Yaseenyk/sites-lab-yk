import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import { DateDiffCalculator } from "@/components/DateCalculators";
import ToolPage from "@/components/ToolPage";
import {
  addDays,
  businessDays,
  daysBetween,
  daysInMonth,
  diffYMD,
  formatDate,
  parseDate,
  weekdayName,
} from "@/lib/dates";
import { fmt } from "@/lib/percent";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("days-between-dates-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

/** Fixed dates only: nothing on this page depends on today's date. */
const d = (iso: string): Date => parseDate(iso) as Date;
const between = (a: string, b: string): number => daysBetween(d(a), d(b));

const EXAMPLES: [string, string][] = [
  ["2026-01-01", "2026-12-31"],
  ["2024-01-01", "2025-01-01"],
  ["2026-11-02", "2026-11-09"],
  ["2026-02-01", "2026-03-01"],
  ["2028-02-01", "2028-03-01"],
  ["2026-11-04", "2027-01-01"],
];

/** A 10-day span from each weekday: how many of those days are Monday to Friday. */
const WEEK_START = d("2026-11-02");
const WEEKDAY_ROWS = Array.from({ length: 7 }, (_, i) => {
  const start = addDays(WEEK_START, i);
  return { name: weekdayName(start), work: businessDays(start, addDays(start, 10)) };
});

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const FIRST_OF_MONTH_DAYS = (year: number): number[] =>
  MONTHS.map((_, m) => between(`${year}-01-01`, `${year}-${String(m + 1).padStart(2, "0")}-01`));

const week = diffYMD(d("2026-11-02"), d("2026-11-09"));
const nov = {
  days: between("2026-11-02", "2026-11-09"),
  work: businessDays(d("2026-11-02"), d("2026-11-09")),
};

const faq = [
  {
    q: "How do I count the days between two dates?",
    a: `Subtract the earlier date from the later one. From 1 January to 31 December 2026 is ${between("2026-01-01", "2026-12-31")} days. If you also count the end date, it is ${between("2026-01-01", "2026-12-31") + 1}.`,
  },
  {
    q: "Should I count the start date or the end date?",
    a: "It depends on the question. The difference between two dates counts neither end. Counting how many days an event covers, such as a 3-day course from Monday to Wednesday, counts both. Tick Count the end date too for that.",
  },
  {
    q: "How many working days are between two dates?",
    a: `The calculator counts Monday to Friday days from the start date up to the end date, excluding weekends. From Monday 2 November to Monday 9 November 2026 is ${nov.days} days and ${nov.work} working days. Public holidays are not excluded.`,
  },
  {
    q: "How do I find how many days are left until a date?",
    a: "Leave the start date as today and enter the future date as the end date. The Days between tile is the number of days left.",
  },
  {
    q: "How many days are there between today and a past date?",
    a: "Enter the past date as the start and leave the end as today. If you enter them the other way round, the calculator swaps the dates and tells you so, so the answer is never negative.",
  },
  {
    q: "How many weeks are between two dates?",
    a: `Divide the days by 7. The Days between tile shows whole weeks and the days left over: ${nov.days} days is ${Math.floor(nov.days / 7)} week and ${nov.days % 7} days.`,
  },
  {
    q: "How many months are between two dates?",
    a: "The calculator adds whole calendar months to the start date and counts the days left. Months differ in length, so this is not days divided by 30. From 2 November to 2 December is one month, however many days that is.",
  },
  {
    q: "Does it handle leap years?",
    a: `Yes. 1 January 2024 to 1 January 2025 is ${between("2024-01-01", "2025-01-01")} days because 2024 has a 29 February. February 2026 has ${daysInMonth(2026, 1)} days and February 2028 has ${daysInMonth(2028, 1)}.`,
  },
  {
    q: "Why does my answer differ from another tool by one day?",
    a: "Almost always inclusive versus exclusive counting. This calculator counts the gap between the dates by default, so 1 to 2 November is 1 day. Tick Count the end date too to count both days, which gives 2.",
  },
  {
    q: "Does it subtract public holidays from working days?",
    a: "No. Holidays differ by country and region, so the working-day figure excludes Saturdays and Sundays only. Subtract your own holidays from it.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="days-between-dates-calculator"
      lede="Choose two dates to see the number of days between them, in weeks and months, with working days. It handles leap years and month lengths."
      widget={<DateDiffCalculator />}
      faq={faq}
      related={["date-calculator", "age-calculator", "hours-calculator", "percentage-calculator"]}
    >
      <h2>What the calculator counts</h2>
      <p>
        The number of days between two dates is the later date minus the earlier one, counted in whole
        calendar days. From 2 November to 9 November is {nov.days} days: you count the nights, not the dates
        themselves. Tick Count the end date too if both the first and last day should be included.
      </p>
      <pre>{`days between = end date - start date
inclusive    = days between + 1
weeks        = days between / 7 (whole weeks and the rest)`}</pre>

      <h2>How to use it</h2>
      <ol>
        <li>Choose the start date and the end date. Both start as today.</li>
        <li>
          Decide whether the end date should count. For &ldquo;how many days until&rdquo;, leave it unticked.
          For &ldquo;how many days does this event cover&rdquo;, tick it.
        </li>
        <li>
          Read the days, the weeks and months, and the working days. The table lists the years, months and
          days and the weekend days.
        </li>
      </ol>
      <p>
        Worked example: Monday {formatDate(d("2026-11-02"))} to Monday {formatDate(d("2026-11-09"))}. That is{" "}
        {nov.days} days, {week.days === 7 ? "one week" : `${week.days} days`}, with {nov.work} working days
        and {nov.days - nov.work} weekend days.
      </p>

      <h2>Examples</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Days</th>
            <th scope="col">Counting both ends</th>
            <th scope="col">Working days (end date not counted)</th>
          </tr>
        </thead>
        <tbody>
          {EXAMPLES.map(([a, b]) => (
            <tr key={a + b}>
              <th scope="row">{formatDate(d(a))}</th>
              <td>{formatDate(d(b))}</td>
              <td>{fmt(between(a, b), 0)}</td>
              <td>{fmt(between(a, b) + 1, 0)}</td>
              <td>{fmt(businessDays(d(a), d(b)), 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Working days</h2>
      <p>
        Working days are Monday to Friday. The count depends on which weekday the span starts on, because a
        span of the same length can contain more or fewer weekends. Here is a span of 10 days starting on each
        weekday.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Span starts on</th>
            <th scope="col">Working days in the next 10 days</th>
          </tr>
        </thead>
        <tbody>
          {WEEKDAY_ROWS.map((r) => (
            <tr key={r.name}>
              <th scope="row">{r.name}</th>
              <td>{r.work}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        The end date is not counted unless you tick the box, so a Monday-to-Monday span is five working days,
        not six.
      </p>

      <h2>Month lengths and day of the year</h2>
      <p>
        The table shows how many days pass between 1 January and the first of each month. 2028 is a leap year,
        so every month after February is one day later.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">1st of</th>
            <th scope="col">Days in the month (2026)</th>
            <th scope="col">Days since 1 Jan 2026</th>
            <th scope="col">Days since 1 Jan 2028</th>
          </tr>
        </thead>
        <tbody>
          {MONTHS.map((m, i) => (
            <tr key={m}>
              <th scope="row">{m}</th>
              <td>{daysInMonth(2026, i)}</td>
              <td>{FIRST_OF_MONTH_DAYS(2026)[i]}</td>
              <td>{FIRST_OF_MONTH_DAYS(2028)[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        A year is a leap year when it is divisible by 4, except that a century year must be divisible by 400.
        The extra day keeps the calendar in step with a solar year of about 365.2422 days (NIST, see Sources).
      </p>

      <h2>How it works</h2>
      <p>
        Dates are converted to whole day numbers in UTC, so daylight-saving changes never add or remove an
        hour. The years, months and days figure adds whole calendar months to the start date and then counts
        the remaining days. If the day does not exist in the target month it moves back to the last day, so 31
        January plus one month is the end of February.
      </p>

      <h2>What this calculator leaves out</h2>
      <p>
        It works on calendar dates, not times, so it cannot count hours and minutes; use the{" "}
        <Link href="/hours-calculator">hours calculator</Link> for that. It ignores time zones and public
        holidays, and it counts Saturday and Sunday as the weekend everywhere, which is not true in every
        country. To move a date forward or back by a number of days, use the{" "}
        <Link href="/date-calculator">date calculator</Link>. To get an exact age, use the{" "}
        <Link href="/age-calculator">age calculator</Link>. For why inclusive and exclusive counts differ,
        read <Link href="/guides/counting-days-between-dates">how to count days between dates</Link>.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a
            href="https://www.nist.gov/pml/time-and-frequency-division/leap-seconds-faqs"
            rel="noopener noreferrer"
          >
            NIST: Leap seconds FAQs
          </a>{" "}
          (the leap-year rule and the 365.2422-day year), checked 16 November 2026.
        </li>
      </ul>
    </ToolPage>
  );
}
