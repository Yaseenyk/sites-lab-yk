"use client";

import { useEffect, useMemo, useState } from "react";
import { byteSize, describeError, formatBytes } from "@/lib/json";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const SAMPLE = `{"user":{"id":1042,"name":"Ada Lovelace","roles":["admin","editor"],"active":true,"address":{"city":"London","zip":null}},"orders":[{"id":1,"total":12.5},{"id":2,"total":40}]}`;
const PAGE = 100;

const isContainer = (v: Json): v is Json[] | { [key: string]: Json } => v !== null && typeof v === "object";

const childPath = (parent: string, key: string | number): string =>
  typeof key === "number"
    ? `${parent}[${key}]`
    : /^[A-Za-z_$][\w$]*$/.test(key)
      ? `${parent}.${key}`
      : `${parent}[${JSON.stringify(key)}]`;

function countNodes(v: Json): number {
  if (!isContainer(v)) {
    return 1;
  }
  return 1 + (Array.isArray(v) ? v : Object.values(v)).reduce((n: number, c) => n + countNodes(c), 0);
}

function Value({ value }: { value: Json }) {
  if (value === null) {
    return <span className="t-null">null</span>;
  }
  if (typeof value === "string") {
    return <span className="t-str">{JSON.stringify(value)}</span>;
  }
  if (typeof value === "number") {
    return <span className="t-num">{String(value)}</span>;
  }
  return <span className="t-bool">{String(value)}</span>;
}

function Node({
  name,
  value,
  path,
  depth,
  version,
  openAll,
  onCopy,
}: {
  name: string | number | null;
  value: Json;
  path: string;
  depth: number;
  version: number;
  openAll: boolean | null;
  onCopy: (path: string) => void;
}) {
  const [open, setOpen] = useState(openAll ?? depth < 2);
  const [shown, setShown] = useState(PAGE);

  // "Expand all" and "Collapse all" bump `version`; otherwise the node keeps whatever the visitor chose.
  useEffect(() => {
    if (openAll !== null) {
      setOpen(openAll);
    }
  }, [version, openAll]);

  const label =
    name === null ? null : (
      <button type="button" className="t-key" title={`Copy path ${path}`} onClick={() => onCopy(path)}>
        {typeof name === "number" ? name : JSON.stringify(name)}
      </button>
    );

  if (!isContainer(value)) {
    return (
      <li className="t-row">
        {label}
        {label && <span className="t-colon">: </span>}
        <Value value={value} />
      </li>
    );
  }

  const entries: [string | number, Json][] = Array.isArray(value)
    ? value.map((v, i) => [i, v])
    : Object.entries(value);
  const brackets = Array.isArray(value) ? ["[", "]"] : ["{", "}"];

  return (
    <li className="t-row">
      <button
        type="button"
        className="t-toggle"
        aria-expanded={open}
        aria-label={`${open ? "Collapse" : "Expand"} ${path}`}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "▾" : "▸"}
      </button>
      {label}
      {label && <span className="t-colon">: </span>}
      <span className="t-punct">{brackets[0]}</span>
      {!open && (
        <span className="t-meta">
          {" "}
          {entries.length} {entries.length === 1 ? "item" : "items"}{" "}
        </span>
      )}
      {!open && <span className="t-punct">{brackets[1]}</span>}
      {open && (
        <>
          <ul className="t-children">
            {entries.slice(0, shown).map(([k, v]) => (
              <Node
                key={String(k)}
                name={k}
                value={v}
                path={childPath(path, k)}
                depth={depth + 1}
                version={version}
                openAll={openAll}
                onCopy={onCopy}
              />
            ))}
            {entries.length > shown && (
              <li className="t-row">
                <button type="button" className="t-more" onClick={() => setShown((n) => n + PAGE)}>
                  Show {Math.min(PAGE, entries.length - shown)} more of {entries.length - shown}
                </button>
              </li>
            )}
          </ul>
          <span className="t-punct">{brackets[1]}</span>
        </>
      )}
    </li>
  );
}

/** Paste JSON and browse it as a collapsible tree. Click a key to copy its path. */
export default function JsonTreeTool() {
  const [input, setInput] = useState("");
  const [version, setVersion] = useState(0);
  const [openAll, setOpenAll] = useState<boolean | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const parsed = useMemo(() => {
    if (!input.trim()) {
      return { kind: "idle" as const };
    }
    try {
      const value = JSON.parse(input) as Json;
      return { kind: "ok" as const, value, nodes: countNodes(value) };
    } catch (e) {
      return { kind: "err" as const, text: describeError(input, e) };
    }
  }, [input]);

  async function copyPath(path: string) {
    try {
      await navigator.clipboard.writeText(path);
      setNotice(`Copied ${path}`);
    } catch {
      setNotice("Copy failed: select the path manually");
    }
  }

  const setAll = (open: boolean) => {
    setOpenAll(open);
    setVersion((v) => v + 1);
  };

  return (
    <div className="tool">
      <div className="tool-grid">
        <div className="field">
          <label htmlFor="tree-in">
            JSON <span className="stat">{input ? formatBytes(byteSize(input)) : ""}</span>
          </label>
          <textarea
            id="tree-in"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setOpenAll(null);
              setNotice(null);
            }}
            placeholder='{"paste": "your JSON here"}'
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
          />
        </div>
        <div className="field">
          <span className="lab">
            Tree view <span className="stat">{parsed.kind === "ok" ? `${parsed.nodes} nodes` : ""}</span>
          </span>
          <div className="tree" role="region" aria-label="JSON tree">
            {parsed.kind === "ok" ? (
              <ul className="t-root">
                <Node
                  name={null}
                  value={parsed.value}
                  path="$"
                  depth={0}
                  version={version}
                  openAll={openAll}
                  onCopy={copyPath}
                />
              </ul>
            ) : (
              <p className="meta">The tree appears here.</p>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <button type="button" onClick={() => setInput(SAMPLE)}>
          Sample
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => setAll(true)}
          disabled={parsed.kind !== "ok"}
        >
          Expand all
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => setAll(false)}
          disabled={parsed.kind !== "ok"}
        >
          Collapse all
        </button>
        <button type="button" className="secondary" onClick={() => (setInput(""), setNotice(null))}>
          Clear
        </button>
      </div>
      <p
        className={`status ${parsed.kind === "err" ? "err" : parsed.kind === "ok" ? "ok" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice ??
          (parsed.kind === "ok"
            ? "✓ Valid JSON. Click a key to copy its path."
            : parsed.kind === "err"
              ? `✕ ${parsed.text}`
              : "Paste JSON, or load the sample.")}
      </p>
    </div>
  );
}
