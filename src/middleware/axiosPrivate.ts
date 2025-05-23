import axios from "axios";
import publicAxios from "./axiosPublic";

const privateAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true,
});

privateAxios.interceptors.request.use(async (config) => {
  const csrfToken = localStorage.getItem("csrf_token");
  if (csrfToken) {
    config.headers["x-csrf-token"] = csrfToken;
  }

  return config;
});

export default privateAxios;
