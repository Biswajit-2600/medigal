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
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    getValues,
    trigger,
    clearErrors,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      loginMethod: "email",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const loginMethod = watch("loginMethod");
  
  // Watch form values to enable/disable submit button
  const watchedValues = watch();
  const isFormValid = () => {
    const { firstName, lastName, email, phone, password, confirmPassword, acceptTerms } = watchedValues;
    
    // Check all required fields
    const hasFirstName = firstName && firstName.trim().length > 0;
    const hasLastName = lastName && lastName.trim().length > 0;
    const hasPassword = password && password.length >= 6;
    const hasConfirmPassword = confirmPassword && confirmPassword === password;
    const hasAcceptedTerms = acceptTerms;
    
    // Check identifier based on login method
    let hasValidIdentifier = false;
    if (loginMethod === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      hasValidIdentifier = !!(email && emailRegex.test(email));
    } else {
      hasValidIdentifier = !!(phone && phone.length >= 10);
    }
    
    return hasFirstName && hasLastName && hasValidIdentifier && hasPassword && hasConfirmPassword && hasAcceptedTerms;
  };

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

      // Show success modal instead of auto-login
      setShowSuccessModal(true);
      
      // Redirect to login page after showing success message
      setTimeout(() => {
        router.push('/auth/login');
      }, 2500);

    } catch (error) {
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium text-text-light"
            htmlFor="first-name"
          >
            First Name
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MaterialIcon
                name="person_outline"
                className="text-gray-400"
              />
            </div>
            <input
              {...register("firstName")}
              type="text"
              className="block w-full pl-10 pr-3 py-2 border-0 rounded-md leading-5 bg-white text-text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm sm:text-sm"
              placeholder="First name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.firstName.message}
              </p>
            )}
          </div>
        </div>
        
        <div>
          <label
            className="block text-sm font-medium text-text-light"
            htmlFor="last-name"
          >
            Last Name
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MaterialIcon
                name="person_outline"
                className="text-gray-400"
              />
            </div>
            <input
              {...register("lastName")}
              type="text"
              className="block w-full pl-10 pr-3 py-2 border-0 rounded-md leading-5 bg-white text-text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm sm:text-sm"
              placeholder="Last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6 bg-gray-200 p-1 rounded-lg">
        <button
          type="button"
          onClick={() => {
            setError(null); // Clear any errors
            setValue("loginMethod", "email");
            setValue("phone", ""); // Clear phone value
            clearErrors(["email", "phone"]); // Clear field errors
          }}
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
          onClick={() => {
            setError(null); // Clear any errors
            setValue("loginMethod", "phone");
            setValue("email", ""); // Clear email value
            clearErrors(["email", "phone"]); // Clear field errors
          }}
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

      <div>
        <label
          className="block text-sm font-medium text-text-light"
          htmlFor="email"
        >
          {loginMethod === "email" ? "Email Address" : "Phone Number"}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MaterialIcon
              name={loginMethod === "email" ? "email" : "phone"}
              className="text-gray-400"
            />
          </div>
          {loginMethod === "email" ? (
            <input
              {...register("email")}
              type="email"
              className="block w-full pl-10 pr-3 py-2 border-0 rounded-md leading-5 bg-white text-text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm sm:text-sm"
              placeholder="Enter your email"
            />
          ) : (
            <input
              {...register("phone")}
              type="tel"
              className="block w-full pl-10 pr-3 py-2 border-0 rounded-md leading-5 bg-white text-text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm sm:text-sm"
              placeholder="Enter your phone number"
            />
          )}
          {errors.email && loginMethod === "email" && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
          {errors.phone && loginMethod === "phone" && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium text-text-light"
          htmlFor="password"
        >
          Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MaterialIcon
              name="lock"
              className="text-gray-400"
            />
          </div>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            tabIndex={0}
            className="block w-full pl-10 pr-10 py-2 border-0 rounded-md leading-5 bg-white text-text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm sm:text-sm"
            placeholder="Create a password"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer flex items-center justify-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              <MaterialIcon
                name={showPassword ? "visibility_off" : "visibility"}
                className="text-gray-400"
              />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium text-text-light"
          htmlFor="confirm-password"
        >
          Confirm Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MaterialIcon
              name="lock"
              className="text-gray-400"
            />
          </div>
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            tabIndex={0}
            className="block w-full pl-10 pr-10 py-2 border-0 rounded-md leading-5 bg-white text-text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm sm:text-sm"
            placeholder="Confirm your password"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer flex items-center justify-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <MaterialIcon
                name={showConfirmPassword ? "visibility_off" : "visibility"}
                className="text-gray-400"
              />
            </button>
          </div>
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
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          style={{ cursor: 'pointer' }}
        />
        <label
          className="ml-2 block text-sm text-subtext-light"
          htmlFor="terms-and-privacy"
          style={{ cursor: 'pointer' }}
        >
          I agree to the{" "}
          <Link
            href="/terms"
            className="font-medium hover:text-blue-500"
            style={{color: 'rgb(59 130 246 / var(--tw-bg-opacity, 1))'}}
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-medium hover:text-blue-500"
            style={{color: 'rgb(59 130 246 / var(--tw-bg-opacity, 1))'}}
          >
            Privacy Policy
          </Link>
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isFormValid()}
        className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed ${
          isSubmitting || !isFormValid() 
            ? "cursor-not-allowed bg-gray-400" 
            : "cursor-pointer hover:bg-blue-700 text-white"
        }`}
        style={isFormValid() && !isSubmitting ? {backgroundColor: 'rgb(59 130 246 / var(--tw-bg-opacity, 1))'} : {}}
      >
        {isSubmitting ? (
          <>
            <MaterialIcon name="hourglass_empty" className="animate-spin mr-2" />
            Creating Account...
          </>
        ) : (
          <>
            <MaterialIcon name="person_add" className="mr-2" />
            Create Account
          </>
        )}
      </button>

      <div className="mt-6 text-center">
        <p className="text-sm text-subtext-light">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium hover:text-blue-500"
            style={{color: 'rgb(59 130 246 / var(--tw-bg-opacity, 1))'}}
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>

    {/* Success Modal */}
    {showSuccessModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-emerald-900/20 to-black/30 backdrop-blur-lg transition-all duration-300" />
        
        {/* Modal Content */}
        <div className="relative backdrop-blur-2xl border border-emerald-200/30 rounded-3xl shadow-2xl shadow-emerald-500/20 p-8 max-w-md w-full transform transition-all duration-300 scale-100" style={{ backgroundColor: 'rgba(245, 245, 244, 0.90)' }}>
          <div className="text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center w-20 h-20 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center">
                <MaterialIcon name="check_circle" className="text-emerald-600 text-4xl" />
              </div>
            </div>
            
            {/* Success Message */}
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent mb-3">
              Account Created Successfully!
            </h3>
            
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Welcome to Healbi! Your account has been created successfully. You'll be redirected to the login page shortly.
            </p>
            
            {/* Loading indicator */}
            <div className="flex justify-center items-center space-x-2">
              <MaterialIcon name="hourglass_empty" className="text-emerald-600 animate-spin" />
              <span className="text-sm text-emerald-600">Redirecting to login...</span>
            </div>
            
            {/* Bottom accent */}
            <div className="mt-6 flex justify-center">
              <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}