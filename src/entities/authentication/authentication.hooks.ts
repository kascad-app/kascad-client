import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import {
  loginRiderDto,
  registerRiderDto,
  Rider,
  RiderMe,
} from "@kascad-app/shared-types";
import { requester } from "@/lib/requester/requester";
import { sendSWRRequest } from "@/lib/swr/use-swr";
import { SWR_KEY } from "@/shared/constants/SWR_KEY";

export function useMe() {
  return useSWR<RiderMe>(SWR_KEY.AUTH.ME, () =>
    requester().get<RiderMe>(SWR_KEY.AUTH.ME),
  );
}

export function useLogin() {
  return useSWRMutation<Rider, Error, string, loginRiderDto>(
    SWR_KEY.AUTH.LOGIN,
    sendSWRRequest,
    {
      rollbackOnError: true,
      onError() { },
      onSuccess() {
        mutate(SWR_KEY.AUTH.ME, undefined, true);
      },
    },
  );
}

export function useRegister() {
  return useSWRMutation<Rider, Error, string, registerRiderDto>(
    SWR_KEY.AUTH.REGISTER,
    sendSWRRequest,
    {
      rollbackOnError: true,
      onSuccess() {
        mutate(SWR_KEY.AUTH.ME, undefined, true);
      },
    },
  );
}

export function useLogout() {
  return useSWRMutation<void, Error, string>(
    SWR_KEY.AUTH.LOGOUT,
    sendSWRRequest,
    {
      optimisticData: () => undefined,
      onSuccess() {
        mutate(SWR_KEY.AUTH.ME, undefined, false);
        mutate(SWR_KEY.AUTH.LOGIN, undefined, false);
        mutate(SWR_KEY.AUTH.REGISTER, undefined, false);
      },
    },
  );
}
