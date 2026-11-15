import Link from "next/link";
import { AdSlot, pageMetadata } from "@sites/shell";
import GuideHead from "@/components/GuideHead";
import { AD_SLOT_CONTENT, site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Why JSON.parse fails: the 6 errors behind most invalid JSON",
  description:
    "Trailing commas, single quotes, comments, unquoted keys, undefined and unescaped characters: what each error looks like and how to fix it.",
  path: "/guides/json-parse-errors/",
});

export default function Page() {
  return (
    <>
      <GuideHead slug="json-parse-errors" />
      <article className="doc">
        <h1>Why JSON.parse fails: the 6 errors behind most invalid JSON</h1>
        <p>
          JSON looks like a JavaScript object, but the grammar is much stricter, and a parser rejects the
          whole document at the first rule it breaks. Almost every &quot;Unexpected token&quot; error comes
          from one of the six mistakes below. Paste your text into the{" "}
          <Link href="/json-formatter">JSON formatter</Link> to see the position of the first one.
        </p>

        <h2>1. A trailing comma</h2>
        <pre>{`{ "a": 1, "b": 2, }`}</pre>
        <p>
          JSON does not allow a comma after the last item in an object or array. Delete it:{" "}
          <code>{`{ "a": 1, "b": 2 }`}</code>.
        </p>

        <h2>2. Single quotes</h2>
        <pre>{`{ 'name': 'Ada' }`}</pre>
        <p>
          Strings and keys must use double quotes. Replace every single quote that delimits a string with a
          double quote.
        </p>

        <h2>3. Unquoted keys</h2>
        <pre>{`{ name: "Ada" }`}</pre>
        <p>
          This is valid JavaScript but not JSON. Every key is a double-quoted string:{" "}
          <code>{`{ "name": "Ada" }`}</code>.
        </p>

        <h2>4. Comments</h2>
        <pre>{`{ "a": 1 // the count }`}</pre>
        <p>
          JSON has no comment syntax, neither <code>{"//"}</code> nor <code>{"/* */"}</code>. Remove them, or
          store notes in a normal field such as <code>{'"_note"'}</code>. Config formats like JSONC and JSON5
          allow comments, but a standard JSON parser rejects them.
        </p>

        <h2>5. Values that only exist in JavaScript</h2>
        <p>
          <code>undefined</code>, <code>NaN</code>, <code>Infinity</code> and function values are not JSON.
          Use <code>null</code> for a missing value. Numbers also cannot have leading zeros (<code>007</code>)
          or a trailing dot (<code>5.</code>).
        </p>

        <h2>6. Unescaped characters inside strings</h2>
        <p>
          A literal line break or tab inside a string is invalid; write <code>{"\\n"}</code> or{" "}
          <code>{"\\t"}</code>. A double quote inside a string is written <code>{'\\"'}</code>, and a
          backslash as <code>{"\\\\"}</code>. Windows paths are a common source: <code>{'"C:\\temp"'}</code>{" "}
          must be <code>{'"C:\\\\temp"'}</code>.
        </p>

        <AdSlot slot={AD_SLOT_CONTENT} placement="in-article" />

        <h2>Reading the error message</h2>
        <p>
          Engines phrase the error differently. Older ones say something like &quot;Unexpected token &#125; in
          JSON at position 12&quot;; current ones say &quot;Expected double-quoted property name in JSON at
          position 12 (line 1 column 13)&quot;. The position is where the parser gave up, which is at or just
          after the real mistake. Look one token back: a trailing comma is reported at the closing brace that
          follows it.
        </p>
        <p>Still stuck? Bisect: remove half the document and check again, repeating until the error moves.</p>
        <h2>Worked example: finding the break</h2>
        <p>Take this document, which a person copied out of a config file:</p>
        <pre>{`{"name": "Ada",
 "langs": ["en", "fr",],
 "active": true}`}</pre>
        <p>
          Node.js 20 and later report: <code>{`Unexpected token ']', ..."en", "fr",],`}</code> followed by the
          line that continues the sentence. The message names the closing bracket, not the comma, because the
          parser only learns the comma was a mistake when it meets the <code>]</code> where a value should be.
          The fix is to delete the comma after <code>&quot;fr&quot;</code>. Notice that the error points at
          the first problem only. If the file also contained single quotes further down, you would see that
          error only after fixing this one, so repeat until the document passes.
        </p>

        <h2>Errors that are not syntax errors</h2>
        <ul>
          <li>
            <strong>Empty input.</strong> An empty string gives &quot;Unexpected end of JSON input&quot;. This
            usually means a request returned an empty body or a file was not read.
          </li>
          <li>
            <strong>A byte order mark.</strong> Some editors on Windows save UTF-8 files with an invisible
            marker at the start. The parser reports an unexpected token at position 0 although the text looks
            fine. Re-save the file as UTF-8 without BOM.
          </li>
          <li>
            <strong>HTML instead of JSON.</strong> If an API call fails and returns an error page, the text
            starts with <code>&lt;</code>. The JSON is not wrong; the response is not JSON.
          </li>
          <li>
            <strong>Large numbers.</strong> JSON itself puts no limit on number size, but JavaScript stores
            numbers as 64-bit floats. <code>9007199254740993</code> parses to <code>9007199254740992</code>,
            silently. Carry ids that large as strings.
          </li>
          <li>
            <strong>Duplicate keys.</strong> The standard says names SHOULD be unique and leaves duplicate
            handling undefined. JavaScript keeps the last value, so <code>{`{"a":1,"a":2}`}</code> parses to{" "}
            <code>a = 2</code> with no error. The <Link href="/json-validator">JSON validator</Link> is the
            place to notice that kind of surprise.
          </li>
        </ul>

        <h2>Which tool to use</h2>
        <p>
          To locate the error, paste the text into the <Link href="/json-validator">JSON validator</Link>,
          which reports the line and column. To repair and re-indent a document that already parses, use the{" "}
          <Link href="/json-formatter">JSON formatter</Link>. To compare a broken version with a working one,
          use <Link href="/json-compare">JSON compare</Link> on the two once both parse.
        </p>

        <h2>Source</h2>
        <p>
          The grammar the six rules above come from is RFC 8259,{" "}
          <em>The JavaScript Object Notation (JSON) Data Interchange Format</em>, at{" "}
          <a href="https://datatracker.ietf.org/doc/html/rfc8259" rel="noopener noreferrer">
            datatracker.ietf.org/doc/html/rfc8259
          </a>
          . Error wording varies between engines and versions; the examples above were produced with Node.js
          running V8.
        </p>
        <AdSlot slot={AD_SLOT_CONTENT} placement="article-end" />
      </article>
    </>
  );
}
