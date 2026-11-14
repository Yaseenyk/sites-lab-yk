import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import HoursCalculator from "@/components/HoursCalculator";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("hours-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I calculate hours worked between two times?",
    a: "Subtract the start time from the end time and then subtract any unpaid break. 9:00 to 17:30 with a 30 minute break is 8 hours 30 minutes minus 30 minutes, which is 8 hours.",
  },
  {
    q: "How do I convert hours and minutes to decimal hours?",
    a: "Divide the minutes by 60 and add them to the hours. 7 hours 45 minutes is 7 + 45 / 60 = 7.75 hours. 20 minutes is 0.33 of an hour.",
  },
  {
    q: "What about shifts that go past midnight?",
    a: "If the end time is earlier than the start time, the shift is counted as ending the next day. 22:00 to 06:00 is 8 hours.",
  },
  {
    q: "Can I add up several days?",
    a: "Yes. Press Add another day for each shift and the total is the sum of all of them, in hours and minutes and in decimal hours.",
  },
  {
    q: "Which format do payroll systems use?",
    a: "Many use decimal hours, but rounding rules differ between employers. Check how yours rounds minutes before relying on a figure.",
  },
  {
    q: "Why is 7:45 not 7.45 hours?",
    a: "Because minutes are out of 60, not 100. 45 minutes is 45 / 60 = 0.75 of an hour, so 7 hours 45 minutes is 7.75 hours. Typing 7.45 into a timesheet underpays you by 18 minutes.",
  },
  {
    q: "What if my start and end time are the same?",
    a: "This calculator counts that as 0 minutes, not 24 hours. If you really worked a full day, enter an end time one minute earlier, such as 08:59 for a shift that began at 09:00.",
  },
  {
    q: "What if my break is longer than the shift?",
    a: "The row shows Check the times instead of a negative number. Make sure the break is in minutes (30, not 0.5) and that the start and end are on the 24-hour clock.",
  },
  {
    q: "How do I enter 12-hour times like 5:30 pm?",
    a: "Use the 24-hour clock: 5:30 pm is 17:30, noon is 12:00 and midnight is 00:00. Add 12 to any pm hour from 1 to 11.",
  },
  {
    q: "How do I turn my total hours into pay?",
    a: "Multiply the decimal hours by your hourly rate. 35 hours at 12.50 an hour is 35 x 12.50 = 437.50. Use the decimal figure, not the hours-and-minutes one, for this multiplication.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="hours-calculator"
      lede="Enter start and end times with a break for each day. You get the time worked per day and in total, in hours and minutes and in decimal hours."
      widget={<HoursCalculator />}
      faq={faq}
      related={[
        "days-between-dates-calculator",
        "date-calculator",
        "percentage-calculator",
        "average-calculator",
      ]}
    >
      <h2>The method</h2>
      <pre>{`worked minutes = (end - start) - break
decimal hours  = worked minutes / 60`}</pre>
      <p>
        Times are entered on a 24-hour clock. An end time earlier than the start is treated as the next day.
      </p>

      <h2>Minutes as decimal hours</h2>
      <table>
        <thead>
          <tr>
            <th>Minutes</th>
            <th>Decimal hours</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>15</td>
            <td>0.25</td>
          </tr>
          <tr>
            <td>30</td>
            <td>0.50</td>
          </tr>
          <tr>
            <td>45</td>
            <td>0.75</td>
          </tr>
          <tr>
            <td>20</td>
            <td>0.33</td>
          </tr>
        </tbody>
      </table>

      <h2>Worked examples</h2>
      <table>
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
            <th>Break</th>
            <th>Time worked</th>
            <th>Decimal hours</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>09:00</td>
            <td>17:00</td>
            <td>30 min</td>
            <td>7:30</td>
            <td>7.5</td>
          </tr>
          <tr>
            <td>08:45</td>
            <td>17:15</td>
            <td>45 min</td>
            <td>7:45</td>
            <td>7.75</td>
          </tr>
          <tr>
            <td>07:00</td>
            <td>15:20</td>
            <td>20 min</td>
            <td>8:00</td>
            <td>8</td>
          </tr>
          <tr>
            <td>22:00</td>
            <td>06:00 (next day)</td>
            <td>30 min</td>
            <td>7:30</td>
            <td>7.5</td>
          </tr>
        </tbody>
      </table>

      <h2>A whole week</h2>
      <p>
        Press Add another day for each shift. One week of five shifts: Monday 09:00 to 17:30 with a 30 minute
        break (8:00), Tuesday the same (8:00), Wednesday 08:30 to 16:00 with 30 minutes (7:00), Thursday 09:00
        to 18:00 with an hour (8:00) and Friday 09:00 to 13:00 with no break (4:00). The total is 35:00, or 35
        decimal hours. At 12.50 an hour that is 35 x 12.50 = 437.50.
      </p>

      <h2>Common mistakes</h2>
      <ul>
        <li>
          Writing 7 hours 45 minutes as 7.45. Minutes must be divided by 60: 45 minutes is 0.75, so the answer
          is 7.75.
        </li>
        <li>
          Rounding 20 minutes to 0.3 or 0.33 and then multiplying by a rate. The error is small per shift but
          adds up over a month. Keep the extra digits until the final pay figure.
        </li>
        <li>Entering the break in hours. The break box is in minutes, so one hour is 60.</li>
        <li>Using 12-hour times. Enter 17:30, not 5:30, or the shift will be counted the wrong way round.</li>
        <li>
          Forgetting that the same start and end time gives zero, not a 24 hour shift, and that a break longer
          than the shift is rejected.
        </li>
      </ul>

      <h2>What this calculator does not do</h2>
      <p>
        It works on clock times only, so it does not know about daylight saving changes, which can make a
        night shift an hour longer or shorter on two nights a year, or about paid and unpaid break rules,
        rounding policies and overtime thresholds. Those depend on your contract and local law. To add or
        subtract lengths of time that are not tied to a clock, such as 2 hours 30 minutes plus 1 hour 45
        minutes, use the <Link href="/time-calculator">time calculator</Link>.
      </p>
      <p>
        To turn hours into pay, multiply the decimal hours by the hourly rate, or use the{" "}
        <a href="https://calc.streamerosai.com/overtime-pay-calculator/">overtime pay calculator</a> when some
        hours are paid at a higher rate. For dates rather than times, see the{" "}
        <Link href="/days-between-dates-calculator">days between dates calculator</Link>.
      </p>
    </ToolPage>
  );
}
