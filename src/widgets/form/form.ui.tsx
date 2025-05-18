"use client";

import React, { useEffect, useRef, useState } from "react";
import "./form.style.css";
import { useRouter } from "next/navigation";
import { FormTypes } from "@/entities/form";

export const Form: React.FC<FormTypes.FormProps> = ({
  error,
  fields,
  onSubmit,
  onChangeAuth,
  submitButtonText,
  switchAuthButtonText,
  bCatchResponse,
}) => {
  const [formState, setFormState] = useState<{ [key: string]: string }>({});
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const handleClickChangeAuth = () => {
    setFormState({});
    error.set("");
    onChangeAuth();
  };

  return (
    <div className="pt-8 px-8 pb-4 w-full max-w-md space-y-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h2 className="font-michroma text-title ">{submitButtonText}</h2>
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
        {Boolean(error) && error.get !== "" && (
          <p className="text-red-600">{error.get}</p>
        )}
        <button
          ref={buttonRef}
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-medium font-bold text-white font-semibold rounded-md hover:bg-blue-300"
        >
          {submitButtonText}
        </button>
        <div className="flex flex-row items-center justify-center">
          <span className="h-0.5 w-full bg-dark-gradient"></span>
          <p className="px-2 font-bold">or</p>
          <span className="h-0.5 w-full bg-dark-gradient"></span>
        </div>
      </form>
      <button
        onClick={handleClickChangeAuth}
        className="w-full py-2 bg-white text-medium px-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-md hover:bg-blue-300 hover:border-blue-300 hover:text-white  transition duration-200"
      >
        {switchAuthButtonText}
      </button>
    </div>
  );
};
