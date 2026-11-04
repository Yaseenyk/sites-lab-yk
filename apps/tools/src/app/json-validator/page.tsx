import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import JsonTool from "@/components/JsonTool";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("json-validator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "Does this validate against a JSON Schema?",
    a: "No. It checks syntax only: whether the text is legal JSON under RFC 8259. Checking that fields have the right types or required keys needs a schema validator.",
  },
  {
    q: "Why is JSON with duplicate keys reported as valid?",
    a: "The JSON grammar allows repeated keys, and JSON.parse accepts them, keeping the last value. Many linters flag duplicates as a smell, but they are not a syntax error.",
  },
  {
    q: "Is my data sent to a server?",
    a: "No. The check runs in your browser using JavaScript's JSON.parse. Nothing is uploaded or stored.",
  },
  {
    q: "Why does the line and column point after the real mistake?",
    a: "The parser reports where it gave up, which is at or just after the problem. A trailing comma, for example, is reported at the closing brace that follows it. Look one token back.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="json-validator"
      lede="Paste JSON and see at once whether it is valid. If it is not, you get the line and column where the parser stopped. The check runs in your browser."
      widget={<JsonTool primary="validate" />}
      faq={faq}
      related={["json-formatter", "json-compare", "json-minifier", "base64-decode"]}
    >
      <h2>How validation works</h2>
      <p>
        The tool runs your text through the same parser your own code uses, <code>JSON.parse</code>. The
        verdict updates as you type or paste, so you do not need to press anything: the status bar below the
        editor turns green for valid JSON, or red with the error message.
      </p>

      <h2>What a validator does and does not check</h2>
      <table>
        <thead>
          <tr>
            <th>Checked</th>
            <th>Not checked</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Brackets, braces and quotes balance</td>
            <td>That fields have the right type</td>
          </tr>
          <tr>
            <td>No trailing commas or comments</td>
            <td>That required keys exist</td>
          </tr>
          <tr>
            <td>Strings are escaped correctly</td>
            <td>That values are in an allowed range</td>
          </tr>
          <tr>
            <td>Only legal value types are used</td>
            <td>That keys are unique</td>
          </tr>
        </tbody>
      </table>
      <p>
        For a structural check, use a JSON Schema validator in your project. This page answers the earlier
        question: is the text JSON at all?
      </p>

      <h2>Common reasons JSON is invalid</h2>
      <ul>
        <li>A comma after the last item in an object or array.</li>
        <li>Single quotes around strings or keys.</li>
        <li>
          Unquoted keys, comments, or JavaScript values such as <code>undefined</code> and <code>NaN</code>.
        </li>
        <li>Raw line breaks or unescaped quotes and backslashes inside a string.</li>
      </ul>
      <p>
        Each one is shown with a fix in{" "}
        <Link href="/guides/json-parse-errors">
          Why JSON.parse fails: the 6 errors behind most invalid JSON
        </Link>
        .
      </p>

      <h2>A caution about large numbers</h2>
      <p>
        A valid document can still lose data when it is read. JavaScript parses numbers as 64-bit floats, so
        integers above 9,007,199,254,740,991 are rounded. Send very large IDs as strings.
      </p>
    </ToolPage>
  );
}
