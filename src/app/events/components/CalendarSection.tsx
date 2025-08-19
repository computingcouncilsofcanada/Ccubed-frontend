"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Events as EventItem } from "@/types/events";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import PreviewModal from "@/components/modals/PreviewModal";

type CalendarEvent = {
  id: string | number;
  title: string;
  date: string; // ISO date (YYYY-MM-DD)
  time?: string;
  subtitle?: string;
  originalEvent: EventItem; // Store reference to original event for modal
};

type DayCell = {
  date: Date;
  inCurrentMonth: boolean;
  iso: string;
};

function formatMonthYear(date: Date) {
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

function getMonthGrid(year: number, monthIndexZeroBased: number): DayCell[] {
  const firstOfMonth = new Date(year, monthIndexZeroBased, 1);
  const lastOfMonth = new Date(year, monthIndexZeroBased + 1, 0);

  // Monday-start calendar: convert JS getDay() (0 = Sun) to 0 = Mon
  const jsWeekday = firstOfMonth.getDay();
  const mondayStartIndex = (jsWeekday + 6) % 7; // 0..6 with 0=Mon

  const daysInMonth = lastOfMonth.getDate();

  const grid: DayCell[] = [];

  // Days from previous month to fill the first row
  for (let i = 0; i < mondayStartIndex; i++) {
    const date = new Date(
      year,
      monthIndexZeroBased,
      -(mondayStartIndex - 1 - i)
    );
    const iso = date.toISOString().slice(0, 10);
    grid.push({ date, inCurrentMonth: false, iso });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, monthIndexZeroBased, day);
    const iso = date.toISOString().slice(0, 10);
    grid.push({ date, inCurrentMonth: true, iso });
  }

  // Fill remaining cells to complete a 6x7 grid (42 cells)
  while (grid.length % 7 !== 0) {
    const nextDate = new Date(
      year,
      monthIndexZeroBased + 1,
      grid.length - (mondayStartIndex + daysInMonth) + 1
    );
    const iso = nextDate.toISOString().slice(0, 10);
    grid.push({ date: nextDate, inCurrentMonth: false, iso });
  }
  while (grid.length < 42) {
    const last = grid[grid.length - 1].date;
    const date = new Date(last);
    date.setDate(last.getDate() + 1);
    const iso = date.toISOString().slice(0, 10);
    grid.push({ date, inCurrentMonth: false, iso });
  }

  return grid;
}

type CalendarSectionProps = {
  events: EventItem[];
};

export function CalendarSection({ events }: CalendarSectionProps) {
  // State for selected month/year
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const { year: targetYear, month: targetMonthIndex } = selectedDate;

  const monthPrefix = `${targetYear}-${String(targetMonthIndex + 1).padStart(
    2,
    "0"
  )}`;

  const grid = useMemo(
    () => getMonthGrid(targetYear, targetMonthIndex),
    [targetYear, targetMonthIndex]
  );

  const monthLabel = useMemo(
    () => formatMonthYear(new Date(targetYear, targetMonthIndex, 1)),
    [targetYear, targetMonthIndex]
  );

  const calendarEvents: CalendarEvent[] = useMemo(() => {
    // Get the first and last visible dates on the calendar grid
    const firstVisibleDate = grid[0]?.date;
    const lastVisibleDate = grid[grid.length - 1]?.date;

    if (!firstVisibleDate || !lastVisibleDate) return [];

    // Convert to ISO strings for comparison
    const firstVisibleISO = firstVisibleDate.toISOString().slice(0, 10);
    const lastVisibleISO = lastVisibleDate.toISOString().slice(0, 10);

    return (events || [])
      .filter((e) => {
        if (typeof e.date !== "string") return false;

        // Include events that fall within the visible calendar range
        // This includes events from previous/next months that are visible on the grid
        return e.date >= firstVisibleISO && e.date <= lastVisibleISO;
      })
      .map((e) => ({
        id: e.id,
        title: e.name,
        date: e.date,
        time: e.time,
        subtitle:
          e.types && e.types.length > 0 ? `${e.types[0]} Event` : "Event",
        originalEvent: e, // Store reference to original event
      }));
  }, [events, grid]);

  const eventsByIso = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const evt of calendarEvents) {
      const iso = evt.date;
      if (!map.has(iso)) map.set(iso, []);
      map.get(iso)!.push(evt);
    }
    return map;
  }, [calendarEvents]);

  // Navigation functions
  const goToPreviousMonth = () => {
    setSelectedDate((prev) => {
      if (prev.month === 0) {
        return { year: prev.year - 1, month: 11 };
      }
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  const goToNextMonth = () => {
    setSelectedDate((prev) => {
      if (prev.month === 11) {
        return { year: prev.year + 1, month: 0 };
      }
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  const goToCurrentMonth = () => {
    const now = new Date();
    setSelectedDate({ year: now.getFullYear(), month: now.getMonth() });
  };

  // Handle event click
  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event.originalEvent);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-5 relative z-10 mt-5">
      {/* Calendar header */}
      <div className="flex items-end justify-between mb-2">
        <h2 className="text-white text-[32px] md:text-[40px] leading-tight font-extrabold">
          Calendar
        </h2>
        <div className="flex items-center gap-4">
          {/* Month navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousMonth}
              className="p-2 text-white hover:text-white/80 transition-colors"
              aria-label="Previous month"
            >
              <IconChevronLeft size={24} />
            </button>
            <div className="text-white text-2xl md:text-[28px] font-extrabold min-w-[200px] text-center">
              {monthLabel}
            </div>
            <button
              onClick={goToNextMonth}
              className="p-2 text-white hover:text-white/80 transition-colors"
              aria-label="Next month"
            >
              <IconChevronRight size={24} />
            </button>
          </div>
          {/* Current month button */}
          <button
            onClick={goToCurrentMonth}
            className="px-3 py-1 text-white text-sm border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
          >
            Today
          </button>
        </div>
      </div>
      <p className="text-white text-sm mb-6 max-w-3xl">
        Lorem ipsum dolor sit amet consectetur. Ac malesuada sagittis mollis
        ullamcorper blandit.
      </p>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-3 text-white text-xs mb-3">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
          <div key={d} className="px-2">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-3">
        {grid.map((cell, idx) => {
          // Check if this cell represents today
          const today = new Date();
          const isToday = cell.date.toDateString() === today.toDateString();

          return (
            <div
              key={`${cell.iso}-${idx}`}
              className={[
                "relative rounded-2xl backdrop-blur-md",
                (eventsByIso.get(cell.iso) || []).length > 0
                  ? "bg-white/5"
                  : "bg-transparent",
                isToday ? "ring-2 ring-white" : "", // White border for current day
                "min-h-[120px] md:min-h-[160px] p-1 md:p-2",
              ].join(" ")}
            >
              <div
                className={[
                  "mb-3 md:mb-4",
                  "text-white ",
                  cell.inCurrentMonth ? "text-white" : "text-white/40",
                  "text-lg md:text-2xl font-semibold",
                ].join(" ")}
              >
                {cell.date.getDate().toString().padStart(2, "0")}
              </div>
              <div className="space-y-2">
                {(eventsByIso.get(cell.iso) || []).map((evt) => (
                  <div
                    key={evt.id}
                    className="p-2 cursor-pointer hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => handleEventClick(evt)}
                    title="Click to view event details"
                  >
                    <div className="text-white text-sm md:text-base font-semibold leading-tight">
                      {evt.title}
                    </div>
                    <div className="text-white/60 text-[10px] md:text-xs leading-tight">
                      {evt.subtitle}
                    </div>
                    {evt.time && (
                      <div className="text-white/60 text-[10px] md:text-xs leading-tight mt-1">
                        {evt.time}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <PreviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
      />
    </div>
  );
}

export default CalendarSection;
