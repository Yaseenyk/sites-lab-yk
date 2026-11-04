/** Browser-only image decoding and encoding on a canvas. Nothing here touches the network. */
import type { Dims } from "./image";

const MAX_PIXELS = 120_000_000;

export interface Loaded extends Dims {
  source: CanvasImageSource;
  close: () => void;
}

/** Decode a file into something drawable. Throws a readable error when the browser cannot decode it. */
export async function loadImage(file: File): Promise<Loaded> {
  try {
    const bitmap = await createImageBitmap(file);
    if (bitmap.width * bitmap.height > MAX_PIXELS) {
      bitmap.close();
      throw new Error("This image is too large for the browser to process.");
    }
    return { source: bitmap, width: bitmap.width, height: bitmap.height, close: () => bitmap.close() };
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("This image is too large")) {
      throw e;
    }
    // Some browsers cannot decode every format through createImageBitmap; try an <img> element.
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error("This browser cannot read that image format."));
        el.src = url;
      });
      return { source: img, width: img.naturalWidth, height: img.naturalHeight, close: () => undefined };
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

/**
 * Draw `img` at the given size and encode it. JPEG has no transparency, so transparent pixels are painted over
 * `background` first (white by default). Rejects when the browser silently produced a different format.
 */
export async function encodeImage(
  img: Loaded,
  size: Dims,
  mime: string,
  quality: number,
  background = "#ffffff",
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas is not available in this browser.");
  }
  if (mime === "image/jpeg") {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, size.width, size.height);
  }
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img.source, 0, 0, size.width, size.height);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, mime, quality));
  canvas.width = 0;
  canvas.height = 0;
  if (!blob) {
    throw new Error("The browser could not encode this image.");
  }
  if (blob.type !== mime) {
    throw new Error(`This browser cannot save ${mime.replace("image/", "").toUpperCase()} files.`);
  }
  return blob;
}
