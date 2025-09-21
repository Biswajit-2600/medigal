import MaterialIcon from "@/components/ui/MaterialIcons";

interface WalletBalanceProps {
  balance: string;
}

export default function WalletBalance({ balance }: WalletBalanceProps) {
  return (
    <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm mt-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-text-light dark:text-text-dark">Wallet Balance</h4>
        <MaterialIcon name="account_balance_wallet" className="text-primary text-2xl" />
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-text-light dark:text-text-dark">{balance}</span>
        <span className="text-subtext-light dark:text-subtext-dark text-sm ml-1">USD</span>
      </div>
      <button className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
        Add Money
      </button>
    </div>
  );
}