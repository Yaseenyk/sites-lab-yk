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
    a: "Paste it into the Input box and press Format. The JSON is re-indented with 2 spaces, 4 spaces or tabs, with each key and array item on its own line. Pretty printing changes only whitespace, never the data.",
  },
  {
    q: "Is my JSON uploaded anywhere?",
    a: "No. Parsing and formatting run in your browser with JavaScript's built-in JSON parser. The text never leaves your device.",
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
    q: "Why does formatting change my big numbers?",
    a: "JavaScript reads JSON numbers as 64-bit floats, so integers larger than 9,007,199,254,740,991 can lose precision. If you handle IDs that large, keep them as strings.",
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
        <Link href="/guides/json-parse-errors">guide to the six most common JSON errors</Link> covers each
        fix.
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

      <h2>What counts as valid JSON</h2>
      <p>
        JSON is stricter than a JavaScript object literal. Keys and strings use double quotes, there are no
        trailing commas and no comments, and the only values are objects, arrays, strings, numbers,{" "}
        <code>true</code>, <code>false</code> and <code>null</code>. The format is defined in RFC 8259.
      </p>
    </ToolPage>
  );
}
