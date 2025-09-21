import MaterialIcon from "../ui/MaterialIcons";

interface QuickStatsProps {
  chatSessions: number;
  coinsSpent: number;
  messagesSent: number;
}

export default function QuickStats({ chatSessions, coinsSpent, messagesSent }: QuickStatsProps) {
  return (
    <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">
        Quick Stats
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
              <MaterialIcon name="chat_bubble_outline" className="text-blue-500" />
            </div>
            <span className="text-subtext-light dark:text-subtext-dark">
              Total Chat Sessions
            </span>
          </div>
          <span className="font-bold text-blue-500 text-lg">{chatSessions}</span>
        </div>
        <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/50 p-3 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
              <MaterialIcon name="toll" className="text-green-500" />
            </div>
            <span className="text-subtext-light dark:text-subtext-dark">
              Coins Spent
            </span>
          </div>
          <span className="font-bold text-green-500 text-lg">{coinsSpent}</span>
        </div>
        <div className="flex justify-between items-center bg-purple-50 dark:bg-purple-900/50 p-3 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full">
              <MaterialIcon name="send" className="text-purple-500" />
            </div>
            <span className="text-subtext-light dark:text-subtext-dark">
              Messages Sent
            </span>
          </div>
          <span className="font-bold text-purple-500 text-lg">{messagesSent}</span>
        </div>
      </div>
    </div>
  );
}