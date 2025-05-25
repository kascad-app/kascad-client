import React from "react";
import { Settings, CircleHelp } from "lucide-react";
import "./header.css";
import { useSession } from "@/shared/context/SessionContext";

export const Header: React.FC = () => {
  const session = useSession();
  return (
    <header className="bg-white text-gray-800 fixed z-100 top-0 px-24 py-8 flex items-center w-full justify-between">
      {/* <img src="/views/logos/logoSquare.svg" alt="Logo" className="h-12 mr-4" /> */}
      <div className="flex gap-4 name-side">
        <h2 className="font-michroma font-medium text-lg">
          {session.user?.identity != null && session.user.identity.firstName}
        </h2>
        <svg
          width="52"
          height="33"
          viewBox="0 0 52 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 17.5L24.9197 7.73792C25.9006 7.32013 26.767 8.52247 26.0603 9.32078L8.27436 29.4123C7.47903 30.3107 8.65135 31.5922 9.61686 30.8798L48.7215 2.0259C49.6288 1.35642 50.7778 2.4667 50.1397 3.39641L36 24"
            stroke="#2B4AFB"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="flex gap-4">
        <CircleHelp className="cursor-pointer" />
        <Settings className="cursor-pointer" />
      </div>
    </header>
  );
};
