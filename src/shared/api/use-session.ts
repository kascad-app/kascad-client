"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { ROUTES } from "../constants/ROUTES";
import { AuthenticationTypes } from "@/entities/authentication";
import { useMe } from "@/entities/authentication/authentication.hooks";
import { Sponsor } from "@kascad-app/shared-types";

const useCreateSession = (mustAuth = true): AuthenticationTypes.Session => {
  const router = useRouter();
  const { data: user, mutate, isLoading, isValidating } = useMe();
  const pathname = usePathname();

  useEffect(() => {
    mutate();
  }, [pathname, mutate]);

  useEffect(() => {
    if (!mustAuth) return;

    const onUnauthenticated = () => {
      if (pathname !== ROUTES.AUTH.LOGIN && pathname !== ROUTES.AUTH.REGISTER) {
        router.push(ROUTES.AUTH.LOGIN);
      }
    };

    if (!isLoading && !isAuthenticated(user)) {
      onUnauthenticated();
    }
  }, [user, isLoading, mustAuth, pathname, router]);

  function isAuthenticated(user: unknown): user is Sponsor {
    return (
      !!user &&
      typeof user === "object" &&
      !("statusCode" in user) &&
      !(
        "message" in user &&
        (user as { message?: string }).message === "Unauthorized"
      )
    );
  }

  if (isAuthenticated(user)) {
    return {
      loggedIn: true,
      user,
      validating: isValidating,
      mutate,
      loading: isLoading,
    };
  }

  return {
    loggedIn: false,
    user: undefined,
    mutate,
    loading: isLoading,
  };
};

export default useCreateSession;
