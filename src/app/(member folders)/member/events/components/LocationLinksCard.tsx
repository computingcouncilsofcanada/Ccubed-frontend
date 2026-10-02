import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { EventForm } from "@/types/events";
import { IconX } from "@tabler/icons-react";

interface LocationLinksCardProps {
  register: UseFormRegister<EventForm>;
  errors: FieldErrors<EventForm>;
}

export default function LocationLinksCard({
  register,
  errors,
}: LocationLinksCardProps) {
  return (
    <div className="border-b border-white/10 py-6 last:border-b-0">
      <h2 className="text-lg font-semibold text-white mb-5">Location & Links</h2>
      <div className="space-y-5">
        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
            Location <span className="text-[#FF7474]">*</span>
          </label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="w-full px-4 py-1 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
            placeholder="Enter event location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
              <IconX size={14} />
              {errors.location.message}
            </p>
          )}
        </div>

        {/* URL (Optional) */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">

            URL (Optional)
          </label>
          <input
            type="url"
            {...register("url")}
            placeholder="https://example.com"
            className="w-full px-4 py-1 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
          />
        </div>

        {/* Registration Link */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">

            Registration Link <span className="text-[#FF7474]">*</span>
          </label>
          <input
            type="url"
            {...register("registration_link", {
              required: "Registration link is required",
            })}
            placeholder="https://example.com/register"
            className="w-full px-4 py-1 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
          />
          {errors.registration_link && (
            <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
              <IconX size={14} />
              {errors.registration_link.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

