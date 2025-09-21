import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcons";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 bg-card-light dark:bg-card-dark border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <MaterialIcon name="medical_services" className="text-primary text-3xl" />
            <h1 className="text-xl font-bold text-text-light dark:text-text-dark">
              MedConsult
            </h1>
          </div>
          <nav className="flex items-center space-x-6">
            <Link 
              href="/dashboard" 
              className="text-sm font-medium text-primary hover:underline"
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="text-sm font-medium text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-primary"
            >
              Profile
            </Link>
            <Link
              href="/wallet"
              className="text-sm font-medium text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-primary"
            >
              Wallet
            </Link>
            <button 
              className="text-sm font-medium text-red-500 hover:underline"
              onClick={() => {
                // Handle logout
              }}
            >
              Logout
            </button>
          </nav>
        </header>
        {children}
      </div>
    </div>
  );
}