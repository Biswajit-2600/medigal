"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import MaterialIcon from "@/components/ui/MaterialIcons";
import Link from "next/link";

export default function WalletPage() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div className="p-6 lg:p-8">Loading...</div>;
  }
  
  if (status === "unauthenticated") {
    redirect("/auth/login");
  }

  if (!session) {
    return <div className="p-6 lg:p-8">Loading...</div>;
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Wallet Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold" style={{ color: "#18181B" }}>
          Wallet
        </h2>
        <p className="mt-1" style={{ color: "rgb(100, 116, 139)" }}>
          Manage your coins and view transaction history
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2">
          {/* Wallet Balance Card */}
          <div className="rounded-lg p-8 text-white shadow-lg flex flex-col justify-between bg-gradient-to-br from-teal-500 to-blue-600 mb-8" style={{ minHeight: "280px" }}>
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg">Available Balance</p>
                  <p className="text-5xl font-bold mt-2">
                    {session.user.walletBalance} <span className="text-3xl font-normal">coins</span>
                  </p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <MaterialIcon name="savings" className="text-white" style={{ fontSize: "2.5rem" }} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/30">
                <p className="text-gray-200">
                  Ready for AI medical consultations
                </p>
              </div>
            </div>
            <div className="mt-8">
              <button 
                onClick={() => alert('Wallet recharge functionality will be implemented soon!')}
                className="group relative font-semibold py-3 px-6 rounded-lg flex items-center space-x-2 text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:ring-offset-2 cursor-pointer"
                style={{ backgroundColor: "rgb(16, 185, 129)" }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <MaterialIcon name="add_circle_outline" className="transition-transform duration-300 group-hover:scale-110" />
                  <span>Recharge Wallet</span>
                </span>
                <div className="absolute inset-0 rounded-lg bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>

          {/* Transaction History Card */}
          <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: "#18181B" }}>
              Transaction History
            </h3>
            <div className="space-y-4">
              {/* Chat Session Transaction */}
              <div className="flex items-center justify-between py-4 border-b" style={{ borderColor: "rgb(229, 231, 235)" }}>
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: "rgb(254, 226, 226)" }}>
                    <MaterialIcon name="logout" style={{ color: "rgb(239, 68, 68)" }} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "#18181B" }}>
                      AI Chat Session - Headache Questions
                    </p>
                    <p className="text-sm" style={{ color: "rgb(100, 116, 139)" }}>
                      12 messages sent
                    </p>
                    <p className="text-sm" style={{ color: "rgb(100, 116, 139)" }}>
                      15/01/2024 at 14:30
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg" style={{ color: "rgb(239, 68, 68)" }}>-24 coins</p>
                  <p className="text-sm" style={{ color: "rgb(100, 116, 139)" }}>
                    2 coins per message
                  </p>
                </div>
              </div>

              {/* Wallet Recharge Transaction */}
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: "rgb(220, 252, 231)" }}>
                    <MaterialIcon name="arrow_downward" className="transform -rotate-45" style={{ color: "rgb(16, 185, 129)" }} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "#18181B" }}>
                      Wallet Recharge
                    </p>
                    <p className="text-sm" style={{ color: "rgb(100, 116, 139)" }}>
                      Credit Card (****1234)
                    </p>
                    <p className="text-sm" style={{ color: "rgb(100, 116, 139)" }}>
                      14/01/2024 at 09:15
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-lg" style={{ color: "rgb(16, 185, 129)" }}>+50 coins</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Quick Stats Card */}
          <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: "#18181B" }}>
              Quick Stats
            </h3>
            <div className="space-y-4">
              {/* Total Chat Sessions */}
              <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: "rgb(239, 246, 255)" }}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#2563EB" }}>
                    <MaterialIcon name="chat_bubble_outline" className="text-xl text-white" />
                  </div>
                  <span style={{ color: "rgb(100, 116, 139)" }}>Total Chat Sessions</span>
                </div>
                <span className="font-bold text-lg" style={{ color: "#2563EB" }}>24</span>
              </div>

              {/* Coins Spent */}
              <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: "rgb(240, 253, 244)" }}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgb(16, 185, 129)" }}>
                    <MaterialIcon name="toll" className="text-xl text-white" />
                  </div>
                  <span style={{ color: "rgb(100, 116, 139)" }}>Coins Spent</span>
                </div>
                <span className="font-bold text-lg" style={{ color: "rgb(16, 185, 129)" }}>304</span>
              </div>

              {/* Messages Sent */}
              <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: "rgb(250, 245, 255)" }}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgb(147, 51, 234)" }}>
                    <MaterialIcon name="send" className="text-xl text-white" />
                  </div>
                  <span style={{ color: "rgb(100, 116, 139)" }}>Messages Sent</span>
                </div>
                <span className="font-bold text-lg" style={{ color: "rgb(147, 51, 234)" }}>152</span>
              </div>
            </div>
          </div>

          {/* Chat Pricing Card */}
          <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: "#18181B" }}>
              Chat Pricing
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center" style={{ color: "rgb(100, 116, 139)" }}>
                <span>Per Message Cost</span>
                <span className="font-semibold" style={{ color: "#18181B" }}>2 coins</span>
              </div>
              <div className="flex justify-between items-center" style={{ color: "rgb(100, 116, 139)" }}>
                <span>Average Session (10 messages)</span>
                <span className="font-semibold" style={{ color: "#18181B" }}>20 coins</span>
              </div>
              <div className="flex justify-between items-center" style={{ color: "rgb(100, 116, 139)" }}>
                <span>Long Session (25 messages)</span>
                <span className="font-semibold" style={{ color: "#18181B" }}>50 coins</span>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t" style={{ color: "rgb(100, 116, 139)", borderColor: "rgb(229, 231, 235)" }}>
                <span>Best Value (100+ coins)</span>
                <span className="font-bold" style={{ color: "rgb(16, 185, 129)" }}>+15% bonus</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}