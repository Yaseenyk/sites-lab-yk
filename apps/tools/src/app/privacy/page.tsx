import { Article, PrivacyBody, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Privacy Policy",
  description: "What StreamerOS Dev Tools does with your input, cookies and advertising.",
  path: "/privacy/",
});

export default function Page() {
  return (
    <Article title="Privacy Policy">
      <PrivacyBody
        site={site}
        extra={
          <p>
            The JSON formatter and Base64 tool process your text entirely in your browser. The text you type or paste is not transmitted to our servers, logged, or stored. Closing the page clears it.
          </p>
        }
      />
    </Article>
  );
}
