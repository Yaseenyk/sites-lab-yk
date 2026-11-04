import { pageMetadata } from "@sites/shell";
import ConvertPageView from "@/components/ConvertPageView";
import { convertPageBySlug } from "@/lib/pages";
import { site } from "@/site";

const page = convertPageBySlug("image-to-jpg");
export const metadata = pageMetadata(site, {
  title: page.seoTitle,
  description: page.description,
  path: "/image-to-jpg/",
});

export default function Page() {
  return <ConvertPageView slug="image-to-jpg" />;
}
