export function buildUrlSearchParams<T extends Record<string, any>>(
  query: Partial<T>,
): URLSearchParams {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });
  return params;
}
