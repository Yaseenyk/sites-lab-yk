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
    a: "No values change. Key order is kept, unless you tick Sort keys. Numbers are re-serialised, so 1.0 becomes 1 and 1e2 becomes 100, which is the same number.",
  },
  {
    q: "How much smaller will it get?",
    a: "It depends on how much indentation the original had. Pretty-printed JSON with deep nesting often shrinks by a fifth or more; already compact JSON barely changes. The tool shows both sizes so you can see your own number.",
  },
  {
    q: "Should I minify JSON I send over HTTP?",
    a: "Compressing the response with gzip or Brotli removes much of the same redundancy, so the saving from minifying on top of compression is smaller. Minifying still helps for JSON stored in databases, localStorage, URLs and config.",
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
        line, so every change shows up as a whole-file diff. Minify at build time, not in the source.
      </p>
    </ToolPage>
  );
}
