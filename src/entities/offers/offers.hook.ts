import useSWRMutation from "swr/mutation";

import { sendPUTSWRRequest, sendSWRRequest } from "@/lib/swr/use-swr";
import { SWR_KEY } from "@/shared/constants/SWR_KEY";
import { IOffer } from "@kascad-app/shared-types";
import useSWR from "swr";
import { requester } from "@/lib/requester/requester";
import { IOfferPaginee } from "./offer.type";
import { GetOffersQueryDto } from "./offer.type";

export function useGetOffers(query: Partial<GetOffersQueryDto>) {
  const params = new URLSearchParams();
  // if (query.page) params.append("page", String(query.page));
  // if (query.limit) params.append("limit", String(query.limit));
  // if (query.status) params.append("status", query.status);
  // if (query.sport) params.append("sport", query.sport);
  if (query.contractType)
    params.append("contractType", String(query.contractType));
  const key = `${SWR_KEY.OFFERS.OFFERS}?${params.toString()}`;
  return useSWR<IOfferPaginee>(key, () => requester().get<IOfferPaginee>(key));
}
