

"use client";

import React from "react";

interface SelectProps {
    label: string
}

export const Select: React.FC<SelectProps> = ({label}) => {
    return (
        <div className="relative w-full bg-white h-16 border border-dark-200 rounded-lg label-dynamic
          text-subtitle2 after:content-arrow-down
          after:absolute after:right-0 after:flex after:items-center after:top-0 after:mr-8 after:h-full after:cursor-pointer"
          data-label={label}>
            <span className="text-dark-600 flex items-center h-full ml-8 cursor-default">{label}</span>
        </div>
    );
};