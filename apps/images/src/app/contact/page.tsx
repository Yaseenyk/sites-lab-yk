import { Article, ContactBody, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Contact StreamerOS Image Tools: Bugs and Requests",
  description:
    "Contact the StreamerOS Image Tools team to report a bug or a file that will not convert, or to request a new image tool.",
  path: "/contact/",
});

export default function Page() {
  return (
    <Article title="Contact">
      <ContactBody site={site} />
    </Article>
  );
}
