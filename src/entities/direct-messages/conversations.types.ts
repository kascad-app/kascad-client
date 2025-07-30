import {
  ConversationStatus,
  ConversationType,
  PaginationType,
  ProfileType,
} from "@kascad-app/shared-types";
import { z } from "zod";

export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
}

export interface ConversationWithParticipants {
  _id: string;
  participants: Array<{
    userId: "string";
    userType: ProfileType;
  }>;
  context?: {
    type: ConversationType;
    referenceId?: string;
  };
  status: ConversationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationWithParticipantPreview
  extends ConversationWithParticipants {
  otherParticipant: {
    userId: "string";
    userType: ProfileType;
    displayName?: string;
    avatarUrl?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    companyName?: string;
  };
  lastMessage?: {
    _id: string;
    senderId: "string";
    senderType: ProfileType;
    content: string;
    messageType: MessageType;
    createdAt: Date;
  };
}

export interface GetUserConversationsResponse {
  conversations: ConversationWithParticipantPreview[];
  pagination: PaginationType;
}

export const GetUserConversationsDto = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  context: z.nativeEnum(ConversationType).optional(),
});

export type GetUserConversationsQuery = z.infer<typeof GetUserConversationsDto>;

export const ConversationContextDto = z.object({
  type: z.nativeEnum(ConversationType),
  referenceId: z.string().optional(),
});

export const GetOrCreateConversationDto = z.object({
  targetUserId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
  targetUserType: z.nativeEnum(ProfileType),
  context: ConversationContextDto.optional(),
});

export type GetOrCreateConversationQuery = z.infer<
  typeof GetOrCreateConversationDto
>;

export type UnreadCountResponse = {
  unreadCount: number;
};

export interface MessageWithSender {
  _id: string;
  conversationId: string;
  senderId: string;
  senderType: ProfileType;
  content: string;
  messageType: MessageType;
  readBy: Array<{
    userId: string;
    userType: ProfileType;
    readAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
  sender: {
    userId: string;
    userType: ProfileType;
    displayName?: string;
    avatarUrl?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    companyName?: string;
  };
}

interface SponsorInfo {
  _id: string;
  companyName: string;
  logo: string;
}

export interface GetMessagesResponse {
  participantInfo: SponsorInfo;
  messages: MessageWithSender[];
  pagination: PaginationType;
}

export interface GetMessagesServiceQuery {
  conversationId: string;
  page: number;
  limit: number;
}
