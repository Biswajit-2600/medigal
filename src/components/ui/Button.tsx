import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  as?: any; // Allow rendering as different elements
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      as: Component = "button",
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: "text-white hover:bg-blue-700 cursor-pointer",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 cursor-pointer",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <Component
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        style={
          variant === "primary" && !disabled && !isLoading
            ? { backgroundColor: 'rgb(59 130 246)' }
            : {}
        }
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span className="ml-2">Loading...</span>
          </div>
        ) : (
          children
        )}
      </Component>
    );
  }
);

Button.displayName = "Button";

export default Button;