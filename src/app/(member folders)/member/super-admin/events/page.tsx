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
import { useForm } from "react-hook-form";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { DataTable } from "@/components/data-table/data-table";
import { getErrMsg } from "@/utils/errorMessage";
import { Event, EventForm } from "@/types/events";
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
  const { user, isLoading } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [, setError] = useState<string>("");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
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
  }, [page]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleUpdateEvent = async (data: EventForm) => {
    if (!selectedEvent) return;

    try {
      const res = await updateEvent(selectedEvent.id.toString(), {
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
      const res = await deleteEvent(selectedEvent.id.toString());
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
      const res = await approveCreateEvent(selectedEvent.id.toString());
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
      console.error("Error rejecting event creation:", err);
      alert(getErrMsg(err));
    }
  };

  const handleApproveUpdateEvent = async () => {
    if (!selectedEvent) return;
    try {
      const res = await approveUpdateEvent(selectedEvent.id.toString());
      if (res.status === 200) {
        alert(res.message);
        await fetchEvents();
      }
    } catch (err: unknown) {
      console.error("Error approving event update:", err);
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
      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
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
    href="/member/super-admin/events/create"
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
          resetUpdate();
        }}
        selectedEvent={selectedEvent}
        register={registerUpdate}
        handleSubmit={handleUpdateSubmit}
        onSubmit={handleUpdateEvent}
        errors={updateErrors}
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
    </div>
  );
}

export default EventsPage;
