import useSWRMutation from "swr/mutation";

import { Rider } from "@kascad-app/shared-types";
import { sendSWRRequest } from "@/lib/swr/use-swr";
import { SWR_KEY } from "@/shared/constants/SWR_KEY";
import useSWR from "swr";
import { requester } from "@/lib/requester/requester";

export function useUpdateOne(id: string) {
  return useSWRMutation<Rider, Error, string, Partial<Rider>>(
    SWR_KEY.RIDER.RIDER(id),
    sendSWRRequest,
    {
      rollbackOnError: true,
      onSuccess() {
        console.log("success update");
      },
    },
  );
}

export function useGetRider(slug: string) {
  return useSWR<Rider>(SWR_KEY.RIDER.RIDER, () =>
    requester().get<Rider>(SWR_KEY.RIDER.RIDER(slug)),
  );
}
