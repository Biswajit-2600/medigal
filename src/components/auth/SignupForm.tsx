"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import MaterialIcon from "../ui/MaterialIcons";

const signupSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  loginMethod: z.enum(["email", "phone"]),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().min(10, "Invalid phone number").optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => {
  if (data.loginMethod === "email" && !data.email) {
    return false;
  }
  if (data.loginMethod === "phone" && !data.phone) {
    return false;
  }
  return true;
}, {
  message: "Email or phone number is required",
  path: ["email", "phone"],
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      loginMethod: "email",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const loginMethod = watch("loginMethod");

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Validate email/phone based on login method
      if (data.loginMethod === "email" && !data.email) {
        setError("Email is required for email login");
        return;
      }
      if (data.loginMethod === "phone" && !data.phone) {
        setError("Phone number is required for phone login");
        return;
      }

      // In production, make an API call to create the user
      // For now, we'll simulate a successful signup
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const result = await signIn("credentials", {
        identifier: data.loginMethod === "email" ? data.email : data.phone,
        password: data.password,
        type: data.loginMethod,
        redirect: false,
      });

      if (result?.error) {
        setError("Failed to create account. Please try again.");
        return;
      }

      router.refresh();
      router.push("/dashboard");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
          <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}

      <div>
        <label
          className="block text-sm font-medium text-text-light dark:text-text-dark"
          htmlFor="full-name"
        >
          Full Name
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MaterialIcon
              name="person_outline"
              className="text-subtext-light dark:text-subtext-dark"
            />
          </div>
          <input
            {...register("name")}
            type="text"
            className="block w-full rounded-md border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-2 pl-10 pr-3 text-sm placeholder:text-subtext-light dark:placeholder:text-subtext-dark focus:border-primary focus:outline-none focus:ring-primary"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex rounded-md bg-gray-100 dark:bg-gray-700 p-1">
        <button
          type="button"
          onClick={() => {
            setValue("loginMethod", "email");
            trigger(["email", "phone"]);
          }}
          className={`w-1/2 py-2 text-sm font-medium ${
            loginMethod === "email"
              ? "text-white bg-primary rounded-md shadow-sm"
              : "text-subtext-light dark:text-subtext-dark"
          }`}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => {
            setValue("loginMethod", "phone");
            trigger(["email", "phone"]);
          }}
          className={`w-1/2 py-2 text-sm font-medium ${
            loginMethod === "phone"
              ? "text-white bg-primary rounded-md shadow-sm"
              : "text-subtext-light dark:text-subtext-dark"
          }`}
        >
          Phone
        </button>
      </div>

      {loginMethod === "email" ? (
        <div>
          <label
            className="block text-sm font-medium text-text-light dark:text-text-dark"
            htmlFor="email"
          >
            Email Address
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MaterialIcon
                name="email"
                className="text-subtext-light dark:text-subtext-dark"
              />
            </div>
            <input
              {...register("email")}
              type="email"
              className="block w-full rounded-md border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-2 pl-10 pr-3 text-sm placeholder:text-subtext-light dark:placeholder:text-subtext-dark focus:border-primary focus:outline-none focus:ring-primary"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <label
            className="block text-sm font-medium text-text-light dark:text-text-dark"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MaterialIcon
                name="phone"
                className="text-subtext-light dark:text-subtext-dark"
              />
            </div>
            <input
              {...register("phone")}
              type="tel"
              className="block w-full rounded-md border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-2 pl-10 pr-3 text-sm placeholder:text-subtext-light dark:placeholder:text-subtext-dark focus:border-primary focus:outline-none focus:ring-primary"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
      )}

      <div>
        <label
          className="block text-sm font-medium text-text-light dark:text-text-dark"
          htmlFor="password"
        >
          Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MaterialIcon
              name="lock"
              className="text-subtext-light dark:text-subtext-dark"
            />
          </div>
          <input
            {...register("password")}
            type="password"
            className="block w-full rounded-md border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-2 pl-10 pr-3 text-sm placeholder:text-subtext-light dark:placeholder:text-subtext-dark focus:border-primary focus:outline-none focus:ring-primary"
            placeholder="Create a password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium text-text-light dark:text-text-dark"
          htmlFor="confirm-password"
        >
          Confirm Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MaterialIcon
              name="lock"
              className="text-subtext-light dark:text-subtext-dark"
            />
          </div>
          <input
            {...register("confirmPassword")}
            type="password"
            className="block w-full rounded-md border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-2 pl-10 pr-3 text-sm placeholder:text-subtext-light dark:placeholder:text-subtext-dark focus:border-primary focus:outline-none focus:ring-primary"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          {...register("acceptTerms")}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-primary focus:ring-primary"
        />
        <label
          className="ml-2 block text-sm text-subtext-light dark:text-subtext-dark"
          htmlFor="terms-and-privacy"
        >
          I agree to the{" "}
          <Link
            href="/terms"
            className="font-medium text-primary hover:text-primary/80"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-medium text-primary hover:text-primary/80"
          >
            Privacy Policy
          </Link>
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {isSubmitting ? (
          <MaterialIcon name="sync" className="animate-spin" />
        ) : (
          "Create Account"
        )}
      </button>

      <div className="mt-6 text-center">
        <p className="text-sm text-subtext-light dark:text-subtext-dark">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}