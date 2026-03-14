import { ColumnDef } from "@tanstack/react-table";
import { Event } from "@/types/events";
import {
  Calendar,
  Clock,
  MapPin,
  Edit,
  Trash,
  Check,
  X,
} from "lucide-react";

export function createEventTableColumns(
  openModal: (event: Event | null, type: "update" | "delete" | "approve-create" | "reject-create" | "approve-update" | "reject-update") => void
): ColumnDef<Event>[] {
  return [
    {
      accessorKey: "name",
      header: "Event Name",
      cell: ({ row }) => {
        const event = row.original;
        return (
          <div className="max-w-xs">
            <div className="font-semibold text-gray-200 truncate">{event.name}</div>
            <div className="text-xs text-gray-400 line-clamp-1 mt-1">{event.description}</div>
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
            <div className="flex items-center gap-1.5 text-sm text-gray-300">
              <Calendar size={14} className="text-gray-500" />
              <span>{startDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock size={14} className="text-gray-500" />
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
          <div className="flex items-center gap-1.5 text-sm text-gray-300">
            <MapPin size={16} className="text-gray-500" />
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
        if (!event.types || event.types.length === 0) return <span className="text-gray-500">-</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {event.types.slice(0, 2).map((type) => (
              <span
                key={type}
                className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-xs font-medium rounded-full border border-cyan-500/40"
              >
                {type}
              </span>
            ))}
            {event.types.length > 2 && (
              <span className="px-2 py-0.5 text-xs text-gray-400">+{event.types.length - 2}</span>
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
            <span className="px-2.5 py-1 bg-yellow-500/20 text-yellow-200 text-xs font-semibold rounded-full border border-yellow-500/40">
              Pending {event.pending_action}
            </span>
          );
        }
        return (
          <span className="px-2.5 py-1 bg-green-500/20 text-green-200 text-xs font-semibold rounded-full border border-green-500/40">
            Active
          </span>
        );
      },
      size: 120,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const event = row.original;
        return (
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => openModal(event, "update")}
              className="p-1.5 bg-gray-700 text-cyan-400 rounded-lg hover:bg-gray-600 transition-colors"
              title="Update"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => openModal(event, "delete")}
              className="p-1.5 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
              title="Delete"
            >
              <Trash size={16} />
            </button>
            {event.pending_action === "create" && (
              <>
                <button
                  onClick={() => openModal(event, "approve-create")}
                  className="p-1.5 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors"
                  title="Approve Creation"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => openModal(event, "reject-create")}
                  className="p-1.5 bg-orange-500/20 text-orange-300 rounded-lg hover:bg-orange-500/30 transition-colors"
                  title="Reject Creation"
                >
                  <X size={16} />
                </button>
              </>
            )}
            {event.pending_action === "update" && (
              <>
                <button
                  onClick={() => openModal(event, "approve-update")}
                  className="p-1.5 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors"
                  title="Approve Update"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => openModal(event, "reject-update")}
                  className="p-1.5 bg-orange-500/20 text-orange-300 rounded-lg hover:bg-orange-500/30 transition-colors"
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

