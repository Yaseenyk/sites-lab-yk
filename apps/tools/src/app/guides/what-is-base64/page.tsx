import Link from "next/link";
import { AdSlot, pageMetadata } from "@sites/shell";
import { AD_SLOT_CONTENT, site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "What Base64 is and when to use it",
  description: "How Base64 turns bytes into text, why it makes data a third bigger, what the URL-safe variant is, and why it is not encryption.",
  path: "/guides/what-is-base64/",
});

export default function Page() {
  return (
    <article className="prose">
      <h1>What Base64 is and when to use it</h1>
      <p>
        Base64 is a way to write arbitrary bytes using only 64 safe, printable characters: <code>A-Z</code>, <code>a-z</code>, <code>0-9</code>, <code>+</code> and <code>/</code>. It exists because many systems (email, JSON, URLs, HTTP headers) were built for text and break on raw binary. You can try it in the <Link href="/base64">Base64 encoder and decoder</Link>.
      </p>

      <h2>How it works</h2>
      <p>
        The input is read three bytes (24 bits) at a time and split into four groups of 6 bits. Each 6-bit value, 0 to 63, maps to one character in the alphabet. If the input length is not a multiple of three, <code>=</code> padding fills out the last group. For example, the text <code>Man</code> becomes <code>TWFu</code>.
      </p>

      <h2>Why the output is bigger</h2>
      <p>
        Three bytes become four characters, so Base64 output is about one third larger than the input. A 300 KB image embedded as Base64 costs roughly 400 KB.
      </p>

      <h2>It is not encryption</h2>
      <p>
        Anyone can decode Base64 without a key. Putting a password or token in Base64 hides nothing. If data must be secret, encrypt it first; Base64 is then only the way you carry the encrypted bytes as text.
      </p>

      <AdSlot slot={AD_SLOT_CONTENT} />

      <h2>Common uses</h2>
      <ul>
        <li><strong>Data URIs:</strong> small images inlined in HTML or CSS as <code>data:image/png;base64,...</code>.</li>
        <li><strong>Email attachments:</strong> MIME encodes binary files this way.</li>
        <li><strong>HTTP Basic authentication:</strong> the <code>user:password</code> pair is Base64-encoded in the header, which is why Basic auth must only be used over HTTPS.</li>
        <li><strong>JWTs:</strong> the header and payload are Base64URL-encoded JSON.</li>
      </ul>

      <h2>The URL-safe variant</h2>
      <p>
        <code>+</code> and <code>/</code> have special meaning in URLs and filenames. Base64URL (RFC 4648, section 5) swaps them for <code>-</code> and <code>_</code> and usually omits the <code>=</code> padding. Use the URL-safe option in the tool when the result goes into a URL, a filename or a JWT.
      </p>

      <h2>Text and Unicode</h2>
      <p>
        Base64 works on bytes, not characters, so text must be turned into bytes first. UTF-8 is the usual choice. Encoding text with accents or emoji through a function that assumes single-byte characters produces wrong output, which is why the tool encodes as UTF-8.
      </p>
    </article>
  );
}
