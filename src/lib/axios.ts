import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE ;

export const publicAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const privateAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

privateAxios.interceptors.request.use((config) => {
  const csrfToken = localStorage.getItem("csrf_token");
  if (csrfToken) {
    config.headers["csrf-token"] = csrfToken;
  }
  return config;
});

