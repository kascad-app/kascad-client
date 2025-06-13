export const SWR_KEY = {
  AUTH: {
    GET_ME: "/auth/rider/me",
    LOGIN: "/auth/rider/login",
    REGISTER: "/auth/rider/register",
    REFRESH_TOKEN: "/auth/rider/refresh-token",
    LOGOUT: "/auth/rider/logout",
  },
  CONTRACT: {
    COUNTNEWMESSAGES: "/contracts/me/countNewMessages",
  },
  RIDER: {
    ME: {
      UPDATE_INFO: "/riders/me/update-info",
      UPLOAD_IMAGES: "/riders/me/upload-images",
      UPLOAD_AVATAR: "/riders/me/upload-avatar",
    },
    RIDERS: "/riders",
    RIDER: (slug: string) => `/riders/${slug}`,
  },
  SPONSORS: {
    SPONSORS: "/sponsors",
    SPONSOR: (slug: string) => `/sponsors/${slug}`,
  },
};
