import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    await redirect("/auth/login");
  }

  return session;
}

export async function requireNoAuth() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    await redirect("/dashboard");
  }
}