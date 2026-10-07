---
title: 'Seven security basics every business website should have'
description: 'Most attacks on small business websites are automated. These seven measures close the doors they look for — no enterprise budget required.'
lang: en
translationKey: website-security-basics
author: Marketixo
pubDate: 2026-09-30
categories: [cybersecurity, web-development]
tags: [security headers, CSP, WordPress, forms]
---

“Who would want to hack our website?” is a question we hear often. The honest answer: usually nobody in particular. Most attacks are run by bots that scan the internet around the clock for known weaknesses — an outdated plugin, an exposed admin page, a form that accepts anything. They don't care how big your business is.

The good news is that the basics stop most of it. Here are seven we put in place on every project.

## 1. Keep everything updated — and remove what you don't use

Outdated software is the most common way in. That includes the CMS core, plugins, themes and the libraries your site depends on. Apply security updates promptly, and delete plugins and themes you no longer use: deactivated code can still be vulnerable.

## 2. HTTPS everywhere, enforced

A valid TLS certificate is free and standard. Make sure every request is redirected to HTTPS and add **HSTS** (`Strict-Transport-Security`) so browsers never fall back to an unencrypted connection.

## 3. Security headers

A handful of HTTP response headers make whole classes of attacks much harder:

- `Content-Security-Policy` — limits where scripts, styles and frames may load from.
- `X-Content-Type-Options: nosniff` — stops browsers guessing file types.
- `Referrer-Policy` — controls what your URLs reveal to other sites.
- `frame-ancestors` (in CSP) or `X-Frame-Options` — prevents your pages being embedded for clickjacking.
- `Permissions-Policy` — switches off browser features you don't use, such as camera or microphone.

Most shared hosting lets you set these in `.htaccess`. You can check your site with a free header scanner in a few seconds.

## 4. Treat every form as an entry point

Contact forms are a favourite target for spam and injection attempts. Validate every field on the **server** (client-side checks are for convenience only), limit input lengths, prevent email header injection, and add spam protection: a honeypot field, a minimum fill time and per-IP rate limiting stop most bots without annoying real users.

## 5. Protect the admin area

Use unique, long passwords and two-factor authentication for every admin account. Limit login attempts, don't use “admin” as a username, and give people only the permissions they need. If possible, restrict the admin area to known IP addresses.

## 6. Keep secrets out of the code

API keys, database passwords and SMTP credentials don't belong in your repository or in JavaScript sent to the browser. Store them in server-side configuration outside the web root, and rotate them if they have ever been exposed.

## 7. Backups you have actually restored

Automatic, off-site backups of files and database — and a restore you have tested at least once. A backup you have never restored is a hope, not a plan.

## Where to start

If you do nothing else this week: update everything, check your security headers and enable two-factor authentication. Then work through the rest of the list. And if you'd like a second pair of eyes, a short security assessment will tell you exactly where you stand.
