// context/SessionProvider.tsx
"use client";

import { ReactNode } from "react";
import { SessionContext } from "./SessionContext";
import { useCreateSession } from "../api";

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const session = useCreateSession(); // ou useCreateSession(false) selon ton besoin

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
