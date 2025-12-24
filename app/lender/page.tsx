"use client";

import { useCallback, useMemo, useState } from "react";
import { parseUnits } from "ethers";
import { getSigner, ensureBaseSepoliaChain } from "../../src/lib/wallet";
import { getERC20, getLendingPool } from "../../src/lib/contracts";
import { TOKENS, CONTRACTS } from "../../src/config/constants";
import NotificationModal from "../../src/components/NotificationModal";
import LoadingSpinner from "../../src/components/LoadingSpinner";

export default function LenderDashboard() {
  const [lendToken, setLendToken] = useState<string>(TOKENS?.WETH?.address ?? "");
  const [amount, setAmount] = useState<string>("");
  const [interestRateBPS, setInterestRateBPS] = useState<string>("500");
  const [durationDays, setDurationDays] = useState<string>("7");
  const [collateralToken, setCollateralToken] = useState<string>(TOKENS?.USDC?.address ?? "");
  const [collateralRatioBPS, setCollateralRatioBPS] = useState<string>("15000");

  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalVariant, setModalVariant] = useState<"success" | "error" | "info">("info");

  const isFormValid = useMemo(() => {
    return (
      lendToken?.length === 42 &&
      collateralToken?.length === 42 &&
      Number(amount) > 0 &&
      Number(interestRateBPS) > 0 &&
      Number(durationDays) > 0 &&
      Number(collateralRatioBPS) > 0
    );
  }, [lendToken, collateralToken, amount, interestRateBPS, durationDays, collateralRatioBPS]);

  const withSpinner = useCallback(async (fn: () => Promise<void>) => {
    setIsLoading(true);
    try {
      await fn();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const showModal = useCallback((title: string, message: string, variant: typeof modalVariant = "info") => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVariant(variant);
    setModalOpen(true);
  }, []);

  const handleApprove = useCallback(async () => {
    await withSpinner(async () => {
      try {
        await ensureBaseSepoliaChain();
        const { signer } = await getSigner();
        const erc20 = getERC20(lendToken, signer);
        const decimals: number = Number(await erc20.decimals());
        const amountBN = parseUnits(amount, decimals);
        const tx = await erc20.approve(CONTRACTS.LENDING_POOL, amountBN);
        const receipt = await tx.wait();
        showModal(
          "Approval Successful",
          `Approved ${amount} tokens for LendingPool. Tx: ${String(receipt?.hash ?? tx.hash)}`,
          "success"
        );
      } catch (err: any) {
        showModal("Approval Failed", err?.message ?? String(err), "error");
      }
    });
  }, [amount, lendToken, showModal, withSpinner]);

  const handleCreateOffer = useCallback(async () => {
    await withSpinner(async () => {
      try {
        if (!isFormValid) {
          showModal("Invalid Form", "Please fill in all fields with valid values.", "info");
          return;
        }
        await ensureBaseSepoliaChain();
        const { signer } = await getSigner();
        const erc20 = getERC20(lendToken, signer);
        const decimals: number = Number(await erc20.decimals());
        const amountBN = parseUnits(amount, decimals);
        const lendingPool = getLendingPool(signer);
        const durationSecs = Math.floor(Number(durationDays) * 86400);
        const tx = await lendingPool.createLendingOffer(
          lendToken,
          amountBN,
          Number(interestRateBPS),
          durationSecs,
          collateralToken,
          Number(collateralRatioBPS)
        );
        const receipt = await tx.wait();
        showModal(
          "Offer Created",
          `Your lending offer has been created. Tx: ${String(receipt?.hash ?? tx.hash)}`,
          "success"
        );
      } catch (err: any) {
        showModal("Create Offer Failed", err?.message ?? String(err), "error");
      }
    });
  }, [isFormValid, lendToken, amount, interestRateBPS, durationDays, collateralToken, collateralRatioBPS, showModal, withSpinner]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <LoadingSpinner open={isLoading} />
      <NotificationModal
        open={modalOpen}
        title={modalTitle}
        message={modalMessage}
        variant={modalVariant}
        onClose={() => setModalOpen(false)}
      />
      <div className="card">
        <div className="card-header px-4 py-3">
          <h1 className="text-xl font-semibold">Lender Dashboard</h1>
        </div>
        <div className="card-body">
          <section className="mb-6">
            <h2 className="text-lg font-medium mb-3">Create Lending Offer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                className="input"
                placeholder="Lend Token (address)"
                value={lendToken}
                onChange={(e) => setLendToken(e.target.value.trim())}
              />
              <input
                className="input"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <input
                className="input"
                placeholder="Interest Rate (BPS)"
                value={interestRateBPS}
                onChange={(e) => setInterestRateBPS(e.target.value)}
              />
              <input
                className="input"
                placeholder="Duration (days)"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
              />
              <input
                className="input"
                placeholder="Collateral Token (address)"
                value={collateralToken}
                onChange={(e) => setCollateralToken(e.target.value.trim())}
              />
              <input
                className="input"
                placeholder="Collateral Ratio (BPS)"
                value={collateralRatioBPS}
                onChange={(e) => setCollateralRatioBPS(e.target.value)}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="btn" onClick={() => setLendToken(TOKENS?.WETH?.address ?? lendToken)}>Prefill WETH</button>
              <button className="btn" onClick={() => setCollateralToken(TOKENS?.USDC?.address ?? collateralToken)}>Prefill USDC</button>
              <button className="btn" disabled={isLoading || !lendToken || !Number(amount)} onClick={handleApprove}>Approve Token</button>
              <button className="btn btn-primary" disabled={isLoading || !isFormValid} onClick={handleCreateOffer}>Create Offer</button>
            </div>
            <p className="muted-text text-sm mt-2">
              Tip: Approval must be for at least the amount you plan to lend. Interest rate and ratios are in basis points.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-medium mb-3">My Offers</h2>
            <p className="muted-text text-sm">Offers will appear here in real-time (coming soon).</p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-3">My Loans (as Lender)</h2>
            <p className="muted-text text-sm">Loans will populate after you match offers/requests (coming soon).</p>
          </section>
        </div>
      </div>
    </div>
  );
}
