// Unified Events related type definitions

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
  url?: string;
};

// API Event type definition (raw format from API)
export type ApiEvent = {
  id: string;
  name: string;
  description: string;
  start_at: string;
  end_at: string;
  url?: string | null;
  ownership: string | null;
  domains: string | null;
  location: string;
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
