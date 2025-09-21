import { requireNoAuth } from "@/lib/session";
import LoginForm from "@/components/auth/LoginForm";
import MaterialIcon from "@/components/ui/MaterialIcons";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  try {
    await requireNoAuth();
  } catch (error) {
    // If user is already authenticated, redirect to dashboard
    redirect("/dashboard");
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-gray-900 font-display">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary rounded-full">
            <MaterialIcon name="medical_services" className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">
            Welcome Back
          </h1>
          <p className="mt-2 text-subtext-light dark:text-subtext-dark">
            Sign in to your medical consultation account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}