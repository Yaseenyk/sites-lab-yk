import { pageMetadata } from "@sites/shell";
import IncomeTaxIndiaCalculator from "@/components/IncomeTaxIndiaCalculator";
import ToolPage from "@/components/ToolPage";
import { CESS_RATE, NEW_STANDARD_DEDUCTION, OLD_STANDARD_DEDUCTION, TAX_YEAR_LABEL } from "@/lib/incomeTaxIndia";
import { money } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("income-tax-calculator-india");
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
        {money(NEW_STANDARD_DEDUCTION, 0, "INR")} standard deduction applies first for salaried income, then the
        Section 87A rebate cancels the tax entirely if taxable income is ₹12,00,000 or under. A {CESS_RATE * 100}
        % health and education cess applies on top of whatever tax remains.
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
        {money(OLD_STANDARD_DEDUCTION, 0, "INR")} for salaried income. Its Section 87A rebate cancels tax only up
        to ₹5,00,000 taxable income.
      </p>

      <h2>What this estimate leaves out</h2>
      <p>
        This is a slab-and-rebate estimate, not a filing. It does not include surcharge on incomes above ₹50
        lakh, the exact marginal relief just above either rebate threshold, special rates on capital gains or
        similar income, or old-regime deductions beyond Sections 80C and 80D such as HRA, home loan interest or
        NPS. Use it to plan, and a CA or the Income Tax Department&apos;s own calculator for a return you&apos;re
        filing.
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
