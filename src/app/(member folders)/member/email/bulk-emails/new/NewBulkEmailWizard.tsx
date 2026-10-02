"use client";

import { useUser } from "@/context/UserContext";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import { getErrMsg } from "@/utils/errorMessage";
import { IconArrowLeft, IconUpload, IconTable } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getEmailTemplates } from "@/services/useApiEmailTemplate";
import {
  parseUpload,
  parseSheet,
  createBulkEmail,
} from "@/services/useApiBulkEmail";
import { getAllEvents, getEventById } from "@/services/useApiAuth";
import {
  BulkEmailSource,
  CreateBulkEmailDTO,
  EmailTemplate,
  ParsedUploadResponse,
} from "@/types/email.interface";

interface MinimalEvent {
  id: string;
  name: string;
}

const EVENT_DERIVED_PLACEHOLDERS = new Set([
  "event_name",
  "event_date",
  "event_location",
  "event_description",
  "event_registration_link",
]);

type Step = 1 | 2 | 3 | 4;

const STEP_LABELS: Record<Step, string> = {
  1: "Pick template",
  2: "Upload list",
  3: "Map fields",
  4: "Review",
};

function renderPreview(source: string, values: Record<string, string>): string {
  return source.replace(
    /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g,
    (_, key: string) => values[key] ?? "",
  );
}

export default function NewBulkEmailWizard() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const [step, setStep] = useState<Step>(1);

  // step 1
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [templatesError, setTemplatesError] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

  // step 2
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [parsedFile, setParsedFile] = useState<ParsedUploadResponse | null>(
    null,
  );
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [sourceMode, setSourceMode] = useState<BulkEmailSource>("upload");
  const [sheetUrl, setSheetUrl] = useState("");
  const [sheetRange, setSheetRange] = useState("");
  const [sourceMeta, setSourceMeta] = useState<Record<string, string>>({});

  // step 3
  const [emailColumn, setEmailColumn] = useState<string>("");
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [events, setEvents] = useState<MinimalEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventId, setEventId] = useState<string>("");
  const [eventPlaceholders, setEventPlaceholders] = useState<
    Record<string, string>
  >({});

  // step 4 / submission
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const selectedTemplate = useMemo(
    () => templates.find((t) => t.id === selectedTemplateId) ?? null,
    [templates, selectedTemplateId],
  );

  const recipientPlaceholders = useMemo(() => {
    if (!selectedTemplate) return [] as string[];
    return (selectedTemplate.placeholders ?? []).filter(
      (p) => !EVENT_DERIVED_PLACEHOLDERS.has(p),
    );
  }, [selectedTemplate]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    let cancelled = false;
    setTemplatesLoading(true);
    setTemplatesError(null);
    (async () => {
      try {
        const response = await getEmailTemplates(100, 0);
        if (cancelled) return;
        setTemplates(response.data.templates);
      } catch (e: unknown) {
        if (!cancelled) setTemplatesError(getErrMsg(e));
      } finally {
        if (!cancelled) setTemplatesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (step !== 3 || events.length > 0) return;
    let cancelled = false;
    setEventsLoading(true);
    (async () => {
      try {
        const response = await getAllEvents(100, 0);
        if (cancelled) return;
        const list = (response?.data ?? []) as {
          id?: string;
          _id?: string;
          name: string;
        }[];
        setEvents(
          list.map((e) => ({
            id: e.id ?? e._id ?? "",
            name: e.name,
          })),
        );
      } catch {
        // events are optional; ignore
      } finally {
        if (!cancelled) setEventsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [step, events.length]);

  const applyParsedData = useCallback(
    (data: ParsedUploadResponse) => {
      setParsedFile(data);
      // Auto-detect email column
      const emailLike =
        data.columns.find((c) => c.toLowerCase() === "email") ??
        data.columns.find((c) => c.toLowerCase().includes("email")) ??
        "";
      setEmailColumn(emailLike);

      // Auto-map placeholders that exactly match column names (case-insensitive)
      const autoMap: Record<string, string> = {};
      for (const p of recipientPlaceholders) {
        const match = data.columns.find(
          (c) => c.toLowerCase() === p.toLowerCase(),
        );
        if (match) autoMap[p] = match;
      }
      setMapping(autoMap);
    },
    [recipientPlaceholders],
  );

  const onUploadFile = useCallback(
    async (file: File) => {
      setUploading(true);
      setUploadError(null);
      setParsedFile(null);
      try {
        const response = await parseUpload(file);
        const data = response.data as ParsedUploadResponse;
        applyParsedData(data);
        setSourceMeta({ filename: data.filename });
      } catch (e: unknown) {
        setUploadError(getErrMsg(e));
      } finally {
        setUploading(false);
      }
    },
    [applyParsedData],
  );

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUploadFile(file);
  };

  const onParseSheet = useCallback(async () => {
    if (!sheetUrl.trim()) {
      setUploadError("Paste a Google Sheets URL or ID.");
      return;
    }
    setUploading(true);
    setUploadError(null);
    setParsedFile(null);
    try {
      const response = await parseSheet(
        sheetUrl.trim(),
        sheetRange.trim() || undefined,
      );
      const data = response.data as ParsedUploadResponse;
      applyParsedData(data);
      // filename from backend is "<sheetId>!<resolved-range>"; split on first "!"
      const idx = data.filename.indexOf("!");
      const sheetId = idx >= 0 ? data.filename.slice(0, idx) : data.filename;
      const resolvedRange = idx >= 0 ? data.filename.slice(idx + 1) : "";
      setSourceMeta({ sheet_id: sheetId, range: resolvedRange });
    } catch (e: unknown) {
      setUploadError(getErrMsg(e));
    } finally {
      setUploading(false);
    }
  }, [sheetUrl, sheetRange, applyParsedData]);

  const onSourceModeChange = (mode: BulkEmailSource) => {
    if (mode === sourceMode) return;
    setSourceMode(mode);
    setParsedFile(null);
    setUploadError(null);
    setSourceMeta({});
    setEmailColumn("");
    setMapping({});
  };

  useEffect(() => {
    if (!eventId) {
      setEventPlaceholders({});
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const response = await getEventById(eventId);
        if (cancelled) return;
        const event = (response?.data ?? response) as {
          name?: string;
          description?: string;
          location?: string;
          registration_link?: string;
          start_at?: string | number;
        } | null;
        if (!event) {
          setEventPlaceholders({});
          return;
        }
        const startRaw = event.start_at;
        let formattedDate = "";
        if (startRaw) {
          const ts = Number(startRaw);
          if (Number.isFinite(ts) && !Number.isNaN(new Date(ts).getTime())) {
            formattedDate = new Date(ts).toLocaleString();
          } else {
            formattedDate = String(startRaw);
          }
        }
        setEventPlaceholders({
          event_name: event.name ?? "",
          event_description: event.description ?? "",
          event_location: event.location ?? "",
          event_date: formattedDate,
          event_registration_link: event.registration_link ?? "",
        });
      } catch {
        if (!cancelled) setEventPlaceholders({});
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [eventId]);

  const recipientPreview = useMemo(() => {
    if (!parsedFile || !emailColumn || !selectedTemplate) return [];
    return parsedFile.rows.slice(0, 2).map((row) => {
      const values: Record<string, string> = { ...eventPlaceholders };
      for (const [placeholder, column] of Object.entries(mapping)) {
        values[placeholder] = row[column] ?? "";
      }
      return {
        email: row[emailColumn] ?? "(no email)",
        subject: renderPreview(selectedTemplate.subject, values),
        body: renderPreview(selectedTemplate.body, values),
      };
    });
  }, [parsedFile, emailColumn, selectedTemplate, mapping, eventPlaceholders]);

  const unmappedPlaceholders = useMemo(() => {
    if (!selectedTemplate) return [];
    return (selectedTemplate.placeholders ?? []).filter((p) => {
      if (EVENT_DERIVED_PLACEHOLDERS.has(p)) return false;
      return !mapping[p];
    });
  }, [selectedTemplate, mapping]);

  const canAdvanceFromStep = (s: Step): string | null => {
    if (s === 1 && !selectedTemplateId) return "Pick a template to continue.";
    if (s === 2 && !parsedFile) {
      return sourceMode === "upload"
        ? "Upload a CSV or XLSX file."
        : "Parse a Google Sheet first.";
    }
    if (s === 3) {
      if (!emailColumn) return "Pick which column holds the email address.";
    }
    return null;
  };

  const next = () => {
    const err = canAdvanceFromStep(step);
    if (err) {
      alert(err);
      return;
    }
    setStep((s) => Math.min(4, s + 1) as Step);
  };
  const back = () => setStep((s) => Math.max(1, s - 1) as Step);

  const onSubmit = async () => {
    if (!selectedTemplate || !parsedFile || !emailColumn) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const recipients = parsedFile.rows
        .map((row) => ({
          email: (row[emailColumn] ?? "").trim(),
          merge_data: row,
        }))
        .filter((r) => r.email.length > 0);

      if (recipients.length === 0) {
        throw new Error(
          "No rows have a value in the email column. Pick a different column or upload a different file.",
        );
      }

      const dto: CreateBulkEmailDTO = {
        template_id: selectedTemplate.id,
        recipients,
        field_mapping: mapping,
        event_id: eventId || null,
        source: sourceMode,
        source_meta: sourceMeta,
      };

      const response = await createBulkEmail(dto);
      const created = response.data;
      router.push(`/member/email/bulk-emails/${created.id}`);
    } catch (e: unknown) {
      setSubmitError(getErrMsg(e));
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="relative -mt-30 min-h-screen w-full overflow-x-hidden overflow-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] pt-30">
      <BgBoxMainPage maxHeight={400} enableGlow />

      <div className="relative z-10 mx-auto max-w-[min(100%,72rem)] p-4 sm:p-6">
        <div className="mb-8">
          <Link
            href="/member/email/bulk-emails"
            className="group mb-4 inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-brand"
          >
            <IconArrowLeft
              size={20}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span className="font-medium">Back to bulk emails</span>
          </Link>
          <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">
            New bulk email
          </h1>
          <p className="text-lg text-slate-300">
            Pick a template, upload your registrant list, map merge fields, and
            save as pending.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-2 text-sm">
          {([1, 2, 3, 4] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
                  s === step
                    ? "border-brand bg-brand text-black"
                    : s < step
                      ? "border-brand/60 bg-brand/20 text-brand"
                      : "border-white/20 bg-white/5 text-slate-400"
                }`}
              >
                {s}
              </div>
              <span
                className={
                  s === step ? "font-semibold text-white" : "text-slate-400"
                }
              >
                {STEP_LABELS[s]}
              </span>
              {i < 3 && <div className="mx-2 h-px w-8 bg-white/10" />}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
          {step === 1 && (
            <Step1Pick
              templates={templates}
              loading={templatesLoading}
              error={templatesError}
              selectedId={selectedTemplateId}
              onSelect={setSelectedTemplateId}
            />
          )}
          {step === 2 && (
            <Step2Upload
              parsed={parsedFile}
              error={uploadError}
              uploading={uploading}
              fileInputRef={fileInputRef}
              onFileChange={onFileInputChange}
              sourceMode={sourceMode}
              onSourceModeChange={onSourceModeChange}
              sheetUrl={sheetUrl}
              onSheetUrlChange={setSheetUrl}
              sheetRange={sheetRange}
              onSheetRangeChange={setSheetRange}
              onParseSheet={onParseSheet}
            />
          )}
          {step === 3 && parsedFile && (
            <Step3Map
              parsed={parsedFile}
              emailColumn={emailColumn}
              onEmailColumnChange={setEmailColumn}
              placeholders={recipientPlaceholders}
              mapping={mapping}
              onMappingChange={setMapping}
              events={events}
              eventsLoading={eventsLoading}
              eventId={eventId}
              onEventIdChange={setEventId}
              templatePlaceholdersFull={selectedTemplate?.placeholders ?? []}
            />
          )}
          {step === 4 && selectedTemplate && parsedFile && (
            <Step4Review
              templateName={selectedTemplate.name}
              recipientCount={
                parsedFile.rows.filter(
                  (r) => (r[emailColumn] ?? "").trim() !== "",
                ).length
              }
              totalRows={parsedFile.row_count}
              emailColumn={emailColumn}
              unmappedPlaceholders={unmappedPlaceholders}
              preview={recipientPreview}
              submitError={submitError}
            />
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 1 || submitting}
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 disabled:opacity-40"
          >
            Back
          </button>
          {step < 4 ? (
            <button
              type="button"
              onClick={next}
              className="rounded-xl px-6 py-2.5 text-sm font-semibold text-black shadow-lg hover:opacity-90 bg-brand"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={submitting}
              className="rounded-xl px-6 py-2.5 text-sm font-semibold text-black shadow-lg hover:opacity-90 disabled:opacity-60 bg-brand"
            >
              {submitting ? "Saving…" : "Save as pending bulk email"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Step1Pick({
  templates,
  loading,
  error,
  selectedId,
  onSelect,
}: {
  templates: EmailTemplate[];
  loading: boolean;
  error: string | null;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  if (loading) {
    return <p className="text-slate-300">Loading templates…</p>;
  }
  if (error) {
    return <p className="text-red-300">{error}</p>;
  }
  if (templates.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-black/20 p-6 text-center">
        <p className="text-slate-300 mb-3">
          You don&apos;t have any templates yet.
        </p>
        <Link
          href="/member/email/templates/upsert?mode=create"
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-black bg-brand"
        >
          Create your first template
        </Link>
      </div>
    );
  }
  const selected = templates.find((t) => t.id === selectedId);
  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-200">Template</span>
        <select
          value={selectedId}
          onChange={(e) => onSelect(e.target.value)}
          className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white focus:border-brand focus:outline-none"
        >
          <option value="">— pick a template —</option>
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </label>
      {selected && (
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Subject
          </p>
          <p className="mt-1 text-slate-100">{selected.subject}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Merge fields detected
          </p>
          {selected.placeholders?.length ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {selected.placeholders.map((p) => (
                <span
                  key={p}
                  className="rounded-full bg-brand/15 px-2.5 py-1 font-mono text-xs text-brand"
                >
                  {`{{${p}}}`}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-500">None</p>
          )}
        </div>
      )}
    </div>
  );
}

function Step2Upload({
  parsed,
  error,
  uploading,
  fileInputRef,
  onFileChange,
  sourceMode,
  onSourceModeChange,
  sheetUrl,
  onSheetUrlChange,
  sheetRange,
  onSheetRangeChange,
  onParseSheet,
}: {
  parsed: ParsedUploadResponse | null;
  error: string | null;
  uploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sourceMode: BulkEmailSource;
  onSourceModeChange: (mode: BulkEmailSource) => void;
  sheetUrl: string;
  onSheetUrlChange: (v: string) => void;
  sheetRange: string;
  onSheetRangeChange: (v: string) => void;
  onParseSheet: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex self-start rounded-xl border border-white/10 bg-black/30 p-1">
        <SourceModeTab
          active={sourceMode === "upload"}
          onClick={() => onSourceModeChange("upload")}
          icon={<IconUpload size={16} />}
          label="Upload file"
        />
        <SourceModeTab
          active={sourceMode === "sheets"}
          onClick={() => onSourceModeChange("sheets")}
          icon={<IconTable size={16} />}
          label="Google Sheets"
        />
      </div>

      {sourceMode === "upload" ? (
        <div className="rounded-xl border-2 border-dashed border-white/15 bg-black/20 p-8 text-center">
          <IconUpload size={40} className="mx-auto mb-3 text-slate-400" />
          <p className="text-slate-200 mb-3">
            Upload a CSV or XLSX exported from your Google Sheet
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={onFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-60 bg-brand"
          >
            {uploading ? "Parsing…" : parsed ? "Replace file" : "Choose file"}
          </button>
          {parsed && !uploading && (
            <p className="mt-3 text-xs text-slate-400">
              {parsed.filename} — {parsed.row_count} rows,{" "}
              {parsed.columns.length} columns
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-white/15 bg-black/20 p-6">
          <p className="mb-4 text-xs text-slate-400">
            Share the sheet with your service-account email as Viewer before
            parsing. The first row must be the header.
          </p>
          <label className="flex flex-col gap-1.5 mb-3">
            <span className="text-sm font-medium text-slate-200">
              Sheet URL or ID
            </span>
            <input
              type="text"
              value={sheetUrl}
              onChange={(e) => onSheetUrlChange(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/.../edit"
              className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5 mb-4">
            <span className="text-sm font-medium text-slate-200">
              Range{" "}
              <span className="text-slate-400 font-normal">(optional)</span>
            </span>
            <input
              type="text"
              value={sheetRange}
              onChange={(e) => onSheetRangeChange(e.target.value)}
              placeholder="Leave blank to use first tab"
              className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
            />
          </label>
          <button
            type="button"
            onClick={onParseSheet}
            disabled={uploading}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-60 bg-brand"
          >
            {uploading ? "Parsing…" : parsed ? "Re-parse sheet" : "Parse sheet"}
          </button>
          {parsed && !uploading && (
            <p className="mt-3 text-xs text-slate-400">
              {parsed.row_count} rows, {parsed.columns.length} columns
            </p>
          )}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}
      {parsed && (
        <div className="rounded-xl border border-white/10 bg-black/20 p-4 overflow-x-auto">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            First few rows
          </p>
          <table className="min-w-full text-sm">
            <thead className="text-slate-300">
              <tr>
                {parsed.columns.map((c) => (
                  <th
                    key={c}
                    className="border-b border-white/10 px-3 py-2 text-left font-semibold"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-slate-200">
              {parsed.rows.slice(0, 3).map((row, i) => (
                <tr key={i}>
                  {parsed.columns.map((c) => (
                    <td key={c} className="border-b border-white/5 px-3 py-2">
                      {row[c] ?? ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function SourceModeTab({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
        active ? "bg-brand text-black" : "text-slate-300 hover:bg-white/5"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Step3Map({
  parsed,
  emailColumn,
  onEmailColumnChange,
  placeholders,
  mapping,
  onMappingChange,
  events,
  eventsLoading,
  eventId,
  onEventIdChange,
  templatePlaceholdersFull,
}: {
  parsed: ParsedUploadResponse;
  emailColumn: string;
  onEmailColumnChange: (v: string) => void;
  placeholders: string[];
  mapping: Record<string, string>;
  onMappingChange: (m: Record<string, string>) => void;
  events: MinimalEvent[];
  eventsLoading: boolean;
  eventId: string;
  onEventIdChange: (v: string) => void;
  templatePlaceholdersFull: string[];
}) {
  const eventPlaceholdersUsed = templatePlaceholdersFull.filter((p) =>
    EVENT_DERIVED_PLACEHOLDERS.has(p),
  );

  return (
    <div className="flex flex-col gap-6">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-slate-200">
          Email column <span className="text-red-400">*</span>
        </span>
        <select
          value={emailColumn}
          onChange={(e) => onEmailColumnChange(e.target.value)}
          className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white focus:border-brand focus:outline-none"
        >
          <option value="">— pick the column holding recipient emails —</option>
          {parsed.columns.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      {placeholders.length > 0 && (
        <div>
          <p className="text-sm font-medium text-slate-200 mb-2">
            Map merge fields to sheet columns
          </p>
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {placeholders.map((p) => (
                <label key={p} className="flex flex-col gap-1.5">
                  <span className="font-mono text-xs text-brand">
                    {`{{${p}}}`}
                  </span>
                  <select
                    value={mapping[p] ?? ""}
                    onChange={(e) =>
                      onMappingChange({
                        ...mapping,
                        [p]: e.target.value,
                      })
                    }
                    className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 text-sm text-white focus:border-brand focus:outline-none"
                  >
                    <option value="">— skip —</option>
                    {parsed.columns.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {eventPlaceholdersUsed.length > 0 && (
        <div>
          <p className="text-sm font-medium text-slate-200 mb-2">
            Link an event (fills{" "}
            {eventPlaceholdersUsed.map((p) => `{{${p}}}`).join(", ")})
          </p>
          <select
            value={eventId}
            onChange={(e) => onEventIdChange(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white focus:border-brand focus:outline-none"
            disabled={eventsLoading}
          >
            <option value="">
              — {eventsLoading ? "loading events…" : "no event"} —
            </option>
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

function Step4Review({
  templateName,
  recipientCount,
  totalRows,
  emailColumn,
  unmappedPlaceholders,
  preview,
  submitError,
}: {
  templateName: string;
  recipientCount: number;
  totalRows: number;
  emailColumn: string;
  unmappedPlaceholders: string[];
  preview: { email: string; subject: string; body: string }[];
  submitError: string | null;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SummaryCell label="Template" value={templateName} />
        <SummaryCell label="Email column" value={emailColumn} />
        <SummaryCell
          label="Recipients"
          value={`${recipientCount} of ${totalRows} rows have an email`}
        />
        <SummaryCell
          label="Unmapped merge fields"
          value={
            unmappedPlaceholders.length === 0
              ? "All mapped or event-derived"
              : unmappedPlaceholders.map((p) => `{{${p}}}`).join(", ")
          }
        />
      </div>

      {unmappedPlaceholders.length > 0 && (
        <div className="rounded-xl border border-amber-500/40 bg-amber-950/30 px-4 py-3 text-sm text-amber-200">
          Unmapped fields will be rendered as empty text in the email. Go back
          to map them, or proceed if intended.
        </div>
      )}

      <div>
        <p className="text-sm font-medium text-slate-200 mb-2">
          Preview ({preview.length} sample{preview.length === 1 ? "" : "s"})
        </p>
        <div className="flex flex-col gap-3">
          {preview.map((p, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-black/20 p-4"
            >
              <p className="text-xs text-slate-400">To: {p.email}</p>
              <p className="mt-1 font-semibold text-white">{p.subject}</p>
              <div
                className="mt-3 text-sm text-slate-200 [&_a]:text-brand [&_a]:underline [&_h2]:text-lg [&_h2]:font-bold [&_h3]:text-base [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                dangerouslySetInnerHTML={{ __html: p.body }}
              />
            </div>
          ))}
        </div>
      </div>

      {submitError && (
        <div className="rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {submitError}
        </div>
      )}

      <p className="text-xs text-slate-400">
        Saving creates a pending bulk email. No emails are sent until you
        confirm it on the review screen.
      </p>
    </div>
  );
}

function SummaryCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm text-slate-100">{value}</p>
    </div>
  );
}
