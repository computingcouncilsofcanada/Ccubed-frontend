"use client";

import { useUser } from "@/context/UserContext";
import { useApiEmailTemplate } from "@/services/useApiEmailTemplate";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import {
  CreateEmailTemplateDTO,
  EmailTemplate,
} from "@/types/email.interface";
import { getErrMsg } from "@/utils/errorMessage";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArticleRichTextEditor } from "../../../articles/upsert/ArticleRichTextEditor";

const PLACEHOLDER_REGEX = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;

function extractPlaceholders(...sources: string[]): string[] {
  const found = new Set<string>();
  for (const source of sources) {
    if (!source) continue;
    const matches = source.matchAll(PLACEHOLDER_REGEX);
    for (const match of matches) {
      found.add(match[1]);
    }
  }
  return Array.from(found);
}

const EVENT_PLACEHOLDER_HINTS = [
  "event_name",
  "event_date",
  "event_location",
  "event_description",
  "event_registration_link",
];

export default function EmailTemplateUpsertContent() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    getEmailTemplate,
    createEmailTemplate,
    updateEmailTemplate,
  } = useApiEmailTemplate();

  const modeParam = searchParams.get("mode");
  const templateId = searchParams.get("id");
  const mode = modeParam === "update" ? "update" : "create";
  const isUpdate = mode === "update" && Boolean(templateId);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [editorKey, setEditorKey] = useState(0);

  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const detectedPlaceholders = useMemo(
    () => extractPlaceholders(subject, body),
    [subject, body],
  );

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  const applyTemplateToForm = useCallback((template: EmailTemplate) => {
    setName(template.name);
    setDescription(template.description ?? "");
    setSubject(template.subject);
    setBody(template.body);
    setEditorKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!isUpdate || !templateId) return;
    let cancelled = false;
    setIsLoadingTemplate(true);
    setLoadError(null);
    (async () => {
      try {
        const response = await getEmailTemplate(templateId);
        if (cancelled) return;
        applyTemplateToForm(response.data as EmailTemplate);
      } catch (e: unknown) {
        if (!cancelled) setLoadError(getErrMsg(e));
      } finally {
        if (!cancelled) setIsLoadingTemplate(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isUpdate, templateId, getEmailTemplate, applyTemplateToForm]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedSubject = subject.trim();
    const bodyText = body.replace(/<[^>]+>/g, "").trim();

    if (!trimmedName) {
      alert("Template name is required.");
      return;
    }
    if (!trimmedSubject) {
      alert("Subject is required.");
      return;
    }
    if (!bodyText) {
      alert("Body cannot be empty.");
      return;
    }

    const dto: CreateEmailTemplateDTO = {
      name: trimmedName,
      description: description.trim() || null,
      subject: trimmedSubject,
      body,
    };

    setIsSubmitting(true);
    try {
      if (isUpdate && templateId) {
        await updateEmailTemplate(templateId, dto);
        alert("Template updated.");
      } else {
        await createEmailTemplate(dto);
        alert("Template created.");
        router.push("/member/email/templates");
      }
    } catch (err: unknown) {
      alert(getErrMsg(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  const heading = isUpdate ? "Edit email template" : "Create email template";
  const subtitle = isUpdate
    ? "Update template name, subject, and body."
    : "Compose a reusable template with merge fields like {{name}}.";

  if (isUpdate && templateId && loadError) {
    return (
      <div className="relative -mt-30 min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] pt-30">
        <BgBoxMainPage maxHeight={400} enableGlow />
        <div className="relative z-10 mx-auto max-w-3xl p-6 text-slate-200">
          <p className="mb-4 text-red-400">{loadError}</p>
          <Link
            href="/member/email/templates"
            className="text-[#FAA336] hover:underline"
          >
            Back to templates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative -mt-30 min-h-screen w-full overflow-x-hidden overflow-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] pt-30">
      <BgBoxMainPage maxHeight={400} enableGlow />

      <div className="relative z-10 mx-auto max-w-[min(100%,90rem)] p-4 sm:p-6">
        <div className="mb-8">
          <Link
            href="/member/email/templates"
            className="group mb-4 inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-[#FAA336]"
          >
            <IconArrowLeft
              size={20}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span className="font-medium">Back to Email templates</span>
          </Link>
          <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">
            {heading}
          </h1>
          <p className="text-lg text-slate-300">{subtitle}</p>
        </div>

        {isUpdate && isLoadingTemplate ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-slate-300">
            Loading template…
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] xl:items-stretch xl:gap-10"
          >
            <aside className="flex flex-col gap-6">
              <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h2 className="border-b border-white/10 pb-3 text-lg font-semibold text-white">
                  Template details
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-200">
                      Name <span className="text-red-400">*</span>
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Event reminder (24h before)"
                      className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white placeholder:text-slate-500 focus:border-[#FAA336] focus:outline-none"
                      disabled={isSubmitting}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-200">
                      Description
                    </span>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Optional notes about when to use this template"
                      rows={2}
                      className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white placeholder:text-slate-500 focus:border-[#FAA336] focus:outline-none"
                      disabled={isSubmitting}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-200">
                      Subject <span className="text-red-400">*</span>
                    </span>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Reminder: {{event_name}} tomorrow"
                      className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white placeholder:text-slate-500 focus:border-[#FAA336] focus:outline-none"
                      disabled={isSubmitting}
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h2 className="border-b border-white/10 pb-3 text-lg font-semibold text-white">
                  Merge fields
                </h2>
                <p className="mt-3 text-sm text-slate-400">
                  Use{" "}
                  <code className="rounded bg-black/40 px-1.5 py-0.5 text-[#FAA336]">
                    {"{{field_name}}"}
                  </code>{" "}
                  anywhere in subject or body. They get filled per-recipient when you send.
                </p>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Detected in this template
                  </p>
                  {detectedPlaceholders.length === 0 ? (
                    <p className="mt-2 text-sm text-slate-500">
                      No merge fields detected yet.
                    </p>
                  ) : (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {detectedPlaceholders.map((p) => (
                        <span
                          key={p}
                          className="rounded-full bg-[#FAA336]/15 px-2.5 py-1 font-mono text-xs text-[#FAA336]"
                        >
                          {`{{${p}}}`}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Auto-filled if you link an event
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {EVENT_PLACEHOLDER_HINTS.map((p) => (
                      <span
                        key={p}
                        className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-xs text-slate-300"
                      >
                        {`{{${p}}}`}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ backgroundColor: "#FAA336" }}
                className="inline-flex w-full items-center justify-center rounded-xl px-6 py-3 font-semibold text-black shadow-lg transition-all hover:opacity-90 disabled:opacity-60"
              >
                {isSubmitting
                  ? "Saving…"
                  : isUpdate
                    ? "Save changes"
                    : "Create template"}
              </button>
            </aside>

            <section className="flex h-full min-h-[min(52vh,480px)] flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
              <h2 className="shrink-0 border-b border-white/10 pb-3 text-lg font-semibold text-white">
                Email body <span className="text-red-400">*</span>
              </h2>
              <p className="mt-3 shrink-0 text-sm text-slate-400">
                Rich text with formatting, links, and merge fields.
              </p>
              <div className="mt-4 flex min-h-0 flex-1 flex-col">
                <ArticleRichTextEditor
                  editorKey={editorKey}
                  value={body}
                  onChange={setBody}
                  placeholder="Write the email body… use {{name}} or {{event_name}} for personalization"
                  disabled={isSubmitting}
                  className="min-h-0 flex-1"
                />
              </div>
            </section>
          </form>
        )}
      </div>
    </div>
  );
}
