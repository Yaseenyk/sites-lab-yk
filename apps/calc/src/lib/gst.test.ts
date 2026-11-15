import { describe, expect, it } from "vitest";
import { GST_OLD_RATES, GST_RATES, addGst, removeGst } from "./gst";

describe("addGst", () => {
  it("adds 18% to a 1,000 base: 180 GST, 1,180 total, split evenly", () => {
    const r = addGst(1_000, 18);
    expect(r.gstAmount).toBeCloseTo(180, 6);
    expect(r.total).toBeCloseTo(1_180, 6);
    expect(r.cgst).toBeCloseTo(90, 6);
    expect(r.sgst).toBeCloseTo(90, 6);
  });

  it("is all zero for a non-positive base", () => {
    expect(addGst(0, 18).total).toBe(0);
    expect(addGst(-5, 18).total).toBe(0);
  });
});

describe("removeGst", () => {
  it("extracts 18% from a 1,180 inclusive total back to a 1,000 base", () => {
    const r = removeGst(1_180, 18);
    expect(r.base).toBeCloseTo(1_000, 6);
    expect(r.gstAmount).toBeCloseTo(180, 6);
  });

  it("round-trips with addGst for any rate", () => {
    const added = addGst(2_500, 12);
    const removed = removeGst(added.total, 12);
    expect(removed.base).toBeCloseTo(2_500, 6);
  });

  it("is all zero for a non-positive total", () => {
    expect(removeGst(0, 18).base).toBe(0);
  });
});

describe("GST rate lists", () => {
  it("lists the rates in force since 22 September 2025 and the older slabs separately", () => {
    expect([...GST_RATES]).toEqual([5, 18, 40]);
    expect([...GST_OLD_RATES]).toEqual([12, 28]);
  });

  it("adds and removes the 40% rate", () => {
    expect(addGst(1_000, 40).total).toBeCloseTo(1_400, 6);
    expect(removeGst(1_400, 40).base).toBeCloseTo(1_000, 6);
  });
});
