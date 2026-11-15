import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import Base64Tool from "@/components/Base64Tool";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("base64-decode");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "Does it accept URL-safe Base64?",
    a: "Yes. - and _ are treated as + and /, and missing = padding is added back, so strings taken from a URL or a JWT decode without edits. Standard and URL-safe characters can even be mixed in one string.",
  },
  {
    q: "Can I decode a JWT here?",
    a: "You can decode the header and payload, which are Base64URL-encoded JSON: paste one segment (the text between the dots) at a time. Decoding does not verify the signature, so never trust a token because it decodes.",
  },
  {
    q: "Why do I see an error instead of text?",
    a: "If the message says the text is not valid Base64, it contains something outside the alphabet or has the wrong length. If it says the Base64 is valid but the bytes are not UTF-8 text, the data is probably an image, a PDF or compressed data. This tool decodes text only.",
  },
  {
    q: "Why does decoding fail with an invalid string?",
    a: "Check for characters outside A-Z, a-z, 0-9, + and / (or - and _), stray quotes, too many = signs, = in the middle, or a string cut off in the middle. Line breaks and spaces are ignored.",
  },
  {
    q: "How do I decode a data URL such as data:text/plain;base64,...?",
    a: "Paste only the part after the comma. The prefix, data:text/plain;base64, is not Base64, so including it causes an error. If the media type is an image, the decoded bytes are not text and this tool cannot show them.",
  },
  {
    q: "How do I decode Base64 on the command line?",
    a: "With GNU coreutils, printf '%s' 'SGVsbG8sIHdvcmxk' | base64 --decode. In PowerShell, [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(\"SGVsbG8sIHdvcmxk\")). Both want the = padding to be present.",
  },
  {
    q: "Why is the decoded text garbled?",
    a: "The bytes are probably text in another encoding, or not text at all. This tool reads the decoded bytes as UTF-8 and refuses anything that is not valid UTF-8, so garbled output usually shows up as an error. Text that was encoded as Latin-1 or UTF-16 will not decode here.",
  },
  {
    q: "Is Base64 reversible without a key?",
    a: "Yes, and that is why it is not encryption. Anyone can decode it. If decoding reveals a password or a key, treat it as exposed.",
  },
  {
    q: "Is my input uploaded?",
    a: "No. Decoding happens in your browser, and the page's code makes no network request with your text. The site does run page-level analytics, described in the privacy policy, but that does not include what you paste.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="base64-decode"
      lede="Paste a Base64 string and get the text back. URL-safe input and missing padding are handled for you, and the decoding happens in your browser."
      widget={<Base64Tool primary="decode" />}
      faq={faq}
      related={["base64", "json-formatter", "json-validator", "json-compare"]}
    >
      <h2>How to decode Base64</h2>
      <ol>
        <li>Paste the Base64 string into the Input box. Spaces and line breaks are ignored.</li>
        <li>
          Press <strong>Decode</strong> (or Ctrl/Cmd + Enter).
        </li>
        <li>
          Press <strong>Copy</strong> to take the text. If it is JSON, use{" "}
          <strong>Use output as input</strong> and then open the{" "}
          <Link href="/json-formatter">JSON formatter</Link>.
        </li>
      </ol>

      <h2>Examples</h2>
      <pre>{`SGVsbG8sIHdvcmxk   →   Hello, world`}</pre>
      <p>
        A JWT header is a typical thing to decode. It uses the URL-safe alphabet with no padding, and this
        tool accepts it as it is:
      </p>
      <pre>{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9   →   {"alg":"HS256","typ":"JWT"}`}</pre>
      <p>
        A JWT is three Base64URL segments separated by dots (RFC 7519). The first two are JSON, so paste one
        segment at a time and then check it with the <Link href="/json-validator">JSON validator</Link>. The
        third is the signature, which is not text.
      </p>

      <h2>What the tool does when you press Decode</h2>
      <ol>
        <li>Removes spaces, tabs and line breaks from both ends and from inside the text.</li>
        <li>
          Turns <code>-</code> into <code>+</code> and <code>_</code> into <code>/</code>, so URL-safe input
          becomes standard Base64.
        </li>
        <li>
          Adds <code>=</code> until the length is a multiple of 4.
        </li>
        <li>Decodes the result to bytes with the browser&apos;s own Base64 decoder.</li>
        <li>
          Reads the bytes as UTF-8. Bytes that are not valid UTF-8 are rejected, not replaced with question
          marks.
        </li>
      </ol>

      <h2>What it accepts and what it rejects</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Input</th>
            <th scope="col">Result</th>
            <th scope="col">Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>SGk</code>
            </td>
            <td>
              <code>Hi</code>
            </td>
            <td>Missing padding is added.</td>
          </tr>
          <tr>
            <td>
              <code>SGVs</code> then a line break, then <code>bG8=</code>
            </td>
            <td>
              <code>Hello</code>
            </td>
            <td>Whitespace is ignored, as in line-wrapped Base64 from email.</td>
          </tr>
          <tr>
            <td>
              <code>8J-YgA</code>
            </td>
            <td>
              <code>😀</code>
            </td>
            <td>URL-safe characters are accepted.</td>
          </tr>
          <tr>
            <td>
              <code>SGk===</code>
            </td>
            <td>Not valid Base64</td>
            <td>
              More <code>=</code> than the data can need.
            </td>
          </tr>
          <tr>
            <td>
              <code>SG=k</code>
            </td>
            <td>Not valid Base64</td>
            <td>
              <code>=</code> is only allowed at the end.
            </td>
          </tr>
          <tr>
            <td>
              <code>S</code>
            </td>
            <td>Not valid Base64</td>
            <td>One leftover character cannot be a whole byte.</td>
          </tr>
          <tr>
            <td>
              <code>!!!!</code>, or a string with quotes
            </td>
            <td>Not valid Base64</td>
            <td>Characters outside the alphabet.</td>
          </tr>
          <tr>
            <td>
              <code>SGk=SGk=</code>
            </td>
            <td>Not valid Base64</td>
            <td>Two encoded strings joined: padding appears in the middle. Decode each separately.</td>
          </tr>
          <tr>
            <td>
              <code>data:text/plain;base64,SGk=</code>
            </td>
            <td>Not valid Base64</td>
            <td>The prefix is not Base64. Paste only what follows the comma.</td>
          </tr>
          <tr>
            <td>
              <code>/9j/4AAQ</code> (the start of a JPEG file)
            </td>
            <td>Valid Base64, not UTF-8 text</td>
            <td>The bytes are binary data, so there is no text to show.</td>
          </tr>
          <tr>
            <td>
              <code>6Q==</code>
            </td>
            <td>Valid Base64, not UTF-8 text</td>
            <td>
              The single byte E9 is <code>é</code> in Latin-1 but is not valid UTF-8 on its own.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        RFC 4648 says a decoder must reject characters outside the alphabet unless the specification it serves
        says otherwise, and notes that MIME-style data may have its line breaks ignored. This tool follows the
        second case for whitespace only.
      </p>

      <h2>The two error messages</h2>
      <ul>
        <li>
          <strong>Not valid Base64.</strong> The text has a character outside A-Z, a-z, 0-9, + and / (or - and
          _), misplaced or surplus <code>=</code>, or a length that cannot be right. Compare it with the table
          above.
        </li>
        <li>
          <strong>Valid Base64, but the bytes are not UTF-8 text.</strong> The decoding worked, but the result
          is binary data or text in another encoding. See the next section.
        </li>
      </ul>

      <h2>When the result is not text</h2>
      <p>
        Base64 is a way to carry bytes, not a type of data. If the original was an image, a PDF or an archive,
        the decoded bytes are not readable text and this tool will report an error instead of showing
        nonsense. Save such data to a file with a tool built for binary content. Encrypted data and hashes
        also decode to random bytes.
      </p>
      <p>
        Base64 is also not encryption. If decoding reveals a password or a key, treat it as exposed.{" "}
        <Link href="/guides/what-is-base64/">The guide to Base64</Link> explains why.
      </p>

      <h2>Decode Base64 in code</h2>
      <p>
        JavaScript, in a browser or Node. This does what the tool does. <code>atob</code> throws an{" "}
        <code>InvalidCharacterError</code> for text that is not Base64, and the strict decoder throws a{" "}
        <code>TypeError</code> for bytes that are not UTF-8:
      </p>
      <pre>{String.raw`function decode(input) {
  let s = input.trim().replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

console.log(decode("8J-YgA")); // 😀`}</pre>
      <p>
        In Node, <code>Buffer</code> is shorter but lenient. It accepts both alphabets and ignores whitespace,
        and it does not throw on bad input. For <code>!!!!</code> it returned an empty string, so check the
        result:
      </p>
      <pre>{`Buffer.from("8J-YgA", "base64").toString("utf8"); // 😀`}</pre>
      <p>
        Python. <code>validate=True</code> makes <code>b64decode</code> reject characters outside the alphabet
        instead of skipping them. The padding line adds back any <code>=</code> that was dropped:
      </p>
      <pre>{String.raw`import base64

def decode_any(s):
    """Accepts standard or URL-safe input, with or without padding."""
    s = "".join(s.split()).replace("-", "+").replace("_", "/")
    s += "=" * (-len(s) % 4)
    return base64.b64decode(s, validate=True).decode("utf-8")

print(decode_any("8J-YgA"))  # 😀`}</pre>
      <p>
        Python raises <code>binascii.Error</code> for bad Base64 (for example <code>Incorrect padding</code>{" "}
        or <code>Non-base64 digit found</code>, worded by version) and <code>UnicodeDecodeError</code> for
        bytes that are not UTF-8.
      </p>
      <p>
        Command line. GNU <code>base64</code> wants the padding. Given <code>SGk</code> it prints{" "}
        <code>Hi</code>, then reports <code>base64: invalid input</code> and exits with status 1:
      </p>
      <pre>{`printf '%s' 'SGVsbG8sIHdvcmxk' | base64 --decode`}</pre>
      <p>PowerShell:</p>
      <pre>{`[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String("SGVsbG8sIHdvcmxk"))`}</pre>
      <p>
        PowerShell&apos;s error for the unpadded <code>SGk</code> is{" "}
        <code>Invalid length for a Base-64 char array or string.</code>
      </p>

      <h2>Limits of this tool</h2>
      <ul>
        <li>It decodes to text only. Images, PDFs and other binary data are reported as an error.</li>
        <li>It reads UTF-8. Text that was encoded in Latin-1 or UTF-16 does not decode here.</li>
        <li>It reads pasted text. There is no file upload.</li>
        <li>
          Everything runs in your browser. The tool&apos;s code does not send what you paste anywhere; see the{" "}
          <Link href="/privacy/">privacy policy</Link> for the analytics the site does run.
        </li>
      </ul>
      <p>
        To go the other way, use <Link href="/base64">Base64 encode</Link>, which also explains the alphabet,
        padding and size increase.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href="https://www.rfc-editor.org/rfc/rfc4648" rel="noopener noreferrer">
            RFC 4648, The Base16, Base32, and Base64 Data Encodings
          </a>{" "}
          (alphabets, padding, rejecting non-alphabet characters), checked 16 November 2026.
        </li>
        <li>
          <a href="https://www.rfc-editor.org/rfc/rfc7519" rel="noopener noreferrer">
            RFC 7519, JSON Web Token (JWT)
          </a>{" "}
          (a JWT is base64url-encoded parts separated by periods), checked 16 November 2026.
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/atob" rel="noopener noreferrer">
            MDN: atob()
          </a>{" "}
          (InvalidCharacterError for invalid Base64), checked 16 November 2026.
        </li>
        <li>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data"
            rel="noopener noreferrer"
          >
            MDN: data URLs
          </a>{" "}
          (the data:[media-type][;base64],data syntax), checked 16 November 2026.
        </li>
        <li>
          <a href="https://nodejs.org/api/buffer.html" rel="noopener noreferrer">
            Node.js documentation: Buffer
          </a>{" "}
          (base64 input accepts both alphabets and ignores whitespace), checked 16 November 2026.
        </li>
        <li>
          <a href="https://docs.python.org/3/library/base64.html" rel="noopener noreferrer">
            Python documentation: base64
          </a>{" "}
          (b64decode and its validate option), checked 16 November 2026.
        </li>
      </ul>
      <p>
        The accepted and rejected inputs in the table were run through the tool&apos;s own decoding steps in
        Node 22. The code was run in Node 22, Python 3.10, GNU coreutils 8.32 and Windows PowerShell 5.1.
      </p>
    </ToolPage>
  );
}
