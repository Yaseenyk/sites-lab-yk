import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HeaderNav } from "../../../../packages/shell/src/HeaderNav";
import { MobileNav } from "../../../../packages/shell/src/MobileNav";
import { ThemeScript, ThemeToggle } from "../../../../packages/shell/src/ThemeToggle";

let pathname = "/";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

function systemPrefers(scheme: "light" | "dark") {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query.includes("light") ? scheme === "light" : scheme === "dark",
    media: query,
    addEventListener() {},
    removeEventListener() {},
  }));
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-theme");
    pathname = "/";
  });

  it("starts from the system theme when nothing is saved", () => {
    systemPrefers("light");
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeTruthy();
  });

  it("starts from the saved theme", () => {
    systemPrefers("light");
    document.documentElement.setAttribute("data-theme", "dark");
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "Switch to light mode" })).toBeTruthy();
  });

  it("toggles the theme, sets data-theme and remembers the choice", () => {
    systemPrefers("dark");
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
    fireEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("still switches for this page view when storage is blocked", () => {
    systemPrefers("dark");
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    vi.restoreAllMocks();
  });

  it("the head script applies a saved theme before paint, and ignores junk", () => {
    const { container } = render(<ThemeScript />);
    const code = container.querySelector("script")?.innerHTML ?? "";
    localStorage.setItem("theme", "light");
    new Function(code)();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "purple");
    new Function(code)();
    expect(document.documentElement.getAttribute("data-theme")).toBeNull();
  });
});

describe("MobileNav", () => {
  const nav = [
    { href: "/a", label: "Alpha" },
    { href: "/b", label: "Beta" },
  ];
  const cta = { label: "Go now", href: "/go" };

  beforeEach(() => {
    pathname = "/";
  });

  it("is closed at first and opens to show every link and the call to action", () => {
    render(<MobileNav nav={nav} cta={cta} />);
    expect(screen.queryByRole("navigation")).toBeNull();
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(button);
    expect(screen.getByRole("link", { name: "Alpha" }).getAttribute("href")).toBe("/a");
    expect(screen.getByRole("link", { name: "Beta" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Go now" }).getAttribute("href")).toBe("/go");
    expect(screen.getByRole("button", { name: "Close menu" }).getAttribute("aria-expanded")).toBe("true");
  });

  it("closes with the button, with Escape, and when the page changes", () => {
    const { rerender } = render(<MobileNav nav={nav} cta={cta} />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.queryByRole("navigation")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("navigation")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    pathname = "/b";
    act(() => rerender(<MobileNav nav={nav} cta={cta} />));
    expect(screen.queryByRole("navigation")).toBeNull();
  });
});

describe("HeaderNav", () => {
  const grouped = [
    {
      label: "Pay",
      items: [
        { href: "/paycheck-calculator/", label: "Paycheck" },
        { href: "/time-and-a-half-calculator/", label: "Time and a half" },
      ],
    },
    { label: "Loans", items: [{ href: "/emi-calculator/", label: "EMI" }] },
    { href: "/guides/", label: "Guides" },
  ];

  beforeEach(() => {
    pathname = "/";
  });

  it("keeps group links closed until the group is pressed, and shows one group at a time", () => {
    render(<HeaderNav nav={grouped} />);
    expect(screen.queryByRole("link", { name: "Paycheck" })).toBeNull();
    expect(screen.getByRole("link", { name: "Guides" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Pay" }));
    expect(screen.getByRole("link", { name: "Paycheck" }).getAttribute("href")).toContain(
      "/paycheck-calculator",
    );
    expect(screen.getByRole("button", { name: "Pay" }).getAttribute("aria-expanded")).toBe("true");

    fireEvent.click(screen.getByRole("button", { name: "Loans" }));
    expect(screen.queryByRole("link", { name: "Paycheck" })).toBeNull();
    expect(screen.getByRole("link", { name: "EMI" })).toBeTruthy();
  });

  it("closes on Escape, on a press outside and when the page changes", () => {
    const { rerender } = render(<HeaderNav nav={grouped} />);
    fireEvent.click(screen.getByRole("button", { name: "Pay" }));
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("link", { name: "Paycheck" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Pay" }));
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("link", { name: "Paycheck" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Pay" }));
    pathname = "/emi-calculator/";
    act(() => rerender(<HeaderNav nav={grouped} />));
    expect(screen.queryByRole("link", { name: "Paycheck" })).toBeNull();
  });

  it("marks the page being viewed, with or without a trailing slash", () => {
    pathname = "/time-and-a-half-calculator";
    render(<HeaderNav nav={grouped} />);
    fireEvent.click(screen.getByRole("button", { name: "Pay" }));
    expect(screen.getByRole("link", { name: "Time and a half" }).getAttribute("aria-current")).toBe("page");
    expect(screen.getByRole("link", { name: "Paycheck" }).getAttribute("aria-current")).toBeNull();
  });

  it("lists grouped links under their heading in the mobile menu", () => {
    render(<MobileNav nav={grouped} cta={{ label: "All calculators", href: "/" }} />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByText("Pay")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Time and a half" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Guides" })).toBeTruthy();
  });
});
