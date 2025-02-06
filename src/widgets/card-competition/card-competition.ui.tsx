"use client";

import Image from "next/image";
import React from "react";
import { CardCompetitionProps } from "./card-competition.lib";
import { CalendarClock, MapPin } from "lucide-react";

export function CardCompetition({
  cardProps,
}: {
  cardProps: CardCompetitionProps;
}) {
  const handleOnClick = () => {
    window.open(cardProps.link, "_blank");
  };
  return (
    <div
      className="rounded-lg max-w-[15rem] min-w-[15rem] max-h-[18rem] h-full w-full bg-[#F7F7F7] flex flex-col gap-4 hover:cursor-pointer hover:opacity-70 transition-all"
      onClick={handleOnClick}
    >
      <div className="w-full rounded-lg h-[9rem] relative">
        {/* slot image card */}
        <Image
          src={cardProps.linkImage}
          fill
          objectFit="cover"
          alt="Image présentation concours"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-4 px-4 py-2">
        <div className="flex gap-2 items-center">
          <p>🏆</p>
          <h3 className="font-semibold">{cardProps.title}</h3>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <MapPin width={20} />
            <p>{cardProps.localisation}</p>
          </div>
          <div className="flex items-center gap-2">
            <CalendarClock width={20} />
            <p className="text-sm">{cardProps.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
