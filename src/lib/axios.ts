import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE;

let csrfToken: string = "";

export const setAxiosCsrfToken = (token: string) => {
  console.log("Setting axios CSRF token:", token);
  csrfToken = token;
};

export const publicAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const privateAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

privateAxios.interceptors.request.use((config) => {
  console.log("Making request with CSRF token:", csrfToken);
  if (csrfToken) {
    config.headers["x-csrf-token"] = csrfToken;
    console.log("Request headers:", config.headers);
  }
  return config;
});
