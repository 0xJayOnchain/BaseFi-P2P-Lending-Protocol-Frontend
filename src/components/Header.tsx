"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import NotificationModal from "./NotificationModal";
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Header() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") {
        document.documentElement.classList.add("dark");
        setTheme("dark");
      } else {
        document.documentElement.classList.remove("dark");
        setTheme("light");
      }
    } catch {}
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = theme === "dark" ? "light" : "dark";
    if (next === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="font-semibold text-lg">BaseFi</div>
        <div className="flex items-center gap-3">
          <button
            id="theme-toggle"
            className="btn"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <WalletSection />
        </div>
      </div>
    </header>
  );
}

function WalletSection() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const BASE_SEPOLIA_ID = 84532;

  const shortAddr = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const connect = async () => {
    setError(null);
    try {
      if (!window.ethereum) {
        setError("No wallet found. Please install MetaMask.");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      await provider.send("eth_requestAccounts", []);
      const network = await provider.getNetwork();
      setChainId(Number(network.chainId));
      // Switch to Base Sepolia if needed
      if (Number(network.chainId) !== BASE_SEPOLIA_ID) {
        try {
          await (window.ethereum as any).request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x14A74" /* 84532 hex */ }],
          });
        } catch (switchErr: any) {
          // If chain not added, attempt add
          if (switchErr?.code === 4902) {
            await (window.ethereum as any).request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: "0x14A74",
                chainName: "Base Sepolia",
                rpcUrls: ["https://sepolia.base.org"],
                nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
                blockExplorerUrls: ["https://sepolia.basescan.org"],
              }],
            });
          } else {
            setError("Please switch to Base Sepolia.");
          }
        }
      }
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAddress(addr);
      const bal = await provider.getBalance(addr);
      setBalance(ethers.formatEther(bal));

      // Listen for chain/account changes
      (window.ethereum as any).on?.("accountsChanged", async () => {
        try {
          const signer = await provider.getSigner();
          const addr = await signer.getAddress();
          setAddress(addr);
          const bal = await provider.getBalance(addr);
          setBalance(ethers.formatEther(bal));
        } catch {}
      });
      (window.ethereum as any).on?.("chainChanged", async () => {
        try {
          const network = await provider.getNetwork();
          setChainId(Number(network.chainId));
        } catch {}
      });
    } catch (e: any) {
      setError(e?.message ?? "Failed to connect wallet.");
    }
  };

  const disconnect = () => {
    setAddress(null);
    setBalance(null);
    setError(null);
  };

  return (
    <div className="flex items-center gap-2">
      {address ? (
        <>
          <span className="text-sm muted-text">
            {shortAddr(address)} {balance ? `· ${Number(balance).toFixed(4)} ETH` : ""}
          </span>
          <button className="btn" onClick={disconnect}>Disconnect</button>
        </>
      ) : (
  <button className="btn btn-primary" onClick={connect}>Connect Wallet</button>
      )}
      {chainId && chainId !== BASE_SEPOLIA_ID && (
        <span className="text-xs text-red-600">Wrong network: please switch to Base Sepolia</span>
      )}
      {error && (
        <NotificationModal
        open={!!error}
        title="Wallet Connection Error"
        message={error}
        variant="error"
        onClose={() => setError(null)}
      />
      )}
    </div>
  );
}
