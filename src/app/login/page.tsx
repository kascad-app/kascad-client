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
      if (session.user.type == "rider") {
        router.push("/marketplace/sponsors");
      } else {
        router.push("/marketplace/riders");
      }
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
      <div className="bg-connexion-background bg-no-repeat bg-cover h-full w-1/2 flex justify-center items-center px-16 relative">
        <img
          className="absolute top-5 left-5"
          src="/views/connexion/logo.png"
          alt=""
        />
        <div className="text-container">
          <h2 className="font-michroma text-white text-2xl font-light">
            Passerelles vers vos opportunités.
          </h2>
          <div className="h-0.5 bg-white my-4"></div>
          <p className="text-white text-base font-light">
            Kascad est une application conçue pour simplifier la gestion des
            réponses aux appels d'offres.
          </p>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center flex-col ">
        <h2 className="font-michroma text-xl px-8">Sign In</h2>
        <Form
          errorMessage={error}
          fields={fields}
          onSubmit={handleLogin}
          submitButtonText="Connexion"
          bCatchResponse={bCatchResponse}
        />
      </div>
    </div>
  );
};

export default Login;
