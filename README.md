# JO Painting & Pressure Washing — Landing Page

Next.js 16 landing page for a local pressure washing business (Newport County, RI).
Hero background video, before/after slider, results gallery with lightbox, service
cards, reviews, embedded Google Map, and a full premium UI polish (scroll-aware nav,
mobile overlay menu, image fade-ins, unified elevation system).

## Tech stack

- **Next.js 16** (App Router, Turbopack) — static prerendered page
- **React 19**
- **Tailwind CSS 4** + custom CSS in `app/globals.css`
- **motion** for animations
- **lucide-react** icons

## Local development

This project uses **pnpm** (via Corepack, bundled with Node ≥ 20):

```bash
corepack pnpm install
corepack pnpm dev
```

Open http://localhost:3000

## Production build

```bash
corepack pnpm build
corepack pnpm start
```

## Deploy to Vercel

The repo is deploy-ready with **zero configuration** — Vercel auto-detects Next.js.

1. Go to https://vercel.com/new
2. Import this GitHub repository (`Markayala13/pressure-`).
3. Framework preset: **Next.js** (auto-detected). Build command and output are inferred.
4. Click **Deploy**.

No environment variables are required.

### Notes

- Images are served from `public/img/` as optimized **WebP** (`next.config.mjs` sets
  `images.unoptimized: true`, so plain `<img>` tags are used — no Image Optimization needed).
- The hero background video lives in `public/` and autoplays muted + looped, with a
  WebP poster (`public/img/hero-poster.webp`) shown while it loads.
- `node_modules/`, `.next/`, and the local `ui-ux-pro-max-skill/` + `.claude/` tooling
  folders are gitignored and not deployed.
