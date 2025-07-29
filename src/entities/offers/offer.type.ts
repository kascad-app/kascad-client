import {
  ContractType,
  IOffersRider,
  PaginationType,
} from "@kascad-app/shared-types";
import { z } from "zod";
import { MessageType } from "../direct-messages/conversations.types";

export interface IOfferPaginee {
  data: IOffersRider[];
  pagination: PaginationType;
}

export interface IMyOffers {
  application: string;
  createdAt: Date;
  offer: IOffersRider;
  riderId: string;
  updatedAt: Date;
}

export interface IMyOffersPaginee {
  applications: IMyOffers[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

const OfferStatus = z.enum([
  "draft",
  "active",
  "paused",
  "expired",
  "closed",
  "deleted",
]);

export type GetOffersQueryDto = z.infer<typeof GetOffersQueryDto>;

export const GetOffersQueryDto = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  status: OfferStatus.optional(),
  sport: z.string().optional(),
  contractType: z.nativeEnum(ContractType).optional(),
});

export const CreateMessageDto = z.object({
  conversationId: z.string(),
  content: z.string().min(1, "Content cannot be empty").max(5000),
  messageType: z.nativeEnum(MessageType).default(MessageType.TEXT),
});
export type CreateMessageInput = z.infer<typeof CreateMessageDto>;
