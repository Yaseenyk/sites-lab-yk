/**
 * GST (Goods and Services Tax, India) add/remove math. The four standard slabs — 5%, 12%, 18%,
 * 28% — are the ones GST Council publishes for most goods and services; a handful of categories
 * use other rates, which this calculator also accepts as a free-entry percentage.
 * Source: CBIC GST rate schedule, https://cbic-gst.gov.in/gst-goods-services-rates.html, checked
 * 11 Nov 2026.
 *
 * For a supply within one state, GST splits evenly into CGST and SGST; for an inter-state supply
 * it is charged once as IGST at the same total rate, so the "GST amount" figure is the same
 * either way and only the CGST/SGST split changes.
 */

export const GST_RATES = [5, 12, 18, 28] as const;

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
