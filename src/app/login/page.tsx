"use client";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import Form from "../components/Form";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import API from "@/services/api";
import useSession from "@hooks/use-session";
import { ProfileType } from "@kascad-app/shared-types";
import "./login.css";

const Login: React.FC = () => {
  const session = useSession();
  const [error, setError] = useState<string>("");
  const [bCatchResponse, setBCatchResponse] = useState<boolean>(false);
  const router = useRouter();
  const [bRider, setBRider] = useState<boolean>(true);

  const refLogin = useRef<HTMLDivElement>(null);
  const refLoginSection = useRef<HTMLDivElement>(null);
  const refImageSection = useRef<HTMLDivElement>(null);
  const refPath = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (session.loggedIn) {
      // if (session.user.type == "rider") {
      //   router.push("/marketplace/sponsors");
      // } else {
      //   router.push("/marketplace/riders");
      // }
    }
  }, [session]);

  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Mot de passe", type: "password" },
  ];

  const changeLogin = (e: React.SyntheticEvent) => {
    const loginContainer = refLogin.current;
    const svg = refPath.current;
    const loginSection = refLoginSection.current;
    const imageSection = refImageSection.current;
    loginContainer?.classList.add("animate-hideContent");
    if (bRider) {
      setBRider(!bRider);
      // loginSection?.classList.remove("order-3");
      // trait
      svg?.classList.add("animate-draw-reverse");
      loginSection?.classList.add("animate-login");
      imageSection?.classList.add("animate-image");

      setTimeout(() => {
        imageSection?.classList.remove("bg-login-rider");
        imageSection?.classList.add("bg-login-sponsor");
      }, 4000);
    } else {
      setBRider(!bRider);
      loginSection?.classList.add("order-3");
      loginSection?.classList.add("animate-login-reverse");

      imageSection?.classList.add("animate-image-reverse");

      setTimeout(() => {
        imageSection?.classList.add("bg-login-rider");
        imageSection?.classList.remove("bg-login-sponsor");
        loginSection?.classList.remove("animate-login");
        imageSection?.classList.remove("animate-image");
        loginSection?.classList.remove("animate-login-reverse");
        imageSection?.classList.remove("animate-image-reverse");
        svg?.classList.remove("animate-draw-reverse");

        loginSection?.classList.remove("order-3");
      }, 4000);
    }
    setTimeout(() => {
      svg?.classList.toggle("animate-draw");
      // loginSection?.classList.remove("animate-login");
      loginContainer?.classList.remove("animate-hideContent");
    }, 4000);
    // remove animations classes
  };

  const handleLogin = (data: { [key: string]: string }) => {
    API.auth
      .login({
        email: data.email,
        password: data.password,
        type: ProfileType.RIDER,
      })
      .then((res) => {
        if (res.success) {
          if (res.data.type == "rider") {
            router.push("/marketplace/sponsors");
          } else {
            router.push("/marketplace/riders");
          }
        } else {
          setError(res.message);
          setBCatchResponse((prevState) => !prevState);
        }
      });
  };

  return (
    <div className="w-screen max-w-screen flex h-screen overflow-hidden">
      <div
        ref={refLoginSection}
        className="w-5/12 flex items-center justify-center relative transition-all transition duration-500 ease-in"
      >
        {/*  vector dessin */}
        <svg
          width="753"
          height="599"
          viewBox="0 0 753 599"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" absolute left-0 top-0 z-0  h-full w-login-vector-height"
        >
          <path
            ref={refPath}
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
          <div className="w-2/3">
            <h2 className="font-michroma text-title px-8">Log In</h2>
            <Form
              errorMessage={error}
              fields={fields}
              onSubmit={handleLogin}
              submitButtonText="Log in"
              switchAuthButtonText="Register"
              bCatchResponse={bCatchResponse}
            />
            <p
              onClick={changeLogin}
              className=" w-fit mx-auto text-blue-600 cursor-pointer text-center"
            >
              Connect as sponsor
            </p>
          </div>
        </div>
      </div>
      <div
        ref={refImageSection}
        className="bg-login-rider z-2 bg-no-repeat bg-center bg-cover h-full w-7/12 flex justify-center items-center px-16 relative transition duration-500 order-2 ease-in"
      >
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
