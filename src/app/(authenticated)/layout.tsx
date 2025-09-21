import { ReactNode } from "react";
import { requireAuth } from "@/lib/session";
import BottomNav from "@/components/navigation/BottomNav";
import AppHeader from "@/components/navigation/AppHeader";

interface LayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: LayoutProps) {
  const session = await requireAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader user={session.user} />
      <main className="flex-1 px-4 py-6">{children}</main>
      <BottomNav />
    </div>
  );
}