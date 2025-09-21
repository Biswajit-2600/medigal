import { requireNoAuth } from "@/lib/session";
import SignupForm from "@/components/auth/SignupForm";

export default async function SignupPage() {
  await requireNoAuth();
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Join us to start your consultation journey
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}