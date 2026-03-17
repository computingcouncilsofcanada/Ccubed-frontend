"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createEvent } from "@/services/useApiAuth";
import { useForm, useFieldArray } from "react-hook-form";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { EventForm } from "@/types/events";
import { formatDate } from "@/utils/dateUtils";
import { getErrMsg } from "@/utils/errorMessage";
import BasicInformationCard from "../components/BasicInformationCard";
import ScheduleRecurrenceCard from "../components/ScheduleRecurrenceCard";
import LocationLinksCard from "../components/LocationLinksCard";
import EventDetailsCard from "../components/EventDetailsCard";
import AdditionalInformationCard from "../components/AdditionalInformationCard";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";

export default function CreateEventPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const files = watch("files");

  React.useEffect(() => {
    if (files && files.length > 0) {
      const file = files[0];
      if (file && file.type && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setImagePreview(null);
    }
  }, [files]);

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

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
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
        router.push(`/member/events`);
      }
    } catch (err: unknown) {
      console.error("Error creating event:", err);
      alert(getErrMsg(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user ) {
    return null;
  }

  return (
    <div className="min-h-screen relative w-full overflow-hidden overflow-x-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] -mt-30 pt-30">
      <BgBoxMainPage maxHeight={400} enableGlow={true} />
      
      <div className="p-6 max-w-5xl mx-auto relative z-10">
 
        {/* Header */}
      <div className="mb-8">
        <Link
          href={`/member/events`}
          className="inline-flex items-center gap-2 text-gray-300 hover:text-[#7C3AED] transition-colors mb-4 group"
        >
          <IconArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Events</span>
        </Link>
        <div>
          <h1 className="text-5xl font-bold text-white mb-2">Create New Event</h1>
          <p className="text-lg text-gray-200">Fill in the details below to create a new event</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* First row: Basic Info + right-side preview on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <BasicInformationCard register={register} errors={errors} />
          </div>

          <div className="hidden lg:flex lg:col-span-1">
            <div className="w-full h-64 rounded-xl overflow-hidden bg-white/80 border border-white/10 shadow-md flex items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Event preview" className="w-full h-full object-cover" />
              ) : (
                // Placeholder — replace with Image component or src as needed
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                  <rect x="3" y="3" width="18" height="18" rx="6" fill="#F3F4F6" />
                  <path d="M8 13.5L10.5 10L13 13.5L16.5 9.5L21 15V18H3V15L8 13.5Z" fill="#E5E7EB" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Combined Card: Schedule, Location & Details */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-sm border border-white/10 p-6">
          <ScheduleRecurrenceCard
            register={register}
            errors={errors}
            eventType={eventType}
          />

          <LocationLinksCard register={register} errors={errors} />

          <EventDetailsCard
            register={register}
            learningOutcomeFields={learningOutcomeFields}
            appendLearningOutcome={appendLearningOutcome}
            removeLearningOutcome={removeLearningOutcome}
            whatYouNeedFields={whatYouNeedFields}
            appendWhatYouNeed={appendWhatYouNeed}
            removeWhatYouNeed={removeWhatYouNeed}
            instructorFields={instructorFields}
            appendInstructor={appendInstructor}
            removeInstructor={removeInstructor}
          />
        </div>

        <AdditionalInformationCard
          register={register}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <Link
            href={`/member/events`}
            className="basis-[30%] px-6 py-3 border-2 border-[#FAA336] rounded-lg hover:bg-[#FAA336]/10 transition-colors font-medium text-[#FAA336] flex items-center justify-center"
          >
            Cancel
          </Link>
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
                Creating Event...
              </span>
            ) : (
              "Create Event"
            )}
          </button>
        </div>
      </form>
      
      </div>
    </div>

  );
}
