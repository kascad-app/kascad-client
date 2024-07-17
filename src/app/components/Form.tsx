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
  bCatchResponse: boolean;
};

const Form: React.FC<FormProps> = ({
  errorMessage,
  fields,
  onSubmit,
  submitButtonText,
  bCatchResponse,
}) => {
  const [formState, setFormState] = useState<{ [key: string]: string }>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const baseClasses =
    "w-full py-2 px-4 bg-dark-green text-white font-semibold rounded-md hover:bg-dark-green-hover transition duration-200";
  // // Classes supplémentaires que vous souhaitez ajouter
  // const additionalClasses = "";
  // // Concaténation des classes
  // const buttonClasses = `${baseClasses} ${additionalClasses}`;

  useEffect(() => {
    console.log("Response");
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
      className="bg-white p-8 w-full max-w-md space-y-4"
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
    </form>
  );
};

export default Form;
