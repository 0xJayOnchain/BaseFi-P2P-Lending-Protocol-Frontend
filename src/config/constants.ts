// BaseFi Frontend configuration constants (placeholders for Round 1)
export const CONTRACTS = {
  LENDING_POOL: "0xE5cEdb79960ea461D778A130Da9cD279CD575331",
  PRICE_ORACLE: "0x428EeAD1456C43EaA2BfF10E71509f2cCbAA5fFf",
  LOAN_POSITION_NFT: "0x950E723c8C75F925e5DB0aE388371621634920d0",
  UNISWAP_V3_ROUTER: "0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4",
};

export const TOKENS = {
  WETH: {
    address: "0x4200000000000000000000000000000000000006",
    symbol: "WETH",
    decimals: 18,
    priceFeed: "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1",
  },
  USDC: {
    address: "0x0000000000000000000000000000000000000000", // TODO: Sepolia address
    symbol: "USDC",
    decimals: 6,
    priceFeed: undefined,
  },
  cbBTC: {
    address: "0x0000000000000000000000000000000000000000", // TODO: Sepolia address
    symbol: "cbBTC",
    decimals: 8,
    priceFeed: undefined,
  },
} as const;

export const NETWORK = {
  chainId: 84532,
  name: "Base Sepolia",
  rpcUrl: "https://sepolia.base.org",
  explorerUrl: "https://sepolia.basescan.org",
} as const;

export const PROTOCOL_CONFIG = {
  ownerFeeBPS: 100,
  penaltyBPS: 200,
  minInterestRateBPS: 100,
  maxInterestRateBPS: 10000,
  liquidationGracePeriodSecs: 3600,
  maxDurationSecs: 31536000,
} as const;
