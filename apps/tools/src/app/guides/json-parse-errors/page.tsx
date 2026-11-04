import Link from "next/link";
import { AdSlot, pageMetadata } from "@sites/shell";
import { AD_SLOT_CONTENT, site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Why JSON.parse fails: the 6 errors behind most invalid JSON",
  description: "Trailing commas, single quotes, comments, unquoted keys, undefined and unescaped characters: what each error looks like and how to fix it.",
  path: "/guides/json-parse-errors/",
});

export default function Page() {
  return (
    <article className="prose">
      <h1>Why JSON.parse fails: the 6 errors behind most invalid JSON</h1>
      <p>
        JSON looks like a JavaScript object, but the grammar is much stricter, and a parser rejects the whole document at the first rule it breaks. Almost every &quot;Unexpected token&quot; error comes from one of the six mistakes below. Paste your text into the <Link href="/json-formatter">JSON formatter</Link> to see the position of the first one.
      </p>

      <h2>1. A trailing comma</h2>
      <pre>{`{ "a": 1, "b": 2, }`}</pre>
      <p>JSON does not allow a comma after the last item in an object or array. Delete it: <code>{`{ "a": 1, "b": 2 }`}</code>.</p>

      <h2>2. Single quotes</h2>
      <pre>{`{ 'name': 'Ada' }`}</pre>
      <p>Strings and keys must use double quotes. Replace every single quote that delimits a string with a double quote.</p>

      <h2>3. Unquoted keys</h2>
      <pre>{`{ name: "Ada" }`}</pre>
      <p>This is valid JavaScript but not JSON. Every key is a double-quoted string: <code>{`{ "name": "Ada" }`}</code>.</p>

      <h2>4. Comments</h2>
      <pre>{`{ "a": 1 // the count }`}</pre>
      <p>JSON has no comment syntax, neither <code>{"//"}</code> nor <code>{"/* */"}</code>. Remove them, or store notes in a normal field such as <code>{'"_note"'}</code>. Config formats like JSONC and JSON5 allow comments, but a standard JSON parser rejects them.</p>

      <h2>5. Values that only exist in JavaScript</h2>
      <p>
        <code>undefined</code>, <code>NaN</code>, <code>Infinity</code> and function values are not JSON. Use <code>null</code> for a missing value. Numbers also cannot have leading zeros (<code>007</code>) or a trailing dot (<code>5.</code>).
      </p>

      <h2>6. Unescaped characters inside strings</h2>
      <p>
        A literal line break or tab inside a string is invalid; write <code>{"\\n"}</code> or <code>{"\\t"}</code>. A double quote inside a string is written <code>{'\\"'}</code>, and a backslash as <code>{"\\\\"}</code>. Windows paths are a common source: <code>{'"C:\\temp"'}</code> must be <code>{'"C:\\\\temp"'}</code>.
      </p>

      <AdSlot slot={AD_SLOT_CONTENT} />

      <h2>Reading the error message</h2>
      <p>
        Engines phrase the error differently. Older ones say something like &quot;Unexpected token &#125; in JSON at position 12&quot;; current ones say &quot;Expected double-quoted property name in JSON at position 12 (line 1 column 13)&quot;. The position is where the parser gave up, which is at or just after the real mistake. Look one token back: a trailing comma is reported at the closing brace that follows it.
      </p>
      <p>
        Still stuck? Bisect: remove half the document and check again, repeating until the error moves.
      </p>
    </article>
  );
}
