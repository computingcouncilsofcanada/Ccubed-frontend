import { Events } from "@/types/events";

const isValidTimestamp = (val: string | undefined | null): boolean => {
  if (!val) return false;
  const timestamp = parseInt(val, 10);
  return !isNaN(timestamp) && timestamp > 0;
};

function parseDateAsLocal(dateStr: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())) {
    return new Date(dateStr + "T12:00:00");
  }
  return new Date(dateStr);
}

/**
 * Separates events into current and past based on their end time
 * @param events Array of all events
 * @returns Object with currentEvents and pastEvents arrays
 */
export function separateEventsByTime(events: Events[]) {
  const now = new Date();
  let currentEvents: Events[] = [];
  let pastEvents: Events[] = [];

  events.forEach((event) => {
    // If event date or time is 'TBD', always treat as current event
    const dateStr = (event.date || "").trim().toUpperCase();
    const timeStr = (event.time || "").trim().toUpperCase();

    if (!event.date || !event.time || dateStr === "TBD" || timeStr === "TBD") {
      currentEvents.push(event);
      return;
    }

    let eventEndTime: Date;

    // Use end_at timestamp when available (avoids timezone/parsing issues)
    if (isValidTimestamp(event.end_at)) {
      eventEndTime = new Date(parseInt(event.end_at!, 10));
    } else if (isValidTimestamp(event.time)) {
      // Recurring events store end timestamp in time field
      eventEndTime = new Date(parseInt(event.time, 10));
    } else {
      // Parse date and time range; use local date parsing to avoid UTC midnight shift
      const eventDate = parseDateAsLocal(event.date);
      const timeRange = event.time.split(" - ");
      if (timeRange.length >= 2) {
        const endTimeString = timeRange[1].trim();
        const [time, period] = endTimeString.split(" ");
        const [hours, minutes] = time.split(":").map(Number);

        let endHours = hours;
        if (period.toUpperCase() === "PM" && hours !== 12) {
          endHours += 12;
        } else if (period.toUpperCase() === "AM" && hours === 12) {
          endHours = 0;
        }

        eventEndTime = new Date(eventDate);
        eventEndTime.setHours(endHours, minutes, 0, 0);
      } else {
        eventEndTime = eventDate;
      }
    }

    if (eventEndTime < now) {
      pastEvents.push(event);
    } else {
      currentEvents.push(event);
    }
  });

  function isTBD(event: Events) {
    const dateStr = (event.date || "").trim().toUpperCase();
    const timeStr = (event.time || "").trim().toUpperCase();
    return (
      !event.date ||
      !event.time ||
      dateStr === "TBD" ||
      timeStr === "TBD"
    );
  }

  function getComparableDate(event: Events) {
    if (!event.date) return new Date(0); // put invalid first
    if (isValidTimestamp(event.end_at)) return new Date(parseInt(event.end_at!, 10));
    if (isValidTimestamp(event.time)) return new Date(parseInt(event.time, 10));

    const baseDate = parseDateAsLocal(event.date);
    if (event.time) {
      const timeRange = event.time.split(" - ");
      if (timeRange.length >= 2) {
        const endTimeString = timeRange[1].trim();
        const [time, period] = endTimeString.split(" ");
        const [hours, minutes] = time.split(":").map(Number);

        let endHours = hours;
        if (period.toUpperCase() === "PM" && hours !== 12) endHours += 12;
        if (period.toUpperCase() === "AM" && hours === 12) endHours = 0;

        baseDate.setHours(endHours, minutes || 0, 0, 0);
      }
    }
    return baseDate;
  }

  pastEvents = pastEvents.sort(
    (a, b) => getComparableDate(b).getTime() - getComparableDate(a).getTime()
  );

  currentEvents = currentEvents.sort((a, b) => {
    const aTBD = isTBD(a);
    const bTBD = isTBD(b);
    if (aTBD !== bTBD) return aTBD ? 1 : -1; 
    return getComparableDate(b).getTime() - getComparableDate(a).getTime();
  });



  return {
    currentEvents,
    pastEvents,
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
