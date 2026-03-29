"use client";

import { Controller, useFormContext } from "react-hook-form";
import { ArticleRichTextEditor } from "./ArticleRichTextEditor";
import type { ArticleUpsertFormValues } from "./articleUpsertForm";

type ArticleUpsertRightColumnProps = {
  editorKey: number | string;
  isSubmitting: boolean;
};

export function ArticleUpsertRightColumn({
  editorKey,
  isSubmitting,
}: ArticleUpsertRightColumnProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<ArticleUpsertFormValues>();

  return (
    <aside className="flex min-h-0 min-w-0 flex-col">
      <section className="flex h-full min-h-[min(52vh,480px)] flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
        <h2 className="shrink-0 border-b border-white/10 pb-3 text-lg font-semibold text-white">
          Article content <span className="text-red-400">*</span>
        </h2>
        <p className="mt-3 shrink-0 text-sm text-slate-400">
          Headings, lists, links, and basic formatting — this is what readers see as the body.
        </p>
        <div className="mt-4 flex min-h-0 flex-1 flex-col">
          <Controller
            name="content"
            control={control}
            rules={{
              validate: (v) =>
                (v && v.replace(/<[^>]+>/g, "").trim().length > 0) ||
                "Article content is required",
            }}
            render={({ field }) => (
              <ArticleRichTextEditor
                editorKey={editorKey}
                value={field.value}
                onChange={field.onChange}
                disabled={isSubmitting}
                className="min-h-0 flex-1"
              />
            )}
          />
        </div>
        {errors.content && (
          <p className="mt-2 shrink-0 text-sm text-red-400">{errors.content.message}</p>
        )}
      </section>
    </aside>
  );
}
