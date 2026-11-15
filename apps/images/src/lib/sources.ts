/** Primary sources cited on the tool pages. Each was fetched and read on CHECKED. */
export const CHECKED = "16 November 2026";

export type SourceId = "mdnTypes" | "mdnToBlob" | "mdnBitmap" | "htmlCanvas" | "webp";

export const SOURCES: Record<SourceId, { label: string; url: string; for: string }> = {
  mdnTypes: {
    label: "MDN: Image file type and format guide",
    url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types",
    for: "which formats are lossy or lossless, which support transparency and animation, and browser support",
  },
  mdnToBlob: {
    label: "MDN: HTMLCanvasElement.toBlob()",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob",
    for: "how a canvas is saved to a file: PNG as the default, quality for lossy formats, and 96 dpi",
  },
  mdnBitmap: {
    label: "MDN: createImageBitmap()",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/createImageBitmap",
    for: "how the browser reads an image and applies its EXIF orientation by default",
  },
  htmlCanvas: {
    label: "HTML Standard: the canvas element and ImageBitmap",
    url: "https://html.spec.whatwg.org/multipage/canvas.html",
    for: "an animated image drawn on a canvas becomes a single still",
  },
  webp: {
    label: "Google: WebP",
    url: "https://developers.google.com/speed/webp",
    for: "WebP is lossy or lossless, can hold transparency in both modes, and can be animated",
  },
};
