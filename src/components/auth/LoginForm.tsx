"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().min(10, "Invalid phone number").optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.refresh();
      router.push("/dashboard");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-foreground-light dark:bg-foreground-dark p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-2 mb-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
        <button
          type="button"
          onClick={() => setLoginMethod("email")}
          className={`px-4 py-2 text-sm font-medium ${
            loginMethod === "email"
              ? "text-white bg-primary rounded-md"
              : "text-text-light dark:text-text-dark"
          }`}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => setLoginMethod("phone")}
          className={`px-4 py-2 text-sm font-medium ${
            loginMethod === "phone"
              ? "text-white bg-primary rounded-md"
              : "text-text-light dark:text-text-dark"
          }`}
        >
          Phone
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div>
          <label
            className="block text-sm font-medium text-text-light dark:text-text-dark"
            htmlFor={loginMethod === "email" ? "email" : "phone"}
          >
            {loginMethod === "email" ? "Email Address" : "Phone Number"}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons text-gray-400">
                {loginMethod === "email" ? "mail_outline" : "phone"}
              </span>
            </div>
            <input
              type={loginMethod === "email" ? "email" : "tel"}
              id={loginMethod === "email" ? "email" : "phone"}
              {...register(loginMethod === "email" ? "email" : "phone")}
              className="block w-full pl-10 pr-3 py-2 border border-border-light dark:border-border-dark rounded-md leading-5 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder={
                loginMethod === "email"
                  ? "Enter your email"
                  : "Enter your phone number"
              }
            />
            {errors[loginMethod === "email" ? "email" : "phone"] && (
              <p className="mt-1 text-sm text-red-600">
                {errors[loginMethod === "email" ? "email" : "phone"]?.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-text-light dark:text-text-dark"
            htmlFor="password"
          >
            Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons text-gray-400">lock_outline</span>
            </div>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="block w-full pl-10 pr-3 py-2 border border-border-light dark:border-border-dark rounded-md leading-5 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-border-light dark:border-border-dark rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-text-light dark:text-text-dark"
            >
              Remember me
            </label>
          </div>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary hover:text-primary/80"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {isSubmitting ? (
            <span className="material-icons animate-spin">circle</span>
          ) : (
            "Sign in"
          )}
        </button>

        <div className="text-center">
          <p className="text-sm text-subtext-light dark:text-subtext-dark">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}