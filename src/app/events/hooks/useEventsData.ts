import { useState, useEffect } from "react";
import { Events } from "@/types/events";
import { privateAxios } from "@/lib/axios";
import { transformApiEvents } from "@/utils/eventsApi";
import { separateEventsByTime } from "@/utils/eventUtils";

export function useEventsData() {
  const [currentEvents, setCurrentEvents] = useState<Events[]>([]);
  const [pastEvents, setPastEvents] = useState<Events[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const res = await privateAxios.get("/events");
        const transformedEvents = transformApiEvents(res.data.data);
        
        // Separate current and past events
        const { currentEvents: current, pastEvents: past } = separateEventsByTime(transformedEvents);
        setCurrentEvents(current);
        setPastEvents(past);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error && 'response' in error && 
          typeof error.response === 'object' && error.response && 
          'data' in error.response && typeof error.response.data === 'object' && 
          error.response.data && 'message' in error.response.data
          ? String(error.response.data.message)
          : "Failed to fetch events";
        setError(errorMessage);
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return {
    currentEvents,
    pastEvents,
    error,
    isLoading,
  };
} 