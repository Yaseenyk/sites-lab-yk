import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import Base64Tool from "@/components/Base64Tool";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("base64");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "Is Base64 encryption?",
    a: "No. Base64 is an encoding that anyone can reverse without a key. Never use it to hide passwords or secrets.",
  },
  {
    q: "Why is the output longer than the input?",
    a: "Base64 turns every 3 bytes into 4 characters, so the output is about 33% larger than the input, plus padding. The exact length is 4 times the input length in bytes divided by 3, rounded up. 1,000 bytes become 1,336 characters.",
  },
  {
    q: "What is URL-safe Base64?",
    a: "A variant that uses - and _ instead of + and /, and usually drops the = padding, so the result can sit inside a URL or filename. It is defined in RFC 4648, section 5.",
  },
  {
    q: "What does the = at the end mean?",
    a: "It is padding. Base64 works in groups of 3 bytes. If the last group has only 1 byte the output ends in ==, and if it has 2 bytes the output ends in a single =. A multiple of 3 bytes needs none.",
  },
  {
    q: "Does it handle emoji and accented text?",
    a: "Yes. Text is converted to UTF-8 bytes before encoding, so any Unicode character round-trips correctly. Functions that assume one byte per character, like a bare btoa, fail on such text.",
  },
  {
    q: "Why does my command line give a different result from this tool?",
    a: "Usually because echo adds a line break to the text, and the break is encoded too: echo Hello | base64 gives SGVsbG8K, while printf with the text and no newline gives SGVsbG8=. GNU base64 also wraps its output at 76 characters unless you pass -w 0.",
  },
  {
    q: "How do I encode a file or an image?",
    a: 'This tool encodes text only. For a file, use a command-line tool: base64 file.png with GNU coreutils (Linux, Git Bash), or [Convert]::ToBase64String([IO.File]::ReadAllBytes("file.png")) in PowerShell. Your code can do the same with the byte-level functions shown on this page.',
  },
  {
    q: "Is what I type uploaded anywhere?",
    a: "No. Encoding runs in your browser, and the page's code makes no network request with your text. The site does run page-level analytics, described in the privacy policy, but that does not include what you paste.",
  },
  {
    q: "Why does decoding fail?",
    a: "Either the text is not valid Base64, or it decodes to bytes that are not UTF-8 text, such as an image or a compressed file. This tool decodes text only. The Base64 decode page lists what is accepted and what is rejected.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="base64"
      lede="Convert text to Base64 and back. Unicode is handled as UTF-8, URL-safe output is one tick away, and nothing is sent to a server."
      widget={<Base64Tool primary="encode" />}
      faq={faq}
      related={["base64-decode", "json-formatter", "json-validator", "json-minifier"]}
    >
      <h2>What Base64 is</h2>
      <p>
        Base64 writes any bytes using only 64 safe text characters: the letters A to Z and a to z, the digits
        0 to 9, and <code>+</code> and <code>/</code>. That lets binary data travel through places that only
        accept text, such as email, JSON or a URL. It is an encoding, not encryption, and not compression: it
        makes data larger, and anyone can reverse it.
      </p>

      <h2>How to use it</h2>
      <ol>
        <li>Type or paste text into the Input box.</li>
        <li>
          Press <strong>Encode</strong> to get Base64, or paste Base64 and press <strong>Decode</strong> to
          get the text back.
        </li>
        <li>
          Tick <strong>URL-safe output</strong> before encoding if the result goes in a URL, a filename or a
          JWT.
        </li>
      </ol>
      <p>
        Want the background? Read{" "}
        <Link href="/guides/what-is-base64/">what Base64 is and when to use it</Link>. To only decode, use the{" "}
        <Link href="/base64-decode">Base64 decode</Link> page.
      </p>

      <h2>Example</h2>
      <pre>{`Hello, world   →   SGVsbG8sIHdvcmxk`}</pre>
      <p>
        Standard Base64 can contain <code>+</code>, <code>/</code> and trailing <code>=</code>. The URL-safe
        form replaces the first two with <code>-</code> and <code>_</code> and drops the padding. For the text{" "}
        <code>??&gt;&gt;</code> the two forms are:
      </p>
      <pre>{`standard   Pz8+Pg==
URL-safe   Pz8-Pg`}</pre>

      <h2>How the encoding works</h2>
      <p>
        Base64 takes the input 3 bytes (24 bits) at a time and splits those 24 bits into four groups of 6
        bits. Each 6-bit value, from 0 to 63, is written as one character from the alphabet. When the input is
        not a multiple of 3 bytes, the last group is padded with <code>=</code> signs:
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Input</th>
            <th scope="col">Bytes</th>
            <th scope="col">Base64</th>
            <th scope="col">Padding</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>Man</code>
            </td>
            <td>3</td>
            <td>
              <code>TWFu</code>
            </td>
            <td>none</td>
          </tr>
          <tr>
            <td>
              <code>Ma</code>
            </td>
            <td>2</td>
            <td>
              <code>TWE=</code>
            </td>
            <td>one =</td>
          </tr>
          <tr>
            <td>
              <code>M</code>
            </td>
            <td>1</td>
            <td>
              <code>TQ==</code>
            </td>
            <td>two =</td>
          </tr>
        </tbody>
      </table>

      <h2>The Base64 alphabet</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Values</th>
            <th scope="col">Standard</th>
            <th scope="col">URL-safe</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0 to 25</td>
            <td>A to Z</td>
            <td>A to Z</td>
          </tr>
          <tr>
            <td>26 to 51</td>
            <td>a to z</td>
            <td>a to z</td>
          </tr>
          <tr>
            <td>52 to 61</td>
            <td>0 to 9</td>
            <td>0 to 9</td>
          </tr>
          <tr>
            <td>62</td>
            <td>
              <code>+</code>
            </td>
            <td>
              <code>-</code>
            </td>
          </tr>
          <tr>
            <td>63</td>
            <td>
              <code>/</code>
            </td>
            <td>
              <code>_</code>
            </td>
          </tr>
          <tr>
            <td>padding</td>
            <td>
              <code>=</code>
            </td>
            <td>
              <code>=</code>, often left off
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        RFC 4648 notes that the <code>=</code> in a URI is normally percent-encoded, so URL-safe Base64
        usually skips the padding when the data length is known another way. The tool&apos;s URL-safe option
        drops it.{" "}
      </p>

      <h2>How much bigger is Base64?</h2>
      <p>
        Every 3 bytes become 4 characters, so the output length is 4 times the input length divided by 3,
        rounded up. 1,000 bytes become 1,336 characters, about a third more. The tool shows the size of the
        input and the output above each box.
      </p>

      <h2>Unicode text and UTF-8</h2>
      <p>
        Base64 encodes bytes, not letters, so text has to become bytes first. This tool uses UTF-8, the usual
        choice on the web. A plain letter is 1 byte, <code>é</code> is 2 bytes and an emoji such as{" "}
        <code>😀</code> is 4:
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Text</th>
            <th scope="col">UTF-8 bytes</th>
            <th scope="col">Base64</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>é</code>
            </td>
            <td>2</td>
            <td>
              <code>w6k=</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>😀</code>
            </td>
            <td>4</td>
            <td>
              <code>8J+YgA==</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        If another tool encodes the same text as UTF-16 or Latin-1, its Base64 will differ from this one for
        anything that is not plain ASCII.
      </p>

      <h2>Encode Base64 in code</h2>
      <p>
        JavaScript, in a browser or Node. <code>btoa</code> only accepts characters up to code 255 and throws
        an <code>InvalidCharacterError</code> on anything else, so convert text to UTF-8 bytes first:
      </p>
      <pre>{`const text = "héllo 😀";
const bytes = new TextEncoder().encode(text);
const b64 = btoa(Array.from(bytes, (b) => String.fromCharCode(b)).join(""));
console.log(b64); // aMOpbGxvIPCfmIA=

// URL-safe: swap two characters and drop the padding
console.log(b64.replace(/\\+/g, "-").replace(/\\//g, "_").replace(/=+$/, ""));`}</pre>
      <p>In Node, Buffer does the same in one call and has a URL-safe name:</p>
      <pre>{`Buffer.from("héllo 😀", "utf8").toString("base64");    // aMOpbGxvIPCfmIA=
Buffer.from("??>>", "utf8").toString("base64url");     // Pz8-Pg`}</pre>
      <p>
        Python. <code>urlsafe_b64encode</code> keeps the <code>=</code> padding, so strip it if you want the
        unpadded form:
      </p>
      <pre>{`import base64

print(base64.b64encode("héllo 😀".encode("utf-8")).decode("ascii"))
print(base64.urlsafe_b64encode("??>>".encode("utf-8")).decode("ascii").rstrip("="))`}</pre>
      <p>
        Command line. Use <code>printf</code>, not <code>echo</code>, so no line break is encoded. GNU{" "}
        <code>base64</code> wraps its output every 76 characters; <code>-w 0</code> turns that off:
      </p>
      <pre>{`printf '%s' 'Hello, world' | base64
printf '%s' 'Hello, world' | base64 -w 0`}</pre>
      <p>PowerShell:</p>
      <pre>{`[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("Hello, world"))`}</pre>

      <h2>Common mistakes</h2>
      <ul>
        <li>
          <strong>Encoding a trailing newline.</strong> <code>echo Hello | base64</code> gives{" "}
          <code>SGVsbG8K</code>, not <code>SGVsbG8=</code>.
        </li>
        <li>
          <strong>Calling btoa on Unicode.</strong> It throws, or if the characters happen to fit in one byte,
          it encodes Latin-1 rather than UTF-8: <code>btoa(&quot;héllo&quot;)</code> gives{" "}
          <code>aOlsbG8=</code>, while the UTF-8 form is <code>aMOpbGxv</code>.
        </li>
        <li>
          <strong>Using standard Base64 in a URL.</strong> Use the URL-safe form, or percent-encode the{" "}
          <code>+</code>, <code>/</code> and <code>=</code>.
        </li>
        <li>
          <strong>Treating it as secret.</strong> Base64 hides nothing. See{" "}
          <Link href="/guides/what-is-base64/">the Base64 guide</Link>.
        </li>
      </ul>

      <h2>Limits of this tool</h2>
      <ul>
        <li>It encodes and decodes text only. There is no file or image input.</li>
        <li>
          Decoding needs the result to be valid UTF-8 text; binary results are reported as an error, not
          shown.
        </li>
        <li>
          Everything runs in your browser. The tool&apos;s code does not send what you paste anywhere; see the{" "}
          <Link href="/privacy/">privacy policy</Link> for the analytics the site does run.
        </li>
      </ul>
      <p>
        Base64 often carries JSON. After decoding, check it with the{" "}
        <Link href="/json-validator">JSON validator</Link> or tidy it with the{" "}
        <Link href="/json-formatter">JSON formatter</Link>.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href="https://www.rfc-editor.org/rfc/rfc4648" rel="noopener noreferrer">
            RFC 4648, The Base16, Base32, and Base64 Data Encodings
          </a>{" "}
          (the alphabet, padding, the URL and filename safe alphabet), checked 16 November 2026.
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Glossary/Base64" rel="noopener noreferrer">
            MDN: Base64
          </a>{" "}
          (about a third larger than the source), checked 16 November 2026.
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa" rel="noopener noreferrer">
            MDN: btoa()
          </a>{" "}
          (binary strings, InvalidCharacterError), checked 16 November 2026.
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder" rel="noopener noreferrer">
            MDN: TextEncoder
          </a>{" "}
          (encodes a string as UTF-8), checked 16 November 2026.
        </li>
        <li>
          <a href="https://nodejs.org/api/buffer.html" rel="noopener noreferrer">
            Node.js documentation: Buffer
          </a>{" "}
          (the base64 and base64url encodings), checked 16 November 2026.
        </li>
        <li>
          <a href="https://docs.python.org/3/library/base64.html" rel="noopener noreferrer">
            Python documentation: base64
          </a>{" "}
          (b64encode, urlsafe_b64encode), checked 16 November 2026.
        </li>
      </ul>
      <p>
        The example values and code were run in Node 22, Python 3.10, GNU coreutils 8.32 and Windows
        PowerShell 5.1.
      </p>
    </ToolPage>
  );
}
