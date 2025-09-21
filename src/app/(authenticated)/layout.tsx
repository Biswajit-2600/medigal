import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import BottomNav from "@/components/navigation/BottomNav";
import AppHeader from "@/components/navigation/AppHeader";

interface LayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    await redirect("/auth/login");
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader user={session.user} />
      <main className="flex-1 px-4 py-6">{children}</main>
      <BottomNav />
    </div>
  );
}