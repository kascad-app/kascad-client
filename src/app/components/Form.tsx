"use client";
import React, { useEffect, useRef, useState } from "react";
import "./form.css";
import { useRouter } from "next/navigation";

type FormField = {
  name: string;
  label: string;
  type: string;
};

type FormProps = {
  errorMessage: string;
  fields: FormField[];
  onSubmit: (data: { [key: string]: string }) => void;
  onChangeUserType: () => void;
  textConnect: string;
  submitButtonText: string;
  switchAuthButtonText: string;
  bCatchResponse: boolean;
  route: string;
};

const Form: React.FC<FormProps> = ({
  errorMessage,
  fields,
  onSubmit,
  onChangeUserType,
  textConnect,
  submitButtonText,
  switchAuthButtonText,
  bCatchResponse,
  route,
}) => {
  const [formState, setFormState] = useState<{ [key: string]: string }>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const baseClasses =
    "w-full py-2 px-4 bg-blue-600 text-medium font-bold text-white font-semibold rounded-md hover:bg-blue-300 transition duration-200";
  // // Classes supplémentaires que vous souhaitez ajouter
  // const additionalClasses = "";
  // // Concaténation des classes
  // const buttonClasses = `${baseClasses} ${additionalClasses}`;

  const router = useRouter();
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

  const redirectTo = () => {
    router.push(route);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (buttonRef.current) {
      buttonRef.current.classList.toggle("sending");
    }
    onSubmit(formState);
  };

  const handleClickChangeUserType = () => {
    onChangeUserType();
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
        <p className="text-red">{errorMessage}</p>
        <button ref={buttonRef} type="submit" className={baseClasses}>
          {submitButtonText}
        </button>
        <div className="flex flex-row items-center justify-center">
          <span className="h-0.5 w-full bg-dark-gradient"></span>
          <p className="px-2 font-bold">or</p>
          <span className="h-0.5 w-full bg-dark-gradient"></span>
        </div>
      </form>
      <button
        ref={buttonRef}
        onClick={redirectTo}
        className="w-full py-2 bg-white text-medium font-bold px-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-md hover:bg-blue-300 hover:border-blue-300 hover:text-white  transition duration-200"
      >
        {switchAuthButtonText}
      </button>
      <p
        onClick={handleClickChangeUserType}
        className=" w-fit mx-auto text-blue-600 cursor-pointer text-center"
      >
        {textConnect}
      </p>
    </div>
  );
};

export default Form;
