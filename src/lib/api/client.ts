import { getApiUrl } from "@/config/urls";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type QueryParams = Record<string, string | number | boolean | undefined | null>;

export type ApiRequestOptions = Omit<RequestInit, "body"> & {
  params?: QueryParams;
  /** JSON body — serialized automatically. */
  json?: unknown;
  body?: BodyInit | null;
};

function buildApiUrl(path: string, params?: QueryParams): string {
  const base = getApiUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${base}${normalizedPath}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

function mergeHeaders(init?: HeadersInit): Headers {
  const headers = new Headers(init);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return headers;
}

/**
 * Fetch wrapper for the dashboard API.
 * Sends cookies cross-origin when the API allows credentials (CORS + SameSite).
 */
export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { params, json, headers, body, ...init } = options;

  const response = await fetch(buildApiUrl(path, params), {
    ...init,
    credentials: "include",
    headers: mergeHeaders(headers),
    body: json !== undefined ? JSON.stringify(json) : body,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson
    ? await response.json().catch(() => undefined)
    : await response.text().catch(() => undefined);

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && "message" in payload
        ? String((payload as { message: unknown }).message)
        : response.statusText || "Request failed";

    throw new ApiError(message, response.status, payload);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return payload as T;
}

export const api = {
  get<T>(path: string, options?: Omit<ApiRequestOptions, "method" | "json" | "body">) {
    return apiRequest<T>(path, { ...options, method: "GET" });
  },
  post<T>(path: string, json?: unknown, options?: Omit<ApiRequestOptions, "method" | "json" | "body">) {
    return apiRequest<T>(path, { ...options, method: "POST", json });
  },
  put<T>(path: string, json?: unknown, options?: Omit<ApiRequestOptions, "method" | "json" | "body">) {
    return apiRequest<T>(path, { ...options, method: "PUT", json });
  },
  patch<T>(path: string, json?: unknown, options?: Omit<ApiRequestOptions, "method" | "json" | "body">) {
    return apiRequest<T>(path, { ...options, method: "PATCH", json });
  },
  delete<T>(path: string, options?: Omit<ApiRequestOptions, "method" | "json" | "body">) {
    return apiRequest<T>(path, { ...options, method: "DELETE" });
  },
};
