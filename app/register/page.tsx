"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/widgets/form";
import { AuthentificationTypes } from "@/entities/authentification";
import useSession from "@/shared/api/use-session";
import { GenderIdentity, ProfileType } from "@kascad-app/shared-types";
import "./register.css";
import { toast } from "sonner";

const Login: React.FC = () => {
  const session = useSession();
  const [error, setError] = useState<string>("");
  const [bCatchResponseRegister, setBCatchResponseRegister] =
    useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (session.loggedIn) {
      router.push("/marketplace/riders");
    }
  }, [session]);

  const Registerfields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirm-password", label: "Confirm password", type: "password" },
  ];

  const changeLogin = () => {
    router.push("/login");
  };

  const handleRegister = async (data: { [key: string]: string }) => {
    const response = await AuthentificationTypes.API.auth.register({
      email: data.email,
      password: data.password,
      type: ProfileType.RIDER,
      birthDate: new Date(),
      firstName: "",
      lastName: "",
      gender: GenderIdentity.MALE,
    });

    if (!response.success) {
      toast.error(response.message, {
        position: "bottom-left",
      });
      setError(response.message);
      setBCatchResponseRegister((prevState) => !prevState);
      return;
    }

    router.push("/marketplace/riders");
  };

  return (
    <div className="w-screen max-w-screen flex h-screen overflow-hidden">
      <div className="bg-register z-2 bg-no-repeat bg-center bg-cover h-full w-7/12 flex justify-center items-center px-16 relative transition duration-500 ease-in">
        <img
          className="absolute w-64 top-50 left-50"
          src="/views/connexion/logo-opacity.png"
          alt=""
        />
      </div>
      <div className="w-5/12 flex items-center justify-center relative transition-all duration-500 ease-in">
        <div className="z-10 w-2/3 flex flex-col items-center relative justify-center">
          <div className="w-full flex justify-center">
            <Form
              error={{
                get: error,
                set: setError,
              }}
              fields={Registerfields}
              onSubmit={handleRegister}
              onChangeAuth={changeLogin}
              submitButtonText={"Register"}
              switchAuthButtonText={"Log in"}
              bCatchResponse={bCatchResponseRegister}
            />
          </div>
        </div>

        <svg
          width="868"
          height="698"
          viewBox="0 0 868 698"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" absolute left-0 bottom-0 z-0  h-full w-login-vector-height"
        >
          <path
            className="animate-draw opacity-0 w-login-vector-width "
            d="M892.36 0.596619C879.663 200.026 733.181 553.626 660.785 551.982C631.381 551.315 622.044 518.094 634.165 490.862C648.818 457.942 736.006 432.959 733.119 560.126C730.231 687.293 597.918 699.593 416.965 695.485C236.011 691.376 0.696256 658.526 0.696256 658.526"
            stroke="#2B4AFB"
            strokeWidth="3"
          />
        </svg>
      </div>
    </div>
  );
};

export default Login;
