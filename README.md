# Chernor Sulaiman Jalloh — Portfolio

A responsive personal portfolio built with React, TypeScript, Vite and Tailwind CSS. Deployed on **Vercel**.

**Live site:** https://portfolio-two-amber-40.vercel.app/

## Features

- Home page: hero with a draggable ID badge on a lanyard, client strip, scroll-driven experience timeline, selected works, about and skills, services, testimonials, pricing calculator and contact
- A shorter phone version of the home page (below 640px) with a full-screen menu
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
| Phone home page | `src/components/mobile/MobileHome.tsx` |
| Pricing options, add-ons, timelines, currency, disclaimer | `src/data/pricingData.ts` |
| WhatsApp phone number | `WHATSAPP_PHONE` in `src/data/pricingData.ts` |
| Colours (light and dark) | CSS variables at the top of `src/index.css` |
| Resume download | `public/resume.pdf` |
| Project / profile images | `public/images/` |

### Pricing notes

Amounts in `pricingData.ts` are **provisional placeholders**. Review and adjust before treating calculator output as official rates. Estimates are labeled non-binding in the UI and in generated quote messages.

### Case-study placeholders

The Gloze Skincare and Nakam Gaming case studies show `[X]` placeholders in their **Outcome** stats. Replace them with real numbers in `src/pages/case-studies/`.

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
