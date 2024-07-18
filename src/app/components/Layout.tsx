"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "@/types/auth";
import useSession from "@hooks/use-session";
import { ProfileType } from "@kascad-app/shared-types";
import { RiderIdentity, SponsorIdentity } from "@kascad-app/shared-types";
const Layout: React.FC = () => {
  const session: Session = useSession();
  const [menuVisible, setMenuVisible] = useState(false);

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
          : riderIdentity.firstName
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

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex justify-center">
      <div className="bg-gray-300 w-auto opacity-90 text-white p-2 flex items-center justify-center gap-4 rounded-xl relative">
        <Link href="/" passHref>
          <img
            src="/views/logos/logoSquare.svg"
            alt="Logo"
            className="h-12 cursor-pointer"
          />
        </Link>
        {/* <Link
          href={
            session.user?.type == "rider"
              ? "/marketplace/sponsors"
              : "/marketplace/riders"
          }
          passHref
          className=" h-12 flex items-center justify-center rounded"
        >
          <p>{session.user?.type == "rider" ? "Sponsors" : "Riders"}</p>
        </Link> */}
        <Link
          href="/profile"
          passHref
          className="bg-common-green h-12 w-12 flex items-center justify-center rounded"
        >
          <img
            src="/views/profile/user-fill.svg"
            alt="Logo"
            className="h-6 cursor-pointer"
          />
        </Link>
        {profileNameVisible ? (
          <div className="text-black ml-[-8px]">{profileName}</div>
        ) : null}
        <button
          className="bg-common-green text-white px-6 py-4 rounded"
          onClick={toggleMenu}
        >
          Actions
        </button>
        {menuVisible && (
          <div className="absolute w-50vw rounded-xl bottom-full left-1/2 -translate-x-1/2 bg-white p-4 shadow-lg mb-2 z-50">
            <ul>
              <li>
                <Link href="/" passHref>
                  <div className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black cursor-pointer">
                    Home
                  </div>
                </Link>
              </li>
              {pathMarketRiders ? (
                <li>
                  <Link href="/marketplace/riders" passHref>
                    <div className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black cursor-pointer">
                      Riders
                    </div>
                  </Link>
                </li>
              ) : null}

              {pathMarketSponsors ? (
                <li>
                  <Link href="/marketplace/sponsors" passHref>
                    <div className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black cursor-pointer">
                      Sponsors
                    </div>
                  </Link>
                </li>
              ) : null}
              {/* <li>
                <Link href="/profile" passHref>
                  <div className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black cursor-pointer">
                    Profile
                  </div>
                </Link>
              </li> */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
