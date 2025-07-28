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

  MESSAGERIE: {
    PAGE: "/messagerie",
    CONVERSATION: (conversationId: string) => `/messagerie/${conversationId}`,
  },

  RIDERS: {
    LIST: "/riders",
    DETAIL: (slug: string) => `/riders/${slug}`,
  },

  OFFRES: "/offres",

  SPONSORS: {
    LIST: "/sponsors",
    DETAIL: (slug: string) => `/sponsors/${slug}`,
  },
};
