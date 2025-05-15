import { ROUTES } from "@/shared/lib/routes/router";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { useAPI } from "./use-api";
import { Rider } from "@kascad-app/shared-types";
import {
  AuthentificationAPi,
  AuthentificationTypes,
} from "@/entities/authentification";

const useSession = (mustAuth = false): AuthentificationTypes.Session => {
  const loggedIn = Cookies.get("logged-in") === "true";
  const router = useRouter();

  const {
    data: sessionReponse,
    mutate,
    isLoading,
    isValidating,
  } = useAPI<Rider>(loggedIn ? "/auth/me" : null);

  const signOut = React.useCallback(async () => {
    await AuthentificationAPi.apiAuthentication.logout();
    window.location.href = ROUTES.HOME;
  }, []);

  const redirectToLogin = React.useCallback(() => {
    router.push("/login");
  }, []);

  React.useEffect(() => {
    if (mustAuth && !sessionReponse && !isLoading) {
      redirectToLogin();
    }
  }, [mustAuth, sessionReponse, isLoading]);

  return {
    mutate,
    loading: isLoading,
    ...(sessionReponse && sessionReponse.success
      ? {
          loggedIn: true,
          user: sessionReponse.data,
          validating: isValidating,
          signOut,
        }
      : {
          loggedIn: false,
          user: undefined,
        }),
  };
};

export default useSession;
