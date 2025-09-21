import { format } from "date-fns";
import { Transaction } from "@/lib/mock-data";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({
  transactions,
}: TransactionHistoryProps) {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
        >
          <div className="flex items-center space-x-4">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                transaction.type === "credit"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              )}
            >
              {transaction.type === "credit" ? (
                <ArrowDownRight className="h-5 w-5" />
              ) : (
                <ArrowUpRight className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {transaction.description}
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(transaction.date), "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          </div>
          <p
            className={cn(
              "font-medium",
              transaction.type === "credit"
                ? "text-green-600"
                : "text-red-600"
            )}
          >
            {transaction.type === "credit" ? "+" : "-"}
            {transaction.amount} coins
          </p>
        </div>
      ))}
    </div>
  );
}