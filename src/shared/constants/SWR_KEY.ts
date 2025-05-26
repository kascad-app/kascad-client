export const SWR_KEY = {
  AUTH: {
    ME: "/auth/rider/me",
    LOGIN: "/auth/rider/login",
    REGISTER: "/auth/rider/register",
    REFRESH_TOKEN: "/auth/rider/refresh-token",
    LOGOUT: "/auth/rider/logout",
  },
  RIDER: {
    RIDERS: "/riders",
    RIDER: (id: string) => `/riders/${id}`,
  },
  CONTRACT: {
    CONTRACTS: "/contracts",
    CONTRACT: (id: string) => `/contracts/${id}`,
  },
};
