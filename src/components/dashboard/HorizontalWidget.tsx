"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllEvents } from "@/services/useApiAuth";
import { transformApiEvents } from "@/app/events/utils/eventsApi";
import { ApiEvent } from "@/types/events";
import { Events } from "@/types/events";

export const HorizontalWidget = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);

  const fetchUpcomingEvents = useCallback(async () => {
    try {
      const res = await getAllEvents(100, 0);
      const rawEvents = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
          ? res.data
          : res?.data?.data ?? [];
      const apiEvents = rawEvents as ApiEvent[];
      const events = transformApiEvents(apiEvents) as Events[];
      const now = Date.now();

      const upcoming = events
        .filter((e) => {
          const endAt = e.end_at ? parseInt(e.end_at, 10) : 0;
          return !isNaN(endAt) && endAt >= now;
        })
        .slice(0, 10)
        .map((e) => ({
          title: e.name,
          description: e.description || "",
          date: e.date || "TBD",
          time: e.time || "TBD",
          location: e.location || "TBD",
        }));

      setUpcomingEvents(upcoming);
    } catch (err) {
      console.error("Error fetching upcoming events:", err);
      setUpcomingEvents([]);
    }
  }, []);

  useEffect(() => {
    fetchUpcomingEvents();
  }, [fetchUpcomingEvents]);

  return (
    <div className="flex flex-col gap-4 h-full min-h-0 overflow-hidden">
      <div className="flex-shrink-0 flex justify-between">
        <div className="flex gap-3 items-center">
          <div
            className="cursor-pointer w-12 h-12 flex items-center justify-center flex-none overflow-hidden border-2 border-white/10 backdrop-blur-sm bg-[#D4D4D4]/4 shadow-2xl rounded-xl [&>svg]:flex-none"
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              aspectRatio: "1",
            }}
          >
            <svg
              className="w-6 h-6 text-white flex-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-xl font-bold">Upcoming Events</p>
            <p>{upcomingEvents.length} events happening this month</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <div
            className="cursor-pointer w-10 h-10 flex items-center justify-center flex-none overflow-hidden border-2 border-white/10 backdrop-blur-sm bg-[#D4D4D4]/4 shadow-2xl rounded-full [&>svg]:flex-none"
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              aspectRatio: "1",
            }}
          >
            <svg
              className="w-5 h-5 text-white flex-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <div
            className="cursor-pointer w-10 h-10 flex items-center justify-center flex-none overflow-hidden border-2 border-white/10 backdrop-blur-sm bg-[#D4D4D4]/4 shadow-2xl rounded-full [&>svg]:flex-none"
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              aspectRatio: "1",
            }}
          >
            <svg
              className="w-5 h-5 text-white flex-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H9M17 7V15" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden preview-modal-scroll">
        <div className="flex flex-col gap-4">
          {upcomingEvents.map((event, index) => (
            <UpcomingEventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

type UpcomingEvent = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
};

const UpcomingEventCard = ({ event }: { event: UpcomingEvent }) => {
  return (
    <div className="rounded-4xl p-3 bg-[#D4D4D4]/10 border-2 border-white/10 shadow-2xl">
      <div className="flex justify-evenly gap-4">
        <div className="flex-3 min-w-0 flex flex-col gap-0.5">
          <p className="font-semibold">{event.title}</p>
          <p className="text-sm text-white/80 truncate">{event.description}</p>
        </div>
        <div className="flex-2 flex flex-col gap-0.5 items-center text-lg font-bold  shrink-0">
          <span className="flex items-center gap-1.5">
            <CalendarIcon />
            {event.date}
          </span>
          <span className="flex items-center gap-1.5">
            <ClockIcon />
            {event.time}
          </span>
        </div>
        <div className="flex-2 flex items-center gap-1.5 text-lg shrink-0 font-bold">
          <MapPinIcon />
          {event.location}
        </div>
      </div>
    </div>
  );
};

const CalendarIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

