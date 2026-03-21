"use client";

import { useCallback, useEffect, useState } from "react";
import { useApiEvent } from "@/services/useApiEvent";
import { EventStats } from "@/types/events";
import { IconCalendar, IconCheck, IconX, IconClock } from "@tabler/icons-react";

export default function StatCardRow() {
  const { getEventStats } = useApiEvent();
  const [stats, setStats] = useState<EventStats | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const response = await getEventStats();
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching event stats:", error);
    }
  }, [getEventStats]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (!stats) return null;

  const items = [
    { label: "Total Events", value: stats.total_events, icon: IconCalendar },
    { label: "Approved", value: stats.total_approved_events, icon: IconCheck },
    { label: "Rejected", value: stats.total_rejected_events, icon: IconX },
    { label: "Pending", value: stats.total_pending_events, icon: IconClock },
  ];

  return (
    <div className="flex items-center gap-6">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg bg-[#2a2d35] flex items-center justify-center flex-shrink-0"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                <Icon size={13} className="text-slate-300" />
              </div>
              <span
                className="text-6xl text-white leading-none tracking-tight"
                style={{ fontWeight: 300 }}
              >
                {item.value}
              </span>
            </div>
            <span className="text-xs text-slate-400 tracking-wide">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}