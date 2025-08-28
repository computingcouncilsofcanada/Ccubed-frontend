import { useMemo } from "react";
import { Events } from "@/types/events";

// Filter function
const filterEventsByType = (events: Events[], type: string): Events[] => {
  return events
    .filter((event: Events) => event.status !== 0)
    .filter((event: Events) => {
      if (type === "all") return true;
      if (type === "online") {
        // Show events that are explicitly marked as online or have no types specified
        if (!event.types || event.types.length === 0) return true;
        return event.types.some((eventType) =>
          eventType.toLowerCase().includes("online")
        );
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