import React from "react";

interface InputProps {
  label: string;
  className?: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "range";
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  className = "",
  value,
  onChange,
  type = "text",
  min,
  max,
  step,
  disabled = false,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm font-light">{label}</label>
      <input
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="border rounded px-3 py-2"
      />
    </div>
  );
};
