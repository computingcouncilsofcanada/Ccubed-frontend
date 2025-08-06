import { useMemo } from "react";
import { Events } from "@/types/events";

// Filter function
const filterEventsByType = (events: Events[], type: string): Events[] => {
  return events
    .filter((event: Events) => event.status !== 0)
    .filter((event: Events) => {
      if (type === "all") return true;
      if (!event.types || event.types.length === 0) return type === "online";

      if (type === "hybrid") {
        return event.types.length > 1 || 
               event.types.some((eventType) => eventType.toLowerCase().includes("hybrid"));
      }
      if (type === "inperson") {
        return event.types.length === 1 && event.types[0] === "In Person";
      }
      if (type === "online") {
        return event.types.length === 1 && event.types[0] === "Online";
      }
      return false;
    });
};

type UseEventsFilterProps = {
  currentEvents: Events[];
  eventType: string;
  isLoading: boolean;
};

export function useEventsFilter({ currentEvents, eventType, isLoading }: UseEventsFilterProps) {
  // Apply filter to current events
  const filteredCurrentEvents = useMemo(() => 
    filterEventsByType(currentEvents, eventType), 
    [currentEvents, eventType]
  );

  // Simple empty state logic
  const isEmpty = filteredCurrentEvents.length === 0;
  const showEmptyState = !isLoading && isEmpty && eventType === "all";
  const showFilterEmptyState = !isLoading && isEmpty && eventType !== "all";

  return {
    filteredCurrentEvents,
    showEmptyState,
    showFilterEmptyState,
  };
} 