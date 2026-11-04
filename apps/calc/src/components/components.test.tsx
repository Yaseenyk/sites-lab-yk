import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type * as Currency from "@/lib/currency";
import CurrencyConverter from "./CurrencyConverter";
import OvertimeCalculator from "./OvertimeCalculator";
import PayConverter from "./PayConverter";
import RaiseCalculator from "./RaiseCalculator";

vi.mock("@/lib/currency", async (importOriginal) => ({
  ...(await importOriginal<typeof Currency>()),
  fetchRates: vi.fn().mockResolvedValue({
    rates: { USD: 1, INR: 90, EUR: 0.9, GBP: 0.8, AED: 3.6725, JPY: 150 },
    date: "2026-11-04",
    source: "jsdelivr",
  }),
}));

const set = (id: string, value: string) =>
  fireEvent.change(document.getElementById(id) as HTMLElement, { target: { value } });
const text = () => (document.body.textContent ?? "").replace(/\s+/g, " ");

describe("PayConverter", () => {
  it("converts 60,000 a year into every pay period", () => {
    render(<PayConverter initialAmount="60000" initialUnit="annual" focus="hourly" />);
    expect(text()).toContain("$28.85");
    expect(text()).toContain("$5,000.00");
    expect(text()).toContain("$2,307.69");
  });

  it("converts an hourly wage to annual pay with the default 2,080-hour year", () => {
    render(<PayConverter initialAmount="25" initialUnit="hourly" focus="annual" />);
    expect(text()).toContain("$52,000");
  });

  it("changes the unit", () => {
    render(<PayConverter initialAmount="60000" initialUnit="annual" />);
    set("pay-unit", "monthly");
    set("pay-amount", "5000");
    expect(text()).toMatch(/Annual\s*\$60,000/);
  });

  it("respects a custom schedule: 30 hours, 50 weeks", () => {
    render(<PayConverter initialAmount="20" initialUnit="hourly" focus="annual" />);
    set("pay-hours", "30");
    set("pay-weeks", "50");
    expect(text()).toContain("$30,000");
  });

  it("rejects an impossible schedule and asks for an amount when empty", () => {
    render(<PayConverter initialAmount="60000" initialUnit="annual" />);
    set("pay-hours", "0");
    expect(text()).toMatch(/Check your schedule/);
    set("pay-hours", "40");
    set("pay-amount", "");
    expect(text()).toMatch(/Enter an amount/);
  });

  it("formats in another currency, with Indian digit grouping for rupees", () => {
    render(<PayConverter initialAmount="60000" initialUnit="annual" initialCurrency="INR" />);
    expect(text()).toContain("₹60,000");
    set("pay-amount", "6000000");
    expect(text()).toContain("₹60,00,000");
  });

  it("shows a second currency from live rates", async () => {
    render(
      <PayConverter initialAmount="60000" initialUnit="annual" initialCurrency="USD" initialTarget="INR" />,
    );
    await waitFor(() => expect(text()).toContain("₹54,00,000"));
    expect(text()).toMatch(/In INR/);
    expect(text()).toMatch(/Mid-market reference rates for 2026-11-04/);
  });

  it("hides the second currency column when the same currency is chosen", async () => {
    render(
      <PayConverter initialAmount="60000" initialUnit="annual" initialCurrency="USD" initialTarget="INR" />,
    );
    await waitFor(() => expect(text()).toContain("₹54,00,000"));
    set("pay-target", "");
    expect(text()).not.toMatch(/In INR/);
  });
});

describe("RaiseCalculator", () => {
  it("raises 60,000 by 3% and projects five years", () => {
    render(<RaiseCalculator />);
    expect(text()).toContain("$61,800");
    expect(text()).toContain("$63,654");
    expect(text()).toMatch(/Year 5/);
  });

  it("switches to a flat raise and reports the percent", () => {
    render(<RaiseCalculator />);
    fireEvent.click(screen.getByRole("tab", { name: "Raise by amount" }));
    expect(text()).toContain("$62,500");
    expect(text()).toMatch(/4\.17%/);
  });

  it("finds the percent raise between two pay rates, including a pay cut", () => {
    render(<RaiseCalculator />);
    fireEvent.click(screen.getByRole("tab", { name: "Find the % raise" }));
    expect(text()).toMatch(/8\.33%/);
    set("r-next", "54000");
    expect(text()).toMatch(/-10%/);
  });

  it("works on an hourly basis in another currency", () => {
    render(<RaiseCalculator />);
    set("r-basis", "hour");
    set("r-current", "20");
    set("r-pct", "4");
    set("r-currency", "GBP");
    expect(text()).toContain("£20.80");
  });

  it("asks for the missing input", () => {
    render(<RaiseCalculator />);
    set("r-current", "");
    expect(text()).toMatch(/Enter your current pay/);
  });
});

describe("OvertimeCalculator", () => {
  it("overtime mode: 45 hours at $20 with time and a half is $950", () => {
    render(<OvertimeCalculator mode="overtime" />);
    expect(text()).toContain("$950.00");
    expect(text()).toContain("$150.00");
  });

  it("has no overtime under the threshold, and supports double time and another threshold", () => {
    render(<OvertimeCalculator mode="overtime" />);
    set("o-hours", "38");
    expect(text()).toContain("$760.00");
    set("o-hours", "50");
    set("o-mult", "2");
    expect(text()).toContain("$1,200.00");
    set("o-threshold", "8");
    set("o-hours", "10");
    set("o-mult", "1.5");
    expect(text()).toContain("$220.00");
  });

  it("time and a half mode: the multiplied rate and pay for the hours", () => {
    render(<OvertimeCalculator mode="timehalf" />);
    expect(text()).toContain("$30.00/hr");
    expect(text()).toContain("$150.00");
    expect(text()).toContain("$40.00");
    expect(text()).toContain("$50.00");
  });

  it("asks for a rate and for hours", () => {
    render(<OvertimeCalculator mode="overtime" />);
    set("o-rate", "");
    expect(text()).toMatch(/Enter your hourly rate/);
    set("o-rate", "20");
    set("o-hours", "");
    expect(text()).toMatch(/Enter the hours/);
  });
});

describe("CurrencyConverter", () => {
  it("converts with the live rate and shows the rate and its date", async () => {
    render(<CurrencyConverter initialFrom="USD" initialTo="INR" initialAmount="100" />);
    await waitFor(() => expect(text()).toContain("₹9,000.00"));
    expect(text()).toMatch(/1 USD = 90 INR/);
    expect(text()).toMatch(/1 INR = 0\.011111 USD/);
    expect(text()).toMatch(/2026-11-04/);
  });

  it("builds a quick table of common amounts", async () => {
    render(<CurrencyConverter initialFrom="USD" initialTo="INR" initialAmount="1" />);
    await waitFor(() => expect(text()).toContain("₹90.00"));
    expect(text()).toContain("₹9,00,000.00");
  });

  it("swaps the pair", async () => {
    render(<CurrencyConverter initialFrom="USD" initialTo="INR" initialAmount="90" />);
    await waitFor(() => expect(text()).toContain("₹8,100.00"));
    fireEvent.click(screen.getByRole("button", { name: "Swap currencies" }));
    await waitFor(() => expect(text()).toMatch(/1 INR = /));
    expect(text()).toContain("$1.00");
  });

  it("crosses two non-dollar currencies", async () => {
    render(<CurrencyConverter initialFrom="USD" initialTo="INR" initialAmount="100" />);
    await waitFor(() => expect(text()).toContain("₹9,000.00"));
    set("cc-from", "GBP");
    await waitFor(() => expect(text()).toContain("₹11,250.00"));
  });

  it("says when a currency has no rate and when the amount is invalid", async () => {
    render(<CurrencyConverter initialFrom="USD" initialTo="INR" initialAmount="100" />);
    await waitFor(() => expect(text()).toContain("₹9,000.00"));
    set("cc-to", "CAD");
    expect(text()).toMatch(/No rate is available for USD to CAD/);
    set("cc-amount", "abc");
    expect(text()).toMatch(/Enter an amount/);
  });

  it("offers the full currency list after the page loads, with names", async () => {
    render(<CurrencyConverter initialFrom="USD" initialTo="INR" initialAmount="1" />);
    await waitFor(() => expect(screen.getAllByRole("group", { name: "All currencies" }).length).toBe(2));
    expect(document.querySelector('#cc-from option[value="USD"]')?.textContent).toMatch(/USD - /);
  });
});
