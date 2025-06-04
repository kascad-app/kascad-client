import useSWR from "swr/mutation";

import { SWR_KEY } from "@/shared/constants/SWR_KEY";
import { contractOfferDto } from "@kascad-app/shared-types";
import { requester } from "@/lib/requester/requester";

export function useGetContracts() {
  return useSWR<contractOfferDto[]>(SWR_KEY.CONTRACT.CONTRACTS, () =>
    requester().get<contractOfferDto[]>(SWR_KEY.CONTRACT.CONTRACTS),
  );
}

export function useGetContract(id: string) {
  return useSWR<contractOfferDto>(SWR_KEY.CONTRACT.CONTRACT(id), () =>
    requester().get<contractOfferDto>(SWR_KEY.CONTRACT.CONTRACT(id)),
  );
}