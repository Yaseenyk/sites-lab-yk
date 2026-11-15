import Link from "next/link";
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
    q: "Why are some cells empty?",
    a: "A cell is empty when the object has no such key, when the value is null, or when the value is an empty object and Flatten is on. Rows with different keys still line up, because the header row is the union of all keys.",
  },
  {
    q: "Why is there a column called value?",
    a: "When an item in the array is not an object, such as a number, a string or a nested array, there is no key to use as a column name. The tool puts it in a column called value. The same happens if the whole JSON is a single number or string.",
  },
  {
    q: "Will it open correctly in Excel?",
    a: "The downloaded file includes a UTF-8 byte-order mark, which helps Excel read accents and non-Latin text correctly. The Copy button does not add it. In some regions Excel expects a semicolon delimiter, which you can choose.",
  },
  {
    q: "Is there a security risk opening the CSV?",
    a: "If a value starts with =, +, - or @, a spreadsheet may treat it as a formula. The tool does not change values, so review CSV from untrusted JSON before opening it in Excel or Google Sheets.",
  },
  {
    q: "Can I convert CSV back to JSON?",
    a: "Not on this site. This tool only goes from JSON to CSV, and flattening is not reversible: the dotted column names and the JSON text in array cells would need to be turned back into structure by your own code.",
  },
  {
    q: "Is my data uploaded?",
    a: "No. The conversion runs in your browser, and the CSV is generated on your device. The page's code makes no network request with your text. The site does run page-level analytics, described in the privacy policy, but that does not include what you paste.",
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
      <h2>What the converter does</h2>
      <p>
        CSV is a table: one header row, then one row per record. JSON is a tree. This tool turns a JSON array
        of objects into that table. Each object is a row, each key is a column, and nested objects are
        flattened into columns with dotted names. The result can be copied or downloaded as{" "}
        <code>data.csv</code>.
      </p>

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
        requires. With <strong>Flatten nested objects</strong> turned off, the third column is called{" "}
        <code>address</code> and holds the JSON text <code>{'{"city":"London"}'}</code>, quoted, because it
        contains quote marks.
      </p>
      <p>A second example, with an array, a null and a key that only one record has:</p>
      <pre>{`[{"id":1,"name":"Ada","tags":["a","b"],"note":null},
 {"id":2,"extra":true}]`}</pre>
      <pre>{`id,name,tags,note,extra
1,Ada,"[""a"",""b""]",,
2,,,,true`}</pre>

      <h2>How each JSON value becomes a cell</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">JSON value</th>
            <th scope="col">CSV cell</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>string</td>
            <td>The text as it is, quoted if it needs to be</td>
          </tr>
          <tr>
            <td>number</td>
            <td>
              The number as JavaScript writes it. Very large or small values can use exponent form, such as{" "}
              <code>1e+21</code>, and integers above 2^53 lose digits.
            </td>
          </tr>
          <tr>
            <td>
              <code>true</code>, <code>false</code>
            </td>
            <td>
              <code>true</code>, <code>false</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>null</code>, or a key the object lacks
            </td>
            <td>An empty cell</td>
          </tr>
          <tr>
            <td>array</td>
            <td>
              One cell holding the array as JSON text, for example <code>{'["a","b"]'}</code>
            </td>
          </tr>
          <tr>
            <td>nested object, Flatten on</td>
            <td>
              One column per leaf, named with dots, such as <code>address.city</code>. An empty object gives
              an empty cell.
            </td>
          </tr>
          <tr>
            <td>nested object, Flatten off</td>
            <td>One cell holding the object as JSON text</td>
          </tr>
          <tr>
            <td>
              an item that is not an object, such as <code>5</code> or <code>&quot;x&quot;</code>
            </td>
            <td>
              A row with the value in a column called <code>value</code>
            </td>
          </tr>
          <tr>
            <td>a single object instead of an array</td>
            <td>One row</td>
          </tr>
        </tbody>
      </table>

      <h2>How the columns are chosen</h2>
      <p>
        The header row is the union of every key found in any object, in the order each key first appears. If
        an object lacks a key, its cell is left empty. This means rows with different shapes still line up
        under the right columns.
      </p>

      <h2>Quoting, delimiters and line endings</h2>
      <p>
        RFC 4180 describes CSV with a comma between fields, a CRLF line break between records, double quotes
        around any field that contains a comma, a double quote or a line break, and a doubled double quote to
        write a quote inside a field. The tool follows those rules for whichever delimiter you choose, so a
        field is quoted when it contains the delimiter, a quote or a line break. Semicolon and tab are common
        variants that the RFC does not cover. Records are separated by CRLF, and there is no line break after
        the last one.
      </p>

      <h2>Things to watch for</h2>
      <ul>
        <li>
          <strong>Dots in keys.</strong> A key that already contains a dot, such as <code>a.b</code>, and a
          nested <code>a</code> with a <code>b</code> inside give the same column name. When both are in one
          record, the later one overwrites the earlier.
        </li>
        <li>
          <strong>Arrays are not expanded.</strong> A record with a list of five items still produces one row.
          If you want one row per item, restructure the JSON first.
        </li>
        <li>
          <strong>Text that looks like a formula.</strong> Values starting with <code>=</code>, <code>+</code>
          , <code>-</code> or <code>@</code> are written unchanged. Check data you do not trust before opening
          it in a spreadsheet.
        </li>
        <li>
          <strong>Invalid input.</strong> Only valid JSON converts. The error shows the line and column; the{" "}
          <Link href="/json-validator">JSON validator</Link> lists each message and fix.
        </li>
      </ul>

      <h2>Convert JSON to CSV in code</h2>
      <p>
        Python, standard library only. This flattens nested objects the same way as this page and writes{" "}
        <code>out.csv</code> from a <code>data.json</code> holding an array of objects. On a test file with
        nested objects, an array, a null, an empty object and a name needing quotes, it produced the same CSV
        as the tool, plus a final line break:
      </p>
      <pre>{String.raw`import csv
import json


def flatten(value, prefix=""):
    """Nested objects become dotted keys; everything else is one cell."""
    if isinstance(value, dict):
        if not value:
            return {prefix or "value": ""}
        out = {}
        for key, item in value.items():
            out.update(flatten(item, f"{prefix}.{key}" if prefix else key))
        return out
    return {prefix or "value": value}


def cell(value):
    if value is None:
        return ""
    if isinstance(value, str):
        return value
    return json.dumps(value, separators=(",", ":"))


with open("data.json", encoding="utf-8") as f:
    data = json.load(f)
rows = [flatten(r) for r in (data if isinstance(data, list) else [data])]

headers = []
for row in rows:
    for key in row:
        if key not in headers:
            headers.append(key)

with open("out.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f, lineterminator="\r\n")
    writer.writerow(headers)
    for row in rows:
        writer.writerow([cell(row.get(h)) for h in headers])`}</pre>
      <p>
        Open the output file with <code>newline=&quot;&quot;</code>, as above, or Python on Windows writes an
        extra carriage return. For a flat array of objects (no nesting) on Windows, PowerShell does it in two
        lines. This was tested in Windows PowerShell 5.1; it quotes every field and does not flatten nested
        objects:
      </p>
      <pre>{`$rows = Get-Content -Raw flat.json | ConvertFrom-Json
$rows | Export-Csv -NoTypeInformation -Encoding UTF8 -Path flat.csv`}</pre>

      <h2>Limits of this tool</h2>
      <ul>
        <li>It converts JSON to CSV only. It does not convert back.</li>
        <li>It reads pasted text. There is no file upload, and a very large paste is slow.</li>
        <li>Values stay text or numbers as JSON gave them. It does not format dates or add column types.</li>
        <li>
          Everything runs in your browser. The tool&apos;s code does not send what you paste anywhere; see the{" "}
          <Link href="/privacy/">privacy policy</Link> for the analytics the site does run.
        </li>
      </ul>
      <p>
        To read a document before converting it, open it in the <Link href="/json-viewer">JSON viewer</Link>{" "}
        or tidy it with the <Link href="/json-formatter">JSON formatter</Link>. The{" "}
        <Link href="/guides/json-parse-errors/">guide to JSON parse errors</Link> helps when the input will
        not parse.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href="https://www.rfc-editor.org/rfc/rfc4180" rel="noopener noreferrer">
            RFC 4180, Common Format and MIME Type for CSV Files
          </a>{" "}
          (comma separator, CRLF, quoting rules), checked 16 November 2026.
        </li>
        <li>
          <a href="https://www.rfc-editor.org/rfc/rfc8259" rel="noopener noreferrer">
            RFC 8259, The JavaScript Object Notation (JSON) Data Interchange Format
          </a>{" "}
          (JSON values, number precision), checked 16 November 2026.
        </li>
        <li>
          <a href="https://docs.python.org/3/library/json.html" rel="noopener noreferrer">
            Python documentation: json
          </a>{" "}
          (json.load, json.dumps separators), checked 16 November 2026.
        </li>
      </ul>
      <p>
        The example outputs were produced by running the tool&apos;s conversion code. The Python script was
        run in Python 3.10 on that test file and its output compared byte for byte with the tool&apos;s.
      </p>
    </ToolPage>
  );
}
