import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Base64Tool from "./Base64Tool";
import JsonDiffTool from "./JsonDiffTool";
import JsonToCsvTool from "./JsonToCsvTool";
import JsonTool from "./JsonTool";
import JsonTreeTool from "./JsonTreeTool";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

const type = (id: string, value: string) =>
  fireEvent.change(document.getElementById(id) as HTMLElement, { target: { value } });
const click = (name: string) => fireEvent.click(screen.getByRole("button", { name }));
const out = (id: string) => (document.getElementById(id) as HTMLTextAreaElement).value;
const status = () => (screen.getByRole("status").textContent ?? "").replace(/\s+/g, " ");

describe("JsonTool", () => {
  it("says so while empty, then validates live as you type", () => {
    render(<JsonTool />);
    expect(status()).toMatch(/Paste JSON above/);
    type("json-in", '{"a":1}');
    expect(status()).toMatch(/Valid JSON/);
  });

  it("reports the position of an error", () => {
    render(<JsonTool />);
    type("json-in", '{"a":1,}');
    expect(status()).toMatch(/✕/);
    expect(status()).toMatch(/line \d+/i);
  });

  it("formats with two spaces, four spaces or tabs", () => {
    render(<JsonTool />);
    type("json-in", '{"a":{"b":1}}');
    click("Format");
    expect(out("json-out")).toBe('{\n  "a": {\n    "b": 1\n  }\n}');
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "4" } });
    click("Format");
    expect(out("json-out")).toContain('\n    "a"');
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "tab" } });
    click("Format");
    expect(out("json-out")).toContain('\n\t"a"');
  });

  it("minifies, sorts keys, and clears", () => {
    render(<JsonTool />);
    type("json-in", '{ "b": 2, "a": [1, 2] }');
    click("Minify");
    expect(out("json-out")).toBe('{"b":2,"a":[1,2]}');
    fireEvent.click(screen.getByRole("checkbox"));
    click("Format");
    expect(out("json-out").indexOf('"a"')).toBeLessThan(out("json-out").indexOf('"b"'));
    click("Clear");
    expect(out("json-in")).toBe("");
    expect(out("json-out")).toBe("");
  });

  it("leaves the output empty when the input is invalid", () => {
    render(<JsonTool />);
    type("json-in", "{oops");
    click("Format");
    expect(out("json-out")).toBe("");
  });

  it("loads the sample", () => {
    render(<JsonTool />);
    click("Sample");
    expect(out("json-in")).toContain("Ada Lovelace");
    expect(status()).toMatch(/Valid JSON/);
  });
});

describe("Base64Tool", () => {
  it("encodes and decodes text", () => {
    render(<Base64Tool />);
    type("b64-in", "Hello, world");
    click("Encode");
    expect(out("b64-out")).toBe("SGVsbG8sIHdvcmxk");
    type("b64-in", "SGVsbG8sIHdvcmxk");
    click("Decode");
    expect(out("b64-out")).toBe("Hello, world");
  });

  it("round-trips accents and emoji as UTF-8", () => {
    render(<Base64Tool />);
    type("b64-in", "héllo 😀");
    click("Encode");
    const encoded = out("b64-out");
    type("b64-in", encoded);
    click("Decode");
    expect(out("b64-out")).toBe("héllo 😀");
  });

  it("URL-safe output has no +, / or padding", () => {
    render(<Base64Tool />);
    type("b64-in", "??>>");
    fireEvent.click(screen.getByRole("checkbox"));
    click("Encode");
    expect(out("b64-out")).toBe("Pz8-Pg");
  });

  it("decodes URL-safe input with missing padding", () => {
    render(<Base64Tool />);
    type("b64-in", "Pz8-Pg");
    click("Decode");
    expect(out("b64-out")).toBe("??>>");
  });

  it("shows an error for invalid Base64 and for empty input", () => {
    render(<Base64Tool />);
    click("Encode");
    expect(status()).toMatch(/Enter some text first/);
    type("b64-in", "!!!not base64!!!");
    click("Decode");
    expect(status()).toMatch(/✕/);
    expect(out("b64-out")).toBe("");
  });

  it("uses the output as the next input", () => {
    render(<Base64Tool />);
    type("b64-in", "hi");
    click("Encode");
    click("Use output as input");
    expect(out("b64-in")).toBe("aGk=");
    expect(out("b64-out")).toBe("");
  });
});

describe("JsonDiffTool", () => {
  it("lists added, removed and changed values by path", () => {
    render(<JsonDiffTool />);
    click("Sample");
    click("Compare");
    const t = document.body.textContent ?? "";
    expect(t).toMatch(/added/i);
    expect(t).toMatch(/removed/i);
    expect(t).toMatch(/changed/i);
    expect(t).toContain("$.plan");
    expect(t).toContain("$.limit");
  });

  it("says identical documents are identical, whatever the key order", () => {
    render(<JsonDiffTool />);
    type("diff-a", '{"a":1,"b":2}');
    type("diff-b", '{"b":2,"a":1}');
    click("Compare");
    expect(document.body.textContent).toMatch(/Identical/);
  });

  it("names the side that is invalid JSON", () => {
    render(<JsonDiffTool />);
    type("diff-a", "{bad");
    type("diff-b", "{}");
    click("Compare");
    expect(document.body.textContent).toMatch(/Left side/);
    type("diff-a", "{}");
    type("diff-b", "{bad");
    click("Compare");
    expect(document.body.textContent).toMatch(/Right side/);
  });

  it("swaps the sides", () => {
    render(<JsonDiffTool />);
    type("diff-a", '{"a":1}');
    type("diff-b", '{"a":2}');
    click("Swap sides");
    expect(out("diff-a")).toBe('{"a":2}');
    expect(out("diff-b")).toBe('{"a":1}');
  });
});

describe("JsonToCsvTool", () => {
  it("converts an array of objects with flattened columns and quoting", () => {
    render(<JsonToCsvTool />);
    click("Sample");
    click("Convert");
    const csv = out("csv-out");
    // A <textarea> normalises line breaks to \n; the exact CRLF output is asserted in lib/json.test.ts.
    expect(csv.split("\n")[0]).toBe("id,name,address.city,address.zip,tags");
    expect(csv).toContain('"Grace, Rear Adm."');
    expect(status()).toMatch(/Converted 2 rows/);
  });

  it("uses a semicolon delimiter, and keeps nested objects as JSON text when flattening is off", () => {
    render(<JsonToCsvTool />);
    type("csv-in", '[{"a":{"b":1}}]');
    fireEvent.change(screen.getByLabelText(/Delimiter/), { target: { value: ";" } });
    fireEvent.click(screen.getByRole("checkbox"));
    click("Convert");
    expect(out("csv-out")).toBe('a\n"{""b"":1}"');
  });

  it("accepts a single object and a list of plain values", () => {
    render(<JsonToCsvTool />);
    type("csv-in", '{"a":1,"b":"x"}');
    click("Convert");
    expect(out("csv-out")).toBe("a,b\n1,x");
    type("csv-in", "[1,2]");
    click("Convert");
    expect(out("csv-out")).toBe("value\n1\n2");
  });

  it("reports invalid JSON and empty input, and disables copy and download until there is a result", () => {
    render(<JsonToCsvTool />);
    expect((screen.getByRole("button", { name: "Copy" }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole("button", { name: "Download .csv" }) as HTMLButtonElement).disabled).toBe(true);
    click("Convert");
    expect(status()).toMatch(/Paste some JSON first/);
    type("csv-in", "{bad");
    click("Convert");
    expect(status()).toMatch(/✕/);
  });
});

describe("JsonTreeTool", () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
  });

  it("renders a tree with a node count from the sample", () => {
    render(<JsonTreeTool />);
    click("Sample");
    expect(document.body.textContent).toContain("Ada Lovelace");
    expect(document.body.textContent).toMatch(/\d+ nodes/);
    expect(status()).toMatch(/Valid JSON/);
  });

  it("collapses and expands every branch", () => {
    render(<JsonTreeTool />);
    click("Sample");
    click("Collapse all");
    expect(document.querySelector(".tree")?.textContent).not.toContain("Ada Lovelace");
    click("Expand all");
    expect(document.querySelector(".tree")?.textContent).toContain("London");
  });

  it("toggles a single branch", () => {
    render(<JsonTreeTool />);
    click("Sample");
    const toggle = screen.getByRole("button", { name: /Collapse \$\.user$/ });
    fireEvent.click(toggle);
    expect(document.querySelector(".tree")?.textContent).not.toContain("Ada Lovelace");
    fireEvent.click(screen.getByRole("button", { name: /Expand \$\.user$/ }));
    expect(document.querySelector(".tree")?.textContent).toContain("Ada Lovelace");
  });

  it("copies the path of a key", async () => {
    render(<JsonTreeTool />);
    click("Sample");
    fireEvent.click(screen.getByTitle("Copy path $.user.name"));
    await waitFor(() => expect(status()).toMatch(/Copied \$\.user\.name/));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("$.user.name");
  });

  it("shows array paths with indexes", async () => {
    render(<JsonTreeTool />);
    click("Sample");
    click("Expand all");
    expect(screen.getByTitle("Copy path $.orders[1].total")).toBeTruthy();
  });

  it("shows an error for invalid JSON and pages long lists", () => {
    render(<JsonTreeTool />);
    type("tree-in", "{bad");
    expect(status()).toMatch(/✕/);
    type("tree-in", JSON.stringify(Array.from({ length: 250 }, (_, i) => i)));
    click("Expand all");
    expect(screen.getByRole("button", { name: /Show 100 more of 150/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Show 100 more of 150/ }));
    expect(screen.getByRole("button", { name: /Show 100 more of 50|Show 50 more of 50/ })).toBeTruthy();
  });
});
