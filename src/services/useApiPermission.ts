import { privateAxios } from "@/lib/axios";

export const fetchMyPermissions = async () => {
  const response = await privateAxios.get("/permission/me");
  return response.data;
};
