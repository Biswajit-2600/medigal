export interface WalletStats {
  chatSessions: number;
  coinsSpent: number;
  messagesSent: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
}

export interface WalletData {
  balance: number;
  stats: WalletStats;
  transactions: Transaction[];
}

// This is a placeholder implementation. Replace with actual API calls in production
export async function getUserWallet(): Promise<WalletData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock data
  return {
    balance: 150,
    stats: {
      chatSessions: 24,
      coinsSpent: 304,
      messagesSent: 152
    },
    transactions: [
      {
        id: "1",
        userId: "user123",
        type: "debit",
        amount: 24,
        description: "AI Chat Session - Headache Questions",
        date: "2024-01-15T14:30:00",
      },
      {
        id: "2",
        userId: "user123",
        type: "credit",
        amount: 50,
        description: "Wallet Recharge",
        date: "2024-01-14T09:15:00",
      },
    ]
  };
}