# Eyad Abu Aqel — Physiotherapy Clinic Website

A fast, multilingual marketing site for the Eyad Abu Aqel physiotherapy clinic
in Abu Sinan, built with React + Vite + TypeScript and Tailwind CSS.

## Features

- **5 languages** with full RTL/LTR support: Hebrew (default), English, Russian,
  Arabic, Greek — switched client-side and persisted across reloads.
- **Sections:** hero, services, portfolio, FAQ, about, gallery, testimonials,
  social proof, contact (with WhatsApp lead delivery), and a blog.
- **Accessibility:** WCAG-oriented features, skip link, high-contrast and
  reduced-motion support, accessibility widget.
- **Privacy & consent:** GTM Consent Mode v2 (Amendment 13 compliant) cookie
  banner and a privacy policy page.
- **SEO:** per-page metadata, Open Graph/Twitter cards, JSON-LD structured data
  (PhysiotherapyClinic + FAQPage), sitemap and robots.

## Tech stack

- React 19 + React Router 6
- Vite 6 (Terser-minified production build)
- Tailwind CSS 4
- `motion` for animations, `lucide-react` for icons

## Run locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev      # start dev server on http://localhost:3000
```

## Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the Vite dev server                    |
| `npm run build`   | Production build to `dist/`                  |
| `npm run preview` | Preview the production build locally         |
| `npm run lint`    | Type-check the project (`tsc --noEmit`)      |
| `npm run clean`   | Remove the `dist/` directory                 |

## Deployment

Configured for **Vercel** (see `vercel.json`), which builds with
`npm run build`, serves `dist/`, rewrites all routes to the SPA entry, and
applies the security headers (CSP, HSTS, X-Frame-Options, etc.).

## Configuration notes

- Analytics is wired for GA4 but disabled until a real Measurement ID is set in
  `src/components/Analytics.tsx` (currently the `G-XXXXXXXXXX` placeholder).
- The contact form delivers leads by opening a pre-filled WhatsApp chat; the
  destination number lives in `src/components/Contact.tsx`.
