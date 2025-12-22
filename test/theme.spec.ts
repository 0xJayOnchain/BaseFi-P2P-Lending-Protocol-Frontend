import { test, expect } from '@playwright/test';

test.describe('Theme toggle persistence', () => {
  test('toggles dark mode and persists after reload', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');

    // Initially light (no .dark class)
    await expect(html).not.toHaveClass(/dark/);

    // Toggle to dark
    const toggle = page.getByRole('button', { name: /dark mode/i });
    await toggle.click();
    await expect(html).toHaveClass(/dark/);

    // Reload and confirm persistence
    await page.reload();
    await expect(html).toHaveClass(/dark/);

    // Toggle back to light
    const toggleBack = page.getByRole('button', { name: /light mode/i });
    await toggleBack.click();
    await expect(html).not.toHaveClass(/dark/);
  });
});
