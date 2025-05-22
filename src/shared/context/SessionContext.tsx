// context/SessionContext.tsx
"use client";

import { createContext, useContext } from "react";
import { AuthenticationTypes } from "@/entities/authentication";

export const SessionContext = createContext<AuthenticationTypes.Session | null>(
  null,
);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
