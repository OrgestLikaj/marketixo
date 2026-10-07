# Marketixo — agency website

Multilingual (EN · DE · IT · SQ) website for Marketixo, a digital agency for web design and
development, branding, SEO, paid ads, social media, content, cybersecurity and software QA.

- **Static site** built with [Astro 7](https://astro.build) + TypeScript — plain HTML/CSS, ~1 KB (gzipped) of page JavaScript
- **Runs on any Namecheap shared hosting plan** (Apache/LiteSpeed + PHP for the contact form)
- **Real portfolio** — screenshots captured from the clients' live websites
- **SEO, accessibility, GDPR consent and security headers built in**, verified on every build

Deployment is documented separately in **[DEPLOYMENT.md](DEPLOYMENT.md)**.

---

## 1. Project structure

```
marketixo-site/
├─ astro.config.mjs          Site URL, self-hosted fonts, hash-based CSP, images
├─ public/
│  ├─ .htaccess              HTTPS, language redirect at "/", security headers, caching, legacy 301s
│  ├─ api/contact.php        Contact form handler (validation, spam + rate limiting)
│  ├─ og/default.png         Default social-sharing image
│  └─ favicon.*, icons, site.webmanifest
├─ deploy/mx-config.example.php   Server-side form config (copied outside public_html)
├─ docs/GLOSSARY.md          Terminology per language + voice rules
├─ scripts/
│  ├─ screenshot-work.mjs    Captures portfolio screenshots from live client sites
│  ├─ make-brand-assets.mjs  Generates favicons + OG image from the logo
│  ├─ check-site.mjs         Static QA of dist/ (runs automatically after build)
│  └─ qa-screens.mjs         Full-page screenshots at several widths for visual review
├─ src/
│  ├─ config/site.ts         ★ Company, contact, address, social, analytics (single source)
│  ├─ i18n/
│  │  ├─ config.ts           Languages
│  │  └─ routes.ts           ★ Localized URL segments and slugs
│  ├─ locales/<lang>/ui.ts   ★ Interface + fixed-page copy per language
│  ├─ content/               ★ Translatable long-form content (content collections)
│  │  ├─ services/<lang>/<service>.yaml
│  │  ├─ work/<lang>/<project>.yaml
│  │  ├─ insights/<lang>/<slug>.md
│  │  └─ legal/<lang>/{privacy,cookies,legal}.md
│  ├─ data/
│  │  ├─ projects.ts         ★ Portfolio facts (client, URL, services, stack, brand colour)
│  │  ├─ services.ts         Service keys, groups, icons
│  │  └─ testimonials.ts     Empty until real, approved quotes exist
│  ├─ assets/work/<project>/ Screenshots (desktop.jpg, mobile.jpg, page.jpg)
│  ├─ components/            Design-system components (see below)
│  ├─ layouts/BaseLayout.astro
│  ├─ lib/pages.ts           Page registry → router, hreflang, switcher, sitemap
│  ├─ lib/schema.ts          Schema.org JSON-LD builders
│  ├─ pages/
│  │  ├─ [lang]/[...slug].astro   One router for every localized page
│  │  ├─ [lang]/rss.xml.ts        RSS per language
│  │  ├─ index.astro              "/" (x-default language gateway)
│  │  ├─ 404.astro, sitemap.xml.ts, robots.txt.ts
│  ├─ scripts/               Client JS: reveal, consent/analytics, contact form
│  ├─ styles/global.css      Design tokens + base styles
│  └─ views/                 One template per page type
└─ tests/                    Playwright smoke tests (Chromium, Firefox, WebKit, mobile)
```

**Components:** Button, Container, Section, Heading, Badge, Logo, Icon, Breadcrumbs, Header,
Footer, LanguageSwitcher, PageHero, ServiceCard, ServiceVisual, ProjectCard, ProjectGrid,
BrowserFrame, PhoneFrame, Pipeline, ProcessSteps, TechGrid, Faq, Testimonial, ContactForm,
CookieConsent, CtaBand, Seo. Case studies are rendered by `views/ProjectView.astro`.

## 2. Technologies

| Area | Choice | Why |
| --- | --- | --- |
| Framework | Astro 7, TypeScript (strict) | Static HTML, zero JS by default, content collections with schema validation |
| Styling | Hand-written CSS with design tokens, scoped component styles | No framework weight, full control |
| Fonts | Inter Tight + JetBrains Mono via Astro Fonts API | Self-hosted at build time (no Google requests), metric-matched fallbacks |
| Images | `astro:assets` + sharp | Responsive AVIF/WebP `srcset`, lazy loading, explicit dimensions |
| Forms | PHP 8 handler | Works on every Namecheap plan, no third-party form service |
| Testing | Playwright, custom static checker | Cross-browser smoke tests + SEO/link/a11y checks on every build |
| CI/CD | GitHub Actions → FTPS | Build, test and deploy on push to `main` |

> **Why not Next.js?** The brief preferred Next.js, but Namecheap shared hosting has no
> reliable Node runtime. Astro outputs the same quality of React-free static HTML with less
> JavaScript, simpler hosting and better Core Web Vitals — the same reason the Marketixo and
> MK AluPlast sites already use it.

## 3. Installation

Requirements: **Node.js ≥ 22.12** (see `.nvmrc`).

```bash
npm install
cp .env.example .env        # optional — adjust domain / analytics IDs
npm run dev                 # http://localhost:4321
npm run build               # astro check + build + static QA → dist/
npm run preview             # serve dist/
npm test                    # Playwright smoke tests against the build
```

First run of the tests: `npx playwright install chromium firefox webkit`.

## 4. Environment variables

All variables are **public** build-time values (they end up in HTML). Secrets never go here —
the mail configuration lives in `mx-config.php` on the server.

| Variable | Example | Purpose |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | `https://marketixo.com` | Canonicals, hreflang, sitemap, OG URLs |
| `NOINDEX` | `true` | Staging: `noindex` on every page + `Disallow: /` in robots.txt |
| `PUBLIC_GA4_ID` | `G-XXXXXXX` | Google Analytics 4 (loads only after consent) |
| `PUBLIC_GTM_ID` | `GTM-XXXXXX` | Google Tag Manager (if set, load GA4 through GTM) |
| `PUBLIC_META_PIXEL_ID` | `1234567890` | Meta Pixel (marketing consent only) |
| `PUBLIC_GSC_VERIFICATION` | token | Google Search Console HTML-tag verification |

In GitHub Actions, set them as **repository variables** (see `.github/workflows/deploy.yml`).

## 5. Company details & placeholders

Edit **`src/config/site.ts`**. Empty values are hidden in the UI and shown as bracketed
placeholders on legal pages — `[COMPANY NAME]`, `[REGISTERED ADDRESS]`, `[EMAIL]`, `[PHONE]`,
`[VAT NUMBER]`, `[COMPANY REGISTRATION]` — together with a visible "template" notice, so nothing
goes live half-filled by accident. Once a street address is set, the Organization schema becomes
a `ProfessionalService` (LocalBusiness) automatically.

## 6. Add or edit a portfolio project

1. Add the facts to **`src/data/projects.ts`** (`key`, `client`, `url`, `services`, `categories`,
   `technologies`, `brand`, `order`, optional `featured` position on the home page and `group`).
2. Capture screenshots from the live site: `npm run screenshots -- <key>`
   (writes `src/assets/work/<key>/desktop.jpg|mobile.jpg|page.jpg`). Any extra image you drop in
   that folder is picked up as a gallery image.
3. Write the case study in **`src/content/work/<lang>/<key>.yaml`** for each language
   (industry, summary, overview, challenge, approach, design, development, result, highlights).
4. Measured results go in `results:` — **only real numbers the client agreed to publish.**
5. `npm run build` — the router, work page, filters, sitemap and hreflang update automatically.

**Client logos** live in `src/assets/clients/<key>.webp` (transparent, made for light backgrounds) and are
listed in `clientLogos` in `src/data/projects.ts`. Logos with a `project` link to that case study; the
others are shown as logo-only clients.

## 7. Add or edit translations

- **Interface and fixed pages:** `src/locales/<lang>/ui.ts`. Each language is typed against
  the English file, so a missing or misspelled key fails `npm run build`.
- **Services / case studies / articles / legal:** the matching file in `src/content/*/<lang>/`.
  Schemas in `src/content.config.ts` enforce structure and SEO length limits per language.
- **URLs:** localized segments and service slugs are in `src/i18n/routes.ts`. If you change a
  live URL, add a 301 in `public/.htaccess`.
- Keep terminology consistent with **`docs/GLOSSARY.md`**.
- **New language:** add it to `src/i18n/config.ts`, add its segments/slugs in `routes.ts`,
  create `src/locales/<lang>/ui.ts` and the content files, extend the root redirect in
  `.htaccess` and `LANGS` in `api/contact.php`.

## 8. Publish an article

Create `src/content/insights/<lang>/<slug>.md` — the file name is the URL slug:

```md
---
title: 'Headline'
seoTitle: 'Shorter title for search results (≤ 70)'   # optional
description: 'Meta description, ≤ 170 characters.'
lang: en
translationKey: my-article        # same key in every language → hreflang + switcher
author: Marketixo
pubDate: 2026-11-01
updatedDate: 2026-11-15           # optional
categories: [seo, web-development] # web-development | seo | digital-marketing | branding | cybersecurity | qa-testing
tags: [hreflang, international SEO]
ogImage: /og/my-article.png       # optional, 1200×630 in public/og/
canonical: https://…              # optional, only if first published elsewhere
draft: false
---

Markdown content…
```

Article pages get BlogPosting schema, Open Graph article tags, reading time, breadcrumbs,
category archives (`/en/insights/topic/seo/`), RSS (`/en/rss.xml`) and sitemap entries.
Translations are optional: untranslated articles simply have no hreflang alternate, and the
language switcher falls back to that language's Insights page.

## 9. SEO configuration

Built in and verified by `scripts/check-site.mjs` on every build:

- Unique `<title>` and meta description per page and language (schema-enforced lengths)
- Self-referencing canonical; `hreflang` for every translation **plus `x-default`**, with
  return links checked; `/` is the x-default language gateway
- Localized URLs (`/de/leistungen/webdesign-entwicklung/`), trailing slashes, 301s for old URLs
- `sitemap.xml` with `xhtml:link` alternates; `robots.txt`; RSS per language
- JSON-LD: Organization / ProfessionalService, WebSite, BreadcrumbList, Service + OfferCatalog,
  FAQPage, BlogPosting, CreativeWork (case studies), ItemList, AboutPage, ContactPage
- Open Graph + X cards; case studies get an OG image cropped from their screenshot
- Semantic HTML, one `<h1>` per page, alt text, internal linking between services ↔ work
- After launch: verify the domain in Google Search Console and submit `/sitemap.xml`

## 10. Final QA checklist

Automated (every build / CI run):

- [x] Type check (`astro check`), content schema validation in 4 languages
- [x] Static QA of every page: lang, single h1, title/description, canonical, hreflang
      reciprocity, broken internal links/assets, alt text, leftover placeholders, sitemap URLs
- [x] Playwright in Chromium, Firefox and WebKit: home pages per language, language switcher
      mapping + cookie, SEO tags + JSON-LD, work filter, form validation, service pre-selection,
      FAQ, cookie dialog, **no third-party requests before consent**, skip link, 404
- [x] Mobile (Pixel 7): menu dialog focus/Escape, no horizontal overflow
- [x] `npm audit` for production dependencies

Before go-live (manual):

- [ ] Fill in `src/config/site.ts` (legal entity, address, email, phone, VAT, socials)
- [ ] Have privacy policy, cookie policy and Impressum reviewed by a lawyer
- [ ] Review the case-study texts with each client (no metrics are claimed)
- [ ] Create `mx-config.php` on the server and send a test enquiry in each language
- [ ] Check https://securityheaders.com and Lighthouse on the live domain
- [ ] Test on real iOS Safari and Android Chrome; spot-check Edge
- [ ] Submit the sitemap in Google Search Console; set up GA4 / Ads only if needed
