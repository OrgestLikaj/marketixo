import { expect, test } from '@playwright/test';

const langs = ['en', 'de', 'it', 'sq'] as const;

test.describe('home pages', () => {
  for (const lang of langs) {
    test(`/${lang}/ renders in ${lang}`, async ({ page }) => {
      await page.goto(`/${lang}/`);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.getByRole('navigation', { name: /.+/ }).first()).toBeVisible();
      // Four language links in the header switcher
      await expect(page.locator('header .lang a')).toHaveCount(4);
    });
  }
});

test('language switcher keeps you on the equivalent page', async ({ page }) => {
  await page.goto('/en/services/web-design-development/');
  await page.locator('header .lang a[data-lang="de"]').click();
  await expect(page).toHaveURL(/\/de\/leistungen\/webdesign-entwicklung\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');

  await page.locator('header .lang a[data-lang="sq"]').click();
  await expect(page).toHaveURL(/\/sq\/sherbime\/dizajn-zhvillim-web\/$/);

  await page.goto('/it/progetti/medicus-center/');
  await page.locator('header .lang a[data-lang="en"]').click();
  await expect(page).toHaveURL(/\/en\/work\/medicus-center\/$/);
});

test('language choice is remembered in a cookie', async ({ page, context }) => {
  await page.goto('/en/');
  await page.locator('header .lang a[data-lang="it"]').click();
  await expect(page).toHaveURL(/\/it\/$/);
  const cookies = await context.cookies();
  expect(cookies.find((c) => c.name === 'mx_lang')?.value).toBe('it');
});

test('SEO tags: canonical, hreflang with return links, valid JSON-LD', async ({ page, request }) => {
  await page.goto('/en/services/seo/');
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  expect(canonical).toMatch(/\/en\/services\/seo\/$/);
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
  await page.goto('/en/work/');
  const cells = page.locator('[data-cell]');
  const total = await cells.count();
  await page.getByRole('button', { name: /Healthcare/ }).click();
  await expect(page.getByRole('button', { name: /Healthcare/ })).toHaveAttribute('aria-pressed', 'true');
  const visible = await cells.evaluateAll((els) => els.filter((e) => !(e as HTMLElement).hidden).length);
  expect(visible).toBeGreaterThan(0);
  expect(visible).toBeLessThan(total);
});

test('contact form validates required fields before sending', async ({ page }) => {
  await page.goto('/en/contact/');
  await page.getByRole('button', { name: 'Send project request' }).click();
  await expect(page.locator('[data-summary]')).toBeVisible();
  await expect(page.locator('#project-form-name')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#project-form-name')).toBeFocused();

  await page.locator('#project-form-name').fill('Test Person');
  await page.locator('#project-form-email').fill('not-an-email');
  await page.getByRole('button', { name: 'Send project request' }).click();
  await expect(page.locator('#project-form-email-err')).not.toBeEmpty();
});

test('service pre-selection from a service page link', async ({ page }) => {
  await page.goto('/en/contact/?service=seo');
  await expect(page.locator('input[name="services[]"][value="seo"]')).toBeChecked();
});

test('FAQ opens and closes', async ({ page }) => {
  await page.goto('/en/faq/');
  const first = page.locator('details').first();
  await first.locator('summary').click();
  await expect(first).toHaveAttribute('open', '');
});

test('cookie settings dialog opens from the footer', async ({ page }) => {
  await page.goto('/en/');
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
  await page.goto('/en/', { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  expect(external).toEqual([]);
});

test('skip link and images with alt text', async ({ page, browserName }) => {
  await page.goto('/en/work/');
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
