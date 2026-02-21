import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { EventForm } from "@/types/events";
import { IconFileText, IconX } from "@tabler/icons-react";

interface BasicInformationCardProps {
  register: UseFormRegister<EventForm>;
  errors: FieldErrors<EventForm>;
}

export default function BasicInformationCard({
  register,
  errors,
}: BasicInformationCardProps) {
  return (
    <div className="">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2 text-[25px]">
        Basic Information
      </h2>
      <div className="space-y-5">
        {/* Event Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Event Name <span className="text-[#FF7474]">*</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Event name is required" })}
            className="w-full px-4 py-1 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
            placeholder="Enter event name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
              <IconX size={14} />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Description <span className="text-[#FF7474]">*</span>
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            rows={4}
            className="w-full px-4 py-1 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
            placeholder="Describe your event..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
              <IconX size={14} />
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

