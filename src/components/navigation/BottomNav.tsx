"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, User, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Wallet",
    href: "/wallet",
    icon: Wallet,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white">
      <div className="mx-auto flex max-w-md justify-around">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center p-4",
              pathname === item.href
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="mt-1 text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}