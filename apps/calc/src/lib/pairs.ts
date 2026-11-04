/** Currency-pair pages. Each pair has its own copy: do not template a sentence across pairs. */
export interface Pair {
  slug: string;
  from: string;
  to: string;
  seoTitle: string;
  h1: string;
  description: string;
  blurb: string;
  lede: string;
  /** Short paragraphs about this specific pair. */
  about: string[];
  /** Typical reasons someone converts this pair. */
  uses: string[];
  faq: { q: string; a: string }[];
}

export const PAIRS: Pair[] = [
  {
    slug: "usd-to-inr",
    from: "USD",
    to: "INR",
    seoTitle: "USD to INR: 1 US Dollar to Indian Rupee Converter (Live)",
    h1: "USD to INR: US Dollar to Indian Rupee",
    description:
      "Convert US dollars to Indian rupees at live exchange rates. Instant USD to INR (dollar to rupee) calculator with common amounts and rate details.",
    blurb: "US dollars to Indian rupees at live rates, with the rupee shown in lakh and crore style.",
    lede: "Enter an amount in US dollars to see it in Indian rupees at the latest rate. Also answers the usual searches: 1 dollar to rupee, 100 dollars to rupees, and your dollar salary in rupees.",
    about: [
      "The US dollar (USD) and the Indian rupee (INR) are among the most searched currency pairs in the world, mostly because of money moving between the two countries: family remittances, salaries paid in dollars, student fees and imports.",
      "The rupee floats against the dollar, so the rate changes through the day and the figure you see here will differ slightly from a bank's quote. Rupee amounts are shown in the Indian grouping, where 1,00,000 is one lakh and 1,00,00,000 is one crore.",
    ],
    uses: [
      "Sending money to family in India, or receiving it.",
      "Converting a salary or freelance payment quoted in dollars. For that, use the USD salary to INR calculator, which also gives monthly and hourly pay.",
      "Estimating tuition, travel or shopping costs in dollars against a rupee budget.",
      "Checking an import or export price.",
    ],
    faq: [
      {
        q: "How do I convert USD to INR?",
        a: "Multiply the dollar amount by the USD to INR rate. If 1 dollar buys 90 rupees, then 100 dollars is 100 x 90 = 9,000 rupees. The converter above does this with the latest rate.",
      },
      {
        q: "What is 1 dollar in rupees today?",
        a: "The tile above shows today's rate, loaded live. 1 dollar to rupees is simply the rate itself.",
      },
      {
        q: "Why is the rate different from my bank or money transfer app?",
        a: "This page shows the mid-market rate, the midpoint between buying and selling prices. Banks and transfer services give you a less favourable rate or add a fee, so compare the amount that actually arrives.",
      },
      {
        q: "Is the dollar to rupee rate fixed?",
        a: "No. The rupee's value against the dollar changes continuously with the foreign exchange market.",
      },
      {
        q: "What is a lakh and a crore?",
        a: "A lakh is 100,000 and a crore is 10,000,000. They are written 1,00,000 and 1,00,00,000 in Indian grouping, which is how rupee amounts appear above.",
      },
    ],
  },
  {
    slug: "inr-to-usd",
    from: "INR",
    to: "USD",
    seoTitle: "INR to USD: Indian Rupee to US Dollar Converter (Live)",
    h1: "INR to USD: Indian Rupee to US Dollar",
    description:
      "Convert Indian rupees to US dollars at live exchange rates. Instant INR to USD (rupee to dollar) calculator with common amounts, including lakh and crore.",
    blurb: "Indian rupees to US dollars at live rates, from a few rupees to lakhs.",
    lede: "Enter an amount in Indian rupees, including lakh and crore sums, to see it in US dollars at the latest rate.",
    about: [
      "People convert rupees to dollars to plan study or travel in the United States, to price overseas software and services, to compare a rupee salary with a dollar one, and to see what a remittance or an investment is worth in dollars.",
      "Rupee amounts here are typed and shown in the Indian style, where 1,00,000 is one lakh and 1,00,00,000 is one crore. Type 100000 for one lakh. The dollar figure is the mid-market amount, before any bank or transfer fee.",
    ],
    uses: [
      "Estimating tuition, rent and living costs in the United States against a rupee budget.",
      "Pricing overseas subscriptions, software and online purchases billed in dollars.",
      "Comparing a rupee salary or a freelance rate with a dollar one.",
      "Checking what a rupee investment or a lump sum is worth in dollars.",
    ],
    faq: [
      {
        q: "How do I convert rupees to dollars?",
        a: "Divide the rupee amount by the USD to INR rate, or multiply it by the INR to USD rate. If 1 dollar is 90 rupees, then 9,000 rupees is 9,000 / 90 = 100 dollars. The converter does this with the live rate.",
      },
      {
        q: "How many dollars is one lakh rupees?",
        a: "One lakh is 100,000 rupees. Enter 100000 above to see the dollar amount at today's rate. It changes through the day because the rupee floats against the dollar.",
      },
      {
        q: "What is the difference between INR to USD and USD to INR?",
        a: "They are the same exchange rate read in opposite directions. If 1 dollar buys 90 rupees, 1 rupee buys 1 / 90, about 0.0111 dollars. Use the swap button to flip the pair.",
      },
      {
        q: "Why does my bank give me fewer dollars?",
        a: "The page shows the mid-market rate. Banks and transfer services use a rate with their margin built in, and may add a fee, so the dollars you receive are lower. Compare the final amount, not the headline rate.",
      },
      {
        q: "Is the rate updated live?",
        a: "It is loaded from a public rates feed when you open the page. These feeds publish about once a day, and the date of the rates is shown under the result.",
      },
    ],
  },
  {
    slug: "gbp-to-inr",
    from: "GBP",
    to: "INR",
    seoTitle: "GBP to INR: British Pound to Indian Rupee Converter",
    h1: "GBP to INR: British Pound to Indian Rupee",
    description:
      "Convert British pounds to Indian rupees at live exchange rates. Instant GBP to INR (pound to rupee) calculator with common amounts.",
    blurb: "Pounds sterling to Indian rupees at live rates.",
    lede: "Enter an amount in pounds sterling to see it in Indian rupees at the latest rate.",
    about: [
      "The British pound (GBP), or pound sterling, is the currency of the United Kingdom. The pound is divided into 100 pence and written with the symbol £.",
      "GBP to INR is searched mainly by people in India and in the UK who send money, pay fees or compare salaries. The rate moves with both the pound and the rupee, so the figure below is live.",
    ],
    uses: [
      "Remittances between the UK and India.",
      "Paying UK university fees or accommodation from India.",
      "Converting a UK salary into rupees to compare a job offer.",
      "Pricing goods bought from UK shops.",
    ],
    faq: [
      {
        q: "How do I convert pounds to rupees?",
        a: "Multiply the number of pounds by the GBP to INR rate. At a rate of 110, 50 pounds is 50 x 110 = 5,500 rupees.",
      },
      {
        q: "Does the pound go up and down against the rupee every day?",
        a: "Yes. Both currencies float, so the pound to rupee rate changes through the day. This page loads the latest available rate when you open it.",
      },
      {
        q: "Is the rate shown the one my bank will give me?",
        a: "Usually not. This is the mid-market rate. Banks and money transfer services build a margin or fee into theirs, so the amount you receive will be lower.",
      },
      {
        q: "How do I convert rupees to pounds?",
        a: "Press the swap button to reverse the pair, or divide the rupee amount by the GBP to INR rate.",
      },
    ],
  },
  {
    slug: "eur-to-inr",
    from: "EUR",
    to: "INR",
    seoTitle: "EUR to INR: Euro to Indian Rupee Converter (Live Rate)",
    h1: "EUR to INR: Euro to Indian Rupee",
    description:
      "Convert euros to Indian rupees at live exchange rates. Instant EUR to INR (euro to rupee) calculator with common amounts and the current rate.",
    blurb: "Euros to Indian rupees at live rates.",
    lede: "Enter an amount in euros to see it in Indian rupees at the latest rate.",
    about: [
      "The euro (EUR) is the shared currency of most European Union countries, so one rate covers payments to and from many of them. The symbol is €.",
      "EUR to INR is searched by people in India paying European suppliers, tuition or travel costs, and by Europeans sending money or buying from Indian businesses.",
    ],
    uses: [
      "Paying tuition, rent or travel costs in euro countries from India.",
      "Importing from or exporting to the euro area.",
      "Comparing a European salary with a rupee salary.",
      "Planning a trip across several euro countries on a rupee budget.",
    ],
    faq: [
      {
        q: "How do I convert euros to rupees?",
        a: "Multiply the euro amount by the EUR to INR rate. At a rate of 100, 20 euros is 20 x 100 = 2,000 rupees.",
      },
      {
        q: "Which countries use the euro?",
        a: "Most European Union members. A few EU countries still use their own currencies, and some non-EU countries use the euro too, so check the country before assuming.",
      },
      {
        q: "Why is the rate I get at a currency counter lower?",
        a: "Counters and cards use a retail rate that includes their margin. The mid-market rate shown here is the benchmark to compare against.",
      },
      {
        q: "How do I convert rupees to euros?",
        a: "Use the swap button, or divide the rupee amount by the EUR to INR rate.",
      },
    ],
  },
  {
    slug: "cad-to-inr",
    from: "CAD",
    to: "INR",
    seoTitle: "CAD to INR: Canadian Dollar to Indian Rupee Converter",
    h1: "CAD to INR: Canadian Dollar to Indian Rupee",
    description:
      "Convert Canadian dollars to Indian rupees at live exchange rates. Instant CAD to INR calculator with common amounts and the current rate.",
    blurb: "Canadian dollars to Indian rupees at live rates.",
    lede: "Enter an amount in Canadian dollars to see it in Indian rupees at the latest rate.",
    about: [
      "The Canadian dollar (CAD) is the currency of Canada, written with a dollar sign and often marked C$ or CA$ to separate it from the US dollar.",
      "CAD to INR is searched by students and workers in Canada sending money home, by families paying Canadian fees from India, and by people comparing Canadian pay with Indian pay.",
    ],
    uses: [
      "Sending part of a Canadian paycheck to family in India.",
      "Paying Canadian college tuition from rupee savings.",
      "Converting a Canadian job offer into rupees.",
      "Estimating the rupee cost of an item priced in Canadian dollars.",
    ],
    faq: [
      {
        q: "How do I convert Canadian dollars to rupees?",
        a: "Multiply the CAD amount by the CAD to INR rate. At a rate of 65, 200 Canadian dollars is 200 x 65 = 13,000 rupees.",
      },
      {
        q: "Is a Canadian dollar the same as a US dollar?",
        a: "No. They are separate currencies with different values, so a CAD amount and a USD amount are not interchangeable. Pick CAD as the source currency here.",
      },
      {
        q: "Why does the rate differ from the one I get when I send money?",
        a: "The page shows the mid-market rate. Transfer services quote a rate with their margin included, and may add a fee, so compare the final amount received.",
      },
      {
        q: "How do I convert rupees to Canadian dollars?",
        a: "Press swap to reverse the pair, or divide the rupee amount by the CAD to INR rate.",
      },
    ],
  },
  {
    slug: "aud-to-inr",
    from: "AUD",
    to: "INR",
    seoTitle: "AUD to INR: Australian Dollar to Indian Rupee Converter",
    h1: "AUD to INR: Australian Dollar to Indian Rupee",
    description:
      "Convert Australian dollars to Indian rupees at live exchange rates. Instant AUD to INR calculator with common amounts and the current rate.",
    blurb: "Australian dollars to Indian rupees at live rates.",
    lede: "Enter an amount in Australian dollars to see it in Indian rupees at the latest rate.",
    about: [
      "The Australian dollar (AUD) is the currency of Australia, and is also used by a few Pacific island nations. It is often written A$ to separate it from other dollars.",
      "AUD to INR is searched by people in Australia sending money to India, by students paying fees, and by families budgeting for a move or a trip between the two countries.",
    ],
    uses: [
      "Remittances from Australia to India.",
      "Paying Australian university fees from India.",
      "Comparing an Australian salary with an Indian one.",
      "Planning travel or study costs in rupees.",
    ],
    faq: [
      {
        q: "How do I convert Australian dollars to rupees?",
        a: "Multiply the AUD amount by the AUD to INR rate. At a rate of 60, 500 Australian dollars is 500 x 60 = 30,000 rupees.",
      },
      {
        q: "Is the Australian dollar the same as the US dollar?",
        a: "No. They are different currencies with different values. Select AUD as the source currency to convert Australian dollars.",
      },
      {
        q: "Is this the rate I will get from a bank?",
        a: "Usually not. This is the mid-market rate, a neutral benchmark. A bank or transfer service uses a rate with its margin, and may charge a fee.",
      },
      {
        q: "How do I convert rupees to Australian dollars?",
        a: "Use the swap button, or divide the rupee amount by the AUD to INR rate.",
      },
    ],
  },
  {
    slug: "aed-to-inr",
    from: "AED",
    to: "INR",
    seoTitle: "AED to INR: UAE Dirham to Indian Rupee Converter",
    h1: "AED to INR: UAE Dirham to Indian Rupee",
    description:
      "Convert UAE dirhams to Indian rupees at live exchange rates. Instant AED to INR calculator for remittances, salaries and travel, with common amounts.",
    blurb: "UAE dirhams to Indian rupees at live rates.",
    lede: "Enter an amount in UAE dirhams to see it in Indian rupees at the latest rate.",
    about: [
      "The United Arab Emirates dirham (AED) is the currency of the UAE. It has been pegged to the US dollar at about 3.6725 dirhams per dollar since 1997, so AED to INR moves almost exactly with USD to INR.",
      "Many people in the UAE send part of their pay to India, which is why AED to INR is one of the most searched remittance pairs. Rupee amounts here use Indian grouping, with lakh and crore.",
    ],
    uses: [
      "Monthly remittances from the UAE to India.",
      "Converting a UAE salary or job offer into rupees.",
      "Pricing a purchase made in dirhams against a rupee budget.",
      "Budgeting for a trip between India and the UAE.",
    ],
    faq: [
      {
        q: "How do I convert dirhams to rupees?",
        a: "Multiply the dirham amount by the AED to INR rate. At a rate of 25, 2,000 dirhams is 2,000 x 25 = 50,000 rupees.",
      },
      {
        q: "Why does AED to INR follow USD to INR?",
        a: "Because the dirham is pegged to the US dollar at a fixed rate, a move in the dollar against the rupee moves the dirham against the rupee almost one for one.",
      },
      {
        q: "Is this the rate exchange houses use?",
        a: "Not exactly. This is the mid-market rate. Exchange houses and apps quote their own rate and may charge a fee, so compare the rupees actually received.",
      },
      {
        q: "How do I convert rupees to dirhams?",
        a: "Press swap to reverse the pair, or divide the rupee amount by the AED to INR rate.",
      },
    ],
  },
];

export const pairBySlug = (slug: string): Pair | undefined => PAIRS.find((p) => p.slug === slug);
