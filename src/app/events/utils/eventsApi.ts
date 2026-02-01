import { ApiEvent } from "@/types/events";
import { formatTimeSmart } from "@/utils/dateUtils";

// Transform API event data to match component format
export function transformApiEvents(apiEvents: ApiEvent[]) {
  return apiEvents.map((event: ApiEvent) => {
    // Helper to check for missing or TBD
    const isTBD = (val: string | undefined | null) => {
      if (!val) return true;
      const v = val.trim().toUpperCase();
      return v === "TBD" || v === "" || v === "DATE TBD" || v === "TIME TBD";
    };

    // Helper to check if a value is a valid timestamp
    const isValidTimestamp = (val: string | undefined | null) => {
      if (!val) return false;
      const timestamp = parseInt(val);
      return !isNaN(timestamp) && timestamp > 0;
    };

    let date = "TBD";
    let time = "TBD";

    // Handle recurring events where start_at is text and end_at is timestamp
    if (
      event.start_at &&
      !isValidTimestamp(event.start_at) &&
      isValidTimestamp(event.end_at)
    ) {
      const formatDateTime = (timestamp: string) => {
        const date = new Date(parseInt(timestamp));
        const isoDate = date.toLocaleDateString("en-CA");
        return {
          date: isoDate,
          time: formatTimeSmart(timestamp, { format: "12h" }),
        };
      };
      date = formatDateTime(event.end_at ?? "").date;

      // Store the end timestamp in the time field for proper categorization
      time = event.end_at ?? ""; // Store the timestamp for processing
    } else if (!isTBD(event.start_at) && !isTBD(event.end_at)) {
      // Regular event with both timestamps
      const formatDateTime = (timestamp: string) => {
        const date = new Date(parseInt(timestamp));
        const isoDate = date.toLocaleDateString("en-CA");
        return {
          date: isoDate,
          time: formatTimeSmart(timestamp, { format: "12h" }),
        };
      };
      const startDateTime = formatDateTime(event.start_at ?? "");
      const endDateTime = formatDateTime(event.end_at ?? "");
      date = startDateTime.date;
      time = `${startDateTime.time} - ${endDateTime.time}`;
    }

    // Transform types array - handle comma-separated values
    const transformTypes = (types: string[]) => {
      if (!types || types.length === 0) return ["Online"]; // Default fallback

      // Split comma-separated values and clean them up
      const allTypes = types.flatMap((type) =>
        type.split(",").map((t) => t.trim().toLowerCase())
      );

      // Map to proper format - only known correct types, everything else becomes Online
      const typeMap: { [key: string]: string } = {
        online: "Online",
        "in person": "In Person",
      };

      // Any unknown/incorrect type defaults to Online
      const transformedTypes = allTypes.map(
        (type) => typeMap[type] || "Online"
      );

      // Remove duplicates and return all types
      const uniqueTypes = [...new Set(transformedTypes)];
      return uniqueTypes.length > 0 ? uniqueTypes : ["Online"];
    };

    return {
      id: event.id,
      name: event.name,
      description: event.description,
      date,
      time,
      start_at: event.start_at ?? null,
      end_at: event.end_at ?? null,
      registration_link: event.registration_link ?? event.url ?? "",
      learning_outcomes: event.learning_outcomes ?? null,
      what_you_need: event.what_you_need ?? null,
      instructors: event.instructors ?? null,
      recurrence: event.recurrence ?? null,
      location: event.location,
      url: event.url ?? null,
      status: event.status,
      types: transformTypes(event.types),
      files: (event.files || []).map((file) => ({
        id: file.id,
        name: file.name,
        url: file.url,
      })),
    };
  });
}
