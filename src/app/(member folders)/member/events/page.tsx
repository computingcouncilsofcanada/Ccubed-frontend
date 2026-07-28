"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import {
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  approveCreateEvent,
  rejectCreateEvent,
  approveUpdateEvent,
  rejectUpdateEvent,
} from "@/services/useApiAuth";
import { useForm } from "react-hook-form";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { DataTable } from "@/components/data-table/data-table";
import { getErrMsg } from "@/utils/errorMessage";
import { formatDate } from "@/utils/dateUtils";
import {
  ApiEvent,
  Event,
  EventForm,
  Events as DisplayEvent,
} from "@/types/events";
import { transformApiEvents } from "@/app/events/utils/eventsApi";
import PreviewModal from "@/components/modals/PreviewModal";
import EventStats from "./components/stats/EventStats";
import EmptyEventsState from "./components/EmptyEventsState";
import PaginationControls from "./components/PaginationControls";
import { createEventTableColumns } from "./components/EventTableColumns";
import UpdateEventModal from "./components/modals/UpdateEventModal";
import DeleteEventModal from "./components/modals/DeleteEventModal";
import RejectEventModal from "./components/modals/RejectEventModal";
import ApproveEventModal from "./components/modals/ApproveEventModal";
import StatsRow from "./components/StatsRow";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";
import Image from "next/image";

function EventsPage() {
  const { user } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [, setError] = useState<string>("");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [previewEvent, setPreviewEvent] = useState<DisplayEvent | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isApproveUpdateModalOpen, setIsApproveUpdateModalOpen] =
    useState(false);
  const [rejectType, setRejectType] = useState<"create" | "update">("create");

  const [page, setPage] = useState(1);
  const limit = 10;
  const router = useRouter();

  const fetchEvents = useCallback(async () => {
    try {
      const offset = (page - 1) * limit;
      const res = await getAllEvents(limit, offset);
      setEvents(res.data);
    } catch (err: unknown) {
      setError(getErrMsg(err));
    }
  }, [page]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleUpdateEvent = async (data: EventForm, newFiles: File[]) => {
    if (!selectedEvent) return;

    // Validate required fields
    if (!data.name?.trim()) {
      alert("Event name is required");
      return;
    }
    if (!data.description?.trim()) {
      alert("Event description is required");
      return;
    }
    if (!data.location?.trim()) {
      alert("Event location is required");
      return;
    }
    if (!data.start_at) {
      alert("Start time is required");
      return;
    }
    if (!data.end_at) {
      alert("End time is required");
      return;
    }
    if (!data.types || data.types.length === 0) {
      alert("Please select at least one event type");
      return;
    }

    try {
      const formData = new FormData();

      // Basic fields
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("location", data.location);

      if (data.registration_link?.trim()) {
        formData.append("registration_link", data.registration_link);
      }

      if (data.url !== undefined) {
        formData.append("url", data.url || "");
      }

      // Arrays - send as JSON arrays
      const learningOutcomes = data.learning_outcomes
        .map((item) => item.value)
        .filter((item) => item.trim() !== "");
      formData.append("learning_outcomes", JSON.stringify(learningOutcomes));

      const whatYouNeed = data.what_you_need
        .map((item) => item.value)
        .filter((item) => item.trim() !== "");
      formData.append("what_you_need", JSON.stringify(whatYouNeed));

      const instructors = data.instructors
        .map((item) => item.value)
        .filter((item) => item.trim() !== "");
      formData.append("instructors", JSON.stringify(instructors));

      // Types
      if (data.types && data.types.length > 0) {
        data.types.forEach((type) => {
          formData.append("types", type);
        });
      }

      const ownership =
        typeof data.ownership === "string"
          ? (data.ownership as string)
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : data.ownership || [];
      formData.append(
        "ownership",
        ownership.length > 0 ? ownership.join(",") : " ",
      );

      const domains =
        typeof data.domains === "string"
          ? (data.domains as string)
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : data.domains || [];
      formData.append("domains", domains.length > 0 ? domains.join(",") : " ");

      // Files
      const keptIds = data.existingFileIds || [];
      if (keptIds.length > 0) {
        formData.append("existingFileIds", keptIds.join(","));
      }
      newFiles.forEach((file) => formData.append("file", file));

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
          const customDates =
            typeof multipleDaysValue === "string"
              ? (multipleDaysValue as string)
                  .split("\n")
                  .filter((d: string) => d.trim())
                  .map((d: string) => d.trim())
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

      const res = await updateEvent(selectedEvent.id.toString(), formData);
      setIsUpdateModalOpen(false);
      await fetchEvents();
      alert(res.message || "Event updated successfully!");
    } catch (err: unknown) {
      const errorMsg = getErrMsg(err);
      const axiosError = err as any;
      const responseData = axiosError?.response?.data;

      // Try to extract specific validation error from backend
      let displayMessage = errorMsg;
      if (responseData?.error) {
        displayMessage = responseData.error;
      } else if (responseData?.message) {
        displayMessage = responseData.message;
      } else if (responseData?.errors) {
        displayMessage = JSON.stringify(responseData.errors);
      }

      alert(`Validation failed: ${displayMessage}`);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;

    try {
      const res = await deleteEvent(selectedEvent.id.toString());
      if (res.status === 200) {
        alert(res.message);
        setIsDeleteModalOpen(false);
        await fetchEvents();
      }
    } catch (err: unknown) {
      alert(getErrMsg(err));
    }
  };

  const handleApproveCreateEvent = async () => {
    if (!selectedEvent) return;
    try {
      const res = await approveCreateEvent(selectedEvent.id.toString());
      if (res.status === 200) {
        alert(res.message);
        setIsApproveModalOpen(false);
        await fetchEvents();
      }
    } catch (err: unknown) {
      alert(getErrMsg(err));
    }
  };

  const handleRejectCreateEvent = async (reason: string) => {
    if (!selectedEvent) return;
    try {
      const res = await rejectCreateEvent(selectedEvent.id.toString(), reason);
      if (res.status === 200) {
        alert(res.message);
        setIsRejectModalOpen(false);
        await fetchEvents();
      }
    } catch (err: unknown) {
      alert(getErrMsg(err));
    }
  };

  const handleApproveUpdateEvent = async () => {
    if (!selectedEvent) return;
    try {
      const res = await approveUpdateEvent(selectedEvent.id.toString());
      if (res.status === 200) {
        alert(res.message);
        setIsApproveUpdateModalOpen(false);
        await fetchEvents();
      }
    } catch (err: unknown) {
      alert(getErrMsg(err));
    }
  };

  const handleRejectUpdateEvent = async (reason: string) => {
    if (!selectedEvent) return;
    try {
      const res = await rejectUpdateEvent(selectedEvent.id.toString(), reason);
      if (res.status === 200) {
        alert(res.message);
        setIsRejectModalOpen(false);
        await fetchEvents();
      }
    } catch (err: unknown) {
      alert(getErrMsg(err));
    }
  };

  const openModal = (
    event: Event | null,
    type:
      | "create"
      | "preview"
      | "update"
      | "delete"
      | "approve-create"
      | "reject-create"
      | "approve-update"
      | "reject-update"
      | "preview-update",
  ) => {
    setSelectedEvent(event);
    switch (type) {
      case "preview":
        if (event) {
          const [transformed] = transformApiEvents([
            event as unknown as ApiEvent,
          ]);
          setPreviewEvent(transformed);
        }
        break;
      case "create":
        router.push("/member/events/create");
        break;
      case "update":
        if (event) {
          getEventById(event.id.toString())
            .then((res) => {
              setSelectedEvent(res.data ?? res);
              setIsUpdateModalOpen(true);
            })
            .catch(() => {
              setIsUpdateModalOpen(true);
            });
        } else {
          setIsUpdateModalOpen(true);
        }
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
        setIsApproveUpdateModalOpen(true);
        break;
      case "preview-update":
        // Show the staged changes (pending_update) merged over the live event
        // so approvers can see exactly what they would be approving.
        if (event) {
          getEventById(event.id.toString())
            .then((res) => {
              const full = (res.data ?? res) as ApiEvent;
              const merged = {
                ...full,
                ...(full.pending_update ?? {}),
                id: full.id,
              } as ApiEvent;
              setPreviewEvent(transformApiEvents([merged])[0]);
            })
            .catch((err) => {
              setError(getErrMsg(err));
            });
        }
        break;
      case "reject-update":
        setRejectType("update");
        setIsRejectModalOpen(true);
        break;
    }
  };

  if (!user) {
    return null;
  }

  const columns = createEventTableColumns(openModal);

  return (
    <div className="min-h-screen  text-white p-6">
      {/* Liquid Glass Container */}
      <div
        className="relative rounded-3xl p-8"
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(28px) saturate(120%)",
          WebkitBackdropFilter: "blur(28px) saturate(120%)",
          borderRadius: "22px",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          boxShadow: `
    0 20px 40px rgba(0,0,0,0.18),
    inset 0 1px 0 rgba(255,255,255,0.6),
    inset 0 -1px 0 rgba(255,255,255,0.15)
  `,
        }}
      >
        {/* Subtle top glare */}
        <div
          className="absolute top-0 left-6 right-6 h-px rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <Image
                src="/FigmaFiles/ccubed-icon.svg"
                alt="CCubed Icon"
                width={30}
                height={30}
                draggable={false}
                className="select-none"
              />
              Events
            </h1>

            <p className="text-slate-400">Manage and review all events</p>
          </div>
          <div className="flex items-center gap-6">
            <StatsRow />
            <Link
              href="/member/events/create"
              style={{ backgroundColor: "#FAA336" }}
              className="px-6 py-3 text-black rounded-3xl hover:opacity-90 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <IconPlus size={20} />
              Create New Event
            </Link>
          </div>
        </div>

        {/* Events Table */}
        {events.length === 0 ? (
          <EmptyEventsState />
        ) : (
          <>
            <EventStats key={events.length} />

            <DataTable
              columns={columns}
              data={events}
              headerVariant="purple"
              sort={true}
            />
            <PaginationControls
              page={page}
              onPageChange={setPage}
              hasNextPage={events.length >= limit}
            />
          </>
        )}
      </div>

      {/* Modals */}
      <UpdateEventModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
        }}
        selectedEvent={selectedEvent}
        onSubmit={handleUpdateEvent}
        onSubmitSuccess={() => {
          setIsUpdateModalOpen(false);
        }}
      />

      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteEvent}
      />

      <RejectEventModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={
          rejectType === "create"
            ? handleRejectCreateEvent
            : handleRejectUpdateEvent
        }
        rejectType={rejectType}
      />

      <ApproveEventModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={handleApproveCreateEvent}
      />

      <ApproveEventModal
        isOpen={isApproveUpdateModalOpen}
        onClose={() => setIsApproveUpdateModalOpen(false)}
        onConfirm={handleApproveUpdateEvent}
        title="Approve Event Update"
        message="Are you sure you want to approve this event update?"
      />

      <PreviewModal
        isOpen={!!previewEvent}
        onClose={() => setPreviewEvent(null)}
        event={previewEvent}
        onInvite={(url) => {
          if (url) window.open(url, "_blank", "noopener,noreferrer");
        }}
      />
    </div>
  );
}

export default EventsPage;
