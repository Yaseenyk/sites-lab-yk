# Engineering standards

Rules for every site in this monorepo. `npm run check:tools` enforces most of them and CI runs it on
every push and pull request.

## TypeScript

- `strict`, plus `noUncheckedIndexedAccess`, `noImplicitReturns`, `noUnusedLocals`,
  `noUnusedParameters`, `noFallthroughCasesInSwitch`.
- No `any` (lint error). Use `unknown` and narrow it.
- `import { type X }` for type-only imports.
- Shared types live next to their code; a type used by two apps moves into `packages/shell`.

## Next.js (App Router, static export)

- Server Components by default. Add `"use client"` only to a leaf that needs state or browser APIs
  (the tool widgets). Pages and layouts stay server-rendered.
- Everything must work with `output: "export"`: no API routes, no server actions, no runtime
  `headers()` or `cookies()`. Routes that emit files (`sitemap`, `robots`) set
  `export const dynamic = "force-static"`.
- Metadata through the Metadata API only: `pageMetadata()` per page, never hand-written `<head>`
  tags (the one exception is the analytics and AdSense scripts in the root layout, which must be
  plain scripts for Google's checkers to see them).
- Fonts via `next/font` (self-hosted at build, `display: swap`). No images without explicit
  dimensions. No layout shift: ad containers reserve their height.
- Each route has a canonical URL, a unique title (under about 60 characters) and description
  (under about 155), and JSON-LD built by the helpers in `packages/shell/src/seo.tsx`. Never
  hand-write JSON-LD in a page.
- `error.tsx` and `not-found.tsx` exist at the app root. Do not swallow errors silently; log with
  `console.error` or surface them in the UI.

## React

- Components are functions, props are typed with an inline or named interface, no default props
  objects. Hooks follow `react-hooks/exhaustive-deps` (an error here).
- Derive state instead of mirroring it: compute from inputs with `useMemo` rather than syncing with
  effects.
- Interactive controls are real `<button>` and `<label>` elements, keyboard reachable, with a visible
  focus ring. Status messages use `role="status"` and `aria-live="polite"`.
- No `dangerouslySetInnerHTML` outside the JSON-LD and ad/analytics components (lint warns).

## Styling

- Tailwind utilities first. Repeated patterns become a class in `@layer components` in
  `globals.css`, built with `@apply`, not copied utility strings.
- Design tokens (ink, cyan, purple, ice, zinc scale) live in `tailwind.config.ts` and mirror the
  portfolio. No hard-coded hex values in components.
- Dark theme only, matching the portfolio. Respect `prefers-reduced-motion`.
- Prettier with `prettier-plugin-tailwindcss` sorts classes; run `npm run format`.

## Privacy and security

- Tool input never leaves the browser: no `fetch`, XHR or beacon that carries user text. Analytics
  receives page-level events only.
- `target="_blank"` links need `rel="noopener noreferrer"` (lint error).
- No secrets in the repo. Configuration is `NEXT_PUBLIC_*` variables set in GitHub Actions
  variables; the deploy token is an Actions secret scoped to one repo.
- A static host cannot set response headers. If CSP or HSTS are required, put the domain behind a
  proxy that adds them.

## Content and SEO

- One search intent per page. Titles lead with the keyword; the H1 matches it.
- Every claim and number in a guide or FAQ is checkable. No invented statistics, testimonials or
  dates. `UPDATED` in `src/site.ts` changes only when the content genuinely does.
- Every tool page links to related tools; every guide links to its tool.
- Pace for guides: at most two new guides a week, each reviewed by a person before merge.

## Testing

- Pure logic (`src/lib`) has unit tests with Vitest. A bug fix adds a failing test first.
- Components that only wire UI to tested logic are covered by the production build and lint.

## Workflow

- Conventional commits (`feat(tools): ...`, `fix(shell): ...`). Small pull requests.
- Required before merge: `npm run check:tools` and `npm run build:tools` green (CI does both).
- Dependency updates arrive weekly through Dependabot; merge minor and patch groups after CI passes.
