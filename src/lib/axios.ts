import axios, { type InternalAxiosRequestConfig } from "axios";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE;
const API_BASE_LOCAL = process.env.NEXT_PUBLIC_API_BASE;


let csrfToken = "";

export type CsrfTokenInput = string | { data: string } | null | undefined;

export const setAxiosCsrfToken = (token: CsrfTokenInput): void => {
  if (!token) return;
  const tokenString = typeof token === "object" ? token.data : token;
  if (typeof tokenString === "string") {
    csrfToken = tokenString;
  }
};

// Get CSRF Token (for debugging purposes)
export const getAxiosCsrfToken = (): string => {
  return csrfToken;
};

export const publicAxiosLocal = axios.create({
  baseURL: API_BASE_LOCAL,
  withCredentials: true,
});

export const publicAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const privateAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

const refreshAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Private Axios Interceptor
privateAxios.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  try {
    if (!csrfToken) {
      const response = await publicAxios.get("/auth/csrf-token");
      const maybeToken = response?.data?.data as string | { data: string } | undefined;
      if (maybeToken) setAxiosCsrfToken(maybeToken);
    }

    if (csrfToken) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>)["x-csrf-token"] = csrfToken;
    }

    return config;
  } catch {
    // Swallow and continue the request without CSRF header
    return config;
  }
});

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

/** Callback when token refresh fails (e.g. session expired). Set by UserProvider. */
let onSessionExpired: (() => void) | null = null;

export function setOnSessionExpired(fn: (() => void) | null): void {
  onSessionExpired = fn;
}

function doRefresh(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async () => {
    try {
      console.log("Interceptor: Initiating token refresh...");
      await refreshAxios.post("/auth/refresh-token", {}, { headers: {} });
      return true;
    } catch (tokenError: unknown) {
      throw typeof tokenError === "string" ? new Error(tokenError) : tokenError;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
      console.log("Interceptor: Resetting refresh state...");
    }
  })();
  return refreshPromise;
}

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.config?.retryAfterRefresh) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      isRefreshing = true;
      try {
        await doRefresh();
        error.config.retryAfterRefresh = true;
        return privateAxios(error.config);
      } catch (refreshError: unknown) {
        onSessionExpired?.();
        return Promise.reject(refreshError ?? error);
      }
    }
    return Promise.reject(error);
  }
);
