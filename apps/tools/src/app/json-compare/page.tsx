import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import JsonDiffTool from "@/components/JsonDiffTool";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("json-compare");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "Does key order matter?",
    a: "No. Two objects with the same keys and values are identical here, however the keys are ordered. This is a structural comparison, not a text diff.",
  },
  {
    q: "How are arrays compared?",
    a: "By position. Element 0 is compared with element 0, and so on. If an item is inserted at the start of an array, every later index will show as changed and the last one as added. That is a known limit of index-based comparison.",
  },
  {
    q: "What does the path mean?",
    a: 'It locates the value, starting from $ (the root). $.user.roles[1] is the second item of the roles array inside user. A key that is not a plain identifier is written in brackets, such as $["first name"].',
  },
  {
    q: 'Does it tell 1 from "1"?',
    a: "Yes. A number and a string with the same digits are different values, so the tool reports a change. 1 and 1.0 are the same number and are not reported.",
  },
  {
    q: "Is null the same as a missing key?",
    a: "No. A key whose value is null is a value. If one side has the key with null and the other side has no such key, the tool reports it as added or removed.",
  },
  {
    q: "Can I ignore a field such as a timestamp?",
    a: "There is no ignore option. Delete that field from both documents first, then compare.",
  },
  {
    q: "Is my data uploaded?",
    a: "No. Both documents are parsed and compared in your browser, and the page's code makes no network request with your text. The site does run page-level analytics, described in the privacy policy, but that does not include what you paste.",
  },
  {
    q: "Is there a limit on differences?",
    a: "The list shows the first 500. If you reach it, the two documents are very different and a text diff in your editor may be more useful.",
  },
  {
    q: "How do I compare two JSON files in code?",
    a: "In Node, util.isDeepStrictEqual(a, b) returns true or false after you parse both files. In Python, a == b on two parsed documents ignores key order but not array order. Both give a yes or no, not a list of differences. The page shows a command-line way to get a text diff as well.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="json-compare"
      lede="Paste two JSON documents and see exactly what was added, removed or changed, by path. Key order is ignored, and everything stays in your browser."
      widget={<JsonDiffTool />}
      faq={faq}
      related={["json-formatter", "json-validator", "json-to-csv", "json-minifier"]}
    >
      <h2>What a JSON diff is</h2>
      <p>
        A JSON diff compares the data in two JSON documents and lists the differences. This tool parses both
        sides first and compares the values, not the text, so spacing, indentation and key order never show up
        as changes. Each difference is given with its path, such as <code>$.roles[1]</code>.
      </p>

      <h2>How to compare two JSON documents</h2>
      <ol>
        <li>
          Paste the original into the left box and the changed version into the right box. Press{" "}
          <strong>Sample</strong> to see an example, or <strong>Swap sides</strong> to reverse them.
        </li>
        <li>
          Press <strong>Compare</strong>. If either side is invalid JSON, the error tells you which side and
          where.
        </li>
        <li>
          Read the list: <strong>added</strong> values exist only on the right, <strong>removed</strong> only
          on the left, and <strong>changed</strong> shows the old and new value.
        </li>
      </ol>

      <h2>Example</h2>
      <p>Left:</p>
      <pre>{`{"name":"Ada","roles":["admin","editor"],"active":true,"limit":10}`}</pre>
      <p>Right:</p>
      <pre>{`{"name":"Ada","roles":["admin","viewer"],"active":false,"plan":"pro"}`}</pre>
      <p>The tool reports four differences:</p>
      <pre>{`changed  $.roles[1]  "editor" -> "viewer"
changed  $.active    true -> false
removed  $.limit     10
added    $.plan      "pro"`}</pre>
      <p>
        <code>name</code> is the same on both sides, so it is not listed.
      </p>

      <h2>What counts as a difference</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Case</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Same keys and values in a different order</td>
            <td>No difference</td>
          </tr>
          <tr>
            <td>One side pretty-printed, the other minified</td>
            <td>No difference</td>
          </tr>
          <tr>
            <td>
              <code>1</code> on one side, <code>1.0</code> on the other
            </td>
            <td>No difference: both are the number 1</td>
          </tr>
          <tr>
            <td>
              <code>1</code> on one side, <code>&quot;1&quot;</code> on the other
            </td>
            <td>Changed: a number and a string</td>
          </tr>
          <tr>
            <td>
              <code>{"{}"}</code> on one side, <code>[]</code> on the other
            </td>
            <td>Changed: an object and an array</td>
          </tr>
          <tr>
            <td>
              <code>null</code> on one side, key missing on the other
            </td>
            <td>Added or removed: null is a value</td>
          </tr>
          <tr>
            <td>An item inserted at the start of an array</td>
            <td>
              Every later index shows as changed, and the new last index as added. Arrays are matched by
              position, not by content.
            </td>
          </tr>
          <tr>
            <td>Two large integers that differ only after the 15th or 16th digit</td>
            <td>No difference: both become the same 64-bit float</td>
          </tr>
          <tr>
            <td>A key repeated within one document</td>
            <td>Only the last value is compared</td>
          </tr>
        </tbody>
      </table>
      <p>
        The array rule is the one that surprises people most. For lists of records with an ID, sort both
        arrays the same way before comparing, or compare one record at a time.
      </p>

      <h2>How the paths are written</h2>
      <p>
        <code>$</code> is the root, <code>.name</code> follows an object key, and <code>[2]</code> is an array
        position counted from zero. Keys that are not plain identifiers, such as ones with a space or a
        hyphen, are written as <code>{'["first name"]'}</code>. The{" "}
        <Link href="/json-viewer">JSON viewer</Link> uses the same format and copies the path when you click a
        key.
      </p>

      <h2>Why a structural diff beats a text diff</h2>
      <p>
        A normal text diff reports a change whenever two lines differ, including when a service returns the
        same object with its keys in a different order, or when one file is minified and the other
        pretty-printed. Comparing the parsed structure ignores those differences and shows only changes in the
        data.
      </p>

      <h2>Compare JSON in code</h2>
      <p>
        JavaScript. <code>isDeepStrictEqual</code> says whether two parsed values are equal. It ignores key
        order and respects array order and types:
      </p>
      <pre>{`import { isDeepStrictEqual } from "node:util";

console.log(isDeepStrictEqual({ a: 1, b: [1, 2] }, { b: [1, 2], a: 1 })); // true
console.log(isDeepStrictEqual({ b: [1, 2] }, { b: [2, 1] })); // false
console.log(isDeepStrictEqual({ a: 1 }, { a: "1" })); // false`}</pre>
      <p>
        Python. <code>==</code> on parsed documents ignores key order but not array order. It also treats{" "}
        <code>True</code> and <code>1</code> as equal, because they are in Python, so a boolean and a number
        can compare equal there although this tool reports them as different:
      </p>
      <pre>{`import json

a = json.loads('{"a":1,"b":[1,2]}')
b = json.loads('{"b":[1,2],"a":1}')
print(a == b)                  # True
print({"a": 1} == {"a": "1"})  # False
print({"a": 1} == {"a": True}) # True`}</pre>
      <p>
        On the command line you can get a line-by-line diff by sorting the keys of both files first. This uses
        a shell with process substitution, such as bash:
      </p>
      <pre>{`diff <(python -m json.tool --sort-keys a.json) <(python -m json.tool --sort-keys b.json)`}</pre>
      <p>
        It prints nothing when the files hold the same data. It still treats array order and number spellings
        such as <code>1.0</code> versus <code>1</code> as differences, because it compares text.
      </p>

      <h2>Typical uses</h2>
      <ul>
        <li>Checking that an API response did not change after a deploy.</li>
        <li>Finding what differs between two environments&apos; config files.</li>
        <li>Reviewing a fixture or snapshot update in a test.</li>
      </ul>
      <p>
        Tip: <Link href="/json-formatter">format both documents first</Link> if you also want to read them
        side by side. If a document will not parse, the <Link href="/json-validator">JSON validator</Link>{" "}
        shows where it breaks.
      </p>

      <h2>Limits of this tool</h2>
      <ul>
        <li>Arrays are compared by position. There is no matching by ID and no moved-item detection.</li>
        <li>There is no ignore list and no option to compare arrays as sets.</li>
        <li>The list stops at 500 differences.</li>
        <li>You paste text. There is no file upload.</li>
        <li>
          Everything runs in your browser. The tool&apos;s code does not send what you paste anywhere; see the{" "}
          <Link href="/privacy/">privacy policy</Link> for the analytics the site does run.
        </li>
      </ul>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href="https://www.rfc-editor.org/rfc/rfc8259" rel="noopener noreferrer">
            RFC 8259, The JavaScript Object Notation (JSON) Data Interchange Format
          </a>{" "}
          (object members are unordered, repeated names, number precision), checked 16 November 2026.
        </li>
        <li>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse"
            rel="noopener noreferrer"
          >
            MDN: JSON.parse()
          </a>{" "}
          (large numbers lose precision), checked 16 November 2026.
        </li>
        <li>
          <a href="https://docs.python.org/3/library/json.html" rel="noopener noreferrer">
            Python documentation: json
          </a>{" "}
          (repeated names, the json.tool command), checked 16 November 2026.
        </li>
      </ul>
      <p>
        The difference list and the case table come from running the tool&apos;s own comparison code on those
        inputs. The code snippets were run in Node 22 and Python 3.10.
      </p>
    </ToolPage>
  );
}
