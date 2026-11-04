import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PaycheckCalculator from "./PaycheckCalculator";

const set = (id: string, value: string) =>
  fireEvent.change(document.getElementById(id) as HTMLElement, { target: { value } });
const text = () => (document.body.textContent ?? "").replace(/\s+/g, " ");

describe("PaycheckCalculator (salary)", () => {
  it("shows the worked $60,000 single, bi-weekly result from its defaults", () => {
    render(<PaycheckCalculator mode="salary" />);
    expect(text()).toContain("$1,938.08"); // 50,390 / 26
    expect(text()).toContain("$50,390");
    expect(text()).toContain("$5,020"); // federal
    expect(text()).toContain("$3,720"); // Social Security
    expect(text()).toContain("$870"); // Medicare
  });

  it("changes the paycheck when the pay frequency changes", () => {
    render(<PaycheckCalculator mode="salary" />);
    set("pc-freq", "monthly");
    expect(text()).toContain("$4,199.17"); // 50,390 / 12
  });

  it("fills a flat state rate from the state list and applies it", () => {
    render(<PaycheckCalculator mode="salary" />);
    set("pc-statename", "Pennsylvania");
    expect((document.getElementById("pc-state") as HTMLInputElement).value).toBe("3.07");
    expect(text()).toContain("$1,842"); // 3.07% of 60,000
    set("pc-statename", "Texas");
    expect((document.getElementById("pc-state") as HTMLInputElement).value).toBe("0");
  });

  it("typing your own state rate clears the state choice", () => {
    render(<PaycheckCalculator mode="salary" />);
    set("pc-statename", "Ohio");
    set("pc-state", "5");
    expect((document.getElementById("pc-statename") as HTMLSelectElement).value).toBe("");
    expect(text()).toContain("$3,000"); // 5% of 60,000
  });

  it("a 401(k) lowers federal tax and leaves FICA unchanged", () => {
    render(<PaycheckCalculator mode="salary" />);
    set("pc-401k", "230.77"); // about 6,000 a year over 26 checks
    expect(text()).toContain("$3,720");
    expect(text()).not.toContain("$5,020");
  });

  it("switches filing status", () => {
    render(<PaycheckCalculator mode="salary" />);
    set("pc-status", "married");
    // taxable 27,800: 2,480 + 12% of 3,000 = 2,840
    expect(text()).toContain("$2,840");
  });

  it("explains bad input instead of showing numbers", () => {
    render(<PaycheckCalculator mode="salary" />);
    set("pc-amount", "abc");
    expect(text()).toMatch(/Enter your yearly salary/);
    set("pc-amount", "60000");
    set("pc-state", "40");
    expect(text()).toMatch(/between 0 and 25 percent/);
    set("pc-state", "0");
    set("pc-401k", "-5");
    expect(text()).toMatch(/Deductions must be zero or more/);
    set("pc-401k", "9999999");
    expect(text()).toMatch(/larger than your pay/);
  });

  it("treats blank deductions as zero", () => {
    render(<PaycheckCalculator mode="salary" />);
    set("pc-401k", "");
    expect(text()).toContain("$50,390");
  });
});

describe("PaycheckCalculator (hourly)", () => {
  it("turns $25 an hour at 40 hours into a yearly take-home", () => {
    render(<PaycheckCalculator mode="hourly" />);
    expect(text()).toContain("$43,962"); // 52,000 - 4,060 - 3,224 - 754
  });

  it("uses the hours per week and validates them", () => {
    render(<PaycheckCalculator mode="hourly" />);
    set("pc-hours", "20");
    expect(text()).toContain("$26,000"); // gross
    set("pc-hours", "200");
    expect(text()).toMatch(/0 to 168/);
  });
});
