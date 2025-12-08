import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="card">
        <div className="card-header px-4 py-3">
          <div className="flex items-center gap-3">
            <Image src="/next.svg" alt="Logo" width={32} height={32} />
            <h1 className="text-xl font-semibold">BaseFi Frontend</h1>
          </div>
        </div>
        <div className="card-body">
          <p className="mb-4">Welcome. Use the header to connect your wallet and toggle theme. Below are quick links:</p>
          <div className="flex flex-wrap gap-3">
            <a className="btn btn-primary link" href="/lender">Lender Dashboard</a>
            <a className="btn btn-primary link" href="/borrower">Borrower Dashboard</a>
            <a className="btn link" href="/loan/1">Sample Loan #1</a>
          </div>
          <div className="mt-6">
            <label className="block text-sm mb-2">Search by Loan ID</label>
            <div className="flex gap-2">
              <input className="input w-48" placeholder="Loan ID" />
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
