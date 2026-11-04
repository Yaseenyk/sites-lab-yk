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
      <p>
        To turn hours into pay, multiply the decimal hours by the hourly rate, or use the{" "}
        <a href="https://calc.streamerosai.com/overtime-pay-calculator/">overtime pay calculator</a> when some
        hours are paid at a higher rate. For dates rather than times, see the{" "}
        <Link href="/days-between-dates-calculator">days between dates calculator</Link>.
      </p>
    </ToolPage>
  );
}
