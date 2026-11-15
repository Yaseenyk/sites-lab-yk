import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import JsonTreeTool from "@/components/JsonTreeTool";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("json-viewer");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "What does a JSON viewer do?",
    a: "It shows JSON as an indented tree of objects and arrays that you can expand and collapse, so large or deeply nested documents are easy to read and navigate.",
  },
  {
    q: "How do I get the path to a value?",
    a: "Click its key in the tree. The path, such as $.user.roles[0], is copied to your clipboard. $ stands for the whole document, so in your own code replace it with the variable that holds the parsed JSON.",
  },
  {
    q: "Is my JSON uploaded anywhere?",
    a: "No. Parsing and drawing the tree happen in your browser, and the page's code makes no network request with your text. The site does run page-level analytics, described in the privacy policy, but that does not include what you paste.",
  },
  {
    q: "Why does the viewer say my JSON is invalid?",
    a: "The status bar shows the parser's message with the line and column. The usual causes are trailing commas, single quotes, unquoted keys and comments, which JSON does not allow. The JSON validator page lists each message and its fix.",
  },
  {
    q: "Can it handle large files?",
    a: "Yes, within your browser's memory. Branches are drawn only when opened, and long lists show 100 items at a time, so very large documents stay responsive. You paste the text; there is no file upload.",
  },
  {
    q: "Can I edit the JSON in the tree?",
    a: "No. The tree is read-only. Edit the text in the JSON box and the tree redraws as you type. To tidy the text, use the JSON formatter.",
  },
  {
    q: "Can I search the tree?",
    a: "There is no search box. Press Expand all and use your browser's find command (Ctrl or Cmd + F) to look for a key or value. Collapsed branches are not drawn, so the browser cannot find text inside them.",
  },
  {
    q: "Why do my keys appear in a different order from my text?",
    a: 'JavaScript lists keys that look like whole numbers, such as "1" or "42", first in ascending order, then the others in their original order. The tree follows that order. A repeated key is shown once, with its last value.',
  },
  {
    q: "Why does a large number in my JSON look different in the tree?",
    a: "The number is read as a 64-bit float, so integers above 9,007,199,254,740,991 are rounded: 12345678901234567890 is shown as 12345678901234567000. Keep very large IDs as strings.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="json-viewer"
      lede="Paste JSON to browse it as a collapsible tree. Expand or collapse branches, click a key to copy its path, and see exactly where it is invalid if it is not."
      widget={<JsonTreeTool />}
      faq={faq}
      related={["json-formatter", "json-validator", "json-compare", "json-to-csv"]}
    >
      <h2>What a JSON viewer is for</h2>
      <p>
        A JSON viewer draws a document as a tree: objects and arrays are branches you can open and close, and
        strings, numbers, booleans and null are the leaves. It answers the question &ldquo;where is this
        value, and how is the data nested?&rdquo; faster than scrolling through formatted text.
      </p>

      <h2>How to view JSON as a tree</h2>
      <ol>
        <li>
          Paste your JSON into the box, or press <strong>Sample</strong> to try it.
        </li>
        <li>
          Open and close branches with the arrows, or use <strong>Expand all</strong> and{" "}
          <strong>Collapse all</strong>. A closed branch shows how many items it holds, for example{" "}
          <code>2 items</code>.
        </li>
        <li>
          Click any key to copy its path, for example <code>$.orders[1].total</code>.
        </li>
      </ol>
      <p>
        The first two levels start open. Lists longer than 100 items show the first 100, with a button to show
        more. The count above the tree is the number of nodes: every object, array and value, including the
        root.
      </p>

      <h2>Example</h2>
      <pre>{`{"user":{"id":1042,"roles":["admin","editor"],"first name":"Ada"},"orders":[{"total":12.5}]}`}</pre>
      <table>
        <thead>
          <tr>
            <th scope="col">Value</th>
            <th scope="col">Path copied when you click its key</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>the whole document</td>
            <td>
              <code>$</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>1042</code>
            </td>
            <td>
              <code>$.user.id</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>&quot;admin&quot;</code>
            </td>
            <td>
              <code>$.user.roles[0]</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>&quot;Ada&quot;</code>
            </td>
            <td>
              <code>{'$.user["first name"]'}</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>12.5</code>
            </td>
            <td>
              <code>$.orders[0].total</code>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>How the paths are written</h2>
      <ul>
        <li>
          <code>$</code> is the root of the document.
        </li>
        <li>
          <code>.name</code> follows an object key that is a plain identifier: letters, digits, underscore or
          dollar sign, not starting with a digit.
        </li>
        <li>
          <code>{'["first name"]'}</code> is used for any other key, such as one with a space, a hyphen or a
          leading digit. The key is written as a JSON string.
        </li>
        <li>
          <code>[0]</code> is an array position, counted from zero.
        </li>
      </ul>
      <p>
        The paths follow the common JSONPath style, but JSONPath libraries differ in small ways, so check a
        copied path against the library you use. To use one in JavaScript or Python, swap <code>$</code> for
        your variable name: <code>data.user.roles[0]</code> in JavaScript, or{" "}
        <code>{'data["user"]["roles"][0]'}</code> in Python.
      </p>

      <h2>Read values from JSON in code</h2>
      <p>
        JavaScript. This lists every path in the same format the viewer copies, which is handy for finding a
        key in a document you cannot paste:
      </p>
      <pre>{String.raw`function paths(value, path = "$", out = []) {
  out.push(path);
  if (Array.isArray(value)) {
    value.forEach((item, i) => paths(item, path + "[" + i + "]", out));
  } else if (value !== null && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      const next = /^[A-Za-z_$][\w$]*$/.test(key) ? path + "." + key : path + "[" + JSON.stringify(key) + "]";
      paths(item, next, out);
    }
  }
  return out;
}

const doc = JSON.parse('{"user":{"id":1042,"roles":["admin","editor"],"first name":"Ada"},"orders":[{"total":12.5}]}');
console.log(paths(doc).join("\n"));
console.log(doc.user.roles[0], doc.orders[0].total, doc.user["first name"]);`}</pre>
      <p>Python reads the same value by indexing the parsed result:</p>
      <pre>{`import json

data = json.loads('{"user":{"id":1042,"roles":["admin","editor"]},"orders":[{"total":12.5}]}')
print(data["user"]["roles"][0], data["orders"][0]["total"])`}</pre>

      <h2>Reading tips and limits</h2>
      <ul>
        <li>
          Strings are shown with their JSON quotes and escapes. An empty object or array shows as{" "}
          <code>0 items</code> when closed.
        </li>
        <li>
          Numbers are shown as JavaScript reads them, so very large integers are rounded and <code>1.0</code>{" "}
          shows as <code>1</code>.
        </li>
        <li>
          If a key is repeated in the text, the tree shows it once with the last value. If you need to find
          duplicates, check the source text.
        </li>
        <li>The tree is read-only and has no search box or file upload. You paste text.</li>
        <li>
          Everything runs in your browser. The tool&apos;s code does not send what you paste anywhere; see the{" "}
          <Link href="/privacy/">privacy policy</Link> for the analytics the site does run.
        </li>
      </ul>

      <h2>Tree view or formatted text?</h2>
      <p>
        A tree is best for exploring: you can fold away what you do not need and see how the data is nested.
        Formatted text is best for reading a whole document top to bottom or for copying it. If you need the
        text, use the <Link href="/json-formatter">JSON formatter</Link>. To check syntax only, use the{" "}
        <Link href="/json-validator">JSON validator</Link>. If the document will not parse, the{" "}
        <Link href="/guides/json-parse-errors/">guide to JSON parse errors</Link> explains the six mistakes
        behind most failures. To turn an array of records into a table, use{" "}
        <Link href="/json-to-csv">JSON to CSV</Link>.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href="https://www.rfc-editor.org/rfc/rfc8259" rel="noopener noreferrer">
            RFC 8259, The JavaScript Object Notation (JSON) Data Interchange Format
          </a>{" "}
          (the value types, repeated names, number limits), checked 16 November 2026.
        </li>
        <li>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse"
            rel="noopener noreferrer"
          >
            MDN: JSON.parse()
          </a>{" "}
          (precision loss for large numbers), checked 16 November 2026.
        </li>
      </ul>
      <p>
        The path listing was produced by running the code above in Node 22 on the example document. How the
        tool writes paths and counts nodes comes from the tool&apos;s own source.
      </p>
    </ToolPage>
  );
}
