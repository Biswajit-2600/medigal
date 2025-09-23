import { requireNoAuth } from "@/lib/session";
import SignupForm from "@/components/auth/SignupForm";
import MaterialIcon from "@/components/ui/MaterialIcons";

export default async function SignupPage() {
  await requireNoAuth();
  
  return (
    <div className="bg-background-light font-display">
      <div className="py-8 px-4">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full" style={{backgroundColor: 'rgb(59 130 246 / var(--tw-bg-opacity, 1))'}}>
              <MaterialIcon name="person_add" className="text-white" style={{fontSize: '36px'}} />
            </div>
            <h1 className="text-3xl font-bold text-text-light">
              Create Account
            </h1>
            <p className="mt-2 text-subtext-light">
              Join us for professional medical consultation
            </p>
          </div>
          <div 
            className="p-8 rounded-lg shadow-md mb-8" 
            style={{
              backgroundColor: 'rgb(255, 255, 255)',
              '--tw-bg-opacity': 1
            } as React.CSSProperties}
          >
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}