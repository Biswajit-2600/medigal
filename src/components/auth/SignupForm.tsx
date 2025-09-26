"use client";

import React, { useState } from "react";
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
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // Password strength evaluation function
  const evaluatePasswordStrength = (password: string) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    setPasswordChecks(checks);

    // Calculate strength score (0-5)
    const score = Object.values(checks).filter(Boolean).length;
    setPasswordStrength(score);

    return score;
  };
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
  
  // Watch password changes for real-time strength checking
  const watchPassword = watch("password");
  React.useEffect(() => {
    if (watchPassword) {
      evaluatePasswordStrength(watchPassword);
    } else {
      setPasswordStrength(0);
      setPasswordChecks({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
      });
    }
  }, [watchPassword]);
  
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
      setError(null);
      // Validate email/phone based on login method
      if (data.loginMethod === "email" && !data.email) {
        setError("Email is required for email login");
        return;
      }
      if (data.loginMethod === "phone" && !data.phone) {
        setError("Phone number is required for phone login");
        return;
      }

      // Debug: log data being sent
      console.log("Submitting signup data:", data);

      // Send user data to API
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }),
      });
      console.log("Signup API response status:", res.status);
      const result = await res.json();
      console.log("Signup API response:", result);
      if (result.success) {
        setShowSuccessModal(true);
        setTimeout(() => {
          router.push('/auth/login');
        }, 2500);
      } else {
        setError(result.error || "Failed to create account. Please try again.");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      setError(error?.message || "Failed to create account. Please try again.");
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
            htmlFor="signup-first-name"
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
              id="signup-first-name"
              {...register("firstName")}
              type="text"
              tabIndex={1}
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
            htmlFor="signup-last-name"
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
              id="signup-last-name"
              {...register("lastName")}
              type="text"
              tabIndex={2}
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
          htmlFor={loginMethod === "email" ? "signup-email" : "signup-phone"}
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
              id="signup-email"
              {...register("email")}
              type="email"
              tabIndex={3}
              className="block w-full pl-10 pr-3 py-2 border-0 rounded-md leading-5 bg-white text-text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm sm:text-sm"
              placeholder="Enter your email"
            />
          ) : (
            <input
              id="signup-phone"
              {...register("phone")}
              type="tel"
              tabIndex={3}
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
          htmlFor="signup-password"
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
            id="signup-password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            tabIndex={4}
            className={`block w-full pl-10 py-2 border-0 rounded-md leading-5 bg-white text-text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm sm:text-sm ${
              watchPassword && watchPassword.length > 0 ? 'pr-10' : 'pr-3'
            }`}
            placeholder="Create a password"
          />
          {watchPassword && watchPassword.length > 0 && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer flex items-center justify-center transition-opacity duration-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                <MaterialIcon
                  name={showPassword ? "visibility_off" : "visibility"}
                  className="text-gray-400 hover:text-gray-600"
                />
              </button>
            </div>
          )}
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Password Strength Indicator */}
        {watchPassword && (
          <div className="mt-3 space-y-2">
            {/* Strength Bar */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full transition-all duration-700 ease-out rounded-full ${
                    passwordStrength === 0 ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                    passwordStrength === 1 ? 'bg-gradient-to-r from-red-400 to-red-500' :
                    passwordStrength === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                    passwordStrength === 3 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                    passwordStrength === 4 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                    'bg-gradient-to-r from-green-400 to-green-500'
                  } shadow-sm`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
              <span className={`text-xs font-medium transition-colors duration-300 ${
                passwordStrength === 0 ? 'text-gray-500' :
                passwordStrength === 1 ? 'text-red-600' :
                passwordStrength === 2 ? 'text-orange-600' :
                passwordStrength === 3 ? 'text-yellow-600' :
                passwordStrength === 4 ? 'text-blue-600' :
                'text-green-600'
              }`}>
                {passwordStrength === 0 ? 'Very Weak' :
                 passwordStrength === 1 ? 'Weak' :
                 passwordStrength === 2 ? 'Fair' :
                 passwordStrength === 3 ? 'Good' :
                 passwordStrength === 4 ? 'Strong' :
                 'Very Strong'}
              </span>
            </div>

            {/* Requirements Checklist */}
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div className={`flex items-center space-x-1 transition-all duration-300 ${
                passwordChecks.length ? 'text-green-600' : 'text-gray-400'
              }`}>
                <MaterialIcon
                  name={passwordChecks.length ? "check_circle" : "radio_button_unchecked"}
                  className={`text-sm transition-all duration-300 ${
                    passwordChecks.length ? 'scale-110' : 'scale-100'
                  }`}
                />
                <span>8+ characters</span>
              </div>
              <div className={`flex items-center space-x-1 transition-all duration-300 ${
                passwordChecks.uppercase ? 'text-green-600' : 'text-gray-400'
              }`}>
                <MaterialIcon
                  name={passwordChecks.uppercase ? "check_circle" : "radio_button_unchecked"}
                  className={`text-sm transition-all duration-300 ${
                    passwordChecks.uppercase ? 'scale-110' : 'scale-100'
                  }`}
                />
                <span>Uppercase</span>
              </div>
              <div className={`flex items-center space-x-1 transition-all duration-300 ${
                passwordChecks.lowercase ? 'text-green-600' : 'text-gray-400'
              }`}>
                <MaterialIcon
                  name={passwordChecks.lowercase ? "check_circle" : "radio_button_unchecked"}
                  className={`text-sm transition-all duration-300 ${
                    passwordChecks.lowercase ? 'scale-110' : 'scale-100'
                  }`}
                />
                <span>Lowercase</span>
              </div>
              <div className={`flex items-center space-x-1 transition-all duration-300 ${
                passwordChecks.number ? 'text-green-600' : 'text-gray-400'
              }`}>
                <MaterialIcon
                  name={passwordChecks.number ? "check_circle" : "radio_button_unchecked"}
                  className={`text-sm transition-all duration-300 ${
                    passwordChecks.number ? 'scale-110' : 'scale-100'
                  }`}
                />
                <span>Number</span>
              </div>
              <div className={`flex items-center space-x-1 transition-all duration-300 col-span-2 ${
                passwordChecks.special ? 'text-green-600' : 'text-gray-400'
              }`}>
                <MaterialIcon
                  name={passwordChecks.special ? "check_circle" : "radio_button_unchecked"}
                  className={`text-sm transition-all duration-300 ${
                    passwordChecks.special ? 'scale-110' : 'scale-100'
                  }`}
                />
                <span>Special character (!@#$%^&*)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <label
          className="block text-sm font-medium text-text-light"
          htmlFor="signup-confirm-password"
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
            id="signup-confirm-password"
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            tabIndex={5}
            className={`block w-full pl-10 py-2 border-0 rounded-md leading-5 bg-white text-text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm sm:text-sm ${
              watch("confirmPassword") && watch("confirmPassword").length > 0 ? 'pr-10' : 'pr-3'
            }`}
            placeholder="Confirm your password"
          />
          {watch("confirmPassword") && watch("confirmPassword").length > 0 && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer flex items-center justify-center transition-opacity duration-200"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <MaterialIcon
                  name={showConfirmPassword ? "visibility_off" : "visibility"}
                  className="text-gray-400"
                />
              </button>
            </div>
          )}
        </div>
        
        {/* Password Match Indicator */}
        {watch("confirmPassword") && watch("confirmPassword").length > 0 && (
          <div className="mt-2 flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
            <MaterialIcon
              name={watch("confirmPassword") === watchPassword ? "check_circle" : "cancel"}
              className={`text-sm transition-all duration-300 ${
                watch("confirmPassword") === watchPassword 
                  ? 'text-green-600 scale-110' 
                  : 'text-red-600 scale-110'
              }`}
            />
            <span className={`text-xs font-medium transition-colors duration-300 ${
              watch("confirmPassword") === watchPassword 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {watch("confirmPassword") === watchPassword 
                ? 'Passwords match ✓' 
                : 'Passwords do not match ✗'
              }
            </span>
          </div>
        )}
        
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="signup-accept-terms"
          {...register("acceptTerms")}
          type="checkbox"
          tabIndex={6}
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          style={{ cursor: 'pointer' }}
        />
        <label
          className="ml-2 block text-sm text-subtext-light"
          htmlFor="signup-accept-terms"
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
        tabIndex={7}
        className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
          isSubmitting || !isFormValid() 
            ? "cursor-not-allowed bg-gray-400" 
            : "text-white bg-blue-600 hover:scale-[1.03] hover:shadow-lg cursor-pointer"
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
        <div className="text-sm text-subtext-light">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium relative transition-all duration-300 hover:text-blue-600 group inline-block"
            style={{color: 'rgb(59 130 246 / var(--tw-bg-opacity, 1))'}}
          >
            <span className="relative z-10">Sign in</span>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-full transition-all duration-300 ease-out"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </Link>
        </div>
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