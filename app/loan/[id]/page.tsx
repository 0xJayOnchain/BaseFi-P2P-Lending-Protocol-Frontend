import Link from "next/link";

export default function LoanDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="card">
        <div className="card-header px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Loan #{id}</h1>
          <Link href="/" className="link">Back to Home</Link>
        </div>
        <div className="card-body">
          <section className="mb-6">
            <h2 className="text-lg font-medium mb-3">Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="card p-3">
                <div className="muted-text text-sm">Lender</div>
                <div>0x0000…0000</div>
              </div>
              <div className="card p-3">
                <div className="muted-text text-sm">Borrower</div>
                <div>0x0000…0000</div>
              </div>
              <div className="card p-3">
                <div className="muted-text text-sm">Principal</div>
                <div>100 WETH</div>
              </div>
              <div className="card p-3">
                <div className="muted-text text-sm">Collateral</div>
                <div>cbBTC (150%)</div>
              </div>
              <div className="card p-3">
                <div className="muted-text text-sm">Interest Rate</div>
                <div>500 BPS (5%)</div>
              </div>
              <div className="card p-3">
                <div className="muted-text text-sm">Duration</div>
                <div>7 days</div>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-medium mb-3">Status</h2>
            <div className="flex gap-3 items-center">
              <span className="card p-3">Active</span>
              <span className="muted-text text-sm">Accrued interest and countdown go here.</span>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-3">Actions</h2>
            <div className="flex gap-2">
              <button className="btn">Repay</button>
              <button className="btn btn-primary">Repay with Swap</button>
              <button className="btn">Liquidate</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
