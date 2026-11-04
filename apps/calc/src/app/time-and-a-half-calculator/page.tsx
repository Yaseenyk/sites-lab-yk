import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import OvertimeCalculator from "@/components/OvertimeCalculator";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("time-and-a-half-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "What is time and a half?",
    a: "Pay at 1.5 times your regular hourly rate. If you earn $20 an hour, time and a half is $20 x 1.5 = $30 an hour.",
  },
  {
    q: "How do I calculate time and a half?",
    a: "Multiply your hourly rate by 1.5. To find pay for overtime hours, multiply that rate by the hours: 5 hours at $30 is $150.",
  },
  {
    q: "What is double time?",
    a: "Pay at twice your regular rate. At $20 an hour, double time is $40 an hour. It is set by employer policy, union contract or state law, not by the federal overtime rule.",
  },
  {
    q: "Do I get time and a half for working holidays or weekends?",
    a: "Not under federal law. The Fair Labor Standards Act does not require extra pay for holiday or weekend work. A premium comes from your employer's policy or contract, unless your hours also exceed 40 in the week.",
  },
  {
    q: "How do I calculate time and a half from a salary?",
    a: "First convert the salary to an hourly rate (annual salary / 2,080 for a standard year), then multiply by 1.5. A $60,000 salary is $28.85 an hour, so time and a half is about $43.27.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="time-and-a-half-calculator"
      lede="Enter your regular hourly rate to see your time-and-a-half and double-time rates, and what the overtime hours you worked are worth."
      widget={<OvertimeCalculator mode="timehalf" />}
      faq={faq}
      related={[
        "overtime-pay-calculator",
        "salary-to-hourly-calculator",
        "hourly-to-salary-calculator",
        "pay-raise-calculator",
      ]}
    >
      <h2>The formula</h2>
      <p>
        <strong>Time and a half rate = regular hourly rate x 1.5.</strong> Overtime pay for a set of hours is
        the multiplied rate times those hours.
      </p>

      <h2>Rates at common wages</h2>
      <table>
        <thead>
          <tr>
            <th>Regular rate</th>
            <th>Time and a half (1.5x)</th>
            <th>Double time (2x)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$15.00</td>
            <td>$22.50</td>
            <td>$30.00</td>
          </tr>
          <tr>
            <td>$20.00</td>
            <td>$30.00</td>
            <td>$40.00</td>
          </tr>
          <tr>
            <td>$25.00</td>
            <td>$37.50</td>
            <td>$50.00</td>
          </tr>
          <tr>
            <td>$30.00</td>
            <td>$45.00</td>
            <td>$60.00</td>
          </tr>
        </tbody>
      </table>

      <h2>When it applies</h2>
      <p>
        Under the federal Fair Labor Standards Act, covered non-exempt employees must be paid at least time
        and a half for hours over 40 in a workweek. To see a whole week of pay, with regular and overtime
        hours together, use the <Link href="/overtime-pay-calculator">overtime pay calculator</Link>.
      </p>
    </ToolPage>
  );
}
