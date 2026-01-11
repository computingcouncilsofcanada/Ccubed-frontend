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
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        {/* Breakdown Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded"></div>
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
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      label: "Approved",
      value: stats.total_approved_events,
      icon: IconCheck,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
      iconBg: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      label: "Rejected",
      value: stats.total_rejected_events,
      icon: IconX,
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-red-100",
      iconBg: "bg-red-500",
      textColor: "text-red-600",
    },
    {
      label: "Pending",
      value: stats.total_pending_events,
      icon: IconClock,
      gradient: "from-yellow-500 to-yellow-600",
      bgGradient: "from-yellow-50 to-yellow-100",
      iconBg: "bg-yellow-500",
      textColor: "text-yellow-600",
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
              className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 overflow-hidden group"
            >
              {/* Gradient Background Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.iconBg} p-3 rounded-xl shadow-sm`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  {approvalRate && (
                    <div className="flex items-center gap-1 text-xs font-semibold text-gray-500">
                      <IconTrendingUp size={14} />
                      <span>{approvalRate}%</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm font-semibold ${stat.textColor}`}>
                    {stat.label}
                  </p>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-bl-full`}></div>
            </div>
          );
        })}
      </div>

      {/* Domains, Types, and Locations Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Domains Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-xl">
                <IconCategory size={20} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Event Domains</h3>
                <p className="text-sm text-gray-500">
                  {totalDomains} unique {totalDomains === 1 ? "domain" : "domains"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{totalDomainsCount}</p>
              <p className="text-xs text-gray-500">Total events</p>
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
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-700 capitalize">
                          {domain}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">{percentage}%</span>
                        <span className="font-semibold text-gray-900 w-8 text-right">
                          {count}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <IconCategory size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No domains available</p>
            </div>
          )}
        </div>

        {/* Types Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <IconTag size={20} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Event Types</h3>
                <p className="text-sm text-gray-500">
                  {totalTypes} unique {totalTypes === 1 ? "type" : "types"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{totalTypesCount}</p>
              <p className="text-xs text-gray-500">Total events</p>
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
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-700">
                          {type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">{percentage}%</span>
                        <span className="font-semibold text-gray-900 w-8 text-right">
                          {count}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <IconTag size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No types available</p>
            </div>
          )}
        </div>

        {/* Locations Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <IconMapPin size={20} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Event Locations</h3>
                <p className="text-sm text-gray-500">
                  {totalLocations} unique {totalLocations === 1 ? "location" : "locations"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{totalLocationsCount}</p>
              <p className="text-xs text-gray-500">Total events</p>
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
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-700">
                          {location}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">{percentage}%</span>
                        <span className="font-semibold text-gray-900 w-8 text-right">
                          {count}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <IconMapPin size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No locations available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
