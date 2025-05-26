import useSWR from "swr/mutation";

import { SWR_KEY } from "@/shared/constants/SWR_KEY";
import { getContractsDto } from "@kascad-app/shared-types";
import { requester } from "@/lib/requester/requester";

export function useGetContracts() {
  return useSWR<getContractsDto[]>(SWR_KEY.CONTRACT.CONTRACTS, () =>
    requester().get<getContractsDto[]>(SWR_KEY.CONTRACT.CONTRACTS),
  );
}

export function useGetContract(id?: string) {
  return useSWR<getContractsDto>(
    id ? `${SWR_KEY.CONTRACT.CONTRACTS}/${id}` : null,
    () => requester().get<getContractsDto>(`${SWR_KEY.CONTRACT.CONTRACTS}/${id}`)
  );
}
