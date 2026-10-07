---
title: 'Multilingual websites that rank: URLs, hreflang and real translations'
seoTitle: 'Multilingual SEO: URLs, hreflang and translations done right'
description: 'A practical guide to building a multilingual website that search engines understand — URL structure, hreflang, language switching and localized content.'
lang: en
translationKey: multilingual-website-seo
author: Marketixo
pubDate: 2026-10-07
categories: [seo, web-development]
tags: [hreflang, international SEO, localization]
---

Adding a second language to a website looks simple: translate the pages, add a flag in the header, done. In practice, multilingual sites are where we see some of the most avoidable SEO problems — pages competing with each other, the wrong language showing up in search results, and visitors bounced back to the home page when they switch language.

Here is how to get the foundations right.

## 1. Give every language its own URL

Search engines index URLs, not sessions. If your German content only appears after a visitor clicks a switcher, and the address stays the same, Google will usually only ever see one language.

The three common structures are:

| Structure | Example | Notes |
| --- | --- | --- |
| Subdirectory | `example.com/de/` | Simple, shares the domain's authority. Our default choice. |
| Subdomain | `de.example.com` | Works, but is treated more like a separate site. |
| Country domain | `example.de` | Strong local signal, but more domains to run and build authority for. |

For most businesses, **subdirectories** are the best balance. Keep the structure consistent: every language in its own folder, including the default one, or the default at the root and the others in folders — but not a mix.

## 2. Localize the URLs, not just the text

`/de/leistungen/webentwicklung/` reads naturally to a German visitor and contains the words they search for. `/de/services/web-development/` does not. Localized slugs are a small detail that helps both click-through and relevance.

## 3. Connect the versions with hreflang

`hreflang` tells search engines which pages are translations of each other, so they show the right version to the right person. Each page lists **every** language version, **including itself**, plus an `x-default` for visitors whose language you don't serve:

```html
<link rel="alternate" hreflang="en" href="https://example.com/en/services/seo/" />
<link rel="alternate" hreflang="de" href="https://example.com/de/leistungen/seo/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/services/seo/" />
```

The most common mistakes we fix:

- **Missing return links.** If the English page points to the German one, the German page must point back. Otherwise the annotation is ignored.
- **Pointing to pages that don't exist.** If an article hasn't been translated, don't add an `hreflang` for it.
- **Canonicals that cross languages.** Each language version should be canonical to itself — never to the English original.

## 4. Make the language switcher map to the same page

A visitor reading your SEO service page in English who switches to Italian should land on the Italian SEO page — not the Italian home page. It sounds obvious, but many plugins and themes get it wrong. If a page has no translation, send people to the closest parent section, not to the start.

Remember the choice, too: a small first-party cookie lets you send returning visitors straight to their language.

## 5. Translate the metadata

Titles, meta descriptions, image alt texts, Open Graph tags and structured data all need translating. A German page with an English `<title>` looks careless in search results and performs worse.

## 6. Localize, don't just translate

Machine translation is a useful draft, not a finished page. Different markets search with different words — sometimes completely different concepts. Do keyword research per language, adapt examples and references, and have a native speaker edit the result. Keep a short glossary so key terms stay consistent across the site.

## A quick checklist

- [ ] Every language has its own, crawlable URL
- [ ] Slugs are localized
- [ ] `hreflang` on every page, with return links and `x-default`
- [ ] Self-referencing canonicals per language
- [ ] Switcher maps to the equivalent page
- [ ] Titles, descriptions, alt texts and schema translated
- [ ] Sitemap lists all language versions
- [ ] Content reviewed by native speakers

Getting these basics right is mostly a matter of building them in from the start. Retrofitting them later is possible — but always more work.
