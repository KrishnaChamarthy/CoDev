import React from "react";
import { PrimaryButtonProps } from "../types/interfaces";

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  className = "",
  style = {},
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-4 text-white bg-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-500 transition-colors text-lg font-medium ${className}`}
      style={{
        boxShadow: "0 5px 15px -3px rgba(59, 130, 246, 0.3)",
        ...style,
      }}
    >
      {children}
      {icon && icon}
    </button>
  );
};

export default PrimaryButton;
