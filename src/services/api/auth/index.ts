import {
  loginRiderDto,
  loginSponsorDto,
  registerRiderDto,
  registerSponsorDto,
  UnknowProfile,
} from "@kascad-app/shared-types";
import { requester } from "@plugins/requester";

type APIAuthentication = {
  me: typeof me;
  login: typeof login;
  register: typeof register;
  refreshToken: typeof refreshToken;
  logout: typeof logout;
};

const me = async () => requester().get<UnknowProfile>("/auth/me");

const login = async (data: loginRiderDto | loginSponsorDto) =>
  requester().post<UnknowProfile>("/auth/login", { data });

const register = async (data: registerRiderDto | registerSponsorDto) =>
  requester().post<UnknowProfile>("/auth/register", { data });

const refreshToken = async () =>
  requester().post<UnknowProfile>("/auth/refresh-token");

const logout = async () => requester().post("/auth/logout", { data: {} });

const apiAuthentication: APIAuthentication = {
  me,
  login,
  register,
  refreshToken,
  logout,
};

export type { APIAuthentication };
export default apiAuthentication;
