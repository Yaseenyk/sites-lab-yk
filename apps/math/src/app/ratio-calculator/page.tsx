import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import ToolPage from "@/components/ToolPage";
import { RatioCalculator } from "@/components/RatioAndAverage";
import { fmt, simplifyRatio, solveRatio, whatPercent } from "@/lib/percent";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("ratio-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const simple = (a: number, b: number): string => {
  const r = simplifyRatio(a, b);
  return r ? `${r[0]} : ${r[1]}` : "-";
};

/** Pixel sizes whose width : height simplify to a ratio. */
const SIZES: [number, number][] = [
  [1920, 1080],
  [3840, 2160],
  [1024, 768],
  [1280, 1024],
  [1366, 768],
  [2560, 1080],
];

/** Widths scaled at a 16 : 9 ratio. */
const WIDTHS = [640, 1280, 1920, 2560, 3840];

/** A ratio shown as equivalent forms, built by multiplying both terms. */
const EQUIV_MULTIPLES = [1, 2, 3, 4, 5, 10];

/** Splitting totals in a ratio. */
const SPLITS: { what: string; a: number; b: number; total: number }[] = [
  { what: "A bill shared 3 : 2", a: 3, b: 2, total: 500 },
  { what: "Profit shared 1 : 4", a: 1, b: 4, total: 2_500 },
  { what: "Paint mixed 5 : 1", a: 5, b: 1, total: 12 },
];

const faq = [
  {
    q: "How do I simplify a ratio?",
    a: "Divide both numbers by their greatest common divisor. For 6:4 the divisor is 2, so the ratio simplifies to 3:2.",
  },
  {
    q: "How do I simplify a ratio with decimals?",
    a: `Multiply both numbers by the same power of 10 to make them whole, then simplify. 1.5:2 becomes 15:20, which simplifies to ${simple(1.5, 2)}.`,
  },
  {
    q: "How do I find the missing number in a ratio?",
    a: `Use cross-multiplication. For A:B = C:X, X = B x C / A. If 2:3 = 10:X, then X = 3 x 10 / 2 = ${fmt(solveRatio(2, 3, 10))}.`,
  },
  {
    q: "How do I divide a number in a given ratio?",
    a: `Add the parts of the ratio, divide the total by that sum, and multiply by each part. To split 500 in the ratio 3:2, the sum is 5, so each part is 100 and the shares are ${fmt((500 * 3) / 5)} and ${fmt((500 * 2) / 5)}. The third box in the calculator does this.`,
  },
  {
    q: "How do I scale a ratio for a screen or image?",
    a: `For a 16:9 screen that is 1920 wide, the height is 9 x 1920 / 16 = ${fmt(solveRatio(16, 9, 1920))}. Keep the ratio and the picture is not stretched.`,
  },
  {
    q: "Is a ratio the same as a fraction?",
    a: `They are related but not identical. The ratio 3:2 compares two parts to each other. As fractions of the whole, the parts are 3/5 and 2/5, which is ${fmt(whatPercent(3, 5))}% and ${fmt(whatPercent(2, 5))}%.`,
  },
  {
    q: "How do I turn a ratio into a percentage?",
    a: `Divide each part by the sum of the parts and multiply by 100. For 1:3 the sum is 4, so the parts are ${fmt(whatPercent(1, 4))}% and ${fmt(whatPercent(3, 4))}%. The line under the simplified ratio shows this as you type.`,
  },
  {
    q: "What is the difference between 2:3 and 3:2?",
    a: "Order matters. 2:3 means the first quantity is two thirds of the second; 3:2 means it is one and a half times the second. Keep the same order on both sides when you solve A:B = C:X.",
  },
  {
    q: "Can I use decimals or unequal units in a ratio?",
    a: "Decimals are fine. Units must match on both sides, though: compare metres with metres, not metres with centimetres. Convert one side first, then enter the numbers.",
  },
  {
    q: "What does the calculator do with a zero?",
    a: "A ratio with a zero part, such as 0:5, simplifies to 0:1, and A : B = C : X cannot be solved when A is 0, because it would divide by zero. A:B with both parts 0 has no ratio.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="ratio-calculator"
      lede="Simplify a ratio to its lowest terms, or solve A : B = C : X for the missing value. Decimals are fine."
      widget={<RatioCalculator />}
      faq={faq}
      related={[
        "percentage-calculator",
        "average-calculator",
        "percent-change-calculator",
        "hours-calculator",
      ]}
    >
      <h2>What a ratio is</h2>
      <p>
        A ratio compares two quantities by how many times one fits into the other. 6 : 4 says that for every 6
        of the first there are 4 of the second. Dividing both terms by the same number gives an equivalent
        ratio, and the simplest form uses the smallest whole numbers: 6 : 4 is {simple(6, 4)}.
      </p>
      <pre>{`simplify:      divide A and B by gcd(A, B)
solve:         A : B = C : X  ->  X = B x C / A
share a total: part = total x A / (A + B)`}</pre>

      <h2>How to use the calculator</h2>
      <ol>
        <li>
          To simplify, type the two terms into A and B. The simplest form, the share of each part and the 1 :
          n form appear under them.
        </li>
        <li>
          To find a missing value, keep A and B and type C. The answer is X in A : B = C : X, which is the
          same ratio at a different scale.
        </li>
        <li>To share an amount in the ratio A : B, type the total in the last box.</li>
      </ol>
      <p>
        Worked example: a recipe uses 2 cups of rice for 3 servings. For 10 cups, X = 3 x 10 / 2 ={" "}
        {fmt(solveRatio(2, 3, 10))} servings.
      </p>

      <h2>Worked examples</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Question</th>
            <th scope="col">Working</th>
            <th scope="col">Answer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Simplify 6 : 4</th>
            <td>divide by 2</td>
            <td>{simple(6, 4)}</td>
          </tr>
          <tr>
            <th scope="row">Simplify 1.5 : 2</th>
            <td>x 10 gives 15 : 20, divide by 5</td>
            <td>{simple(1.5, 2)}</td>
          </tr>
          <tr>
            <th scope="row">Simplify 24 : 36</th>
            <td>divide by 12</td>
            <td>{simple(24, 36)}</td>
          </tr>
          <tr>
            <th scope="row">2 : 3 = 10 : X</th>
            <td>3 x 10 / 2</td>
            <td>X = {fmt(solveRatio(2, 3, 10))}</td>
          </tr>
          <tr>
            <th scope="row">16 : 9 = 1920 : X</th>
            <td>9 x 1920 / 16</td>
            <td>X = {fmt(solveRatio(16, 9, 1920))}</td>
          </tr>
        </tbody>
      </table>

      <h2>Equivalent ratios</h2>
      <p>
        Multiplying both terms by the same number does not change a ratio. These all equal 3 : 2, which is why
        solving A : B = C : X works.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Multiplied by</th>
            {EQUIV_MULTIPLES.map((m) => (
              <th scope="col" key={m}>
                x {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Ratio</th>
            {EQUIV_MULTIPLES.map((m) => (
              <td key={m}>
                {3 * m} : {2 * m}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <h2>Screen and image sizes</h2>
      <p>
        Width and height simplify to an aspect ratio. Keeping the ratio when you resize stops a picture being
        stretched.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Width x height</th>
            <th scope="col">Simplified ratio</th>
            <th scope="col">As 1 : n</th>
          </tr>
        </thead>
        <tbody>
          {SIZES.map(([w, h]) => (
            <tr key={`${w}x${h}`}>
              <th scope="row">
                {fmt(w)} x {fmt(h)}
              </th>
              <td>{simple(w, h)}</td>
              <td>1 : {fmt(h / w, 4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>For a 16 : 9 picture, these widths give these heights.</p>
      <table>
        <thead>
          <tr>
            <th scope="col">Width</th>
            {WIDTHS.map((w) => (
              <th scope="col" key={w}>
                {fmt(w)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Height</th>
            {WIDTHS.map((w) => (
              <td key={w}>{fmt(solveRatio(16, 9, w))}</td>
            ))}
          </tr>
        </tbody>
      </table>

      <h2>Sharing a total in a ratio</h2>
      <p>
        Add the parts, divide the total by that sum to get the size of one part, then multiply by each term.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Situation</th>
            <th scope="col">Total</th>
            <th scope="col">One part</th>
            <th scope="col">Shares</th>
          </tr>
        </thead>
        <tbody>
          {SPLITS.map((s) => (
            <tr key={s.what}>
              <th scope="row">{s.what}</th>
              <td>{fmt(s.total)}</td>
              <td>{fmt(s.total / (s.a + s.b))}</td>
              <td>
                {fmt((s.total * s.a) / (s.a + s.b))} and {fmt((s.total * s.b) / (s.a + s.b))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li>
          Swapping the order. 3 : 2 and 2 : 3 are different ratios. Keep the same order on both sides of the
          equals sign.
        </li>
        <li>
          Treating the parts as fractions of each other. In 3 : 2, the first part is 3/5 of the whole, not 3/2
          of it.
        </li>
        <li>Mixing units. Convert both quantities to the same unit before you compare them.</li>
      </ul>

      <h2>What this calculator leaves out</h2>
      <p>
        It works with two terms. Ratios with three or more terms, such as 2 : 3 : 5, are not supported, but
        you can compare them two terms at a time. It does not convert units for you, and it does not check
        that a proportion is reasonable for your problem: ratios of unlike things, such as price per item, are
        rates and need their units kept. To express a part as a percent of the whole, use the{" "}
        <Link href="/percentage-calculator">percentage calculator</Link>; to compare how a value changed, use
        the <Link href="/percent-change-calculator">percent change calculator</Link>.
      </p>
    </ToolPage>
  );
}
