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
              className={`text-sm font-medium hover:underline transition-colors duration-200 ${
                isActive 
                  ? "text-blue-600 font-semibold" 
                  : "text-gray-600 hover:text-blue-500"
              }`}
              style={isActive ? { color: "#2563EB" } : { color: "rgb(100, 116, 139)" }}
            >
              {item.name}
            </Link>
          );
        })}
        
        <button 
          onClick={handleLogout}
          className="text-sm font-medium text-red-500 hover:text-red-600 hover:underline transition-colors duration-200 cursor-pointer"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}