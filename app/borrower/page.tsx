export default function BorrowerDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="card">
        <div className="card-header px-4 py-3">
          <h1 className="text-xl font-semibold">Borrower Dashboard</h1>
        </div>
        <div className="card-body">
          <section className="mb-6">
            <h2 className="text-lg font-medium mb-3">Browse Offers</h2>
            <div className="flex gap-2 mb-3">
              <input className="input w-48" placeholder="Token filter (e.g. WETH)" />
              <input className="input w-48" placeholder="Max rate (BPS)" />
              <button className="btn">Apply Filters</button>
            </div>
            <div className="card mb-2">
              <div className="card-body flex items-center justify-between">
                <span>Offer #12 · WETH · 50 · 400 BPS · 7 days · Collateral: USDC</span>
                <button className="btn btn-primary">Accept</button>
              </div>
            </div>
            <p className="muted-text text-sm">Active lending offers will be listed here.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-medium mb-3">Create Borrow Request</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="input" placeholder="Borrow Token" />
              <input className="input" placeholder="Amount" />
              <input className="input" placeholder="Max Interest Rate (BPS)" />
              <input className="input" placeholder="Duration (days)" />
              <input className="input" placeholder="Collateral Token" />
              <input className="input" placeholder="Collateral Amount" />
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn">Approve Collateral</button>
              <button className="btn btn-primary">Create Request</button>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-3">My Loans (as Borrower)</h2>
            <div className="card mb-2">
              <div className="card-body flex items-center justify-between">
                <span>Loan #7 · Lender 0xabcd…1234 · Principal 50 WETH · Interest 5% APR · Due in 6d</span>
                <div className="flex gap-2">
                  <button className="btn">Repay</button>
                  <button className="btn btn-primary">Repay with Swap</button>
                </div>
              </div>
            </div>
            <p className="muted-text text-sm">Your active loans will appear here.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
