import React from "react";
import { UseFormRegister, UseFieldArrayReturn } from "react-hook-form";
import { EventForm } from "@/types/events";
import { IconBook, IconUsers, IconPlus, IconTrash } from "@tabler/icons-react";

interface EventDetailsCardProps {
  register: UseFormRegister<EventForm>;
  learningOutcomeFields: UseFieldArrayReturn<EventForm, "learning_outcomes">["fields"];
  appendLearningOutcome: UseFieldArrayReturn<EventForm, "learning_outcomes">["append"];
  removeLearningOutcome: UseFieldArrayReturn<EventForm, "learning_outcomes">["remove"];
  whatYouNeedFields: UseFieldArrayReturn<EventForm, "what_you_need">["fields"];
  appendWhatYouNeed: UseFieldArrayReturn<EventForm, "what_you_need">["append"];
  removeWhatYouNeed: UseFieldArrayReturn<EventForm, "what_you_need">["remove"];
  instructorFields: UseFieldArrayReturn<EventForm, "instructors">["fields"];
  appendInstructor: UseFieldArrayReturn<EventForm, "instructors">["append"];
  removeInstructor: UseFieldArrayReturn<EventForm, "instructors">["remove"];
}

export default function EventDetailsCard({
  register,
  learningOutcomeFields,
  appendLearningOutcome,
  removeLearningOutcome,
  whatYouNeedFields,
  appendWhatYouNeed,
  removeWhatYouNeed,
  instructorFields,
  appendInstructor,
  removeInstructor,
}: EventDetailsCardProps) {
  return (
    <div className="border-b border-white/10 py-6 last:border-b-0">
      <h2 className="text-lg font-semibold text-white mb-5">Event Details</h2>
      <div className="space-y-6">
        {/* Learning Outcomes */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-3">
            Learning Outcomes <span className="text-[#FF7474]">*</span>
          </label>
          <div className="space-y-3">
            {learningOutcomeFields.map((field, index) => (
              <div key={field.id} className="flex gap-3">
                <input
                  type="text"
                  {...register(`learning_outcomes.${index}.value` as const, {
                    required: index === 0 ? "At least one learning outcome is required" : false,
                  })}
                  className="flex-1 px-4 py-1 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:border-transparent transition-all"
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
              className="w-full px-4 py-3 bg-white text-black rounded-lg  transition-colors flex items-center justify-center gap-2 border border-purple-200 font-medium"
            >
              <IconPlus size={18} />
              Add Learning Outcome
            </button>
          </div>
        </div>

        {/* What You Need */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-3">
            What You Need <span className="text-[#FF7474]">*</span>
          </label>
          <div className="space-y-3">
            {whatYouNeedFields.map((field, index) => (
              <div key={field.id} className="flex gap-3">
                <input
                  type="text"
                  {...register(`what_you_need.${index}.value` as const, {
                    required: index === 0 ? "At least one item is required" : false,
                  })}
                  className="flex-1 px-4 py-1 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
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
              className="w-full px-4 py-3 bg-white text-black rounded-lg transition-colors flex items-center justify-center gap-2 border border-purple-200 font-medium"
            >
              <IconPlus size={18} />
              Add Requirement
            </button>
          </div>
        </div>

        {/* Instructors */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
  
            Instructors <span className="text-[#FF7474]">*</span>
          </label>
          <div className="space-y-3">
            {instructorFields.map((field, index) => (
              <div key={field.id} className="flex gap-3">
                <input
                  type="text"
                  {...register(`instructors.${index}.value` as const, {
                    required: index === 0 ? "At least one instructor is required" : false,
                  })}
                  className="flex-1 px-4 py-1 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
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
              className="w-full px-4 py-3 bg-white text-black rounded-lg transition-colors flex items-center justify-center gap-2 border border-purple-200 font-medium"
            >
              <IconPlus size={18} />
              Add Instructor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

