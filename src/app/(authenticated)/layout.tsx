import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import BottomNav from "@/components/navigation/BottomNav";

interface LayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/auth/login");
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold text-blue-600">MediGal - {session.user.name}</h1>
      </header>
      <main className="flex-1 px-4 py-6">{children}</main>
      <BottomNav />
    </div>
  );
}
