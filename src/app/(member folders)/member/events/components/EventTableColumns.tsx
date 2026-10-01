import { ColumnDef } from "@tanstack/react-table";
import { Event } from "@/types/events";
import {
  Calendar,
  Clock,
  MapPin,
  Trash,
  Check,
  X,
  PencilIcon,
  Eye,
  GitCompare,
} from "lucide-react";

export function createEventTableColumns(
  openModal: (
    event: Event | null,
    type:
      | "preview"
      | "update"
      | "delete"
      | "approve-create"
      | "reject-create"
      | "approve-update"
      | "reject-update"
      | "preview-update"
  ) => void
): ColumnDef<Event>[] {
  return [
    {
      accessorKey: "name",
      header: "Event Name",
      cell: ({ row }) => {
        const event = row.original;
        return (
          <div className="max-w-xs">
            <div className="font-semibold text-white truncate">{event.name}</div>
            <div className="text-xs text-slate-400 line-clamp-1 mt-1">{event.description}</div>
          </div>
        );
      },
      size: 250,
    },
    {
      accessorKey: "start_at",
      header: "Date & Time",
      cell: ({ row }) => {
        const event = row.original;
        const startDate = new Date(parseInt(event.start_at || "0"));
        const endDate = new Date(parseInt(event.end_at || "0"));
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-slate-100">
              <Calendar size={14} className="text-slate-400" />
              <span>{startDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock size={14} className="text-slate-400" />
              <span>
                {startDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {endDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        );
      },
      size: 180,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => {
        const event = row.original;
        return (
          <div className="flex items-center gap-1.5 text-sm text-slate-100">
            <MapPin size={16} className="text-slate-400" />
            <span className="max-w-xs truncate">{event.location}</span>
          </div>
        );
      },
      size: 200,
    },
    {
      accessorKey: "types",
      header: "Types",
      cell: ({ row }) => {
        const event = row.original;
        if (!event.types || event.types.length === 0) return <span className="text-slate-400">-</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {event.types.slice(0, 2).map((type) => (
              <span
                key={type}
                className="px-2 py-0.5 bg-brand text-black text-xs font-medium rounded-full border border-slate-600"
              >
                {type}
              </span>
            ))}
            {event.types.length > 2 && (
              <span className="px-2 py-0.5 text-xs text-slate-400">+{event.types.length - 2}</span>
            )}
          </div>
        );
      },
      size: 150,
    },
    {
      accessorKey: "pending_action",
      header: "Status",
      cell: ({ row }) => {
        const event = row.original;
        const isPending = event.pending_action && event.pending_action !== "";
        if (isPending) {
          return (
            <span className="px-2.5 py-1 bg-brand text-black text-xs font-semibold rounded-full ">
              Pending {event.pending_action}
            </span>
          );
        }
        return (
          <span className="px-2.5 py-1 bg-green-900 text-green-300 text-xs font-semibold rounded-full border border-green-700">
            Active
          </span>
        );
      },
      size: 120,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const event = row.original;
        return (
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => openModal(event, "preview")}
              className="p-1.5 bg-[#2e3f4f] text-white rounded-lg hover:bg-gray-800 transition-colors"
              title="Preview Current Event"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => openModal(event, "update")}
              className="p-1.5 bg-[#2e3f4f] text-white rounded-lg hover:bg-gray-800 transition-colors"
              title="Update"
            >
              <PencilIcon size={16} />
            </button>
            <button
              onClick={() => openModal(event, "delete")}
              className="p-1.5 bg-red-900 text-red-400 rounded-lg hover:bg-red-800 transition-colors"
              title="Delete"
            >
              <Trash size={16} />
            </button>
            {event.pending_action === "create" && (
              <>
                <button
                  onClick={() => openModal(event, "approve-create")}
                  className="p-1.5 bg-green-900 text-green-400 rounded-lg hover:bg-green-800 transition-colors"
                  title="Approve Creation"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => openModal(event, "reject-create")}
                  className="p-1.5 bg-orange-900 text-orange-400 rounded-lg hover:bg-orange-800 transition-colors"
                  title="Reject Creation"
                >
                  <X size={16} />
                </button>
              </>
            )}
            {event.pending_action === "update" && (
              <>
                <button
                  onClick={() => openModal(event, "preview-update")}
                  className="p-1.5 bg-blue-900 text-blue-400 rounded-lg hover:bg-blue-800 transition-colors"
                  title="Preview Pending Changes"
                >
                  <GitCompare size={16} />
                </button>
                <button
                  onClick={() => openModal(event, "approve-update")}
                  className="p-1.5 bg-green-900 text-green-400 rounded-lg hover:bg-green-800 transition-colors"
                  title="Approve Update"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => openModal(event, "reject-update")}
                  className="p-1.5 bg-orange-900 text-orange-400 rounded-lg hover:bg-orange-800 transition-colors"
                  title="Reject Update"
                >
                  <X size={16} />
                </button>
              </>
            )}
          </div>
        );
      },
      enableSorting: false,
      size: 200,
    },
  ];
}

