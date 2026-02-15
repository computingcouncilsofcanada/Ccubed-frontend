"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { updateMe } from "@/services/useApiUser";
import { UpdateMeRequest } from "@/types/user.interface";
import { getErrMsg } from "@/utils/errorMessage";
import { IconPlus, IconTrash } from "@tabler/icons-react";

export type UpdateUserFormValues = Omit<UpdateMeRequest, "file"> & {
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
  } = useFieldArray({ control, name: "domains" });

  const {
    fields: hobbyFields,
    append: appendHobby,
    remove: removeHobby,
  } = useFieldArray({ control, name: "hobbies" });

  const onSubmit = async (data: UpdateUserFormValues) => {
    setSubmitError("");
    setIsSubmitting(true);
    try {
      const payload: UpdateMeRequest = {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {submitError}
        </div>
      )}

      {/* Username */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Account</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="Your username"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>
      </div>

      {/* Social & links */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Social & links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
            <input
              type="url"
              {...register("instagram_url")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="https://instagram.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
            <input
              type="url"
              {...register("twitter_url")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="https://twitter.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
            <input
              type="url"
              {...register("linkedin_url")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discord URL</label>
            <input
              type="url"
              {...register("discord_url")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="https://discord.com/..."
            />
          </div>
        </div>
      </div>

      {/* About & avatar */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">About & avatar</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
            <input
              type="url"
              {...register("avatar_url")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload new avatar (optional)</label>
            <input
              type="file"
              accept="image/*"
              {...register("file")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About me</label>
            <textarea
              {...register("about_me")}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-none"
              placeholder="A short bio..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fun fact</label>
            <input
              type="text"
              {...register("fun_fact")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="One fun fact about you"
            />
          </div>
        </div>
      </div>

      {/* Favorites & journey */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Favorites & journey</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Favorite song</label>
            <input
              type="text"
              {...register("favorite_song")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="Song name or link"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Favorite quote</label>
            <input
              type="text"
              {...register("favorite_quote")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="A quote you like"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Journey at CCubed</label>
            <textarea
              {...register("journey_at_ccubed")}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-none"
              placeholder="Your journey so far..."
            />
          </div>
        </div>
      </div>

      {/* Domains */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Domains</h2>
          <button
            type="button"
            onClick={() => appendDomain("")}
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <IconPlus size={16} />
            Add domain
          </button>
        </div>
        <div className="space-y-2">
          {domainFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                type="text"
                {...register(`domains.${index}`)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="e.g. Cybersecurity"
              />
              <button
                type="button"
                onClick={() => removeDomain(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Hobbies</h2>
          <button
            type="button"
            onClick={() => appendHobby("")}
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <IconPlus size={16} />
            Add hobby
          </button>
        </div>
        <div className="space-y-2">
          {hobbyFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                type="text"
                {...register(`hobbies.${index}`)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="e.g. Reading"
              />
              <button
                type="button"
                onClick={() => removeHobby(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
          type="submit"
          disabled={hasNoData || isSubmitting}
          className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Saving..." : "Save profile"}
        </button>
      </div>
    </form>
  );
}
