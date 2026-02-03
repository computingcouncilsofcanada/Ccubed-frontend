// Unified Events related type definitions

import { ApiResponse } from "./base";

export type FileObject = {
  id: string; // Keep as string for Google Drive IDs
  name: string;
  url: string;
};

export type Events = {
  id: number;
  name: string;
  description: string;
  status: number;
  date: string;
  time: string;
  location: string;
  images: string;
  files: FileObject[];
  types: string[];
  url: string | null;
};

// API Event type definition (raw format from API)
export type ApiEvent = {
  id: string;
  name: string;
  description: string;
  start_at: string;
  end_at: string;
  location: string;
  url: string | null;
  ownership: null;
  domains: string[] | null
  status: number;
  types: string[];
  pending_action: string | null;
  reject_reason: string | null;
  approved_by: string[] | null;
  created_at: string;
  updated_at: string | null;
  created_by: string;
  updated_by: string | null;
  files: Array<{
    id: string;
    name: string;
    url: string;
  }>;
};

/** Admin/API event shape (used by super-admin). Same as ApiEvent. */
export type Event = ApiEvent;

export interface EventStatsResponse extends ApiResponse<EventStats> {
  data: EventStats;
}
export interface EventStats {
  total_events: number;
  total_approved_events: number;
  total_rejected_events: number;
  total_pending_events: number;
  domains_count: Record<string, number>;
  types_count: Record<string, number>;
  locations_count: Record<string, number>;
}

export interface EventForm {
  name: string;
  description: string;
  start_at: string;
  end_at: string;
  location: string;
  url?: string;
  registration_link: string;
  learning_outcomes: { value: string }[];
  what_you_need: { value: string }[];
  instructors: { value: string }[];
  types: string[];
  ownership?: string[];
  domains?: string[];
  files?: FileList;
  eventType: "one-day" | "weekly" | "monthly" | "multiple-day";
  selectedDayOfWeek?: string;
  multipleDays?: string[];
  monthlyDate?: string;
}
