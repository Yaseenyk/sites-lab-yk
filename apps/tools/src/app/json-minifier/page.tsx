import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import JsonTool from "@/components/JsonTool";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("json-minifier");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "What does minifying JSON do?",
    a: "It removes every space, tab and line break that is not inside a string, so the same data takes fewer bytes. The data itself does not change.",
  },
  {
    q: "Does minifying change my data?",
    a: "No values change, with a few rounding exceptions that come from reading the JSON as JavaScript. Key order is kept, unless you tick Sort keys or a key is a whole number (JavaScript lists those first). Numbers are re-serialised, so 1.0 becomes 1 and 1e2 becomes 100, which is the same number. Integers above 9,007,199,254,740,991 can lose digits.",
  },
  {
    q: "How much smaller will it get?",
    a: "It depends on how much indentation the original had. The small example on this page goes from 51 to 35 bytes, and a generated list of 100 records with 2-space indent went from 10,636 to 5,735 bytes. Already compact JSON barely changes. The tool shows both sizes so you can see your own number.",
  },
  {
    q: "Should I minify JSON I send over HTTP?",
    a: "Compressing the response with gzip or Brotli removes much of the same redundancy, so the saving from minifying on top of compression is smaller. In the generated 100-record test, gzip gave 639 bytes for the indented text and 570 for the minified text. Minifying still helps for JSON stored in databases, localStorage, URLs and config.",
  },
  {
    q: "Does minifying remove spaces inside strings?",
    a: 'No. Only whitespace between tokens is removed. A string such as "x  y" keeps both spaces.',
  },
  {
    q: "Can I minify JSON that has comments?",
    a: "No. Comments are not JSON, so the tool reports an error instead of minifying. Remove the comments first, or use a tool made for JSONC or JSON5.",
  },
  {
    q: "How do I undo minification?",
    a: "Paste the minified text into the JSON formatter and press Format. Minifying drops only layout, so the formatter restores a readable version. Your original indentation choice and any custom spacing are not remembered, but you can pick 2 spaces, 4 spaces or tabs again.",
  },
  {
    q: "Is minified JSON the same as compressed or encrypted JSON?",
    a: "No. Minified JSON is still plain readable JSON on one line. Compression such as gzip turns it into binary data, and nothing about minifying hides its contents.",
  },
  {
    q: "Is my JSON uploaded anywhere?",
    a: "No. Minifying runs in your browser and the page's code makes no network request with your text. The site does run page-level analytics, described in the privacy policy, but that does not include what you paste.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="json-minifier"
      lede="Strip the whitespace from JSON to make it smaller. Paste, press Minify, and compare the sizes. It runs in your browser."
      widget={<JsonTool primary="minify" />}
      faq={faq}
      related={["json-formatter", "json-validator", "json-compare", "json-to-csv"]}
    >
      <h2>What minifying JSON means</h2>
      <p>
        Minifying JSON removes the spaces, tabs and line breaks between its tokens, leaving the shortest text
        that still means the same thing. The opposite job is the{" "}
        <Link href="/json-formatter">JSON formatter</Link>, which adds layout back.
      </p>

      <h2>How to minify JSON</h2>
      <ol>
        <li>Paste your JSON into the Input box.</li>
        <li>
          Press <strong>Minify</strong>. If the JSON is invalid you will see the error instead, because only
          valid JSON can be minified.
        </li>
        <li>
          Compare the input and output sizes shown above each box, then press <strong>Copy</strong>.
        </li>
      </ol>

      <h2>Example</h2>
      <pre>{`{
  "id": 7,
  "tags": [ "a", "b" ],
  "ok": true
}`}</pre>
      <p>minifies to</p>
      <pre>{`{"id":7,"tags":["a","b"],"ok":true}`}</pre>
      <p>
        The first text is 51 bytes and the second is 35, so 16 bytes of layout are gone. Only whitespace
        between tokens is removed; whitespace inside a string is data and stays.
      </p>

      <h2>How much does it save?</h2>
      <p>
        It depends on how the original was indented and how much of it is keys and values rather than layout.
        As one measured example, a generated list of 100 records, each with an id, a name, a flag and two
        tags, indented with 2 spaces:
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Form</th>
            <th scope="col">Plain bytes</th>
            <th scope="col">After gzip</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Indented with 2 spaces</th>
            <td>10,636</td>
            <td>639</td>
          </tr>
          <tr>
            <th scope="row">Minified</th>
            <td>5,735</td>
            <td>570</td>
          </tr>
        </tbody>
      </table>
      <p>
        Minifying took off 46% of the plain text but only about 11% of the gzipped size, because gzip already
        squeezes out repeated whitespace. These records repeat the same keys, which is why gzip does so well
        here. Your data will give different numbers. This is the code that produced them, for Node:
      </p>
      <pre>{`import { gzipSync } from "node:zlib";

const rows = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: "user" + (i + 1),
  active: i % 2 === 0,
  tags: ["a", "b"],
}));
const pretty = JSON.stringify(rows, null, 2);
const mini = JSON.stringify(rows);
const bytes = (s) => new TextEncoder().encode(s).length;
console.log("pretty", bytes(pretty), "min", bytes(mini));
console.log("pretty.gz", gzipSync(pretty).length, "min.gz", gzipSync(mini).length);`}</pre>

      <h2>What minifying can change</h2>
      <p>
        The tool reads the JSON into a JavaScript value and writes it back, so it carries the same few
        rewrites as the formatter: <code>1.0</code> becomes <code>1</code>, integers above 2^53 lose digits,
        and whole-number keys move to the front of their object. The{" "}
        <Link href="/json-formatter">JSON formatter</Link> page has the full table. Tick{" "}
        <strong>Sort keys</strong> if you want the keys in alphabetical order as well.
      </p>

      <h2>Minify JSON in code</h2>
      <p>JavaScript. With no third argument, JSON.stringify writes no whitespace:</p>
      <pre>{`const text = '{\\n  "id": 7,\\n  "tags": [ "a", "b" ],\\n  "ok": true\\n}';
console.log(JSON.stringify(JSON.parse(text)));`}</pre>
      <p>
        Python. By default <code>json.dumps</code> puts a space after every comma and colon, so pass the
        compact separators:
      </p>
      <pre>{`import json

text = '{"id": 7, "tags": [ "a", "b" ], "ok": true}'
print(json.dumps(json.loads(text), separators=(",", ":"), ensure_ascii=False))`}</pre>
      <p>
        On the command line, Python&apos;s <code>json.tool</code> has a compact mode (Python 3.9 or newer):
      </p>
      <pre>{`python -m json.tool --compact in.json`}</pre>

      <h2>When minifying is worth it</h2>
      <ul>
        <li>
          JSON stored in a database column, a cache key or <code>localStorage</code>, where every byte is
          kept.
        </li>
        <li>Payloads in a URL, a cookie or a QR code, where length is limited.</li>
        <li>Config files bundled into an app that are never edited by hand.</li>
      </ul>
      <h2>When to leave it readable</h2>
      <p>
        Keep formatted JSON in files people edit and review in version control. A minified file is one long
        line, so every change shows up as a whole-file diff. Minify at build time, not in the source. To see
        what changed between two versions regardless of layout, use{" "}
        <Link href="/json-compare">JSON compare</Link>.
      </p>

      <h2>Limits of this tool</h2>
      <ul>
        <li>
          It minifies standard JSON only. Comments, trailing commas and single quotes are errors; the{" "}
          <Link href="/guides/json-parse-errors/">guide to JSON parse errors</Link> shows how to fix each.
        </li>
        <li>
          It shortens layout, not content: key names and values stay as they are, and there is no option to
          rename keys.
        </li>
        <li>It minifies one document pasted as text. There is no file upload and no size cap.</li>
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
          (insignificant whitespace is allowed around the structural characters, numbers), checked 16 November
          2026.
        </li>
        <li>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify"
            rel="noopener noreferrer"
          >
            MDN: JSON.stringify()
          </a>{" "}
          (output without whitespace when no space argument is given), checked 16 November 2026.
        </li>
        <li>
          <a href="https://docs.python.org/3/library/json.html" rel="noopener noreferrer">
            Python documentation: json
          </a>{" "}
          (compact separators, the json.tool command), checked 16 November 2026.
        </li>
      </ul>
      <p>The byte counts above were measured in Node 22 with the code shown.</p>
    </ToolPage>
  );
}
