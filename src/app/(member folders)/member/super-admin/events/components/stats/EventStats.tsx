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
              className="bg-gray-800/40 rounded-xl shadow-sm border border-white/20 p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        {/* Breakdown Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-800/40 rounded-xl shadow-sm border border-white/20 p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-700 rounded"></div>
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
      gradient: "from-cyan-500 to-blue-600",
      bgGradient: "from-cyan-500/10 to-blue-600/10",
      iconBg: "bg-cyan-500",
      textColor: "text-cyan-300",
    },
    {
      label: "Approved",
      value: stats.total_approved_events,
      icon: IconCheck,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-500/10 to-green-600/10",
      iconBg: "bg-green-500",
      textColor: "text-green-300",
    },
    {
      label: "Rejected",
      value: stats.total_rejected_events,
      icon: IconX,
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-500/10 to-red-600/10",
      iconBg: "bg-red-500",
      textColor: "text-red-300",
    },
    {
      label: "Pending",
      value: stats.total_pending_events,
      icon: IconClock,
      gradient: "from-yellow-500 to-yellow-600",
      bgGradient: "from-yellow-500/10 to-yellow-600/10",
      iconBg: "bg-yellow-500",
      textColor: "text-yellow-300",
    },
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* Main Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mainStats.map((stat) => {
          const Icon = stat.icon;
          const approvalRate = stat.label === "Approved" && stats.total_events > 0
            ? ((stat.value / stats.total_events) * 100).toFixed(1)
            : null;

          return (
            <div
              key={stat.label}
              className="relative bg-gray-800/40 rounded-xl shadow-sm border border-white/20 p-6 hover:bg-gray-800/60 transition-all duration-200 overflow-hidden group"
            >
              {/* Gradient Background Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.iconBg} p-3 rounded-xl shadow-sm`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  {approvalRate && (
                    <div className="flex items-center gap-1 text-xs font-semibold text-gray-400">
                      <IconTrendingUp size={14} />
                      <span>{approvalRate}%</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-gray-200">{stat.value}</p>
                  <p className={`text-sm font-semibold ${stat.textColor}`}>
                    {stat.label}
                  </p>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-bl-full`}></div>
            </div>
          );
        })}
      </div>

      {/* Domains, Types, and Locations Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Domains Breakdown */}
        <div className="bg-gray-800/40 rounded-xl shadow-sm border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-cyan-500/20 p-3 rounded-xl">
                <IconCategory size={20} className="text-cyan-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-200">Event Domains</h3>
                <p className="text-sm text-gray-400">
                  {totalDomains} unique {totalDomains === 1 ? "domain" : "domains"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-200">{totalDomainsCount}</p>
              <p className="text-xs text-gray-400">Total events</p>
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
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-300 capitalize">
                          {domain}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">{percentage}%</span>
                        <span className="font-semibold text-gray-200 w-8 text-right">
                          {count}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <IconCategory size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No domains available</p>
            </div>
          )}
        </div>

        {/* Types Breakdown */}
        <div className="bg-gray-800/40 rounded-xl shadow-sm border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <IconTag size={20} className="text-blue-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-200">Event Types</h3>
                <p className="text-sm text-gray-400">
                  {totalTypes} unique {totalTypes === 1 ? "type" : "types"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-200">{totalTypesCount}</p>
              <p className="text-xs text-gray-400">Total events</p>
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
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-300">
                          {type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">{percentage}%</span>
                        <span className="font-semibold text-gray-200 w-8 text-right">
                          {count}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <IconTag size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No types available</p>
            </div>
          )}
        </div>

        {/* Locations Breakdown */}
        <div className="bg-gray-800/40 rounded-xl shadow-sm border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/20 p-3 rounded-xl">
                <IconMapPin size={20} className="text-emerald-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-200">Event Locations</h3>
                <p className="text-sm text-gray-400">
                  {totalLocations} unique {totalLocations === 1 ? "location" : "locations"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-200">{totalLocationsCount}</p>
              <p className="text-xs text-gray-400">Total events</p>
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
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-300">
                          {location}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">{percentage}%</span>
                        <span className="font-semibold text-gray-200 w-8 text-right">
                          {count}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <IconMapPin size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No locations available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
