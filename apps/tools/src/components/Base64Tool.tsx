"use client";

import { useState } from "react";
import { byteSize, formatBytes } from "@/lib/json";

type Mode = "encode" | "decode";
type Status = { kind: "ok" | "err" | "idle"; text: string };

function encodeUtf8(text: string, urlSafe: boolean): string {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  const b64 = btoa(bin);
  return urlSafe ? b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : b64;
}

function decodeUtf8(b64: string): string {
  let s = b64.trim().replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export default function Base64Tool({ primary = "encode" }: { primary?: Mode }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);
  const [status, setStatus] = useState<Status>({
    kind: "idle",
    text: "Type or paste text, then choose Encode or Decode.",
  });

  function run(mode: Mode) {
    if (!input.trim()) {
      setOutput("");
      setStatus({ kind: "err", text: "Enter some text first." });
      return;
    }
    try {
      setOutput(mode === "encode" ? encodeUtf8(input, urlSafe) : decodeUtf8(input));
      setStatus({ kind: "ok", text: mode === "encode" ? "Encoded to Base64" : "Decoded from Base64" });
    } catch {
      setOutput("");
      setStatus({
        kind: "err",
        text:
          mode === "decode"
            ? "Not valid Base64, or it decodes to bytes that are not UTF-8 text (it may be an image or other binary data)."
            : "Could not encode this input.",
      });
    }
  }

  async function copy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setStatus({ kind: "ok", text: "Copied to clipboard" });
    } catch {
      setStatus({ kind: "err", text: "Copy failed: select the output and copy it manually." });
    }
  }

  const other: Mode = primary === "encode" ? "decode" : "encode";
  const label = (m: Mode) => (m === "encode" ? "Encode" : "Decode");

  return (
    <div className="tool">
      <div className="tool-grid">
        <div className="field">
          <label htmlFor="b64-in">
            Input <span className="stat">{input ? formatBytes(byteSize(input)) : ""}</span>
          </label>
          <textarea
            id="b64-in"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") run(primary);
            }}
            placeholder={primary === "encode" ? "Text to encode" : "Base64 to decode"}
            spellCheck={false}
          />
        </div>
        <div className="field">
          <label htmlFor="b64-out">
            Output <span className="stat">{output ? formatBytes(byteSize(output)) : ""}</span>
          </label>
          <textarea
            id="b64-out"
            value={output}
            readOnly
            spellCheck={false}
            placeholder="Result appears here"
          />
        </div>
      </div>
      <div className="row">
        <button onClick={() => run(primary)}>{label(primary)}</button>
        <button className="secondary" onClick={() => run(other)}>
          {label(other)}
        </button>
        <button className="secondary" onClick={copy} disabled={!output}>
          Copy
        </button>
        <button
          className="secondary"
          onClick={() => {
            setInput(output);
            setOutput("");
          }}
          disabled={!output}
        >
          Use output as input
        </button>
        <button
          className="secondary"
          onClick={() => (setInput(""), setOutput(""), setStatus({ kind: "idle", text: "Cleared." }))}
        >
          Clear
        </button>
        <span className="sp" />
        <label className="opt">
          <input type="checkbox" checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} /> URL-safe
          (- and _, no padding)
        </label>
      </div>
      <p className={`status ${status.kind === "idle" ? "" : status.kind}`} role="status" aria-live="polite">
        {status.kind === "ok" ? "✓ " : status.kind === "err" ? "✕ " : ""}
        {status.text}
      </p>
    </div>
  );
}
