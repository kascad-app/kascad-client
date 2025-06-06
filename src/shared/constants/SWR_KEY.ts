export const SWR_KEY = {
  AUTH: {
    ME: "/auth/rider/me",
    LOGIN: "/auth/rider/login",
    REGISTER: "/auth/rider/register",
    REFRESH_TOKEN: "/auth/rider/refresh-token",
    LOGOUT: "/auth/rider/logout",
    UPDATE: "/auth/rider/me",
  },

  CONTRACT: {
    COUNTNEWMESSAGES: "/contracts/me/countNewMessages",
    CONTRACTS: "/contracts",
    CONTRACT: (id: string) => `/contracts/${id}`,
    SENDMESSAGE: (id: string) => `/contracts/${id}/sendMessage`,
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
