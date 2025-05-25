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

  RIDERS: {
    LIST: "/athletes",
    DETAIL: (slug: string) => `/athletes/${slug}`,
  },
};
