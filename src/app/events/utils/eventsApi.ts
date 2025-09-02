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
      // This is a recurring event (start_at is text like "Every Thursdays")
      date = event.start_at.trim(); // Use the text as-is

      // Store the end timestamp in the time field for proper categorization
      time = event.end_at; // Store the timestamp for processing
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
      const startDateTime = formatDateTime(event.start_at);
      const endDateTime = formatDateTime(event.end_at);
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
      id: typeof event.id === "string" ? parseInt(event.id, 16) : event.id, // Convert hex string to number if needed
      name: event.name,
      description: event.description,
      status: event.status,
      date,
      time,
      location: event.location,
      images: "", // API doesn't have this field
      files: (event.files || []).map((file) => ({
        ...file,
        // Keep file.id as string (Google Drive IDs are strings)
      })),
      types: transformTypes(event.types),
    };
  });
}
