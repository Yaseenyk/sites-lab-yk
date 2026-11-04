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
    a: "By position. Element 0 is compared with element 0, and so on. If an item is inserted at the start of an array, every later index will show as changed. That is a known limit of index-based comparison.",
  },
  {
    q: "What does the path mean?",
    a: "It locates the value, starting from $ (the root). $.user.roles[1] is the second item of the roles array inside user.",
  },
  {
    q: "Is my data uploaded?",
    a: "No. Both documents are parsed and compared in your browser. Nothing is sent anywhere.",
  },
  {
    q: "Is there a limit on differences?",
    a: "The list shows the first 500. If you reach it, the two documents are very different and a text diff in your editor may be more useful.",
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
      <h2>How to compare two JSON documents</h2>
      <ol>
        <li>
          Paste the original into the left box and the changed version into the right box. Press{" "}
          <strong>Sample</strong> to see an example.
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

      <h2>Why a structural diff beats a text diff</h2>
      <p>
        A normal text diff reports a change whenever two lines differ, including when a service returns the
        same object with its keys in a different order, or when one file is minified and the other
        pretty-printed. Comparing the parsed structure ignores those differences and shows only changes in the
        data.
      </p>

      <h2>Typical uses</h2>
      <ul>
        <li>Checking that an API response did not change after a deploy.</li>
        <li>Finding what differs between two environments&apos; config files.</li>
        <li>Reviewing a fixture or snapshot update in a test.</li>
      </ul>
      <p>
        Tip: <a href="/json-formatter/">format both documents first</a> if you also want to read them side by
        side.
      </p>
    </ToolPage>
  );
}
