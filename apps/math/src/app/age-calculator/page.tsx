import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import AgeCalculator from "@/components/AgeCalculator";
import ToolPage from "@/components/ToolPage";
import {
  daysBetween,
  diffYMD,
  formatDate,
  isLeapYear,
  nextBirthday,
  parseDate,
  weekdayName,
} from "@/lib/dates";
import { fmt } from "@/lib/percent";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("age-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

/** Fixed dates only: nothing on this page depends on today's date, so the build and the browser agree. */
const d = (iso: string): Date => parseDate(iso) as Date;
const ymdText = (from: string, to: string): string => {
  const r = diffYMD(d(from), d(to));
  return `${r.years} years, ${r.months} months, ${r.days} days`;
};

const EXAMPLE_BORN = "1990-05-15";
const EXAMPLE_ON = "2026-11-04";
const example = diffYMD(d(EXAMPLE_BORN), d(EXAMPLE_ON));
const exampleDays = daysBetween(d(EXAMPLE_BORN), d(EXAMPLE_ON));

/** Birth dates measured on one fixed day, to show how the three parts roll over. */
const REFERENCE_DAY = "2026-11-04";
const BIRTHS = ["2008-11-04", "2008-11-05", "1990-05-15", "1985-12-31", "2000-02-29", "2019-03-01"];

/** The same number of years can hold a different number of days, because of leap days. */
const SPANS = [18, 21, 30, 40, 65];

const LEAP_YEARS = [1900, 2000, 2023, 2024, 2026, 2028, 2100];

const MONTH_END_BORN = "2000-01-31";
const LEAP_BORN = "2004-02-29";

const faq = [
  {
    q: "How is age calculated in years, months and days?",
    a: `Whole calendar years are counted from the date of birth, then whole months, then the remaining days. Someone born on 15 May 1990 is, on 4 November 2026, ${example.years} years, ${example.months} months and ${example.days} days old.`,
  },
  {
    q: "How do I calculate my age from my date of birth?",
    a: "Subtract the birth year from the current year. If your birthday has not happened yet this year, subtract one more. Then count the whole months since your last birthday, and the days since the month anniversary. The calculator does all three steps at once.",
  },
  {
    q: "How many days old am I?",
    a: `The Total days row counts every calendar day from your birth date to the date measured, leap days included. Someone born on 15 May 1990 is ${fmt(exampleDays, 0)} days old on 4 November 2026.`,
  },
  {
    q: "Does the day of birth count?",
    a: "The age is measured from the birth date to the chosen date, so the birth date itself is day zero. You turn a year older on your birthday, not the day after.",
  },
  {
    q: "How is a 29 February birthday handled?",
    a: `In years that are not leap years, this calculator treats 28 February as the anniversary. Born on 29 February 2004, you are ${ymdText(LEAP_BORN, "2026-02-28")} old on 28 February 2026 and one day older on 1 March. Some places legally use 1 March instead, so for a legal purpose check the rule that applies to you.`,
  },
  {
    q: "Can I find my age on a past or future date?",
    a: "Yes. Change the Age on date. It starts as today, but you can set any date after the date of birth, such as the first day of a school year or the day an age limit applies.",
  },
  {
    q: "How do I find the age difference between two people?",
    a: "Enter the older person's birth date as the date of birth and the younger person's birth date in Age on. The result is the gap between them in years, months and days.",
  },
  {
    q: "What weekday was I born on?",
    a: `The Born on a tile shows it. 15 May 1990, for example, was a ${weekdayName(d(EXAMPLE_BORN))}.`,
  },
  {
    q: "Why do two age calculators sometimes disagree by a day?",
    a: `Month ends. Whole months are added to the birth date, and if the day does not exist in the target month it is moved back to the last day. Born on 31 January 2000, you are ${ymdText(MONTH_END_BORN, "2026-02-28")} old on 28 February 2026 and ${ymdText(MONTH_END_BORN, "2026-03-01")} old on 1 March. Another tool may count the days differently, so both answers can be defensible.`,
  },
  {
    q: "Is my date of birth stored or sent anywhere?",
    a: "No. The calculation runs in your browser and nothing is uploaded.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="age-calculator"
      lede="Enter a date of birth to see your exact age in years, months and days, your total days lived, your next birthday and the weekday you were born."
      widget={<AgeCalculator />}
      faq={faq}
      related={[
        "days-between-dates-calculator",
        "date-calculator",
        "percentage-calculator",
        "hours-calculator",
      ]}
    >
      <h2>What exact age means</h2>
      <p>
        Your age is the time from your date of birth to a chosen date, written as whole years, then whole
        months, then days. It is not the same as the current year minus your birth year, which is wrong by one
        for anyone whose birthday has not yet come round this year.
      </p>
      <pre>{`years  = whole years from the birth date to the chosen date
months = whole months since the last birthday
days   = days since that month anniversary`}</pre>

      <h2>How to use the calculator</h2>
      <ol>
        <li>Pick your date of birth.</li>
        <li>Leave Age on as today, or change it to any later date, such as the day an age limit applies.</li>
        <li>
          Read the age, the next birthday and the weekday you were born. The table under the result gives
          total months, weeks and days.
        </li>
      </ol>
      <p>
        Worked example: born {formatDate(d(EXAMPLE_BORN))}, measured on {formatDate(d(EXAMPLE_ON))}. The last
        birthday was 15 May 2026, which makes {example.years} years. From 15 May to 15 October is{" "}
        {example.months} months, and from 15 October to 4 November is {example.days} days. The age is{" "}
        {example.years} years, {example.months} months, {example.days} days, or {fmt(exampleDays, 0)} days in
        total.
      </p>

      <h2>How the parts roll over</h2>
      <p>The same calculation on one fixed day, {formatDate(d(REFERENCE_DAY))}, for six birth dates.</p>
      <table>
        <thead>
          <tr>
            <th scope="col">Date of birth</th>
            <th scope="col">Age on {formatDate(d(REFERENCE_DAY))}</th>
            <th scope="col">Total days</th>
            <th scope="col">Born on a</th>
            <th scope="col">Next birthday</th>
          </tr>
        </thead>
        <tbody>
          {BIRTHS.map((b) => (
            <tr key={b}>
              <th scope="row">{formatDate(d(b))}</th>
              <td>{ymdText(b, REFERENCE_DAY)}</td>
              <td>{fmt(daysBetween(d(b), d(REFERENCE_DAY)), 0)}</td>
              <td>{weekdayName(d(b))}</td>
              <td>{formatDate(nextBirthday(d(b), d(REFERENCE_DAY)))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Someone born on 4 November 2008 is exactly 18 on the reference day, so the months and days are zero.
        Born one day later, on 5 November 2008, they are still 17 and their birthday is a day away.
      </p>

      <h2>Why the same number of years is not always the same number of days</h2>
      <p>
        A leap year has 366 days, so the number of leap days inside a span changes the total. Someone born on
        1 January 2000 and someone born on 1 January 2001 both reach their 18th birthday after 18 years, but
        not after the same number of days.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Years lived</th>
            <th scope="col">Days from 1 Jan 2000</th>
            <th scope="col">Days from 1 Jan 2001</th>
          </tr>
        </thead>
        <tbody>
          {SPANS.map((y) => (
            <tr key={y}>
              <th scope="row">{y}</th>
              <td>{fmt(daysBetween(d("2000-01-01"), d(`${2000 + y}-01-01`)), 0)}</td>
              <td>{fmt(daysBetween(d("2001-01-01"), d(`${2001 + y}-01-01`)), 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Leap years and 29 February</h2>
      <p>
        A year is a leap year if it is divisible by 4, except that a century year must be divisible by 400.
        The extra day keeps the calendar in step with a solar year of about 365.2422 days (NIST, see Sources).
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Leap year?</th>
            <th scope="col">Days in the year</th>
          </tr>
        </thead>
        <tbody>
          {LEAP_YEARS.map((y) => (
            <tr key={y}>
              <th scope="row">{y}</th>
              <td>{isLeapYear(y) ? "Yes" : "No"}</td>
              <td>{daysBetween(d(`${y}-01-01`), d(`${y + 1}-01-01`))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        A person born on 29 February has no birthday in a common year. This calculator uses 28 February in
        those years, so for someone born on 29 February 2004 the next birthday after 16 November 2026 is{" "}
        {formatDate(nextBirthday(d(LEAP_BORN), d("2026-11-16")))}, and after 16 November 2027 it is{" "}
        {formatDate(nextBirthday(d(LEAP_BORN), d("2027-11-16")))}. Another reasonable rule is 1 March. Which
        one applies to a legal age limit depends on the country, so for a legal purpose check the rule
        yourself.
      </p>

      <h2>Month ends</h2>
      <p>
        Months have 28 to 31 days, so &ldquo;one month after the 31st&rdquo; needs a rule. The calculator adds
        whole months to the birth date and moves back to the last day of the month when the day does not
        exist. That is why someone born on 31 January 2000 is {ymdText(MONTH_END_BORN, "2026-02-28")} old on
        28 February 2026 but {ymdText(MONTH_END_BORN, "2026-03-01")} old on 1 March. The same rule is used by
        the <Link href="/date-calculator">date calculator</Link>, and the guide to{" "}
        <Link href="/guides/counting-days-between-dates">counting days between dates</Link> explains the
        reasoning.
      </p>

      <h2>What this calculator leaves out</h2>
      <p>
        It works on calendar dates only. It does not use the time of birth or time zones, so it cannot tell
        you the hour you turn a year older. It uses the Gregorian calendar throughout, so it is not meant for
        dates in other calendar systems. It does not decide legal ages: the age of majority, school entry and
        retirement rules are set by each country, and so are the rules for 29 February. For the gap between
        two dates that are not a birth date, use the{" "}
        <Link href="/days-between-dates-calculator">days between dates calculator</Link>.
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
