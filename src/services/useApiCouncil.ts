import { privateAxios } from "@/lib/axios";
import { useCallback } from "react";

export const useApiCouncil = () => {
  const getCouncil = useCallback(async (id: string) => {
    const response = await privateAxios.get(`/council/${id}`);
    return response.data;
  }, []);

  const getCouncils = useCallback(async () => {
    const response = await privateAxios.get(`/council`);
    return response.data;
  }, []);

  return { getCouncil, getCouncils };
};