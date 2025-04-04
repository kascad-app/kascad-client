import React from 'react';

interface TextareaProps {
  label: string;
  value: string;
  className?: string,
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: React.FC<TextareaProps> = ({ label, value, className, onChange }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm font-light">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        className="border rounded px-3 py-2 min-h-40"
      />
    </div>
  );
};
