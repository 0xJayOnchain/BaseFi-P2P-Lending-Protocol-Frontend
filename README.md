BaseFi P2P Lending Protocol Frontend

A modern React/Next.js interface for the BaseFi peer-to-peer lending protocol deployed on Base Sepolia. Users can lend and borrow directly, track positions via NFTs, validate collateral, and use integrated DEX swaps for repayment and liquidation.

## Tech Stack

- Next.js (App Router)
- React hooks + Context
- ethers.js v6
- TailwindCSS
- Toast notifications (react-hot-toast)
- Base Onchain Kit (`@coinbase/onchainkit`) for wallet/connect UX

## Network & Contracts (Base Sepolia)

- ChainId: 84532
- RPC: https://sepolia.base.org
- Explorer: https://sepolia.basescan.org

Contract addresses:
- LendingPool: `0xE5cEdb79960ea461D778A130Da9cD279CD575331`
- PriceOracle: `0x428EeAD1456C43EaA2BfF10E71509f2cCbAA5fFf`
- LoanPositionNFT: `0x950E723c8C75F925e5DB0aE388371621634920d0`
- Uniswap V3 SwapRouter (whitelisted): `0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4`

Supported tokens (initial):
- WETH (18): `0x4200000000000000000000000000000000000006` | Chainlink Feed: `0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1`

## Features (MVP)

- Wallet connection (MetaMask), network validation/switch to Base Sepolia
- Lender dashboard: create/cancel offers, view loans, liquidate (standard/swap)
- Borrower dashboard: browse offers, accept offer (with collateral), create/cancel requests, repay (standard/swap)
- Loan details page: full loan info, real-time accrued interest, actions per role
- Real-time UI updates via contract events

## Getting Started

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Environment & Wallet

- MetaMask recommended; ensure you’re on Base Sepolia (ChainId 84532)
- If on the wrong network, the app will prompt a switch

### Base Onchain Kit Integration

- Package: `@coinbase/onchainkit` (already installed)
- Provides prebuilt wallet connect components, network management, and utilities
- We’ll use it for the connect button and chain switching on Base Sepolia, combined with ethers.js for contract interactions
- Docs: https://onchainkit.xyz/

### Scripts

- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm run start` — start production server

## Usage Notes

- Token approvals are required before creating offers or accepting loans
- Interest rates displayed in BPS and % (e.g., 500 BPS = 5%)
- Transaction toasts show pending/success/error with explorer links
- Light/Dark mode: simple theme toggle with persistence (planned)

## Roadmap (High-Level)

1. Config, ABIs, wallet connect
2. Lender dashboard core flows
3. Borrower dashboard core flows
4. Loan details + events + utilities
5. Polish, testing, deploy

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
