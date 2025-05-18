"use client";

import React, { useEffect } from "react";
import "./form.style.css";
import { useRouter } from "next/navigation";
import { useSession } from "@/shared/api";
import { useLogin } from "@/entities/authentication/authentication.hooks";
import { ROUTES } from "@/shared/constants/ROUTES";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@components/ui/form";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const LoginFormWidget: React.FC = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const loginMutation = useLogin();
  const session = useSession();

  useEffect(() => {
    if (session.loggedIn) {
      router.push(ROUTES.HOMEPAGE);
    }
  }, [session.loggedIn, router]);

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    loginMutation
      .trigger({
        email: values.email,
        password: values.password,
      })
      .then(async (res) => {
        toast.success("Login successful");
        await session.mutate();
        router.push(ROUTES.HOMEPAGE);
      })
      .catch((err) => {
        toast.error("Login failed");
      });
  }

  const handleChangeAuth = () => {
    router.push(ROUTES.AUTH.REGISTER);
  };

  return (
    <Form {...form}>
      <div className="pt-8 px-8 pb-4 w-full max-w-md space-y-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4"
        >
          <h2 className="font-michroma text-title ">Login</h2>
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
          </div>
          {loginMutation.error && (
            <p className="text-red-600">{loginMutation.error.message}</p>
          )}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-600 text-medium font-bold text-white font-semibold rounded-md hover:bg-blue-300${
              loginMutation.isMutating ? " sending" : ""
            }`}
            disabled={loginMutation.isMutating}
          >
            Login
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
          Register
        </button>
      </div>
    </Form>
  );
};
