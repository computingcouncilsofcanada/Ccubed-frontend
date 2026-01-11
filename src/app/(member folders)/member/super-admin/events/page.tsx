"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import {
  getAllEvents,
  updateEvent,
  deleteEvent,
  approveCreateEvent,
  rejectCreateEvent,
  approveUpdateEvent,
  rejectUpdateEvent,
} from "@/services/useApiAuth";
import Modal from "@/components/modals/Modal";
import { useForm } from "react-hook-form";
import {
  IconCalendar,
  IconClock,
  IconMapPin,
  IconLink,
  IconUsers,
  IconBook,
  IconChecklist,
  IconTag,
  IconFileText,
  IconEdit,
  IconTrash,
  IconCheck,
  IconX,
  IconPlus,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";
import Link from "next/link";

type Recurrence = {
  type: "none" | "daily" | "weekly" | "monthly" | "custom";
  days_of_week?: string[];
  custom_dates?: string[];
};

type Event = {
  id: string;
  name: string;
  description: string;
  start_at: string;
  end_at: string;
  location: string;
  url?: string;
  registration_link?: string;
  learning_outcomes?: string[];
  what_you_need?: string[];
  instructors?: string[];
  ownership?: string[];
  domains?: string[];
  recurrence?: Recurrence;
  images: string | null;
  files?: Array<{
    id: string;
    name: string;
    url: string;
  }>;
  created_at: string;
  created_by: string;
  updated_at: string | null;
  updated_by: string | null;
  pending_action: string;
  types: string[];
  status: number;
};

type EventForm = {
  name: string;
  description: string;
  start_at: string;
  end_at: string;
  location: string;
  images?: FileList;
  types: string[];
};


// ---- helpers to avoid `any` while preserving messages ----
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

function EventsPage() {
  const { user, isLoading } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [, setError] = useState<string>(""); // setter-only; avoids unused state var

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectType, setRejectType] = useState<"create" | "update">("create");

  const [page, setPage] = useState(1);
  const limit = 10;
  const router = useRouter();

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    reset: resetUpdate,
    formState: { errors: updateErrors },
  } = useForm<EventForm>();

  const fetchEvents = useCallback(async () => {
    try {
      const offset = (page - 1) * limit;
      const res = await getAllEvents(limit, offset);
      setEvents(res.data);
    } catch (err: unknown) {
      setError(getErrMsg(err));
      console.log(err);
    }
  }, [page]); // `limit` is constant

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);


  const handleUpdateEvent = async (data: EventForm) => {
    if (!selectedEvent) return;

    try {
      const res = await updateEvent(selectedEvent.id, {
        name: data.name,
        description: data.description,
        start_at: new Date(data.start_at).getTime().toString(),
        end_at: new Date(data.end_at).getTime().toString(),
        location: data.location,
      });
      setIsUpdateModalOpen(false);
      resetUpdate();
      if (res.status === 200) {
        alert(res.message);
        await fetchEvents();
      }
    } catch (err: unknown) {
      console.error("Error updating event:", err);
      alert(getErrMsg(err));
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;

    try {
      const res = await deleteEvent(selectedEvent.id);
      if (res.status === 200) {
        alert(res.message);
        setIsDeleteModalOpen(false);
        await fetchEvents();
      }
    } catch (err: unknown) {
      console.error("Error deleting event:", err);
      alert(getErrMsg(err));
    }
  };

  // Approve/Reject handlers
  const handleApproveCreateEvent = async () => {
    if (!selectedEvent) return;
    try {
      const res = await approveCreateEvent(selectedEvent.id);
      if (res.status === 200) {
        alert(res.message);
        setIsApproveModalOpen(false);
        await fetchEvents();
      }
    } catch (err: unknown) {
      console.error("Error approving event creation:", err);
      alert(getErrMsg(err));
    }
  };

  const handleRejectCreateEvent = async () => {
    if (!selectedEvent || !rejectReason.trim()) return;
    try {
      const res = await rejectCreateEvent(selectedEvent.id, rejectReason);
      if (res.status === 200) {
        alert(res.message);
        setIsRejectModalOpen(false);
        setRejectReason("");
        await fetchEvents();
      }
    } catch (err: unknown) {
      console.error("Error rejecting event creation:", err);
      alert(getErrMsg(err));
    }
  };

  const handleApproveUpdateEvent = async () => {
    if (!selectedEvent) return;
    try {
      const res = await approveUpdateEvent(selectedEvent.id);
      if (res.status === 200) {
        alert(res.message);
        await fetchEvents();
      }
    } catch (err: unknown) {
      console.error("Error approving event update:", err);
      alert(getErrMsg(err));
    }
  };

  const handleRejectUpdateEvent = async () => {
    if (!selectedEvent || !rejectReason.trim()) return;
    try {
      const res = await rejectUpdateEvent(selectedEvent.id, rejectReason);
      if (res.status === 200) {
        alert(res.message);
        setIsRejectModalOpen(false);
        setRejectReason("");
        await fetchEvents();
      }
    } catch (err: unknown) {
      console.error("Error rejecting event update:", err);
      alert(getErrMsg(err));
    }
  };

  const openModal = (
    event: Event | null,
    type:
      | "create"
      | "update"
      | "delete"
      | "approve-create"
      | "reject-create"
      | "approve-update"
      | "reject-update"
  ) => {
    setSelectedEvent(event);
    switch (type) {
      case "create":
        router.push("/member/super-admin/events/create");
        break;
      case "update":
        setIsUpdateModalOpen(true);
        break;
      case "delete":
        setIsDeleteModalOpen(true);
        break;
      case "approve-create":
        setIsApproveModalOpen(true);
        break;
      case "reject-create":
        setRejectType("create");
        setIsRejectModalOpen(true);
        break;
      case "approve-update":
        handleApproveUpdateEvent();
        break;
      case "reject-update":
        setRejectType("update");
        setIsRejectModalOpen(true);
        break;
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      } else if (user.role !== "SUPER_ADMIN") {
        router.push("/member");
      }
    }
  }, [user, isLoading, router]);

  if (!user || user.role !== "SUPER_ADMIN") {
    return null;
  }

  const formatRecurrence = (recurrence?: Recurrence): string => {
    if (!recurrence) return "One-time event";
    switch (recurrence.type) {
      case "none":
        return "One-time event";
      case "weekly":
        return `Weekly on ${recurrence.days_of_week?.map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(", ") || "N/A"}`;
      case "monthly":
        return `Monthly on ${recurrence.custom_dates?.join(", ") || "N/A"}`;
      case "custom":
        return `Multiple dates: ${recurrence.custom_dates?.join(", ") || "N/A"}`;
      default:
        return "Recurring event";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Events</h1>
          <p className="text-gray-600">Manage and review all events</p>
        </div>
        <Link
          href="/member/super-admin/events/create"
          className="px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] text-white rounded-lg hover:from-[#6d28d9] hover:to-[#5b21b6] transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
        >
          <IconPlus size={20} />
          Create New Event
        </Link>
      </div>

      {/* Events Grid Display */}
      {events.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <IconCalendar size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first event</p>
          <Link
            href="/member/super-admin/events/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#7C3AED] text-white rounded-lg hover:bg-[#6d28d9] transition-colors"
          >
            <IconPlus size={20} />
            Create Event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => {
            const startDate = new Date(parseInt(event.start_at));
            const endDate = new Date(parseInt(event.end_at));
            const isPending = event.pending_action && event.pending_action !== "";

            return (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Event Image */}
                {event.images && (
                  <div className="relative h-48 w-full bg-gray-100">
                    <img
                      src={event.images}
                      alt={event.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {isPending && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                          Pending {event.pending_action}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Event Content */}
                <div className="p-6">
                  {/* Event Header */}
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {event.name}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {event.description}
                    </p>
                  </div>

                  {/* Event Types */}
                  {event.types && event.types.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.types.map((type) => (
                        <span
                          key={type}
                          className="px-3 py-1 bg-purple-50 text-[#7C3AED] text-xs font-medium rounded-full border border-purple-200"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Date & Time */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <IconCalendar size={18} className="text-gray-400" />
                      <span className="font-medium">
                        {startDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <IconClock size={18} className="text-gray-400" />
                      <span>
                        {startDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {endDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <IconMapPin size={18} className="text-gray-400" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Recurrence */}
                  {event.recurrence && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs font-medium text-blue-800">
                        {formatRecurrence(event.recurrence)}
                      </p>
                    </div>
                  )}

                  {/* Learning Outcomes */}
                  {event.learning_outcomes && event.learning_outcomes.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <IconBook size={16} className="text-gray-400" />
                        <span className="text-xs font-semibold text-gray-700 uppercase">
                          Learning Outcomes
                        </span>
                      </div>
                      <ul className="list-disc list-inside space-y-1">
                        {event.learning_outcomes.slice(0, 3).map((outcome, idx) => (
                          <li key={idx} className="text-xs text-gray-600 line-clamp-1">
                            {outcome}
                          </li>
                        ))}
                        {event.learning_outcomes.length > 3 && (
                          <li className="text-xs text-gray-500 italic">
                            +{event.learning_outcomes.length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Instructors */}
                  {event.instructors && event.instructors.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <IconUsers size={16} className="text-gray-400" />
                        <span className="text-xs font-semibold text-gray-700 uppercase">
                          Instructors
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {event.instructors.slice(0, 3).map((instructor, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {instructor}
                          </span>
                        ))}
                        {event.instructors.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                            +{event.instructors.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="space-y-2 mb-4">
                    {event.registration_link && (
                      <a
                        href={event.registration_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[#7C3AED] hover:text-[#6d28d9] transition-colors"
                      >
                        <IconLink size={16} />
                        <span className="font-medium">Registration Link</span>
                      </a>
                    )}
                    {event.url && (
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <IconLink size={16} />
                        <span>Event URL</span>
                      </a>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => openModal(event, "update")}
                      className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <IconEdit size={16} />
                      Update
                    </button>
                    <button
                      onClick={() => openModal(event, "delete")}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <IconTrash size={16} />
                    </button>
                    {event.pending_action === "create" && (
                      <>
                        <button
                          onClick={() => openModal(event, "approve-create")}
                          className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2 text-sm font-medium"
                          title="Approve Creation"
                        >
                          <IconCheck size={16} />
                        </button>
                        <button
                          onClick={() => openModal(event, "reject-create")}
                          className="px-3 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors flex items-center gap-2 text-sm font-medium"
                          title="Reject Creation"
                        >
                          <IconX size={16} />
                        </button>
                      </>
                    )}
                    {event.pending_action === "update" && (
                      <>
                        <button
                          onClick={() => openModal(event, "approve-update")}
                          className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2 text-sm font-medium"
                          title="Approve Update"
                        >
                          <IconCheck size={16} />
                        </button>
                        <button
                          onClick={() => openModal(event, "reject-update")}
                          className="px-3 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors flex items-center gap-2 text-sm font-medium"
                          title="Reject Update"
                        >
                          <IconX size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {events.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
          >
            <IconArrowLeft size={18} />
            Previous
          </button>
          <span className="px-6 py-2 bg-gray-100 rounded-lg font-semibold text-gray-700">
            Page {page}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={events.length < limit}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
          >
            Next
            <IconArrowRight size={18} />
          </button>
        </div>
      )}

     
      {/* Update Event Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          resetUpdate();
        }}
        title="Update Event"
      >
        <form onSubmit={handleUpdateSubmit(handleUpdateEvent)}>
          <div className="flex flex-col gap-4">
            {/* Event Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Name
              </label>
              <input
                type="text"
                defaultValue={selectedEvent?.name}
                {...registerUpdate("name", { required: "Name is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {updateErrors.name && (
                <p className="text-red-500 text-sm">
                  {updateErrors.name.message}
                </p>
              )}
            </div>

            {/* Event Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                defaultValue={selectedEvent?.description}
                {...registerUpdate("description", {
                  required: "Description is required",
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {updateErrors.description && (
                <p className="text-red-500 text-sm">
                  {updateErrors.description.message}
                </p>
              )}
            </div>

            {/* Event Start Time Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Time
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
                {...registerUpdate("start_at", {
                  required: "Start time is required",
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {updateErrors.start_at && (
                <p className="text-red-500 text-sm">
                  {updateErrors.start_at.message}
                </p>
              )}
            </div>

            {/* Event End Time Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Time
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
                {...registerUpdate("end_at", {
                  required: "End time is required",
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {updateErrors.end_at && (
                <p className="text-red-500 text-sm">
                  {updateErrors.end_at.message}
                </p>
              )}
            </div>

            {/* Event Location Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                defaultValue={selectedEvent?.location}
                {...registerUpdate("location", {
                  required: "Location is required",
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {updateErrors.location && (
                <p className="text-red-500 text-sm">
                  {updateErrors.location.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Event
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Event Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Event"
      >
        <div className="flex flex-col gap-4">
          <p>Are you sure you want to delete this event?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="border-2 border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteEvent}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Reject Event Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => {
          setIsRejectModalOpen(false);
          setRejectReason("");
        }}
        title={`Reject Event ${
          rejectType === "create" ? "Creation" : "Update"
        }`}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rejection Reason *
            </label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Please provide a reason for rejection..."
              className="w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-red-500 focus:ring-red-500 text-black px-2"
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setIsRejectModalOpen(false);
                setRejectReason("");
              }}
              className="border-2 border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={
                rejectType === "create"
                  ? handleRejectCreateEvent
                  : handleRejectUpdateEvent
              }
              disabled={!rejectReason.trim()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reject
            </button>
          </div>
        </div>
      </Modal>

      {/* Approve Creation Modal */}
      <Modal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        title="Approve Event Creation"
      >
        <div className="flex flex-col gap-4">
          <p>Are you sure you want to approve this event creation?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsApproveModalOpen(false)}
              className="border-2 border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                setIsApproveModalOpen(false);
                await handleApproveCreateEvent();
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Approve
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

export default EventsPage;
