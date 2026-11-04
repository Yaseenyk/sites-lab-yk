import { Article, PrivacyBody, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Privacy Policy: StreamerOS Pay Calculators",
  description: "What StreamerOS Pay Calculators does with your input, cookies and advertising.",
  path: "/privacy/",
});

export default function Page() {
  return (
    <Article title="Privacy Policy">
      <PrivacyBody
        site={site}
        extra={
          <p>
            The calculators work entirely in your browser. The pay figures you type are not transmitted to our
            servers, logged, or stored. Closing the page clears them.
          </p>
        }
      />
    </Article>
  );
}
