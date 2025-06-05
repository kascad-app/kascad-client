"use client";
import { useSession } from "@/shared/context/SessionContext"; // ou le bon chemin
import React from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const session = useSession();

  if (session.loading) return null; // ou un loader

  if (!session.loggedIn) return null; // La redirection est déjà gérée dans le hook

  return <>{children}</>;
}
