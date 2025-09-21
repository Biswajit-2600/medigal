import MaterialIcon from "../ui/MaterialIcons";

interface WalletOverviewProps {
  balance: number;
}

export default function WalletOverview({ balance }: WalletOverviewProps) {
  return (
    <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg p-8 text-white shadow-lg flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg">Available Balance</p>
            <p className="text-5xl font-bold mt-2">
              {balance} <span className="text-3xl font-normal">coins</span>
            </p>
          </div>
          <div className="bg-white/20 rounded-full p-3">
            <MaterialIcon name="savings" className="text-4xl text-white" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/30">
          <p className="text-gray-200">Ready for AI medical consultations</p>
        </div>
      </div>
      <div className="mt-8">
        <button className="bg-white text-teal-600 font-semibold py-3 px-6 rounded-lg flex items-center space-x-2 hover:bg-gray-100 transition-colors">
          <MaterialIcon name="add_circle_outline" />
          <span>Recharge Wallet</span>
        </button>
      </div>
    </div>
  );
}