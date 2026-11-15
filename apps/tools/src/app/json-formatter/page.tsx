import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import JsonTool from "@/components/JsonTool";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("json-formatter");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I pretty print JSON?",
    a: "Paste it into the Input box and press Format. The JSON is re-indented with 2 spaces, 4 spaces or tabs, with each key and array item on its own line. Pretty printing changes the layout, not the structure. A few values are rewritten as a side effect; the section on what else the formatter changes lists them.",
  },
  {
    q: "Is my JSON uploaded anywhere?",
    a: "No. Parsing and formatting run in your browser with JavaScript's built-in JSON parser, and the page's code makes no network request with your text. The site does run page-level analytics, described in the privacy policy, but that does not include what you paste.",
  },
  {
    q: "What is the difference between formatting and validating?",
    a: "Validating only tells you whether the text is legal JSON. Formatting also rewrites it with consistent indentation so a person can read it. Formatting only works on valid JSON, so a format that fails is also a validation failure.",
  },
  {
    q: "What does Sort keys do?",
    a: "It rewrites every object with its keys in alphabetical order, at every depth. Arrays keep their order. Sorted output makes two documents much easier to compare line by line.",
  },
  {
    q: "Why did the order of my keys change?",
    a: 'JavaScript lists keys that look like whole numbers (such as "1" or "42") first, in ascending order, and the other keys after them in their original order. Because the tool formats through a JavaScript object, {"b":1,"2":2,"1":4} comes out as {"1":4,"2":2,"b":1}. Key order carries no meaning in JSON, but it can matter to a text diff.',
  },
  {
    q: "Why does formatting change my big numbers?",
    a: "JavaScript reads JSON numbers as 64-bit floats, so integers larger than 9,007,199,254,740,991 can lose precision: 12345678901234567890 is written back as 12345678901234567000. RFC 8259 says integers in the range of plus or minus (2^53 minus 1) are the ones every implementation will agree on. If you handle IDs that large, keep them as strings.",
  },
  {
    q: "Why does the formatter say my JSON is invalid when it works in my code?",
    a: "Most likely it is a JavaScript object literal, not JSON. Object literals can have unquoted keys, single quotes, trailing commas, comments and values like undefined. JSON allows none of these. The error message shows the line and column of the first problem.",
  },
  {
    q: "Can I format JSON with comments or trailing commas?",
    a: "No. Comments and trailing commas are not part of JSON, so the tool reports an error and does not guess. Remove them first. Formats such as JSONC and JSON5 allow them, but this tool reads standard JSON only.",
  },
  {
    q: "Is there a size limit?",
    a: "This page sets none. Documents of tens of megabytes may be slow because everything runs in your browser's memory.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="json-formatter"
      lede="Paste JSON and make it readable in one click. It runs in your browser, so nothing you paste is uploaded, and any error shows its line and column."
      widget={<JsonTool primary="format" />}
      faq={faq}
      related={["json-viewer", "json-validator", "json-minifier", "json-compare"]}
    >
      <h2>What a JSON formatter does</h2>
      <p>
        A JSON formatter, also called a beautifier or pretty printer, rewrites JSON with line breaks and
        indentation so you can see its structure. JSON does not care about spaces between its tokens, so
        formatted and unformatted JSON describe the same data. The opposite job, removing the whitespace, is
        done by the <Link href="/json-minifier">JSON minifier</Link>.
      </p>

      <h2>How to format JSON</h2>
      <ol>
        <li>
          Paste your JSON into the Input box, or press <strong>Sample</strong> to try it.
        </li>
        <li>
          Press <strong>Format</strong> (or Ctrl/Cmd + Enter). Choose 2 spaces, 4 spaces or tabs first if you
          have a house style.
        </li>
        <li>
          Tick <strong>Sort keys</strong> if you want stable alphabetical order, then press{" "}
          <strong>Copy</strong>.
        </li>
      </ol>
      <p>
        If the input is invalid, the status bar shows the parser&apos;s message with the line and column. The{" "}
        <Link href="/guides/json-parse-errors/">guide to the six most common JSON errors</Link> covers each
        fix, and the <Link href="/json-validator">JSON validator</Link> lists the messages and their causes.
      </p>

      <h2>Before and after</h2>
      <pre>{`{"user":{"id":1042,"roles":["admin","editor"]},"active":true}`}</pre>
      <p>becomes</p>
      <pre>{`{
  "user": {
    "id": 1042,
    "roles": [
      "admin",
      "editor"
    ]
  },
  "active": true
}`}</pre>
      <p>
        With <strong>Sort keys</strong> ticked, the same input starts with <code>&quot;active&quot;</code> and
        then <code>&quot;user&quot;</code>, because the keys are put in alphabetical order at every depth.
      </p>

      <h2>What else the formatter changes</h2>
      <p>
        The tool reads your text into a JavaScript value and writes it back out. For almost all JSON that
        gives the same data with new whitespace. A few inputs come back different, because a JavaScript value
        cannot hold everything the JSON text can:
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">In your text</th>
            <th scope="col">In the output</th>
            <th scope="col">Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>1.0</code>, <code>1e2</code>, <code>0.10</code>
            </td>
            <td>
              <code>1</code>, <code>100</code>, <code>0.1</code>
            </td>
            <td>Numbers are written in their shortest form. The value is the same.</td>
          </tr>
          <tr>
            <td>
              <code>-0</code>
            </td>
            <td>
              <code>0</code>
            </td>
            <td>The sign of zero is not written.</td>
          </tr>
          <tr>
            <td>
              <code>12345678901234567890</code>
            </td>
            <td>
              <code>12345678901234567000</code>
            </td>
            <td>The number is held as a 64-bit float and loses digits above 2^53.</td>
          </tr>
          <tr>
            <td>
              <code>1E400</code>
            </td>
            <td>
              <code>null</code>
            </td>
            <td>Too large for a 64-bit float, so it becomes infinity, which is written as null.</td>
          </tr>
          <tr>
            <td>
              <code>{String.raw`"é"`}</code>, <code>{String.raw`"\/"`}</code>
            </td>
            <td>
              <code>&quot;é&quot;</code>, <code>&quot;/&quot;</code>
            </td>
            <td>Escapes that are not required are written as the plain character.</td>
          </tr>
          <tr>
            <td>
              <code>{'{"b":1,"2":2,"1":4}'}</code>
            </td>
            <td>
              <code>{'{"1":4,"2":2,"b":1}'}</code>
            </td>
            <td>JavaScript puts whole-number keys first, in ascending order.</td>
          </tr>
          <tr>
            <td>
              <code>{'{"a":1,"a":2}'}</code>
            </td>
            <td>
              <code>{'{"a":2}'}</code>
            </td>
            <td>A repeated key keeps only its last value.</td>
          </tr>
        </tbody>
      </table>
      <p>
        If an exact digit string or the exact key order matters, do not round-trip the document through any
        JavaScript-based formatter. Keep long IDs as strings in the source.
      </p>

      <h2>Format JSON in code</h2>
      <p>JavaScript, in a browser or Node:</p>
      <pre>{`const text = '{"user":{"id":1042,"roles":["admin","editor"]},"active":true}';
console.log(JSON.stringify(JSON.parse(text), null, 2));`}</pre>
      <p>
        The third argument is the indent: a number of spaces, or a string such as a tab. Python, from the
        standard library:
      </p>
      <pre>{`import json

text = '{"user":{"id":1042,"roles":["admin","editor"]},"active":true}'
print(json.dumps(json.loads(text), indent=2, ensure_ascii=False))`}</pre>
      <p>
        <code>ensure_ascii=False</code> keeps accented letters and emoji as they are instead of writing{" "}
        <code>{String.raw`\uXXXX`}</code> escapes. Add <code>sort_keys=True</code> to sort the keys. Python
        keeps whole-number keys in their original order, unlike JavaScript, and reads large integers exactly.
      </p>
      <p>On the command line, Python ships a formatter. It indents with 4 spaces unless you say otherwise:</p>
      <pre>{`python -m json.tool in.json
python -m json.tool --indent 2 --sort-keys in.json
cat in.json | python -m json.tool`}</pre>
      <p>To use Node instead, read standard input:</p>
      <pre>{`node -e 'console.log(JSON.stringify(JSON.parse(require("fs").readFileSync(0, "utf8")), null, 2))' < in.json`}</pre>

      <h2>Limits of this tool</h2>
      <ul>
        <li>
          It reads standard JSON only. Comments, trailing commas, single quotes and unquoted keys are errors,
          not something it repairs.
        </li>
        <li>
          It formats one JSON document. A file with one JSON value per line (JSON Lines) fails with{" "}
          <code>Unexpected non-whitespace character after JSON</code>; format each line on its own.
        </li>
        <li>You paste text. There is no file upload and no size cap, but a very large paste is slow.</li>
        <li>
          Everything runs in your browser. The tool&apos;s code does not send what you paste anywhere; see the{" "}
          <Link href="/privacy/">privacy policy</Link> for the analytics the site does run.
        </li>
      </ul>

      <h2>What counts as valid JSON</h2>
      <p>
        JSON is stricter than a JavaScript object literal. Keys and strings use double quotes, there are no
        trailing commas and no comments, and the only values are objects, arrays, strings, numbers,{" "}
        <code>true</code>, <code>false</code> and <code>null</code>. The format is defined in RFC 8259. The
        full list of rules, with the error message for each, is on the{" "}
        <Link href="/json-validator">JSON validator</Link> page. To browse a large document without reading it
        all, use the <Link href="/json-viewer">JSON viewer</Link>.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href="https://www.rfc-editor.org/rfc/rfc8259" rel="noopener noreferrer">
            RFC 8259, The JavaScript Object Notation (JSON) Data Interchange Format
          </a>{" "}
          (grammar, numbers, repeated names), checked 16 November 2026.
        </li>
        <li>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify"
            rel="noopener noreferrer"
          >
            MDN: JSON.stringify()
          </a>{" "}
          (the indent argument, how Infinity becomes null), checked 16 November 2026.
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
        <li>
          <a href="https://docs.python.org/3/library/json.html" rel="noopener noreferrer">
            Python documentation: json
          </a>{" "}
          (dumps options, the json.tool command), checked 16 November 2026.
        </li>
      </ul>
      <p>
        The table of rewritten values was produced by running the same steps the tool uses, JSON.parse then
        JSON.stringify, in Node 22.
      </p>
    </ToolPage>
  );
}
