# Chernor Sulaiman Jalloh — Portfolio

A modern, responsive personal portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Deployed on **Vercel**.

**Live site:** https://portfolio-two-amber-40.vercel.app/

## Features

- Sectioned single-page layout (Hero, Experience, Projects, About, Skills, Services, Testimonials, Pricing Calculator, Contact, GitHub Overview)
- Dark/light theme with `localStorage` persistence and system preference fallback
- Interactive pricing calculator with typed configuration and WhatsApp quote handoff
- Contact form that opens a prefilled WhatsApp conversation
- GitHub contribution snapshot from static JSON
- Lazy-loaded sections, responsive layout, reduced-motion friendly animations
- Playwright smoke tests and GitHub Actions CI

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons
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
| Bio, experience, projects, skills, services, testimonials, socials | `src/data/personalData.ts` |
| Pricing options, add-ons, timelines, currency, disclaimer | `src/data/pricingData.ts` |
| WhatsApp phone number | `WHATSAPP_PHONE` in `src/data/pricingData.ts` |
| Site URL constant | `SITE_URL` in `src/data/pricingData.ts` |
| Resume download | `public/resume.pdf` |
| Project / profile images | `public/images/` |
| GitHub snapshot | `public/github-data.json` |

### Pricing notes

Amounts in `pricingData.ts` are **provisional placeholders**. Review and adjust before treating calculator output as official rates. Estimates are labeled non-binding in the UI and in generated quote messages.

### Refreshing GitHub data

1. Query the GitHub GraphQL API for your user contributions + repositories (same shape as the existing JSON).
2. Replace `public/github-data.json`.
3. Rebuild / redeploy. If the file is missing or invalid, the GitHub section shows a graceful fallback with a profile link.

## Contact flow

1. Optionally configure an estimate in **Pricing** and click **Get Detailed Quote**.
2. The Contact message field is prefilled (editable).
3. Submit opens `https://wa.me/<WHATSAPP_PHONE>?text=...` with name, email, and message encoded.

EmailJS is intentionally not used.

## Deployment (Vercel)

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- SPA fallback configured in `vercel.json`
- `vite.config.ts` uses `base: '/'` for the Vercel root deploy

Connect the GitHub repository to Vercel and deploy from `main`/`master`. Preview deployments are created automatically for pull requests.

## License

MIT
