"use client";
import React, { useEffect, useRef, useState } from "react";
import "./onboarding.css";
import { Card } from "@/widgets/card-sport-onboarding";

const OnBoarding: React.FC = () => {
  return (
    <div className="w-full max-w-screen flex h-screen max-h-full overflow-hidden relative flex items-center justify-center">
      <div className="gradient-circle "></div>
      <div className="align-center p-8 w-1/2">
        <p className="p-2 text-large text-dark-700">Step 1 of 2</p>
        <h2 className="p-2 text-title text-dark-950 font-semibold">
          Customize your Experience
        </h2>
        <h3 className="p-2 text-subtitle text-dark-950 font-medium">
          Select your sports
        </h3>

        <p className="p-2 pb-12 text-subtitle2 text-dark-700">
          This will help us customize your experience!
        </p>
        <div
          className="flex px-4 pb-2 gap-6 w-full max-w-full overflow-x-auto scrollbar-hide"
          id="style-1"
        >
          <Card title="Surf" src="/views/onBoard/Surf.png" />
          <Card title="Skate" src="/views/onBoard/Skate.png" /> 
          <Card title="Snow" src="/views/onBoard/Snow.png" /> 
          <Card title="BMX" src="/views/onBoard/BMX.png" /> 
          <Card title="BMX" src="/views/onBoard/BMX.png" /> 
          <Card title="BMX" src="/views/onBoard/BMX.png" /> 
        </div>

        <span></span>
      </div>
    </div>
  );
};

export default OnBoarding;
