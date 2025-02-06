import React from 'react';

interface InputProps {
  label: string;
  className?: string;
  value: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'range';
  min?: number;
  max?: number;
  step?: number;
}

export const Input: React.FC<InputProps> = ({ label, className='', value, onChange, type = 'text', min, max, step }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm font-light">{label}</label>
      <input
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
