import { requester } from "@plugins/requester";
import useSWR from "swr";

export const useAPI = <T = any>(path: string | null) => {
  const fetcher = () => requester().get<T>(path!);

  return useSWR(path, fetcher);
};
