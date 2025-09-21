import { Transaction } from "@/lib/api/wallet";

export interface WalletOverviewProps {
  balance: number;
}

export interface QuickStatsProps {
  chatSessions: number;
  coinsSpent: number;
  messagesSent: number;
}

export interface TransactionHistoryProps {
  transactions: Transaction[];
}

export interface ChatPricingProps {
  // Add any props if needed for ChatPricing
}

export interface WalletPageProps {
  // Add any page-specific props if needed
}

// Add this interface to maintain type safety across components
export interface WalletComponentState {
  isLoading: boolean;
  error: string | null;
  data: {
    balance: number;
    stats: {
      chatSessions: number;
      coinsSpent: number;
      messagesSent: number;
    };
    transactions: Transaction[];
  } | null;
}