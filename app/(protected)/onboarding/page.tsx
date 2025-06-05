"use client";
import React, { useEffect, useRef, useState } from "react";
import "./onboarding.css";
import { Card } from "@/widgets/card-sport-onboarding";
import { Select } from "@/shared/ui/select";
import { useRouter } from "next/navigation";
import { Step } from "@/entities/onboarding/onboarding.type";
import { ROUTES } from "@/shared/constants/ROUTES";

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
];

const OnBoarding: React.FC = () => {
  const steps: Step[] = [
    {
      stepName: "Customize your Experience",
      stepLabel: "Select your sports",
      stepDescription: "This will help us customize your experience !",
    },
    {
      stepName: "Company information",
      stepLabel: "Input your details",
      stepDescription: "This will help us customize your experience !",
    },
  ];

  const router = useRouter();
  const maxPage = 2;
  const [pageNumber, setPageNumber] = useState(1);
  const [nextBoardLabel, setNextBoardLabel] = useState("Next");

  function nextBoard(): void {
    if (pageNumber + 1 == maxPage) {
      setNextBoardLabel("Start my journey");
    } else if (pageNumber == maxPage) {
      // redirect page rider
      router.push(ROUTES.HOMEPAGE);
    }

    setPageNumber(pageNumber + 1);
  }
  function backBoard(): void {
    setPageNumber(pageNumber - 1);
    if (pageNumber - 1 < maxPage) {
      setNextBoardLabel("Next");
    }
  }

  return (
    <div className="w-full max-w-screen h-screen max-h-full overflow-hidden relative flex flex-col  items-center justify-center">
      <div className="gradient-circle z-1"></div>
      <div className="w-1/2 px-8 pt-8">
        <p className="p-2 text-large text-dark-700">Step {pageNumber} of 2</p>
        <h2 className="p-2 text-title text-dark-950 font-semibold">
          {steps[pageNumber - 1].stepName}
        </h2>
        <h3 className="p-2 text-subtitle text-dark-950 font-medium">
          {steps[pageNumber - 1].stepLabel}
        </h3>

        <p className="p-2 pb-12 text-subtitle2 text-dark-700">
          {steps[pageNumber - 1].stepDescription}
        </p>
      </div>
      {pageNumber == 1 ? (
        <div id="board-1" className="align-center px-8 pb-8 w-1/2 z-10">
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
        </div>
      ) : (
        <div id="board-2" className="align-center px-10 pb-8 w-1/2 z-10">
          <p>test</p>
        </div>
      )}

      <div
        className={
          pageNumber > 1
            ? "flex justify-between w-1/2 px-10"
            : "flex justify-end w-1/2 px-10"
        }
      >
        {pageNumber > 1 ? (
          <button className="mr-4" onClick={backBoard}>
            Return
          </button>
        ) : (
          ""
        )}
        <button onClick={nextBoard}>{nextBoardLabel}</button>
      </div>
    </div>
  );
};

export default OnBoarding;
