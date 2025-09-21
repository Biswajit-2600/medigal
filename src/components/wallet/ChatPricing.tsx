import MaterialIcon from "../ui/MaterialIcons";

interface ChatPricingProps {}

export default function ChatPricing({}: ChatPricingProps) {
  return (
    <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">
        Chat Pricing
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center text-subtext-light dark:text-subtext-dark">
          <span>Per Message Cost</span>
          <span className="font-semibold text-text-light dark:text-text-dark">
            2 coins
          </span>
        </div>
        <div className="flex justify-between items-center text-subtext-light dark:text-subtext-dark">
          <span>Average Session (10 messages)</span>
          <span className="font-semibold text-text-light dark:text-text-dark">
            20 coins
          </span>
        </div>
        <div className="flex justify-between items-center text-subtext-light dark:text-subtext-dark">
          <span>Long Session (25 messages)</span>
          <span className="font-semibold text-text-light dark:text-text-dark">
            50 coins
          </span>
        </div>
        <div className="flex justify-between items-center text-subtext-light dark:text-subtext-dark mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span>Best Value (100+ coins)</span>
          <span className="font-bold text-success">+15% bonus</span>
        </div>
      </div>
    </div>
  );
}