import request, { ApiRequestConfig } from "./request";

type BaseRequest = <TData>(
  url: string,
  options?: ApiRequestConfig,
) => Promise<TData>;

type RequestResponse = {
  get: BaseRequest;
  post: BaseRequest;
  put: BaseRequest;
  patch: BaseRequest;
  delete: BaseRequest;
};

const requester = (auth = true): RequestResponse => {
  // eslint-disable-next-line prefer-const
  let baseOptions: ApiRequestConfig = {};

  if (auth) baseOptions.credentials = "include";

  const createRequest =
    (method: string) =>
    async <TData = unknown>(
      url: string,
      options?: ApiRequestConfig,
    ): Promise<TData> => {
      return request<TData>(url, { ...baseOptions, ...options, method });
    };

  return {
    get: createRequest("GET"),
    post: createRequest("POST"),
    put: createRequest("PUT"),
    patch: createRequest("PATCH"),
    delete: createRequest("DELETE"),
  };
};

export { requester };
