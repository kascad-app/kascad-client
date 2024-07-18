import { RiderIdentity, SponsorIdentity } from "@kascad-app/shared-types";
import React from "react";

type HeaderProps = {
  identity?: RiderIdentity | SponsorIdentity;
};

const Header: React.FC<HeaderProps> = ({ identity }) => {
  const isRiderIdentity = (
    identity: RiderIdentity | SponsorIdentity
  ): identity is RiderIdentity => {
    return (identity as RiderIdentity).firstName !== undefined;
  };

  return (
    <header className="bg-white text-gray-800  px-24 py-8 flex items-center w-full justify-between">
      <img src="/views/logos/logoSquare.svg" alt="Logo" className="h-12 mr-4" />
      <h1 className="font-figtree font-medium text-lg">
        {identity && isRiderIdentity(identity)
          ? "Bonjour " + identity.firstName
          : ""}
      </h1>
    </header>
  );
};

export default Header;
