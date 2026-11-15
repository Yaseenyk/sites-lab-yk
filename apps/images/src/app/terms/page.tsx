import { Article, TermsBody, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Terms of Use: StreamerOS Image Tools",
  description:
    "The terms for using StreamerOS Image Tools: accuracy, acceptable use, ownership, ads and liability.",
  path: "/terms/",
});

export default function Page() {
  return (
    <Article title="Terms of Use">
      <TermsBody
        site={site}
        extra={
          <>
            <h2>Your images and your responsibility</h2>
            <p>
              The tools process images in your browser, and you keep all rights in them. Only use images you
              have the right to use. Lossy compression and conversion permanently discard detail in the file
              you download, so keep your original. We cannot guarantee that a particular upload form, portal
              or authority will accept a file the tools produce; check its requirements.
            </p>
          </>
        }
      />
    </Article>
  );
}
