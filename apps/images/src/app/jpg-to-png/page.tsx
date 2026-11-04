import { pageMetadata } from "@sites/shell";
import ConvertPageView from "@/components/ConvertPageView";
import { convertPageBySlug } from "@/lib/pages";
import { site } from "@/site";

const page = convertPageBySlug("jpg-to-png");
export const metadata = pageMetadata(site, {
  title: page.seoTitle,
  description: page.description,
  path: "/jpg-to-png/",
});

export default function Page() {
  return <ConvertPageView slug="jpg-to-png" />;
}
