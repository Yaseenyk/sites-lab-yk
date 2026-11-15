import { Article, TermsBody, pageMetadata } from "@sites/shell";
import { site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Terms of Use: StreamerOS Math Calculators",
  description:
    "The terms for using StreamerOS Math Calculators: accuracy, acceptable use, ownership, ads and liability.",
  path: "/terms/",
});

export default function Page() {
  return (
    <Article title="Terms of Use">
      <TermsBody
        site={site}
        extra={
          <>
            <h2>Results and their limits</h2>
            <p>
              The calculators give arithmetic results from the numbers and dates you enter and the method
              described on each page. Check results that matter. Date counts skip weekends only and do not
              know public holidays; ages and periods follow the rule stated on the page, which may differ from
              the rule a law, contract or authority applies. Nothing here is legal, medical, financial or
              academic advice.
            </p>
          </>
        }
      />
    </Article>
  );
}
