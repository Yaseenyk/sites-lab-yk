import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import ToolPage from "@/components/ToolPage";
import { AverageCalculator } from "@/components/RatioAndAverage";
import { fmt, stats } from "@/lib/percent";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("standard-deviation-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

/** The worked example. Every figure below is computed from it. */
const EXAMPLE = [2, 4, 4, 4, 5, 5, 7, 9];
const ex = stats(EXAMPLE) as NonNullable<ReturnType<typeof stats>>;
const exSquares = EXAMPLE.map((x) => (x - ex.mean) ** 2);
const exSumSquares = exSquares.reduce((a, b) => a + b, 0);

/** Two lists with the same mean and different spread. */
const TIGHT = [48, 50, 52];
const WIDE = [30, 50, 70];
const tight = stats(TIGHT) as NonNullable<ReturnType<typeof stats>>;
const wide = stats(WIDE) as NonNullable<ReturnType<typeof stats>>;

/** The sample result is the population result times sqrt(n / (n - 1)). */
const SIZES = [2, 3, 5, 10, 30, 100];

const sampleSd = ex.sampleStdDev as number;

const faq = [
  {
    q: "What is standard deviation?",
    a: "A measure of how spread out numbers are around their mean. A small value means the numbers cluster near the mean; a large value means they are widely scattered. It is in the same units as your data.",
  },
  {
    q: "What is the difference between sample and population standard deviation?",
    a: "Use the population version when your numbers are the whole group you care about, and divide by n. Use the sample version when they are only a sample of a larger group, and divide by n - 1, which corrects for a sample underestimating the spread.",
  },
  {
    q: "Which one should I use?",
    a: "If you measured every member of the group, such as the marks of every student in one class you are describing, use population. If the numbers are a sample used to learn about a bigger group, such as 30 customers out of thousands, use sample. When unsure, sample is the usual choice.",
  },
  {
    q: "How do I calculate standard deviation by hand?",
    a: `Find the mean, subtract it from each number and square the result, add the squares, divide by n (population) or n - 1 (sample), and take the square root. For ${EXAMPLE.join(", ")} the mean is ${fmt(ex.mean)}, the squares add up to ${fmt(exSumSquares)}, and the population standard deviation is the square root of ${fmt(exSumSquares)} / ${ex.count}, which is ${fmt(ex.stdDev)}.`,
  },
  {
    q: "What is variance?",
    a: "The standard deviation before the square root: the average of the squared differences from the mean. Standard deviation is easier to read because it is in the same units as your data, while variance is in squared units.",
  },
  {
    q: "Why divide by n - 1 for a sample?",
    a: "The deviations are measured from the sample's own mean, which sits closer to the sample values than the true mean of the whole group would. That makes the spread come out a little too small, and dividing by n - 1 instead of n compensates. The size of the effect fades as the sample grows; see the table above.",
  },
  {
    q: "Why does the sample version need at least two values?",
    a: "Dividing by n - 1 with one value means dividing by zero. One value has no spread to estimate, so the sample result is not defined and the calculator shows needs 2+ values.",
  },
  {
    q: "Can the standard deviation be negative, or zero?",
    a: "It cannot be negative, because it is a square root of an average of squares. It is zero only when every value is identical, such as 7, 7, 7.",
  },
  {
    q: "Is a standard deviation of 10 big or small?",
    a: `It depends on the data. Compare it with the mean and the units. A spread of 10 around a mean of 1,000 is small. A spread of 10 around a mean of 20 is large. The two lists ${TIGHT.join(", ")} and ${WIDE.join(", ")} share the mean ${fmt(tight.mean)} but have sample standard deviations of ${fmt(tight.sampleStdDev as number)} and ${fmt(wide.sampleStdDev as number)}.`,
  },
  {
    q: "What does the calculator do with text in my list?",
    a: "Numbers can be separated by commas, spaces, semicolons or new lines. Anything that is not a number is ignored and listed above the result, so a stray word will not change the answer silently.",
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
      <h2>What standard deviation tells you</h2>
      <p>
        Standard deviation is the typical distance of the values in a list from their mean. Two lists can have
        the same mean and very different spread: {TIGHT.join(", ")} and {WIDE.join(", ")} both average{" "}
        {fmt(tight.mean)}, but their sample standard deviations are {fmt(tight.sampleStdDev as number)} and{" "}
        {fmt(wide.sampleStdDev as number)}. The mean alone hides that difference.
      </p>

      <h2>The formulas</h2>
      <pre>{`mean                 = sum / n
population variance  = sum of (x - mean)^2 / n
sample variance      = sum of (x - mean)^2 / (n - 1)
standard deviation   = square root of the variance`}</pre>
      <p>
        The sample formula, with N - 1 in the denominator, is the one NIST gives for the standard deviation of
        a sample (see Sources).
      </p>

      <h2>How to calculate it, step by step</h2>
      <ol>
        <li>Add the numbers and divide by how many there are. That is the mean.</li>
        <li>Subtract the mean from each number. Square each result so that negatives do not cancel.</li>
        <li>Add the squares.</li>
        <li>Divide by n for a whole group, or by n - 1 for a sample. That is the variance.</li>
        <li>Take the square root. That is the standard deviation.</li>
      </ol>

      <h2>Worked example</h2>
      <p>
        For {EXAMPLE.join(", ")}, the mean is {fmt(ex.sum)} / {ex.count} = {fmt(ex.mean)}.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Value (x)</th>
            <th scope="col">x - mean</th>
            <th scope="col">(x - mean) squared</th>
          </tr>
        </thead>
        <tbody>
          {EXAMPLE.map((x, i) => (
            <tr key={i}>
              <td>{fmt(x)}</td>
              <td>{fmt(x - ex.mean)}</td>
              <td>{fmt(exSquares[i] as number)}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">Total</th>
            <td>{fmt(EXAMPLE.reduce((a, x) => a + (x - ex.mean), 0))}</td>
            <td>{fmt(exSumSquares)}</td>
          </tr>
        </tbody>
      </table>
      <p>
        The population variance is {fmt(exSumSquares)} / {ex.count} = {fmt(ex.variance)}, so the{" "}
        <strong>population standard deviation is {fmt(ex.stdDev)}</strong>. The sample variance is{" "}
        {fmt(exSumSquares)} / {ex.count - 1} = {fmt(ex.sampleVariance as number, 4)}, so the{" "}
        <strong>sample standard deviation is {fmt(sampleSd, 4)}</strong>.
      </p>

      <h2>Sample or population: how much does it matter?</h2>
      <p>
        The sample figure is the population figure multiplied by the square root of n / (n - 1). The gap is
        large for tiny lists and shrinks as the list grows.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Number of values (n)</th>
            <th scope="col">Sample is larger by</th>
          </tr>
        </thead>
        <tbody>
          {SIZES.map((n) => (
            <tr key={n}>
              <th scope="row">{n}</th>
              <td>{fmt((Math.sqrt(n / (n - 1)) - 1) * 100, 2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li>
          Using the population figure for a small sample. With {ex.count} values it understates the spread by
          about {fmt((1 - ex.stdDev / sampleSd) * 100, 1)}%.
        </li>
        <li>
          Reading variance as if it were in your units. A variance of {fmt(ex.variance)} for numbers in metres
          is in square metres. Take the square root to get back to metres.
        </li>
        <li>
          Comparing standard deviations of data on different scales. A spread of 5 means different things for
          heights in centimetres and for incomes.
        </li>
        <li>Leaving out a value because it looks odd. One extreme value can change the result a lot.</li>
      </ul>

      <h2>What this calculator leaves out</h2>
      <p>
        It takes a plain list of values. It does not accept frequency tables or weights, does not give a
        standard error or a confidence interval, and does not flag outliers. It also does not tell you whether
        your data is a sample or the whole group; that depends on how it was collected. For the mean, median
        and mode of the same list, use the <Link href="/average-calculator">average calculator</Link>. To
        compare two values rather than describe a list, see the{" "}
        <Link href="/percent-change-calculator">percent change calculator</Link>.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a
            href="https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm"
            rel="noopener noreferrer"
          >
            NIST/SEMATECH e-Handbook of Statistical Methods: Measures of scale
          </a>{" "}
          (the variance and standard deviation of a sample, with N - 1), checked 16 November 2026.
        </li>
      </ul>
    </ToolPage>
  );
}
