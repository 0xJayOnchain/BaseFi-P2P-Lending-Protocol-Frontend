import { test, expect } from '@playwright/test';

test.describe('Navigation smoke', () => {
  test('clicks to /lender, back, /borrower, back', async ({ page }) => {
    await page.goto('/');

    // To Lender
    await page.getByRole('link', { name: /Lender Dashboard/i }).click();
    await expect(page.getByText(/Lender Dashboard/i)).toBeVisible();
    await expect(page).toHaveURL(/\/lender$/);

    // Back to Home
    await page.goBack();
    await expect(page.getByText(/BaseFi Frontend/i)).toBeVisible();
    await expect(page).toHaveURL(/\/$/);

    // To Borrower
    await page.getByRole('link', { name: /Borrower Dashboard/i }).click();
    await expect(page.getByText(/Borrower Dashboard/i)).toBeVisible();
    await expect(page).toHaveURL(/\/borrower$/);

    // Back to Home
    await page.goBack();
    await expect(page.getByText(/BaseFi Frontend/i)).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
  });
});
