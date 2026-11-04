import { Article, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "About StreamerOS Dev Tools: Free, Private Dev Utilities",
  description: "Who runs StreamerOS Dev Tools, why it exists, and how the tools handle your data.",
  path: "/about/",
});

export default function Page() {
  return (
    <Article title="About">
      <p>
        StreamerOS Dev Tools is a small set of free utilities for developers: a JSON formatter and validator,
        a Base64 encoder and decoder, and short guides that explain the formats behind them.
      </p>
      <p>
        It is built and maintained by Yaseen Khatib, a full-stack AI engineer, as part of the StreamerOS
        project. The tools exist because the common ones are often cluttered, slow or unclear about what
        happens to the text you paste.
      </p>
      <h2>How the tools work</h2>
      <p>
        Every tool runs in your browser using standard JavaScript. The text you enter is processed on your
        device and is not sent to a server or stored. The site is a static website hosted on GitHub Pages.
      </p>
      <h2>How the site is funded</h2>
      <p>
        The tools are free. The site may show Google AdSense ads to cover hosting and development time. Ads
        never change the output of a tool.
      </p>
      <h2>Corrections</h2>
      <p>
        If a result is wrong or a guide contains a mistake, please use the contact page. Fixes are made in the
        open and the guides are updated.
      </p>
    </Article>
  );
}
