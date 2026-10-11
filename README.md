# Chernor Sulaiman Jalloh — Portfolio

A responsive personal portfolio built with React, TypeScript, Vite and Tailwind CSS. Deployed on **Vercel**.

**Live site:** https://portfolio-two-amber-40.vercel.app/

## Features

- Home page: hero with a draggable ID badge on a lanyard, client strip, scroll-driven experience timeline (each role opens as the timeline reaches it), selected works, about and skills, services, testimonials, GitHub activity heatmap, pricing calculator and contact
- The same page on phones, with a full-screen menu and a phone layout for the hero; sections and cards slide in as you scroll
- Case-study pages for each project at `/work/<slug>`, with client-side routing
- Dark theme by default, with a light theme saved in `localStorage`
- Pricing calculator with a WhatsApp quote handoff, and a contact form that opens a prefilled WhatsApp chat
- Playwright smoke tests and GitHub Actions CI

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS (design tokens as CSS variables in `src/index.css`)
- Playwright (`@playwright/test`)
- Vercel (`vercel.json`)

## Getting started

```bash
npm install
npm run dev
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint (zero warnings) |
| `npm test` | Playwright tests |
| `npm run check` | Lint + build + test |

## Editing content

| What | Where |
|------|-------|
| Experience, projects, clients, skills, services, testimonials, socials, contact details | `src/data/personalData.ts` |
| Case-study pages | `src/pages/case-studies/` (routes in `src/App.tsx`) |
| GitHub heatmap and repositories | `public/github-data.json` |
| Pricing options, add-ons, timelines, currency, disclaimer | `src/data/pricingData.ts` |
| WhatsApp phone number | `WHATSAPP_PHONE` in `src/data/pricingData.ts` |
| Colours (light and dark) | CSS variables at the top of `src/index.css` |
| Resume download | `public/resume.pdf` |
| Project / profile images | `public/images/` |

### Pricing notes

Amounts in `pricingData.ts` are **provisional placeholders**. Review and adjust before treating calculator output as official rates. Estimates are labeled non-binding in the UI and in generated quote messages.

### Case-study placeholders

The Gloze Skincare and Nakam Gaming case studies show `[X]` placeholders in their **Outcome** stats. Replace them with real numbers in `src/pages/case-studies/`.

### Refreshing GitHub data

1. Query the GitHub GraphQL API for your contribution calendar and repositories (same shape as the existing JSON).
2. Replace `public/github-data.json`.
3. Rebuild / redeploy. The section shows the date range the snapshot covers; if the file is missing or invalid it shows a link to the GitHub profile instead.

## Contact flow

1. Optionally configure an estimate in **Pricing** and click **Request this quote**.
2. The Contact message field is prefilled (editable).
3. Submit opens `https://wa.me/<WHATSAPP_PHONE>?text=...` with name, email, and message encoded.

EmailJS is intentionally not used.

## Deployment (Vercel)

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- SPA fallback in `vercel.json`: any path without a file extension (such as `/work/airpay`) serves `index.html`
- `vite.config.ts` uses `base: '/'` for the Vercel root deploy

Connect the GitHub repository to Vercel and deploy from `main`/`master`. Preview deployments are created automatically for pull requests.

## License

MIT
