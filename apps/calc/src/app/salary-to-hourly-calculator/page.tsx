import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import PayConverter from "@/components/PayConverter";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("salary-to-hourly-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I convert salary to hourly?",
    a: "Divide annual salary by the hours you work in a year. For a standard full-time year that is 40 x 52 = 2,080 hours, so $60,000 a year is $60,000 / 2,080 = $28.85 an hour.",
  },
  {
    q: "How do I convert a monthly salary to hourly?",
    a: "Multiply the monthly amount by 12 to get the annual figure, then divide by 2,080. $5,000 a month is $60,000 a year, or $28.85 an hour.",
  },
  {
    q: "What if I work more than 40 hours a week?",
    a: "Set hours per week to what you really work. A $60,000 salary at 50 hours a week is $60,000 / (50 x 52) = $23.08 an hour, well below the $28.85 you would get at 40 hours.",
  },
  {
    q: "Why do some people use 2,087 hours?",
    a: "Some employers, including the US federal government's pay system, divide by 2,087 hours, which is about 52.18 weeks at 40 hours. 2,080 is the common convention and is easiest to check. The two differ by about a third of a percent. Set your weeks per year to match your employer's method.",
  },
  {
    q: "Is the hourly figure before tax?",
    a: "Yes. It is gross pay.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="salary-to-hourly-calculator"
      lede="Enter your salary to see what it is worth per hour, plus daily, weekly and monthly pay. Set your real hours to see your effective hourly rate."
      widget={<PayConverter initialAmount="60000" initialUnit="annual" focus="hourly" />}
      faq={faq}
      related={[
        "hourly-to-salary-calculator",
        "salary-calculator",
        "pay-raise-calculator",
        "overtime-pay-calculator",
      ]}
    >
      <h2>The formula</h2>
      <p>
        <strong>Hourly pay = annual salary / (hours per week x weeks per year).</strong> With the standard
        2,080-hour year, divide your salary by 2,080. Our{" "}
        <Link href="/guides/salary-to-hourly">guide to the 2,080-hour rule</Link> explains where the number
        comes from and when to change it.
      </p>

      <h2>Examples</h2>
      <table>
        <thead>
          <tr>
            <th>Annual salary</th>
            <th>Schedule</th>
            <th>Hourly pay</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$45,000</td>
            <td>40 hours, 52 weeks</td>
            <td>$21.63</td>
          </tr>
          <tr>
            <td>$60,000</td>
            <td>40 hours, 52 weeks</td>
            <td>$28.85</td>
          </tr>
          <tr>
            <td>$80,000</td>
            <td>40 hours, 52 weeks</td>
            <td>$38.46</td>
          </tr>
          <tr>
            <td>$60,000</td>
            <td>50 hours, 52 weeks</td>
            <td>$23.08</td>
          </tr>
        </tbody>
      </table>

      <h2>Why your real hourly rate can be lower</h2>
      <p>
        A salary does not change when you work extra hours, so every extra hour lowers your effective hourly
        rate. If a salaried role regularly takes 50 hours, the true rate is about 20% below the 40-hour
        figure. Put your real hours in the calculator before comparing a salary with an hourly offer.
      </p>
    </ToolPage>
  );
}
