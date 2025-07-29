import {
  ConversationWithParticipants,
  GetMessagesResponse,
  UnreadCountResponse,
} from "./conversations.types";

import useSWRMutation from "swr/mutation";
import {
  sendSWRDeleteRequest,
  sendSWRPatchRequest,
  sendSWRRequest,
} from "@/lib/swr/use-swr";
import { SWR_KEY } from "@/shared/constants/SWR_KEY";
import { GetOrCreateConversationQuery } from "./conversations.types";

import useSWR, { mutate } from "swr";
import { requester } from "@/lib/requester/requester";
import {
  GetUserConversationsQuery,
  GetUserConversationsResponse,
} from "./conversations.types";
import { buildUrlSearchParams } from "@/shared/lib/buildUrlSearchParams";
import { CreateMessageInput } from "../offers/offer.type";
import { toast } from "sonner";

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

// PATCH pour marquer tous les messages d'une conversation comme lus
export function useMarkConversationAsRead(conversationId: string) {
  const key = SWR_KEY.CONVERSATIONS.MESSAGES.MARK_AS_READ(conversationId);
  return useSWRMutation<void, Error, string>(key, sendSWRPatchRequest, {
    rollbackOnError: true,
    onSuccess() {},
  });
}

// POST pour envoyer un message dans une conversation
export function useSendMessage() {
  const key = SWR_KEY.CONVERSATIONS.MESSAGES.CREATE;
  return useSWRMutation<void, Error, string, CreateMessageInput>(
    key,
    sendSWRRequest,
    {
      rollbackOnError: true,
      onSuccess() {
        toast.success("Message envoyé !");
      },
    },
  );
}

// DELETE pour supprimer un message
export function useDeleteMessage() {
  return useSWRMutation<void, Error, string, string>(
    "delete-message",
    (key, { arg: messageId }) => sendSWRDeleteRequest(SWR_KEY.CONVERSATIONS.MESSAGES.DELETE(messageId)),
    {
      rollbackOnError: true,
      onSuccess() {
        toast.success("Message supprimé !");
      },
    }
  );
}
