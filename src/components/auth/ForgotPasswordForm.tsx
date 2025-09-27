"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/lib/validations/auth";

export default function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // In production, make an API call to send reset email
      // For now, we'll just simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="rounded-md bg-green-50 p-4">
          <p className="text-sm text-green-700">
            If an account exists with that email, we've sent password reset
            instructions.
          </p>
        </div>
        <Link href="/auth/login">
          <Button
            variant="outline"
            className="w-full"
          >
            Return to login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Send reset instructions
      </Button>

      <div className="text-center text-sm text-gray-600">
        Remember your password?{" "}
        <Link
          href="/auth/login"
          className="font-medium relative transition-all duration-300 hover:text-blue-600 group inline-block"
          style={{color: 'rgb(59 130 246 / var(--tw-bg-opacity, 1))'}}
        >
          <span className="relative z-10">Sign in</span>
          <div className="absolute bottom-0 left-0 w-0 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-full transition-all duration-300 ease-out" style={{height: '1px'}}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
        </Link>
      </div>
    </form>
  );
}