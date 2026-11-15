export function sortKeys(v: unknown): unknown {
  if (Array.isArray(v)) {
    return v.map(sortKeys);
  }
  if (v && typeof v === "object") {
    return Object.fromEntries(
      Object.entries(v as Record<string, unknown>)
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([k, val]) => [k, sortKeys(val)]),
    );
  }
  return v;
}

class Stop extends Error {
  constructor(readonly at: number) {
    super("stop");
  }
}

/**
 * Index of the first character that breaks the JSON grammar (RFC 8259), or null when the text is valid.
 * Used when the engine's message has no position (Safari, and some V8 messages for a bad token).
 */
export function errorOffset(text: string): number | null {
  const n = text.length;
  let i = 0;
  const fail = (at: number): never => {
    throw new Stop(at);
  };
  const ws = () => {
    while (i < n && (text[i] === " " || text[i] === "\t" || text[i] === "\n" || text[i] === "\r")) {
      i++;
    }
  };
  const digits = () => {
    const start = i;
    while (i < n && text[i]! >= "0" && text[i]! <= "9") {
      i++;
    }
    if (i === start) {
      fail(i);
    }
  };
  const str = () => {
    i++;
    for (;;) {
      if (i >= n) {
        fail(n);
      }
      const c = text[i]!;
      if (c === '"') {
        i++;
        return;
      }
      if (c < " ") {
        fail(i);
      }
      if (c === "\\") {
        const e = text[i + 1];
        if (e !== undefined && '"\\/bfnrt'.includes(e)) {
          i += 2;
        } else if (e === "u") {
          for (let k = 2; k < 6; k++) {
            if (!/[0-9a-fA-F]/.test(text[i + k] ?? "")) {
              fail(i + k);
            }
          }
          i += 6;
        } else {
          fail(i + 1);
        }
      } else {
        i++;
      }
    }
  };
  const num = () => {
    if (text[i] === "-") {
      i++;
    }
    if (text[i] === "0") {
      i++;
    } else {
      digits();
    }
    if (text[i] === ".") {
      i++;
      digits();
    }
    if (text[i] === "e" || text[i] === "E") {
      i++;
      if (text[i] === "+" || text[i] === "-") {
        i++;
      }
      digits();
    }
  };
  const literal = (word: string) => {
    for (const ch of word) {
      if (text[i] !== ch) {
        fail(i);
      }
      i++;
    }
  };
  const value = (): void => {
    ws();
    const c = text[i];
    if (c === "{") {
      i++;
      ws();
      if (text[i] === "}") {
        i++;
        return;
      }
      for (;;) {
        ws();
        if (text[i] !== '"') {
          fail(i);
        }
        str();
        ws();
        if (text[i] !== ":") {
          fail(i);
        }
        i++;
        value();
        ws();
        if (text[i] === ",") {
          i++;
        } else if (text[i] === "}") {
          i++;
          return;
        } else {
          fail(i);
        }
      }
    } else if (c === "[") {
      i++;
      ws();
      if (text[i] === "]") {
        i++;
        return;
      }
      for (;;) {
        value();
        ws();
        if (text[i] === ",") {
          i++;
        } else if (text[i] === "]") {
          i++;
          return;
        } else {
          fail(i);
        }
      }
    } else if (c === '"') {
      str();
    } else if (c === "t") {
      literal("true");
    } else if (c === "f") {
      literal("false");
    } else if (c === "n") {
      literal("null");
    } else if (c === "-" || (c !== undefined && c >= "0" && c <= "9")) {
      num();
    } else {
      fail(i);
    }
  };
  try {
    value();
    ws();
    return i < n ? i : null;
  } catch (e) {
    return e instanceof Stop ? e.at : null; // anything else (such as a stack overflow) means no answer
  }
}

const lineColumn = (input: string, offset: number) => {
  const upTo = input.slice(0, offset);
  return { line: upTo.split("\n").length, col: upTo.length - upTo.lastIndexOf("\n") };
};

/** Turn a JSON.parse error into a message with line and column when the engine only gives a position, or none. */
export function describeError(input: string, err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (/line \d+ column \d+/.test(msg)) {
    return msg;
  }
  const pos = msg.match(/position (\d+)/);
  const offset = pos ? Number(pos[1]) : errorOffset(input);
  if (offset === null) {
    return msg;
  }
  const { line, col } = lineColumn(input, offset);
  return `${msg} (line ${line}, column ${col})`;
}

export function byteSize(s: string): number {
  return new TextEncoder().encode(s).length;
}

export function formatBytes(n: number): string {
  if (n < 1024) {
    return `${n} B`;
  }
  if (n < 1024 * 1024) {
    return `${(n / 1024).toFixed(1)} KB`;
  }
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
  if (out.length >= 500) {
    return out;
  }
  if (isObj(a) && isObj(b)) {
    const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]));
    for (const k of keys) {
      const p = /^[A-Za-z_$][\w$]*$/.test(k) ? `${path}.${k}` : `${path}[${JSON.stringify(k)}]`;
      if (!(k in a)) {
        out.push({ kind: "added", path: p, after: b[k] });
      } else if (!(k in b)) {
        out.push({ kind: "removed", path: p, before: a[k] });
      } else {
        diffJson(a[k], b[k], p, out);
      }
    }
  } else if (Array.isArray(a) && Array.isArray(b)) {
    const n = Math.max(a.length, b.length);
    for (let i = 0; i < n; i++) {
      const p = `${path}[${i}]`;
      if (i >= a.length) {
        out.push({ kind: "added", path: p, after: b[i] });
      } else if (i >= b.length) {
        out.push({ kind: "removed", path: p, before: a[i] });
      } else {
        diffJson(a[i], b[i], p, out);
      }
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
    if (keys.length === 0 && prefix) {
      out[prefix] = "";
    }
    for (const k of keys) {
      flatten(v[k], prefix ? `${prefix}.${k}` : k, out);
    }
  } else {
    out[prefix || "value"] = v;
  }
  return out;
}

function cell(v: unknown): string {
  if (v === null || v === undefined) {
    return "";
  }
  if (typeof v === "object") {
    return JSON.stringify(v);
  }
  return String(v);
}

/** RFC 4180 CSV: quote fields containing the delimiter, a quote or a line break; double inner quotes. */
export function toCsv(rows: Record<string, unknown>[], delimiter: string): string {
  const headers: string[] = [];
  const seen = new Set<string>();
  for (const r of rows) {
    for (const k of Object.keys(r)) {
      if (!seen.has(k)) {
        (seen.add(k), headers.push(k));
      }
    }
  }
  const esc = (s: string) => (s.includes(delimiter) || /["\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
  const lines = [headers.map(esc).join(delimiter)];
  for (const r of rows) {
    lines.push(headers.map((h) => esc(cell(r[h]))).join(delimiter));
  }
  return lines.join("\r\n");
}
