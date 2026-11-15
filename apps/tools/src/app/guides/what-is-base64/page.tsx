import Link from "next/link";
import { AdSlot, pageMetadata } from "@sites/shell";
import GuideHead from "@/components/GuideHead";
import { AD_SLOT_CONTENT, site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "What Base64 is and when to use it",
  description:
    "How Base64 turns bytes into text, why it makes data a third bigger, what the URL-safe variant is, and why it is not encryption.",
  path: "/guides/what-is-base64/",
});

export default function Page() {
  return (
    <>
      <GuideHead slug="what-is-base64" />
      <article className="doc">
        <h1>What Base64 is and when to use it</h1>
        <p>
          Base64 is a way to write arbitrary bytes using only 64 safe, printable characters: <code>A-Z</code>,{" "}
          <code>a-z</code>, <code>0-9</code>, <code>+</code> and <code>/</code>. It exists because many
          systems (email, JSON, URLs, HTTP headers) were built for text and break on raw binary. You can try
          it in the <Link href="/base64">Base64 encoder and decoder</Link>.
        </p>

        <h2>How it works</h2>
        <p>
          The input is read three bytes (24 bits) at a time and split into four groups of 6 bits. Each 6-bit
          value, 0 to 63, maps to one character in the alphabet. If the input length is not a multiple of
          three, <code>=</code> padding fills out the last group. For example, the text <code>Man</code>{" "}
          becomes <code>TWFu</code>.
        </p>

        <h2>Why the output is bigger</h2>
        <p>
          Three bytes become four characters, so Base64 output is about one third larger than the input. A 300
          KB image embedded as Base64 costs roughly 400 KB.
        </p>

        <h2>It is not encryption</h2>
        <p>
          Anyone can decode Base64 without a key. Putting a password or token in Base64 hides nothing. If data
          must be secret, encrypt it first; Base64 is then only the way you carry the encrypted bytes as text.
        </p>

        <AdSlot slot={AD_SLOT_CONTENT} placement="in-article" />

        <h2>Common uses</h2>
        <ul>
          <li>
            <strong>Data URIs:</strong> small images inlined in HTML or CSS as{" "}
            <code>data:image/png;base64,...</code>.
          </li>
          <li>
            <strong>Email attachments:</strong> MIME encodes binary files this way.
          </li>
          <li>
            <strong>HTTP Basic authentication:</strong> the <code>user:password</code> pair is Base64-encoded
            in the header, which is why Basic auth must only be used over HTTPS.
          </li>
          <li>
            <strong>JWTs:</strong> the header and payload are Base64URL-encoded JSON.
          </li>
        </ul>

        <h2>The URL-safe variant</h2>
        <p>
          <code>+</code> and <code>/</code> have special meaning in URLs and filenames. Base64URL (RFC 4648,
          section 5) swaps them for <code>-</code> and <code>_</code> and usually omits the <code>=</code>{" "}
          padding. Use the URL-safe option in the tool when the result goes into a URL, a filename or a JWT.
        </p>

        <h2>Text and Unicode</h2>
        <p>
          Base64 works on bytes, not characters, so text must be turned into bytes first. UTF-8 is the usual
          choice. Encoding text with accents or emoji through a function that assumes single-byte characters
          produces wrong output, which is why the tool encodes as UTF-8.
        </p>
        <h2>Worked examples you can check</h2>
        <table>
          <thead>
            <tr>
              <th scope="col">Input</th>
              <th scope="col">Base64</th>
              <th scope="col">Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <code>Man</code>
              </th>
              <td>
                <code>TWFu</code>
              </td>
              <td>3 bytes make exactly 4 characters, no padding</td>
            </tr>
            <tr>
              <th scope="row">
                <code>Ma</code>
              </th>
              <td>
                <code>TWE=</code>
              </td>
              <td>2 bytes leave a short group, one = pad</td>
            </tr>
            <tr>
              <th scope="row">
                <code>M</code>
              </th>
              <td>
                <code>TQ==</code>
              </td>
              <td>1 byte, two = pads</td>
            </tr>
            <tr>
              <th scope="row">
                <code>user:pass</code>
              </th>
              <td>
                <code>dXNlcjpwYXNz</code>
              </td>
              <td>the form used by HTTP Basic authentication</td>
            </tr>
            <tr>
              <th scope="row">
                <code>Hello, 世界</code>
              </th>
              <td>
                <code>SGVsbG8sIOS4lueVjA==</code>
              </td>
              <td>13 UTF-8 bytes (each Chinese character takes 3), 20 output characters</td>
            </tr>
          </tbody>
        </table>
        <p>
          The length rule is <code>4 x ceil(n / 3)</code> characters for n bytes. For 13 bytes that is 4 x 5 =
          20, which matches the last row. The URL-safe form differs only in the two symbols: the three bytes{" "}
          <code>FB FF FE</code> encode to <code>+//+</code> in standard Base64 and <code>-__-</code> in
          Base64URL.
        </p>

        <h2>Why a Base64 string will not decode</h2>
        <ul>
          <li>
            <strong>Wrong length.</strong> A valid string with padding has a length that is a multiple of 4.
            Without padding, a remainder of 1 character is impossible, so the string was cut off or has an
            extra character.
          </li>
          <li>
            <strong>The wrong alphabet.</strong> A string with <code>-</code> or <code>_</code> is Base64URL;
            a decoder expecting the standard alphabet rejects it, and the reverse is also true.
          </li>
          <li>
            <strong>Line breaks and spaces.</strong> Email (MIME) wraps Base64 at 76 characters per line.
            Strict decoders reject the line breaks; remove them first.
          </li>
          <li>
            <strong>It was not text to begin with.</strong> Decoding an image or a compressed file as text
            produces unreadable characters. That is not an error in the Base64; the bytes are simply not text.
          </li>
        </ul>
        <p>
          The <Link href="/base64-decode">Base64 decode</Link> page lists the cause it finds for a string that
          fails, and the <Link href="/base64">Base64 encoder and decoder</Link> handles both directions with
          UTF-8.
        </p>

        <h2>In JavaScript</h2>
        <p>
          Browsers have <code>btoa()</code> and <code>atob()</code>, but they work on strings of single-byte
          characters, so <code>btoa(&quot;世&quot;)</code> throws an error. For text, convert to UTF-8 bytes
          first (for example with <code>TextEncoder</code>) and encode those. In Node.js,{" "}
          <code>Buffer.from(text).toString(&quot;base64&quot;)</code> does it directly, and{" "}
          <code>&quot;base64url&quot;</code> gives the URL-safe variant.
        </p>

        <h2>Sources</h2>
        <p>
          The alphabet, padding and the URL-safe variant are defined in RFC 4648 (
          <a href="https://datatracker.ietf.org/doc/html/rfc4648" rel="noopener noreferrer">
            datatracker.ietf.org/doc/html/rfc4648
          </a>
          ). The 76-character line limit comes from MIME, RFC 2045 section 6.8. HTTP Basic authentication is
          RFC 7617, and the JWT format that uses Base64URL is RFC 7519.
        </p>
        <AdSlot slot={AD_SLOT_CONTENT} placement="article-end" />
      </article>
    </>
  );
}
