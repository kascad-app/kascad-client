import {
  loginRiderDto,
  registerRiderDto,
  Rider,
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

const me = async () => Requester.requester().get<Rider>("/auth/me");

const login = async (data: loginRiderDto) =>
  Requester.requester().post<Rider>("/auth/login", { data });

const register = async (data: registerRiderDto) =>
  Requester.requester().post<Rider>("/auth/register", { data });

const refreshToken = async () =>
  Requester.requester().post<Rider>("/auth/refresh-token");

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
