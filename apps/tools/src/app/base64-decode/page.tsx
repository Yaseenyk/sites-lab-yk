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
    a: "Yes. - and _ are treated as + and /, and missing = padding is added back, so strings taken from a URL or a JWT decode without edits.",
  },
  {
    q: "Can I decode a JWT here?",
    a: "You can decode the header and payload, which are Base64URL-encoded JSON: paste one segment (the text between the dots) at a time. Decoding does not verify the signature, so never trust a token because it decodes.",
  },
  {
    q: "Why do I see garbled characters or an error?",
    a: "The data is probably not text. Base64 often wraps images, PDFs or compressed data, and those bytes are not valid UTF-8. This tool decodes text only.",
  },
  {
    q: "Why does decoding fail with an invalid string?",
    a: "Check for characters outside A-Z, a-z, 0-9, + and / (or - and _), stray quotes, or a string cut off in the middle. Line breaks and spaces are ignored.",
  },
  {
    q: "Is my input uploaded?",
    a: "No. Decoding happens in your browser, and the text never leaves your device.",
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

      <h2>Example</h2>
      <pre>{`SGVsbG8sIHdvcmxk   →   Hello, world`}</pre>

      <h2>When the result is not text</h2>
      <p>
        Base64 is a way to carry bytes, not a type of data. If the original was an image, a PDF or an archive,
        the decoded bytes are not readable text and this tool will report an error instead of showing
        nonsense. Save such data to a file with a tool built for binary content.
      </p>
      <p>
        Base64 is also not encryption. If decoding reveals a password or a key, treat it as exposed.{" "}
        <Link href="/guides/what-is-base64">The guide to Base64</Link> explains why.
      </p>
    </ToolPage>
  );
}
