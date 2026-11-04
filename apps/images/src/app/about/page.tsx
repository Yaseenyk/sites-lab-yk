import { Article, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "About StreamerOS Image Tools: Free, Private Image Tools",
  description:
    "Who runs StreamerOS Image Tools, why it exists, and how the tools handle your photos: everything runs in your browser.",
  path: "/about/",
});

export default function Page() {
  return (
    <Article title="About">
      <p>
        StreamerOS Image Tools is a small set of free tools for everyday picture jobs: compressing a photo to
        a size limit, resizing, and converting between PNG, JPG, WebP and AVIF, with short guides that explain
        what is happening to the file.
      </p>
      <p>
        It is built and maintained by Yaseen Khatib, a full-stack AI engineer, as part of the StreamerOS
        project. Many image tools upload your pictures to a server, which is a poor fit for ID-style photos
        and private pictures, so everything here runs on your own device.
      </p>
      <h2>How the tools work</h2>
      <p>
        Your browser decodes the image and draws it on a canvas, and then saves it again in the format and
        size you asked for. The pictures are not sent to a server or stored, and closing the page clears them.
        The site is a static website hosted on GitHub Pages.
      </p>
      <h2>What the results are, and are not</h2>
      <p>
        Compression is lossy: JPEG and WebP discard some detail to save space, so keep your original. Saving
        through a canvas also removes metadata such as camera details and location. If a form has rules beyond
        file size, such as exact pixel dimensions, check them yourself.
      </p>
      <h2>How the site is funded</h2>
      <p>
        The tools are free. The site may show Google AdSense ads to cover hosting and development time. Ads
        never change what a tool does to your image.
      </p>
      <h2>Corrections</h2>
      <p>
        If a tool misbehaves or a guide contains a mistake, please use the contact page. Fixes are made in the
        open and the guides are updated.
      </p>
    </Article>
  );
}
