"use client";

import { useState } from "react";
import { byteSize, describeError, flatten, formatBytes, toCsv } from "@/lib/json";

const SAMPLE = `[{"id":1,"name":"Ada","address":{"city":"London","zip":"N1"},"tags":["a","b"]},{"id":2,"name":"Grace, Rear Adm.","address":{"city":"New York"},"tags":[]}]`;

type Status = { kind: "ok" | "err" | "idle"; text: string };

export default function JsonToCsvTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [flat, setFlat] = useState(true);
  const [status, setStatus] = useState<Status>({
    kind: "idle",
    text: "Paste a JSON array of objects, then press Convert.",
  });

  function convert() {
    if (!input.trim()) {
      setStatus({ kind: "err", text: "Paste some JSON first." });
      return;
    }
    let v: unknown;
    try {
      v = JSON.parse(input);
    } catch (e) {
      setOutput("");
      setStatus({ kind: "err", text: describeError(input, e) });
      return;
    }
    const list = Array.isArray(v) ? v : [v];
    const rows = list.map((r) =>
      r !== null && typeof r === "object" && !Array.isArray(r)
        ? flat
          ? flatten(r)
          : (r as Record<string, unknown>)
        : { value: r },
    );
    const sep = delimiter === "tab" ? "\t" : delimiter;
    setOutput(toCsv(rows, sep));
    setStatus({ kind: "ok", text: `Converted ${rows.length} row${rows.length === 1 ? "" : "s"}` });
  }

  async function copy() {
    if (!output) {
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      setStatus({ kind: "ok", text: "Copied to clipboard" });
    } catch {
      setStatus({ kind: "err", text: "Copy failed: select the output and copy it manually." });
    }
  }

  function download() {
    if (!output) {
      return;
    }
    const blob = new Blob(["﻿" + output], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="tool">
      <div className="tool-grid">
        <div className="field">
          <label htmlFor="csv-in">
            JSON input <span className="stat">{input ? formatBytes(byteSize(input)) : ""}</span>
          </label>
          <textarea
            id="csv-in"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            placeholder='[{"id":1,"name":"Ada"}]'
          />
        </div>
        <div className="field">
          <label htmlFor="csv-out">
            CSV output <span className="stat">{output ? formatBytes(byteSize(output)) : ""}</span>
          </label>
          <textarea
            id="csv-out"
            value={output}
            readOnly
            spellCheck={false}
            placeholder="CSV appears here"
            wrap="off"
          />
        </div>
      </div>
      <div className="row">
        <button onClick={convert}>Convert</button>
        <button className="secondary" onClick={copy} disabled={!output}>
          Copy
        </button>
        <button className="secondary" onClick={download} disabled={!output}>
          Download .csv
        </button>
        <button className="secondary" onClick={() => setInput(SAMPLE)}>
          Sample
        </button>
        <button
          className="secondary"
          onClick={() => (setInput(""), setOutput(""), setStatus({ kind: "idle", text: "Cleared." }))}
        >
          Clear
        </button>
        <span className="sp" />
        <label className="opt">
          Delimiter
          <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}>
            <option value=",">Comma</option>
            <option value=";">Semicolon</option>
            <option value="tab">Tab</option>
          </select>
        </label>
        <label className="opt">
          <input type="checkbox" checked={flat} onChange={(e) => setFlat(e.target.checked)} /> Flatten nested
          objects
        </label>
      </div>
      <p className={`status ${status.kind === "idle" ? "" : status.kind}`} role="status" aria-live="polite">
        {status.kind === "ok" ? "✓ " : status.kind === "err" ? "✕ " : ""}
        {status.text}
      </p>
    </div>
  );
}
