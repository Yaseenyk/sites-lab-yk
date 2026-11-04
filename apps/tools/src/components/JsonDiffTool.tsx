"use client";

import { useMemo, useState } from "react";
import { describeError, diffJson, type DiffEntry } from "@/lib/json";

const SAMPLE_A = `{"name":"Ada","roles":["admin","editor"],"active":true,"limit":10}`;
const SAMPLE_B = `{"name":"Ada","roles":["admin","viewer"],"active":false,"plan":"pro"}`;

const show = (v: unknown) => (v === undefined ? "" : JSON.stringify(v));

type Result = { kind: "idle" } | { kind: "err"; text: string } | { kind: "ok"; diffs: DiffEntry[] };

export default function JsonDiffTool() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [ran, setRan] = useState(false);

  const result: Result = useMemo(() => {
    if (!ran) return { kind: "idle" };
    let pa: unknown, pb: unknown;
    try {
      pa = JSON.parse(a);
    } catch (e) {
      return { kind: "err", text: `Left side: ${describeError(a, e)}` };
    }
    try {
      pb = JSON.parse(b);
    } catch (e) {
      return { kind: "err", text: `Right side: ${describeError(b, e)}` };
    }
    return { kind: "ok", diffs: diffJson(pa, pb) };
  }, [a, b, ran]);

  return (
    <div className="tool">
      <div className="tool-grid">
        <div className="field">
          <label htmlFor="diff-a">Original (left)</label>
          <textarea
            id="diff-a"
            value={a}
            onChange={(e) => (setA(e.target.value), setRan(false))}
            spellCheck={false}
            placeholder="Paste the first JSON"
          />
        </div>
        <div className="field">
          <label htmlFor="diff-b">Changed (right)</label>
          <textarea
            id="diff-b"
            value={b}
            onChange={(e) => (setB(e.target.value), setRan(false))}
            spellCheck={false}
            placeholder="Paste the second JSON"
          />
        </div>
      </div>
      <div className="row">
        <button onClick={() => setRan(true)}>Compare</button>
        <button className="secondary" onClick={() => (setA(SAMPLE_A), setB(SAMPLE_B), setRan(false))}>
          Sample
        </button>
        <button className="secondary" onClick={() => (setA(b), setB(a), setRan(false))}>
          Swap sides
        </button>
        <button className="secondary" onClick={() => (setA(""), setB(""), setRan(false))}>
          Clear
        </button>
      </div>
      <div role="status" aria-live="polite">
        {result.kind === "idle" && <p className="status">Paste two JSON documents and press Compare.</p>}
        {result.kind === "err" && <p className="status err">✕ {result.text}</p>}
        {result.kind === "ok" && result.diffs.length === 0 && (
          <p className="status ok">✓ Identical. Key order is ignored.</p>
        )}
        {result.kind === "ok" && result.diffs.length > 0 && (
          <>
            <p className="status">
              {result.diffs.length >= 500
                ? "500+ differences (showing the first 500)"
                : `${result.diffs.length} difference${result.diffs.length === 1 ? "" : "s"}`}
            </p>
            <ul className="diff-list">
              {result.diffs.map((d, i) => (
                <li key={i} className={d.kind}>
                  <span className="tag">{d.kind}</span>
                  <span>
                    <strong>{d.path}</strong>
                    {d.kind === "changed" && (
                      <>
                        {" "}
                        {show(d.before)} → {show(d.after)}
                      </>
                    )}
                    {d.kind === "added" && <> {show(d.after)}</>}
                    {d.kind === "removed" && <> {show(d.before)}</>}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
