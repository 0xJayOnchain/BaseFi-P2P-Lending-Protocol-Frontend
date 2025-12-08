import { test, expect } from '@playwright/test';

// This suite validates wallet connect UX in two modes:
// 1) Without an injected wallet provider (window.ethereum missing),
//    we expect a user-friendly error modal.
// 2) With a wallet (via Synpress/MetaMask), we expect address to appear.
//    The second suite is provided as a template and can be enabled after MetaMask setup.

// Helper: navigate to home and find the connect button
const getConnectButton = async (page: any) => {
  await page.goto('/');
  const btn = page.getByRole('button', { name: /connect wallet/i });
  await expect(btn).toBeVisible();
  return btn;
};

// Case 1: No wallet provider
// This runs in a default browser where window.ethereum is absent.
// Expected: NotificationModal opens with a helpful error message.
// NOTE: This relies on the Header connect handler showing modal on errors.

test.describe('Wallet connect (no provider)', () => {
  test('shows a friendly error when MetaMask is not installed', async ({ page }) => {
    const connectBtn = await getConnectButton(page);
    await connectBtn.click();
    // Expect an error modal to be rendered
    await expect(page.getByText(/no wallet found/i)).toBeVisible();
    await expect(page.getByText(/please install metamask/i)).toBeVisible();
  });
});

// Case 2: With MetaMask via Synpress
// To run this, you'll need Synpress configured with a MetaMask profile.
// See: https://github.com/Synthetixio/synpress
// - Install MetaMask binary and set up an E2E wallet (seed phrase)
// - Configure Synpress environment variables & storage state
// - Use synpress test runner or its fixtures to launch Chromium with MetaMask
// - Switch network to Base Sepolia during the test where necessary

// Example (template) using Synpress runner semantics:
// import { test, expect } from '@synthetixio/synpress';
//
// test.describe('Wallet connect (with MetaMask)', () => {
//   test('connects and shows address & balance', async ({ page, metamask }) => {
//     await page.goto('/');
//     const btn = page.getByRole('button', { name: /connect wallet/i });
//     await btn.click();
//     // Approve connection in MetaMask popup
//     await metamask.acceptAccess();
//     // Optionally switch to Base Sepolia if prompted
//     // await metamask.switchNetwork('Base Sepolia');
//
//     // Assert short address and balance appear in header
//     await expect(page.getByText(/0x[0-9a-fA-F]{4}…[0-9a-fA-F]{4}/)).toBeVisible();
//     await expect(page.getByText(/ETH/)).toBeVisible();
//   });
// });

// Until MetaMask is wired in CI/local, you can keep the Synpress suite skipped
// and rely on the no-provider UX test as a smoke check.
