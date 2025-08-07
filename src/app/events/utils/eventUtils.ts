import { Events } from "@/types/events";

/**
 * Separates events into current and past based on their end time
 * @param events Array of all events
 * @returns Object with currentEvents and pastEvents arrays
 */
export function separateEventsByTime(events: Events[]) {
  const now = new Date();
  const currentEvents: Events[] = [];
  const pastEvents: Events[] = [];

  events.forEach((event) => {
    // Parse the event date and time to determine if it's past
    const eventDate = new Date(event.date);
    
    // Extract end time from the time range (e.g., "2:00 PM - 4:00 PM")
    const timeRange = event.time.split(' - ');
    if (timeRange.length >= 2) {
      const endTimeString = timeRange[1].trim();
      const [time, period] = endTimeString.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      
      // Convert to 24-hour format
      let endHours = hours;
      if (period.toUpperCase() === 'PM' && hours !== 12) {
        endHours += 12;
      } else if (period.toUpperCase() === 'AM' && hours === 12) {
        endHours = 0;
      }
      
      // Create the full end datetime
      const eventEndTime = new Date(eventDate);
      eventEndTime.setHours(endHours, minutes, 0, 0);
      
      // Compare with current time
      if (eventEndTime < now) {
        pastEvents.push(event);
      } else {
        currentEvents.push(event);
      }
    } else {
      // If time parsing fails, default to current events
      currentEvents.push(event);
    }
  });

  return {
    currentEvents,
    pastEvents
  };
}

/**
 * Checks if an event is in the past based on its end time
 * @param event Event to check
 * @returns true if event has ended, false otherwise
 */
export function isEventPast(event: Events): boolean {
  const { pastEvents } = separateEventsByTime([event]);
  return pastEvents.length > 0;
} 