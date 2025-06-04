import useSWR from "swr";

import { SWR_KEY } from "@/shared/constants/SWR_KEY";
import { contractOfferDto } from "@kascad-app/shared-types";
import { requester } from "@/lib/requester/requester";
import useSWRMutation from "swr/mutation";

export function useGetContracts() {
  return useSWR<contractOfferDto[]>(SWR_KEY.CONTRACT.CONTRACTS, () =>
    requester().get<contractOfferDto[]>(SWR_KEY.CONTRACT.CONTRACTS),
  );
}

export function useGetContract(id: string) {
  return useSWRMutation<contractOfferDto>(SWR_KEY.CONTRACT.CONTRACT(id), () =>
    requester().get<contractOfferDto>(SWR_KEY.CONTRACT.CONTRACT(id)),
  );
}