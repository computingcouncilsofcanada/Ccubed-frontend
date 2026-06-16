import { ColumnDef } from "@tanstack/react-table";
import { BulkEmail } from "@/types/email.interface";
import { formatDateSmart } from "@/utils/dateUtils";
import { BulkEmailStatusBadge } from "./BulkEmailStatusBadge";
import { Trash2 } from "lucide-react";

interface ColumnsParams {
  onDelete: (bulkEmail: BulkEmail) => void;
}

export function createBulkEmailTableColumns({
  onDelete,
}: ColumnsParams): ColumnDef<BulkEmail>[] {
  return [
    {
      accessorKey: "subject_snapshot",
      header: "Subject",
      cell: ({ row }) => (
        <div className="max-w-md">
          <div className="font-semibold text-white truncate">
            {row.original.subject_snapshot}
          </div>
        </div>
      ),
      size: 320,
    },
    {
      accessorKey: "recipients",
      header: "Recipients",
      cell: ({ row }) => {
        const recipients = row.original.recipients ?? [];
        const total = recipients.length;
        const sent = recipients.filter((r) => r.status === "sent").length;
        const failed = recipients.filter((r) => r.status === "failed").length;
        return (
          <div className="text-sm text-slate-200">
            <span className="font-semibold">{total}</span>
            {(sent > 0 || failed > 0) && (
              <span className="ml-2 text-xs text-slate-400">
                ({sent} sent
                {failed > 0 ? `, ${failed} failed` : ""})
              </span>
            )}
          </div>
        );
      },
      size: 160,
      enableSorting: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <BulkEmailStatusBadge status={row.original.status} />,
      size: 140,
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => (
        <span className="text-sm text-slate-400 whitespace-normal">
          {row.original.created_at
            ? formatDateSmart(row.original.created_at, { format: "full" })
            : "—"}
        </span>
      ),
      size: 180,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const bulkEmail = row.original;
        const isSending = bulkEmail.status === "sending";
        return (
          <div
            className="flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => onDelete(bulkEmail)}
              disabled={isSending}
              className="inline-flex p-1.5 bg-red-900/60 text-red-200 rounded-lg hover:bg-red-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title={isSending ? "Cannot delete while sending" : "Delete"}
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      },
      enableSorting: false,
      size: 80,
    },
  ];
}
