"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/widgets/form";
import { AuthentificationTypes } from "@/entities/authentification";
import useSession from "@/shared/api/use-session";
import { GenderIdentity, ProfileType } from "@kascad-app/shared-types";
import "./login.css";
import { toast } from "sonner";

const Login: React.FC = () => {
  const session = useSession();
  const [error, setError] = useState<string>("");
  const [bCatchResponseLogin, setBCatchResponseLogin] =
    useState<boolean>(false);
  const [bCatchResponseRegister, setBCatchResponseRegister] =
    useState<boolean>(false);
  const router = useRouter();
  const [bLoginAuth, setbLoginAuth] = useState<boolean>(true);

  const refLogin = useRef<HTMLDivElement>(null);
  const refLoginSection = useRef<HTMLDivElement>(null);
  const refImageSection = useRef<HTMLDivElement>(null);
  const refPath = useRef<SVGPathElement>(null);
  const refPath2 = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (session.loggedIn) {
      router.push("/marketplace/riders");
    }
  }, [session]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash == "#register") {
        changeLogin();
      }
    };

    handleHashChange(); // Vérifier l'état initial

    window.addEventListener("hashchange", handleHashChange); // Écouter les changements d'URL

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const Loginfields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  const Registerfields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirm-password", label: "Confirm password", type: "password" },
  ];

  const changeLogin = () => {
    const loginContainer = refLogin.current;
    const svg = refPath.current;
    const svg2 = refPath2.current;
    const loginSection = refLoginSection.current;
    const imageSection = refImageSection.current;
    loginContainer?.classList.add("animate-hideContent");
    svg?.classList.toggle("opacity-0");

    svg2?.classList.add("opacity-0");
    if (bLoginAuth) {
      router.push("#register");
      // trait
      svg?.classList.add("animate-draw-reverse");
      loginSection?.classList.add("animate-login");
      imageSection?.classList.add("animate-image");

      setTimeout(() => {
        setbLoginAuth(!bLoginAuth);
        imageSection?.classList.remove("bg-login-rider");
        imageSection?.classList.add("bg-login-sponsor");
        svg2?.classList.remove("animate-draw-reverse");
      }, 2250);
    } else {
      router.replace("#login");
      // On empeche le bug des sections qui s'inverse au retour
      loginSection?.classList.add("order-3");
      svg2?.classList.remove("opacity-0");
      svg2?.classList.add("animate-draw-reverse");
      // on anime les 2 sections pour les intervertirs
      loginSection?.classList.add("animate-login-reverse");

      imageSection?.classList.add("animate-image-reverse");
      // fix de fin d'anim
      setTimeout(() => {
        setbLoginAuth(!bLoginAuth);
        // on change definitivement les backgrounds
        imageSection?.classList.add("bg-login-rider");
        imageSection?.classList.remove("bg-login-sponsor");
        loginSection?.classList.remove("animate-login");
        imageSection?.classList.remove("animate-image");
        loginSection?.classList.remove("animate-login-reverse");
        imageSection?.classList.remove("animate-image-reverse");
        svg?.classList.remove("animate-draw-reverse");

        loginSection?.classList.remove("order-3");
      }, 2250);
    }
    setTimeout(() => {
      svg?.classList.toggle("animate-draw");
      svg2?.classList.toggle("animate-draw");
      loginContainer?.classList.remove("animate-hideContent");
    }, 2250);
    // remove animations classes
  };

  const handleLogin = (data: { [key: string]: string }) => {
    AuthentificationTypes.API.auth
      .login({
        email: data.email,
        password: data.password,
        type: ProfileType.RIDER,
      })
      .then((res) => {
        if (res.success) {
          toast.success("You are now connected");
          router.push("/marketplace/riders");
        } else if (res.success === false) {
          toast.error("Connection failure");
          setError(res.message);
          setBCatchResponseLogin((prevState) => !prevState);
        }
      });
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
      <div
        ref={refLoginSection}
        className="w-5/12 flex items-center justify-center relative transition-all duration-500 ease-in"
      >
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
          <div className="w-full flex justify-center">
            {bLoginAuth ? (
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
            ) : (
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
            )}
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
            ref={refPath2}
            className=" opacity-0 w-login-vector-width "
            d="M892.36 0.596619C879.663 200.026 733.181 553.626 660.785 551.982C631.381 551.315 622.044 518.094 634.165 490.862C648.818 457.942 736.006 432.959 733.119 560.126C730.231 687.293 597.918 699.593 416.965 695.485C236.011 691.376 0.696256 658.526 0.696256 658.526"
            stroke="#2B4AFB"
            strokeWidth="3"
          />
        </svg>
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
