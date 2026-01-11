import Modal from "@/components/modals/Modal";
import { Event, EventForm } from "@/types/events";
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { IconCalendar, IconClock, IconMapPin, IconFileText, IconX } from "@tabler/icons-react";

interface UpdateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEvent: Event | null;
  register: UseFormRegister<EventForm>;
  handleSubmit: UseFormHandleSubmit<EventForm>;
  onSubmit: (data: EventForm) => void;
  errors: FieldErrors<EventForm>;
}

export default function UpdateEventModal({
  isOpen,
  onClose,
  selectedEvent,
  register,
  handleSubmit,
  onSubmit,
  errors,
}: UpdateEventModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Event">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          {/* Event Name Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
              <IconFileText size={16} className="text-gray-400" />
              Event Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              defaultValue={selectedEvent?.name}
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-700 text-white placeholder-gray-400"
              placeholder="Enter event name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1.5 flex items-center gap-1">
                <IconX size={14} />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Event Description Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              defaultValue={selectedEvent?.description}
              {...register("description", {
                required: "Description is required",
              })}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none bg-gray-700 text-white placeholder-gray-400"
              placeholder="Enter event description"
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1.5 flex items-center gap-1">
                <IconX size={14} />
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Start Time Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <IconClock size={16} className="text-gray-400" />
                Start Time <span className="text-red-400">*</span>
              </label>
              <input
                type="datetime-local"
                defaultValue={
                  selectedEvent?.start_at
                    ? new Date(parseInt(selectedEvent.start_at))
                        .toISOString()
                        .slice(0, 16)
                    : undefined
                }
                {...register("start_at", {
                  required: "Start time is required",
                })}
                className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-700 text-white"
              />
              {errors.start_at && (
                <p className="text-red-400 text-sm mt-1.5 flex items-center gap-1">
                  <IconX size={14} />
                  {errors.start_at.message}
                </p>
              )}
            </div>

            {/* Event End Time Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <IconClock size={16} className="text-gray-400" />
                End Time <span className="text-red-400">*</span>
              </label>
              <input
                type="datetime-local"
                defaultValue={
                  selectedEvent?.end_at
                    ? new Date(parseInt(selectedEvent.end_at))
                        .toISOString()
                        .slice(0, 16)
                    : undefined
                }
                {...register("end_at", {
                  required: "End time is required",
                })}
                className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-700 text-white"
              />
              {errors.end_at && (
                <p className="text-red-400 text-sm mt-1.5 flex items-center gap-1">
                  <IconX size={14} />
                  {errors.end_at.message}
                </p>
              )}
            </div>
          </div>

          {/* Event Location Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
              <IconMapPin size={16} className="text-gray-400" />
              Location <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              defaultValue={selectedEvent?.location}
              {...register("location", {
                required: "Location is required",
              })}
              className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-700 text-white placeholder-gray-400"
              placeholder="Enter event location"
            />
            {errors.location && (
              <p className="text-red-400 text-sm mt-1.5 flex items-center gap-1">
                <IconX size={14} />
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-600">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border-2 border-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium text-gray-300 hover:border-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Update Event
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
