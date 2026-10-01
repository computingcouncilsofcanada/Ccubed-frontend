import { ColumnDef } from "@tanstack/react-table";
import { EmailGroup } from "@/types/email-group.interface";
import { Eye, Trash } from "lucide-react";
import Link from "next/link";
import { formatGroupTimestamp } from "../utils";

export function createEmailGroupTableColumns(
  openModal: (group: EmailGroup | null, type: "delete") => void
): ColumnDef<EmailGroup>[] {
  return [
    {
      accessorKey: "name",
      header: "Group Name",
      cell: ({ row }) => {
        const group = row.original;
        return (
          <div className="max-w-xs">
            <Link
              href={`/member/email-group/${group.id}`}
              className="font-semibold text-white truncate hover:text-brand transition-colors block"
            >
              {group.name}
            </Link>
            {group.description && (
              <div className="text-xs text-slate-400 line-clamp-1 mt-1">
                {group.description}
              </div>
            )}
          </div>
        );
      },
      size: 250,
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => {
        const formatted = formatGroupTimestamp(row.original.created_at);
        return (
          <span className="text-sm text-slate-100">
            {formatted ?? <span className="text-slate-400">—</span>}
          </span>
        );
      },
      size: 180,
    },
    {
      accessorKey: "updated_at",
      header: "Updated",
      cell: ({ row }) => {
        const formatted = formatGroupTimestamp(row.original.updated_at);
        return (
          <span className="text-sm text-slate-100">
            {formatted ?? <span className="text-slate-400">—</span>}
          </span>
        );
      },
      size: 180,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const group = row.original;
        return (
          <div
            className="flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href={`/member/email-group/${group.id}`}
              className="p-1.5 bg-[#2e3f4f] text-white rounded-lg hover:bg-gray-800 transition-colors inline-flex"
              title="View & Edit"
            >
              <Eye size={16} />
            </Link>
            <button
              type="button"
              onClick={() => openModal(group, "delete")}
              className="p-1.5 bg-red-900 text-red-400 rounded-lg hover:bg-red-800 transition-colors"
              title="Delete"
            >
              <Trash size={16} />
            </button>
          </div>
        );
      },
      enableSorting: false,
      size: 120,
    },
  ];
}
