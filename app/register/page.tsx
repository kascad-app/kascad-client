"use client";
import React from "react";
import "./register.css";
import { RegisterFormWidget } from "@/widgets/auth/register-form";

const Register: React.FC = () => {
  return (
    <div className="w-screen max-w-screen flex h-screen overflow-hidden">
      <div className="bg-register z-2 bg-no-repeat bg-center bg-cover h-full w-7/12 flex justify-center items-center px-16 relative transition duration-500 ease-in">
        <img className="w-64" src="/views/connexion/logo-opacity.png" alt="" />
      </div>
      <div className="w-5/12 flex items-center justify-center relative transition-all duration-500 ease-in">
        <div className="z-10 w-2/3 flex flex-col items-center relative justify-center">
          <div className="w-full flex justify-center">
            <RegisterFormWidget />
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

export default Register;
