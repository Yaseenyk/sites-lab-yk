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
    a: "Base64 turns every 3 bytes into 4 characters, so the output is about 33% larger than the input, plus padding.",
  },
  {
    q: "What is URL-safe Base64?",
    a: "A variant that uses - and _ instead of + and /, and usually drops the = padding, so the result can sit inside a URL or filename. It is defined in RFC 4648, section 5.",
  },
  {
    q: "Does it handle emoji and accented text?",
    a: "Yes. Text is converted to UTF-8 bytes before encoding, so any Unicode character round-trips correctly. Functions that assume one byte per character, like a bare btoa, fail on such text.",
  },
  {
    q: "Why does decoding fail?",
    a: "Either the text is not valid Base64, or it decodes to bytes that are not UTF-8 text, such as an image or a compressed file. This tool decodes text only.",
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
      <h2>How to use it</h2>
      <ol>
        <li>Type or paste text into the Input box.</li>
        <li>
          Press <strong>Encode</strong> to get Base64, or paste Base64 and press <strong>Decode</strong> to
          get the text back.
        </li>
        <li>
          Tick <strong>URL-safe</strong> before encoding if the result goes in a URL, a filename or a JWT.
        </li>
      </ol>
      <p>
        Want the background? Read <Link href="/guides/what-is-base64">what Base64 is and when to use it</Link>
        .
      </p>

      <h2>Example</h2>
      <pre>{`Hello, world   →   SGVsbG8sIHdvcmxk`}</pre>
      <p>
        Standard Base64 can contain <code>+</code>, <code>/</code> and trailing <code>=</code>. The URL-safe
        form replaces the first two with <code>-</code> and <code>_</code> and drops the padding.
      </p>
    </ToolPage>
  );
}
