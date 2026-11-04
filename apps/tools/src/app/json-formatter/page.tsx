import Link from "next/link";
import { AdSlot, JsonLd, faqJsonLd, pageMetadata, toolJsonLd } from "@sites/shell";
import JsonTool from "@/components/JsonTool";
import { AD_SLOT_CONTENT, site } from "@/site";

const path = "/json-formatter/";
const title = "JSON Formatter & Validator";
const description =
  "Format, minify and validate JSON in your browser. Errors show the line and column. Nothing is uploaded.";

export const metadata = pageMetadata(site, { title, description, path });

const faq = [
  { q: "Is my JSON uploaded anywhere?", a: "No. Parsing and formatting run in your browser with JavaScript's built-in JSON parser. The text never leaves your device." },
  { q: "Why does my JSON say it is invalid?", a: "The most common causes are a trailing comma, single quotes instead of double quotes, unquoted keys, comments, and values such as undefined or NaN, none of which are allowed in JSON." },
  { q: "What does Sort keys do?", a: "It rewrites every object with its keys in alphabetical order, at every depth. Arrays keep their order. This makes two JSON documents easier to compare." },
  { q: "Is there a size limit?", a: "There is no limit set by this page. Very large documents (tens of megabytes) may be slow because everything runs in your browser's memory." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={toolJsonLd(site, { name: title, description, path })} />
      <JsonLd data={faqJsonLd(faq)} />
      <h1>{title}</h1>
      <p className="lede">Paste JSON, then format it, minify it, or check that it is valid. Everything runs in your browser.</p>
      <JsonTool />
      <AdSlot slot={AD_SLOT_CONTENT} />
      <div className="prose">
        <h2>How to use it</h2>
        <ol>
          <li>Paste your JSON into the Input box.</li>
          <li><strong>Format</strong> indents it with 2 spaces, 4 spaces or tabs. <strong>Minify</strong> removes all whitespace. <strong>Validate</strong> only checks it.</li>
          <li>If the JSON is invalid, the message under the buttons gives the position of the problem, with a line and column where the browser reports one.</li>
          <li>Use <strong>Copy output</strong> to take the result.</li>
        </ol>
        <p>
          Stuck on an error? <Link href="/guides/json-parse-errors">The guide to the six errors behind most invalid JSON</Link> shows each mistake and its fix.
        </p>
        <h2>What counts as valid JSON</h2>
        <p>
          JSON is stricter than a JavaScript object literal. Keys and strings use double quotes, there are no trailing commas, no comments, and the only values are objects, arrays, strings, numbers, <code>true</code>, <code>false</code> and <code>null</code>. The format is defined in RFC 8259.
        </p>
        <h2>Frequently asked questions</h2>
        <dl className="faq">
          {faq.map((f) => (
            <div key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
