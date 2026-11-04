import { Article, PrivacyBody, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Privacy Policy: StreamerOS Money Calculators",
  description: "What StreamerOS Money Calculators does with your input, cookies and advertising.",
  path: "/privacy/",
});

export default function Page() {
  return (
    <Article title="Privacy Policy">
      <PrivacyBody
        site={site}
        extra={
          <>
            <p>
              The calculators work entirely in your browser. The pay figures and amounts you type are not
              transmitted to our servers, logged, or stored. Closing the page clears them.
            </p>
            <p>
              The currency tools request a public list of exchange rates from jsDelivr, Cloudflare Pages or
              ExchangeRate-API when you open them. That request does not contain your amounts, but, as with
              any website you visit, those services can see your IP address.
            </p>
          </>
        }
      />
    </Article>
  );
}
