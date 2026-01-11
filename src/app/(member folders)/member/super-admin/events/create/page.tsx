"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createEvent } from "@/services/useApiAuth";
import { useForm, useFieldArray } from "react-hook-form";
import Link from "next/link";
import {
  IconArrowLeft,
  IconCalendar,
  IconClock,
  IconMapPin,
  IconLink,
  IconFileText,
  IconUsers,
  IconBook,
  IconChecklist,
  IconTag,
  IconUpload,
  IconPlus,
  IconX,
  IconTrash,
} from "@tabler/icons-react";

type EventForm = {
  name: string;
  description: string;
  start_at: string;
  end_at: string;
  location: string;
  url?: string;
  registration_link: string;
  learning_outcomes: { value: string }[];
  what_you_need: { value: string }[];
  instructors: { value: string }[];
  types: string[];
  ownership?: string[];
  domains?: string[];
  files?: FileList;
  eventType: "one-day" | "weekly" | "monthly" | "multiple-day";
  selectedDayOfWeek?: string;
  multipleDays?: string[];
  monthlyDate?: string;
};

type ErrWithMessage = { message?: string };
type AxiosErrLike = { response?: { data?: { message?: string } } };

const getErrMsg = (err: unknown): string => {
  if (typeof err === "object" && err !== null) {
    const ax = err as AxiosErrLike;
    if (ax.response?.data?.message) return String(ax.response.data.message);
    const m = err as ErrWithMessage;
    if (m.message) return String(m.message);
  }
  return "Something went wrong";
};

// Helper to format date as DD-MM-YYYY
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Helper to parse DD-MM-YYYY to Date
const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const typeOptions = ["Online", "In Person"];
const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function CreateEventPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<EventForm>({
    defaultValues: {
      eventType: "one-day",
      learning_outcomes: [{ value: "" }],
      what_you_need: [{ value: "" }],
      instructors: [{ value: "" }],
      types: [],
    },
  });

  const {
    fields: learningOutcomeFields,
    append: appendLearningOutcome,
    remove: removeLearningOutcome,
  } = useFieldArray({
    control,
    name: "learning_outcomes",
  });

  const {
    fields: whatYouNeedFields,
    append: appendWhatYouNeed,
    remove: removeWhatYouNeed,
  } = useFieldArray({
    control,
    name: "what_you_need",
  });

  const {
    fields: instructorFields,
    append: appendInstructor,
    remove: removeInstructor,
  } = useFieldArray({
    control,
    name: "instructors",
  });

  const eventType = watch("eventType");
  const startAt = watch("start_at");
  const endAt = watch("end_at");

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      } else if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
        router.push("/member");
      }
    }
  }, [user, isLoading, router]);

  const onSubmit = async (data: EventForm) => {
    if (selectedTypes.length === 0) {
      alert("Please select at least one event type.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Basic fields
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("registration_link", data.registration_link);
      
      if (data.url) {
        formData.append("url", data.url);
      }

      // Arrays - append as JSON strings or individual items based on backend expectation
      const learningOutcomes = data.learning_outcomes
        .map((item) => item.value)
        .filter((item) => item.trim() !== "");
      learningOutcomes.forEach((outcome) => {
        formData.append("learning_outcomes", outcome);
      });

      const whatYouNeed = data.what_you_need
        .map((item) => item.value)
        .filter((item) => item.trim() !== "");
      whatYouNeed.forEach((item) => {
        formData.append("what_you_need", item);
      });

      const instructors = data.instructors
        .map((item) => item.value)
        .filter((item) => item.trim() !== "");
      instructors.forEach((instructor) => {
        formData.append("instructors", instructor);
      });

      selectedTypes.forEach((type) => {
        formData.append("types", type);
      });

      if (data.ownership && data.ownership.length > 0) {
        data.ownership.forEach((item) => {
          formData.append("ownership", item);
        });
      }

      if (data.domains && data.domains.length > 0) {
        data.domains.forEach((item) => {
          formData.append("domains", item);
        });
      }

      // Files
      if (data.files && data.files.length > 0) {
        Array.from(data.files).forEach((file) => {
          formData.append("file", file);
        });
      }

      // Handle recurrence based on event type
      let recurrence: {
        type: "none" | "daily" | "weekly" | "monthly" | "custom";
        days_of_week?: string[];
        custom_dates?: string[];
      };

      const startDate = new Date(data.start_at);
      const endDate = new Date(data.end_at);

      switch (data.eventType) {
        case "one-day":
          formData.append("start_at", startDate.getTime().toString());
          formData.append("end_at", endDate.getTime().toString());
          recurrence = {
            type: "none",
            custom_dates: [formatDate(startDate)],
          };
          break;

        case "weekly":
          formData.append("start_at", startDate.getTime().toString());
          formData.append("end_at", endDate.getTime().toString());
          recurrence = {
            type: "weekly",
            days_of_week: data.selectedDayOfWeek
              ? [data.selectedDayOfWeek.toLowerCase()]
              : [],
          };
          break;

        case "monthly":
          formData.append("start_at", startDate.getTime().toString());
          formData.append("end_at", endDate.getTime().toString());
          recurrence = {
            type: "monthly",
            custom_dates: data.monthlyDate ? [data.monthlyDate] : [],
          };
          break;

        case "multiple-day":
          formData.append("start_at", startDate.getTime().toString());
          formData.append("end_at", endDate.getTime().toString());
          const multipleDaysValue = data.multipleDays;
          const customDates = typeof multipleDaysValue === "string"
            ? (multipleDaysValue as string).split("\n").filter((d: string) => d.trim()).map((d: string) => d.trim())
            : Array.isArray(multipleDaysValue)
            ? multipleDaysValue
            : [];
          recurrence = {
            type: "custom",
            custom_dates: customDates,
          };
          break;

        default:
          formData.append("start_at", startDate.getTime().toString());
          formData.append("end_at", endDate.getTime().toString());
          recurrence = {
            type: "none",
            custom_dates: [formatDate(startDate)],
          };
      }

      // Append recurrence as JSON
      formData.append("recurrence", JSON.stringify(recurrence));

      const res = await createEvent(formData);
      if (res.status === 201) {
        alert(res.message || "Event created successfully!");
        router.push(`/member/${user?.role === "SUPER_ADMIN" ? "super-admin" : "admin"}/events`);
      }
    } catch (err: unknown) {
      console.error("Error creating event:", err);
      alert(getErrMsg(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    return null;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/member/${user?.role === "SUPER_ADMIN" ? "super-admin" : "admin"}/events`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#7C3AED] transition-colors mb-4 group"
        >
          <IconArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Events</span>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Event</h1>
          <p className="text-gray-600">Fill in the details below to create a new event</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <IconFileText size={24} className="text-[#7C3AED]" />
            Basic Information
          </h2>
          <div className="space-y-5">
            {/* Event Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Event name is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description", { required: "Description is required" })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all resize-none"
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

        {/* Schedule & Recurrence Card */}
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

        {/* Location & Links Card */}
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

        {/* Event Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <IconBook size={24} className="text-[#7C3AED]" />
            Event Details
          </h2>
          <div className="space-y-6">
            {/* Learning Outcomes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Learning Outcomes <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {learningOutcomeFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <input
                      type="text"
                      {...register(`learning_outcomes.${index}.value` as const, {
                        required: index === 0 ? "At least one learning outcome is required" : false,
                      })}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
                      placeholder="Enter learning outcome"
                    />
                    {learningOutcomeFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLearningOutcome(index)}
                        className="px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 border border-red-200"
                      >
                        <IconTrash size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendLearningOutcome({ value: "" })}
                  className="w-full px-4 py-3 bg-purple-50 text-[#7C3AED] rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center gap-2 border border-purple-200 font-medium"
                >
                  <IconPlus size={18} />
                  Add Learning Outcome
                </button>
              </div>
            </div>

            {/* What You Need */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                What You Need <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {whatYouNeedFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <input
                      type="text"
                      {...register(`what_you_need.${index}.value` as const, {
                        required: index === 0 ? "At least one item is required" : false,
                      })}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
                      placeholder="Enter requirement"
                    />
                    {whatYouNeedFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWhatYouNeed(index)}
                        className="px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 border border-red-200"
                      >
                        <IconTrash size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendWhatYouNeed({ value: "" })}
                  className="w-full px-4 py-3 bg-purple-50 text-[#7C3AED] rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center gap-2 border border-purple-200 font-medium"
                >
                  <IconPlus size={18} />
                  Add Requirement
                </button>
              </div>
            </div>

            {/* Instructors */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <IconUsers size={18} className="text-gray-500" />
                Instructors <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {instructorFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <input
                      type="text"
                      {...register(`instructors.${index}.value` as const, {
                        required: index === 0 ? "At least one instructor is required" : false,
                      })}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
                      placeholder="Enter instructor name"
                    />
                    {instructorFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInstructor(index)}
                        className="px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 border border-red-200"
                      >
                        <IconTrash size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendInstructor({ value: "" })}
                  className="w-full px-4 py-3 bg-purple-50 text-[#7C3AED] rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center gap-2 border border-purple-200 font-medium"
                >
                  <IconPlus size={18} />
                  Add Instructor
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Card */}
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

        {/* Submit Button */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <Link
            href={`/member/${user?.role === "SUPER_ADMIN" ? "super-admin" : "admin"}/events`}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 flex items-center justify-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || selectedTypes.length === 0}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] text-white rounded-lg hover:from-[#6d28d9] hover:to-[#5b21b6] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating Event...
              </span>
            ) : (
              "Create Event"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

