# Bringing your content into the site

This guide explains how to export your Instagram content and exactly where each
asset goes. Photos are **self-hosted** (committed to the repo), never hot-linked
from Instagram — Instagram CDN URLs expire and would break later.

## 1. Export your Instagram content

You own the `@eyad.abuaqel` account, so use Instagram's official export (free,
full resolution, includes captions):

1. Instagram app → **Settings and privacy** → **Accounts Center**
2. **Your information and permissions** → **Download your information**
3. Choose **`eyad.abuaqel`** → **Some of your information** → select **Posts**,
   **Stories**, **Profile photo** (and **Reels** if relevant)
4. Format: **HTML or JSON**, Media quality: **High**, Date range: **All time**
5. Submit — Instagram emails a download link (can take minutes to a day)

The ZIP contains your original photos plus a `posts_*.json` (or HTML) with every
caption — useful for blog/testimonial text.

Then either commit the files into `public/images/` (see below) or share the ZIP
and I'll sort them in.

## 2. Where each asset goes

Place files under `public/images/<section>/` and prefer **`.webp`** (smaller).
The repo includes `convert-images.ps1` to batch-convert; I can also optimize them.

| Asset | Put it at | Recommended size | Used by |
| --- | --- | --- | --- |
| **Brand logo** (square, simple) | `public/logo.png` (replace) | 512×512 PNG, transparent | favicon (PNG fallback), apple-touch-icon |
| **Hero image** (therapist/clinic) | `public/hero-image.jpg` (replace) | ~1000×1000, 4:5 or square | `src/components/Hero.tsx` |
| **Social share image** | `public/hero-image.jpg` | 1200×630 | OG/Twitter cards in `index.html` |
| **Gallery photos** | `public/images/gallery/` | ~1200px wide | `src/components/Gallery.tsx` |
| **About / clinic photos** | `public/images/about/` | ~800px wide | `src/components/About.tsx` |
| **Case-study / before-after** | `public/images/portfolio/` | ~800px wide | `src/components/Portfolio.tsx` |
| **Blog post images** | `public/images/blog/` | ~1200px wide, 16:10 | `src/constants/translations.ts` (`blog.posts[].image`) |

Currently these sections point at `images.unsplash.com` placeholders. Once real
files exist, the `src=` values get swapped to `/images/...` paths.

## 3. Text worth pulling from captions

- **Bio / specialties** → Hero subtitle + About + the SEO description
- **Educational captions** → seeds for blog posts (`translations.ts → blog.posts`)
- **Contact details** (phone, hours, links) → verify against `src/constants/contact.ts`

## 4. Notes for a medical site

- **Patient photos / testimonials require explicit written consent** before
  publishing. Don't publish identifiable patients without it.
- The square brand favicon currently in use is `public/favicon.svg` (vector,
  matches the in-app logo). Replacing `logo.png` with a real square logo updates
  the PNG fallback and Apple touch icon.
