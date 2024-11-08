"use client";

import { Checkbox } from "@/shared/ui/checkbox";
import React from "react";

interface CardProps {
    title: string;
    src: string;
}

export const Card: React.FC<CardProps> = ({title, src }) => {
    return (
        <div className="w-52 min-w-52 h-72 bg-center bg-cover rounded-md flex flex-row justify-between items-start p-5 overflow-hidden relative"
            style={{ backgroundImage: `url(${src})` }}
        >
            <div className="absolute w-full h-full bg-gradient-to-b from-dark-transparent via-70% via-transparent top-0 left-0"></div>
            <p className="z-10 text-title text-white ">{title}</p>
            <Checkbox />
        </div>
    );
};