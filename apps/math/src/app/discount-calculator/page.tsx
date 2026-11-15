import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import ToolPage from "@/components/ToolPage";
import { DiscountCalculator } from "@/components/TimeAndDiscount";
import { decreaseBy, fmt, increaseBy, percentChange, priceBeforeDiscount, stackedPrice } from "@/lib/percent";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("discount-calculator");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

/** Sale price at common discounts, for three original prices. */
const PERCENTS = [5, 10, 15, 20, 25, 30, 40, 50, 60, 70];
const PRICES = [40, 80, 250];

/** Two discounts taken one after the other against one discount of the same size added up. */
const STACKS: [number, number][] = [
  [10, 10],
  [20, 10],
  [25, 25],
  [30, 20],
  [50, 20],
];

/** Original prices recovered from a price paid and the discount it had. */
const REVERSE: [number, number][] = [
  [60, 25],
  [34, 15],
  [72, 28],
  [45, 50],
];

const TAX = 8;
const TAX_PRICE = 80;
const TAX_OFF = 25;

const faq = [
  {
    q: "How do I calculate a sale price?",
    a: `Multiply the original price by 1 minus the discount as a decimal. An $80 item at 25% off costs 80 x 0.75 = $${fmt(decreaseBy(80, 25))}, so you save $${fmt(80 - decreaseBy(80, 25))}.`,
  },
  {
    q: "How do I find the percent off from two prices?",
    a: `Subtract the sale price from the original, divide by the original, and multiply by 100. From $120 down to $90 is (120 - 90) / 120 x 100 = ${fmt(-percentChange(120, 90))}% off.`,
  },
  {
    q: "What do two discounts in a row add up to?",
    a: `They multiply, they do not add. 20% off and then a further 10% off leaves 0.80 x 0.90 = ${fmt(stackedPrice(100, [20, 10]) / 100)} of the price, which is ${fmt(100 - stackedPrice(100, [20, 10]))}% off in total, not 30%. Use the extra discount box to see it.`,
  },
  {
    q: "How do I work out the original price from the sale price?",
    a: `Divide the sale price by 1 minus the discount. If an item costs $60 after 25% off, the original price was 60 / 0.75 = $${fmt(priceBeforeDiscount(60, 25))}. The calculator has a box for this.`,
  },
  {
    q: "How much is 20% off?",
    a: `Take 20% of the price and subtract it, or multiply by 0.80. 20% off $50 is $${fmt(decreaseBy(50, 20))}, a saving of $${fmt(50 - decreaseBy(50, 20))}. The table above lists the sale price at other common discounts.`,
  },
  {
    q: "Is it better to have a discount before or after tax?",
    a: `The total is the same either way when both are percentages. $${TAX_PRICE} at ${TAX_OFF}% off and ${TAX}% tax is $${fmt(TAX_PRICE * (1 - TAX_OFF / 100) * (1 + TAX / 100), 2)} whichever comes first. What differs is the amount of tax: tax on the sale price is lower than tax on the full price. Which one applies depends on how the shop or the tax rules treat the discount.`,
  },
  {
    q: "Does it include sales tax?",
    a: `No. The calculator works on the price you enter. Sales tax is usually added after the discount, so multiply the sale price by 1 plus your tax rate. With ${TAX}% tax, $${fmt(decreaseBy(TAX_PRICE, TAX_OFF))} becomes $${fmt(increaseBy(decreaseBy(TAX_PRICE, TAX_OFF), TAX), 2)}.`,
  },
  {
    q: "What is buy one get one 50% off really worth?",
    a: `On two items at the same price it is a 25% discount on the pair. For two $40 items you pay 40 + 20 = $60 instead of $80, which is $${fmt(80 - 60)} off, or ${fmt(((80 - 60) / 80) * 100)}%. Enter 80 and 60 in the two-price box to check.`,
  },
  {
    q: "Is 30% off and 20% off the same as 50% off?",
    a: `No. Taken one after the other, they leave ${fmt(stackedPrice(100, [30, 20]))}% of the price, so the discount is ${fmt(100 - stackedPrice(100, [30, 20]))}%. 50% off would leave 50%.`,
  },
  {
    q: "Can I use it to find a markup or a price increase?",
    a: "Not directly. A markup goes up from the original price, so use the percentage increase calculator. It uses the same method with 1 plus the percentage instead of 1 minus it.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="discount-calculator"
      lede="Find the sale price and how much you save, stack a second discount, or work out what percent off a sale price really is."
      widget={<DiscountCalculator />}
      faq={faq}
      related={[
        "percentage-decrease-calculator",
        "percentage-calculator",
        "percent-change-calculator",
        "ratio-calculator",
      ]}
    >
      <h2>How a discount works</h2>
      <p>
        A discount of 25% takes a quarter off the price, so you pay the other 75%. The quickest way to the
        sale price is to multiply the original price by what is left. That is 1 minus the discount as a
        decimal.
      </p>
      <pre>{`sale price     = original x (1 - discount / 100)
you save       = original - sale price
percent off    = (original - sale) / original x 100
original price = sale price / (1 - discount / 100)`}</pre>

      <h2>How to use the calculator</h2>
      <ol>
        <li>Type the original price and the discount. The sale price and the saving appear straight away.</li>
        <li>
          If there is a second discount, such as a coupon on top of a sale, type it in the extra discount box.
          The calculator applies it to the already reduced price.
        </li>
        <li>
          If you only know the two prices, use the next box to see the percent off and the saving. If you know
          the price you paid and the discount, the last box finds the original price.
        </li>
      </ol>
      <p>
        Worked example: $80 at 25% off. 80 x 0.75 = ${fmt(decreaseBy(80, 25))}, so the saving is $
        {fmt(80 - decreaseBy(80, 25))}.
      </p>

      <h2>Sale price at common discounts</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Discount</th>
            {PRICES.map((p) => (
              <th scope="col" key={p}>
                Sale price of {p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PERCENTS.map((d) => (
            <tr key={d}>
              <th scope="row">{d}% off</th>
              {PRICES.map((p) => (
                <td key={p}>{fmt(decreaseBy(p, d), 2)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Two discounts in a row</h2>
      <p>
        The second discount is taken from the price that is already reduced, so the two percentages do not add
        up. Starting from 100:
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">First, then second</th>
            <th scope="col">You pay</th>
            <th scope="col">Real discount</th>
            <th scope="col">If you added them</th>
          </tr>
        </thead>
        <tbody>
          {STACKS.map(([a, b]) => (
            <tr key={`${a}-${b}`}>
              <th scope="row">
                {a}% then {b}%
              </th>
              <td>{fmt(stackedPrice(100, [a, b]), 2)}</td>
              <td>{fmt(100 - stackedPrice(100, [a, b]), 2)}%</td>
              <td>{a + b}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Working back to the original price</h2>
      <p>
        If you know what you paid and the discount it had, divide by what was left. The calculator&apos;s last
        box does this.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Price paid</th>
            <th scope="col">Discount</th>
            <th scope="col">Original price</th>
            <th scope="col">Taken off</th>
          </tr>
        </thead>
        <tbody>
          {REVERSE.map(([paid, p]) => (
            <tr key={`${paid}-${p}`}>
              <th scope="row">{fmt(paid)}</th>
              <td>{p}%</td>
              <td>{fmt(priceBeforeDiscount(paid, p), 2)}</td>
              <td>{fmt(priceBeforeDiscount(paid, p) - paid, 2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        A common mistake is to add the discount to the price paid: 25% of 60 is 15, but the original price is
        not 75. The 25% was taken from the original, so the original is 60 / 0.75 ={" "}
        {fmt(priceBeforeDiscount(60, 25))}.
      </p>

      <h2>Discount and sales tax</h2>
      <p>
        Both are multipliers, so the order does not change the final total: {TAX_PRICE} x{" "}
        {fmt(1 - TAX_OFF / 100)} x {fmt(1 + TAX / 100)} ={" "}
        {fmt(TAX_PRICE * (1 - TAX_OFF / 100) * (1 + TAX / 100), 2)}. The tax amount does change, because it is
        charged on a smaller price if the discount comes first. The calculator does not add tax; take the sale
        price it gives and multiply by 1 plus your rate.
      </p>

      <h2>Which percentage tool should I use?</h2>
      <ul>
        <li>
          <strong>This calculator</strong> for a shop price: sale price, saving, stacked coupons.
        </li>
        <li>
          <Link href="/percentage-decrease-calculator">Percentage decrease</Link> for any fall between two
          numbers, not only prices.
        </li>
        <li>
          <Link href="/percentage-calculator">Percentage calculator</Link> for X% of a number and other basic
          percentage questions.
        </li>
      </ul>

      <h2>What this calculator leaves out</h2>
      <p>
        It works on the price you type. It does not add sales tax or delivery, does not know about minimum
        spend or coupon rules, and shows results to two decimal places, so a shop&apos;s till may round a cent
        differently. It does not compare unit prices, such as price per kilogram, which is the fair way to
        compare two pack sizes. For a rise rather than a fall, use the{" "}
        <Link href="/percentage-increase-calculator">percentage increase calculator</Link>. The{" "}
        <Link href="/guides/percentage-formulas">guide to percentage formulas</Link> covers the common
        mistakes.
      </p>
    </ToolPage>
  );
}
