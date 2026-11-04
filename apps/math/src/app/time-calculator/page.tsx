import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import ToolPage from "@/components/ToolPage";
import { TimeCalculator } from "@/components/TimeAndDiscount";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("time-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I add hours and minutes?",
    a: "Add the hours together and the minutes together, then carry every 60 minutes into an extra hour. 2 hours 30 minutes plus 1 hour 45 minutes is 3 hours 75 minutes, which is 4 hours 15 minutes.",
  },
  {
    q: "How do I subtract one time from another?",
    a: "Work in minutes: convert both to minutes, subtract, then convert back. 2 hours 30 minutes minus 1 hour is 90 minutes, or 1 hour 30 minutes. If the second time is longer, the result is negative.",
  },
  {
    q: "How do I convert minutes to hours?",
    a: "Divide the minutes by 60. 90 minutes is 1.5 hours, and 45 minutes is 0.75 hours.",
  },
  {
    q: "What happens when the hours pass 24?",
    a: "They roll over into days. 20 hours plus 8 hours is 28 hours, which the calculator shows as 1 day and 4 hours.",
  },
  {
    q: "Is this the same as a clock-time calculator?",
    a: "No. This adds and subtracts lengths of time. To find how long you worked between a start time and an end time, use the hours calculator.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="time-calculator"
      lede="Add or subtract two lengths of time. Enter days, hours, minutes and seconds, and the result is shown in words and as total hours and minutes."
      widget={<TimeCalculator />}
      faq={faq}
      related={["hours-calculator", "days-between-dates-calculator", "date-calculator", "average-calculator"]}
    >
      <h2>How the calculator works</h2>
      <p>
        Each time is turned into seconds (days x 86,400, hours x 3,600, minutes x 60, plus seconds), the two
        numbers are added or subtracted, and the total is split back into days, hours, minutes and seconds.
        Because the sum is done in one unit, carrying between units is always right.
      </p>

      <h2>Examples</h2>
      <table>
        <thead>
          <tr>
            <th>Sum</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2 h 30 min + 1 h 45 min</td>
            <td>4 hours, 15 minutes</td>
          </tr>
          <tr>
            <td>20 h + 8 h</td>
            <td>1 day, 4 hours</td>
          </tr>
          <tr>
            <td>1 h - 2 h 30 min</td>
            <td>-1 hour, 30 minutes</td>
          </tr>
        </tbody>
      </table>
      <p>
        For shifts with a start time, an end time and a break, use the{" "}
        <Link href="/hours-calculator">hours calculator</Link>. To move a calendar date forward or back, use
        the <Link href="/date-calculator">date calculator</Link>.
      </p>
    </ToolPage>
  );
}
