import type { ReactNode } from "react";
import { CLARITY_ID, type SiteConfig } from "./config";

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
        updated: 24 November 2026.
      </p>
      <h2>What the tools do with your input</h2>
      {extra}
      <h2>Cookies and similar technologies</h2>
      <p>
        Cookies are small files a site stores in your browser. The analytics and advertising services listed
        below may set cookies or read similar identifiers. The tools themselves do not need a cookie to work.
        The only thing the site stores for its own use is your light or dark theme choice, kept in your
        browser&apos;s local storage and never sent anywhere. You can block or delete cookies in your browser
        settings; the tools keep working either way.
      </p>
      <h2>Analytics</h2>
      <p>
        This site uses Google Analytics 4 to count visits and see which pages are useful. It collects page
        views, approximate location, device and browser type, and how you arrived, using cookies and similar
        identifiers. It does not receive the text you enter into the tools. You can opt out with the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer">
          Google Analytics opt-out browser add-on
        </a>
        . Google signals is on, so for visitors signed in to a Google account with ad personalisation turned
        on, Google may associate this site&apos;s visit data with that account to give us aggregated reports
        on age group, gender and interests; no individual is identified to us. You can turn this off in your
        Google account under Data &amp; privacy, or in{" "}
        <a href="https://myadcenter.google.com/" rel="noopener noreferrer">
          My Ad Center
        </a>
        . We do not sell personal information.
      </p>
      {CLARITY_ID && (
        <>
          <h2>Usage recording</h2>
          <p>
            This site uses Microsoft Clarity to see how pages are used, through heatmaps and anonymised
            session recordings (mouse movement, clicks and scrolling). Clarity is configured to mask the text
            on the page, so what you type or load into a tool is not recorded. Clarity sets its own cookies (
            <code>_clck</code>, <code>_clsk</code>) and Microsoft cookies on clarity.ms and bing.com (such as{" "}
            <code>MUID</code>); see{" "}
            <a href="https://privacy.microsoft.com/privacystatement" rel="noopener noreferrer">
              Microsoft&apos;s privacy statement
            </a>
            .
          </p>
        </>
      )}
      <h2>First-party visit counter</h2>
      <p>
        The site also runs a small counter of its own, Pulse, a script served from our own Cloudflare Worker
        (pulse.yaseenyk.workers.dev), to tell real visits from automated ones. It records the page address
        (without the query string), the referring site and campaign tags, country, device type, browser and
        system name, screen size, language, the name of your network provider, scroll depth, time on the page,
        page speed, which links and buttons were clicked, and a human-or-bot signal. Since 24 November 2026 it
        also records a few technical details: up to three script error messages per page (the message, script
        file and line), whether your browser translated the page and into which language, the connection type
        (such as 4g or 3g), how fast the page responded to a tap, layout jumps, and the name of a form that
        was sent or started but not sent (never what was typed; these sites have no forms today). It sets no
        cookies, never reads what you type or the values in input fields, and stores no IP address or browser
        string: the address is used in memory only, to limit abuse and to make a visitor code that changes
        every day (a one-way hash with a random salt that is deleted the next day), so visits cannot be linked
        across days. Records are deleted after 90 days. It switches itself off when your browser sends Do Not
        Track or Global Privacy Control, and on localhost. The data is used only to understand how the site is
        used.
      </p>
      <h2>Advertising</h2>
      <p>
        This site does not show ads at the moment. We intend to use Google AdSense after approval. Once ads
        run, Google and its partners may use cookies to serve ads based on your visits to this and other
        websites. You can opt out of personalised advertising at{" "}
        <a href="https://adssettings.google.com" rel="noopener noreferrer">
          adssettings.google.com
        </a>
        , and learn how Google uses data from sites that use its services at{" "}
        <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">
          policies.google.com/technologies/partner-sites
        </a>
        . Where required by law (for example in the EEA and UK), personalised ads will be shown only after you
        consent. Ads will never change a tool&apos;s result, and this policy will be updated before ads go
        live if anything above changes.
      </p>
      <h2>Your choices</h2>
      <p>
        You can use the site with cookies blocked, opt out of Google Analytics with the add-on above, turn on
        Do Not Track or Global Privacy Control to switch off the visit counter, and ask a privacy question
        through the contact page. We do not collect accounts, names or email addresses through the tools. If
        you write to us, we use your address only to reply.
      </p>
      <h2>Children</h2>
      <p>
        The tools are general-purpose and not aimed at children under 13, and we do not knowingly collect
        their data.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy: see the <a href="/contact/">contact page</a>. The rules for using the
        site are in the <a href="/terms/">terms of use</a>.
      </p>
    </>
  );
}

export function ContactBody({ site }: { site: SiteConfig }) {
  return (
    <>
      <p>
        Found a bug, a wrong result, or want a tool added? Tell us and include the input that caused the
        problem when you can. Messages go to the person who runs the site, and we aim to reply within a few
        working days.
      </p>
      {site.contactEmail ? (
        <p>
          Email: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </p>
      ) : (
        <p>Contact details are being set up.</p>
      )}
      <h2>What helps most</h2>
      <ul>
        <li>The page address and what you expected to see.</li>
        <li>
          The input that caused a wrong result, with anything private removed, and the browser you used.
        </li>
        <li>For a mistake in a guide, the sentence and the source you believe says otherwise.</li>
      </ul>
      <h2>What we cannot do</h2>
      <p>
        We cannot give personal financial, tax, legal or employment advice, check a specific document, or
        recover a file for you, because nothing you enter is uploaded to us. The site is run by one person, so
        replies can take a few days. Reports of wrong results are fixed first. If you do not want us to keep
        your email address, say so and we will delete the message once it is answered.
      </p>
    </>
  );
}

export function TermsBody({ site, extra }: { site: SiteConfig; extra?: ReactNode }) {
  return (
    <>
      <p>
        These terms apply when you use {site.name} ({site.url}). By using the site you agree to them. If you
        do not agree, please do not use it. Last updated: 16 November 2026.
      </p>
      <h2>What the site is</h2>
      <p>
        {site.name} is a free set of browser-based tools and explanatory guides, run by an individual. The
        tools run on your device. How the site treats information is described in the{" "}
        <a href="/privacy/">privacy policy</a>.
      </p>
      <h2>Use as is, and accuracy</h2>
      <p>
        The tools and guides are provided as they are, without warranties of any kind. We test the logic and
        state our formulas and assumptions on each page, but mistakes are possible and rules, rates and
        standards change. Check anything that matters before you rely on it.
      </p>
      {extra}
      <h2>Acceptable use</h2>
      <p>
        Use the site lawfully. Do not attempt to disrupt it, overload it with automated requests, probe it for
        weaknesses, or use it to process material you have no right to handle. You are responsible for the
        data you put into a tool and for what you do with the result.
      </p>
      <h2>Content and ownership</h2>
      <p>
        The text, design and code of the site belong to its owner unless stated otherwise, and third-party
        names and standards cited remain the property of their owners. You may link to any page. Please do not
        republish the guides or copy them in bulk without permission; short quotations with a link back are
        fine.
      </p>
      <h2>Links, ads and third parties</h2>
      <p>
        Pages link to outside sources so you can check our work. We do not control those sites and are not
        responsible for them. If ads are shown, they are provided by third parties, are labelled as ads, and
        do not mean we endorse the advertiser.
      </p>
      <h2>Availability and liability</h2>
      <p>
        The site may change or be unavailable at any time. To the extent the law allows, we are not liable for
        any loss arising from your use of, or inability to use, the site or from reliance on a result it
        gives. Nothing here limits any right you have by law that cannot be limited.
      </p>
      <h2>Changes to these terms</h2>
      <p>
        We may update these terms. The date at the top shows the latest version, and continued use after a
        change means you accept it.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms: see the <a href="/contact/">contact page</a>.
      </p>
    </>
  );
}
