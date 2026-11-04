"use client";

import { useEffect, useRef, useState } from "react";
import { encodeImage, loadImage } from "@/lib/canvas";
import {
  compressToTarget,
  fitWithin,
  formatBytes,
  outputName,
  resizeTo,
  savedPercent,
  scaleDims,
  type Dims,
} from "@/lib/image";

type Mode = "compress" | "convert" | "resize";
type Mime = "image/jpeg" | "image/png" | "image/webp";

interface Props {
  mode: Mode;
  /** compress: a file-size limit in KB to start with. */
  presetKB?: number;
  /** convert: the format to produce. */
  convertTo?: Mime;
  /** Text under the drop zone, e.g. the formats this page accepts. */
  hint?: string;
}

interface Output {
  blob: Blob;
  url: string;
  size: Dims;
  quality: number | null;
  /** compress with a target: false when the limit could not be met. */
  reached: boolean;
  name: string;
  original: number;
}

type Row =
  | { id: string; file: File; status: "working" }
  | { id: string; file: File; status: "error"; error: string }
  | { id: string; file: File; status: "done"; out: Output };

/** 1,000 bytes per KB: a file under this limit is also under it when a form counts 1 KB as 1,024 bytes. */
const BYTES_PER_KB = 1000;
const num = (v: string): number => (v.trim() === "" ? NaN : Number(v));
const positive = (v: string): number | null => (Number.isFinite(num(v)) && num(v) > 0 ? num(v) : null);
const MIME_LABEL: Record<Mime, string> = { "image/jpeg": "JPEG", "image/webp": "WebP", "image/png": "PNG" };

export default function ImageWorkbench({ mode, presetKB, convertTo = "image/jpeg", hint }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [dragging, setDragging] = useState(false);

  // compress
  const [format, setFormat] = useState<Mime>("image/jpeg");
  const [targetKB, setTargetKB] = useState(presetKB ? String(presetKB) : "");
  const [quality, setQuality] = useState(mode === "convert" ? 92 : 75);
  const [maxWidth, setMaxWidth] = useState("");
  // convert
  const [background, setBackground] = useState("#ffffff");
  // resize
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [keepRatio, setKeepRatio] = useState(true);
  const [percent, setPercent] = useState("");

  const runId = useRef(0);
  const urls = useRef<string[]>([]);

  useEffect(
    () => () => {
      urls.current.forEach((u) => URL.revokeObjectURL(u));
    },
    [],
  );

  useEffect(() => {
    if (files.length === 0) {
      setRows([]);
      return;
    }
    const id = ++runId.current;
    const timer = setTimeout(async () => {
      urls.current.forEach((u) => URL.revokeObjectURL(u));
      urls.current = [];
      const keyOf = (f: File, i: number) => `${i}-${f.name}-${f.size}-${f.lastModified}`;
      setRows(files.map((file, i) => ({ id: keyOf(file, i), file, status: "working" as const })));

      for (let i = 0; i < files.length; i++) {
        const file = files[i] as File;
        let row: Row;
        try {
          const out = await processOne(file);
          if (runId.current !== id) {
            URL.revokeObjectURL(out.url);
            return;
          }
          urls.current.push(out.url);
          row = { id: keyOf(file, i), file, status: "done", out };
        } catch (e) {
          row = {
            id: keyOf(file, i),
            file,
            status: "error",
            error: e instanceof Error ? e.message : "Could not process this image.",
          };
        }
        if (runId.current !== id) {
          return;
        }
        setRows((prev) => prev.map((r) => (r.id === row.id ? row : r)));
      }
    }, 250);
    return () => clearTimeout(timer);
    // processOne reads the option state below, so every option that affects the output is a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, format, targetKB, quality, maxWidth, background, width, height, keepRatio, percent]);

  async function processOne(file: File): Promise<Output> {
    const img = await loadImage(file);
    try {
      const srcSize: Dims = { width: img.width, height: img.height };
      let mime: Mime;
      let size: Dims = srcSize;
      let q: number | null = null;
      let blob: Blob;
      let reached = true;

      if (mode === "compress") {
        mime = format;
        const base = fitWithin(srcSize, positive(maxWidth) ?? undefined);
        const limit = positive(targetKB);
        if (limit) {
          const result = await compressToTarget(
            (scale, quality01) => encodeImage(img, scaleDims(base, scale), mime, quality01, "#ffffff"),
            limit * BYTES_PER_KB,
          );
          blob = result.blob;
          q = result.quality;
          size = scaleDims(base, result.scale);
          reached = result.reached;
        } else {
          q = quality / 100;
          size = base;
          blob = await encodeImage(img, size, mime, q, "#ffffff");
        }
      } else if (mode === "convert") {
        mime = convertTo;
        q = mime === "image/png" ? null : quality / 100;
        blob = await encodeImage(img, srcSize, mime, q ?? 1, background);
      } else {
        const pct = positive(percent);
        const target = pct
          ? scaleDims(srcSize, pct / 100)
          : resizeTo(srcSize, positive(width), positive(height), keepRatio);
        if (!target) {
          throw new Error("Enter a width, a height or a percentage.");
        }
        size = target;
        mime = file.type === "image/jpeg" || file.type === "image/webp" ? (file.type as Mime) : "image/png";
        q = mime === "image/png" ? null : 0.92;
        blob = await encodeImage(img, size, mime, q ?? 1, "#ffffff");
      }
      const suffix = mode === "compress" ? "compressed" : mode === "convert" ? "converted" : "resized";
      return {
        blob,
        url: URL.createObjectURL(blob),
        size,
        quality: q,
        reached,
        name: outputName(file.name, mime, suffix),
        original: file.size,
      };
    } finally {
      img.close();
    }
  }

  const addFiles = (list: FileList | File[]) => {
    const images = Array.from(list).filter(
      (f) => f.type.startsWith("image/") || /\.(avif|webp|jpe?g|png)$/i.test(f.name),
    );
    if (images.length > 0) {
      setFiles(images);
    }
  };

  const done = rows.filter((r): r is Extract<Row, { status: "done" }> => r.status === "done");
  const before = done.reduce((s, r) => s + r.out.original, 0);
  const after = done.reduce((s, r) => s + r.out.blob.size, 0);

  return (
    <div className="tool">
      <label
        htmlFor="img-files"
        className={`drop ${dragging ? "is-over" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
      >
        <span className="drop-title">Drop images here or click to choose</span>
        <span className="drop-hint">{hint ?? "JPG, PNG, WebP or AVIF. Files stay on your device."}</span>
        <input
          id="img-files"
          type="file"
          multiple
          accept="image/*,.avif,.webp"
          className="sr-only"
          onChange={(e) => {
            if (e.target.files) {
              addFiles(e.target.files);
            }
            e.target.value = "";
          }}
        />
      </label>

      <div className="fields mt-4">
        {mode === "compress" && (
          <>
            <div className="fld">
              <label htmlFor="o-target">Maximum file size (KB)</label>
              <input
                id="o-target"
                type="text"
                inputMode="numeric"
                value={targetKB}
                onChange={(e) => setTargetKB(e.target.value)}
                placeholder="Leave empty to set quality"
              />
            </div>
            {positive(targetKB) === null && (
              <div className="fld">
                <label htmlFor="o-quality">Quality: {quality}%</label>
                <input
                  id="o-quality"
                  type="range"
                  min={5}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                />
              </div>
            )}
            <div className="fld">
              <label htmlFor="o-format">Output format</label>
              <select id="o-format" value={format} onChange={(e) => setFormat(e.target.value as Mime)}>
                <option value="image/jpeg">JPEG (best for photos)</option>
                <option value="image/webp">WebP (smaller)</option>
              </select>
            </div>
            <div className="fld">
              <label htmlFor="o-maxw">Maximum width (px, optional)</label>
              <input
                id="o-maxw"
                type="text"
                inputMode="numeric"
                value={maxWidth}
                onChange={(e) => setMaxWidth(e.target.value)}
                placeholder="e.g. 1600"
              />
            </div>
          </>
        )}
        {mode === "convert" && (
          <>
            {convertTo !== "image/png" && (
              <div className="fld">
                <label htmlFor="o-quality">Quality: {quality}%</label>
                <input
                  id="o-quality"
                  type="range"
                  min={30}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                />
              </div>
            )}
            {convertTo === "image/jpeg" && (
              <div className="fld">
                <label htmlFor="o-bg">Background for transparent areas</label>
                <input
                  id="o-bg"
                  type="color"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="color-input"
                />
              </div>
            )}
          </>
        )}
        {mode === "resize" && (
          <>
            <div className="fld">
              <label htmlFor="o-w">Width (px)</label>
              <input
                id="o-w"
                type="text"
                inputMode="numeric"
                value={width}
                onChange={(e) => (setWidth(e.target.value), setPercent(""))}
                placeholder="e.g. 800"
              />
            </div>
            <div className="fld">
              <label htmlFor="o-h">Height (px)</label>
              <input
                id="o-h"
                type="text"
                inputMode="numeric"
                value={height}
                onChange={(e) => (setHeight(e.target.value), setPercent(""))}
                placeholder="e.g. 600"
              />
            </div>
            <div className="fld">
              <label htmlFor="o-pct">Or scale by (%)</label>
              <input
                id="o-pct"
                type="text"
                inputMode="decimal"
                value={percent}
                onChange={(e) => (setPercent(e.target.value), setWidth(""), setHeight(""))}
                placeholder="e.g. 50"
              />
            </div>
            <label className="opt">
              <input type="checkbox" checked={keepRatio} onChange={(e) => setKeepRatio(e.target.checked)} />{" "}
              Keep aspect ratio
            </label>
          </>
        )}
      </div>

      <div role="status" aria-live="polite">
        {rows.length === 0 && (
          <p className="status">Choose one or more images to start. Nothing is uploaded.</p>
        )}
        {rows.length > 0 && (
          <ul className="results">
            {rows.map((r) => (
              <li key={r.id} className="result-card">
                {r.status === "working" && (
                  <p className="meta">
                    Processing <strong>{r.file.name}</strong>...
                  </p>
                )}
                {r.status === "error" && (
                  <p className="text-sm text-rose-300">
                    <strong>{r.file.name}</strong>: {r.error}
                  </p>
                )}
                {r.status === "done" && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.out.url} alt={`Preview of ${r.out.name}`} className="thumb" />
                    <div className="result-body">
                      <p className="result-name">{r.out.name}</p>
                      <p className="result-sizes">
                        {formatBytes(r.out.original)} → <strong>{formatBytes(r.out.blob.size)}</strong>{" "}
                        <span
                          className={
                            savedPercent(r.out.original, r.out.blob.size) >= 0
                              ? "text-emerald-300"
                              : "text-amber-300"
                          }
                        >
                          ({savedPercent(r.out.original, r.out.blob.size) >= 0 ? "-" : "+"}
                          {Math.abs(savedPercent(r.out.original, r.out.blob.size)).toFixed(0)}%)
                        </span>
                      </p>
                      <p className="meta">
                        {r.out.size.width} x {r.out.size.height} px
                        {r.out.quality !== null && ` · quality ${Math.round(r.out.quality * 100)}%`}
                      </p>
                      {mode === "compress" && positive(targetKB) !== null && !r.out.reached && (
                        <p className="text-sm text-amber-300">
                          Could not reach {targetKB} KB. This is the smallest result; try a smaller maximum
                          width.
                        </p>
                      )}
                    </div>
                    <a className="btn" href={r.out.url} download={r.out.name}>
                      Download {MIME_LABEL[r.out.blob.type as Mime] ?? ""}
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
        {done.length > 1 && (
          <p className="meta mt-3">
            Total: {formatBytes(before)} → {formatBytes(after)}
          </p>
        )}
      </div>
    </div>
  );
}
