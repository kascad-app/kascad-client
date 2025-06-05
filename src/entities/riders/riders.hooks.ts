import useSWRMutation from "swr/mutation";

import { sendPUTSWRRequest, sendSWRRequest } from "@/lib/swr/use-swr";
import { SWR_KEY } from "@/shared/constants/SWR_KEY";
import { Rider } from "@kascad-app/shared-types";
import useSWR from "swr";
import { requester } from "@/lib/requester/requester";

export function useUpdateOne() {
  return useSWRMutation<Rider, Error, string, Partial<Rider>>(
    SWR_KEY.AUTH.UPDATE,

    sendPUTSWRRequest,
    {
      rollbackOnError: true,
      onSuccess() {
        console.log("success update", SWR_KEY.AUTH.UPDATE);
      },
    },

  );
}


export function useGetRiders() {
  return useSWR<Rider[]>(SWR_KEY.RIDER.RIDERS, () =>
    requester().get<Rider[]>(SWR_KEY.RIDER.RIDERS)
    // console.log("useGetRiders", SWR_KEY.RIDER.RIDERS)
  );
}


export function useGetRider(_id: string) {
  console.log("useGetRider", _id);
  return useSWR<Rider>(SWR_KEY.RIDER.RIDER(_id), () =>
    requester().get<Rider>(SWR_KEY.RIDER.RIDER(_id)),
  );
}
