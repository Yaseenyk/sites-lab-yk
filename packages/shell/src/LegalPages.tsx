import type { ReactNode } from "react";
import type { SiteConfig } from "./config";

export function Article({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="doc">
      <h1 className="!mb-4 !text-[clamp(2rem,5vw,3rem)] !font-bold !leading-[1.1]">{title}</h1>
      {children}
    </article>
  );
}

export function PrivacyBody({ site, extra }: { site: SiteConfig; extra?: ReactNode }) {
  return (
    <>
      <p>
        This policy describes what {site.name} ({site.url}) does with information when you use it. Last
        updated: 4 November 2026.
      </p>
      <h2>What the tools do with your input</h2>
      {extra}
      <h2>Advertising and cookies</h2>
      <p>
        This site may show ads served by Google AdSense. Google and its partners use cookies to serve ads
        based on your visits to this and other websites. You can opt out of personalised advertising at{" "}
        <a href="https://adssettings.google.com" rel="noopener noreferrer">
          adssettings.google.com
        </a>
        , and learn how Google uses data at{" "}
        <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">
          policies.google.com/technologies/partner-sites
        </a>
        . Where required by law (for example in the EEA and UK), personalised ads are only shown after you
        consent.
      </p>
      <h2>Analytics</h2>
      <p>
        This site uses Google Analytics 4 to count visits and see which pages are useful. It collects page
        views, approximate location, device and browser type, and how you arrived, using cookies and similar
        identifiers. It does not receive the text you enter into the tools. You can opt out with the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer">
          Google Analytics opt-out browser add-on
        </a>
        . We do not sell personal information.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy: see the <a href="/contact">contact page</a>.
      </p>
    </>
  );
}

export function ContactBody({ site }: { site: SiteConfig }) {
  return (
    <>
      <p>
        Found a bug, a wrong result, or want a tool added? Tell us and include the input that caused the
        problem when you can.
      </p>
      {site.contactEmail ? (
        <p>
          Email: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </p>
      ) : (
        <p>Contact details are being set up.</p>
      )}
    </>
  );
}
