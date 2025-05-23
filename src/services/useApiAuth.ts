import { publicAxios } from "@/lib/axios";

export const login = async (email: string, password: string) => {
  const res = await publicAxios.post("/auth/login", {
    email: email,
    password: password,
  });
  return res.data;
};

export const signup = async (email: string, password: string) => {
  const res = await publicAxios.post("/auth/signup", {
    email: email,
    password: password,
  });
  return res.data;
};