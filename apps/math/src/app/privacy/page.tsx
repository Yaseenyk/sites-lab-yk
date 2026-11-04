import { Article, PrivacyBody, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Privacy Policy: StreamerOS Math Calculators",
  description: "What StreamerOS Math Calculators does with your input, cookies and advertising.",
  path: "/privacy/",
});

export default function Page() {
  return (
    <Article title="Privacy Policy">
      <PrivacyBody
        site={site}
        extra={
          <p>
            The calculators work entirely in your browser. The numbers and dates you type, including any date
            of birth, are not transmitted to our servers, logged, or stored. Closing the page clears them.
          </p>
        }
      />
    </Article>
  );
}
