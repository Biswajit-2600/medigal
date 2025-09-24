"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { mockConsultations } from "@/lib/mock-data";
import ConsultationHistory from "@/components/profile/ConsultationHistory";
import MaterialIcon from "@/components/ui/MaterialIcons";
import Link from "next/link";

export default function ProfilePage() {
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2">
          {/* Profile Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold" style={{ color: "#18181B" }}>
              Profile
            </h2>
            <p className="mt-1" style={{ color: "rgb(100, 116, 139)" }}>
              Manage your account information and view your chat history
            </p>
          </div>

          {/* Personal Information Card */}
          <div className="rounded-lg p-6 shadow-sm mb-8" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold" style={{ color: "#18181B" }}>
                Personal Information
              </h3>
              <button 
                onClick={() => alert('Edit Profile functionality will be implemented soon!')}
                className="group relative px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 cursor-pointer"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <MaterialIcon name="edit" className="text-lg transition-transform duration-300 group-hover:scale-110" />
                  <span>Edit Profile</span>
                </span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium" style={{ color: "rgb(100, 116, 139)" }}>
                  Full Name
                </label>
                <div className="mt-2 flex items-center border rounded-md p-3" style={{ backgroundColor: "rgb(249, 250, 251)", borderColor: "rgb(229, 231, 235)" }}>
                  <MaterialIcon name="person_outline" className="mr-3" style={{ color: "rgb(100, 116, 139)" }} />
                  <p style={{ color: "#18181B" }}>{session.user.name}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "rgb(100, 116, 139)" }}>
                  Email Address
                </label>
                <div className="mt-2 flex items-center border rounded-md p-3" style={{ backgroundColor: "rgb(249, 250, 251)", borderColor: "rgb(229, 231, 235)" }}>
                  <MaterialIcon name="email" className="mr-3" style={{ color: "rgb(100, 116, 139)" }} />
                  <p style={{ color: "#18181B" }}>{session.user.email}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "rgb(100, 116, 139)" }}>
                  Phone Number
                </label>
                <div className="mt-2 flex items-center border rounded-md p-3" style={{ backgroundColor: "rgb(249, 250, 251)", borderColor: "rgb(229, 231, 235)" }}>
                  <MaterialIcon name="phone" className="mr-3" style={{ color: "rgb(100, 116, 139)" }} />
                  <p style={{ color: "#18181B" }}>{session.user.phone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "rgb(100, 116, 139)" }}>
                  Date of Birth
                </label>
                <div className="mt-2 flex items-center border rounded-md p-3" style={{ backgroundColor: "rgb(249, 250, 251)", borderColor: "rgb(229, 231, 235)" }}>
                  <MaterialIcon name="calendar_today" className="mr-3" style={{ color: "rgb(100, 116, 139)" }} />
                  <p style={{ color: "#18181B" }}>15-06-1985</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium" style={{ color: "rgb(100, 116, 139)" }}>
                  Address
                </label>
                <div className="mt-2 flex items-center border rounded-md p-3" style={{ backgroundColor: "rgb(249, 250, 251)", borderColor: "rgb(229, 231, 235)" }}>
                  <MaterialIcon name="location_on" className="mr-3" style={{ color: "rgb(100, 116, 139)" }} />
                  <p style={{ color: "#18181B" }}>123 Medical Center Drive, New York, NY 10001</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium" style={{ color: "rgb(100, 116, 139)" }}>
                  Emergency Contact
                </label>
                <div className="mt-2 flex items-center border rounded-md p-3" style={{ backgroundColor: "rgb(249, 250, 251)", borderColor: "rgb(229, 231, 235)" }}>
                  <MaterialIcon name="contact_phone" className="mr-3" style={{ color: "rgb(100, 116, 139)" }} />
                  <p style={{ color: "#18181B" }}>John Johnson - +1 (555) 987-6543</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat History Card */}
          <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold" style={{ color: "#18181B" }}>
                Chat History
              </h3>
              <Link 
                href="/chat"
                className="group relative px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <MaterialIcon name="chat" className="text-lg transition-transform duration-300 group-hover:scale-110" />
                  <span>Start New Chat</span>
                </span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
            <div className="mt-4">
              <ConsultationHistory consultations={mockConsultations} />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          {/* Profile Avatar Card */}
          <div className="rounded-lg p-6 shadow-sm flex flex-col items-center" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgb(219, 234, 254)" }}>
              <MaterialIcon name="person" className="text-6xl" style={{ color: "#2563EB" }} />
            </div>
            <h3 className="text-xl font-bold" style={{ color: "#18181B" }}>
              {session.user.name}
            </h3>
            <p className="text-sm" style={{ color: "rgb(100, 116, 139)" }}>
              Patient ID: #MP12345
            </p>
            <div className="px-4 py-2 rounded-lg mt-4 text-center" style={{ backgroundColor: "rgb(239, 246, 255)", color: "#2563EB" }}>
              <p className="text-sm font-medium">Member since</p>
              <p className="font-semibold">January 2024</p>
            </div>
          </div>

          {/* Wallet Balance Card */}
          <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold" style={{ color: "#18181B" }}>
                Wallet Balance
              </h3>
              <MaterialIcon name="account_balance_wallet" style={{ color: "rgb(100, 116, 139)" }} />
            </div>
            <p className="text-5xl font-bold" style={{ color: "#18181B" }}>
              {session.user.walletBalance}
            </p>
            <p className="mb-6" style={{ color: "rgb(100, 116, 139)" }}>
              Coins Available
            </p>
            <button 
              onClick={() => alert('Add Coins functionality will be implemented soon!')}
              className="group relative w-full font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:ring-offset-2 cursor-pointer" 
              style={{ backgroundColor: "rgb(16, 185, 129)" }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <MaterialIcon name="add" className="transition-transform duration-300 group-hover:scale-110" />
                <span>Add Coins</span>
              </span>
              <div className="absolute inset-0 rounded-lg bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Chat Statistics Card */}
          <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: "#18181B" }}>
              Chat Statistics
            </h3>
          </div>
        </aside>
      </div>
    </div>
  );
}