import LoginForm from "@/components/auth/LoginForm";
import MaterialIcon from "@/components/ui/MaterialIcons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AuthenticatedStatus from "@/components/auth/AuthenticatedStatus";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  
  // If user is already authenticated, show authenticated status
  if (session?.user) {
    return <AuthenticatedStatus userName={session.user.name || "User"} />;
  }
  
  return (
    <div className="bg-background-light h-screen overflow-hidden font-display">
      <div className="flex items-center justify-center h-full pt-4 pb-20">
        <div className="w-full max-w-md p-8 space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full" style={{backgroundColor: 'rgb(59 130 246 / var(--tw-bg-opacity, 1))'}}>
              <MaterialIcon name="medical_services" className="text-white" style={{fontSize: '36px'}} />
            </div>
            <h1 className="text-3xl font-bold text-text-light">
              Welcome Back
            </h1>
            <p className="mt-2 text-subtext-light">
              Sign in to your medical consultation account
            </p>
          </div>
          <div 
            className="p-8 rounded-lg shadow-md" 
            style={{
              backgroundColor: 'rgb(255, 255, 255)',
              '--tw-bg-opacity': 1
            } as React.CSSProperties}
          >
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}