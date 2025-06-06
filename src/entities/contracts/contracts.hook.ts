 import useSWR from "swr";

import { SWR_KEY } from "@/shared/constants/SWR_KEY";
import { contractOfferDto, registerMessageDto } from "@kascad-app/shared-types";
import { requester } from "@/lib/requester/requester";
import useSWRMutation from "swr/mutation";
import { sendSWRRequest } from "@/lib/swr/use-swr";

export function useGetCountNewMessages() {
  return useSWR<any>(SWR_KEY.CONTRACT.COUNTNEWMESSAGES, () =>
    requester().get<any>(SWR_KEY.CONTRACT.COUNTNEWMESSAGES),
  );
}

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

export function useSendMessage(id: string) {
  return useSWRMutation<contractOfferDto, Error, string, registerMessageDto>(
    SWR_KEY.CONTRACT.SENDMESSAGE(id),
    sendSWRRequest,
    {
      rollbackOnError: true,
      onError() { },
      onSuccess() {
      },
    },
  );
}