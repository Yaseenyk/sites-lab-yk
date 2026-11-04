import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ImageWorkbench from "./ImageWorkbench";

// The canvas is replaced by a model whose output size grows with area and quality, like a real JPEG, so the
// target-size search, the naming and the UI can be tested without a browser.
vi.mock("@/lib/canvas", () => ({
  loadImage: vi.fn(async (file: File) => {
    if (file.name.startsWith("broken")) {
      throw new Error("This browser cannot read that image format.");
    }
    return { source: {}, width: 2000, height: 1500, close() {} };
  }),
  encodeImage: vi.fn(
    async (_img: unknown, size: { width: number; height: number }, mime: string, quality: number) =>
      new Blob([new Uint8Array(Math.round(size.width * size.height * (0.002 + quality * 0.02)))], {
        type: mime,
      }),
  ),
}));

const img = (name: string, type = "image/png", bytes = 2_750_000) =>
  new File([new Uint8Array(bytes)], name, { type });
const choose = (...files: File[]) =>
  fireEvent.change(document.getElementById("img-files") as HTMLInputElement, { target: { files } });
const text = () => (document.body.textContent ?? "").replace(/\s+/g, " ");
const set = (id: string, value: string) =>
  fireEvent.change(document.getElementById(id) as HTMLElement, { target: { value } });

/** The size shown after the arrow, in bytes. */
function resultBytes(): number {
  const m = text().match(/→\s*([\d.]+)\s*(B|KB|MB)/);
  if (!m) {
    throw new Error("no result size in: " + text().slice(0, 300));
  }
  return Number(m[1]) * { B: 1, KB: 1024, MB: 1024 * 1024 }[m[2] as "B" | "KB" | "MB"];
}

beforeEach(() => {
  URL.createObjectURL = vi.fn(() => "blob:test");
  URL.revokeObjectURL = vi.fn();
});

describe("ImageWorkbench: compress", () => {
  it("starts empty and says nothing is uploaded", () => {
    render(<ImageWorkbench mode="compress" />);
    expect(text()).toMatch(/Choose one or more images/);
    expect(text()).toMatch(/Nothing is uploaded/);
  });

  it("compresses to a 50 KB limit, whatever the original", async () => {
    render(<ImageWorkbench mode="compress" presetKB={50} />);
    choose(img("photo.png"));
    expect(await screen.findByText("photo-compressed.jpg", {}, { timeout: 4000 })).toBeTruthy();
    expect(resultBytes()).toBeLessThanOrEqual(50 * 1024);
    expect(resultBytes()).toBeGreaterThan(30 * 1024);
    expect(text()).toMatch(/2\.62 MB/);
  });

  it("counts a KB as 1,000 bytes, so the file also fits a form that counts 1,024", async () => {
    render(<ImageWorkbench mode="compress" presetKB={50} />);
    choose(img("photo.png"));
    await screen.findByText("photo-compressed.jpg", {}, { timeout: 4000 });
    expect(resultBytes()).toBeLessThanOrEqual(50_000 * 1.0245);
  });

  it("shrinks the dimensions when quality alone cannot reach a very small limit", async () => {
    render(<ImageWorkbench mode="compress" presetKB={20} />);
    choose(img("photo.png"));
    await screen.findByText("photo-compressed.jpg", {}, { timeout: 4000 });
    expect(resultBytes()).toBeLessThanOrEqual(20 * 1024);
    expect(text()).not.toMatch(/2000 x 1500 px/);
  });

  it("warns when the limit cannot be reached", async () => {
    render(<ImageWorkbench mode="compress" />);
    set("o-target", "0.1");
    choose(img("photo.png"));
    expect(await screen.findByText(/Could not reach 0\.1 KB/, {}, { timeout: 4000 })).toBeTruthy();
  });

  it("without a limit it uses the quality slider, and offers a download link", async () => {
    render(<ImageWorkbench mode="compress" />);
    choose(img("photo.png"));
    await screen.findByText("photo-compressed.jpg", {}, { timeout: 4000 });
    expect(text()).toMatch(/quality 75%/);
    const link = screen.getByRole("link", { name: /Download JPEG/ });
    expect(link.getAttribute("download")).toBe("photo-compressed.jpg");
    expect(link.getAttribute("href")).toBe("blob:test");
  });

  it("limits the maximum width", async () => {
    render(<ImageWorkbench mode="compress" />);
    set("o-maxw", "1000");
    choose(img("photo.png"));
    await screen.findByText("photo-compressed.jpg", {}, { timeout: 4000 });
    expect(text()).toMatch(/1000 x 750 px/);
  });

  it("handles several files and totals them", async () => {
    render(<ImageWorkbench mode="compress" presetKB={50} />);
    choose(img("a.png"), img("b.jpg", "image/jpeg"));
    await screen.findByText("a-compressed.jpg", {}, { timeout: 4000 });
    await screen.findByText("b-compressed.jpg", {}, { timeout: 4000 });
    expect(text()).toMatch(/Total:/);
  });

  it("reports a file the browser cannot read and keeps going", async () => {
    render(<ImageWorkbench mode="compress" presetKB={50} />);
    choose(img("broken.avif", "image/avif"), img("ok.png"));
    expect(await screen.findByText(/cannot read that image format/, {}, { timeout: 4000 })).toBeTruthy();
    expect(await screen.findByText("ok-compressed.jpg", {}, { timeout: 4000 })).toBeTruthy();
  });

  it("ignores files that are not images", async () => {
    render(<ImageWorkbench mode="compress" />);
    choose(new File(["hello"], "notes.txt", { type: "text/plain" }));
    await new Promise((r) => setTimeout(r, 400));
    expect(text()).toMatch(/Choose one or more images/);
  });
});

describe("ImageWorkbench: convert", () => {
  it("converts to JPEG with the right name and format", async () => {
    render(<ImageWorkbench mode="convert" convertTo="image/jpeg" />);
    choose(img("alpha.png"));
    expect(await screen.findByText("alpha-converted.jpg", {}, { timeout: 4000 })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Download JPEG/ })).toBeTruthy();
    expect(screen.getByLabelText(/Background for transparent areas/)).toBeTruthy();
  });

  it("converts to PNG, with no quality slider or background option", async () => {
    render(<ImageWorkbench mode="convert" convertTo="image/png" />);
    expect(screen.queryByLabelText(/Quality/)).toBeNull();
    expect(screen.queryByLabelText(/Background/)).toBeNull();
    choose(img("photo.jpg", "image/jpeg"));
    expect(await screen.findByText("photo-converted.png", {}, { timeout: 4000 })).toBeTruthy();
  });
});

describe("ImageWorkbench: resize", () => {
  it("resizes by width and keeps the aspect ratio", async () => {
    render(<ImageWorkbench mode="resize" />);
    set("o-w", "800");
    choose(img("photo.png"));
    expect(await screen.findByText("photo-resized.png", {}, { timeout: 4000 })).toBeTruthy();
    expect(text()).toMatch(/800 x 600 px/);
  });

  it("resizes by height, by percentage, and without keeping the ratio", async () => {
    render(<ImageWorkbench mode="resize" />);
    set("o-h", "300");
    choose(img("photo.png"));
    await screen.findByText("photo-resized.png", {}, { timeout: 4000 });
    expect(text()).toMatch(/400 x 300 px/);

    set("o-pct", "50");
    await waitFor(() => expect(text()).toMatch(/1000 x 750 px/), { timeout: 4000 });

    set("o-w", "500");
    set("o-h", "500");
    fireEvent.click(screen.getByRole("checkbox"));
    await waitFor(() => expect(text()).toMatch(/500 x 500 px/), { timeout: 4000 });
  });

  it("asks for a size when none is given", async () => {
    render(<ImageWorkbench mode="resize" />);
    choose(img("photo.png"));
    expect(
      await screen.findByText(/Enter a width, a height or a percentage/, {}, { timeout: 4000 }),
    ).toBeTruthy();
  });

  it("keeps a JPEG as a JPEG", async () => {
    render(<ImageWorkbench mode="resize" />);
    set("o-w", "800");
    choose(img("photo.jpg", "image/jpeg"));
    expect(await screen.findByText("photo-resized.jpg", {}, { timeout: 4000 })).toBeTruthy();
  });
});
