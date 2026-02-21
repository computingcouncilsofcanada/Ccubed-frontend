"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  approveCreateEvent,
  rejectCreateEvent,
  approveUpdateEvent,
  rejectUpdateEvent,
} from "@/services/useApiAuth";
import Modal from "@/components/modals/Modal";
import PreviewModal from "@/components/modals/PreviewModal";
import { useForm } from "react-hook-form";

type Event = {
  id: string;
  name: string;
  description: string;
  start_at: string;
  end_at: string;
  location: string;
  images: string | null;
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

type PreviewEvent = {
  id: number;
  name: string;
  description: string;
  status: number;
  date: string;
  time: string;
  location: string;
  images: string;
  files: Array<{
    id: string;
    name: string;
    url: string;
  }>;
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
  const [, setError] = useState<string>(""); // keep setter only (avoids unused var error)

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const typeOptions = ["Online", "In Person"];
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectType, setRejectType] = useState<"create" | "update">("create");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [previewEvent, setPreviewEvent] = useState<PreviewEvent | null>(null);

  const [page, setPage] = useState(1);
  const limit = 10;
  const router = useRouter();

  const {
    register: registerCreate,
    handleSubmit: handleCreateSubmit,
    reset: resetCreate,
    watch: watchCreate,
    formState: { errors: createErrors },
  } = useForm<EventForm>();

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    reset: resetUpdate,
    formState: { errors: updateErrors },
  } = useForm<EventForm>();

  const createFormValues = watchCreate();

  const createPreviewEvent = (formData: EventForm): PreviewEvent => {
    const name = formData.name || "Event Name";
    const description =
      formData.description || "Event description will appear here...";
    const location = formData.location || "Location TBD";

    let date = "Date TBD";
    let time = "Time TBD";

    if (formData.start_at && formData.end_at) {
      try {
        const startDate = new Date(formData.start_at);
        const endDate = new Date(formData.end_at);

        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          date = startDate.toLocaleDateString();
          time = `${startDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} - ${endDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`;
        }
      } catch (error) {
        console.error("Error parsing dates:", error);
      }
    }

    const typesToShow = selectedTypes;

    return {
      id: 0,
      name,
      description,
      status: 1,
      date,
      time,
      location,
      images: "",
      files:
        formData.images && formData.images.length > 0
          ? [
              {
                id: "1",
                name: formData.images[0].name,
                url: URL.createObjectURL(formData.images[0]),
              },
            ]
          : [],
      types: typesToShow,
    };
  };

  const handlePreviewEvent = () => {
    const previewData = createPreviewEvent(createFormValues);
    setPreviewEvent(previewData);
    setIsPreviewModalOpen(true);
  };

  const fetchEvents = async () => {
    try {
      const offset = (page - 1) * limit;
      const res = await getAllEvents(limit, offset);
      setEvents(res.data);
    } catch (err: unknown) {
      setError(getErrMsg(err));
      console.log(err);
    }
  };

  // Fetch events when page changes
  useEffect(() => {
    fetchEvents();
  }, [page]); // warning about deps is fine; fixing errors only

  const handleCreateEvent = async (data: EventForm) => {
    if (selectedTypes.length === 0) {
      alert("Please select at least one event type.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("start_at", new Date(data.start_at).getTime().toString());
      formData.append("end_at", new Date(data.end_at).getTime().toString());
      formData.append("location", data.location);
      if (data.images?.[0]) {
        formData.append("file", data.images[0]);
      }

      const typesToSubmit = selectedTypes;
      formData.append("types", typesToSubmit.join(","));

      const res = await createEvent(formData);
      setIsCreateModalOpen(false);
      resetCreate();
      setSelectedTypes([]);
      if (res.status === 201) {
        alert(res.message);
        await fetchEvents();
      }
    } catch (err: unknown) {
      console.error("Error creating event:", err);
      alert(getErrMsg(err));
    }
  };

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
        setIsCreateModalOpen(true);
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
      } else if (user.role !== "STAFF" && user.role !== "SUPER_ADMIN") {
        router.push("/member");
      }
    }
  }, [user, isLoading, router]);

  if (!user || (user.role !== "STAFF" && user.role !== "SUPER_ADMIN")) {
    return null;
  }

  return (
    <div className="flex mt-10 gap-3 flex-col">
      {/* Page Title */}
      <h1 className="text-3xl text-center w-full text-white">Events</h1>

      {/* Create Event Button */}
      <div className="flex justify-end px-5">
        <button
          onClick={() => openModal(null, "create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New Event
        </button>
      </div>

      {/* Events Grid Display */}
      <div className="grid grid-cols-3 gap-5 p-5">
        {events.map((event) => (
          <div
            key={event.id}
            className="border-2 border-blue-200 p-4 text-white "
          >
            {/* Event Details */}
            <h1 className="font-bold ">Event Name: {event.name}</h1>
            <h1 className="">Description: {event.description}</h1>
            <h1 className="">
              Start: {new Date(parseInt(event.start_at)).toLocaleString()}
            </h1>
            <h1>Types: {event.types.join(", ")}</h1>
            <h1>End: {new Date(parseInt(event.end_at)).toLocaleString()}</h1>
            <h1>Location: {event.location}</h1>
            <h1>Pending action: {event.pending_action}</h1>
            <h1>Status: {event.status}</h1>
            <h1 className="">
              Created At:{" "}
              {new Date(parseInt(event.created_at)).toLocaleDateString()}
            </h1>
            <h1 className="">Created By: {event.created_by}</h1>
            {event.updated_at && (
              <h1 className="">
                Last Updated:{" "}
                {new Date(parseInt(event.updated_at)).toLocaleDateString()}
              </h1>
            )}
            {/* Event Image Display */}
            {event.images && (
              <div className="mt-2">
                <img
                  src={event.images}
                  alt={`${event.name} image`}
                  className="w-20 h-20 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            {/* Event Action Buttons */}
            <div className="flex flex-col gap-2 mt-2">
              <button
                className="border-2 border-blue-400 px-2 py-1 w-auto text-blue-300 hover:bg-blue-900 hover:text-blue-100 rounded"
                onClick={() => openModal(event, "update")}
              >
                Update Event
              </button>
              <button
                className="border-2 border-red-400 px-2 py-1 w-auto text-red-300 hover:bg-red-900 hover:text-red-100 rounded"
                onClick={() => openModal(event, "delete")}
              >
                Delete Event
              </button>

              {/* Approval/Rejection buttons based on pending_action */}
              {event.pending_action === "create" && (
                <>
                  <button
                    className="border-2 border-green-400 px-2 py-1 w-auto bg-green-900 text-green-300 hover:bg-green-800 hover:text-green-100 rounded"
                    onClick={() => openModal(event, "approve-create")}
                  >
                    Approve Creation
                  </button>
                  <button
                    className="border-2 border-orange-400 px-2 py-1 w-auto bg-orange-900 text-orange-300 hover:bg-orange-800 hover:text-orange-100 rounded"
                    onClick={() => openModal(event, "reject-create")}
                  >
                    Reject Creation
                  </button>
                </>
              )}

              {event.pending_action === "update" && (
                <>
                  <button
                    className="border-2 border-green-400 px-2 py-1 w-auto bg-green-900 text-green-300 hover:bg-green-800 hover:text-green-100 rounded"
                    onClick={() => openModal(event, "approve-update")}
                  >
                    Approve Update
                  </button>
                  <button
                    className="border-2 border-orange-400 px-2 py-1 w-auto bg-orange-900 text-orange-300 hover:bg-orange-800 hover:text-orange-100 rounded"
                    onClick={() => openModal(event, "reject-update")}
                  >
                    Reject Update
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="border-2 border-gray-300 px-4 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-1 ">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={events.length < limit}
          className="border-2 border-gray-300 px-4 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Create Event Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetCreate();
          setSelectedTypes([]);
        }}
        title="Create New Event"
      >
        <form onSubmit={handleCreateSubmit(handleCreateEvent)}>
          <div className="flex flex-col gap-4">
            {/* Event Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Name
              </label>
              <input
                type="text"
                {...registerCreate("name", { required: "Name is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {createErrors.name && (
                <p className="text-red-500 text-sm">
                  {createErrors.name.message}
                </p>
              )}
            </div>

            {/* Event Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...registerCreate("description", {
                  required: "Description is required",
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {createErrors.description && (
                <p className="text-red-500 text-sm">
                  {createErrors.description.message}
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
                {...registerCreate("start_at", {
                  required: "Start time is required",
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {createErrors.start_at && (
                <p className="text-red-500 text-sm">
                  {createErrors.start_at.message}
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
                {...registerCreate("end_at", {
                  required: "End time is required",
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {createErrors.end_at && (
                <p className="text-red-500 text-sm">
                  {createErrors.end_at.message}
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
                {...registerCreate("location", {
                  required: "Location is required",
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {createErrors.location && (
                <p className="text-red-500 text-sm">
                  {createErrors.location.message}
                </p>
              )}
            </div>

            {/* Event Types Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Types <span className="text-red-500">*</span>
              </label>

              <div className="flex gap-2">
                {typeOptions.map((type) => (
                  <label key={type} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      value={type}
                      checked={selectedTypes.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTypes((prev) => [...prev, type]);
                        } else {
                          setSelectedTypes((prev) =>
                            prev.filter((t) => t !== type)
                          );
                        }
                      }}
                    />
                    {type}
                  </label>
                ))}
              </div>

              {selectedTypes.length === 0 && (
                <p className="text-red-500 text-sm">
                  Please select at least one event type.
                </p>
              )}
            </div>

            {/* Event Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...registerCreate("images")}
                className="mt-1 block w-full "
              />
            </div>

            {/* Preview Button */}
            <div>
              <button
                type="button"
                onClick={handlePreviewEvent}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200"
              >
                👁️ Preview Event
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={selectedTypes.length === 0}
            >
              Create Event
            </button>
          </div>
        </form>
      </Modal>

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
                defaultValue={selectedEvent?.start_at}
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
                defaultValue={selectedEvent?.end_at}
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
              className="border-2 border-gray-300 px-4 py-2 rounded hover:bg-gray-100
              "
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

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        event={previewEvent}
      />
    </div>
  );
}

export default EventsPage;
