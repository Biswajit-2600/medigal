import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { mockTransactions } from "@/lib/mock-data";
import TransactionHistory from "@/components/wallet/TransactionHistory";
import RechargeButton from "@/components/wallet/RechargeButton";

export default async function WalletPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow">
        <h2 className="text-xl font-semibold">Your Wallet</h2>
        <div className="mt-4">
          <p className="text-sm">Current Balance</p>
          <p className="mt-1 text-4xl font-bold">
            {session.user.walletBalance} coins
          </p>
        </div>
        <div className="mt-6">
          <RechargeButton />
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-900">
          Transaction History
        </h2>
        <div className="mt-4">
          <TransactionHistory transactions={mockTransactions} />
        </div>
      </div>
    </div>
  );
}