import { Article, ContactBody, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Contact",
  description: "Report a bug, a wrong result, or request a tool.",
  path: "/contact/",
});

export default function Page() {
  return (
    <Article title="Contact">
      <ContactBody site={site} />
    </Article>
  );
}
