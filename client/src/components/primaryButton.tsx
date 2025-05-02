import React from "react";
import { PrimaryButtonProps } from "../types/interfaces";
import { cn } from "../utils/cn";

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  className = "", 
  icon, 
  ...props 
}) => {
  return (
    <button
      className={cn(
        "flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-5 py-4 transition-colors",
        className
      )}
      {...props}
    >
      {children}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default PrimaryButton;
