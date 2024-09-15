import {
  loginRiderDto,
  loginSponsorDto,
  registerRiderDto,
  registerSponsorDto,
  UnknowProfile,
} from "@kascad-app/shared-types";
import { Requester } from "@/shared/lib/requester";
import Cookies from "js-cookie";

type APIAuthentication = {
  me: typeof me;
  login: typeof login;
  register: typeof register;
  refreshToken: typeof refreshToken;
  logout: typeof logout;
};

const me = async () => Requester.requester().get<UnknowProfile>("/auth/me");

const login = async (data: loginRiderDto | loginSponsorDto) =>
  Requester.requester().post<UnknowProfile>("/auth/login", { data });

const register = async (data: registerRiderDto | registerSponsorDto) =>
  Requester.requester().post<UnknowProfile>("/auth/register", { data });

const refreshToken = async () =>
  Requester.requester().post<UnknowProfile>("/auth/refresh-token");

const logout = async () => {
  Requester.requester().post("/auth/logout", { data: {} });
  Cookies.remove("authToken");
};

export const apiAuthentication: APIAuthentication = {
  me,
  login,
  register,
  refreshToken,
  logout,
};

export type { APIAuthentication };
