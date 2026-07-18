# Portfolio Master Implementation Plan

## Goal and confirmed decisions

This is the authoritative roadmap for completing, hardening, testing, and deploying the portfolio.

- **Primary deployment:** Vercel only
- **Lead delivery:** Existing WhatsApp flow, with calculator selections prefilled
- **Architecture:** React/Vite single-page app with anchor navigation (no router, no global state library)
- **Pricing:** Typed configuration so placeholder amounts can be reviewed without editing UI logic

## Current state (completed)

| Area | Status |
|------|--------|
| Hero, Experience, Projects, About, Skills, Services, Testimonials, Contact, GitHub Overview, Footer | Done |
| Header with mobile menu, scroll-spy, theme toggle | Done (theme persistence planned) |
| Lazy-loaded sections, Framer Motion animations | Done |
| Centralized content in `src/data/personalData.ts` | Done |
| Contact → WhatsApp deep link | Done |
| GitHub heatmap from static `public/github-data.json` | Done |
| Pricing Calculator | Planned (Phase 1–2) |
| Automated tests / CI | Planned (Phase 4) |

## Phase 0 — Baseline and production alignment

- Standardize `vite.config.ts`, `vercel.json`, `index.html`, `package.json`, and `README.md` around the canonical Vercel URL
- Remove GitHub Pages deploy path and stale metadata
- Add favicon; keep `public/resume.pdf` as the canonical resume
- Remove confirmed dead code after verifying no imports
- Baseline checks: lint, production build, preview smoke test

## Phase 1 — Typed pricing calculator MVP

- Add pricing interfaces to `src/types/index.ts`
- Add `src/data/pricingData.ts` (labels, prices, multipliers, currency, disclaimer)
- Build `src/components/PricingCalculator.tsx`
- Lazy-load before Contact in `src/App.tsx`
- Add Pricing to Header nav (desktop + mobile + scroll-spy)

## Phase 2 — Calculator-to-WhatsApp lead flow

- Lift quote state in `App.tsx`; pass formatted message into `Contact.tsx`
- CTA scrolls/focuses Contact without opening WhatsApp immediately
- User can edit the generated message; WhatsApp opens only on submit
- Phone number lives in one named configuration location
- Estimates are non-binding; arithmetic covered by tests

## Phase 3 — Navigation, content, and UI consistency

- Concise primary nav; secondary links for Skills / Testimonials / GitHub where needed
- Theme persistence via `localStorage` + `prefers-color-scheme`
- Graceful GitHub data fetch failure
- Dead code cleanup; no broad visual redesign

## Phase 4 — Automated quality gates

- Playwright config + smoke tests
- `npm test` / `npm run check` scripts
- GitHub Actions: lint, build, Playwright on PR and main

## Phase 5 — SEO, accessibility, performance, and launch

- Canonical URL, favicon, OG image, JSON-LD
- A11y audit, performance checks, README update
- Final desktop/mobile validation on Vercel

## Acceptance criteria

- Pricing totals come solely from typed configuration
- “Get Detailed Quote” prefills an editable Contact message; submit opens WhatsApp with encoded details
- Every visible section has an intentional navigation path
- Theme preference persists; GitHub failures degrade safely
- `npm run lint`, production build, automated tests, and CI succeed

## Safeguards

- Pricing figures remain provisional until business review
- Do not introduce EmailJS, React Router, a state library, or live client-side GitHub credentials
