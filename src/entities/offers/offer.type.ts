import { ContractType, IOffersRider } from "@kascad-app/shared-types";
import { z } from "zod";

export interface IOfferPaginee {
  data: IOffersRider[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface IMyOffersPaginee {
  status: string;
  data: IOffersRider[];
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
