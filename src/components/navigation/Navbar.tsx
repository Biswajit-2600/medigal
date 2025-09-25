"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import MaterialIcon from "@/components/ui/MaterialIcons";
import LoadingLink from "@/components/ui/LoadingLink";

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
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    handleLogout();
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <header 
      className="flex items-center justify-between p-4 border-b border-gray-200"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="flex items-center space-x-1">
        <MaterialIcon name="eco" className="text-emerald-600" style={{ fontSize: "1.5rem" }} />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Healbi
        </h1>
      </div>
      
      <nav className="flex items-center space-x-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <LoadingLink 
              key={item.name}
              href={item.href}
              loadingMessage={`Loading ${item.name}...`}
              className={`group relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                isActive 
                  ? "text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/25" 
                  : "text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:shadow-md hover:shadow-blue-500/15"
              }`}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <MaterialIcon name={item.icon} className={`text-base transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-sm" />
                )}
              </span>
              
              {!isActive && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 to-blue-500/0 hover:from-blue-500/5 hover:to-blue-500/10 transition-all duration-300" />
              )}
            </LoadingLink>
          );
        })}
        
        <button 
          onClick={handleLogoutClick}
          className="relative px-4 py-2 text-sm font-medium text-red-600 bg-red-50/50 border border-red-200/50 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-red-100 hover:border-red-300/60 hover:shadow-xl hover:shadow-gray-400/50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-2 cursor-pointer"
        >
          <span className="relative z-10 flex items-center space-x-2">
            <MaterialIcon name="logout" className="text-sm" />
            <span>Logout</span>
          </span>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/0 to-red-500/0 hover:from-red-500/5 hover:to-red-500/10 transition-all duration-300" />
        </button>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blurry Background Overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-black/20 via-gray-900/30 to-black/40 backdrop-blur-lg transition-all duration-300"
            onClick={handleCancelLogout}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white/75 backdrop-blur-2xl border border-emerald-200/30 rounded-3xl shadow-2xl shadow-emerald-500/20 p-8 max-w-md w-full transform transition-all duration-300 scale-100">
            <div className="text-center">
              {/* Modern Close Button with Different Effect */}
              <button
                onClick={handleCancelLogout}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-100/90 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 border border-transparent hover:border-red-300/60"
              >
                <MaterialIcon name="close" className="text-lg" />
              </button>
              
              {/* Larger Clean SVG Icon without background */}
              <div className="mx-auto flex items-center justify-center w-24 h-24 mb-6">
                <svg 
                  className="w-16 h-16 text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.8} 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                  />
                </svg>
              </div>
              
              {/* Title with gradient */}
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                Sign Out of Healbi?
              </h3>
              
              {/* Message */}
              <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                You'll need to sign back in to access your homeopathy consultation dashboard and continue your wellness journey.
              </p>
              
              {/* Single Sign Out Button */}
              <button
                onClick={handleConfirmLogout}
                className="w-full px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-red-500/95 to-red-600/95 backdrop-blur-sm border border-red-400/50 rounded-2xl hover:from-red-600/95 hover:to-red-700/95 hover:shadow-xl hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-400/40 transition-all duration-200 cursor-pointer flex items-center justify-center space-x-3 group"
              >
                <MaterialIcon name="logout" className="text-lg group-hover:translate-x-1 transition-transform duration-200" />
                <span>Sign Out</span>
              </button>
              
              {/* Bottom accent */}
              <div className="mt-6 flex justify-center">
                <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}