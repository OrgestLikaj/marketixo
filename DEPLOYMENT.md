# Deploying to Namecheap

The site is a folder of static files (`dist/`) plus one PHP script for the contact form, so it
runs on **every Namecheap shared hosting plan** (Stellar, Stellar Plus, Stellar Business) — no
Node.js runtime, database or extra services needed.

## 1. One-time setup in cPanel

1. **Domain & SSL** — point the domain to the hosting, then *cPanel → SSL/TLS Status → Run
   AutoSSL*. Wait until `https://` works before going further (the `.htaccess` forces HTTPS and
   sends HSTS).
2. **PHP version** — *cPanel → Select PHP Version*: choose **PHP 8.1 or newer**.
3. **Mailboxes** — *cPanel → Email Accounts*: create
   - the inbox that receives requests (e.g. `info@marketixo.eu`)
   - a sender mailbox for the form (e.g. `no-reply@marketixo.eu`).
   Sending *from* your own domain is what keeps form emails out of spam.
4. **Email authentication** — *cPanel → Email Deliverability*: make sure SPF and DKIM show
   valid. Add a DMARC record (e.g. `v=DMARC1; p=quarantine; rua=mailto:info@marketixo.eu`).
5. **Form configuration (secrets stay off the web)** — upload
   `deploy/mx-config.example.php` to the folder **one level above the site's web root**,
   rename it to `mx-config.php`, and set `mail_to` / `mail_from`.

   **marketixo.eu is an addon domain** — its web root is `~/marketixo.eu`, not `public_html`:

   ```
   /home/whitxqbc/mx-config.php           ← here
   /home/whitxqbc/marketixo.eu/           ← website (web root of marketixo.eu)
   ```

   (For a primary domain the web root would be `~/public_html` — same rule, one level above.)

## 2a. Deploy automatically (recommended)

1. Push this project to a GitHub repository.
2. *cPanel → FTP Accounts* → create an account (e.g. `deploy@marketixo.eu`) whose
   **Directory is the site's web root: `marketixo.eu`** (cPanel pre-fills a subfolder such as
   `marketixo.eu/marketixo` — clear it; an FTP account is locked to its folder and can't reach
   the one above). Under *Configure FTP Client* note the server (`ftp.marketixo.eu`, explicit
   FTPS, port 21).
3. GitHub → *Settings → Secrets and variables → Actions*:
   - **Secrets:** `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`
   - **Variables (optional):** `PUBLIC_SITE_URL`, `PUBLIC_GA4_ID`, `PUBLIC_GTM_ID`,
     `PUBLIC_META_PIXEL_ID`, `PUBLIC_GSC_VERIFICATION`, `FTP_SERVER_DIR`
     — **`FTP_SERVER_DIR` = `./`** when the FTP account opens in the web root (as above);
     this is also the workflow default, so the variable is only needed to override it.
4. Every push runs type checks, the build, static QA and Playwright tests. Pushes to `main`
   deploy over **FTPS**. Only changed files are uploaded.

**Staging first?** Create a subdomain (e.g. `staging.marketixo.eu`), point a second workflow
or branch at its folder via `FTP_SERVER_DIR`, and set the variable `NOINDEX=true` so search
engines ignore it.

## 2b. Deploy manually

```bash
npm ci
npm run build
```

Upload the **contents** of `dist/` — including the hidden `.htaccess` — into `public_html/`
with *cPanel → File Manager* (upload a zip, then *Extract*) or an FTP client such as FileZilla
(enable "show hidden files").

## Google Search Console & Google Analytics

The sitemap is generated on every build at **https://marketixo.eu/sitemap.xml**. It lists every
page in all four languages, with `xhtml:link` alternates between translations, and `robots.txt`
points to it. Submit it only after the site is deployed to marketixo.eu (the GitHub Pages preview
is deliberately `noindex` and blocked in robots.txt).

**Search Console**

1. https://search.google.com/search-console → *Add property* → **Domain** → `marketixo.eu`.
2. Verify with the DNS TXT record Google shows (Namecheap → Domain List → Manage →
   Advanced DNS → Add new record → TXT, host `@`). A Domain property covers http/https and www.
   *Alternative:* a **URL-prefix** property (`https://marketixo.eu/`) with the HTML-tag method — put
   the token in the repository variable `PUBLIC_GSC_VERIFICATION` and redeploy.
3. *Sitemaps* → enter `sitemap.xml` → *Submit*.

**Google Analytics 4**

1. https://analytics.google.com → *Admin* → *Create property* → web stream for `https://marketixo.eu`.
2. Copy the **Measurement ID** (`G-…`) into the repository variable `PUBLIC_GA4_ID` and redeploy.
   GA4 loads only after a visitor accepts analytics cookies; the banner appears automatically
   once an ID is set. Form submissions are sent as the `generate_lead` event.
3. Optional: *Admin → Product links → Search Console links* to see search queries in GA4.
   (GA4 itself doesn't use the sitemap.)

## Preview on GitHub Pages

Every push to `marketixo-v2` publishes a preview to
**https://orgestlikaj.github.io/marketixo/v2/** (`.github/workflows/pages.yml`).

- It is built under the `/marketixo/v2` sub-path (`BASE_PATH`) and marked `noindex`.
- GitHub Pages can't run PHP, so the contact form shows an error there. `.htaccess` rules
  (redirects, security headers) don't apply on Pages either; test those on Namecheap.
- To build the same thing locally:
  `BASE_PATH=/marketixo/v2 PUBLIC_SITE_URL=https://orgestlikaj.github.io npm run build`
  (on Git Bash prefix `MSYS_NO_PATHCONV=1`), then `npx astro preview`.

## 3. After the first deploy

- [ ] `https://marketixo.eu/` redirects to `/en/` (or `/de/`, `/it/`, `/sq/` by browser language)
- [ ] `http://` and `www.` redirect to `https://marketixo.eu`
- [ ] Send a test request from `/en/contact/` — it arrives in `mail_to`; *Reply* goes to the visitor
- [ ] https://securityheaders.com shows A/A+; check https://pagespeed.web.dev for mobile + desktop
- [ ] `/sitemap.xml` and `/robots.txt` load; submit the sitemap in Google Search Console
- [ ] Cookie banner appears only after you set an analytics ID; reject loads nothing external
- [ ] Old Marketixo URLs (e.g. `/services/web-design/`) 301 to the new pages

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| 500 error on every page | A directive in `.htaccess` isn't allowed by the server. Comment out the `Header` lines one block at a time to find it (LiteSpeed accepts all of them on current Namecheap servers). |
| Form says "Something went wrong" | `mx-config.php` missing or wrong path; check `mail_from` exists. Errors are logged to `public_html/api/error_log`. |
| Form mails land in spam | Verify SPF/DKIM in *Email Deliverability*; `mail_from` must be on the same domain. |
| Old CSS/JS after deploy | HTML is never cached; hard-refresh once. Assets have hashed names, so stale files can't be served. |
| Fonts missing | Make sure the `_astro/` folder was uploaded completely. |

## Hosting needs at a glance

- Apache or LiteSpeed with `mod_rewrite`, `mod_headers` (standard on Namecheap)
- PHP ≥ 8.1 with `mail()` enabled (standard)
- ~15 MB disk space; no database
