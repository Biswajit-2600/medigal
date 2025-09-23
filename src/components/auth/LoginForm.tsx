"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import MaterialIcon from "@/components/ui/MaterialIcons";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().min(10, "Invalid phone number").optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
}).refine((data) => {
  return data.email || data.phone;
}, {
  message: "Either email or phone is required",
  path: ["email", "phone"],
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Watch form values to enable/disable submit button
  const watchedValues = watch();
  const isFormValid = () => {
    const identifier = loginMethod === "email" ? watchedValues.email : watchedValues.phone;
    const password = watchedValues.password;
    
    // Check if identifier exists and has minimum length
    const hasValidIdentifier = identifier && identifier.trim().length > 0;
    // For email, also check basic email format
    if (loginMethod === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return hasValidIdentifier && emailRegex.test(identifier) && password && password.length >= 6;
    }
    // For phone, check minimum 10 digits
    return hasValidIdentifier && identifier.length >= 10 && password && password.length >= 6;
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const identifier = loginMethod === "email" ? data.email : data.phone;
      
      const result = await signIn("credentials", {
        email: loginMethod === "email" ? identifier : "",
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setError("An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Login Method Toggle */}
      <div className="grid grid-cols-2 gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          type="button"
          onClick={() => setLoginMethod("email")}
          className={`px-4 py-2 text-sm font-medium rounded-md cursor-pointer ${
            loginMethod === "email"
              ? "text-white"
              : "text-text-light"
          }`}
          style={loginMethod === "email" ? {backgroundColor: 'rgb(59 130 246 / var(--tw-bg-opacity, 1))'} : {}}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => setLoginMethod("phone")}
          className={`px-4 py-2 text-sm font-medium rounded-md cursor-pointer ${
            loginMethod === "phone"
              ? "text-white"
              : "text-text-light"
          }`}
          style={loginMethod === "phone" ? {backgroundColor: 'rgb(59 130 246 / var(--tw-bg-opacity, 1))'} : {}}
        >
          Phone
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email/Phone Input */}
        <div>
          <label
            htmlFor={loginMethod}
            className="block text-sm font-medium text-text-light"
          >
            {loginMethod === "email" ? "Email Address" : "Phone Number"}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MaterialIcon 
                name={loginMethod === "email" ? "mail_outline" : "phone"} 
                className="text-gray-400"
              />
            </div>
            <input
              id={loginMethod}
              type={loginMethod === "email" ? "email" : "tel"}
              autoComplete={loginMethod === "email" ? "email" : "tel"}
              placeholder={loginMethod === "email" ? "Enter your email" : "Enter your phone number"}
              {...register(loginMethod)}
              className="block w-full pl-10 pr-3 py-2 border-0 rounded-md leading-5 bg-white text-text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm sm:text-sm"
            />
          </div>
          {errors[loginMethod] && (
            <p className="mt-1 text-sm text-red-600">{errors[loginMethod]?.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-text-light"
          >
            Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MaterialIcon name="lock_outline" className="text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              {...register("password")}
              className="block w-full pl-10 pr-12 py-2 border-0 rounded-md leading-5 bg-white text-text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm sm:text-sm"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none flex items-center justify-center"
                style={{ cursor: 'pointer' }}
              >
                <MaterialIcon 
                  name={showPassword ? "visibility_off" : "visibility"} 
                  className="text-gray-400 hover:text-gray-600"
                />
              </button>
            </div>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              {...register("rememberMe")}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              style={{ cursor: 'pointer' }}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-subtext-light"
              style={{ cursor: 'pointer' }}
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <Link
              href="/auth/forgot-password"
              className="font-medium hover:text-blue-500"
              style={{color: 'rgb(59 130 246 / var(--tw-bg-opacity, 1))'}}
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-sm text-red-600 text-center">{error}</div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading || !isFormValid()}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
              isLoading || !isFormValid() 
                ? 'text-gray-400 bg-gray-300 cursor-not-allowed' 
                : 'text-white hover:bg-blue-700 cursor-pointer'
            }`}
            style={isFormValid() && !isLoading ? {backgroundColor: 'rgb(59 130 246 / var(--tw-bg-opacity, 1))'} : {}}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </form>

      {/* Sign Up Link */}
      <div className="text-center mt-6">
        <p className="text-sm text-subtext-light">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium hover:text-blue-500"
            style={{color: 'rgb(59 130 246 / var(--tw-bg-opacity, 1))'}}
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}
