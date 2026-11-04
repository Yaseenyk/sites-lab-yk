"use client";

import { useMemo, useState } from "react";
import { byteSize, describeError, formatBytes, sortKeys } from "@/lib/json";

type Action = "format" | "minify" | "validate";
type Status = { kind: "ok" | "err" | "idle"; text: string };

const SAMPLE = `{"user":{"id":1042,"name":"Ada Lovelace","roles":["admin","editor"],"active":true},"tags":[],"balance":12.5,"note":null}`;

const LABEL: Record<Action, string> = { format: "Format", minify: "Minify", validate: "Validate" };

export default function JsonTool({ primary = "format" }: { primary?: Action }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState("2");
  const [sorted, setSorted] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Live validity of the input, so the verdict appears while you type or paste.
  const live: Status = useMemo(() => {
    if (!input.trim()) return { kind: "idle", text: "Paste JSON above, or load the sample." };
    try {
      JSON.parse(input);
      return { kind: "ok", text: "Valid JSON" };
    } catch (e) {
      return { kind: "err", text: describeError(input, e) };
    }
  }, [input]);

  function run(action: Action) {
    setNotice(null);
    if (action === "validate") return; // the live status already shows the result
    if (live.kind !== "ok") {
      setOutput("");
      return;
    }
    let value: unknown = JSON.parse(input);
    if (sorted) value = sortKeys(value);
    const space = indent === "tab" ? "\t" : Number(indent);
    setOutput(action === "minify" ? JSON.stringify(value) : JSON.stringify(value, null, space));
  }

  async function copy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setNotice("Copied to clipboard");
    } catch {
      setNotice("Copy failed: select the output and copy it manually");
    }
  }

  const order: Action[] = [
    primary,
    ...(["format", "minify", "validate"] as Action[]).filter((a) => a !== primary),
  ];
  const status: Status = notice ? { kind: "ok", text: notice } : live;

  return (
    <div className="tool">
      <div className="tool-grid">
        <div className="field">
          <label htmlFor="json-in">
            Input <span className="stat">{input ? formatBytes(byteSize(input)) : ""}</span>
          </label>
          <textarea
            id="json-in"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") run(primary);
            }}
            placeholder='{"paste": "your JSON here"}'
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
          />
        </div>
        <div className="field">
          <label htmlFor="json-out">
            Output <span className="stat">{output ? formatBytes(byteSize(output)) : ""}</span>
          </label>
          <textarea
            id="json-out"
            value={output}
            readOnly
            spellCheck={false}
            placeholder="Result appears here"
          />
        </div>
      </div>
      <div className="row">
        {order.map((a, i) => (
          <button key={a} className={i === 0 ? "" : "secondary"} onClick={() => run(a)}>
            {LABEL[a]}
          </button>
        ))}
        <button className="secondary" onClick={copy} disabled={!output}>
          Copy
        </button>
        <button className="secondary" onClick={() => setInput(SAMPLE)}>
          Sample
        </button>
        <button className="secondary" onClick={() => (setInput(""), setOutput(""), setNotice(null))}>
          Clear
        </button>
        <span className="sp" />
        <label className="opt">
          Indent
          <select value={indent} onChange={(e) => setIndent(e.target.value)}>
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
            <option value="tab">Tab</option>
          </select>
        </label>
        <label className="opt">
          <input type="checkbox" checked={sorted} onChange={(e) => setSorted(e.target.checked)} /> Sort keys
        </label>
      </div>
      <p className={`status ${status.kind === "idle" ? "" : status.kind}`} role="status" aria-live="polite">
        {status.kind === "ok" ? "✓ " : status.kind === "err" ? "✕ " : ""}
        {status.text}
      </p>
    </div>
  );
}
