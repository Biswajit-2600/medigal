import MaterialIcon from "../ui/MaterialIcons";

interface ChatHeaderProps {
  balance: number;
}

export default function ChatHeader({ balance }: ChatHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <MaterialIcon name="smart_toy" className="text-primary text-3xl" />
            </div>
          </div>
          <div className="ml-4">
            <h1 className="text-lg font-semibold text-text-light dark:text-text-dark">AI Medical Assistant</h1>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Online • Ready to help
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
            <MaterialIcon name="monetization_on" />
            <span className="font-semibold">{balance} coins</span>
          </div>
          <button className="text-primary font-semibold hover:underline">
            Recharge
          </button>
        </div>
      </div>
    </div>
  );
}