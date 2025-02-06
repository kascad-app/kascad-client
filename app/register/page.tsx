"use client";

import React, { useEffect, useRef, useState } from "react";
import { Form } from "@/widgets/form";
import { useRouter } from "next/navigation";
import { AuthentificationTypes } from "@/entities/authentification";
import useSession from "@/shared/api/use-session";
import { ProfileType, GenderIdentity } from "@kascad-app/shared-types";
import "./register.css";

const Register: React.FC = () => {
  const session = useSession();
  const [error, setError] = useState<string>("");
  const [isCatchResponse, setIsCatchResponse] = useState<boolean>(false);
  const router = useRouter();
  const [isRider, setIsRider] = useState<boolean>(true);
  const [textConnect, setTextConnect] = useState<string>("Connect as sponsor");

  const refRegister = useRef<HTMLDivElement>(null);
  const refRegisterSection = useRef<HTMLDivElement>(null);
  const refImageSection = useRef<HTMLDivElement>(null);
  const refPath = useRef<SVGPathElement>(null);
  const refPath2 = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (session.loggedIn) {
      if (session.user.type == "rider") {
        router.push("/marketplace/riders");
      } else {
        router.push("/marketplace/sponsors");
      }
    }
  }, [session]);

  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirm-password", label: "Confirm password", type: "password" },
  ];

  const changeRegister = () => {
    refRegister.current?.classList.add("animate-hideContent");
    refPath.current?.classList.toggle("opacity-0");
    refPath2.current?.classList.add("opacity-0");
    if (isRider) {
      setIsRider(!isRider);
      // trait
      refPath.current?.classList.add("animate-draw-reverse");
      refRegisterSection.current?.classList.add("animate-login");
      refImageSection.current?.classList.add("animate-image");

      setTimeout(() => {
        setTextConnect("Connect as rider");
        refImageSection.current?.classList.remove("bg-login-rider");
        refImageSection.current?.classList.add("bg-login-sponsor");
        refPath2.current?.classList.remove("animate-draw-reverse");
      }, 2250);
    } else {
      setIsRider(!isRider);
      // On empeche le bug des sections qui s'inverse au retour
      refRegisterSection.current?.classList.add("order-3");
      refPath2.current?.classList.remove("opacity-0");
      refPath2.current?.classList.add("animate-draw-reverse");
      // on anime les 2 sections pour les intervertirs
      refRegisterSection.current?.classList.add("animate-login-reverse");

      refImageSection.current?.classList.add("animate-image-reverse");
      // fix de fin d'anim
      setTimeout(() => {
        setTextConnect("Connect as sponsor");
        // on change definitivement les backgrounds
        refImageSection.current?.classList.add("bg-login-rider");
        refImageSection.current?.classList.remove("bg-login-sponsor");
        refRegisterSection.current?.classList.remove("animate-login");
        refImageSection.current?.classList.remove("animate-image");
        refRegisterSection.current?.classList.remove("animate-login-reverse");
        refImageSection.current?.classList.remove("animate-image-reverse");
        refPath.current?.classList.remove("animate-draw-reverse");

        refRegisterSection.current?.classList.remove("order-3");
      }, 2250);
    }
    setTimeout(() => {
      refPath.current?.classList.toggle("animate-draw");
      refPath2.current?.classList.toggle("animate-draw");
      refRegister.current?.classList.remove("animate-hideContent");
    }, 2250);
    // remove animations classes
  };

  const handleRegister = (data: { [key: string]: string }) => {
    AuthentificationTypes.API.auth
      .register({
        email: data.email,
        password: data.password,
        type: ProfileType.RIDER,
        birthDate: new Date(),
        firstName: "",
        lastName: "",
        gender: GenderIdentity.MALE,
      })
      .then((res) => {
        if (res.success) {
          if (res.data.type == "rider") {
            router.push("/marketplace/riders");
          } else {
            router.push("/marketplace/sponsors");
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setIsCatchResponse((prevState) => !prevState);
      });
  };

  return (
    <div className="w-screen max-w-screen flex h-screen overflow-hidden">
      <div
        ref={refRegisterSection}
        className="w-5/12 flex items-center justify-center relative transition-all duration-500 ease-in"
      >
        {/*  vector dessin */}
        <svg
          width="1925"
          height="494"
          viewBox="0 0 1925 494"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" absolute left-0 bottom-10 z-0 "
        >
          <path
            ref={refPath}
            className="animate-draw opacity-0 w-register-vector-width "
            d="M2.20911 2.98438C75.2713 46.0766 139.964 101.991 193.182 168.042C318.475 325.034 301.392 449.485 373.255 468.961C484.375 499.039 556.109 210.055 789.644 164.39C960.982 130.901 1135.3 244.78 1175.64 271.136C1333.04 373.949 1353.88 487.862 1466.77 490.888C1549.33 493.192 1573.68 433.249 1702.82 407.857C1792.72 390.181 1871.36 401.412 1924.38 413.888"
            stroke="#2B4AFB"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
        </svg>

        <div
          ref={refRegister}
          className="z-10 w-2/3 flex flex-col items-center relative justify-center"
        >
          <div className="w-full flex justify-center">
            <Form
              errorMessage={error}
              fields={fields}
              onSubmit={handleRegister}
              onChangeUserType={changeRegister}
              textConnect={textConnect}
              submitButtonText="Register"
              switchAuthButtonText="Log in"
              bCatchResponse={isCatchResponse}
              route="/login"
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
            ref={refPath2}
            className=" opacity-0 w-login-vector-width "
            d="M892.36 0.596619C879.663 200.026 733.181 553.626 660.785 551.982C631.381 551.315 622.044 518.094 634.165 490.862C648.818 457.942 736.006 432.959 733.119 560.126C730.231 687.293 597.918 699.593 416.965 695.485C236.011 691.376 0.696256 658.526 0.696256 658.526"
            stroke="#2B4AFB"
            strokeWidth="3"
          />
        </svg>
        <svg
          width="1922"
          height="578"
          viewBox="0 0 1922 578"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" absolute left-0 top-0 z-0 "
        >
          <path
            ref={refPath2}
            className=" opacity-0 w-login-vector-width "
            d="M1.55957 268.177C166.255 168.123 346.695 123.288 498.263 96.5924C554.98 86.602 592.682 104.004 632.43 142.801C661.017 170.677 686.543 212.142 714.797 264.399C808.539 437.701 843.483 572.758 925.079 575.203C1071.26 579.578 1089.13 135.23 1330.82 26.973C1336.98 24.2153 1343.26 21.6019 1349.69 19.2872C1536.46 -47.8284 1767.33 109.933 1920.36 238.863"
            stroke="#2B4AFB"
            strokeWidth="3"
            strokeMiterlimit="10"
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

export default Register;
