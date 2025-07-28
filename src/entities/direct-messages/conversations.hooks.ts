import {
  ConversationWithParticipants,
  GetMessagesResponse,
  UnreadCountResponse,
} from "./conversations.types";

import useSWRMutation from "swr/mutation";
import { sendSWRRequest } from "@/lib/swr/use-swr";
import { SWR_KEY } from "@/shared/constants/SWR_KEY";
import { GetOrCreateConversationQuery } from "./conversations.types";

import useSWR from "swr";
import { requester } from "@/lib/requester/requester";
import {
  GetUserConversationsQuery,
  GetUserConversationsResponse,
} from "./conversations.types";
import { buildUrlSearchParams } from "@/shared/lib/buildUrlSearchParams";

export function useGetConversations(query: Partial<GetUserConversationsQuery>) {
  const params = buildUrlSearchParams<GetUserConversationsQuery>(query);
  const key = `${SWR_KEY.CONVERSATIONS.CONVERSATIONS}?${params.toString()}`;
  return useSWR<GetUserConversationsResponse>(key, () =>
    requester().get<GetUserConversationsResponse>(key),
  );
}

export function useGetOrCreateConversation() {
  return useSWRMutation<
    GetUserConversationsResponse,
    Error,
    string,
    GetOrCreateConversationQuery
  >(SWR_KEY.CONVERSATIONS.GET_OR_CREATE, sendSWRRequest, {
    rollbackOnError: true,
    onSuccess() {},
  });
}

// GET une conversation par son id
export function useGetConversation(conversationId: string) {
  const key = SWR_KEY.CONVERSATIONS.CONVERSATION(conversationId);
  return useSWR<ConversationWithParticipants>(key, () =>
    requester().get<ConversationWithParticipants>(key),
  );
}

// GET les messages d'une conversation
export function useGetConversationMessages(conversationId: string) {
  const key = SWR_KEY.CONVERSATIONS.MESSAGES.GET(conversationId);
  return useSWR<GetMessagesResponse>(key, () =>
    requester().get<GetMessagesResponse>(key),
  );
}

// GET le nombre total de messages non lus
export function useGetTotalUnreadMessages() {
  return useSWR<UnreadCountResponse>(
    SWR_KEY.CONVERSATIONS.MESSAGES.COUNT_TOTAL_UNREAD,
    () =>
      requester().get<UnreadCountResponse>(
        SWR_KEY.CONVERSATIONS.MESSAGES.COUNT_TOTAL_UNREAD,
      ),
  );
}

// GET le nombre de conversations non lues
// export function useGetTotalUnreadConversations() {
//   const key = SWR_KEY.CONVERSATIONS.MESSAGES.COUNT_TOTAL_UNREAD_CONVERSATIONS;
//   return useSWR<any>(key, () => requester().get<any>(key));
// }
