"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import {
  getAllUpdateUserRequests,
  updateUserRequestStatus,
} from "@/services/useApiUser";
import { DataTable } from "@/components/data-table/data-table";
import { getErrMsg } from "@/utils/errorMessage";
import { UpdateUserRequest } from "@/types/user.interface";
import { UpdateUserRequestStatus } from "@/types/user.interface";
import EmptyUpdateUserRequestState from "./components/EmptyUpdateUserRequestState";
import { createUpdateUserRequestTableColumns } from "./components/UpdateUserRequestTableColumns";
import PaginationControls from "../events/components/PaginationControls";

const LIMIT = 10;
const STATUS_OPTIONS: { label: string; value: "" | UpdateUserRequestStatus }[] = [
  { label: "All", value: "" },
  { label: "Pending", value: UpdateUserRequestStatus.PENDING },
  { label: "Approved", value: UpdateUserRequestStatus.APPROVED },
  { label: "Rejected", value: UpdateUserRequestStatus.REJECTED },
];

export default function UpdateUserRequestPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<UpdateUserRequest[]>([]);
  const [error, setError] = useState<string>("");
  const [, setActionLoadingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"" | UpdateUserRequestStatus>("");
  const [page, setPage] = useState(1);

  const fetchRequests = useCallback(async () => {
    try {
      const offset = (page - 1) * LIMIT;
      const statusParam = statusFilter || undefined;
      const res = await getAllUpdateUserRequests(statusParam, LIMIT, offset);
      const data = Array.isArray(res)
        ? res
        : (res as { data?: UpdateUserRequest[] })?.data ?? [];
      setRequests(data);
      setError("");
    } catch (err: unknown) {
      setError(getErrMsg(err));
      setRequests([]);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleApprove = async (item: UpdateUserRequest) => {
    setActionLoadingId(item.id);
    try {
      await updateUserRequestStatus(item.id, UpdateUserRequestStatus.APPROVED);
      await fetchRequests();
    } catch (err: unknown) {
      alert(getErrMsg(err));
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (item: UpdateUserRequest) => {
    setActionLoadingId(item.id);
    try {
      await updateUserRequestStatus(item.id, UpdateUserRequestStatus.REJECTED);
      await fetchRequests();
    } catch (err: unknown) {
      alert(getErrMsg(err));
    } finally {
      setActionLoadingId(null);
    }
  };

  const openDetails = (item: UpdateUserRequest) => {
    router.push(`/member/update-user-request/${item.id}`);
  };

  const columns = createUpdateUserRequestTableColumns(
    handleApprove,
    handleReject,
    openDetails
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Update user requests
        </h1>
        <p className="text-gray-600">
          Review and approve or reject profile update requests from users.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Status filter */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as "" | UpdateUserRequestStatus);
            setPage(1);
          }}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value || "all"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {requests.length === 0 ? (
        <EmptyUpdateUserRequestState />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={requests}
            headerVariant="purple"
            sort={true}
          />
          <PaginationControls
            page={page}
            onPageChange={setPage}
            hasNextPage={requests.length >= LIMIT}
          />
        </>
      )}

    </div>
  );
}
