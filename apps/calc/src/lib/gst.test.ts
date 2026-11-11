import { describe, expect, it } from "vitest";
import { addGst, removeGst } from "./gst";

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
