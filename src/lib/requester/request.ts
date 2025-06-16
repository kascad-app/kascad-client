type FetchOptions = Omit<RequestInit, "body"> & {
  data?: unknown;
};

const request = async <TData>(
  url: string,
  options?: FetchOptions,
): Promise<TData> => {
  let headers = new Headers({
    Accept: "application/json",
    ...options?.headers,
  });

  let body: BodyInit | undefined = undefined;

  if (options?.data instanceof FormData) {
    body = options.data;
    // Surtout NE PAS mettre Content-Type, fetch le gère pour FormData
  } else if (options?.data !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(options.data);
  }

  const config: RequestInit = {
    ...options,
    headers,
    body,
    method: options?.method || "GET",
    credentials: "include",
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}${url}`,
    config,
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`,
    );
  }

  const data: TData = await response.json();
  return data;
};

export type { FetchOptions as ApiRequestConfig };
export default request;
