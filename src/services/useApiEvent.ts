import { privateAxios } from "@/lib/axios";
import { useCallback } from "react";
import { EventStatsResponse } from "@/types/events";

export const useApiEvent = () => {
    const baseUrl = "/events";

    const getEventStats = useCallback(async () => {
        const response = await privateAxios.get<EventStatsResponse>(`${baseUrl}/stats`);
        return response.data;
    }, []);

    return {
        getEventStats,
    };
};