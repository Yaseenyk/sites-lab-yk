/** Pure helpers for sizing and compressing images. The browser-only canvas work lives in canvas.ts. */

export function formatBytes(n: number): string {
  if (!Number.isFinite(n) || n < 0) {
    return "-";
  }
  if (n < 1024) {
    return `${Math.round(n)} B`;
  }
  if (n < 1024 * 1024) {
    return `${(n / 1024).toFixed(n < 10 * 1024 ? 2 : 1)} KB`;
  }
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

export interface Dims {
  width: number;
  height: number;
}

/** Scale to fit inside a box, keeping the aspect ratio. Never enlarges. */
export function fitWithin(src: Dims, maxWidth?: number, maxHeight?: number): Dims {
  let scale = 1;
  if (maxWidth && maxWidth > 0) {
    scale = Math.min(scale, maxWidth / src.width);
  }
  if (maxHeight && maxHeight > 0) {
    scale = Math.min(scale, maxHeight / src.height);
  }
  return scaleDims(src, scale);
}

export function scaleDims(src: Dims, factor: number): Dims {
  return {
    width: Math.max(1, Math.round(src.width * factor)),
    height: Math.max(1, Math.round(src.height * factor)),
  };
}

/**
 * Resize to an exact width and/or height. With `keepRatio`, the missing side is derived from the one given; if both
 * are given the image is fitted inside the box. Without it, both sides must be given and the ratio can change.
 */
export function resizeTo(
  src: Dims,
  width: number | null,
  height: number | null,
  keepRatio: boolean,
): Dims | null {
  const w = width && width > 0 ? width : null;
  const h = height && height > 0 ? height : null;
  if (!w && !h) {
    return null;
  }
  if (!keepRatio) {
    return w && h ? { width: Math.round(w), height: Math.round(h) } : null;
  }
  if (w && h) {
    const scale = Math.min(w / src.width, h / src.height);
    return scaleDims(src, scale);
  }
  const scale = w ? w / src.width : (h as number) / src.height;
  return scaleDims(src, scale);
}

export interface Attempt<T extends { size: number }> {
  blob: T;
  quality: number;
  scale: number;
}

export interface TargetResult<T extends { size: number }> extends Attempt<T> {
  /** False when even the smallest attempt stayed above the target. */
  reached: boolean;
}

export type Encoder<T extends { size: number }> = (scale: number, quality: number) => Promise<T>;

/**
 * Find the best-looking encoding that fits `targetBytes`.
 * At each scale it looks for the highest quality (binary search) that fits; if even the lowest quality is too big, it
 * shrinks the image and tries again. Returns the smallest attempt, flagged `reached: false`, when nothing fits.
 */
export async function compressToTarget<T extends { size: number }>(
  encode: Encoder<T>,
  targetBytes: number,
  opts: {
    minQuality?: number;
    maxQuality?: number;
    steps?: number;
    minScale?: number;
    scaleStep?: number;
  } = {},
): Promise<TargetResult<T>> {
  const { minQuality = 0.05, maxQuality = 0.95, steps = 7, minScale = 0.1, scaleStep = 0.85 } = opts;
  let smallest: Attempt<T> | null = null;

  for (let scale = 1; scale >= minScale; scale *= scaleStep) {
    const best = await encode(scale, maxQuality);
    if (best.size <= targetBytes) {
      return { blob: best, quality: maxQuality, scale, reached: true };
    }
    const floor = await encode(scale, minQuality);
    if (!smallest || floor.size < smallest.blob.size) {
      smallest = { blob: floor, quality: minQuality, scale };
    }
    if (floor.size > targetBytes) {
      continue;
    }
    let lo = minQuality;
    let hi = maxQuality;
    let fit: Attempt<T> = { blob: floor, quality: minQuality, scale };
    for (let i = 0; i < steps; i++) {
      const mid = (lo + hi) / 2;
      const trial = await encode(scale, mid);
      if (trial.size <= targetBytes) {
        fit = { blob: trial, quality: mid, scale };
        lo = mid;
      } else {
        hi = mid;
      }
    }
    return { ...fit, reached: true };
  }
  return { ...(smallest as Attempt<T>), reached: false };
}

export const MIME_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/** `photo.png` + jpeg + "compressed" -> `photo-compressed.jpg`. */
export function outputName(original: string, mime: string, suffix: string): string {
  const base = original.replace(/\.[^./\\]+$/, "") || "image";
  return `${base}-${suffix}.${MIME_EXT[mime] ?? "img"}`;
}

/** Percentage saved from `before` to `after` bytes; negative when the file grew. */
export function savedPercent(before: number, after: number): number {
  return before > 0 ? ((before - after) / before) * 100 : 0;
}
