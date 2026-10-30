import { expect, test } from '@playwright/test';

test('mobile menu opens, traps focus, closes with Escape', async ({ page }) => {
  await page.goto('/');
  const burger = page.locator('[data-menu-open]');
  await expect(burger).toBeVisible();
  await burger.click();
  const dialog = page.locator('[data-menu]');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('link', { name: /Work/ })).toBeVisible();
  await expect(dialog.locator('.lang a')).toHaveCount(4);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(burger).toBeFocused();
});

test('no horizontal overflow on key pages', async ({ page }) => {
  for (const path of ['/', '/de/', '/services/seo/', '/work/', '/work/medicus-center/', '/sq/kontakt/']) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
