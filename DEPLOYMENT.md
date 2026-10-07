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
   - the inbox that receives requests (e.g. `hello@marketixo.com`)
   - a sender mailbox for the form (e.g. `no-reply@marketixo.com`).
   Sending *from* your own domain is what keeps form emails out of spam.
4. **Email authentication** — *cPanel → Email Deliverability*: make sure SPF and DKIM show
   valid. Add a DMARC record (e.g. `v=DMARC1; p=quarantine; rua=mailto:hello@marketixo.com`).
5. **Form configuration (secrets stay off the web)** — upload
   `deploy/mx-config.example.php` to your **home directory, one level above `public_html`**,
   rename it to `mx-config.php`, and set `mail_to` / `mail_from`:

   ```
   /home/<cpanel-user>/mx-config.php      ← here
   /home/<cpanel-user>/public_html/        ← website
   ```

## 2a. Deploy automatically (recommended)

1. Push this project to a GitHub repository.
2. *cPanel → FTP Accounts* → create an account (e.g. `deploy@marketixo.com`) whose directory
   is your home folder. Under *Configure FTP Client* note the server name.
3. GitHub → *Settings → Secrets and variables → Actions*:
   - **Secrets:** `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`
   - **Variables (optional):** `PUBLIC_SITE_URL`, `PUBLIC_GA4_ID`, `PUBLIC_GTM_ID`,
     `PUBLIC_META_PIXEL_ID`, `PUBLIC_GSC_VERIFICATION`, `FTP_SERVER_DIR`
     (default `./public_html/`; use `./` if the FTP account's root *is* public_html)
4. Every push runs type checks, the build, static QA and Playwright tests. Pushes to `main`
   deploy over **FTPS**. Only changed files are uploaded.

**Staging first?** Create a subdomain (e.g. `staging.marketixo.com`), point a second workflow
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

## 3. After the first deploy

- [ ] `https://marketixo.com/` redirects to `/en/` (or `/de/`, `/it/`, `/sq/` by browser language)
- [ ] `http://` and `www.` redirect to `https://marketixo.com`
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
