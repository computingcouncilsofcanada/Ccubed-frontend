import React from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { EventForm } from "@/types/events";
import { IconCalendar, IconClock, IconX } from "@tabler/icons-react";
import { daysOfWeek } from "../create/constants";

interface ScheduleRecurrenceCardProps {
  register: UseFormRegister<EventForm>;
  errors: FieldErrors<EventForm>;
  eventType: "one-day" | "weekly" | "monthly" | "multiple-day";
}

export default function ScheduleRecurrenceCard({
  register,
  errors,
  eventType,
}: ScheduleRecurrenceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <IconCalendar size={24} className="text-[#7C3AED]" />
        Schedule & Recurrence
      </h2>
      <div className="space-y-5">
        {/* Event Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Event Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("eventType", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all bg-white"
          >
            <option value="one-day">One-Day Event</option>
            <option value="weekly">Weekly Recurring</option>
            <option value="monthly">Monthly Recurring</option>
            <option value="multiple-day">Multiple-Day Event</option>
          </select>
        </div>

        {/* Start and End Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <IconClock size={18} className="text-gray-500" />
              Start Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              {...register("start_at", { required: "Start time is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
            />
            {errors.start_at && (
              <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                <IconX size={14} />
                {errors.start_at.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <IconClock size={18} className="text-gray-500" />
              End Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              {...register("end_at", { required: "End time is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
            />
            {errors.end_at && (
              <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                <IconX size={14} />
                {errors.end_at.message}
              </p>
            )}
          </div>
        </div>

        {/* Weekly: Day of Week */}
        {eventType === "weekly" && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Day of Week <span className="text-red-500">*</span>
            </label>
            <select
              {...register("selectedDayOfWeek", {
                required: eventType === "weekly",
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all bg-white"
            >
              <option value="">Select a day</option>
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Monthly: Date */}
        {eventType === "monthly" && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date (DD-MM-YYYY) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="25-08-2025"
              {...register("monthlyDate", {
                required: eventType === "monthly",
                pattern: {
                  value: /^\d{2}-\d{2}-\d{4}$/,
                  message: "Date must be in DD-MM-YYYY format",
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
            />
            {errors.monthlyDate && (
              <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                <IconX size={14} />
                {errors.monthlyDate.message}
              </p>
            )}
          </div>
        )}

        {/* Multiple-Day: Dates Array */}
        {eventType === "multiple-day" && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dates (DD-MM-YYYY, one per line) <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="21-08-2025&#10;23-12-2025"
              {...register("multipleDays", {
                required: eventType === "multiple-day",
                validate: (value: string | undefined | string[]) => {
                  if (!value || (typeof value === "string" && !value.trim())) {
                    return "At least one date is required";
                  }
                  const dates = typeof value === "string" 
                    ? value.split("\n").filter((d) => d.trim()).map((d) => d.trim())
                    : Array.isArray(value) 
                    ? value 
                    : [];
                  if (dates.length === 0) return "At least one date is required";
                  const validFormat = /^\d{2}-\d{2}-\d{4}$/;
                  const allValid = dates.every((d) => validFormat.test(d));
                  return allValid || "All dates must be in DD-MM-YYYY format";
                },
              })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              Enter one date per line in DD-MM-YYYY format
            </p>
            {errors.multipleDays && (
              <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                <IconX size={14} />
                {errors.multipleDays.message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

