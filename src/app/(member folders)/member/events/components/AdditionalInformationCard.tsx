import React from "react";
import { UseFormRegister } from "react-hook-form";
import { EventForm } from "@/types/events";
import { IconTag, IconChecklist, IconUpload, IconX, IconCheck } from "@tabler/icons-react";
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
    <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-sm border border-white/10 p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        Additional Information
      </h2>
      <div className="space-y-5">
        {/* Event Types */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-3">
            Event Types <span className="text-[#FF7474]">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            {typeOptions.map((type) => (
              <label
                key={type}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedTypes.includes(type)
                    ? "border-[#FAA336] bg-[#FAA336] text-black"
                    : "border-[#FAA336] bg-transparent text-[#FAA336] hover:bg-[#FAA336]/10"
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
                {selectedTypes.includes(type) && <IconCheck size={18} />}
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
          <label className="block text-sm font-semibold text-white mb-2">
            Ownership <span className="text-[#FF7474]">*</span>
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
            className="w-full px-4 py-1 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
          />
          <p className="text-sm text-gray-500 mt-2">
            Separate multiple values with commas
          </p>
        </div>

        {/* Domains (Optional) */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Domains <span className="text-[#FF7474]">*</span>
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
            className="w-full px-4 py-1 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
          />
          <p className="text-sm text-gray-500 mt-2">
            Separate multiple values with commas
          </p>
        </div>

        {/* Files */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
            Event Files<span className="text-[#FF7474]">*</span>
          </label>
          <div className="border-2  border-gray-300 rounded-lg p-6 text-center transition-colors bg-white">
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
              <span className="text-sm text-black font-medium">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-gray-600">
                Images .png and .jpg
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

