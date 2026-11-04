# sites-lab

Source for a small family of free web-app sites on `*.streamerosai.com`, monetised with AdSense.
One monorepo holds the shared shell and every app; each app is published to its own repo because
GitHub Pages serves one site per repo.

```
packages/shell   layout, legal pages, SEO + JSON-LD helpers, AdSlot (renders nothing until configured)
apps/tools       tools.streamerosai.com  (JSON and Base64 tools, guides)
apps/calc        calc.streamerosai.com   (pay raise, salary, overtime, currency)
apps/images      images.streamerosai.com (compress, resize, convert images in the browser)
```

## Rules

- Web apps, not mass-produced articles. Each site is one useful tool set plus a few reviewed guides
  (5 to 10, at most two new guides a week). Every number or claim in a guide must be checkable.
- Tools run client-side; never send user input to a server.
- Ads only after AdSense approval: set `ADSENSE_CLIENT` and the slot variables; until then no ad
  markup is emitted.
- Add a site only after the previous one is indexed and showing impressions.

## Commands

```bash
npm install
npm run dev:tools     # http://localhost:3010
npm run build:tools   # static export -> apps/tools/out
```

## Deploy (per app)

`.github/workflows/deploy-<app>.yml` builds the app and force-pushes `out/` to
`Yaseenyk/site-<app>-yk` (`gh-pages` branch). Repo-level config:

| Name | Kind | Purpose |
|---|---|---|
| `SITES_DEPLOY_TOKEN` | secret | fine-grained token, Contents read/write on the `site-*-yk` repos |
| `TOOLS_CONTACT_EMAIL` | variable | address shown on the Contact page |
| `ADSENSE_CLIENT` | variable | `ca-pub-...`, set after approval |
| `TOOLS_ADSENSE_SLOT_CONTENT` | variable | in-content ad unit id |

DNS (GoDaddy): `CNAME tools -> yaseenyk.github.io`. Each site repo: Pages source = `gh-pages`
branch, custom domain from the `CNAME` file, Enforce HTTPS.

## Adding a site

1. Copy `apps/tools` to `apps/<name>`, change `site.ts`, `public/CNAME`, the tools and guides.
2. Copy the workflow, change the paths, app name and target repo.
3. Create `Yaseenyk/site-<name>-yk`, add the CNAME at GoDaddy, then verify in Search Console.
