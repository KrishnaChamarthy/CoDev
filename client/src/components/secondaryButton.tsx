import React from "react";
import { SecondaryButtonProps } from "../types/interfaces";


const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  onClick,
  className = "",
  style = {},
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-4 border border-gray-600 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors text-white ${className}`}
      style={style}
    >
      {children}
      {icon && icon}
    </button>
  );
};

export default SecondaryButton;
