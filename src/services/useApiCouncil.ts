import { privateAxios } from "@/lib/axios";

export const getCouncil = async (id: string) => {
  const response = await privateAxios.get(`/council/${id}`);
  return response.data;
};

export const getCouncils = async () => {
  const response = await privateAxios.get(`/council`);
  return response.data;
};
