import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type * as Currency from "@/lib/currency";
import CurrencyConverter from "./CurrencyConverter";
import PayConverter from "./PayConverter";

// Every rates feed fails: the tools must stay usable and say what happened.
vi.mock("@/lib/currency", async (importOriginal) => ({
  ...(await importOriginal<typeof Currency>()),
  fetchRates: vi.fn().mockRejectedValue(new Error("offline")),
}));

const set = (id: string, value: string) =>
  fireEvent.change(document.getElementById(id) as HTMLElement, { target: { value } });
const text = () => (document.body.textContent ?? "").replace(/\s+/g, " ");

describe("when the rates feed is unreachable", () => {
  it("the converter asks for a manual rate, then converts with it", async () => {
    render(<CurrencyConverter initialFrom="USD" initialTo="INR" initialAmount="100" />);
    await waitFor(() => expect(text()).toMatch(/Live rates could not be loaded/));
    set("cc-manual", "95");
    expect(text()).toContain("₹9,500.00");
    expect(text()).toMatch(/1 USD = 95 INR/);
  });

  it("ignores an invalid manual rate", async () => {
    render(<CurrencyConverter initialFrom="USD" initialTo="INR" initialAmount="100" />);
    await waitFor(() => expect(text()).toMatch(/Live rates could not be loaded/));
    set("cc-manual", "-3");
    expect(text()).toMatch(/Enter the rate yourself/);
  });

  it("the pay converter still shows pay in its own currency and explains the missing second one", async () => {
    render(<PayConverter initialAmount="60000" initialUnit="annual" initialTarget="INR" />);
    await waitFor(() => expect(text()).toMatch(/could not be loaded/));
    expect(text()).toContain("$28.85");
    expect(text()).not.toMatch(/In INR/);
  });
});
