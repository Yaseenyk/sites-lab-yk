import { pageMetadata } from "@sites/shell";
import IncomeTaxIndiaCalculator from "@/components/IncomeTaxIndiaCalculator";
import ToolPage from "@/components/ToolPage";
import {
  CESS_RATE,
  NEW_STANDARD_DEDUCTION,
  OLD_STANDARD_DEDUCTION,
  SECTION_80C_CAP,
  SECTION_80D_CAP,
  TAX_YEAR_LABEL,
  incomeTax,
} from "@/lib/incomeTaxIndia";
import { money } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("income-tax-calculator-india");

// Worked examples, computed by the same function the calculator uses (asserted in incomeTaxIndia.test.ts).
const inr = (n: number) => money(n, 0, "INR");
const SALARY = 1_500_000;
const exNew = incomeTax({
  annualIncome: SALARY,
  regime: "new",
  isSalaried: true,
  age: "below60",
  section80C: 0,
  section80D: 0,
});
const exOld = incomeTax({
  annualIncome: SALARY,
  regime: "old",
  isSalaried: true,
  age: "below60",
  section80C: SECTION_80C_CAP,
  section80D: SECTION_80D_CAP,
});
const exEdge = incomeTax({
  annualIncome: 1_300_000,
  regime: "new",
  isSalaried: true,
  age: "below60",
  section80C: 0,
  section80D: 0,
});
// Old-regime taxable income whose slab tax equals the new regime's at a 15 lakh salary: 9,06,250.
const BREAK_EVEN_TAXABLE = 906_250;
const breakEvenDeductions = SALARY - BREAK_EVEN_TAXABLE - OLD_STANDARD_DEDUCTION;
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "Is income up to ₹12 lakh really tax-free in the new regime?",
    a: "Yes, for FY 2026-27. The slab rates on taxable income up to ₹12,00,000 add up to ₹60,000 of tax, and the Section 87A rebate cancels exactly that amount, so the net tax is zero. For a salaried taxpayer, the ₹75,000 standard deduction pushes the effective tax-free gross income up to ₹12,75,000.",
  },
  {
    q: "Did Budget 2026 change the income tax slabs?",
    a: "No. Union Budget 2026-27 (presented 1 February 2026) made no change to the income tax slabs, standard deduction or Section 87A rebate for either regime, so the FY 2025-26 figures carry over unchanged to FY 2026-27.",
  },
  {
    q: "Which regime should I choose?",
    a: "The new regime is the default and usually works out better if you claim few deductions. The old regime can work out better if your Section 80C, 80D and other deductions (including HRA and home loan interest, not modelled in this calculator) are large relative to your income. Run both and compare.",
  },
  {
    q: "What is the Section 87A rebate?",
    a: "A rebate that cancels tax up to a cap, provided taxable income is under a threshold: up to ₹60,000 for taxable income up to ₹12,00,000 in the new regime, or up to ₹12,500 for taxable income up to ₹5,00,000 in the old regime. Just above either threshold, marginal relief (not modelled here) limits how fast the tax reappears.",
  },
  {
    q: "Is the standard deduction the same in both regimes?",
    a: `No. It's ${money(NEW_STANDARD_DEDUCTION, 0, "INR")} in the new regime and ${money(OLD_STANDARD_DEDUCTION, 0, "INR")} in the old regime, and either way it only applies to salaried income, not business or other income.`,
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="income-tax-calculator-india"
      lede={`Enter your annual income to see your India income tax for ${TAX_YEAR_LABEL} under the new or old regime, with every step of the working shown.`}
      widget={<IncomeTaxIndiaCalculator />}
      faq={faq}
      related={["gst-calculator", "emi-calculator", "sip-calculator"]}
    >
      <h2>How the calculator works it out</h2>
      <p>
        The calculator follows the same order as the tax law, and the working table under the result shows
        each line, so you can check it against your own payslip or Form 16.
      </p>
      <ol>
        <li>
          <strong>Start from gross income</strong> for the year: salary before any deduction, or other income.
        </li>
        <li>
          <strong>Subtract the standard deduction</strong> if the income is salary:{" "}
          {inr(NEW_STANDARD_DEDUCTION)} in the new regime, {inr(OLD_STANDARD_DEDUCTION)} in the old one.
        </li>
        <li>
          <strong>Old regime only, subtract Section 80C and 80D</strong>, each capped: up to{" "}
          {inr(SECTION_80C_CAP)} for 80C investments and up to {inr(SECTION_80D_CAP)} for 80D health
          insurance. What is left is taxable income.
        </li>
        <li>
          <strong>Apply the slab rates</strong> in the tables below, each rate only to the part of taxable
          income that falls inside its band.
        </li>
        <li>
          <strong>Take off the Section 87A rebate</strong> if taxable income is at or under the threshold (₹12
          lakh new, ₹5 lakh old).
        </li>
        <li>
          <strong>Add {CESS_RATE * 100}% health and education cess</strong> on the tax that remains. That
          total is your tax for the year; gross income minus it is the take-home figure.
        </li>
      </ol>

      <h2>New regime slabs, {TAX_YEAR_LABEL}</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Taxable income</th>
            <th scope="col">Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Up to ₹4,00,000</td>
            <td>Nil</td>
          </tr>
          <tr>
            <td>₹4,00,000 to ₹8,00,000</td>
            <td>5%</td>
          </tr>
          <tr>
            <td>₹8,00,000 to ₹12,00,000</td>
            <td>10%</td>
          </tr>
          <tr>
            <td>₹12,00,000 to ₹16,00,000</td>
            <td>15%</td>
          </tr>
          <tr>
            <td>₹16,00,000 to ₹20,00,000</td>
            <td>20%</td>
          </tr>
          <tr>
            <td>₹20,00,000 to ₹24,00,000</td>
            <td>25%</td>
          </tr>
          <tr>
            <td>Above ₹24,00,000</td>
            <td>30%</td>
          </tr>
        </tbody>
      </table>
      <p>
        Rates apply only to the slice of income inside each range, not the whole amount. A{" "}
        {money(NEW_STANDARD_DEDUCTION, 0, "INR")} standard deduction applies first for salaried income, then
        the Section 87A rebate cancels the tax entirely if taxable income is ₹12,00,000 or under. A{" "}
        {CESS_RATE * 100}% health and education cess applies on top of whatever tax remains.
      </p>

      <h2>Old regime slabs</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Taxable income</th>
            <th scope="col">Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Up to ₹2,50,000 (₹3,00,000 if 60-79, ₹5,00,000 if 80+)</td>
            <td>Nil</td>
          </tr>
          <tr>
            <td>Next slab up to ₹5,00,000</td>
            <td>5%</td>
          </tr>
          <tr>
            <td>₹5,00,000 to ₹10,00,000</td>
            <td>20%</td>
          </tr>
          <tr>
            <td>Above ₹10,00,000</td>
            <td>30%</td>
          </tr>
        </tbody>
      </table>
      <p>
        The old regime allows Sections 80C and 80D (modelled here) plus others this calculator doesn&apos;t
        cover, such as HRA and home loan interest, and its standard deduction is{" "}
        {money(OLD_STANDARD_DEDUCTION, 0, "INR")} for salaried income. Its Section 87A rebate cancels tax only
        up to ₹5,00,000 taxable income.
      </p>

      <h2>Worked example: a ₹15 lakh salary in both regimes</h2>
      <p>
        A salaried employee under 60 earns {inr(SALARY)} a year. In the old regime they also invest the full{" "}
        {inr(SECTION_80C_CAP)} under Section 80C and pay {inr(SECTION_80D_CAP)} of health insurance premium.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Working</th>
            <th scope="col">New regime</th>
            <th scope="col">Old regime</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gross income</td>
            <td>{inr(exNew.grossIncome)}</td>
            <td>{inr(exOld.grossIncome)}</td>
          </tr>
          <tr>
            <td>Standard deduction</td>
            <td>-{inr(exNew.standardDeduction)}</td>
            <td>-{inr(exOld.standardDeduction)}</td>
          </tr>
          <tr>
            <td>Section 80C + 80D</td>
            <td>not allowed</td>
            <td>-{inr(exOld.chapterVIA)}</td>
          </tr>
          <tr>
            <td>Taxable income</td>
            <td>{inr(exNew.taxableIncome)}</td>
            <td>{inr(exOld.taxableIncome)}</td>
          </tr>
          <tr>
            <td>Tax on the slabs</td>
            <td>{inr(exNew.taxBeforeRebate)}</td>
            <td>{inr(exOld.taxBeforeRebate)}</td>
          </tr>
          <tr>
            <td>Section 87A rebate</td>
            <td>{inr(exNew.rebate)} (over ₹12 lakh)</td>
            <td>{inr(exOld.rebate)} (over ₹5 lakh)</td>
          </tr>
          <tr>
            <td>Cess at {CESS_RATE * 100}%</td>
            <td>{inr(exNew.cess)}</td>
            <td>{inr(exOld.cess)}</td>
          </tr>
          <tr>
            <td>
              <strong>Total tax</strong>
            </td>
            <td>
              <strong>{inr(exNew.totalTax)}</strong>
            </td>
            <td>
              <strong>{inr(exOld.totalTax)}</strong>
            </td>
          </tr>
          <tr>
            <td>Effective rate on gross income</td>
            <td>{exNew.effectiveRate.toFixed(1)}%</td>
            <td>{exOld.effectiveRate.toFixed(1)}%</td>
          </tr>
        </tbody>
      </table>
      <p>
        The new-regime slab tax is built up band by band: nothing on the first ₹4,00,000, ₹20,000 on the next
        ₹4,00,000 at 5%, ₹40,000 on the next ₹4,00,000 at 10%, and ₹33,750 on the last ₹2,25,000 at 15%, which
        makes {inr(exNew.taxBeforeRebate)}. In the old regime the same person pays ₹12,500 on ₹2,50,000 to
        ₹5,00,000 at 5%, ₹1,00,000 on ₹5,00,000 to ₹10,00,000 at 20%, and ₹82,500 on the last ₹2,75,000 at
        30%. Even with both deductions used in full, the new regime costs{" "}
        {inr(exOld.totalTax - exNew.totalTax)} less a year here.
      </p>

      <h2>How much in deductions the old regime needs</h2>
      <p>
        At a {inr(SALARY)} salary the old regime only catches up when its taxable income falls to{" "}
        {inr(BREAK_EVEN_TAXABLE)}, where its slab tax equals the new regime&apos;s{" "}
        {inr(exNew.taxBeforeRebate)}. That takes {inr(breakEvenDeductions)} of deductions on top of the{" "}
        {inr(OLD_STANDARD_DEDUCTION)} standard deduction. Sections 80C and 80D together allow at most{" "}
        {inr(SECTION_80C_CAP + SECTION_80D_CAP)}, so the rest would have to come from deductions this
        calculator does not model, mainly HRA and home loan interest. If you do not have those, the new regime
        is almost certainly cheaper at this income. If you do, add them up before you choose, because the
        answer turns on that total rather than on your salary alone.
      </p>

      <h2>Just above the ₹12 lakh line</h2>
      <p>
        A salary of {inr(exEdge.grossIncome)} in the new regime leaves {inr(exEdge.taxableIncome)} of taxable
        income after the standard deduction. That is above ₹12,00,000, so the 87A rebate no longer applies and
        the calculator shows the full slab tax of {inr(exEdge.taxBeforeRebate)} plus {inr(exEdge.cess)} cess,{" "}
        {inr(exEdge.totalTax)} in all. The law softens this cliff with marginal relief, which this calculator
        does not apply, so for taxable income a little over ₹12 lakh your actual tax will be lower than the
        figure shown. Treat the result in this band as an upper limit and check it with the Income Tax
        Department&apos;s calculator.
      </p>

      <h2>When to use it</h2>
      <ul>
        <li>
          <strong>Choosing a regime at the start of the year.</strong> Salaried employees tell their employer
          which regime to use for tax deducted from salary; run your income through both tabs first.
        </li>
        <li>
          <strong>Weighing a raise or a job offer.</strong> Enter the new gross figure to see how much of the
          increase you keep, and whether it crosses the ₹12 lakh rebate line.
        </li>
        <li>
          <strong>Deciding whether an 80C investment is worth it for tax.</strong> In the old regime, compare
          the result with 80C at zero and at {inr(SECTION_80C_CAP)}; in the new regime it makes no difference.
        </li>
      </ul>

      <h2>What this estimate leaves out</h2>
      <p>
        This is a slab-and-rebate estimate, not a filing. It does not include surcharge on incomes above ₹50
        lakh, the exact marginal relief just above either rebate threshold, special rates on capital gains or
        similar income, or old-regime deductions beyond Sections 80C and 80D such as HRA, home loan interest
        or NPS. Use it to plan, and a CA or the Income Tax Department&apos;s own calculator for a return
        you&apos;re filing.
      </p>
      <p>
        Two simplifications in the inputs: Section 80D is capped at {inr(SECTION_80D_CAP)}, the limit for a
        policy covering yourself and your family when you are under 60, so the higher limits for senior
        citizens and for a separate policy for your parents are not included. And the age choice only appears
        in the old regime, because the new regime&apos;s slabs are the same at every age.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2098406" rel="noopener noreferrer">
            PIB, Union Budget 2025-26: &ldquo;No Income Tax On Annual Income Upto Rs. 12 Lakh Under New Tax
            Regime&rdquo;
          </a>{" "}
          (new regime slabs, ₹75,000 standard deduction, ₹12 lakh / ₹12.75 lakh tax-free limit), 1 Feb 2025.
        </li>
        <li>
          <a href="https://cleartax.in/s/income-tax-slabs" rel="noopener noreferrer">
            ClearTax: Income Tax Slabs FY 2025-26 &amp; FY 2026-27
          </a>{" "}
          (confirms Budget 2026-27 made no change for FY 2026-27, and the old regime figures), checked 11 Nov
          2026.
        </li>
        <li>
          <a href="https://www.incometaxindia.gov.in/tax-rates" rel="noopener noreferrer">
            Income Tax Department: Tax Rates
          </a>{" "}
          (one rate table listed for AY 2025-26 and AY 2026-27), checked 11 Nov 2026.
        </li>
        <li>
          <a
            href="https://www.incometaxindia.gov.in/documents/81799/11848482/memo-2026.pdf"
            rel="noopener noreferrer"
          >
            Finance Bill 2026 memorandum
          </a>{" "}
          (4% health and education cess), 2 Feb 2026.
        </li>
      </ul>
    </ToolPage>
  );
}
