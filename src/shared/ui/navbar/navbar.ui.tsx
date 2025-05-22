"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/shared/context/SessionContext";
import { RiderIdentity, SponsorIdentity } from "@kascad-app/shared-types";
import { Home, LogOut, Settings, User } from "lucide-react";
import { useLogout } from "@/entities/authentication/authentication.hooks";

export const Navbar = () => {
  const session = useSession();
  const logoutMutation = useLogout();
  const pathname = usePathname();

  const [profileName, setProfileName] = useState("");
  const [profileNameVisible, setProfileNameVisible] = useState(true);

  const [pathHome, setPathHome] = useState(true);

  useEffect(() => {
    if (pathname.includes("home")) {
      setPathHome(false);
    }

    pathname.includes("profile")
      ? setProfileNameVisible(true)
      : setProfileNameVisible(false);
  }, [pathname]);

  // if (!session.loggedIn) return null;
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex justify-center">
      <div className="bg-[#EEEEEE] px-6 w-auto opacity-90 border border-color border-gray-400 text-[#7B7B7B] py-2 flex items-center justify-center rounded-[18rem] gap-8 relative">
        <Link href="/home">
          <Home />
        </Link>
        <Link href="/profile">
          <User />
        </Link>
        <Link href={"/profile/edit"}>
          <Settings />
        </Link>
        {/* <p onClick={() => session.loggedIn && logoutMutation.trigger()}>
          <LogOut />
        </p> */}
      </div>
    </div>
  );
};
