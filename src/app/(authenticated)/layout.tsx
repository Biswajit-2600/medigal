import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/navigation/Navbar";
import { LoadingProvider } from "@/contexts/LoadingContext";

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
    <LoadingProvider>
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <div className="fixed inset-0 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </LoadingProvider>
  );
}
