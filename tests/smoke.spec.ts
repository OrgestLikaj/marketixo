import { expect, test } from '@playwright/test';

const langs = ['en', 'de', 'it', 'sq'] as const;
/** English lives at the root, the other languages under /de/, /it/, /sq/. */
const home = (lang: (typeof langs)[number]) => (lang === 'en' ? '/' : `/${lang}/`);

test.describe('home pages', () => {
  for (const lang of langs) {
    test(`${home(lang)} renders in ${lang}`, async ({ page }) => {
      await page.goto(home(lang));
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.getByRole('navigation', { name: /.+/ }).first()).toBeVisible();
      // Four language links in the header switcher
      await expect(page.locator('header .lang a')).toHaveCount(4);
    });
  }
});

test('language switcher keeps you on the equivalent page', async ({ page }) => {
  await page.goto('/services/web-design-development/');
  await page.locator('header .lang a[data-lang="de"]').click();
  await expect(page).toHaveURL(/\/de\/leistungen\/webdesign-entwicklung\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');

  await page.locator('header .lang a[data-lang="sq"]').click();
  await expect(page).toHaveURL(/\/sq\/sherbime\/dizajn-zhvillim-web\/$/);

  await page.goto('/it/progetti/medicus-center/');
  await page.locator('header .lang a[data-lang="en"]').click();
  await expect(page).toHaveURL(/:\d+\/work\/medicus-center\/$/);
});

test('language choice is remembered in a cookie', async ({ page, context }) => {
  await page.goto('/');
  await page.locator('header .lang a[data-lang="it"]').click();
  await expect(page).toHaveURL(/\/it\/$/);
  const cookies = await context.cookies();
  expect(cookies.find((c) => c.name === 'mx_lang')?.value).toBe('it');

  await page.locator('header .lang a[data-lang="en"]').click();
  await expect(page).toHaveURL(/:\d+\/$/);
  expect((await context.cookies()).find((c) => c.name === 'mx_lang')?.value).toBe('en');
});

test('English pages link to root URLs, never to /en/', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https?:\/\/[^/]+\/$/);
  await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', /^https?:\/\/[^/]+\/$/);
  const hrefs = await page.locator('a[href]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
  expect(hrefs.filter((h) => /^\/en(\/|$)/.test(h))).toEqual([]);
});

test('SEO tags: canonical, hreflang with return links, valid JSON-LD', async ({ page, request }) => {
  await page.goto('/services/seo/');
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  expect(canonical).toMatch(/^https?:\/\/[^/]+\/services\/seo\/$/);
  const alternates = page.locator('link[rel="alternate"][hreflang]');
  await expect(alternates).toHaveCount(5); // 4 languages + x-default
  const de = await page.locator('link[hreflang="de"]').getAttribute('href');
  const dePage = await request.get(new URL(de!).pathname);
  expect(dePage.ok()).toBeTruthy();
  expect(await dePage.text()).toContain(canonical!);

  const json = await page.locator('script[type="application/ld+json"]').first().textContent();
  const data = JSON.parse(json!);
  const types = data['@graph'].map((n: { '@type': string | string[] }) => [n['@type']].flat()).flat();
  expect(types).toEqual(expect.arrayContaining(['Organization', 'WebSite', 'BreadcrumbList', 'Service', 'FAQPage']));
});

test('work filter narrows the list', async ({ page }) => {
  await page.goto('/work/');
  const cells = page.locator('[data-cell]');
  const total = await cells.count();
  await page.getByRole('button', { name: /Healthcare/ }).click();
  await expect(page.getByRole('button', { name: /Healthcare/ })).toHaveAttribute('aria-pressed', 'true');
  const visible = await cells.evaluateAll((els) => els.filter((e) => !(e as HTMLElement).hidden).length);
  expect(visible).toBeGreaterThan(0);
  expect(visible).toBeLessThan(total);
});

test('contact form validates required fields before sending', async ({ page }) => {
  await page.goto('/contact/');
  await page.getByRole('button', { name: 'Send project request' }).click();
  await expect(page.locator('[data-summary]')).toBeVisible();
  await expect(page.locator('#project-form-name')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#project-form-name')).toBeFocused();

  await page.locator('#project-form-name').fill('Test Person');
  await page.locator('#project-form-email').fill('not-an-email');
  await page.getByRole('button', { name: 'Send project request' }).click();
  await expect(page.locator('#project-form-email-err')).not.toBeEmpty();
});

test('contact page lists both offices, localized', async ({ page }) => {
  await page.goto('/contact/');
  await expect(page.locator('[data-office="tirana"]')).toContainText('Tirana');
  await expect(page.locator('[data-office="vienna"]')).toContainText('Vienna');
  await page.goto('/de/kontakt/');
  await expect(page.locator('[data-office="vienna"]')).toContainText('Wien');
  await expect(page.locator('[data-office="vienna"]')).toContainText('Österreich');
});

test('contact details: email and WhatsApp', async ({ page }) => {
  await page.goto('/contact/');
  await expect(page.locator('a[href="mailto:info@marketixo.eu"]').first()).toBeVisible();
  await expect(page.locator('a[href^="https://wa.me/436705554057"]')).toHaveText(/\+43 670 5554057/);
  await expect(page.locator('input[name="contact_method"][value="whatsapp"]')).toHaveCount(1);
  await expect(page.locator('footer a[href="mailto:info@marketixo.eu"]')).toBeVisible();
});

test('service pre-selection from a service page link', async ({ page }) => {
  await page.goto('/contact/?service=seo');
  await expect(page.locator('input[name="services[]"][value="seo"]')).toBeChecked();
});

test('FAQ opens and closes', async ({ page }) => {
  await page.goto('/faq/');
  const first = page.locator('details').first();
  await first.locator('summary').click();
  await expect(first).toHaveAttribute('open', '');
});

test('cookie settings dialog opens from the footer', async ({ page }) => {
  await page.goto('/');
  await page.locator('footer [data-cookie-settings]').click();
  await expect(page.locator('[data-consent-dialog]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-consent-dialog]')).toBeHidden();
});

test('no third-party requests before consent', async ({ page }) => {
  const external: string[] = [];
  page.on('request', (r) => {
    const host = new URL(r.url()).host;
    if (!host.startsWith('localhost')) external.push(r.url());
  });
  await page.goto('/', { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  expect(external).toEqual([]);
});

test('skip link and images with alt text', async ({ page, browserName }) => {
  await page.goto('/work/');
  // WebKit doesn't tab to links by default (Safari's "Press Tab to highlight" setting).
  if (browserName === 'webkit') await page.locator('.skip-link').focus();
  else await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await expect(page.locator('.skip-link')).toBeInViewport();
  const missingAlt = await page.locator('img:not([alt])').count();
  expect(missingAlt).toBe(0);
});

test('404 page in the visitor’s language', async ({ page }) => {
  await page.goto('/404.html');
  await expect(page.locator('[data-nf-lang="en"]')).toBeVisible();
});

test('scroll reveals: every animated element becomes visible once it is in view', async ({ page }) => {
  for (const path of ['/', '/work/albstar/', '/work/implant-swiss-albania/', '/services/seo/', '/about/']) {
    await page.goto(path);
    await page.waitForFunction(() => (window as unknown as { __mxReveal?: boolean }).__mxReveal === true);
    // Bring each animated element into view (inside the page — fast) and wait for it to reveal.
    const hidden = await page.evaluate(async () => {
      const frame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const missing: string[] = [];
      for (const el of document.querySelectorAll<HTMLElement>('[data-reveal], [data-split]')) {
        el.scrollIntoView({ block: 'center', behavior: 'instant' });
        let ok = false;
        for (let t = 0; t < 20 && !ok; t++) {
          await frame();
          ok = el.classList.contains('is-in');
        }
        if (!ok) missing.push(`${el.tagName.toLowerCase()}.${el.className}`);
      }
      return missing;
    });
    expect(hidden, `${path} has elements that never revealed`).toEqual([]);
  }
  // The case-study screenshot ends fully visible (not left clipped by the mask reveal).
  await page.goto('/work/albstar/');
  await page.locator('.cs-shot').scrollIntoViewIfNeeded();
  await expect
    .poll(() => page.locator('.cs-shot > *').evaluate((el) => getComputedStyle(el).clipPath), { timeout: 3000 })
    .toMatch(/^(none|inset\(0px\))$/);
});
