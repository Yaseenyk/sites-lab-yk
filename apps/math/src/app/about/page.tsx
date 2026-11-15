import { Article, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "About StreamerOS Math Calculators: Free, Private Math",
  description:
    "Who runs StreamerOS Math Calculators, why it exists, and how the calculators handle your numbers: everything runs in your browser.",
  path: "/about/",
});

export default function Page() {
  return (
    <Article title="About">
      <p>
        StreamerOS Math Calculators is a small set of free calculators for everyday number questions:
        percentages and percent change, age, days between dates, adding to a date, hours worked, ratios and
        averages, with short guides that explain the formulas.
      </p>
      <p>
        It is built and maintained by Yaseen Khatib, a full-stack AI engineer, as part of the StreamerOS
        project. Many calculators give an answer without showing how it was reached, so every page here states
        its formula and works a few examples you can check by hand.
      </p>
      <h2>How the calculators work</h2>
      <p>
        Every calculator runs in your browser using standard JavaScript. The numbers and dates you enter,
        including dates of birth, are processed on your device and are not sent to a server or stored. The
        site is a static website hosted on GitHub Pages.
      </p>
      <h2>What the results are, and are not</h2>
      <p>
        The calculators do exact arithmetic on what you type, and the date logic is tested against known
        cases. They are general tools, not financial, legal or medical advice. For legal ages and deadlines,
        check the rules that apply in your country; for example, the date a 29 February birthday is observed
        differs between countries.
      </p>
      <h2>Who is behind it</h2>
      <p>
        The site is run by one person, Yaseen Khatib, a full-stack AI developer based in Hyderabad, India. His
        portfolio is at{" "}
        <a href="https://yk.streamerosai.com" rel="noopener noreferrer">
          yk.streamerosai.com
        </a>
        . There is no team and no company behind the pages, which is why corrections go straight to him
        through the <a href="/contact/">contact page</a>. The same family of small sites also includes tools
        for developers, money, images and maths at tools, calc, images and math on streamerosai.com.
      </p>
      <h2>How pages are kept accurate</h2>
      <p>
        The calculation code has automated tests, every formula is written out on the page with a worked
        example you can check by hand, and facts that come from outside (rates, rules, standards) name their
        source. Each page shows the date it was last reviewed, and that date changes only when the page does.
        The assumptions and limits of a tool are stated on its page rather than hidden, and a result that
        cannot be right (an impossible date, for instance) shows a message instead of a number. The{" "}
        <a href="/terms/">terms of use</a> and <a href="/privacy/">privacy policy</a> describe the rest.
      </p>
      <h2>How the site is funded</h2>
      <p>
        The calculators are free. The site does not show ads at the moment; it may show Google AdSense ads to
        cover hosting and development time. Ads never change the result of a calculator.
      </p>
      <h2>Corrections</h2>
      <p>
        If a result is wrong or a guide contains a mistake, please use the contact page. Fixes are made in the
        open and the guides are updated.
      </p>
    </Article>
  );
}
