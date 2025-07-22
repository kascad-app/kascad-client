export const ROUTES = {
  LOADER: "/",
  HOMEPAGE: "/home",

  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },

  RIDER: {
    PROFILE: "/profil",
    EDIT_PROFILE: "/profil/edit",
  },

  MESSAGERIE: "/messagerie",

  RIDERS: {
    LIST: "/riders",
    DETAIL: (slug: string) => `/riders/${slug}`,
  },

  SPONSORS: {
    LIST: "/sponsors",
    DETAIL: (slug: string) => `/sponsors/${slug}`,
  },
};
