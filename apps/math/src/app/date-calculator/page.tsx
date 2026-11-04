import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import { DateAddCalculator } from "@/components/DateCalculators";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("date-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I add days to a date?",
    a: "Choose the start date, leave the operation on Add, enter the number of days, and read the result. 30 days after 4 November 2026 is 4 December 2026, a Friday.",
  },
  {
    q: "How do I find the date 90 days from today?",
    a: "Leave the start date as today and enter 90 in Days. Starting from 1 January 2026, 90 days later is 1 April 2026.",
  },
  {
    q: "What happens when I add a month to the 31st?",
    a: "If the target month is shorter, the date moves to its last day. 31 January 2026 plus 1 month is 28 February 2026, and in a leap year it is 29 February.",
  },
  {
    q: "In what order are years, months and days applied?",
    a: "Years and months are added first, as whole calendar months, and then the days. Doing the months first matters because month lengths vary.",
  },
  {
    q: "How do I go back in time?",
    a: "Change the operation to Subtract. For example, subtracting 6 months from 15 March 2026 gives 15 September 2025.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="date-calculator"
      lede="Add or subtract years, months and days from any date, and see the new date and the day of the week."
      widget={<DateAddCalculator />}
      faq={faq}
      related={[
        "days-between-dates-calculator",
        "age-calculator",
        "hours-calculator",
        "percentage-calculator",
      ]}
    >
      <h2>Examples</h2>
      <table>
        <thead>
          <tr>
            <th>Start</th>
            <th>Change</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4 November 2026</td>
            <td>+ 30 days</td>
            <td>4 December 2026 (Friday)</td>
          </tr>
          <tr>
            <td>1 January 2026</td>
            <td>+ 90 days</td>
            <td>1 April 2026</td>
          </tr>
          <tr>
            <td>31 January 2026</td>
            <td>+ 1 month</td>
            <td>28 February 2026</td>
          </tr>
          <tr>
            <td>15 March 2026</td>
            <td>- 6 months</td>
            <td>15 September 2025</td>
          </tr>
        </tbody>
      </table>

      <h2>Why months need care</h2>
      <p>
        A month is not a fixed number of days, so adding a month moves to the same day number in the next
        month. When that day does not exist, the result is the last day of the month. To measure the gap
        between two dates instead, use the{" "}
        <Link href="/days-between-dates-calculator">days between dates calculator</Link>.
      </p>
    </ToolPage>
  );
}
