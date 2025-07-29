export const SWR_KEY = {
  AUTH: {
    GET_ME: "/auth/rider/me",
    LOGIN: "/auth/rider/login",
    REGISTER: "/auth/rider/register",
    REFRESH_TOKEN: "/auth/rider/refresh-token",
    LOGOUT: "/auth/rider/logout",
  },
  // CONTRACT: {
  //   COUNTNEWMESSAGES: "/contracts/me/countNewMessages",
  //   CONTRACTS: "/contracts",
  //   CONTRACT: (id: string) => `/contracts/${id}`,
  //   SENDMESSAGE: (id: string) => `/contracts/${id}/sendMessage`,
  // },
  RIDER: {
    ME: {
      UPDATE_INFO: "/riders/me/update-info",
      UPLOAD_IMAGES: "/riders/me/upload-images",
      UPLOAD_AVATAR: "/riders/me/upload-avatar",
    },
    RIDERS: "/riders",
    RIDER: (slug: string) => `/riders/${slug}`,
  },
  OFFERS: {
    OFFERS: "/offers",
    OFFER: (slug: string) => `/offers/${slug}`,
    CUSTOM_RIDER: {
      CANDIDATE: (id: string) => `/offers/custom-rider/${id}`,
    },
    MY_OFFERS: "/offers/application",
  },
  CONVERSATIONS: {
    CONVERSATIONS: "/dm/conversations",
    CONVERSATION: (conversationId: string) =>
      `/dm/conversations/${conversationId}`,
    GET_OR_CREATE: "/dm/conversations/get-or-create",
    MARK_AS_READ: (conversationId: string) =>
      `/dm/messages/conversations/${conversationId}/mark-all-read`,
    MESSAGES: {
      GET: (conversationId: string) =>
        `/dm/messages/conversations/${conversationId}`,
      CREATE: "/dm/messages",
      DELETE: (messageId: string) => `/dm/messages/${messageId}`,
      COUNT_TOTAL_UNREAD: "/dm/messages/unread-count",
      COUNT_TOTAL_UNREAD_CONVERSATIONS:
        "/dm/messages/conversations/unread-counts",
      MARK_AS_READ: (conversationId: string) =>
        `/dm/messages/conversations/${conversationId}/mark-all-read`,
    },
  },
  SPONSORS: {
    SPONSORS: "/sponsors",
    SPONSOR: (slug: string) => `/sponsors/${slug}`,
  },
};
