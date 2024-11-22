"use client";
import React, { useEffect, useRef, useState } from "react";
import "./onboarding.css";
import { Step1 } from "@/widgets/onboarding/Step1";
import { Step2 } from "@/widgets/onboarding/Step2";

const nextStep = (step: number, setStep: (step: number) => void) => {
  setStep(step);
};

const OnBoarding: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="w-full max-w-screen flex h-screen max-h-full overflow-hidden relative flex items-center justify-center">
      <div className="gradient-circle z-1"></div>
      <div className="align-center p-8 w-1/2 z-10">
        <p className="p-2 text-large text-dark-700">Step {step} of 2</p>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              nextStep(step + 1, setStep);
            }}
            className="bg-blue-600 text-white py-2 rounded-lg px-8 mt-8"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
