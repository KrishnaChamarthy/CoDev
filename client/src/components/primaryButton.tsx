import React from "react";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  className = "", 
  icon, 
  ...props 
}) => {
  return (
    <button
      className={`flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-5 py-4 transition-colors ${className}`}
      {...props}
    >
      {children}
      {icon && <span>{icon}</span>}

    </button>
  );
};

export default PrimaryButton;