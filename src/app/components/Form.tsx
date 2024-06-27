'use client';
import React, { useState } from 'react';

type FormField = {
  name: string;
  label: string;
  type: string;
};

type FormProps = {
  fields: FormField[];
  onSubmit: (data: { [key: string]: string }) => void;
  submitButtonText: string;
};

const Form: React.FC<FormProps> = ({ fields, onSubmit, submitButtonText }) => {
  const [formState, setFormState] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 w-full max-w-md space-y-4">
      {fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formState[field.name] || ''}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-dark-green text-white font-semibold rounded-md hover:bg-dark-green-hover transition duration-200"
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default Form;
