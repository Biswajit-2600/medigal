import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

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
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {children}
    </div>
  );
}
