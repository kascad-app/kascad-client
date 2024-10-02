import { Requester } from "@/shared/lib/requester";
import useSWR from "swr";

export const useAPI = <T = any>(path: string | null) => {
  const fetcher = () => Requester.requester().get<T>(path!);

  return useSWR(path, fetcher);
};
