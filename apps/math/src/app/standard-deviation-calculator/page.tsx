import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import ToolPage from "@/components/ToolPage";
import { AverageCalculator } from "@/components/RatioAndAverage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("standard-deviation-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "What is standard deviation?",
    a: "A measure of how spread out numbers are around their mean. A small value means the numbers cluster near the mean; a large value means they are widely scattered.",
  },
  {
    q: "What is the difference between sample and population standard deviation?",
    a: "Use the population version when your numbers are the whole group you care about, and divide by n. Use the sample version when they are only a sample of a larger group, and divide by n - 1, which corrects for a sample underestimating the spread.",
  },
  {
    q: "How do I calculate it by hand?",
    a: "Find the mean, subtract it from each number and square the result, add the squares, divide by n (population) or n - 1 (sample), and take the square root.",
  },
  {
    q: "What is variance?",
    a: "The standard deviation before the square root: the average of the squared differences from the mean. Standard deviation is easier to read because it is in the same units as your data.",
  },
  {
    q: "Why does it need at least two values for the sample version?",
    a: "Dividing by n - 1 with one value means dividing by zero. One value has no spread to estimate, so the sample result is not defined.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="standard-deviation-calculator"
      lede="Paste a list of numbers to get the sample and population standard deviation, the variance and the mean. Separate numbers with commas, spaces or new lines."
      widget={<AverageCalculator variant="deviation" />}
      faq={faq}
      related={[
        "average-calculator",
        "percentage-calculator",
        "ratio-calculator",
        "percent-change-calculator",
      ]}
    >
      <h2>The formulas</h2>
      <pre>{`mean                 = sum / n
population variance  = sum of (x - mean)^2 / n
sample variance      = sum of (x - mean)^2 / (n - 1)
standard deviation   = square root of the variance`}</pre>

      <h2>Worked example</h2>
      <p>
        For 2, 4, 4, 4, 5, 5, 7, 9 the mean is 5. The squared differences are 9, 1, 1, 1, 0, 0, 4 and 16,
        which add up to 32. The population variance is 32 / 8 = 4, so the{" "}
        <strong>population standard deviation is 2</strong>. The sample variance is 32 / 7 = 4.5714, so the{" "}
        <strong>sample standard deviation is 2.1381</strong>.
      </p>
      <p>
        For the mean, median and mode of the same list, use the{" "}
        <Link href="/average-calculator">average calculator</Link>.
      </p>
    </ToolPage>
  );
}
