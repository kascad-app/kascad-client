// Génère dynamiquement un URLSearchParams à partir d'un objet
import useSWRMutation from "swr/mutation";

import { sendSWRRequest } from "@/lib/swr/use-swr";
import { SWR_KEY } from "@/shared/constants/SWR_KEY";
import { IOffer } from "@kascad-app/shared-types";
import useSWR from "swr";
import { requester } from "@/lib/requester/requester";
import { IMyOffersPaginee, IOfferPaginee } from "./offer.type";
import { GetOffersQueryDto } from "./offer.type";
import { buildUrlSearchParams } from "@/shared/lib/buildUrlSearchParams";

export function useGetOffers(query: Partial<GetOffersQueryDto>) {
  const params = buildUrlSearchParams<GetOffersQueryDto>(query);
  const key = `${SWR_KEY.OFFERS.OFFERS}?${params.toString()}`;
  return useSWR<IOfferPaginee>(key, () => requester().get<IOfferPaginee>(key));
}

export function useGetMyOffers(query: Partial<GetOffersQueryDto>) {
  const params = buildUrlSearchParams<GetOffersQueryDto>(query);
  const key = `${SWR_KEY.OFFERS.MY_OFFERS}?${params.toString()}`;
  return useSWR<IMyOffersPaginee>(key, () =>
    requester().get<IMyOffersPaginee>(key),
  );
}

export function usePostCustomRiderOffer() {
  return useSWRMutation<IOffer, Error, string, { id: string }>(
    SWR_KEY.OFFERS.CUSTOM_RIDER.CANDIDATE(""),
    (key, { arg }) =>
      sendSWRRequest(SWR_KEY.OFFERS.CUSTOM_RIDER.CANDIDATE(arg.id)),
    {
      rollbackOnError: true,
      onSuccess(key) {
        console.log("success upload", key);
      },
    },
  );
}
