import { privateAxios } from "@/lib/axios";
import { EventStatsResponse } from "@/types/events";

const baseUrl = "/events";

export const getEventStats = async () => {
  const response = await privateAxios.get<EventStatsResponse>(`${baseUrl}/stats`);
  return response.data;
};
