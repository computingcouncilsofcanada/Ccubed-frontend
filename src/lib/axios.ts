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
