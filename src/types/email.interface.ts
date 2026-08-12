export interface EmailTemplate {
  id: string;
  name: string;
  description?: string | null;
  subject: string;
  body: string;
  placeholders: string[];
  created_by: string;
  created_at: string;
  updated_by?: string | null;
  updated_at?: string | null;
}

export interface CreateEmailTemplateDTO {
  name: string;
  description?: string | null;
  subject: string;
  body: string;
}

export interface UpdateEmailTemplateDTO {
  name?: string;
  description?: string | null;
  subject?: string;
  body?: string;
}

export interface BulkEmailRecipient {
  email: string;
  merge_data?: Record<string, string>;
  status?: BulkEmailRecipientStatus;
  sent_at?: string | null;
  error?: string | null;
}

export type BulkEmailRecipientStatus =
  | "pending"
  | "sent"
  | "failed";

export type BulkEmailStatus =
  | "pending"
  | "sending"
  | "sent"
  | "partial_failure"
  | "cancelled";

export interface BulkEmail {
  id: string;
  template_id: string;
  subject_snapshot: string;
  body_snapshot: string;
  recipients: BulkEmailRecipient[];
  status: BulkEmailStatus;
  field_mapping?: Record<string, string>;
  event_id?: string | null;
  created_by: string;
  created_at: string;
  confirmed_by?: string | null;
  confirmed_at?: string | null;
  cancelled_by?: string | null;
  cancelled_at?: string | null;
}

export interface BulkEmailPreviewItem {
  email: string;
  subject: string;
  body: string;
}

export interface BulkEmailWithPreview {
  bulkEmail: BulkEmail;
  preview: BulkEmailPreviewItem[];
}

export interface CreateBulkEmailDTO {
  template_id: string;
  recipients: BulkEmailRecipient[];
  field_mapping?: Record<string, string>;
  event_id?: string | null;
}

export interface ParsedUploadResponse {
  filename: string;
  columns: string[];
  row_count: number;
  rows: Record<string, string>[];
}
