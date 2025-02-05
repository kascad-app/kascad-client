"use client";

import Image from "next/image";
import React from "react";
import { CardCompetitionProps } from "./card-competition.lib";

export function CardCompetition({
  cardProps,
}: {
  cardProps: CardCompetitionProps;
}) {
  return (
    <div className="rounded-lg max-w-[15rem] max-h-[18rem] h-full w-full bg-[#F7F7F7]">
      <div className="bg-gray-400 w-full rounded-lg h-[9rem]">
        {/* slot image card */}
        {/* <Image src="" layout="fill" objectFit="cover" /> */}
      </div>
      <div className="flex flex-col gap-4 px-4 py-2">
        <div className="px-8 py-2 bg-[#DCECFF] rounded-full w-fit">
          {cardProps.date}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4">
            <p>🏆</p>
            <h3>{cardProps.title}</h3>
          </div>
          <div className="flex flex-row gap-4">
            <svg
              width="18"
              height="23"
              viewBox="0 0 18 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 19.3995L13.9497 14.4497C16.6834 11.7161 16.6834 7.28392 13.9497 4.55025C11.2161 1.81658 6.78392 1.81658 4.05025 4.55025C1.31658 7.28392 1.31658 11.7161 4.05025 14.4497L9 19.3995ZM9 22.2279L2.63604 15.864C-0.87868 12.3492 -0.87868 6.65076 2.63604 3.13604C6.15076 -0.37868 11.8492 -0.37868 15.364 3.13604C18.8787 6.65076 18.8787 12.3492 15.364 15.864L9 22.2279ZM9 11.5C10.1046 11.5 11 10.6046 11 9.5C11 8.39543 10.1046 7.5 9 7.5C7.8954 7.5 7 8.39543 7 9.5C7 10.6046 7.8954 11.5 9 11.5ZM9 13.5C6.79086 13.5 5 11.7091 5 9.5C5 7.29086 6.79086 5.5 9 5.5C11.2091 5.5 13 7.29086 13 9.5C13 11.7091 11.2091 13.5 9 13.5Z"
                fill="black"
              />
            </svg>
            <p>localisation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
