import { pageMetadata } from "@sites/shell";
import SizePageView from "@/components/SizePageView";
import { sizePageBySlug } from "@/lib/pages";
import { site } from "@/site";

const page = sizePageBySlug("compress-image-to-100kb");
export const metadata = pageMetadata(site, {
  title: page.seoTitle,
  description: page.description,
  path: "/compress-image-to-100kb/",
});

export default function Page() {
  return <SizePageView slug="compress-image-to-100kb" />;
}
