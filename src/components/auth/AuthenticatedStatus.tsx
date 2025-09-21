"use client";

import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcons";
import LogoutButton from "@/components/auth/LogoutButton";

interface AuthenticatedStatusProps {
  userName: string;
}

export default function AuthenticatedStatus({ userName }: AuthenticatedStatusProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-gray-900 font-display">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-500 rounded-full">
            <MaterialIcon name="check_circle" className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">
            Already Signed In
          </h1>
          <p className="mt-2 text-subtext-light dark:text-subtext-dark">
            Welcome back, {userName}! You are already authenticated.
          </p>
        </div>
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Go to Dashboard
          </Link>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}