# Marketixo website

Agency website for Marketixo. It's bilingual (English + German), built for SEO and set up to deploy to Namecheap shared hosting.

**Stack:** [Astro](https://astro.build) static site · plain CSS · self-hosted fonts · one PHP file for the contact form. There's no database and no CMS server, which keeps it fast, secure and cheap to host.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check + build into dist/
npm run preview    # serve the built site
```

> The contact form posts to `/api/contact.php`, so it only works once deployed to hosting with PHP (or with `php -S localhost:8000 -t dist` after a build).

## Before going live: replace placeholders

| What | Where |
| --- | --- |
| Domain | `astro.config.mjs` → `site`, and `src/config/site.ts` → `url` |
| Email, phone, WhatsApp, booking link, address, legal details, social links | `src/config/site.ts` (search for `TODO`) |
| Where form requests are sent | `public/api/contact.php` → `MAIL_TO`, `MAIL_FROM` |
| Portfolio descriptions, years, results | `src/data/work.ts` |
| Portfolio layout (tiles, showcase, index or cards) | `src/data/work.ts` → `workLayout`; compare them at `/work-layouts/` |
| Portfolio screenshots | run `npm run screenshots` (first time: `npx playwright install chromium`) → `public/work/` |
| Client logos | `public/clients/<key>.svg` or `.png`, named after each client's `key` in `src/data/work.ts`: `scidev`, `medicus`, `ir`, `finman`, `fintrade`, `albstar`, `implant-swiss`. They appear automatically on the Work page, the homepage and in the logo strip. For a white logo, set `logoBg` on that client. |
| Testimonials (hidden until added) | `src/data/work.ts` → `testimonials` |
| Your story / founder | `src/views/AboutPage.astro` |
| Legal texts | `src/views/LegalPage.astro`. **Have these checked**, especially the Impressum and privacy policy for the German market |

## Where things live

```
src/
  config/site.ts        Business details (contact, address, socials)
  i18n/ui.ts            Languages, localized URLs, UI translations
  data/services.ts      All 8 services: page copy, deliverables, FAQs (EN + DE)
  data/work.ts          Portfolio projects and testimonials
  content/blog/en|de/   Blog posts (Markdown)
  views/                Page templates shared by every language
  pages/                Routes (/ = English, /de/ = German)
  components/           Header, footer, forms, cards …
  styles/global.css     Design tokens (colours, fonts, spacing)
public/
  .htaccess             HTTPS, www→non-www, caching, security headers
  api/contact.php       Quote form handler (honeypot, time-trap, rate limit)
```

### Edit a service

Change the copy in `src/data/services.ts`. Each service has its own English and German slug, title, meta description, deliverables and FAQ. Pages, menus, the footer, the sitemap and structured data all update automatically.

### Write a blog post

Create `src/content/blog/en/my-post.md` (and optionally `src/content/blog/de/mein-artikel.md`):

```md
---
title: 'Post title'
description: 'Up to ~160 characters for Google.'
lang: en
translationKey: my-post        # same key in both languages links the translations
pubDate: 2026-10-05
tags: ['SEO']
---

Your content…
```

### Add a language (e.g. French)

Follow the steps at the top of `src/i18n/ui.ts`: add the locale, its URLs and its translations, add `fr` copy to each service, then copy `src/pages/de/` to `src/pages/fr/`.

## SEO built in

- A separate, indexable page for every service in every language, with localized URLs (`/services/seo/` ↔ `/de/leistungen/suchmaschinenoptimierung/`)
- `hreflang` + `x-default` on every page and in `sitemap.xml`
- Unique titles and meta descriptions, canonical URLs, Open Graph image
- JSON-LD structured data: Organization, Service, FAQ, Breadcrumbs, BlogPosting
- `robots.txt`, fast static HTML, self-hosted fonts, no render-blocking third parties

After launch, add the site to [Google Search Console](https://search.google.com/search-console) and submit `https://YOURDOMAIN/sitemap.xml`.

## Deploy to Namecheap

**One-time setup in cPanel**

1. Point the domain to your hosting and enable **SSL** (cPanel → SSL/TLS Status → Run AutoSSL).
2. Create the sender mailbox used by the form (e.g. `no-reply@marketixo.com`) under **Email Accounts**.
3. Optionally create an **FTP account** for automatic deploys.

**Option A: manual upload**

1. `npm run build`
2. Upload the **contents** of `dist/` (including the hidden `.htaccess`) into `public_html/` using cPanel File Manager or an FTP client such as FileZilla.

**Option B: automatic deploy from GitHub**

`.github/workflows/deploy.yml` builds every push and deploys `main` over FTPS. Add these repository secrets: `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD`. If your FTP account's root is already `public_html`, change `server-dir` to `./`.

## Later ideas

- Privacy-friendly analytics (Plausible, Umami, or GA4 with a cookie banner)
- Real case studies with numbers; industry landing pages (e.g. "Web design for restaurants")
- Google Business Profile + reviews
