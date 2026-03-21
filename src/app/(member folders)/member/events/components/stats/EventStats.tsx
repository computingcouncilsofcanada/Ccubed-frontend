"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useApiEvent } from "@/services/useApiEvent";
import { EventStats as EventStatsType } from "@/types/events";
import {
  IconCalendar,
  IconCheck,
  IconX,
  IconClock,
  IconTag,
  IconCategory,
  IconTrendingUp,
  IconMapPin,
  IconUsersGroup,
  IconList,
} from "@tabler/icons-react";

export default function EventStats() {
  const { getEventStats } = useApiEvent();
  const [stats, setStats] = useState<EventStatsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getEventStats();
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching event stats:", error);
    } finally {
      setIsLoading(false);
    }
  }, [getEventStats]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (isLoading) {
    return (
      <div className="space-y-6 mb-8">
        {/* Main Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6 animate-pulse"
            >
              <div className="h-4 bg-slate-700 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-slate-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        {/* Breakdown Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6 animate-pulse"
            >
              <div className="h-4 bg-slate-700 rounded w-1/2 mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-slate-700 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  // Calculate totals for domains, types, and locations
  const totalDomains = Object.keys(stats.domains_count).length;
  const totalTypes = Object.keys(stats.types_count).length;
  const totalLocations = Object.keys(stats.locations_count).length;
  const totalDomainsCount = Object.values(stats.domains_count).reduce((sum, count) => sum + count, 0);
  const totalTypesCount = Object.values(stats.types_count).reduce((sum, count) => sum + count, 0);
  const totalLocationsCount = Object.values(stats.locations_count).reduce((sum, count) => sum + count, 0);

  // Get top domains, types, and locations
  const topDomains = Object.entries(stats.domains_count)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
  
  const topTypes = Object.entries(stats.types_count)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const topLocations = Object.entries(stats.locations_count)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const mainStats = [
    {
      label: "Total Events",
      value: stats.total_events,
      icon: IconCalendar,
      gradient: "from-[#FAA336] to-[#F59725]",
      bgGradient: "from-[#FAA336] to-[#F59725]",
      iconBg: "bg-[#FAA336]",
      textColor: "text-[#FAA336]",
      cardBg: "bg-slate-800",
      borderColor: "border-slate-700",
    },
    {
      label: "Approved",
      value: stats.total_approved_events,
      icon: IconCheck,
      gradient: "from-[#FAA336] to-[#F59725]",
      bgGradient: "from-[#FAA336] to-[#F59725]",
      iconBg: "bg-[#FAA336]",
      textColor: "text-[#FAA336]",
      cardBg: "bg-slate-800",
      borderColor: "border-slate-700",
    },
    {
      label: "Rejected",
      value: stats.total_rejected_events,
      icon: IconX,
      gradient: "from-[#FAA336] to-[#F59725]",
      bgGradient: "from-[#FAA336] to-[#F59725]",
      iconBg: "bg-[#FAA336]",
      textColor: "text-[#FAA336]",
      cardBg: "bg-slate-800",
      borderColor: "border-slate-700",
    },
    {
      label: "Pending",
      value: stats.total_pending_events,
      icon: IconClock,
      gradient: "from-[#FAA336] to-[#F59725]",
      bgGradient: "from-[#FAA336] to-[#F59725]",
      iconBg: "bg-[#FAA336]",
      textColor: "text-[#FAA336]",
      cardBg: "bg-slate-800",
      borderColor: "border-slate-700",
    },
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* Main Statistics Cards */}
 
 

      {/* Domains, Types, and Locations Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Domains Breakdown */}
        <div className="bg-[#0B161E] rounded-xl shadow-lg border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#10212E80] bg-opacity-20 p-3 rounded-xl">
                <IconUsersGroup size={20}  />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Event Domains</h3>
                <p className="text-sm text-slate-400">
                  {totalDomains} unique {totalDomains === 1 ? "domain" : "domains"}
                </p>
              </div>
            </div>
           
          </div>

          {topDomains.length > 0 ? (
            <div className="space-y-3">
              {topDomains.map(([domain, count], index) => {
                const percentage = totalDomainsCount > 0 
                  ? ((count / totalDomainsCount) * 100).toFixed(1)
                  : "0";
                
                return (
                  <div key={domain} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full  bg-opacity-20 text-white text-xl font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium text-slate-200 capitalize">
                          {domain}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-400">{percentage}%</span>
                       {/* 
                        <span className="font-semibold text-white w-8 text-right">
                          {count}
                        </span>
                        */}
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#FAA336] h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className=" text-center py-8 text-slate-400">
              <IconCategory size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No domains available</p>
            </div>
          )}
        </div>

        {/* Types Breakdown */}
        <div className="bg-[#0B161E] rounded-xl shadow-lg border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#10212E80] bg-opacity-20 p-3 rounded-xl">
                <IconList size={20}  />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Event Types</h3>
                <p className="text-sm text-slate-400">
                  {totalTypes} unique {totalTypes === 1 ? "type" : "types"}
                </p>
              </div>
            </div>
          
          </div>

          {topTypes.length > 0 ? (
            <div className="space-y-3">
              {topTypes.map(([type, count], index) => {
                const percentage = totalTypesCount > 0 
                  ? ((count / totalTypesCount) * 100).toFixed(1)
                  : "0";
                
                return (
                  <div key={type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-opacity-20 text-white text-lg font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium text-slate-200">
                          {type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-400">{percentage}%</span>
                          {/* 
                        <span className="font-semibold text-white w-8 text-right">
                          {count}
                        </span>
                        */}
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#FAA336] h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <IconTag size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No types available</p>
            </div>
          )}
        </div>

        {/* Locations Breakdown */}
        <div className="bg-[#0B161E] rounded-xl shadow-lg border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#10212E80] p-3 rounded-xl">
                <IconMapPin size={20}/>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Event Locations</h3>
                <p className="text-sm text-slate-400">
                  {totalLocations} unique {totalLocations === 1 ? "location" : "locations"}
                </p>
              </div>
            </div>
    
           
          </div>

          {topLocations.length > 0 ? (
            <div className="space-y-3">
              {topLocations.map(([location, count], index) => {
                const percentage = totalLocationsCount > 0 
                  ? ((count / totalLocationsCount) * 100).toFixed(1)
                  : "0";
                
                return (
                  <div key={location} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full  text-lg font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium text-slate-200">
                          {location}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-400">{percentage}%</span>
                         {/* 
                        <span className="font-semibold text-white w-8 text-right">
                          {count}
                        </span>
                        */}
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#FAA336] h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <IconMapPin size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No locations available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
