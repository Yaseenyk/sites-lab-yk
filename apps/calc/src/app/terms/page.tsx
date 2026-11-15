import { Article, TermsBody, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Terms of Use: StreamerOS Money Calculators",
  description:
    "The terms for using StreamerOS Money Calculators: accuracy, acceptable use, ownership, ads and liability.",
  path: "/terms/",
});

export default function Page() {
  return (
    <Article title="Terms of Use">
      <TermsBody
        site={site}
        extra={
          <>
            <h2>Estimates, not advice</h2>
            <p>
              The calculators give estimates from the figures and assumptions shown on each page. They are not
              financial, tax, legal or employment advice, and they do not replace a payslip, a loan offer, a
              tax return or a professional. Tax rules, GST rates, overtime law and exchange rates change, and
              your own situation may differ from the assumptions stated. Exchange rates come from free public
              feeds and are reference rates, not quotes. Confirm figures with your employer, bank, tax
              authority or adviser before making a decision.
            </p>
          </>
        }
      />
    </Article>
  );
}
