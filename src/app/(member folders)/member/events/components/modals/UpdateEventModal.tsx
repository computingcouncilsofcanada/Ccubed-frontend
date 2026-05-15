"use client";

import React, { useEffect, useState, useRef } from "react";
import Modal from "@/components/modals/Modal";
import { Event, EventForm } from "@/types/events";
import { useForm, useFieldArray } from "react-hook-form";
import {
  IconCalendar,
  IconClock,
  IconMapPin,
  IconFileText,
  IconX,
  IconPlus,
  IconTrash,
  IconLink,
  IconUpload,
} from "@tabler/icons-react";
import { typeOptions } from "../../create/constants";

interface UpdateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEvent: Event | null;
  onSubmit: (data: EventForm) => void;
  onSubmitSuccess?: () => void;
}


function toLocalDateTimeInput(timestamp: string): string {
  const date = new Date(parseInt(timestamp));
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function UpdateEventModal({
  isOpen,
  onClose,
  selectedEvent,
  onSubmit,
  onSubmitSuccess,
}: UpdateEventModalProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
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

  const files = watch("files");
  const eventType = watch("eventType");

  // Field arrays
  const {
    fields: learningOutcomeFields,
    append: appendLearningOutcome,
    remove: removeLearningOutcome,
  } = useFieldArray({ control, name: "learning_outcomes" });

  const {
    fields: whatYouNeedFields,
    append: appendWhatYouNeed,
    remove: removeWhatYouNeed,
  } = useFieldArray({ control, name: "what_you_need" });

  const {
    fields: instructorFields,
    append: appendInstructor,
    remove: removeInstructor,
  } = useFieldArray({ control, name: "instructors" });

  // Reset form when selectedEvent changes
  useEffect(() => {
    if (!selectedEvent) return;

    reset({
      name: selectedEvent.name || "",
      description: selectedEvent.description || "",
      location: selectedEvent.location || "",
      registration_link: selectedEvent.registration_link || "",
      url: selectedEvent.url || "",

 
      start_at: selectedEvent.start_at
        ? toLocalDateTimeInput(selectedEvent.start_at)
        : "",
      end_at: selectedEvent.end_at
        ? toLocalDateTimeInput(selectedEvent.end_at)
        : "",

      learning_outcomes:
        selectedEvent.learning_outcomes && selectedEvent.learning_outcomes.length > 0
          ? selectedEvent.learning_outcomes.map((v) => ({ value: v }))
          : [{ value: "" }],
      what_you_need:
        selectedEvent.what_you_need && selectedEvent.what_you_need.length > 0
          ? selectedEvent.what_you_need.map((v) => ({ value: v }))
          : [{ value: "" }],
      instructors:
        selectedEvent.instructors && selectedEvent.instructors.length > 0
          ? selectedEvent.instructors.map((v) => ({ value: v }))
          : [{ value: "" }],

      ownership: (selectedEvent.ownership?.join(", ") || "") as any,
      domains: (selectedEvent.domains?.join(", ") || "") as any,

      eventType: "one-day",
      types: selectedEvent.types || [],
    } as any);

    // Types
    const types = selectedEvent.types || [];
    setSelectedTypes(types);
    setValue("types", types);

    // Recurrence
    if (selectedEvent.recurrence) {
      const recType = selectedEvent.recurrence.type;
      if (!recType || recType === "none") {
        setValue("eventType", "one-day");
      } else if (recType === "weekly") {
        setValue("eventType", "weekly");
        const day = selectedEvent.recurrence.days_of_week?.[0] || "";
        setValue(
          "selectedDayOfWeek",
          day ? day.charAt(0).toUpperCase() + day.slice(1) : ""
        );
      } else if (recType === "monthly") {
        setValue("eventType", "monthly");
        setValue("monthlyDate", selectedEvent.recurrence.custom_dates?.[0] || "");
      } else if (recType === "custom") {
        setValue("eventType", "multiple-day");
        setValue("multipleDays", selectedEvent.recurrence.custom_dates || ([] as any));
      }
    } else {
      setValue("eventType", "one-day");
    }

    // Image preview
    const firstFileUrl = selectedEvent.files?.[0]?.url;
setImagePreview(firstFileUrl || null);
  }, [selectedEvent, reset, setValue]);

  // Handle new file uploads — FileList is not a plain array, guard with instanceof
  useEffect(() => {
    if (!files || !(files instanceof FileList) || files.length === 0) {
      console.log("No files detected in watch:", { files, isFileList: files instanceof FileList });
      return;
    }
    console.log("Files detected in watch:", { count: files.length, names: Array.from(files).map(f => f.name) });
    const file = files[0];
    if (file?.type?.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.onerror = () => {
        console.error("Failed to read file:", file.name);
        setImagePreview(null);
      };
      reader.readAsDataURL(file);
    }
  }, [files]);

  // Clean up file input when modal closes
  useEffect(() => {
    if (!isOpen && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [isOpen]);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => {
      const newTypes = prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type];
      setValue("types", newTypes);
      return newTypes;
    });
  };

  const handleFormSubmit = async (data: EventForm) => {
    if (selectedTypes.length === 0) {
      alert("Please select at least one event type (Online or In Person)");
      return;
    }

    const finalData: EventForm = {
      ...data,
      types: selectedTypes,
    };

    console.log("UpdateEventModal handleFormSubmit - finalData:", {
      hasFiles: !!finalData.files,
      filesCount: finalData.files?.length,
      fileNames: finalData.files ? Array.from(finalData.files).map(f => f.name) : [],
    });

    setIsSubmitting(true);
    try {
      await onSubmit(finalData);
      
      // Notify parent of successful submission
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Event" size="xl">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="max-h-[70vh] overflow-y-auto"
      >
        <div className="flex flex-col gap-6 p-2">
          {/* ── Basic Information ─────────────────────────────────────────── */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <IconFileText size={20} className="text-[#FAA336]" />
              Basic Information
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Event Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA336] focus:border-[#FAA336] transition-all bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter event name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <IconX size={14} />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                {...register("description", { required: "Description is required" })}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA336] focus:border-[#FAA336] transition-all resize-none bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter event description"
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <IconX size={14} />
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <IconUpload size={16} className="text-gray-400" />
                Event Image
              </label>
              <div className="flex gap-4 items-start">
                <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-700 border-2 border-gray-600 flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Event preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <IconImage size={32} className="text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    {...register("files")}
                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FAA336] file:text-white hover:file:bg-[#F59527]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload an image for the event (optional)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Schedule & Recurrence ─────────────────────────────────────── */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <IconCalendar size={20} className="text-[#FAA336]" />
              Schedule &amp; Recurrence
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Event Type <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(["one-day", "weekly", "monthly", "multiple-day"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setValue("eventType", type)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all font-medium ${
                      eventType === type
                        ? "border-[#FAA336] bg-[#FAA336]/20 text-[#FAA336]"
                        : "border-gray-600 text-gray-400 hover:border-gray-500"
                    }`}
                  >
                    {type === "one-day" && "One Day"}
                    {type === "weekly" && "Weekly"}
                    {type === "monthly" && "Monthly"}
                    {type === "multiple-day" && "Multiple Days"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <IconClock size={16} className="text-gray-400" />
                  Start Time <span className="text-red-400">*</span>
                </label>
                <input
                  type="datetime-local"
                  {...register("start_at", { required: "Start time is required" })}
                  className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA336] focus:border-[#FAA336] transition-all bg-gray-700 text-white"
                />
                {errors.start_at && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <IconX size={14} />
                    {errors.start_at.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <IconClock size={16} className="text-gray-400" />
                  End Time <span className="text-red-400">*</span>
                </label>
                <input
                  type="datetime-local"
                  {...register("end_at", { required: "End time is required" })}
                  className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA336] focus:border-[#FAA336] transition-all bg-gray-700 text-white"
                />
                {errors.end_at && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <IconX size={14} />
                    {errors.end_at.message}
                  </p>
                )}
              </div>
            </div>

            {eventType === "weekly" && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Select Day of Week <span className="text-red-400">*</span>
                </label>
                <select
                  {...register("selectedDayOfWeek")}
                  className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA336] focus:border-[#FAA336] transition-all bg-gray-700 text-white"
                >
                  <option value="">Select a day</option>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                    (d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}

            {eventType === "monthly" && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Monthly Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  {...register("monthlyDate")}
                  className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA336] focus:border-[#FAA336] transition-all bg-gray-700 text-white"
                />
              </div>
            )}

            {eventType === "multiple-day" && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Multiple Days (one per line) <span className="text-red-400">*</span>
                </label>
                <textarea
                  {...register("multipleDays" as any)}
                  rows={4}
                  placeholder={"2025-06-20\n2025-06-21\n2025-06-27"}
                  className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA336] focus:border-[#FAA336] transition-all bg-gray-700 text-white placeholder-gray-400"
                />
              </div>
            )}
          </div>

          {/* ── Location & Links ──────────────────────────────────────────── */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <IconMapPin size={20} className="text-[#FAA336]" />
              Location &amp; Links
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Location <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA336] focus:border-[#FAA336] transition-all bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter event location"
              />
              {errors.location && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <IconX size={14} />
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <IconLink size={16} className="text-gray-400" />
                Registration Link
              </label>
              <input
                type="text"
                {...register("registration_link")}
                className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA336] focus:border-[#FAA336] transition-all bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter registration link"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <IconLink size={16} className="text-gray-400" />
                Event URL (optional)
              </label>
              <input
                type="text"
                {...register("url")}
                className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA336] focus:border-[#FAA336] transition-all bg-gray-700 text-white placeholder-gray-400"
                placeholder="https://example.com/event"
              />
            </div>
          </div>

          {/* ── Event Details ─────────────────────────────────────────────── */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Event Details</h3>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Learning Outcomes
              </label>
              {learningOutcomeFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input
                    {...register(`learning_outcomes.${index}.value` as const)}
                    className="flex-1 px-4 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA336] focus:border-[#FAA336] transition-all bg-gray-700 text-white placeholder-gray-400"
                    placeholder={`Learning outcome ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeLearningOutcome(index)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <IconTrash size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendLearningOutcome({ value: "" })}
                className="text-[#FAA336] text-sm font-medium hover:text-[#F59527] flex items-center gap-1"
              >
                <IconPlus size={16} /> Add Learning Outcome
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                What You Need (to bring/know)
              </label>
              {whatYouNeedFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input
                    {...register(`what_you_need.${index}.value` as const)}
                    className="flex-1 px-4 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA336] focus:border-[#FAA336] transition-all bg-gray-700 text-white placeholder-gray-400"
                    placeholder={`Requirement ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeWhatYouNeed(index)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <IconTrash size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendWhatYouNeed({ value: "" })}
                className="text-[#FAA336] text-sm font-medium hover:text-[#F59527] flex items-center gap-1"
              >
                <IconPlus size={16} /> Add Requirement
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Instructors
              </label>
              {instructorFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input
                    {...register(`instructors.${index}.value` as const)}
                    className="flex-1 px-4 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA336] focus:border-[#FAA336] transition-all bg-gray-700 text-white placeholder-gray-400"
                    placeholder={`Instructor ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeInstructor(index)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <IconTrash size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendInstructor({ value: "" })}
                className="text-[#FAA336] text-sm font-medium hover:text-[#F59527] flex items-center gap-1"
              >
                <IconPlus size={16} /> Add Instructor
              </button>
            </div>
          </div>

          {/* ── Additional Information ────────────────────────────────────── */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              Additional Information
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Event Types <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeToggle(type)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all font-medium ${
                      selectedTypes.includes(type)
                        ? "border-[#FAA336] bg-[#FAA336]/20 text-[#FAA336]"
                        : "border-gray-600 text-gray-400 hover:border-gray-500"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {selectedTypes.length === 0 && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <IconX size={14} />
                  Please select at least one event type
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Ownership
              </label>
              <input
                type="text"
                {...register("ownership" as any)}
                className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA336] focus:border-[#FAA336] transition-all bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter ownership (comma separated)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Domains
              </label>
              <input
                type="text"
                {...register("domains" as any)}
                className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAA336] focus:border-[#FAA336] transition-all bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter domains (comma separated)"
              />
            </div>
          </div>

          {/* ── Action Buttons ────────────────────────────────────────────── */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="basis-[30%] px-6 py-3 border-2 border-gray-600 rounded-lg hover:bg-gray-700 transition-colors font-medium text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || selectedTypes.length === 0}
              className="basis-[70%] px-6 py-3 bg-[#FAA336] hover:bg-[#F59527] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
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
                  Updating Event...
                </span>
              ) : (
                "Update Event"
              )}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

function IconImage({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}