import { ApiEvent } from "@/types/events";
import { formatTimeSmart } from "@/utils/dateUtils";

// Transform API event data to match component format
export function transformApiEvents(apiEvents: ApiEvent[]) {
  return apiEvents.map((event: ApiEvent) => {
    // Handle different timestamp formats using smart timezone utilities
    const formatDateTime = (timestamp: string) => {
      // For API transformation, we need ISO format (YYYY-MM-DD) for date
      // But formatDateSmart doesn't have 'iso' format, so we'll manually format it
      const date = new Date(parseInt(timestamp));
      const isoDate = date.toLocaleDateString("en-CA"); // YYYY-MM-DD in user's timezone

      return {
        date: isoDate,
        time: formatTimeSmart(timestamp, { format: "12h" }), // Returns time in user's timezone
      };
    };

    const startDateTime = formatDateTime(event.start_at);
    const endDateTime = formatDateTime(event.end_at);

    // Combine start and end times
    const timeRange = `${startDateTime.time} - ${endDateTime.time}`;

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
      date: startDateTime.date,
      time: timeRange,
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
