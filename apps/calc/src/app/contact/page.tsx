import { Article, ContactBody, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Contact StreamerOS Money Calculators: Errors and Requests",
  description:
    "Contact the StreamerOS Money Calculators team to report a wrong result or a bug, or to request a new calculator or currency pair.",
  path: "/contact/",
});

export default function Page() {
  return (
    <Article title="Contact">
      <ContactBody site={site} />
    </Article>
  );
}
