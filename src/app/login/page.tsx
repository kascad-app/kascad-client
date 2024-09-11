"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Form from "../components/Form";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import API from "@/services/api";
import useSession from "@hooks/use-session";
import { ProfileType } from "@kascad-app/shared-types";

const Login: React.FC = () => {
  const session = useSession();
  const [error, setError] = useState<string>("");
  const [bCatchResponse, setBCatchResponse] = useState<boolean>(false);
  const router = useRouter();

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
    <div className="w-screen max-w-screen flex justify-center h-screen">
      <div className="w-5/12 flex items-center justify-center relative">
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
            className="animate-draw w-login-vector-width "
            d="M-271 170.57C-93.371 79.0202 285.256 23.0612 321.034 86.0201C335.565 111.59 311.859 136.667 282.268 140.255C246.497 144.594 180.275 82.6221 290.865 19.7757C401.455 -43.0707 479.975 64.1333 569.403 221.498C658.83 378.863 751.523 597.633 751.523 597.633"
            stroke="#2B4AFB"
            stroke-width="3"
          />
        </svg>
        <style jsx>{`
          @keyframes draw {
            from {
              stroke-dasharray: 1350; /*  A modifier pour le départ ud trait*/
              stroke-dashoffset: 1000;
            }
            to {
              stroke-dasharray: 1700; /* fin du trait */
              stroke-dashoffset: 0;
            }
          }

          .animate-draw {
            stroke-dasharray: 0;
            stroke-dashoffset: 0;
            animation: draw 5s ease-out infinite alternate;
          }
        `}</style>

        <div className="z-10 w-2/3 flex flex-col items-center  justify-center">
          <h2 className="font-michroma text-title px-8">Log In</h2>
          <Form
            errorMessage={error}
            fields={fields}
            onSubmit={handleLogin}
            submitButtonText="Log in"
            switchAuthButtonText="Register"
            bCatchResponse={bCatchResponse}
          />
        </div>
      </div>
      <div className="bg-login-rider z-2 bg-no-repeat bg-center bg-cover h-full w-7/12 flex justify-center items-center px-16 relative">
        <img
          className="absolute w-64 top-50 left-50"
          src="/views/connexion/logo-opacity.png"
          alt=""
        />
        <div className="text-container">
          {/* <h2 className="font-michroma text-white text-2xl font-light">
            Passerelles vers vos opportunités.
          </h2>
          <div className="h-0.5 bg-white my-4"></div>
          <p className="text-white text-base font-light">
            Kascad est une application conçue pour simplifier la gestion des
            réponses aux appels d'offres.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
