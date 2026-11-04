import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import AgeCalculator from "@/components/AgeCalculator";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("age-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How is age calculated in years, months and days?",
    a: "Whole calendar years are counted from the date of birth, then whole months, then the remaining days. Someone born on 15 May 1990 is, on 4 November 2026, 36 years, 5 months and 20 days old.",
  },
  {
    q: "Does the day of birth count?",
    a: "The age is measured from the birth date to the chosen date, so the birth date itself is day zero. You turn a year older on your birthday, not the day after.",
  },
  {
    q: "How is a 29 February birthday handled?",
    a: "In years that are not leap years, this calculator treats 28 February as the anniversary. Some countries legally use 1 March instead, so for legal purposes check the rule that applies to you.",
  },
  {
    q: "Can I find my age on a past or future date?",
    a: "Yes. Change the Age on date. It starts as today, but you can set any date after the date of birth.",
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
      <h2>How the age is worked out</h2>
      <ol>
        <li>Count whole years from the date of birth to the chosen date.</li>
        <li>From that anniversary, count whole months.</li>
        <li>Count the days left after the last whole month.</li>
      </ol>
      <p>
        Months have different lengths, so the day count is taken from the date a whole number of months after
        the birth date, not from a fixed 30 days. The method is explained in the guide to{" "}
        <Link href="/guides/counting-days-between-dates">counting days between dates</Link>.
      </p>

      <h2>Total days, weeks and months</h2>
      <p>
        The table under the result gives the same age as a single count of months, weeks and days. Total days
        is the exact number of calendar days from the birth date, with leap days included.
      </p>
    </ToolPage>
  );
}
