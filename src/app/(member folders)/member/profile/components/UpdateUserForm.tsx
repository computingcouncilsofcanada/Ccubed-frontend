"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, FieldArrayPath } from "react-hook-form";
import { updateMe } from "@/services/useApiUser";
import { UpdateMeRequestDTO } from "@/types/user.interface";
import { getErrMsg } from "@/utils/errorMessage";
import { IconPlus, IconTrash } from "@tabler/icons-react";

export type UpdateUserFormValues = Omit<UpdateMeRequestDTO, "file"> & {
  file?: FileList | null;
};

type UpdateUserFormProps = {
  /** Initial values from /users/me (profile fields if returned) */
  initialData?: Partial<UpdateUserFormValues>;
  onSuccess?: () => void;
};

const defaultValues: UpdateUserFormValues = {
  username: "",
  instagram_url: "",
  twitter_url: "",
  avatar_url: "",
  about_me: "",
  fun_fact: "",
  linkedin_url: "",
  domains: [],
  hobbies: [],
  favorite_song: "",
  journey_at_ccubed: "",
  favorite_quote: "",
  discord_url: "",
  file: null,
};

export default function UpdateUserForm({
  initialData,
  onSuccess,
}: UpdateUserFormProps) {
  const [submitError, setSubmitError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<UpdateUserFormValues>({
    defaultValues: {
      ...defaultValues,
      ...initialData,
      domains: initialData?.domains?.length ? initialData.domains : [],
      hobbies: initialData?.hobbies?.length ? initialData.hobbies : [],
    },
  });

  const watched = watch();
  const hasNoData = (() => {
    const s = (v: unknown) => (typeof v === "string" ? v.trim() : "") === "";
    const strings = [
      watched.username,
      watched.instagram_url,
      watched.twitter_url,
      watched.avatar_url,
      watched.about_me,
      watched.fun_fact,
      watched.linkedin_url,
      watched.favorite_song,
      watched.journey_at_ccubed,
      watched.favorite_quote,
      watched.discord_url,
    ].every(s);
    const arrays =
      (watched.domains ?? []).every((x) => (typeof x === "string" ? x.trim() : "") === "") &&
      (watched.hobbies ?? []).every((x) => (typeof x === "string" ? x.trim() : "") === "");
    const noFile = !watched.file?.length;
    return strings && arrays && noFile;
  })();

  const {
    fields: domainFields,
    append: appendDomain,
    remove: removeDomain,
  } = useFieldArray<UpdateUserFormValues>({ control, name: "domains" as FieldArrayPath<UpdateUserFormValues> });

  const {
    fields: hobbyFields,
    append: appendHobby,
    remove: removeHobby,
    } = useFieldArray<UpdateUserFormValues>({ control, name: "hobbies" as FieldArrayPath<UpdateUserFormValues> });

  const onSubmit = async (data: UpdateUserFormValues) => {
    setSubmitError("");
    setIsSubmitting(true);
    try {
      const payload: UpdateMeRequestDTO = {
        username: data.username ?? "",
        instagram_url: data.instagram_url ?? "",
        twitter_url: data.twitter_url ?? "",
        avatar_url: data.avatar_url ?? "",
        about_me: data.about_me ?? "",
        fun_fact: data.fun_fact ?? "",
        linkedin_url: data.linkedin_url ?? "",
        domains: data.domains ?? [],
        hobbies: data.hobbies ?? [],
        favorite_song: data.favorite_song ?? "",
        journey_at_ccubed: data.journey_at_ccubed ?? "",
        favorite_quote: data.favorite_quote ?? "",
        discord_url: data.discord_url ?? "",
        file: data.file?.[0] ?? null,
      };
      await updateMe(payload);
      onSuccess?.();
    } catch (err: unknown) {
      setSubmitError(getErrMsg(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-600 rounded-lg bg-[#D9D9D9] text-black placeholder-gray-500 focus:border-[#FAA336] focus:ring-1 focus:ring-[#FAA336]";
  const labelClass = "block text-sm font-medium text-gray-400 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {submitError && (
        <div className="bg-red-500/20 border border-red-400/50 text-red-200 px-4 py-3 rounded-lg">
          {submitError}
        </div>
      )}

      {/* Username */}
      <div className="bg-neutral-800/50 rounded-xl border border-white/10 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Account</h2>
        <div>
          <label className={labelClass}>Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className={inputClass}
            placeholder="Your username"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
          )}
        </div>
      </div>

      {/* Social & links */}
      <div className="bg-neutral-800/50 rounded-xl border border-white/10 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Social & links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Instagram URL</label>
            <input
              type="url"
              {...register("instagram_url")}
              className={inputClass}
              placeholder="https://instagram.com/..."
            />
          </div>
          <div>
            <label className={labelClass}>Twitter URL</label>
            <input
              type="url"
              {...register("twitter_url")}
              className={inputClass}
              placeholder="https://twitter.com/..."
            />
          </div>
          <div>
            <label className={labelClass}>LinkedIn URL</label>
            <input
              type="url"
              {...register("linkedin_url")}
              className={inputClass}
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div>
            <label className={labelClass}>Discord URL</label>
            <input
              type="url"
              {...register("discord_url")}
              className={inputClass}
              placeholder="https://discord.com/..."
            />
          </div>
        </div>
      </div>

      {/* About & avatar */}
      <div className="bg-neutral-800/50 rounded-xl border border-white/10 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">About & avatar</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Avatar URL</label>
            <input
              type="url"
              {...register("avatar_url")}
              className={inputClass}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className={labelClass}>Upload new avatar (optional)</label>
            <input
              type="file"
              accept="image/*"
              {...register("file")}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-neutral-800 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#FAA336] file:text-white file:font-medium focus:border-[#FAA336] focus:ring-1 focus:ring-[#FAA336]"
            />
          </div>
          <div>
            <label className={labelClass}>About me</label>
            <textarea
              {...register("about_me")}
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="A short bio..."
            />
          </div>
          <div>
            <label className={labelClass}>Fun fact</label>
            <input
              type="text"
              {...register("fun_fact")}
              className={inputClass}
              placeholder="One fun fact about you"
            />
          </div>
        </div>
      </div>

      {/* Favorites & journey */}
      <div className="bg-neutral-800/50 rounded-xl border border-white/10 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Favorites & journey</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Favorite song</label>
            <input
              type="text"
              {...register("favorite_song")}
              className={inputClass}
              placeholder="Song name or link"
            />
          </div>
          <div>
            <label className={labelClass}>Favorite quote</label>
            <input
              type="text"
              {...register("favorite_quote")}
              className={inputClass}
              placeholder="A quote you like"
            />
          </div>
          <div>
            <label className={labelClass}>Journey at CCubed</label>
            <textarea
              {...register("journey_at_ccubed")}
              rows={2}
              className={`${inputClass} resize-none`}
              placeholder="Your journey so far..."
            />
          </div>
        </div>
      </div>

      {/* Domains */}
      <div className="bg-neutral-800/50 rounded-xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Domains</h2>
          <button
            type="button"
            onClick={() => appendDomain("")}
            className="inline-flex items-center gap-1 text-sm text-[#FAA336] hover:text-[#e8922a] font-medium transition-colors"
          >
            <IconPlus size={16} />
            Add domain
          </button>
        </div>
        <div className="space-y-2">
          {domainFields.map((field, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                {...register(`domains.${index}`)}
                className={`flex-1 ${inputClass}`}
                placeholder="e.g. Cybersecurity"
              />
              <button
                type="button"
                onClick={() => removeDomain(index)}
                className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                aria-label="Remove domain"
              >
                <IconTrash size={18} />
              </button>
            </div>
          ))}
          {domainFields.length === 0 && (
            <p className="text-sm text-gray-500">No domains added yet.</p>
          )}
        </div>
      </div>

      {/* Hobbies */}
      <div className="bg-neutral-800/50 rounded-xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Hobbies</h2>
          <button
            type="button"
            onClick={() => appendHobby("")}
            className="inline-flex items-center gap-1 text-sm text-[#FAA336] hover:text-[#e8922a] font-medium transition-colors"
          >
            <IconPlus size={16} />
            Add hobby
          </button>
        </div>
        <div className="space-y-2">
          {hobbyFields.map((field, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                {...register(`hobbies.${index}`)}
                className={`flex-1 ${inputClass}`}
                placeholder="e.g. Reading"
              />
              <button
                type="button"
                onClick={() => removeHobby(index)}
                className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                aria-label="Remove hobby"
              >
                <IconTrash size={18} />
              </button>
            </div>
          ))}
          {hobbyFields.length === 0 && (
            <p className="text-sm text-gray-500">No hobbies added yet.</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => reset(initialData ? { ...defaultValues, ...initialData, domains: initialData.domains ?? [], hobbies: initialData.hobbies ?? [] } : defaultValues)}
          className="px-6 py-2.5 border border-[#FAA336] text-[#FAA336] rounded-lg hover:bg-[#FAA336]/10 font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={hasNoData || isSubmitting}
          className="px-6 py-2.5 bg-[#FAA336] text-white rounded-lg hover:bg-[#e8922a] font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Saving..." : "Save profile"}
        </button>
      </div>
    </form>
  );
}
