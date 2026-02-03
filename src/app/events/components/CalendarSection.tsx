"use client";

import React, { useMemo, useState, useCallback } from "react";
import { Events as EventItem } from "@/types/events";
import { MonthYearPickerModal } from "./MonthYearPickerModal";

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

  // Fill out the rest of the grid to 4x7 = 28 cells
  while (grid.length < 28) {
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
  onEventClick?: (event: EventItem) => void;
};

export function CalendarSection({
  events,
  onEventClick,
}: CalendarSectionProps) {
  // State for selected month/year
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const { year: targetYear, month: targetMonthIndex } = selectedDate;

  const grid = useMemo(
    () => getMonthGrid(targetYear, targetMonthIndex),
    [targetYear, targetMonthIndex]
  );

  const monthLabel = useMemo(
    () =>
      new Date(targetYear, targetMonthIndex, 1).toLocaleDateString(undefined, {
        month: "long",
      }),
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

  // Handle event click
  // Handle event click — notify parent (events page) to open preview modal
  const handleEventClick = useCallback(
    (event: CalendarEvent) => {
      onEventClick?.(event.originalEvent);
    },
    [onEventClick]
  );

  // Month navigation handlers
  const handlePrevMonth = () => {
    setSelectedDate((prev) => {
      let newMonth = prev.month - 1;
      let newYear = prev.year;
      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }
      return { year: newYear, month: newMonth };
    });
  };
  const handleNextMonth = () => {
    setSelectedDate((prev) => {
      let newMonth = prev.month + 1;
      let newYear = prev.year;
      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }
      return { year: newYear, month: newMonth };
    });
  };

  const handleGoToToday = useCallback(() => {
    const now = new Date();
    setSelectedDate({ year: now.getFullYear(), month: now.getMonth() });
  }, []);

  const handleMonthYearSelect = useCallback(
    (newMonth: number, newYear: number) => {
      setSelectedDate({ year: newYear, month: newMonth });
    },
    []
  );

  const isCurrentMonth =
    targetYear === new Date().getFullYear() &&
    targetMonthIndex === new Date().getMonth();
  return (
    <div className="max-w-6xl w-full mx-auto px-2 relative z-10 mt-8">
      {/* Calendar header */}
      <div className="mb-2 text-white font-roboto tracking-normal">
        {/* Main title */}
        <h2 className="text-2xl leading-tight font-semibold mb-0 tracking-normal md:mb-1">
          Calendar
        </h2>

        {/* Description and month row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-3">
          <div className="max-w-2xl">
            <p className="text-sm font-light leading-[18px]">
              Plan ahead with CCubed: learn, connect, and take your next step.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="w-full sm:w-auto text-xl leading-none font-semibold flex items-center gap-2">
              <button
                aria-label="Previous Month"
                onClick={handlePrevMonth}
                className="shrink-0 px-2 py-2 sm:px-1 sm:py-0.5 rounded hover:bg-white/10 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0"
                type="button"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline
                    points="13,4 7,10 13,16"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsPickerOpen(true)}
                type="button"
                aria-label="Select month and year"
                className="group flex-1 min-w-[160px] sm:min-w-[200px] flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                <span className="text-lg sm:text-xl font-semibold whitespace-nowrap truncate">
                  {monthLabel} {targetYear}
                </span>
                <svg
                  className="w-4 h-4 text-white/60 group-hover:text-white transition-colors shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <button
                aria-label="Next Month"
                onClick={handleNextMonth}
                className="shrink-0 px-2 py-2 sm:px-1 sm:py-0.5 rounded hover:bg-white/10 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0"
                type="button"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline
                    points="7,4 13,10 7,16"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            {!isCurrentMonth && (
              <button
                onClick={handleGoToToday}
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#0B1820] bg-[#FAA336] hover:bg-[#e8922a] shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-roboto"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="hidden xs:inline">Go to</span> Today
              </button>
            )}
          </div>
        </div>
      </div>

      <MonthYearPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        currentMonth={targetMonthIndex}
        currentYear={targetYear}
        onSelect={handleMonthYearSelect}
      />

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-1 text-white mb-0 font-roboto text-xs font-light">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
          <div key={d} className="px-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {grid.map((cell, idx) => {
          // Check if this cell represents today
          const today = new Date();
          const isToday = cell.date.toDateString() === today.toDateString();

          return (
            <div
              key={`${cell.iso}-${idx}`}
              className={[
                "relative rounded-xl backdrop-blur-md",
                isToday ? "ring-2 ring-white" : "", // White border for current day
                "min-h-[36px] sm:min-h-[48px] md:min-h-[64px] lg:min-h-[80px] p-0.5 sm:p-1 md:p-1 ",
              ].join(" ")}
            >
              <div
                className={[
                  "mb-3 md:mb-4",
                  "text-white ",
                  cell.inCurrentMonth ? "text-white" : "text-white/40",
                  "text-xs sm:text-sm md:text-base lg:text-lg font-medium font-roboto ",
                ].join(" ")}
              >
                {cell.date.getDate().toString().padStart(2, "0")}
              </div>
              <div
                className={[
                  "space-y-2",
                  (eventsByIso.get(cell.iso)?.length ?? 0) > 0
                    ? " bg-[#D4D4D4]/10 rounded-lg p-1"
                    : "",
                ].join(" ")}
              >
                {(eventsByIso.get(cell.iso) || []).map((evt) => (
                  <div
                    key={evt.id}
                    className="p-2 cursor-pointer rounded-lg transition-colors group hover:bg-white/10"
                    onClick={() => handleEventClick(evt)}
                  >
                    <div
                      className="text-white text-xs font-medium md:text-xs leading-tight truncate max-w-full"
                      title={evt.title}
                    >
                      {evt.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarSection;
