import React from "react";

interface ButtonProps {
  variant?: "outline" | "solid";
  children: React.ReactNode;
  size?: string;
  delete?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  children,
  size,
  delete: isDelete,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative rounded transition-colors 
        ${variant === "outline" ? "border" : "bg-blue-500 text-white"} 
        ${size === "small" ? "px-4 py-1" : "px-4 py-2"}
        ${isDelete ? "hover:bg-red-500" : ""}
      `}
    >
      <span>{children}</span>
    </button>
  );
};
