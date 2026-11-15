/**
 * GST (Goods and Services Tax, India) add/remove math. After the 56th GST Council meeting
 * (3 September 2025) most goods and services moved to a two-rate structure: a standard rate of
 * 18% and a merit rate of 5%, with a special 40% rate for a few goods and services. Those changes
 * took effect on 22 September 2025 (cigarettes, chewing tobacco and a few similar goods later).
 * Source: GST Council press release (PIB), https://gstcouncil.gov.in/sites/default/files/2025-09/press_release_press_information_bureau_0.pdf,
 * checked 16 Nov 2026.
 *
 * The old 12% and 28% slabs no longer apply to new supplies, but invoices for supplies made before
 * 22 September 2025 still carry them, so the calculator keeps them as "older rate" options. Any
 * other rate can be typed in.
 *
 * For a supply within one state, GST splits evenly into CGST and SGST; for an inter-state supply
 * it is charged once as IGST at the same total rate, so the "GST amount" figure is the same
 * either way and only the CGST/SGST split changes.
 */

/** Rates in force for supplies from 22 September 2025. */
export const GST_RATES = [5, 18, 40] as const;
/** Slabs that applied before 22 September 2025; still found on older invoices. */
export const GST_OLD_RATES = [12, 28] as const;

export interface GstResult {
  base: number;
  gstAmount: number;
  total: number;
  cgst: number;
  sgst: number;
}

/** Add GST to a price that excludes tax. */
export function addGst(base: number, ratePercent: number): GstResult {
  if (base <= 0) {
    return { base: 0, gstAmount: 0, total: 0, cgst: 0, sgst: 0 };
  }
  const gstAmount = base * (ratePercent / 100);
  return { base, gstAmount, total: base + gstAmount, cgst: gstAmount / 2, sgst: gstAmount / 2 };
}

/** Extract GST from a price that already includes tax. */
export function removeGst(total: number, ratePercent: number): GstResult {
  if (total <= 0) {
    return { base: 0, gstAmount: 0, total: 0, cgst: 0, sgst: 0 };
  }
  const base = total / (1 + ratePercent / 100);
  const gstAmount = total - base;
  return { base, gstAmount, total, cgst: gstAmount / 2, sgst: gstAmount / 2 };
}
