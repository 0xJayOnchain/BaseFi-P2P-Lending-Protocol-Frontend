export default function LenderDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="card">
        <div className="card-header px-4 py-3">
          <h1 className="text-xl font-semibold">Lender Dashboard</h1>
        </div>
        <div className="card-body">
          <section className="mb-6">
            <h2 className="text-lg font-medium mb-3">Create Lending Offer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="input" placeholder="Lend Token (e.g. WETH)" />
              <input className="input" placeholder="Amount" />
              <input className="input" placeholder="Interest Rate (BPS)" />
              <input className="input" placeholder="Duration (days)" />
              <input className="input" placeholder="Collateral Token" />
              <input className="input" placeholder="Collateral Ratio (BPS)" />
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn">Approve Token</button>
              <button className="btn btn-primary">Create Offer</button>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-medium mb-3">My Offers</h2>
            <div className="card mb-2">
              <div className="card-body flex items-center justify-between">
                <span>Offer #1 · WETH · 100 · 500 BPS · 7 days · Collateral: cbBTC</span>
                <button className="btn">Cancel</button>
              </div>
            </div>
            <p className="muted-text text-sm">Offers will appear here in real-time.</p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-3">My Loans (as Lender)</h2>
            <div className="card mb-2">
              <div className="card-body flex items-center justify-between">
                <span>Loan #1 · Borrower 0x1234…abcd · Principal 100 WETH · Due in 6d</span>
                <div className="flex gap-2">
                  <button className="btn">Liquidate</button>
                  <button className="btn btn-primary">Liquidate with Swap</button>
                </div>
              </div>
            </div>
            <p className="muted-text text-sm">Loans will populate after you match offers/requests.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
