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
  {
    q: "How do I add more than two times?",
    a: "Add two, then use the result as the first time for the next one. A flight of 7 hours 50 minutes plus a 2 hour 35 minute layover is 10 hours 25 minutes; add a 3 hour 40 minute second flight and the trip is 14 hours 5 minutes.",
  },
  {
    q: "Why is 1.5 hours not 1 hour 50 minutes?",
    a: "Because the digits after the point are fractions of 60 minutes, not minutes. 0.5 of an hour is 30 minutes, so 1.5 hours is 1 hour 30 minutes. To go the other way, 1 hour 50 minutes is 1 + 50 / 60 = 1.83 hours.",
  },
  {
    q: "Can I enter 90 minutes in the minutes box?",
    a: "Yes. Any whole number works and the answer is carried over. 90 minutes in the first time and 0 in the second reads as 1 hour, 30 minutes.",
  },
  {
    q: "Does this account for clock changes or time zones?",
    a: "No. A day here is always exactly 24 hours. It adds lengths of time, not clock times, so daylight saving and time zones do not enter into it.",
  },
  {
    q: "Why does the answer show a minus sign?",
    a: "You subtracted a longer time from a shorter one. 45 minutes minus 1 hour 20 minutes is minus 35 minutes: the second time is 35 minutes longer than the first.",
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

      <h2>Everyday uses</h2>
      <table>
        <thead>
          <tr>
            <th>Situation</th>
            <th>Sum</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Two videos back to back</td>
            <td>1 h 12 min 30 s + 48 min 45 s</td>
            <td>2 hours, 1 minute, 15 seconds</td>
          </tr>
          <tr>
            <td>Time left on a project</td>
            <td>3 h 10 min - 1 h 55 min</td>
            <td>1 hour, 15 minutes</td>
          </tr>
          <tr>
            <td>Flight plus layover</td>
            <td>7 h 50 min + 2 h 35 min</td>
            <td>10 hours, 25 minutes</td>
          </tr>
          <tr>
            <td>Two work spells across days</td>
            <td>1 day 18 h + 9 h</td>
            <td>2 days, 3 hours</td>
          </tr>
          <tr>
            <td>Carrying across the hour</td>
            <td>59 min 45 s + 30 s</td>
            <td>1 hour, 15 seconds</td>
          </tr>
        </tbody>
      </table>
      <p>
        The first example above checks out in seconds too: 2 h 30 min is 9,000 seconds, 1 h 45 min is 6,300,
        and 9,000 + 6,300 = 15,300, which is 4 x 3,600 + 15 x 60.
      </p>

      <h2>Common mistakes</h2>
      <ul>
        <li>
          Treating the minutes like decimals. 1 hour 45 minutes is 1.75 hours, not 1.45, and 1.5 hours is 1
          hour 30 minutes, not 1 hour 50.
        </li>
        <li>Forgetting to carry: 75 minutes is 1 hour 15 minutes, so 3 h 75 min should read 4 h 15 min.</li>
        <li>Subtracting in the wrong order, which flips the sign of the answer.</li>
        <li>
          Using it for clock times. 22:30 plus 3 hours is a clock question that rolls past midnight; this tool
          adds lengths, so 22 h 30 min + 3 h simply reads 1 day, 1 hour, 30 minutes.
        </li>
      </ul>

      <h2>When not to use it</h2>
      <p>
        Calendar spans such as months and years are not a fixed number of seconds, and clock changes make some
        days 23 or 25 hours long, so use the <Link href="/date-calculator">date calculator</Link> for those.
        For a percentage of a time total, such as 15% of a 40 hour week, see the{" "}
        <Link href="/percentage-calculator">percentage calculator</Link>.
      </p>
      <p>
        For shifts with a start time, an end time and a break, use the{" "}
        <Link href="/hours-calculator">hours calculator</Link>. To move a calendar date forward or back, use
        the <Link href="/date-calculator">date calculator</Link>.
      </p>
    </ToolPage>
  );
}
