import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { EventForm } from "@/types/events";
import { IconMapPin, IconLink, IconX } from "@tabler/icons-react";

interface LocationLinksCardProps {
  register: UseFormRegister<EventForm>;
  errors: FieldErrors<EventForm>;
}

export default function LocationLinksCard({
  register,
  errors,
}: LocationLinksCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <IconMapPin size={24} className="text-[#7C3AED]" />
        Location & Links
      </h2>
      <div className="space-y-5">
        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <IconMapPin size={18} className="text-gray-500" />
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
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
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <IconLink size={18} className="text-gray-500" />
            URL (Optional)
          </label>
          <input
            type="url"
            {...register("url")}
            placeholder="https://example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
          />
        </div>

        {/* Registration Link */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <IconLink size={18} className="text-gray-500" />
            Registration Link <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            {...register("registration_link", {
              required: "Registration link is required",
            })}
            placeholder="https://example.com/register"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
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

