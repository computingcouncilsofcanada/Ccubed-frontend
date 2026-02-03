/**
 * Smart date formatting utilities with timezone awareness
 */

// Get user's current timezone
export const getUserTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

// Smart date formatter that handles different input formats
export const formatDateSmart = (input: string | number, options?: {
  format?: 'full' | 'short' | 'medium';
  timezone?: string;
}): string => {
  const { format = 'full', timezone = getUserTimezone() } = options || {};
  
  let date: Date;
  
  // Handle different input types
  if (typeof input === 'number' || /^\d+$/.test(input)) {
    // Unix timestamp
    date = new Date(parseInt(input.toString()));
  } else if (input.match(/^\d{4}-\d{2}-\d{2}$/)) {
    // ISO date string (YYYY-MM-DD) - parse manually to avoid timezone shifts
    const [year, month, day] = input.split('-').map(Number);
    date = new Date(year, month - 1, day);
  } else {
    // Other date formats
    date = new Date(input);
  }
  
  // Format options based on requested format
  const formatOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone
  };
  
  switch (format) {
    case 'full':
      formatOptions.month = 'long';
      formatOptions.day = 'numeric';
      formatOptions.year = 'numeric';
      break;
    case 'medium':
      formatOptions.month = 'short';
      formatOptions.day = 'numeric';
      formatOptions.year = 'numeric';
      break;
    case 'short':
      formatOptions.month = 'numeric';
      formatOptions.day = 'numeric';
      formatOptions.year = '2-digit';
      break;
  }
  
  return date.toLocaleDateString("en-US", formatOptions);
};

// Extract day number from formatted date
export const extractDay = (dateString: string): string => {
  const formatted = formatDateSmart(dateString);
  const dayWithComma = formatted.split(' ')[1]; // "10,"
  return dayWithComma.replace(',', ''); // "10"
};

// Get ordinal suffix (1st, 2nd, 3rd, 4th, etc.)
export const getOrdinalSuffix = (num: string | number): string => {
  const n = parseInt(num.toString(), 10);
  const lastDigit = n % 10;
  const lastTwo = n % 100;

  if (lastTwo >= 11 && lastTwo <= 13) return "th";

  if (lastDigit === 1) return "st";
  if (lastDigit === 2) return "nd";
  if (lastDigit === 3) return "rd";
  return "th";
};

// Get formatted day with ordinal (10th, 1st, 2nd, etc.)
export const getOrdinalDay = (dateString: string): string => {
  const day = extractDay(dateString);
  return `${day}${getOrdinalSuffix(day)}`;
};

// Get month name from date
export const getMonthName = (dateString: string): string => {
  const formatted = formatDateSmart(dateString);
  return formatted.split(' ')[0]; // "August"
};

// Format time in user's timezone
export const formatTimeSmart = (timestamp: string | number, options?: {
  timezone?: string;
  format?: '12h' | '24h';
}): string => {
  const { timezone = getUserTimezone(), format = '12h' } = options || {};
  
  let date: Date;
  if (typeof timestamp === 'number' || /^\d+$/.test(timestamp)) {
    date = new Date(parseInt(timestamp.toString()));
  } else {
    date = new Date(timestamp);
  }
  
  return date.toLocaleTimeString("en-US", {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: format === '12h'
  });
};

// Debug helper to show timezone info
export const getTimezoneInfo = () => {
  const timezone = getUserTimezone();
  const now = new Date();
  
  return {
    timezone,
    offset: now.getTimezoneOffset(),
    offsetHours: now.getTimezoneOffset() / 60,
    localTime: now.toLocaleString(),
    utcTime: now.toISOString()
  };
}; 


// Helper to format date as DD-MM-YYYY
export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Helper to parse DD-MM-YYYY to Date
export const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

