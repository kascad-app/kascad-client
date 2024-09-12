"use client";
import React, { useEffect, useRef, useState } from "react";
import "./form.css";

type FormField = {
  name: string;
  label: string;
  type: string;
};

type FormProps = {
  errorMessage: string;
  fields: FormField[];
  onSubmit: (data: { [key: string]: string }) => void;
  submitButtonText: string;
  switchAuthButtonText: string;
  bCatchResponse: boolean;
};

const Form: React.FC<FormProps> = ({
  errorMessage,
  fields,
  onSubmit,
  submitButtonText,
  switchAuthButtonText,
  bCatchResponse,
}) => {
  const [formState, setFormState] = useState<{ [key: string]: string }>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const baseClasses =
    "w-full py-2 px-4 bg-blue-600 text-medium font-bold text-white font-semibold rounded-md hover:bg-blue-300 transition duration-200";
  // // Classes supplémentaires que vous souhaitez ajouter
  // const additionalClasses = "";
  // // Concaténation des classes
  // const buttonClasses = `${baseClasses} ${additionalClasses}`;

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.classList.remove("sending");
    }
  }, [bCatchResponse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (buttonRef.current) {
      buttonRef.current.classList.toggle("sending");
    }
    onSubmit(formState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pt-8 px-8 pb-4 w-full max-w-md space-y-4"
    >
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formState[field.name] || ""}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
      ))}
      <p className="text-red">{errorMessage}</p>
      <button ref={buttonRef} type="submit" className={baseClasses}>
        {submitButtonText}
      </button>
      <div className="flex flex-row items-center justify-center">
        <span className="h-0.5 w-full bg-dark-gradient"></span>
        <p className="px-2">or</p>
        <span className="h-0.5 w-full bg-dark-gradient"></span>
      </div>
      <button
        ref={buttonRef}
        className="w-full py-2 text-medium font-bold px-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-md hover:bg-blue-300 hover:border-blue-300 hover:text-white  transition duration-200"
      >
        {switchAuthButtonText}
      </button>
    </form>
  );
};

export default Form;
