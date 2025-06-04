import useSWR from "swr";

import { SWR_KEY } from "@/shared/constants/SWR_KEY";
import { requester } from "@/lib/requester/requester";

export function useGetCountNewMessages() {
  return useSWR<any>(SWR_KEY.CONTRACT.COUNTNEWMESSAGES, () =>
    requester().get<any>(SWR_KEY.CONTRACT.COUNTNEWMESSAGES),
  );
}
