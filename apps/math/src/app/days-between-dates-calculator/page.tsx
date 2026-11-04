import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import { DateDiffCalculator } from "@/components/DateCalculators";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("days-between-dates-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I count the days between two dates?",
    a: "Subtract the earlier date from the later one. From 1 January to 31 December 2026 is 364 days. If you also count the end date, it is 365.",
  },
  {
    q: "Should I count the start date or the end date?",
    a: "It depends on the question. The difference between two dates counts neither end. Counting how many days an event covers, such as a 3-day course from Monday to Wednesday, counts both. Tick Count the end date too for that.",
  },
  {
    q: "How many working days are between two dates?",
    a: "The calculator counts Monday to Friday days from the start date up to the end date, excluding weekends. From Monday 2 November to Monday 9 November 2026 is 7 days and 5 working days. Public holidays are not excluded.",
  },
  {
    q: "How do I find how many days are left until a date?",
    a: "Leave the start date as today and enter the future date as the end date.",
  },
  {
    q: "Does it handle leap years?",
    a: "Yes. 1 January 2024 to 1 January 2025 is 366 days because 2024 has a 29 February.",
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
      <h2>How it works</h2>
      <p>
        Dates are converted to whole day numbers in UTC, so daylight-saving changes never add or remove an
        hour, and the difference is divided into days. The years-months-days figure adds whole calendar months
        to the start date and then counts the remaining days.
      </p>

      <h2>Examples</h2>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Days</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1 January 2026</td>
            <td>31 December 2026</td>
            <td>364 (365 counting both ends)</td>
          </tr>
          <tr>
            <td>1 January 2024</td>
            <td>1 January 2025</td>
            <td>366</td>
          </tr>
          <tr>
            <td>2 November 2026</td>
            <td>9 November 2026</td>
            <td>7 (5 working days)</td>
          </tr>
        </tbody>
      </table>
      <p>
        To move a date by a number of days instead, use the{" "}
        <Link href="/date-calculator">date calculator</Link>. For why inclusive and exclusive counts differ,
        read <Link href="/guides/counting-days-between-dates">how to count days between dates</Link>.
      </p>
    </ToolPage>
  );
}
