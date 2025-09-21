'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import type { WalletData as WalletDataType } from "@/lib/api/wallet";
import { getUserWallet } from "@/lib/api/wallet";
import type { 
  WalletOverviewProps,
  QuickStatsProps,
  TransactionHistoryProps
} from "@/types/wallet";

// Loading component for better UX
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

// Dynamic imports with proper typing
const DynamicWalletOverview = dynamic(() => import("../../../components/wallet/WalletOverview"), {
  loading: () => <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
});

const DynamicQuickStats = dynamic(() => import("../../../components/wallet/QuickStats"), {
  loading: () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      ))}
    </div>
  )
});

const DynamicTransactionHistory = dynamic(() => import("../../../components/wallet/TransactionHistory"), {
  loading: () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      ))}
    </div>
  )
});

const DynamicChatPricing = dynamic(() => import("../../../components/wallet/ChatPricing"), {
  loading: () => <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
});

export default function WalletPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<WalletDataType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(true);

  const loadSession = async (checkMounted = true) => {
    const session = await getSession();
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    try {
      const walletData = await getUserWallet();
      if (!checkMounted || isMounted) {
        setData(walletData);
      }
    } catch (err) {
      if (!checkMounted || isMounted) {
        setError("Failed to load wallet data. Please try again later.");
        console.error("Wallet data fetch error:", err);
      }
    } finally {
      if (!checkMounted || isMounted) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
    
    loadSession();

    return () => {
      setIsMounted(false);
    };
  }, [router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => {
            setError(null);
            setIsLoading(true);
            loadSession();
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No wallet data available.
      </div>
    );
  }

  const { balance, stats, transactions } = data;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DynamicWalletOverview balance={balance} />
        </div>
        <div className="space-y-6">
          <DynamicQuickStats 
            chatSessions={stats.chatSessions}
            coinsSpent={stats.coinsSpent}
            messagesSent={stats.messagesSent}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DynamicTransactionHistory transactions={transactions} />
        </div>
        <div>
          <DynamicChatPricing />
        </div>
      </div>
    </div>
  );
}