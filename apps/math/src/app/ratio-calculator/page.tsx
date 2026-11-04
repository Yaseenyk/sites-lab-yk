import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import ToolPage from "@/components/ToolPage";
import { RatioCalculator } from "@/components/RatioAndAverage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("ratio-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I simplify a ratio?",
    a: "Divide both numbers by their greatest common divisor. For 6:4 the divisor is 2, so the ratio simplifies to 3:2.",
  },
  {
    q: "How do I simplify a ratio with decimals?",
    a: "Multiply both numbers by the same power of 10 to make them whole, then simplify. 1.5:2 becomes 15:20, which simplifies to 3:4.",
  },
  {
    q: "How do I find the missing number in a ratio?",
    a: "Use cross-multiplication. For A:B = C:X, X = B x C / A. If 2:3 = 10:X, then X = 3 x 10 / 2 = 15.",
  },
  {
    q: "How do I scale a ratio for a screen or image?",
    a: "For a 16:9 screen that is 1920 wide, the height is 9 x 1920 / 16 = 1080.",
  },
  {
    q: "Is a ratio the same as a fraction?",
    a: "They are related but not identical. The ratio 3:2 compares two parts to each other. As fractions of the whole, the parts are 3/5 and 2/5.",
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
      <h2>The method</h2>
      <pre>{`simplify:   divide A and B by gcd(A, B)
solve:      A : B = C : X  ->  X = B x C / A`}</pre>

      <h2>Worked examples</h2>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Simplify 6 : 4</td>
            <td>3 : 2</td>
          </tr>
          <tr>
            <td>Simplify 1.5 : 2</td>
            <td>3 : 4</td>
          </tr>
          <tr>
            <td>2 : 3 = 10 : X</td>
            <td>X = 15</td>
          </tr>
          <tr>
            <td>16 : 9 = 1920 : X</td>
            <td>X = 1080</td>
          </tr>
        </tbody>
      </table>
      <p>
        Scaling a recipe is the same sum: if 2 cups of rice make 3 servings, 10 cups make 15. To express a
        part as a share of the whole, use the <Link href="/percentage-calculator">percentage calculator</Link>
        .
      </p>
    </ToolPage>
  );
}
