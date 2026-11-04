/**
 * State income tax on wages for 2026, for the states where one number is honest:
 * the nine with no tax on wages and the fifteen with a single flat rate.
 * Source: Tax Foundation, State Individual Income Tax Rates and Brackets for 2026,
 * https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/ (checked 4 Nov 2026).
 * The other states use graduated rates and local taxes vary, so those are typed in by the user.
 */
export interface StateRate {
  name: string;
  /** Flat rate in percent; 0 for no tax on wages. */
  percent: number;
}

export const NO_TAX_STATES: StateRate[] = [
  "Alaska",
  "Florida",
  "Nevada",
  "New Hampshire",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Washington",
  "Wyoming",
].map((name) => ({ name, percent: 0 }));

export const FLAT_TAX_STATES: StateRate[] = [
  { name: "Arizona", percent: 2.5 },
  { name: "Colorado", percent: 4.4 },
  { name: "Georgia", percent: 5.19 },
  { name: "Idaho", percent: 5.3 },
  { name: "Illinois", percent: 4.95 },
  { name: "Indiana", percent: 2.95 },
  { name: "Iowa", percent: 3.8 },
  { name: "Kentucky", percent: 3.5 },
  { name: "Louisiana", percent: 3 },
  { name: "Michigan", percent: 4.25 },
  { name: "Mississippi", percent: 4 },
  { name: "North Carolina", percent: 3.99 },
  { name: "Ohio", percent: 2.75 },
  { name: "Pennsylvania", percent: 3.07 },
  { name: "Utah", percent: 4.5 },
];

export const STATES: StateRate[] = [...NO_TAX_STATES, ...FLAT_TAX_STATES].sort((a, b) =>
  a.name.localeCompare(b.name),
);
