import { requireNoAuth } from "@/lib/session";
import SignupForm from "@/components/auth/SignupForm";
import MaterialIcon from "@/components/ui/MaterialIcons";

export default async function SignupPage() {
  await requireNoAuth();
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-primary">
            <span className="material-icons text-white">person_add</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-text-light dark:text-text-dark">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-subtext-light dark:text-subtext-dark">
            Join us for professional medical consultation
          </p>
        </div>
        <div className="bg-card-light dark:bg-card-dark p-8 shadow-lg rounded-lg">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}