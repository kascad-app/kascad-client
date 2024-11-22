"use client";
import React, { useEffect, useRef, useState } from "react";
import "./onboarding.css";
import { Card } from "@/widgets/card-sport-onboarding";
import { Select } from "@/shared/ui/select";

const cardsData = [
  { title: "Surf", src: "/views/onBoard/Surf.png" },
  { title: "Skate", src: "/views/onBoard/Skate.png" },
  { title: "Snow", src: "/views/onBoard/Snow.png" },
  { title: "BMX", src: "/views/onBoard/BMX.png" },
  { title: "BMX", src: "/views/onBoard/BMX.png" },
  { title: "BMX", src: "/views/onBoard/BMX.png" },
];

const options = [
  { label: "Value 1", value: "value1" },
  { label: "Value 2", value: "value2" },
  { label: "Value 3", value: "value3" },
  { label: "Value 4", value: "value4" },
];

const OnBoarding: React.FC = () => {
  return (
    <div className="w-full max-w-screen flex h-screen max-h-full overflow-hidden relative flex items-center justify-center">
      <div className="gradient-circle z-1"></div>
      <div className="align-center p-8 w-1/2 z-10">
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
          {cardsData.map((card, index) => (
            <Card key={index} title={card.title} src={card.src} />
          ))}
        </div>

        <span className="h-0.5 block  w-full bg-dark-300 my-8"></span>
        <h3 className="p-2 text-subtitle text-dark-950 font-medium">
          How we communicate
        </h3>
        <div className="flex flex-row gap-8">
          <Select label="Country" options={options} />
          <Select label="Email adress" options={options} />
        </div>
        <div className="w-full flex justify-end">
          <button className="bg-blue-600 text-white py-2 rounded-lg px-8 mt-8">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
