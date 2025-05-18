"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/widgets/form";
import { AuthenticationTypes } from "@/entities/authentication";
import { useSession } from "@/shared/api";
import { useLogin } from "@/entities/authentication/authentication.hooks";
import "./login.css";
import { toast } from "sonner";
import { ApiError } from "next/dist/server/api-utils";
import { ROUTES } from "@/shared/constants/ROUTES";

const Login: React.FC = () => {
  const session = useSession();
  const [error, setError] = useState<string>("");
  const [bCatchResponseLogin, setBCatchResponseLogin] =
    useState<boolean>(false);
  const router = useRouter();
  const loginMutation = useLogin();
  const refLogin = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session.loggedIn) {
      router.push(ROUTES.HOMEPAGE);
    }
  }, [session.loggedIn, router]);

  const Loginfields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  const changeLogin = () => {
    router.push("/register");
  };

  async function handleLogin(data: { [key: string]: string }) {
    setBCatchResponseLogin(true);
    loginMutation
      .trigger({
        email: data.email,
        password: data.password,
      })
      .then(async (res) => {
        toast.success("Login successful");
        await session.mutate();
        router.push(ROUTES.HOMEPAGE);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Login failed");
      });
  }
  return (
    <div className="w-screen max-w-screen flex h-screen overflow-hidden">
      <div className="w-5/12 flex items-center justify-center relative transition-all duration-500 ease-in">
        <svg
          width="753"
          height="599"
          viewBox="0 0 753 599"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" absolute left-0 top-0 z-0  h-full w-login-vector-height"
        >
          <path
            className="animate-draw opacity-0 w-login-vector-width "
            d="M-271 170.57C-93.371 79.0202 285.256 23.0612 321.034 86.0201C335.565 111.59 311.859 136.667 282.268 140.255C246.497 144.594 180.275 82.6221 290.865 19.7757C401.455 -43.0707 479.975 64.1333 569.403 221.498C658.83 378.863 751.523 597.633 751.523 597.633"
            stroke="#2B4AFB"
            strokeWidth="3"
          />
        </svg>

        <div
          ref={refLogin}
          className="z-10 w-2/3 flex flex-col items-center relative justify-center"
        >
          <div className="w-full flex justify-center">
            <Form
              error={{
                get: error,
                set: setError,
              }}
              fields={Loginfields}
              onSubmit={handleLogin}
              onChangeAuth={changeLogin}
              submitButtonText={"Log in"}
              switchAuthButtonText={"Register"}
              bCatchResponse={bCatchResponseLogin}
            />
          </div>
        </div>
      </div>
      <div className="bg-login z-2 bg-no-repeat bg-center bg-cover h-full w-7/12 flex justify-center items-center px-16 relative transition duration-500 ease-in">
        <img
          className="absolute w-64 top-50 left-50"
          src="/views/connexion/logo-opacity.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
