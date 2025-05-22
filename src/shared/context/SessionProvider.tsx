// context/SessionProvider.tsx
"use client";

import { ReactNode } from "react";
import { SessionContext } from "./SessionContext";
import { useSession } from "../api";

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const session = useSession(); // ou useCreateSession(false) selon ton besoin

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
