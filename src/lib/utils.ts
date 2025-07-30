import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Transform API event data to match component format
export function transformApiEvents(apiEvents: any[]) {
  return apiEvents.map((event: any) => {
    // Handle different timestamp formats
    const formatDateTime = (timestamp: string) => {
      // Check if it's a Unix timestamp (all digits)
      if (/^\d+$/.test(timestamp)) {
        const date = new Date(parseInt(timestamp) * 1000);
        return {
          date: date.toISOString().split('T')[0], // YYYY-MM-DD
          time: date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          })
        };
      } else {
        // ISO datetime format
        const date = new Date(timestamp);
        return {
          date: date.toISOString().split('T')[0], // YYYY-MM-DD
          time: date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          })
        };
      }
    };

    const startDateTime = formatDateTime(event.start_at);
    const endDateTime = formatDateTime(event.end_at);

    // Combine start and end times
    const timeRange = `${startDateTime.time} - ${endDateTime.time}`;

    // Transform types array - handle comma-separated values
    const transformTypes = (types: string[]) => {
      if (!types || types.length === 0) return ["Online"]; // Default fallback
      
      // Split comma-separated values and clean them up
      const allTypes = types.flatMap(type => 
        type.split(',').map(t => t.trim().toLowerCase())
      );
      
      // Map to proper format - only known correct types, everything else becomes Online
      const typeMap: { [key: string]: string } = {
        'online': 'Online',
        'in person': 'In Person'
      };
      
      // Any unknown/incorrect type defaults to Online
      const transformedTypes = allTypes.map(type => typeMap[type] || 'Online');
      
      // Remove duplicates and return all types
      const uniqueTypes = [...new Set(transformedTypes)];
      return uniqueTypes.length > 0 ? uniqueTypes : ["Online"];
    };

    return {
      id: typeof event.id === 'string' ? parseInt(event.id, 16) : event.id, // Convert hex string to number if needed
      name: event.name,
      description: event.description,
      status: event.status,
      date: startDateTime.date,
      time: timeRange,
      location: event.location,
      images: "", // API doesn't have this field
      files: event.files || [],
      types: transformTypes(event.types)
    };
  });
}
