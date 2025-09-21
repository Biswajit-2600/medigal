"use client";

import Link from "next/link";
import { User } from "next-auth";

interface AppHeaderProps {
  user: User;
}

export default function AppHeader({ user }: AppHeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="text-xl font-bold text-blue-600">
          MediGal
        </Link>
        <div className="flex items-center gap-x-1 text-sm font-medium text-gray-700">
          {user.name}
        </div>
      </div>
    </header>
  );
}
