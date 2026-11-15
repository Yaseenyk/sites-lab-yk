import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import JsonTool from "@/components/JsonTool";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("json-validator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "Does this validate against a JSON Schema?",
    a: "No. It checks syntax only: whether the text is legal JSON under RFC 8259. Checking that fields have the right types or required keys needs a schema validator.",
  },
  {
    q: "Why is JSON with duplicate keys reported as valid?",
    a: "The JSON grammar allows repeated keys, and JSON.parse accepts them, keeping the last value. RFC 8259 says names within an object SHOULD be unique and that software receiving duplicates behaves unpredictably, so treat them as a bug even though they are not a syntax error.",
  },
  {
    q: "Is my data sent to a server?",
    a: "No. The check runs in your browser using JavaScript's JSON.parse, and the page's code makes no network request with your text. The site does run page-level analytics, described in the privacy policy, but that does not include what you paste.",
  },
  {
    q: "Why does the line and column point after the real mistake?",
    a: "The parser reports where it gave up, which is at or just after the problem. A trailing comma, for example, is reported at the closing brace that follows it. Look one token back.",
  },
  {
    q: "Why does JSON that works in my JavaScript code fail here?",
    a: "Your code is probably an object literal, which is more relaxed than JSON. Unquoted keys, single quotes, trailing commas, comments and values such as undefined, NaN and Infinity are legal in JavaScript but not in JSON.",
  },
  {
    q: "Are NaN, Infinity and undefined valid JSON?",
    a: "No. RFC 8259 says numeric values that cannot be written in its grammar, such as Infinity and NaN, are not permitted, and the only literal names are true, false and null in lowercase. Python's json module accepts NaN and Infinity by default, so JSON that passes there can fail here.",
  },
  {
    q: "Is a bare string, number or null valid JSON?",
    a: 'Yes. Under RFC 8259 a JSON text is any JSON value, so "hello", 42 and null are each valid on their own. Older specifications required an object or array at the top level, and some old parsers still do.',
  },
  {
    q: "Why does valid-looking JSON from a file fail on its first character?",
    a: "The file may begin with a byte order mark, an invisible character some editors add. RFC 8259 says parsers may ignore it, but JSON.parse does not, and reports an unexpected token on the first character. Save the file as UTF-8 without a BOM, or delete the first character.",
  },
  {
    q: "Can it validate several JSON documents at once?",
    a: "No. It checks one document. Text with a second document after the first, such as JSON Lines, fails with an error about a non-whitespace character after the JSON. Check each line on its own.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="json-validator"
      lede="Paste JSON and see at once whether it is valid. If it is not, you get the line and column where the parser stopped. The check runs in your browser."
      widget={<JsonTool primary="validate" />}
      faq={faq}
      related={["json-formatter", "json-viewer", "json-compare", "base64-decode"]}
    >
      <h2>What valid JSON means</h2>
      <p>
        JSON is valid when the text follows the grammar in RFC 8259: one value made of objects, arrays,
        strings, numbers and the three words <code>true</code>, <code>false</code> and <code>null</code>. That
        is a question about syntax only. A validator does not know what your data should contain.
      </p>
      <p>
        This tool runs your text through <code>JSON.parse</code>, the parser your own JavaScript uses. The
        verdict updates as you type or paste, so you do not need to press anything: the status bar below the
        editor turns green for valid JSON, or red with the error message and the line and column.
      </p>

      <h2>How to validate JSON</h2>
      <ol>
        <li>Paste your text into the Input box.</li>
        <li>
          Read the status bar. It says Valid JSON, or gives the message and position of the first error.
        </li>
        <li>
          Fix that error and read the bar again. A parser stops at the first problem, so later ones appear one
          at a time.
        </li>
      </ol>

      <h2>The rules the grammar enforces</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Rule</th>
            <th scope="col">Valid</th>
            <th scope="col">Invalid</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Strings and keys use double quotes</td>
            <td>
              <code>{'{"a":"b"}'}</code>
            </td>
            <td>
              <code>{"{'a':'b'}"}</code>
            </td>
          </tr>
          <tr>
            <td>Keys are quoted</td>
            <td>
              <code>{'{"a":1}'}</code>
            </td>
            <td>
              <code>{"{a:1}"}</code>
            </td>
          </tr>
          <tr>
            <td>No comma after the last item</td>
            <td>
              <code>[1,2]</code>
            </td>
            <td>
              <code>[1,2,]</code>
            </td>
          </tr>
          <tr>
            <td>No comments</td>
            <td>
              <code>{'{"a":1}'}</code>
            </td>
            <td>
              <code>{'{"a":1 // note}'}</code>
            </td>
          </tr>
          <tr>
            <td>Only true, false and null, in lowercase</td>
            <td>
              <code>{'{"ok":true}'}</code>
            </td>
            <td>
              <code>{'{"ok":True}'}</code>, <code>undefined</code>, <code>NaN</code>, <code>Infinity</code>
            </td>
          </tr>
          <tr>
            <td>Numbers: optional minus, no leading zero, digits after a point</td>
            <td>
              <code>0.5</code>, <code>-12</code>, <code>1e3</code>
            </td>
            <td>
              <code>.5</code>, <code>+1</code>, <code>01</code>, <code>0x10</code>, <code>1.</code>
            </td>
          </tr>
          <tr>
            <td>Control characters inside a string are escaped</td>
            <td>
              <code>{String.raw`"a\nb"`}</code>
            </td>
            <td>a real line break or tab between the quotes</td>
          </tr>
          <tr>
            <td>Only the listed escapes are allowed</td>
            <td>
              <code>{String.raw`\" \\ \/ \b \f \n \r \t A`}</code>
            </td>
            <td>
              <code>{String.raw`\x41`}</code>
            </td>
          </tr>
          <tr>
            <td>Whitespace is space, tab, line feed or carriage return</td>
            <td>a normal indent</td>
            <td>a no-break space or a byte order mark</td>
          </tr>
          <tr>
            <td>One value, nothing after it</td>
            <td>
              <code>{'{"a":1}'}</code>, <code>42</code>, <code>null</code>
            </td>
            <td>
              <code>{'{"a":1} x'}</code>, two documents in a row, empty text
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        These are the same rules the <Link href="/guides/json-parse-errors/">guide to JSON parse errors</Link>{" "}
        explains one by one with fixes.
      </p>

      <h2>Common error messages and what they mean</h2>
      <p>
        The wording below is what Node 22 prints, which uses the same JavaScript engine as Chrome and Edge.
        Older versions and other browsers word the same errors differently. When a browser gives no position,
        this page works one out itself by checking the text against the grammar, so you still get a line and
        column.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Message</th>
            <th scope="col">Usual cause</th>
            <th scope="col">Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>Expected double-quoted property name</code>
            </td>
            <td>A trailing comma in an object</td>
            <td>Delete the comma before the closing brace</td>
          </tr>
          <tr>
            <td>
              <code>Expected property name or &apos;&#125;&apos;</code>
            </td>
            <td>Single quotes or an unquoted key right after the opening brace</td>
            <td>Put the key in double quotes</td>
          </tr>
          <tr>
            <td>
              <code>Expected &apos;,&apos; or &apos;&#125;&apos; after property value</code>
            </td>
            <td>A missing comma, a comment, or a value the grammar does not allow</td>
            <td>Add the comma, or remove the comment</td>
          </tr>
          <tr>
            <td>
              <code>Expected &apos;,&apos; or &apos;]&apos; after array element</code>
            </td>
            <td>A missing comma, or an unclosed bracket</td>
            <td>Add the comma, or close the bracket</td>
          </tr>
          <tr>
            <td>
              <code>Unexpected token &apos;]&apos;, ... is not valid JSON</code>
            </td>
            <td>A trailing comma in an array</td>
            <td>Delete the comma before the closing bracket</td>
          </tr>
          <tr>
            <td>
              <code>Unexpected token &apos;u&apos;, ... is not valid JSON</code>
            </td>
            <td>
              <code>undefined</code>, <code>NaN</code>, <code>True</code> or another word JSON lacks (the
              letter in the message is the first one)
            </td>
            <td>
              Use <code>null</code>, or a lowercase <code>true</code> or <code>false</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>Unexpected number in JSON</code>
            </td>
            <td>
              A number with a leading zero, such as <code>01</code>
            </td>
            <td>Remove the zero, or make the value a string</td>
          </tr>
          <tr>
            <td>
              <code>Unterminated string in JSON</code>
            </td>
            <td>A missing closing quote</td>
            <td>Add the quote</td>
          </tr>
          <tr>
            <td>
              <code>Bad control character in string literal</code>
            </td>
            <td>A raw line break or tab inside a string</td>
            <td>
              Write it as <code>{String.raw`\n`}</code> or <code>{String.raw`\t`}</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>Bad escaped character</code>
            </td>
            <td>
              A backslash followed by a letter JSON does not allow, such as <code>{String.raw`\x`}</code>, or
              a Windows path with single backslashes
            </td>
            <td>
              Double the backslash: <code>{String.raw`\\`}</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>Unexpected end of JSON input</code>
            </td>
            <td>Empty text, or text cut off before it closes</td>
            <td>Paste the whole document</td>
          </tr>
          <tr>
            <td>
              <code>Unexpected non-whitespace character after JSON</code>
            </td>
            <td>Extra text, or a second document, after the first</td>
            <td>Remove it, or validate each document separately</td>
          </tr>
        </tbody>
      </table>

      <h2>What a validator does and does not check</h2>
      <table>
        <thead>
          <tr>
            <th>Checked</th>
            <th>Not checked</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Brackets, braces and quotes balance</td>
            <td>That fields have the right type</td>
          </tr>
          <tr>
            <td>No trailing commas or comments</td>
            <td>That required keys exist</td>
          </tr>
          <tr>
            <td>Strings are escaped correctly</td>
            <td>That values are in an allowed range</td>
          </tr>
          <tr>
            <td>Only legal value types are used</td>
            <td>That keys are unique</td>
          </tr>
        </tbody>
      </table>
      <p>
        For a structural check, use a JSON Schema validator in your project. This page answers the earlier
        question: is the text JSON at all?
      </p>
      <p>
        <strong>Large numbers.</strong> A valid document can still lose data when it is read. RFC 8259 allows
        software to limit the range and precision of numbers, and says integers between minus and plus (2^53
        minus 1) are the ones all implementations agree on. JavaScript parses numbers as 64-bit floats, so
        larger integers are rounded. Send very large IDs as strings.
      </p>

      <h2>Validate JSON in code</h2>
      <p>JavaScript. A bad document throws a SyntaxError:</p>
      <pre>{`function check(text) {
  try {
    JSON.parse(text);
    return "valid";
  } catch (err) {
    return err.message;
  }
}

console.log(check('{"a":1,}'));`}</pre>
      <p>
        Python. The exception carries the line and column. Python&apos;s parser also accepts <code>NaN</code>,{" "}
        <code>Infinity</code> and <code>-Infinity</code> by default, which are not JSON, so pass{" "}
        <code>parse_constant</code> to reject them:
      </p>
      <pre>{`import json

def check(text):
    try:
        json.loads(text)
    except json.JSONDecodeError as e:
        return f"{e.msg} at line {e.lineno}, column {e.colno}"
    return "valid"

def reject_constant(name):
    raise ValueError(f"{name} is not valid JSON")

print(check('{"a":1,}'))
# json.loads(text, parse_constant=reject_constant) now refuses NaN and Infinity`}</pre>
      <p>
        On the command line, <code>json.tool</code> exits with status 1 and prints the error when the file is
        not valid (use <code>NUL</code> instead of <code>/dev/null</code> in Windows cmd). It has the same NaN
        leniency as the Python module.
      </p>
      <pre>{`python -m json.tool data.json > /dev/null && echo valid`}</pre>

      <h2>Limits of this tool</h2>
      <ul>
        <li>It checks syntax, not meaning, and it reports only the first error it meets.</li>
        <li>
          It checks one document pasted as text. There is no file upload, and JSON Lines or several documents
          in a row are reported as an error.
        </li>
        <li>
          It uses your browser&apos;s own <code>JSON.parse</code>, so it agrees with your JavaScript code, but
          not necessarily with a lenient parser in another language.
        </li>
        <li>
          Everything runs in your browser. The tool&apos;s code does not send what you paste anywhere; see the{" "}
          <Link href="/privacy/">privacy policy</Link> for the analytics the site does run.
        </li>
      </ul>
      <p>
        Once the JSON is valid, make it readable with the <Link href="/json-formatter">JSON formatter</Link>,
        explore it in the <Link href="/json-viewer">JSON viewer</Link>, or see what changed between two
        versions with <Link href="/json-compare">JSON compare</Link>.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href="https://www.rfc-editor.org/rfc/rfc8259" rel="noopener noreferrer">
            RFC 8259, The JavaScript Object Notation (JSON) Data Interchange Format
          </a>{" "}
          (grammar, literal names, numbers, repeated names, byte order mark), checked 16 November 2026.
        </li>
        <li>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse"
            rel="noopener noreferrer"
          >
            MDN: JSON.parse()
          </a>{" "}
          (SyntaxError for text outside the grammar, trailing commas, single quotes), checked 16 November
          2026.
        </li>
        <li>
          <a href="https://docs.python.org/3/library/json.html" rel="noopener noreferrer">
            Python documentation: json
          </a>{" "}
          (JSONDecodeError, NaN and Infinity handling, the json.tool command), checked 16 November 2026.
        </li>
      </ul>
      <p>
        The error messages in the table were produced by running each input through JSON.parse in Node 22.
      </p>
    </ToolPage>
  );
}
