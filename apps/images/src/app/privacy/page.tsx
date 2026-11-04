import { Article, PrivacyBody, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Privacy Policy: StreamerOS Image Tools",
  description: "What StreamerOS Image Tools does with your images, cookies and advertising.",
  path: "/privacy/",
});

export default function Page() {
  return (
    <Article title="Privacy Policy">
      <PrivacyBody
        site={site}
        extra={
          <p>
            The tools process your images entirely in your browser. The pictures you choose are not
            transmitted to our servers, logged, or stored, and closing the page clears them. Re-saving an
            image through the tools also removes metadata such as camera details and GPS location from the
            file you download.
          </p>
        }
      />
    </Article>
  );
}
