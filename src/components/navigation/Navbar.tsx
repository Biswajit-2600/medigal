"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import MaterialIcon from "@/components/ui/MaterialIcons";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "dashboard"
  },
  {
    name: "Profile", 
    href: "/profile",
    icon: "person_outline"
  },
  {
    name: "Wallet",
    href: "/wallet", 
    icon: "account_balance_wallet"
  }
];

export default function Navbar() {
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <header 
      className="flex items-center justify-between p-4 border-b border-gray-200"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="flex items-center space-x-2">
        <MaterialIcon name="medical_services" className="text-3xl" style={{ color: "#2563EB" }} />
        <h1 className="text-xl font-bold" style={{ color: "#18181B" }}>
          MedConsult
        </h1>
      </div>
      
      <nav className="flex items-center space-x-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name}
              href={item.href} 
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                isActive 
                  ? "text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-xl shadow-gray-400/60" 
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-100 hover:shadow-xl hover:shadow-gray-400/50"
              }`}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>{item.name}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                )}
              </span>
              
              {!isActive && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 to-blue-500/0 hover:from-blue-500/5 hover:to-blue-500/10 transition-all duration-300" />
              )}
            </Link>
          );
        })}
        
        <button 
          onClick={handleLogout}
          className="relative px-4 py-2 text-sm font-medium text-red-600 bg-red-50/50 border border-red-200/50 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-red-100 hover:border-red-300/60 hover:shadow-xl hover:shadow-gray-400/50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-2 cursor-pointer"
        >
          <span className="relative z-10 flex items-center space-x-2">
            <MaterialIcon name="logout" className="text-sm" />
            <span>Logout</span>
          </span>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/0 to-red-500/0 hover:from-red-500/5 hover:to-red-500/10 transition-all duration-300" />
        </button>
      </nav>
    </header>
  );
}