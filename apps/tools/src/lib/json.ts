export function sortKeys(v: unknown): unknown {
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

/** Turn a JSON.parse error into a message with line and column when the engine only gives a position. */
export function describeError(input: string, err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (/line \d+ column \d+/.test(msg)) return msg;
  const pos = msg.match(/position (\d+)/);
  if (pos) {
    const upTo = input.slice(0, Number(pos[1]));
    const line = upTo.split("\n").length;
    const col = upTo.length - upTo.lastIndexOf("\n");
    return `${msg} (line ${line}, column ${col})`;
  }
  return msg;
}

export function byteSize(s: string): number {
  return new TextEncoder().encode(s).length;
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

export type DiffKind = "added" | "removed" | "changed";
export interface DiffEntry {
  kind: DiffKind;
  path: string;
  before?: unknown;
  after?: unknown;
}

const isObj = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === "object" && !Array.isArray(v);

/** Structural diff. Object key order is ignored; arrays are compared by index. */
export function diffJson(a: unknown, b: unknown, path = "$", out: DiffEntry[] = []): DiffEntry[] {
  if (out.length >= 500) return out;
  if (isObj(a) && isObj(b)) {
    const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]));
    for (const k of keys) {
      const p = /^[A-Za-z_$][\w$]*$/.test(k) ? `${path}.${k}` : `${path}[${JSON.stringify(k)}]`;
      if (!(k in a)) out.push({ kind: "added", path: p, after: b[k] });
      else if (!(k in b)) out.push({ kind: "removed", path: p, before: a[k] });
      else diffJson(a[k], b[k], p, out);
    }
  } else if (Array.isArray(a) && Array.isArray(b)) {
    const n = Math.max(a.length, b.length);
    for (let i = 0; i < n; i++) {
      const p = `${path}[${i}]`;
      if (i >= a.length) out.push({ kind: "added", path: p, after: b[i] });
      else if (i >= b.length) out.push({ kind: "removed", path: p, before: a[i] });
      else diffJson(a[i], b[i], p, out);
    }
  } else if (JSON.stringify(a) !== JSON.stringify(b)) {
    out.push({ kind: "changed", path, before: a, after: b });
  }
  return out;
}

/** Flatten nested objects into dotted keys. Arrays and leaf values become one cell. */
export function flatten(v: unknown, prefix = "", out: Record<string, unknown> = {}): Record<string, unknown> {
  if (isObj(v)) {
    const keys = Object.keys(v);
    if (keys.length === 0 && prefix) out[prefix] = "";
    for (const k of keys) flatten(v[k], prefix ? `${prefix}.${k}` : k, out);
  } else {
    out[prefix || "value"] = v;
  }
  return out;
}

function cell(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

/** RFC 4180 CSV: quote fields containing the delimiter, a quote or a line break; double inner quotes. */
export function toCsv(rows: Record<string, unknown>[], delimiter: string): string {
  const headers: string[] = [];
  const seen = new Set<string>();
  for (const r of rows) for (const k of Object.keys(r)) if (!seen.has(k)) (seen.add(k), headers.push(k));
  const esc = (s: string) => (s.includes(delimiter) || /["\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
  const lines = [headers.map(esc).join(delimiter)];
  for (const r of rows) lines.push(headers.map((h) => esc(cell(r[h]))).join(delimiter));
  return lines.join("\r\n");
}
