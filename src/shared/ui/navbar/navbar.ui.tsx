"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthentificationTypes } from "@/entities/authentification";
import useSession from "@/shared/api/use-session";
import { RiderIdentity, SponsorIdentity } from "@kascad-app/shared-types";
import { toast } from "sonner";

export const Navbar = () => {
  const session: AuthentificationTypes.Session = useSession();
  const pathname = usePathname();

  const [profileName, setProfileName] = useState("");
  const [profileNameVisible, setProfileNameVisible] = useState(true);

  const [pathMarketRiders, setPathMarketRiders] = useState(true);
  const [pathMarketSponsors, setPathMarketSponsors] = useState(true);

  useEffect(() => {
    if (session.user?.type == "rider") {
      const riderIdentity = session.user.identity as RiderIdentity;
      setProfileName(
        riderIdentity.fullName
          ? riderIdentity.fullName
          : riderIdentity.firstName,
      );
    } else if (session.user?.type == "sponsor") {
      const sponsorIdentity = session.user.identity as SponsorIdentity;
      setProfileName(sponsorIdentity.companyName);
    }
  }, [session]);

  useEffect(() => {
    if (pathname.includes("marketplace/riders")) {
      setPathMarketRiders(false);
    } else if (pathname.includes("marketplace/sponsors")) {
      setPathMarketSponsors(false);
    }

    pathname.includes("profile")
      ? setProfileNameVisible(true)
      : setProfileNameVisible(false);
  }, [pathname]);

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex justify-center"
      style={{
        display: `${session.loggedIn ? "block" : "none"}`,
      }}
    >
      <div className="bg-[#EEEEEE] px-6 w-auto opacity-90 text-[#7B7B7B] py-2 flex items-center justify-center rounded-[18rem] gap-4 relative">
        <Link href="/">
          <img
            src="/views/logos/logoSquare.svg"
            alt="Logo"
            className="h-12 cursor-pointer"
          />
        </Link>
        <Link href="/profile" passHref>
          <p>Mon profil</p>
        </Link>
        <Link
          onClick={() => {
            toast.info("Fonctionnalité en cours de développement");
          }}
          href={"#"}
        >
          <p>Paramètres</p>
        </Link>
      </div>
    </div>
  );
};
