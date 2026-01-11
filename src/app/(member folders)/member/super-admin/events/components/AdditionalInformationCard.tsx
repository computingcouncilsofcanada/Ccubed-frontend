import React from "react";
import { UseFormRegister } from "react-hook-form";
import { EventForm } from "@/types/events";
import { IconTag, IconChecklist, IconUpload, IconX } from "@tabler/icons-react";
import { typeOptions } from "../create/constants";

interface AdditionalInformationCardProps {
  register: UseFormRegister<EventForm>;
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function AdditionalInformationCard({
  register,
  selectedTypes,
  setSelectedTypes,
}: AdditionalInformationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <IconTag size={24} className="text-[#7C3AED]" />
        Additional Information
      </h2>
      <div className="space-y-5">
        {/* Event Types */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Event Types <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4">
            {typeOptions.map((type) => (
              <label
                key={type}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedTypes.includes(type)
                    ? "border-[#7C3AED] bg-purple-50 text-[#7C3AED]"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                <input
                  type="checkbox"
                  value={type}
                  checked={selectedTypes.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTypes((prev) => [...prev, type]);
                    } else {
                      setSelectedTypes((prev) => prev.filter((t) => t !== type));
                    }
                  }}
                  className="sr-only"
                />
                <IconChecklist size={18} />
                <span className="font-medium">{type}</span>
              </label>
            ))}
          </div>
          {selectedTypes.length === 0 && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <IconX size={14} />
              Please select at least one event type.
            </p>
          )}
        </div>

        {/* Ownership (Optional) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ownership (Optional)
          </label>
          <input
            type="text"
            placeholder="Enter ownership, separated by commas"
            {...register("ownership", {
              setValueAs: (value: string) => {
                if (!value) return [];
                return value.split(",").map((item) => item.trim()).filter(Boolean);
              },
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
          />
          <p className="text-sm text-gray-500 mt-2">
            Separate multiple values with commas
          </p>
        </div>

        {/* Domains (Optional) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Domains (Optional)
          </label>
          <input
            type="text"
            placeholder="Enter domains, separated by commas"
            {...register("domains", {
              setValueAs: (value: string) => {
                if (!value) return [];
                return value.split(",").map((item) => item.trim()).filter(Boolean);
              },
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
          />
          <p className="text-sm text-gray-500 mt-2">
            Separate multiple values with commas
          </p>
        </div>

        {/* Files */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <IconUpload size={18} className="text-gray-500" />
            Event Files (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#7C3AED] transition-colors">
            <input
              type="file"
              multiple
              {...register("files")}
              className="hidden"
              id="file-upload"
              accept="image/*,.pdf,.doc,.docx"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <IconUpload size={32} className="text-gray-400" />
              <span className="text-sm text-gray-600 font-medium">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-gray-500">
                Images, PDFs, and documents supported
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

