import { pageMetadata } from "@sites/shell";
import JsonToCsvTool from "@/components/JsonToCsvTool";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("json-to-csv");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "What JSON shape converts best?",
    a: 'An array of objects, like [{"id":1},{"id":2}]. Each object becomes a row and each key becomes a column. A single object becomes one row.',
  },
  {
    q: "What happens to nested objects?",
    a: 'With Flatten nested objects on, nested keys become dotted column names, so {"address":{"city":"London"}} gives a column called address.city. With it off, the nested object is written into one cell as JSON text.',
  },
  {
    q: "What happens to arrays inside a row?",
    a: 'An array is written into a single cell as JSON text, for example ["a","b"]. Splitting arrays into extra columns or rows would change the shape of your data, so the tool does not guess.',
  },
  {
    q: "Will it open correctly in Excel?",
    a: "The downloaded file includes a UTF-8 byte-order mark, which helps Excel read accents and non-Latin text correctly. In some regions Excel expects a semicolon delimiter, which you can choose.",
  },
  {
    q: "Is there a security risk opening the CSV?",
    a: "If a value starts with =, +, - or @, a spreadsheet may treat it as a formula. Review CSV from untrusted JSON before opening it in Excel or Google Sheets.",
  },
  {
    q: "Is my data uploaded?",
    a: "No. The conversion runs in your browser, and the CSV is generated on your device.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="json-to-csv"
      lede="Turn a JSON array into a CSV file for Excel or Google Sheets. Nested objects are flattened, the delimiter is yours to choose, and nothing is uploaded."
      widget={<JsonToCsvTool />}
      faq={faq}
      related={["json-formatter", "json-validator", "json-compare", "json-minifier"]}
    >
      <h2>How to convert JSON to CSV</h2>
      <ol>
        <li>
          Paste a JSON array of objects, or press <strong>Sample</strong>.
        </li>
        <li>
          Pick a delimiter and decide whether to flatten nested objects, then press <strong>Convert</strong>.
        </li>
        <li>
          Press <strong>Copy</strong> or <strong>Download .csv</strong>.
        </li>
      </ol>

      <h2>Example</h2>
      <pre>{`[{"id":1,"name":"Ada","address":{"city":"London"}},
 {"id":2,"name":"Grace, Rear Adm.","address":{"city":"New York"}}]`}</pre>
      <p>becomes</p>
      <pre>{`id,name,address.city
1,Ada,London
2,"Grace, Rear Adm.",New York`}</pre>
      <p>
        Note the quotes around the second name: a field containing the delimiter is quoted, as RFC 4180
        requires.
      </p>

      <h2>How the columns are chosen</h2>
      <p>
        The header row is the union of every key found in any object, in the order each key first appears. If
        an object lacks a key, its cell is left empty. This means rows with different shapes still line up
        under the right columns.
      </p>
    </ToolPage>
  );
}
