import { describe, expect, it } from "vitest";
import { describeError, diffJson, flatten, formatBytes, sortKeys, toCsv } from "./json";

describe("describeError", () => {
  it("adds line and column when the engine only reports a position", () => {
    const msg = describeError('{\n"a": 1,\n}', new Error("Unexpected token } in JSON at position 10"));
    expect(msg).toContain("line 3, column 1");
  });

  it("keeps messages that already carry line and column", () => {
    const original = "Expected double-quoted property name in JSON at position 7 (line 1 column 8)";
    expect(describeError("{ a: 1 }", new Error(original))).toBe(original);
  });
});

describe("sortKeys", () => {
  it("sorts object keys at every depth and keeps array order", () => {
    const out = sortKeys({ b: [{ z: 1, a: 2 }], a: 1 });
    expect(JSON.stringify(out)).toBe('{"a":1,"b":[{"a":2,"z":1}]}');
  });
});

describe("diffJson", () => {
  it("returns nothing for equal documents regardless of key order", () => {
    expect(diffJson({ a: 1, b: [1, 2] }, { b: [1, 2], a: 1 })).toEqual([]);
  });

  it("reports added, removed and changed values with paths", () => {
    const diffs = diffJson({ a: 1, b: { c: 2 }, gone: true }, { a: 2, b: { c: 2, d: 3 }, extra: 1 });
    expect(diffs).toEqual(
      expect.arrayContaining([
        { kind: "changed", path: "$.a", before: 1, after: 2 },
        { kind: "added", path: "$.b.d", after: 3 },
        { kind: "removed", path: "$.gone", before: true },
        { kind: "added", path: "$.extra", after: 1 },
      ]),
    );
    expect(diffs).toHaveLength(4);
  });

  it("compares arrays by index", () => {
    expect(diffJson([1, 2], [1, 3, 4])).toEqual([
      { kind: "changed", path: "$[1]", before: 2, after: 3 },
      { kind: "added", path: "$[2]", after: 4 },
    ]);
  });

  it("quotes keys that are not identifiers", () => {
    expect(diffJson({ "a b": 1 }, { "a b": 2 })[0]?.path).toBe('$["a b"]');
  });

  it("flags a type change", () => {
    expect(diffJson({ a: 1 }, { a: "1" })).toHaveLength(1);
  });
});

describe("flatten", () => {
  it("joins nested keys with dots and keeps arrays as one value", () => {
    expect(flatten({ a: { b: 1 }, t: [1, 2] })).toEqual({ "a.b": 1, t: [1, 2] });
  });

  it("wraps a bare value", () => {
    expect(flatten(5)).toEqual({ value: 5 });
  });
});

describe("toCsv", () => {
  it("builds the header from the union of keys and leaves gaps empty", () => {
    expect(toCsv([{ a: 1 }, { b: 2 }], ",")).toBe("a,b\r\n1,\r\n,2");
  });

  it("quotes fields that contain the delimiter, a quote or a line break", () => {
    expect(toCsv([{ a: "x,y", b: 'say "hi"', c: "l1\nl2" }], ",")).toBe(
      'a,b,c\r\n"x,y","say ""hi""","l1\nl2"',
    );
  });

  it("writes nested arrays as JSON text", () => {
    expect(toCsv([{ t: [1, 2] }], ";")).toBe("t\r\n[1,2]");
  });

  it("respects a custom delimiter", () => {
    expect(toCsv([{ a: "x;y" }], ";")).toBe('a\r\n"x;y"');
  });
});

describe("formatBytes", () => {
  it("scales units", () => {
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(2048)).toBe("2.0 KB");
  });
});
