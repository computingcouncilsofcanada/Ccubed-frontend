"use client";

import { Role } from "@/types/roles.interface";
import { IconSearch } from "@tabler/icons-react";

const STATUS_OPTIONS = [
  { label: "All statuses", value: "" },
  { label: "Active", value: "1" },
  { label: "Banned", value: "0" },
] as const;

const VERIFIED_OPTIONS = [
  { label: "All", value: "" },
  { label: "Verified", value: "true" },
  { label: "Unverified", value: "false" },
] as const;

const selectClassName =
  "px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-600 text-slate-100 text-sm min-w-[130px] focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50";

const searchClassName =
  "w-full min-w-[180px] flex-1 pl-9 pr-3 py-2 rounded-lg bg-slate-800/80 border border-slate-600 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50";

export type UserFiltersState = {
  role: string;
  status: string;
  isVerified: string;
  search: string;
};

type UserFiltersBarProps = {
  filters: UserFiltersState;
  roles: Role[];
  onFilterChange: <K extends keyof UserFiltersState>(
    key: K,
    value: UserFiltersState[K]
  ) => void;
};

export default function UserFiltersBar({
  filters,
  roles,
  onFilterChange,
}: UserFiltersBarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <IconSearch
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          placeholder="Search username or email"
          className={searchClassName}
          aria-label="Search username or email"
        />
      </div>

      <select
        value={filters.role}
        onChange={(e) => onFilterChange("role", e.target.value)}
        className={selectClassName}
        aria-label="Filter by role"
      >
        <option value="">All roles</option>
        {roles.map((role) => (
          <option key={role.id} value={role.name}>
            {role.name.replace(/_/g, " ")}
          </option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(e) => onFilterChange("status", e.target.value)}
        className={selectClassName}
        aria-label="Filter by status"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value || "all"} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={filters.isVerified}
        onChange={(e) => onFilterChange("isVerified", e.target.value)}
        className={selectClassName}
        aria-label="Filter by verified"
      >
        {VERIFIED_OPTIONS.map((opt) => (
          <option key={opt.value || "all"} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
