# Chernor Sulaiman Jalloh — Portfolio

A responsive personal portfolio built with React, TypeScript, Vite and Tailwind CSS. Deployed on **Vercel**.

**Live site:** https://portfolio-two-amber-40.vercel.app/

## Features

- Home page: hero with a portrait card, client strip, selected work, scroll-driven experience timeline (each role opens as the timeline reaches it), about and skills, GitHub activity heatmap, testimonials, services, project brief builder and contact
- The same page on phones, with a full-screen menu and a phone layout for the hero; sections and cards slide in as you scroll
- Case-study pages for each project at `/work/<slug>`, with client-side routing
- App screenshots captured from the running apps at iPhone resolution, shown in an iPhone 16 Pro frame drawn in CSS (`src/components/ui/IPhone.tsx`)
- Dark theme by default, with a light theme saved in `localStorage`
- Project brief builder (no prices) that writes a ready-made message, and a contact form that opens it in a WhatsApp chat
- A one-page CV built from `cv/cv.html`
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
| `npm run cv` | Rebuild the CV PDF from `cv/cv.html` |

## Editing content

| What | Where |
|------|-------|
| Experience, projects, clients, skills, services, testimonials, socials, contact details, brief builder options | `src/data/personalData.ts` |
| Case-study pages | `src/pages/case-studies/` (routes in `src/App.tsx`) |
| GitHub heatmap and repositories | `public/github-data.json` |
| WhatsApp and phone number | `WHATSAPP_PHONE` in `src/data/personalData.ts` |
| The brief message template | `src/lib/brief.ts` |
| Colours (light and dark) | CSS variables at the top of `src/index.css` |
| CV (the Resume button) | Edit `cv/cv.html`, then `npm run cv` writes `public/Chernor-Sulaiman-Jalloh-CV.pdf` |
| Portrait and link-preview image | `public/images/portrait-*.webp`, `public/og.jpg` |
| App screenshots | `public/images/apps/` (see below) |

### App screenshots

Each screenshot in `public/images/apps/` is saved at two widths so the browser can pick the sharpest one:
`<name>-603.webp` and `<name>-1206.webp` for phone screens, `<name>-1200.webp` and `<name>-1920.webp` for
browser screens. Components refer to them by name (`airpay-home`, `learnme-courses`) through `src/lib/shots.ts`.

A phone screen must be a full iPhone 16 Pro screenshot, 1206 x 2622 pixels (402 x 874 points at 3x), status bar
included. The frame adds the bezel, Dynamic Island and buttons.

### Case-study numbers

Case studies only show numbers that are real. `Outcome` takes an optional `stats` list: add it to a case study
once there are figures to report.

### Refreshing GitHub data

1. Query the GitHub GraphQL API for your contribution calendar and repositories (same shape as the existing JSON).
2. Replace `public/github-data.json`.
3. Rebuild / redeploy. The section shows the date range the snapshot covers; if the file is missing or invalid it shows a link to the GitHub profile instead.

## Contact flow

1. Optionally pick a project type, features, timeline and stage in **Start a project** and click **Continue with this brief**.
2. The Contact message field is filled with the brief (editable).
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
