import Link from "next/link";
import { AdSlot, JsonLd, faqJsonLd, pageMetadata, toolJsonLd } from "@sites/shell";
import Base64Tool from "@/components/Base64Tool";
import { AD_SLOT_CONTENT, site } from "@/site";

const path = "/base64/";
const title = "Base64 Encode & Decode";
const description = "Encode text to Base64 or decode Base64 back to text, with UTF-8 and URL-safe support. Runs in your browser.";

export const metadata = pageMetadata(site, { title, description, path });

const faq = [
  { q: "Is Base64 encryption?", a: "No. Base64 is an encoding that anyone can reverse without a key. Never use it to hide passwords or secrets." },
  { q: "Why is the output longer than the input?", a: "Base64 turns every 3 bytes into 4 characters, so the output is about 33% larger than the input, plus padding." },
  { q: "What is URL-safe Base64?", a: "A variant that uses - and _ instead of + and /, and usually drops the = padding, so the result can sit inside a URL or filename. It is defined in RFC 4648, section 5." },
  { q: "Why does decoding fail?", a: "Either the text is not valid Base64, or it decodes to bytes that are not UTF-8 text, for example an image or a compressed file. This tool decodes text only." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={toolJsonLd(site, { name: title, description, path })} />
      <JsonLd data={faqJsonLd(faq)} />
      <h1>{title}</h1>
      <p className="lede">Convert text to Base64 and back. Unicode text is handled as UTF-8, and nothing is sent to a server.</p>
      <Base64Tool />
      <AdSlot slot={AD_SLOT_CONTENT} />
      <div className="prose">
        <h2>How to use it</h2>
        <ol>
          <li>Type or paste text into the Input box.</li>
          <li>Press <strong>Encode</strong> to get Base64, or paste Base64 and press <strong>Decode</strong> to get the text back.</li>
          <li>Tick <strong>URL-safe</strong> before encoding if the result goes in a URL, a filename or a JWT.</li>
        </ol>
        <p>
          New to the format? Read <Link href="/guides/what-is-base64">what Base64 is and when to use it</Link>.
        </p>
        <h2>Frequently asked questions</h2>
        <dl className="faq">
          {faq.map((f) => (
            <div key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
