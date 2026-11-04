import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import { AverageCalculator } from "@/components/RatioAndAverage";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("average-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I calculate the average of a set of numbers?",
    a: "Add the numbers and divide by how many there are. For 4, 8, 8, 10 and 15 the sum is 45 and there are 5 numbers, so the average is 9.",
  },
  {
    q: "What is the difference between mean, median and mode?",
    a: "The mean is the sum divided by the count. The median is the middle value when the numbers are in order. The mode is the value that appears most often.",
  },
  {
    q: "When is the median better than the mean?",
    a: "When a few extreme values would pull the mean away from a typical value. For 1, 2, 3, 4 and 100 the mean is 22, but the median is 3.",
  },
  {
    q: "What if two values tie for the mode?",
    a: "Then there are two modes, and the calculator lists both. If every value appears once, there is no mode.",
  },
  {
    q: "What is the range?",
    a: "The largest value minus the smallest. For 4, 8, 8, 10 and 15, the range is 15 - 4 = 11.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="average-calculator"
      lede="Paste a list of numbers to get the mean, median, mode, sum, minimum, maximum and range. Separate them with commas, spaces or new lines."
      widget={<AverageCalculator />}
      faq={faq}
      related={["percentage-calculator", "ratio-calculator", "percent-change-calculator", "hours-calculator"]}
    >
      <h2>The formulas</h2>
      <pre>{`mean   = sum / count
median = the middle value (or the mean of the middle two)
mode   = the most frequent value
range  = maximum - minimum`}</pre>

      <h2>Worked example</h2>
      <p>
        For 4, 8, 8, 10, 15: the sum is 45 and the count is 5, so the <strong>mean is 9</strong>. In order,
        the middle value is 8, so the <strong>median is 8</strong>. The value 8 appears twice, so the{" "}
        <strong>mode is 8</strong>. The <strong>range is 11</strong>.
      </p>
      <p>
        For percentages of a total, see the <Link href="/percentage-calculator">percentage calculator</Link>.
      </p>
    </ToolPage>
  );
}
