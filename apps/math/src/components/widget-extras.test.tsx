import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DateDiffCalculator } from "./DateCalculators";
import PercentChangeTool from "./PercentChangeTool";
import { AverageCalculator, RatioCalculator } from "./RatioAndAverage";
import { DiscountCalculator } from "./TimeAndDiscount";

const set = (c: HTMLElement, id: string, value: string) =>
  fireEvent.change(c.querySelector(`#${id}`) as HTMLElement, { target: { value } });
const text = (c: HTMLElement) => (c.textContent ?? "").replace(/\s+/g, " ");

describe("DiscountCalculator extras", () => {
  it("shows the saving when finding a discount from two prices", () => {
    const { container } = render(<DiscountCalculator />);
    expect(text(container)).toMatch(/Saving: 30\. You pay 75% of the original price/);
    set(container, "d-sale", "150");
    expect(text(container)).not.toMatch(/Saving:/);
  });

  it("finds the price before a discount", () => {
    const { container } = render(<DiscountCalculator />);
    expect(text(container)).toMatch(/Price before the discount\s*80/);
    expect(text(container)).toMatch(/The discount took off 20\./);
    set(container, "d-paid", "34");
    set(container, "d-pct", "15");
    expect(text(container)).toMatch(/Price before the discount\s*40/);
  });

  it("rejects a discount of 100% or more, or below zero", () => {
    const { container } = render(<DiscountCalculator />);
    set(container, "d-pct", "100");
    expect(text(container)).toMatch(/discount from 0 to under 100/);
    set(container, "d-pct", "-5");
    expect(text(container)).toMatch(/discount from 0 to under 100/);
  });
});

describe("RatioCalculator extras", () => {
  it("shows each part as a share of the whole and the 1 : n form", () => {
    const { container } = render(<RatioCalculator />);
    expect(text(container)).toMatch(/Shares of the whole: 60% and 40%\. As 1 : n it is 1 : 0\.6667/);
    set(container, "r-a", "1");
    set(container, "r-b", "3");
    expect(text(container)).toMatch(/25% and 75%\. As 1 : n it is 1 : 3\./);
  });

  it("leaves the shares out when a part is zero", () => {
    const { container } = render(<RatioCalculator />);
    set(container, "r-b", "0");
    expect(text(container)).not.toMatch(/Shares of the whole/);
  });
});

describe("DateDiffCalculator extras", () => {
  it("counts weekend days, with and without the end date", () => {
    const { container } = render(<DateDiffCalculator />);
    set(container, "dd-from", "2026-11-02");
    set(container, "dd-to", "2026-11-09");
    expect(text(container)).toMatch(/Weekend days \(Sat and Sun\)\s*2/);
    set(container, "dd-to", "2026-11-08");
    expect(text(container)).toMatch(/Weekend days \(Sat and Sun\)\s*1/);
    fireEvent.click(container.querySelector("input[type=checkbox]") as HTMLElement);
    expect(text(container)).toMatch(/Weekend days \(Sat and Sun\)\s*2/);
  });
});

describe("PercentChangeTool difference extras", () => {
  it("shows the two directional changes next to the symmetric difference", () => {
    const { container } = render(<PercentChangeTool kind="difference" />);
    expect(text(container)).toMatch(/40 to 50 is \+25%, and 50 to 40 is -20%/);
    set(container, "c-from", "0");
    set(container, "c-to", "10");
    expect(text(container)).toMatch(/Percentage difference\s*200%/);
    expect(text(container)).not.toMatch(/As a change with a direction/);
  });
});

describe("RatioCalculator share of a total", () => {
  it("divides a total in the ratio A : B", () => {
    const { container } = render(<RatioCalculator />);
    set(container, "r-a", "3");
    set(container, "r-b", "2");
    expect(text(container)).toMatch(/3 : 2 of 500 gives\s*300 and 200/);
    set(container, "r-total", "");
    expect(text(container)).toMatch(/Enter A, B \(not both 0\) and a total/);
  });
});

describe("AverageCalculator deviation extras", () => {
  it("shows the sum of squared differences", () => {
    const { container } = render(<AverageCalculator variant="deviation" />);
    set(container, "avg-in", "2, 4, 4, 4, 5, 5, 7, 9");
    expect(text(container)).toMatch(/Sum of squared differences\s*32/);
  });
});
