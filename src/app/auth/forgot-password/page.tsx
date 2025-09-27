import { requireNoAuth } from "@/lib/session";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default async function ForgotPasswordPage() {
  await requireNoAuth();
  
  return (
    <>
      <style>{`
        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none;
        }
        html,
        body {
          scrollbar-width: none;
          overflow: hidden;
          height: 100vh;
        }
      `}</style>
      <div className="bg-background-light h-screen overflow-hidden font-display flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Forgot your password?
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email and we'll send you a reset link
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </>
  );
}