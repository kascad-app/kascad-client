"use client";

import React from "react";

interface CheckboxProps {
}

export const Checkbox: React.FC<CheckboxProps> = () => {
    return (
        <input className="z-10 mt-3 w-6 h-6 cursor-pointer appearance-none rounded border border-blue-600 bg-white checked:before:text-subtitle checked:bg-blue-600 checked:text-white checked:before:content-check flex items-center justify-center text-center" type="checkbox" />
    );
};