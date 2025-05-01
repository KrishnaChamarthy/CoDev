// src/components/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = "primary", 
  icon, 
  children, 
  className = "", 
  ...props 
}) => {
  const baseClasses = "flex items-center gap-2 font-medium rounded-lg px-5 py-2.5 transition-colors disabled:opacity-50";
  const variantClasses = variant === "primary" 
    ? "bg-blue-500 hover:bg-blue-600 text-white" 
    : "bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800";
  
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;