import { ROUTES } from "@/shared/lib/routes/router";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { useAPI } from "./use-api";
import { UnknowProfile } from "@kascad-app/shared-types";
import {
	AuthentificationAPi,
	AuthentificationTypes,
} from "@/entities/authentification";

const useSession = (mustAuth = false): AuthentificationTypes.Session => {
	const loggedIn = Cookies.get("logged-in") === "true";
	const router = useRouter();

	const {
		data: user,
		mutate,
		isLoading,
		isValidating,
	} = useAPI<UnknowProfile>(loggedIn ? "/auth/me" : null);

	const signOut = React.useCallback(async () => {
		await AuthentificationAPi.apiAuthentication.logout();
		window.location.href = ROUTES.HOME;
	}, []);

	const redirectToLogin = React.useCallback(() => {
		router.push("/tests");
	}, []);

	React.useEffect(() => {
		if (mustAuth && !user && !isLoading) {
			redirectToLogin();
		}
	}, [mustAuth, user, isLoading]);

	return {
		mutate,
		loading: isLoading,
		...(user
			? {
					loggedIn: true,
					user: user as unknown as UnknowProfile,
					validating: isValidating,
					signOut,
			  }
			: {
					loggedIn: false,
					user,
			  }),
	};
};

export default useSession;
