"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Council } from "@/types/council.interface";
import Link from "next/link";
import Image from "next/image";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import type { ArticleUpsertFormValues } from "./articleUpsertForm";
import {
  articleUpsertInputClass as inputClass,
  articleUpsertSelectTriggerClass as selectTriggerClass,
} from "./articleUpsertForm";

type ArticleUpsertLeftColumnProps = {
  isUpdate: boolean;
  councilsLoading: boolean;
  councilsError: string | null;
  councilOptions: Council[];
  thumbPreview: string | null;
  heroPreview: string | null;
  isSubmitting: boolean;
};

export function ArticleUpsertLeftColumn({
  isUpdate,
  councilsLoading,
  councilsError,
  councilOptions,
  thumbPreview,
  heroPreview,
  isSubmitting,
}: ArticleUpsertLeftColumnProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ArticleUpsertFormValues>();

  const councilIdValue = useWatch({ control, name: "council_id" });

  const {
    fields: authorFields,
    append: appendAuthor,
    remove: removeAuthor,
  } = useFieldArray({ control, name: "authors" });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({ control, name: "tags" });

  const {
    fields: shareLinkFields,
    append: appendShareLink,
    remove: removeShareLink,
  } = useFieldArray({ control, name: "share_links" });

  return (
    <div className="min-w-0 space-y-8">
      <section className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
        <h2 className="border-b border-white/10 pb-3 text-lg font-semibold text-white">
          Article details
        </h2>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className={inputClass}
            placeholder="Article title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Short description <span className="text-red-400">*</span>
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            rows={4}
            className={cn(inputClass, "min-h-[100px] resize-y")}
            placeholder="Summary for listings and SEO"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">
              Slug <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              {...register("slug", { required: "Slug is required" })}
              className={inputClass}
              placeholder="url-friendly-slug"
            />
            {errors.slug && (
              <p className="mt-1 text-sm text-red-400">{errors.slug.message}</p>
            )}
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">
              Council <span className="text-red-400">*</span>
            </label>
            <Controller
              name="council_id"
              control={control}
              rules={{ required: "Please select a council" }}
              render={({ field }) => (
                <Select
                  disabled={councilsLoading || Boolean(councilsError)}
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue
                      placeholder={councilsLoading ? "Loading councils…" : "Select a council"}
                    />
                  </SelectTrigger>
                  <SelectContent className="z-[100] max-h-[min(60vh,320px)] border border-white/15 bg-[#0B161E] text-slate-100">
                    {councilIdValue &&
                      !councilOptions.some((c) => c.id === councilIdValue) && (
                        <SelectItem
                          value={councilIdValue}
                          className="focus:bg-white/10 focus:text-slate-100"
                        >
                          {`Council (${councilIdValue.slice(0, 8)}…)`}
                        </SelectItem>
                      )}
                    {councilOptions.map((c) => (
                      <SelectItem
                        key={c.id}
                        value={c.id}
                        className="focus:bg-white/10 focus:text-slate-100"
                      >
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {councilsError && (
              <p className="mt-1 text-sm text-red-400">{councilsError}</p>
            )}
            {errors.council_id && (
              <p className="mt-1 text-sm text-red-400">{errors.council_id.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">Status</label>
            <input
              type="number"
              {...register("status", { valueAsNumber: true })}
              className={inputClass}
              min={0}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">
              Read time (minutes)
            </label>
            <input
              type="text"
              inputMode="numeric"
              {...register("read_minutes")}
              className={inputClass}
              placeholder="Optional"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
        <div>
          <h2 className="border-b border-white/10 pb-3 text-lg font-semibold text-white">
            Cover images
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Thumbnail is used in listings; hero is optional and can span wider on the article page.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Thumbnail <span className="text-red-400">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("thumbnail")}
                className="w-full text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-black"
              />
              <p className="mt-2 text-xs text-slate-500">
                {isUpdate
                  ? "Leave empty to keep the current image."
                  : "Required for new articles. Shown in cards and lists."}
              </p>
            </div>
            <div
              className={cn(
                "relative w-full overflow-hidden rounded-2xl border border-white/15 bg-black/40",
                "min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]"
              )}
            >
              {thumbPreview ? (
                <Image
                  src={thumbPreview}
                  alt="Thumbnail preview"
                  fill
                  sizes="(max-width: 1280px) 100vw, 520px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-slate-500">
                  <span className="text-sm font-medium">No thumbnail yet</span>
                  <span className="text-xs">Choose an image above</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-10">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Hero image <span className="font-normal text-slate-500">(optional)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("hero_image")}
                className="w-full text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-white/15 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-slate-100"
              />
              <p className="mt-2 text-xs text-slate-500">
                Optional wide image at the top of the public article view.
              </p>
            </div>
            <div
              className={cn(
                "relative w-full overflow-hidden rounded-2xl border border-white/15 bg-black/40",
                "min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]"
              )}
            >
              {heroPreview ? (
                <Image
                  src={heroPreview}
                  alt="Hero preview"
                  fill
                  sizes="(max-width: 1280px) 100vw, 520px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-slate-500">
                  <span className="text-sm font-medium">No hero image</span>
                  <span className="text-xs">Optional — add a wide banner</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-lg font-semibold text-white">Authors</h2>
            <button
              type="button"
              onClick={() => appendAuthor({ value: "" })}
              className="text-sm text-brand hover:underline"
            >
              Add author
            </button>
          </div>
          {authorFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                type="text"
                {...register(`authors.${index}.value` as const)}
                className={inputClass}
                placeholder="Name or ID (as required by API)"
              />
              {authorFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAuthor(index)}
                  className="shrink-0 rounded-lg border border-white/15 px-3 py-2 text-slate-300 hover:bg-white/10"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-lg font-semibold text-white">Tags</h2>
            <button
              type="button"
              onClick={() => appendTag({ value: "" })}
              className="text-sm text-brand hover:underline"
            >
              Add tag
            </button>
          </div>
          {tagFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                type="text"
                {...register(`tags.${index}.value` as const)}
                className={inputClass}
                placeholder="Tag"
              />
              {tagFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="shrink-0 rounded-lg border border-white/15 px-3 py-2 text-slate-300 hover:bg-white/10"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-lg font-semibold text-white">Share links</h2>
          <button
            type="button"
            onClick={() => appendShareLink({ icon: "", url: "" })}
            className="text-sm text-brand hover:underline"
          >
            Add link
          </button>
        </div>
        {shareLinkFields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input
              type="text"
              {...register(`share_links.${index}.icon` as const)}
              className={inputClass}
              placeholder="Icon key or URL"
            />
            <div className="flex gap-2">
              <input
                type="url"
                {...register(`share_links.${index}.url` as const)}
                className={inputClass}
                placeholder="https://"
              />
              {shareLinkFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeShareLink(index)}
                  className="shrink-0 rounded-lg border border-white/15 px-3 py-2 text-slate-300 hover:bg-white/10"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </section>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <Link
          href="/member/article"
          className="flex items-center justify-center rounded-lg border-2 border-brand px-6 py-3 text-center font-medium text-brand hover:bg-brand/10 sm:flex-1"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-brand px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-brand-hover hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:flex-[1.4]"
        >
          {isSubmitting ? "Saving…" : isUpdate ? "Update article" : "Create article"}
        </button>
      </div>
    </div>
  );
}
