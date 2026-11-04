import { Article, ContactBody, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Contact StreamerOS Math Calculators: Errors and Requests",
  description:
    "Contact the StreamerOS Math Calculators team to report a wrong result or a bug, or to request a new calculator.",
  path: "/contact/",
});

export default function Page() {
  return (
    <Article title="Contact">
      <ContactBody site={site} />
    </Article>
  );
}
