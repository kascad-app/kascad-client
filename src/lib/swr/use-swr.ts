import useSWR, { SWRConfiguration } from "swr";
import { requester } from "../requester/requester";

export const useAPI = <T = unknown>(
  path: string | null,
  options?: SWRConfiguration,
) => {
  return useSWR<T>(
    path,
    async (url) => {
      const response = await requester().get<T>(url);
      return response;
    },
    options,
  );
};

export async function sendSWRRequest<T, P>(
  url: string,
  { arg }: { arg: P } = { arg: {} as P },
): Promise<T> {
  console.log(arg);
  // Si arg est un FormData, on l'envoie tel quel
  if (arg instanceof FormData) {
    return requester()
      .post<T>(url, {
        data: arg === undefined ? {} : arg,
      }) // <-- body, pas data
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  }
  // Sinon, comportement normal
  return requester()
    .post<T>(url, {
      data: arg === undefined ? {} : arg,
    })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}

export async function sendPUTSWRRequest<T, P>(
  url: string,
  { arg }: { arg: P } = { arg: {} as P },
): Promise<T> {
  return requester()
    .put<T>(url, {
      data: arg === undefined ? {} : arg,
    })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}
