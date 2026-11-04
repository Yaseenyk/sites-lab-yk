"use client";

import { useState } from "react";

type Status = { kind: "ok" | "err"; text: string } | null;

function sortKeys(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(sortKeys);
  if (v && typeof v === "object") {
    return Object.fromEntries(
      Object.entries(v as Record<string, unknown>)
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([k, val]) => [k, sortKeys(val)]),
    );
  }
  return v;
}

/** Turn a JSON.parse error into "line L, column C" when the engine reports a position. */
function describeError(input: string, err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  const lc = msg.match(/line (\d+) column (\d+)/);
  if (lc) return `${msg}`;
  const pos = msg.match(/position (\d+)/);
  if (pos) {
    const upTo = input.slice(0, Number(pos[1]));
    const line = upTo.split("\n").length;
    const col = upTo.length - upTo.lastIndexOf("\n");
    return `${msg} (line ${line}, column ${col})`;
  }
  return msg;
}

export default function JsonTool() {
  const [input, setInput] = useState('{"name":"Ada","skills":["math","code"],"active":true}');
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState("2");
  const [sorted, setSorted] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  function run(mode: "format" | "minify" | "validate") {
    if (!input.trim()) {
      setStatus({ kind: "err", text: "Paste some JSON first." });
      setOutput("");
      return;
    }
    try {
      let value: unknown = JSON.parse(input);
      if (sorted) value = sortKeys(value);
      if (mode === "validate") {
        setStatus({ kind: "ok", text: "Valid JSON." });
        return;
      }
      const space = indent === "tab" ? "\t" : Number(indent);
      setOutput(mode === "minify" ? JSON.stringify(value) : JSON.stringify(value, null, space));
      setStatus({ kind: "ok", text: mode === "minify" ? "Minified." : "Formatted. Valid JSON." });
    } catch (e) {
      setOutput("");
      setStatus({ kind: "err", text: describeError(input, e) });
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
          <label htmlFor="json-in">Input</label>
          <textarea id="json-in" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </div>
        <div className="field">
          <label htmlFor="json-out">Output</label>
          <textarea id="json-out" value={output} readOnly spellCheck={false} />
        </div>
      </div>
      <div className="row">
        <button onClick={() => run("format")}>Format</button>
        <button className="secondary" onClick={() => run("minify")}>Minify</button>
        <button className="secondary" onClick={() => run("validate")}>Validate</button>
        <button className="secondary" onClick={copy}>Copy output</button>
        <label>
          <span className="muted">Indent </span>
          <select value={indent} onChange={(e) => setIndent(e.target.value)}>
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
            <option value="tab">Tab</option>
          </select>
        </label>
        <label className="muted">
          <input type="checkbox" checked={sorted} onChange={(e) => setSorted(e.target.checked)} /> Sort keys
        </label>
      </div>
      <p className={`status ${status?.kind ?? ""}`} role="status" aria-live="polite">{status?.text}</p>
    </div>
  );
}
