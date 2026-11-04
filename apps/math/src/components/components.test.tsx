import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AgeCalculator from "./AgeCalculator";
import { DateAddCalculator, DateDiffCalculator } from "./DateCalculators";
import HoursCalculator from "./HoursCalculator";
import PercentCalculator from "./PercentCalculator";
import PercentChangeTool from "./PercentChangeTool";
import { AverageCalculator, RatioCalculator } from "./RatioAndAverage";
import { DiscountCalculator, TimeCalculator } from "./TimeAndDiscount";

const set = (c: HTMLElement, id: string, value: string) =>
  fireEvent.change(c.querySelector(`#${id}`) as HTMLElement, { target: { value } });
const text = (c: HTMLElement) => (c.textContent ?? "").replace(/\s+/g, " ");

describe("PercentCalculator", () => {
  it("answers the three classic questions from its defaults", () => {
    const { container } = render(<PercentCalculator />);
    expect(text(container)).toMatch(/15% of 80 is\s*12/);
    expect(text(container)).toMatch(/12 is\s*15% of 80/);
  });

  it("updates live when a number changes", () => {
    const { container } = render(<PercentCalculator />);
    set(container, "p1a", "20");
    set(container, "p1b", "50");
    expect(text(container)).toMatch(/20% of 50 is\s*10/);
  });

  it("explains when a division by zero is impossible", () => {
    const { container } = render(<PercentCalculator />);
    set(container, "p2b", "0");
    expect(text(container)).toMatch(/Y cannot be 0/);
  });

  it("finds the whole from a part", () => {
    const { container } = render(<PercentCalculator />);
    set(container, "p3a", "30");
    set(container, "p3b", "25");
    expect(text(container)).toMatch(/30 is 25% of\s*120/);
  });
});

describe("PercentChangeTool", () => {
  it("increase: applies a percentage and finds the percent increase", () => {
    const { container } = render(<PercentChangeTool kind="increase" />);
    expect(text(container)).toMatch(/80 increased by 25%\s*100/);
    expect(text(container)).toMatch(/Percent increase\s*\+30%/);
  });

  it("decrease: applies a percentage and finds the percent decrease", () => {
    const { container } = render(<PercentChangeTool kind="decrease" />);
    expect(text(container)).toMatch(/200 decreased by 15%\s*170/);
    expect(text(container)).toMatch(/Percent decrease\s*-25%/);
  });

  it("change: shows both percent change and percent difference, and flips direction", () => {
    const { container } = render(<PercentChangeTool kind="change" />);
    expect(text(container)).toMatch(/\+25%/);
    expect(text(container)).toMatch(/22\.2222%/);
    set(container, "c-from", "50");
    set(container, "c-to", "40");
    expect(text(container)).toMatch(/-20%/);
  });

  it("change: an old value of zero has no percent change", () => {
    const { container } = render(<PercentChangeTool kind="change" />);
    set(container, "c-from", "0");
    expect(text(container)).toMatch(/cannot be 0/);
  });

  it("difference: is the same in either direction and needs a non-zero average", () => {
    const { container } = render(<PercentChangeTool kind="difference" />);
    expect(text(container)).toMatch(/22\.2222%/);
    set(container, "c-from", "50");
    set(container, "c-to", "40");
    expect(text(container)).toMatch(/22\.2222%/);
    set(container, "c-from", "-5");
    set(container, "c-to", "5");
    expect(text(container)).toMatch(/do not average to 0/);
  });
});

describe("AgeCalculator", () => {
  it("computes years, months and days, the next birthday and the weekday", () => {
    const { container } = render(<AgeCalculator />);
    set(container, "age-dob", "1990-05-15");
    set(container, "age-asof", "2026-11-04");
    const t = text(container);
    expect(t).toContain("36 years, 5 months, 20 days");
    expect(t).toContain("15 May 2027");
    expect(t).toContain("Tuesday");
    expect(t).toMatch(/Total days\s*13,?\d{3}/);
  });

  it("is exact on a birthday", () => {
    const { container } = render(<AgeCalculator />);
    set(container, "age-dob", "2000-02-29");
    set(container, "age-asof", "2024-02-29");
    expect(text(container)).toContain("24 years, 0 months, 0 days");
    expect(text(container)).toContain("today");
  });

  it("rejects a birth date after the measured date and asks for input when empty", () => {
    const { container } = render(<AgeCalculator />);
    expect(text(container)).toMatch(/Enter a date of birth/);
    set(container, "age-dob", "2030-01-01");
    set(container, "age-asof", "2026-11-04");
    expect(text(container)).toMatch(/after the date being measured/);
  });

  it("fills in today's date for the measured date after load", () => {
    const { container } = render(<AgeCalculator />);
    expect((container.querySelector("#age-asof") as HTMLInputElement).value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("Date calculators", () => {
  it("days between: exclusive, inclusive, working days and reversed dates", () => {
    const { container } = render(<DateDiffCalculator />);
    set(container, "dd-from", "2026-01-01");
    set(container, "dd-to", "2026-12-31");
    expect(text(container)).toMatch(/Days between\s*364/);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(text(container)).toMatch(/Days between\s*365/);
    fireEvent.click(screen.getByRole("checkbox"));
    set(container, "dd-from", "2026-11-02");
    set(container, "dd-to", "2026-11-09");
    expect(text(container)).toMatch(/Days between\s*7/);
    expect(text(container)).toMatch(/Working days \(Mon to Fri\)\s*5/);
    set(container, "dd-from", "2026-11-09");
    set(container, "dd-to", "2026-11-02");
    expect(text(container)).toMatch(/swapped/);
  });

  it("add or subtract: days, months with end-of-month clamping, and invalid input", () => {
    const { container } = render(<DateAddCalculator />);
    set(container, "da-start", "2026-11-04");
    expect(text(container)).toContain("4 December 2026");
    expect(text(container)).toContain("Friday");
    set(container, "da-start", "2026-01-31");
    set(container, "da-d", "0");
    set(container, "da-m", "1");
    expect(text(container)).toContain("28 February 2026");
    fireEvent.change(container.querySelector("#da-op") as HTMLElement, { target: { value: "subtract" } });
    expect(text(container)).toContain("31 December 2025");
    set(container, "da-m", "x");
    expect(text(container)).toMatch(/whole numbers/);
  });
});

describe("HoursCalculator", () => {
  it("totals a shift with a break, adds and removes days", () => {
    const { container } = render(<HoursCalculator />);
    expect(text(container)).toContain("7:30 (7.5 hours)");
    fireEvent.click(screen.getByRole("button", { name: "Add another day" }));
    expect(text(container)).toContain("15:00 (15 hours)");
    fireEvent.click(screen.getAllByRole("button", { name: "Remove" })[0] as HTMLElement);
    expect(text(container)).toContain("7:30 (7.5 hours)");
  });

  it("wraps a shift past midnight", () => {
    const { container } = render(<HoursCalculator />);
    set(container, "h-s-0", "22:00");
    set(container, "h-e-0", "06:00");
    set(container, "h-b-0", "0");
    expect(text(container)).toContain("8:00 (8 hours)");
  });

  it("flags a break longer than the shift", () => {
    const { container } = render(<HoursCalculator />);
    set(container, "h-b-0", "600");
    expect(text(container)).toMatch(/Check the times|valid start and end/);
  });
});

describe("RatioCalculator", () => {
  it("simplifies and solves", () => {
    const { container } = render(<RatioCalculator />);
    expect(text(container)).toMatch(/3 : 2/);
    expect(text(container)).toMatch(/X =\s*20/);
    set(container, "r-a", "1.5");
    set(container, "r-b", "2");
    expect(text(container)).toMatch(/3 : 4/);
  });

  it("cannot solve when A is zero", () => {
    const { container } = render(<RatioCalculator />);
    set(container, "r-a", "0");
    expect(text(container)).toMatch(/A cannot be 0/);
  });
});

describe("AverageCalculator", () => {
  it("average variant: mean, median, mode and range", () => {
    const { container } = render(<AverageCalculator />);
    const t = text(container);
    expect(t).toMatch(/Mean \(average\)\s*9/);
    expect(t).toMatch(/Median\s*8/);
    expect(t).toMatch(/Mode\s*8/);
    expect(t).toMatch(/Range\s*11/);
  });

  it("deviation variant: sample and population standard deviation", () => {
    const { container } = render(<AverageCalculator variant="deviation" />);
    fireEvent.change(container.querySelector("#avg-in") as HTMLElement, {
      target: { value: "2 4 4 4 5 5 7 9" },
    });
    const t = text(container);
    expect(t).toMatch(/Population standard deviation[^0-9]*2(\D|$)/);
    expect(t).toMatch(/2\.13809/);
  });

  it("reports ignored tokens and an empty list", () => {
    const { container } = render(<AverageCalculator />);
    fireEvent.change(container.querySelector("#avg-in") as HTMLElement, { target: { value: "1, two, 3" } });
    expect(text(container)).toMatch(/Ignored: two/);
    fireEvent.change(container.querySelector("#avg-in") as HTMLElement, { target: { value: "" } });
    expect(text(container)).toMatch(/Enter some numbers/);
  });

  it("needs two values for a sample deviation", () => {
    const { container } = render(<AverageCalculator variant="deviation" />);
    fireEvent.change(container.querySelector("#avg-in") as HTMLElement, { target: { value: "5" } });
    expect(text(container)).toMatch(/needs 2\+ values/);
  });
});

describe("TimeCalculator", () => {
  it("adds with carrying and rolls hours into days", () => {
    const { container } = render(<TimeCalculator />);
    expect(text(container)).toContain("4 hours, 15 minutes");
    set(container, "t1-hours", "20");
    set(container, "t1-minutes", "0");
    set(container, "t2-hours", "8");
    set(container, "t2-minutes", "0");
    expect(text(container)).toContain("1 day, 4 hours");
  });

  it("subtracts and shows a negative result", () => {
    const { container } = render(<TimeCalculator />);
    fireEvent.change(container.querySelector("#t-op") as HTMLElement, { target: { value: "subtract" } });
    expect(text(container)).toContain("45 minutes");
    set(container, "t1-hours", "0");
    set(container, "t1-minutes", "10");
    expect(text(container)).toContain("-");
  });

  it("rejects negative or fractional input", () => {
    const { container } = render(<TimeCalculator />);
    set(container, "t1-hours", "-1");
    expect(text(container)).toMatch(/whole numbers of zero or more/);
  });
});

describe("DiscountCalculator", () => {
  it("sale price, savings and total discount", () => {
    const { container } = render(<DiscountCalculator />);
    expect(text(container)).toMatch(/Sale price\s*60/);
    expect(text(container)).toMatch(/You save\s*20/);
  });

  it("stacks a second discount multiplicatively", () => {
    const { container } = render(<DiscountCalculator />);
    set(container, "d-price", "100");
    set(container, "d-d1", "20");
    set(container, "d-d2", "10");
    expect(text(container)).toMatch(/Sale price\s*72/);
    expect(text(container)).toMatch(/Total discount\s*28%/);
  });

  it("finds the discount from two prices and notices a price increase", () => {
    const { container } = render(<DiscountCalculator />);
    expect(text(container)).toMatch(/Discount\s*25%/);
    set(container, "d-sale", "150");
    expect(text(container)).toMatch(/Price went up by\s*25%/);
  });
});
