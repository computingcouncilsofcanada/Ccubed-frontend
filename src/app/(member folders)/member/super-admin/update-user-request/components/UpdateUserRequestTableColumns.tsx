import { ColumnDef } from "@tanstack/react-table";
import { UpdateUserRequest } from "@/types/user.interface";
import { UpdateUserRequestStatus } from "@/types/user.interface";
import { Check, X, Eye } from "lucide-react";

export function createUpdateUserRequestTableColumns(
  onApprove: (item: UpdateUserRequest) => void,
  onReject: (item: UpdateUserRequest) => void,
  onViewDetails: (item: UpdateUserRequest) => void
): ColumnDef<UpdateUserRequest>[] {
  return [
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="font-mono text-sm text-gray-700 truncate max-w-[140px] block">
          {row.original.email}
        </span>
      ),
      size: 180,
    },
    {
      accessorKey: "details",
      header: "Request details",
      cell: ({ row }) => {
        const d = row.original.details;
        return (
          <div className="max-w-xs">
            <div className="font-medium text-gray-900 truncate">
              {d?.username ? `@${d.username}` : "—"}
            </div>
            <div className="text-xs text-gray-500 line-clamp-1">
              {d?.about_me || "No description"}
            </div>
          </div>
        );
      },
      size: 220,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status ?? UpdateUserRequestStatus.PENDING;
        const styles =
          status === UpdateUserRequestStatus.APPROVED
            ? "bg-green-100 text-green-700 border-green-200"
            : status === UpdateUserRequestStatus.REJECTED
            ? "bg-red-100 text-red-700 border-red-200"
            : "bg-yellow-100 text-yellow-700 border-yellow-200";
        return (
          <span
            className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles}`}
          >
            {status}
          </span>
        );
      },
      size: 120,
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => {
        const raw = row.original.created_at;
        if (raw == null || raw === "") return <span className="text-gray-400">—</span>;
        const ts = typeof raw === "string" && /^\d+$/.test(raw) ? parseInt(raw, 10) : raw;
        const date = new Date(ts);
        if (Number.isNaN(date.getTime())) return <span className="text-gray-400">—</span>;
        return (
          <span className="text-sm text-gray-700">
            {date.toLocaleDateString()}{" "}
            {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        );
      },
      size: 160,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;
        const isPending =
          !item.status || item.status === UpdateUserRequestStatus.PENDING;
        return (
          <div
            className="flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onViewDetails(item)}
              className="p-1.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              title="View details"
            >
              <Eye size={16} />
            </button>
            {isPending && (
              <>
                <button
                  onClick={() => onApprove(item)}
                  className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                  title="Approve"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => onReject(item)}
                  className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  title="Reject"
                >
                  <X size={16} />
                </button>
              </>
            )}
          </div>
        );
      },
      enableSorting: false,
      size: 140,
    },
  ];
}
