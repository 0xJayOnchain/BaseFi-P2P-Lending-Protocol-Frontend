"use client";

import { BrowserProvider } from "ethers";

export interface Eip1193Provider {
  request: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
}

function isEip1193Provider(obj: unknown): obj is Eip1193Provider {
  return !!obj && typeof (obj as any).request === "function";
}

export function getBrowserProvider(): BrowserProvider {
  if (typeof window === "undefined") {
    throw new Error("No window available for provider");
  }
  const eth = (window as any).ethereum as unknown;
  if (!isEip1193Provider(eth)) {
    throw new Error("No injected EIP-1193 provider (MetaMask/Wallet) found");
  }
  return new BrowserProvider(eth);
}

export async function getSigner() {
  const provider = getBrowserProvider();
  const signer = await provider.getSigner();
  return { provider, signer };
}

export async function ensureBaseSepoliaChain() {
  const eth = (window as any).ethereum as unknown;
  if (!isEip1193Provider(eth)) throw new Error("No wallet provider found");
  try {
    await eth.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x14A74" }], // 84532
    });
  } catch (err: any) {
    // If chain not added, add it
    if (err?.code === 4902 || (typeof err?.message === "string" && err.message.includes("Unrecognized chain ID"))) {
      await eth.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x14A74",
            chainName: "Base Sepolia",
            nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
            rpcUrls: ["https://sepolia.base.org"],
            blockExplorerUrls: ["https://sepolia.basescan.org"],
          },
        ],
      });
    } else {
      throw err;
    }
  }
}
