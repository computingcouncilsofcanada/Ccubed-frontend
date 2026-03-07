"use client";

import { useUser } from "@/context/UserContext";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  getUpdateUserRequestById,
  updateUserRequestStatus,
} from "@/services/useApiUser";
import {
  UpdateUserRequest,
  UpdateUserRequestStatus,
} from "@/types/user.interface";
import { getErrMsg } from "@/utils/errorMessage";
import { ArrowLeft, Check, X } from "lucide-react";

interface DiffRow {
  key: string;
  label: string;
  before: React.ReactNode;
  after: React.ReactNode;
  changed: boolean;
}

export default function UpdateUserRequestDetailPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [request, setRequest] = useState<UpdateUserRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await getUpdateUserRequestById(id);
        setRequest(res.data);
        setError("");
      } catch (err: unknown) {
        setError(getErrMsg(err));
        setRequest(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  const handleStatusChange = async (status: UpdateUserRequestStatus) => {
    if (!request) return;
    setActionLoading(true);
    try {
      await updateUserRequestStatus(request.id, status);
      router.push("/member/super-admin/update-user-request");
    } catch (err: unknown) {
      alert(getErrMsg(err));
      setActionLoading(false);
    }
  };

  const formatDateTime = (raw: string | number | null | undefined) => {
    if (raw == null || raw === "") return "—";
    const ts =
      typeof raw === "string" && /^\d+$/.test(raw) ? parseInt(raw, 10) : raw;
    const date = new Date(ts as number | string);
    if (Number.isNaN(date.getTime())) return "—";
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const diffRows: DiffRow[] = useMemo(() => {
    if (!request) return [];

    
    const { previous_data: prev, details } = request;

    const makeStringRow = (key: keyof typeof details, label: string): DiffRow => {
      const before = (prev as any)[key] ?? "";
      const after = (details as any)[key] ?? "";
      const changed = (before ?? "") !== (after ?? "");
      return {
        key: String(key),
        label,
        before: before || "—",
        after: after || "—",
        changed,
      };
    };

    const normalizeArray = (val: string[] | null | undefined) =>
      (val ?? []).map((v) => v.trim()).filter(Boolean);

    const makeArrayRow = (
      key: "domains" | "hobbies",
      label: string
    ): DiffRow => {
      const beforeArr = normalizeArray((prev as any)[key]);
      const afterArr = normalizeArray((details as any)[key]);
      const changed =
        JSON.stringify(beforeArr) !== JSON.stringify(afterArr);
      return {
        key,
        label,
        before: beforeArr.length ? beforeArr.join(", ") : "—",
        after: afterArr.length ? afterArr.join(", ") : "—",
        changed,
      };
    };

    const rows: DiffRow[] = [];

    rows.push({
      key: "username",
      label: "Username",
      before: prev?.username || "—",
      after: details?.username || "—",
      changed: (prev?.username || "") !== (details?.username || ""),
    });

    rows.push(
      makeStringRow("about_me", "About me"),
      makeStringRow("fun_fact", "Fun fact"),
      makeStringRow("journey_at_ccubed", "Journey at CCubed"),
      makeStringRow("favorite_song", "Favorite song"),
      makeStringRow("favorite_quote", "Favorite quote")
    );

    rows.push(
      makeStringRow("instagram_url", "Instagram URL"),
      makeStringRow("twitter_url", "Twitter URL"),
      makeStringRow("linkedin_url", "LinkedIn URL"),
      makeStringRow("discord_url", "Discord URL")
    );

    rows.push(makeArrayRow("domains", "Domains"));
    rows.push(makeArrayRow("hobbies", "Hobbies"));

    const prevAvatar = prev.avatar;
    const nextAvatar = details.avatar_url;
    rows.push({
      key: "avatar",
      label: "Avatar",
      before: prevAvatar ? "Set" : "—",
      after: nextAvatar ? "Set" : "—",
      changed: (!!prevAvatar) !== (!!nextAvatar),
    });

    const fileName = details.file ? details.file.name : "";
    rows.push({
      key: "file",
      label: "Uploaded file",
      before: "—",
      after: fileName || "—",
      changed: !!fileName,
    });

    return rows;
  }, [request]);

  if (!user || user.role !== "SUPER_ADMIN") {
    return null;
  }

  return (
    <div className="p-6">
      <button
        type="button"
        onClick={() => router.push("/member/super-admin/update-user-request")}
        className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="mr-1" size={16} />
        Back to requests
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Update request details
        </h1>
        <p className="text-gray-600">
          Compare the user&apos;s current profile with the requested changes.
        </p>
      </div>

      {loading && (
        <p className="text-gray-600">Loading request details...</p>
      )}

      {!loading && error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && !error && !request && (
        <p className="text-gray-600">Request not found.</p>
      )}

      {!loading && request && (
        <>
          <div className="mb-6 bg-white shadow-sm rounded-lg border border-gray-200 p-4">
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-mono text-sm text-gray-900 break-all">
                  {request.previous_data.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Request ID</p>
                <p className="font-mono text-sm text-gray-900 break-all">
                  {request.id}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Created at</p>
                <p className="text-sm text-gray-900">
                  {formatDateTime(request.created_at)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className="text-sm font-semibold text-gray-900">
                  {request.status ?? UpdateUserRequestStatus.PENDING}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500">
              <div className="px-4 py-3">Field</div>
              <div className="px-4 py-3">Current value</div>
              <div className="px-4 py-3">Requested change</div>
            </div>
            <div>
              {diffRows.map((row) => (
                <div
                  key={row.key}
                  className={`grid grid-cols-3 border-b border-gray-100 text-sm ${
                    row.changed ? "bg-yellow-50" : "bg-white"
                  }`}
                >
                  <div className="px-4 py-3 font-medium text-gray-800">
                    {row.label}
                    {row.changed && (
                      <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full bg-yellow-200 text-yellow-800 text-[10px] font-semibold">
                        Changed
                      </span>
                    )}
                  </div>
                  <div className="px-4 py-3 text-gray-700 whitespace-pre-wrap">
                    {row.before}
                  </div>
                  <div className="px-4 py-3 text-gray-900 font-medium whitespace-pre-wrap">
                    {row.after}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {(request.status === undefined ||
            request.status === UpdateUserRequestStatus.PENDING) && (
            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={actionLoading}
                onClick={() =>
                  handleStatusChange(UpdateUserRequestStatus.REJECTED)
                }
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 rounded-lg flex items-center gap-2 text-white"
              >
                <X size={18} />
                Reject
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={() =>
                  handleStatusChange(UpdateUserRequestStatus.APPROVED)
                }
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 rounded-lg flex items-center gap-2 text-white"
              >
                <Check size={18} />
                Approve
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

