"use client";

import { useState } from "react";

type Status = { kind: "ok" | "err"; text: string } | null;

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

export default function Base64Tool() {
  const [input, setInput] = useState("Hello, world");
  const [output, setOutput] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  function run(mode: "encode" | "decode") {
    try {
      setOutput(mode === "encode" ? encodeUtf8(input, urlSafe) : decodeUtf8(input));
      setStatus({ kind: "ok", text: mode === "encode" ? "Encoded." : "Decoded." });
    } catch {
      setOutput("");
      setStatus({
        kind: "err",
        text:
          mode === "decode"
            ? "Not valid Base64, or the bytes are not valid UTF-8 text (it may be binary data)."
            : "Could not encode this input.",
      });
    }
  }

  async function copy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setStatus({ kind: "ok", text: "Copied to clipboard." });
    } catch {
      setStatus({ kind: "err", text: "Copy failed. Select the output and copy it manually." });
    }
  }

  return (
    <div className="tool">
      <div className="tool-grid">
        <div className="field">
          <label htmlFor="b64-in">Input</label>
          <textarea id="b64-in" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </div>
        <div className="field">
          <label htmlFor="b64-out">Output</label>
          <textarea id="b64-out" value={output} readOnly spellCheck={false} />
        </div>
      </div>
      <div className="row">
        <button onClick={() => run("encode")}>Encode</button>
        <button className="secondary" onClick={() => run("decode")}>Decode</button>
        <button className="secondary" onClick={copy}>Copy output</button>
        <label className="muted">
          <input type="checkbox" checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} /> URL-safe (- and _, no padding)
        </label>
      </div>
      <p className={`status ${status?.kind ?? ""}`} role="status" aria-live="polite">{status?.text}</p>
    </div>
  );
}
