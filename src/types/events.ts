// Unified Events related type definitions

import { ApiResponse } from "./base";

export type FileObject = {
  id: string; // Keep as string for Google Drive IDs
  name: string;
  url: string;
};

/** Recurrence shape from API (snake_case) */
export type EventRecurrence = {
  type: "none" | "daily" | "weekly" | "monthly" | "custom";
  days_of_week?: string[];
  custom_dates?: string[];
} | null;

/** Raw API event shape (matches NestJS/Mongoose schema) */
export interface ApiEvent {
  id: string;
  name: string;
  description: string;
  learning_outcomes?: string[] | null;
  what_you_need?: string[] | null;
  instructors?: string[] | null;
  registration_link?: string;
  start_at: string | null;
  end_at: string | null;
  recurrence?: EventRecurrence;
  location: string;
  url?: string | null;
  ownership?: string[] | null;
  domains?: string[] | null;
  status: number;
  types: string[];
  pending_action?: string | null;
  reject_reason?: string | null;
  approved_by?: string[];
  created_at: string;
  updated_at?: string | null;
  created_by: string;
  updated_by?: string | null;
  files?: FileObject[];
  /** Optional markdown string for extra structured content (session structure, agenda, etc.) */
  content?: string | null;
}

/** Frontend display event (with computed date/time, used in UI) */
export interface Event {
  id: string | number;
  name: string;
  description: string;
  /** Display date (computed from start_at) */
  date: string;
  /** Display time (computed from start_at/end_at or raw) */
  time: string;
  start_at?: string | null;
  end_at?: string | null;
  registration_link?: string;
  learning_outcomes?: string[] | null;
  what_you_need?: string[] | null;
  instructors?: string[] | null;
  recurrence?: EventRecurrence;
  location: string;
  url?: string | null;
  status: number;
  types: string[];
  domains?: string[] | null;
  pending_action?: string | null;
  reject_reason?: string | null;
  approved_by?: string[] | null;
  created_at?: string;
  updated_at?: string | null;
  created_by?: string;
  updated_by?: string | null;
  files: FileObject[];
  /** Optional markdown string for extra structured content (session structure, agenda, etc.) */
  content?: string | null;
}

/** Alias used across events components */
export type Events = Event;

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
