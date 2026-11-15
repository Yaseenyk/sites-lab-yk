import { Article, TermsBody, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Terms of Use: StreamerOS Dev Tools",
  description:
    "The terms for using StreamerOS Dev Tools: accuracy, acceptable use, ownership, ads and liability.",
  path: "/terms/",
});

export default function Page() {
  return (
    <Article title="Terms of Use">
      <TermsBody
        site={site}
        extra={
          <>
            <h2>Your data and your responsibility</h2>
            <p>
              The tools process the text you paste in your browser. You are responsible for what you paste: do
              not use the tools on material you are not allowed to handle, and remember that Base64 is an
              encoding, not encryption, and offers no secrecy. Formatted or converted output should be checked
              before it goes into production systems.
            </p>
          </>
        }
      />
    </Article>
  );
}
