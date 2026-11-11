import { pageMetadata } from "@sites/shell";
import GstCalculator from "@/components/GstCalculator";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("gst-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I add GST to a price?",
    a: "GST amount = price x (rate / 100); total = price + GST amount. For ₹1,000 at 18%, GST is ₹180 and the total is ₹1,180.",
  },
  {
    q: "How do I remove GST from a price that already includes it?",
    a: "Base price = total / (1 + rate / 100); GST amount = total - base price. For a ₹1,180 total at 18%, the base price is ₹1,000 and the GST portion is ₹180.",
  },
  {
    q: "What are the standard GST rates in India?",
    a: "Most goods and services fall under 5%, 12%, 18% or 28%. A few categories use other rates, such as 0.25% or 3% for certain precious stones and metals; this calculator accepts any custom rate as well.",
  },
  {
    q: "What's the difference between CGST, SGST and IGST?",
    a: "For a sale within one state, GST splits evenly into CGST (central) and SGST (state), each half the total rate. For a sale between two states, the full rate is charged once as IGST instead. Either way, the total tax paid is the same.",
  },
  {
    q: "Is GST charged on the MRP?",
    a: "MRP (Maximum Retail Price) in India is meant to already include GST, so retailers shouldn't add it on top of the printed MRP. This calculator is for working out the GST on a wholesale, invoice or quoted price, not for adding tax on top of an MRP label.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="gst-calculator"
      lede="Add GST to a price, or pull it back out of a price that already includes tax, at 5%, 12%, 18%, 28% or any rate you enter, with the CGST and SGST split shown."
      widget={<GstCalculator />}
      faq={faq}
      related={["percentage-calculator", "income-tax-calculator-india", "compound-interest-calculator"]}
    >
      <h2>The two directions of a GST calculation</h2>
      <p>
        <strong>Adding GST</strong> (exclusive price known): GST amount = base x rate / 100; total = base + GST
        amount.
      </p>
      <p>
        <strong>Removing GST</strong> (inclusive price known): base = total / (1 + rate / 100); GST amount =
        total - base. This is the one people get wrong most often — dividing the inclusive total straight by
        the rate, instead of by (1 + rate/100), overstates the GST portion.
      </p>

      <h2>Worked example</h2>
      <p>
        A ₹1,000 base price at 18% GST: GST amount ₹180, total ₹1,180, split into ₹90 CGST and ₹90 SGST for an
        intra-state sale. Going the other way, a ₹1,180 inclusive price at 18% extracts back to the same
        ₹1,000 base and ₹180 GST.
      </p>
    </ToolPage>
  );
}
