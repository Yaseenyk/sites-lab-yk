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
  {
    q: "How do I find the median of an even number of values?",
    a: "Take the mean of the two middle values. For 3, 5, 7 and 10 the middle two are 5 and 7, so the median is 6 (the mean is 6.25).",
  },
  {
    q: "How do I calculate a weighted average?",
    a: "Multiply each value by its weight, add the results and divide by the total weight. A score of 80 worth 30% and 90 worth 70% gives 0.3 x 80 + 0.7 x 90 = 87. This calculator treats every value equally.",
  },
  {
    q: "Can I average percentages?",
    a: "Only if each percentage is of the same total. Otherwise, add up the underlying parts and totals and take the percentage of those.",
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
      <h2>More examples</h2>
      <table>
        <thead>
          <tr>
            <th>Numbers</th>
            <th>Mean</th>
            <th>Median</th>
            <th>Mode</th>
            <th>Range</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>72, 85, 90, 68, 85</td>
            <td>80 (400 / 5)</td>
            <td>85</td>
            <td>85</td>
            <td>22</td>
          </tr>
          <tr>
            <td>3, 5, 7, 10</td>
            <td>6.25</td>
            <td>6</td>
            <td>none</td>
            <td>7</td>
          </tr>
          <tr>
            <td>30, 32, 35, 38, 200 (thousands)</td>
            <td>67 (335 / 5)</td>
            <td>35</td>
            <td>none</td>
            <td>170</td>
          </tr>
        </tbody>
      </table>
      <p>
        The last row shows why the median matters: one very large salary drags the mean to 67 while the
        typical value is 35.
      </p>
      <p>
        For percentages of a total, see the <Link href="/percentage-calculator">percentage calculator</Link>.
      </p>
    </ToolPage>
  );
}
