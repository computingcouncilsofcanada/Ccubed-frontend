import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE;
const API_BASE_LOCAL = process.env.NEXT_PUBLIC_API_BASE;

let csrfToken: string = "";


export const setAxiosCsrfToken = (token: any): void => {
  if (!token) {
    return;
  }
  // If token is an object with data property, use that
  const tokenString =
    typeof token === "object" && token.data ? token.data : token;
  csrfToken = tokenString;
};

// Get CSRF Token (for debugging purposes)
export const getAxiosCsrfToken = () => {
  return csrfToken;
};

export const publicAxiosLocal = axios.create({
  baseURL: API_BASE_LOCAL,
  withCredentials: true,
});

// Public Axios
export const publicAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Private Axios
export const privateAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Private Axios Interceptor
privateAxios.interceptors.request.use(async (config) => {
  try {
    if (!csrfToken) {
      const response = await publicAxios.get("/auth/csrf-token");
      if (response.data?.data) {
        setAxiosCsrfToken(response.data.data);
      }
    }

    config.headers = config.headers || {};
    if (csrfToken) {
      config.headers["x-csrf-token"] = csrfToken;
    }

    return config;
  } catch (error) {
    return config;
  }
});
