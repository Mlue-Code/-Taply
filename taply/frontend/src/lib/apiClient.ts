export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}
