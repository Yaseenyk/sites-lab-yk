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
    a: "Click its key in the tree. The path, such as $.user.roles[0], is copied to your clipboard, ready to paste into code or a JSONPath query.",
  },
  {
    q: "Is my JSON uploaded anywhere?",
    a: "No. Parsing and drawing the tree happen in your browser, and the text never leaves your device.",
  },
  {
    q: "Why does the viewer say my JSON is invalid?",
    a: "The status bar shows the parser's message with the line and column. The usual causes are trailing commas, single quotes, unquoted keys and comments, which JSON does not allow.",
  },
  {
    q: "Can it handle large files?",
    a: "Yes, within your browser's memory. Branches are drawn only when opened, and long lists show 100 items at a time, so very large documents stay responsive.",
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
      <h2>How to view JSON as a tree</h2>
      <ol>
        <li>
          Paste your JSON into the box, or press <strong>Sample</strong> to try it.
        </li>
        <li>
          Open and close branches with the arrows, or use <strong>Expand all</strong> and{" "}
          <strong>Collapse all</strong>.
        </li>
        <li>
          Click any key to copy its path, for example <code>$.orders[1].total</code>.
        </li>
      </ol>

      <h2>Tree view or formatted text?</h2>
      <p>
        A tree is best for exploring: you can fold away what you do not need and see how the data is nested.
        Formatted text is best for reading a whole document top to bottom or for copying it. If you need the
        text, use the <Link href="/json-formatter">JSON formatter</Link>. To check syntax only, use the{" "}
        <Link href="/json-validator">JSON validator</Link>.
      </p>
    </ToolPage>
  );
}
