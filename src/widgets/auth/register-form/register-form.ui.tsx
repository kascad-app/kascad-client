"use client";
import { ROUTES } from "@/shared/constants/ROUTES";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRegister } from "@/entities/authentication/authentication.hooks";
import type { GenderIdentity } from "@kascad-app/shared-types";
import { Form } from "@components/ui/form";

const registerFormSchema = z
  .object({
    email: z.string().email(),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    gender: z.enum(["male", "female", "other"]),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .refine(
        (val) =>
          /[A-Z]/.test(val) &&
          /[a-z]/.test(val) &&
          /[0-9]/.test(val) &&
          /[^A-Za-z0-9]/.test(val),
        {
          message:
            "Password must include uppercase, lowercase, number, and symbol",
        },
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const RegisterFormWidget: React.FC = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      gender: "male",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit", // Valide uniquement au submit
    reValidateMode: "onSubmit",
  });

  const router = useRouter();
  const registerMutation = useRegister();
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    registerMutation
      .trigger({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: new Date(),
        gender: values.gender as GenderIdentity,
      })
      .then(() => {
        toast.success("Registration successful");
        router.push(ROUTES.HOMEPAGE);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Registration failed");
      });
  }

  const handleChangeAuth = () => {
    router.push(ROUTES.AUTH.LOGIN);
  };

  return (
    <Form {...form}>
      <div className="pt-8 px-8 pb-4 w-full max-w-md space-y-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4"
        >
          <h2 className="font-michroma text-title ">Register</h2>
          <div key="email">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...form.register("email")}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex gap-x-4">
            <div key="firstName" className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                Firstname
              </label>
              <input
                type="firstName"
                id="firstName"
                {...form.register("firstName")}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              {form.formState.errors.firstName && (
                <p className="text-red-600 mt-1 text-sm">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div key="lastName" className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Lastname
              </label>
              <input
                type="lastName"
                id="lastName"
                {...form.register("lastName")}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              {form.formState.errors.lastName && (
                <p className="text-red-600 mt-1 text-sm">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div key="gender">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              {...form.register("gender")}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div key="password">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...form.register("password")}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {form.formState.errors.password && (
              <p className="text-red-600 mt-1 text-sm">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <div key="confirmPassword">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...form.register("confirmPassword")}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-red-600 mt-1 text-sm">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
          {registerMutation.error && (
            <p className="text-red-600">{registerMutation.error.message}</p>
          )}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-600 text-medium font-bold text-white font-semibold rounded-md hover:bg-blue-300${
              registerMutation.isMutating ? " sending" : ""
            }`}
            disabled={registerMutation.isMutating}
          >
            Register
          </button>
          <div className="flex flex-row items-center justify-center">
            <span className="h-0.5 w-full bg-dark-gradient"></span>
            <p className="px-2 font-bold">or</p>
            <span className="h-0.5 w-full bg-dark-gradient"></span>
          </div>
        </form>
        <button
          onClick={handleChangeAuth}
          className="w-full py-2 bg-white text-medium px-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-md hover:bg-blue-300 hover:border-blue-300 hover:text-white  transition duration-200"
        >
          Login
        </button>
      </div>
    </Form>
  );
};
