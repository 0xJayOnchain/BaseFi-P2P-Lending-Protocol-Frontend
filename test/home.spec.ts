import { test, expect } from '@playwright/test';

test.describe('Home smoke', () => {
  test('visits / and shows title + links', async ({ page }) => {
    await page.goto('/');

    // Title
    await expect(page.getByText(/BaseFi Frontend/i)).toBeVisible();

    // Links
    await expect(page.getByRole('link', { name: /Lender Dashboard/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Borrower Dashboard/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Sample Loan #1/i })).toBeVisible();
  });
});
