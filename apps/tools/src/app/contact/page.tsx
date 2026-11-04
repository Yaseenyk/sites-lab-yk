import { Article, ContactBody, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Contact StreamerOS Dev Tools: Bugs and Tool Requests",
  description:
    "Contact the StreamerOS Dev Tools team to report a bug or a wrong result, or to request a new JSON or Base64 tool.",
  path: "/contact/",
});

export default function Page() {
  return (
    <Article title="Contact">
      <ContactBody site={site} />
    </Article>
  );
}
