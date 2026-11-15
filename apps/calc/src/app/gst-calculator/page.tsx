import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import GstCalculator from "@/components/GstCalculator";
import ToolPage from "@/components/ToolPage";
import { GST_OLD_RATES, GST_RATES, addGst, removeGst } from "@/lib/gst";
import { money } from "@/lib/pay";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("gst-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const inr2 = (n: number) => money(n, 2, "INR");
const inr0 = (n: number) => money(n, 0, "INR");
const ADD18 = addGst(1_000, 18);
const REMOVE18 = removeGst(1_180, 18);
/** The wrong way to take GST out of an inclusive price: take the rate straight off the total. */
const WRONG = 1_180 * 0.18;
const ALL_RATES = [...GST_RATES, ...GST_OLD_RATES].sort((a, b) => a - b);

const faq = [
  {
    q: "How do I add GST to a price?",
    a: `GST amount = price x (rate / 100); total = price + GST amount. For ${inr0(1_000)} at 18%, GST is ${inr0(ADD18.gstAmount)} and the total is ${inr0(ADD18.total)}.`,
  },
  {
    q: "How do I remove GST from a price that already includes it?",
    a: `Base price = total / (1 + rate / 100); GST amount = total - base price. For a ${inr0(1_180)} total at 18%, the base price is ${inr0(REMOVE18.base)} and the GST portion is ${inr0(REMOVE18.gstAmount)}.`,
  },
  {
    q: "What are the GST rates in India now?",
    a: "After the 56th GST Council meeting, most goods and services moved to a two-rate structure: a standard rate of 18% and a merit rate of 5%, with a special rate of 40% for a few goods and services. The changes took effect on 22 September 2025, except for cigarettes, chewing tobacco products and similar goods, which kept their existing rates until a later date to be notified.",
  },
  {
    q: "Are the 12% and 28% GST rates still used?",
    a: "Not for new supplies of most goods and services: the Council's changes replaced them with 5% and 18% (or 40% for some goods and services). They still appear on invoices for supplies made before 22 September 2025, so this calculator lists them as older rates. Which rate applies to a specific item is in the rate notification.",
  },
  {
    q: "Which GST rate applies if the invoice date and the supply date are on different sides of a rate change?",
    a: "The rate follows the time of supply rules in Section 14 of the CGST Act. The GST Council's FAQs explain how it works when goods or services were supplied before a change and invoiced after, and for advances. Read the FAQ linked in the sources, or ask a tax professional about your case.",
  },
  {
    q: "What is the difference between CGST, SGST and IGST?",
    a: "For a sale within one state, GST is shown as CGST (central) and SGST (state), each half of the total rate. For a sale between states, the full rate is charged once as IGST. Either way, the total tax is the same, which is why the GST amount in this calculator does not change.",
  },
  {
    q: "How do I calculate 18% GST on 1,000?",
    a: `${inr0(1_000)} x 18% = ${inr0(ADD18.gstAmount)} of GST, so the total is ${inr0(ADD18.total)}. Split evenly, that is ${inr0(ADD18.cgst)} CGST and ${inr0(ADD18.sgst)} SGST within one state.`,
  },
  {
    q: "Why can't I just take 18% off a GST-inclusive price?",
    a: `Because the 18% was added to the base price, not to the total. Taking 18% off ${inr0(1_180)} gives ${inr2(1_180 - WRONG)}, which is wrong. The correct base is ${inr2(REMOVE18.base)}.`,
  },
  {
    q: "Can I use a rate that is not in the list?",
    a: "Yes. Choose Other rate and type any percentage, for example a rate shown on an older invoice or a special rate for a particular item.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="gst-calculator"
      lede="Add GST to a price, or pull it back out of a price that already includes tax, at 5%, 18%, 40% or any rate you enter, with the CGST and SGST split shown."
      widget={<GstCalculator />}
      faq={faq}
      related={["percentage-calculator", "income-tax-calculator-india", "compound-interest-calculator"]}
    >
      <h2>How GST is added and removed</h2>
      <p>
        <strong>Adding GST</strong> (price without tax known): GST amount = base x rate / 100; total = base +
        GST amount.
      </p>
      <p>
        <strong>Removing GST</strong> (price with tax known): base = total / (1 + rate / 100); GST amount =
        total - base. This is the direction people get wrong most often: the rate was added to the base, so
        you divide the total by (1 + rate / 100). Taking the rate off the total overstates the GST.
      </p>

      <h2>Worked examples</h2>
      <ol>
        <li>
          <strong>Add 18% to {inr0(1_000)}.</strong> GST is {inr0(ADD18.gstAmount)}. Total is{" "}
          {inr0(ADD18.total)}. For a sale within one state, that is {inr0(ADD18.cgst)} CGST and{" "}
          {inr0(ADD18.sgst)} SGST.
        </li>
        <li>
          <strong>Remove 18% from {inr0(1_180)}.</strong> Base = {inr0(1_180)} / 1.18 = {inr0(REMOVE18.base)}.
          GST = {inr0(1_180)} - {inr0(REMOVE18.base)} = {inr0(REMOVE18.gstAmount)}.
        </li>
        <li>
          <strong>The common mistake.</strong> {inr0(1_180)} x 18% = {inr2(WRONG)}, which would leave a base
          of {inr2(1_180 - WRONG)}. That is not the original {inr0(1_000)}.
        </li>
      </ol>

      <h2>GST rates in India</h2>
      <p>
        The GST Council&apos;s 56th meeting (3 September 2025) recommended replacing the four-tier rate
        structure with two main rates: a standard rate of 18% and a merit rate of 5%, plus a special rate of
        40% for a select few goods and services. The changes on services, and on goods other than a few
        tobacco products, took effect on 22 September 2025. The 12% and 28% slabs that applied before are no
        longer used for new supplies of most items, but they still appear on invoices dated before the change.
        The rate for a particular item is set in the rate notification, so look the item up there; this page
        does not list items.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">GST rate</th>
            <th scope="col">GST on {inr0(1_000)}</th>
            <th scope="col">Total with GST</th>
            <th scope="col">CGST + SGST (within a state)</th>
            <th scope="col">GST inside {inr0(1_000)}</th>
          </tr>
        </thead>
        <tbody>
          {ALL_RATES.map((r) => {
            const a = addGst(1_000, r);
            const x = removeGst(1_000, r);
            const old = (GST_OLD_RATES as readonly number[]).includes(r);
            return (
              <tr key={r}>
                <th scope="row">
                  {r}%{old && " (before 22 Sep 2025)"}
                </th>
                <td>{inr2(a.gstAmount)}</td>
                <td>{inr2(a.total)}</td>
                <td>
                  {inr2(a.cgst)} + {inr2(a.sgst)}
                </td>
                <td>{inr2(x.gstAmount)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        The last column answers the other question: if {inr0(1_000)} is the price including GST, this is the
        tax inside it.
      </p>

      <h2>Which rate applies when a rate changes</h2>
      <p>
        When a rate changes, the rate follows the time of supply. The GST Council&apos;s FAQs on the 2025
        changes work through cases such as goods supplied before the change but invoiced after it, and
        advances received before it. They refer to Section 14 of the CGST Act. If you have such an invoice,
        read those FAQs or ask a tax professional; the calculator only does the arithmetic once you choose the
        rate.
      </p>

      <h2>CGST, SGST and IGST</h2>
      <p>
        For a supply within one state, the GST is shown as CGST (central) and SGST (state), each half of the
        rate: at 18% that is 9% and 9%. For a supply between states, the same total is charged once as IGST.
        The GST amount is the same either way, which is why this calculator shows one GST figure and the even
        split beside it.
      </p>

      <h2>What this calculator leaves out</h2>
      <p>
        It does the arithmetic on one price at one rate. It does not know which rate applies to your item, it
        does not include input tax credit, cess or reverse charge, and it does not rework invoices that mix
        rates. For a percentage of any amount, use the{" "}
        <Link href="/percentage-calculator">percentage calculator</Link>; for income tax, the{" "}
        <Link href="/income-tax-calculator-india">India income tax calculator</Link>.
      </p>

      <h2>Sources</h2>
      <ul>
        <li>
          <a
            href="https://gstcouncil.gov.in/sites/default/files/2025-09/press_release_press_information_bureau_0.pdf"
            rel="noopener noreferrer"
          >
            GST Council: recommendations of the 56th meeting (press release, 3 September 2025)
          </a>{" "}
          (the 5%, 18% and 40% structure and the 22 September 2025 date), checked 16 November 2026.
        </li>
        <li>
          <a href="https://gstcouncil.gov.in/sites/default/files/2025-09/faq_0.pdf" rel="noopener noreferrer">
            GST Council: FAQs on the decisions of the 56th meeting
          </a>{" "}
          (time of supply when rates change), checked 16 November 2026.
        </li>
      </ul>
    </ToolPage>
  );
}
