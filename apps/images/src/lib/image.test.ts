import { describe, expect, it } from "vitest";
import {
  compressToTarget,
  fitWithin,
  formatBytes,
  outputName,
  resizeTo,
  savedPercent,
  scaleDims,
  type Encoder,
} from "./image";

describe("formatBytes", () => {
  it("scales units", () => {
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(2048)).toBe("2.00 KB");
    expect(formatBytes(150 * 1024)).toBe("150.0 KB");
    expect(formatBytes(3 * 1024 * 1024)).toBe("3.00 MB");
    expect(formatBytes(NaN)).toBe("-");
  });
});

describe("dimensions", () => {
  const src = { width: 4000, height: 3000 };

  it("fits inside a box without enlarging", () => {
    expect(fitWithin(src, 1000)).toEqual({ width: 1000, height: 750 });
    expect(fitWithin(src, 8000)).toEqual(src);
    expect(fitWithin(src, 2000, 500)).toEqual({ width: 667, height: 500 });
  });

  it("scales by a factor and never reaches zero", () => {
    expect(scaleDims(src, 0.5)).toEqual({ width: 2000, height: 1500 });
    expect(scaleDims({ width: 2, height: 2 }, 0.01)).toEqual({ width: 1, height: 1 });
  });

  it("derives the missing side when the ratio is kept", () => {
    expect(resizeTo(src, 800, null, true)).toEqual({ width: 800, height: 600 });
    expect(resizeTo(src, null, 300, true)).toEqual({ width: 400, height: 300 });
  });

  it("fits inside the box when both sides are given and the ratio is kept", () => {
    expect(resizeTo(src, 800, 800, true)).toEqual({ width: 800, height: 600 });
  });

  it("allows stretching when the ratio is not kept", () => {
    expect(resizeTo(src, 800, 800, false)).toEqual({ width: 800, height: 800 });
    expect(resizeTo(src, 800, null, false)).toBeNull();
  });

  it("returns null with no usable size", () => {
    expect(resizeTo(src, null, null, true)).toBeNull();
    expect(resizeTo(src, 0, -5, true)).toBeNull();
  });
});

/** A fake encoder: size grows with area and quality, like a real JPEG. */
const fakeEncoder =
  (base: number): Encoder<{ size: number }> =>
  async (scale, quality) => ({ size: Math.round(base * scale * scale * (0.15 + quality)) });

describe("compressToTarget", () => {
  it("returns the highest quality when it already fits", async () => {
    const r = await compressToTarget(fakeEncoder(100_000), 500_000);
    expect(r.reached).toBe(true);
    expect(r.quality).toBe(0.95);
    expect(r.scale).toBe(1);
  });

  it("binary-searches quality to fit without shrinking", async () => {
    const r = await compressToTarget(fakeEncoder(100_000), 60_000);
    expect(r.reached).toBe(true);
    expect(r.scale).toBe(1);
    expect(r.blob.size).toBeLessThanOrEqual(60_000);
    expect(r.quality).toBeGreaterThan(0.4);
    expect(r.quality).toBeLessThan(0.95);
  });

  it("is close to the target, not far under it", async () => {
    const r = await compressToTarget(fakeEncoder(100_000), 60_000);
    expect(r.blob.size).toBeGreaterThan(58_000);
  });

  it("shrinks the image when the lowest quality is still too big", async () => {
    const r = await compressToTarget(fakeEncoder(100_000), 10_000);
    expect(r.reached).toBe(true);
    expect(r.scale).toBeLessThan(1);
    expect(r.blob.size).toBeLessThanOrEqual(10_000);
  });

  it("reports failure and returns the smallest attempt when nothing fits", async () => {
    const r = await compressToTarget(fakeEncoder(100_000), 50);
    expect(r.reached).toBe(false);
    expect(r.blob.size).toBeGreaterThan(50);
    expect(r.scale).toBeLessThan(0.2);
  });
});

describe("naming and savings", () => {
  it("builds output names", () => {
    expect(outputName("photo.PNG", "image/jpeg", "compressed")).toBe("photo-compressed.jpg");
    expect(outputName("a.b.c.webp", "image/png", "converted")).toBe("a.b.c-converted.png");
    expect(outputName("noext", "image/webp", "resized")).toBe("noext-resized.webp");
  });

  it("computes saved percent", () => {
    expect(savedPercent(200, 50)).toBe(75);
    expect(savedPercent(100, 120)).toBe(-20);
    expect(savedPercent(0, 10)).toBe(0);
  });
});
