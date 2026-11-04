import { Article, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "About StreamerOS Money Calculators: Free, Private Money Math",
  description:
    "Who runs StreamerOS Money Calculators, why it exists, and how the calculators handle your data.",
  path: "/about/",
});

export default function Page() {
  return (
    <Article title="About">
      <p>
        StreamerOS Money Calculators is a small set of free calculators for everyday money questions: pay
        raises, salary and hourly conversion, overtime and time and a half, and currency conversion between
        any two currencies, with short guides that explain the rules behind them.
      </p>
      <p>
        It is built and maintained by Yaseen Khatib, a full-stack AI engineer, as part of the StreamerOS
        project. The calculators exist because many are cluttered and never show how the answer is reached, so
        every page here states its formula and a worked example.
      </p>
      <h2>How the calculators work</h2>
      <p>
        Every calculator runs in your browser using standard JavaScript. The figures you enter are processed
        on your device and are not sent to a server or stored. The currency tools download a public list of
        exchange rates; your amounts are never part of that request. The site is a static website hosted on
        GitHub Pages.
      </p>
      <h2>What the results are, and are not</h2>
      <p>
        Pay results are estimates of gross pay before tax and other deductions. Currency results use
        mid-market reference rates from a free public feed, which can be up to a day old and are not the rate
        a bank or transfer service will give you. None of it is financial, tax or legal advice. Overtime rules
        in particular vary by state and by job, so check your payslip or your state labor department for the
        exact rule that applies to you.
      </p>
      <h2>How the site is funded</h2>
      <p>
        The calculators are free. The site may show Google AdSense ads to cover hosting and development time.
        Ads never change the result of a calculator.
      </p>
      <h2>Corrections</h2>
      <p>
        If a result is wrong or a guide contains a mistake, please use the contact page. Fixes are made in the
        open and the guides are updated.
      </p>
    </Article>
  );
}
