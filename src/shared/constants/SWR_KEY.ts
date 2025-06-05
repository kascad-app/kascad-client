export const SWR_KEY = {
  AUTH: {
    ME: "/auth/rider/me",
    LOGIN: "/auth/rider/login",
    REGISTER: "/auth/rider/register",
    REFRESH_TOKEN: "/auth/rider/refresh-token",
    LOGOUT: "/auth/rider/logout",
    UPDATE: "/auth/rider/me",
  },
  RIDER: {
    RIDERS: "/riders",
    RIDER: (slug: string) => `/riders/${slug}`,
  },
  SPONSORS: {
    SPONSORS: "/sponsors",
    SPONSOR: (slug: string) => `/sponsors/${slug}`,
  },
};
