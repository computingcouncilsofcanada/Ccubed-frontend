import { ColumnDef } from "@tanstack/react-table";
import { Event } from "../types";
import {
  IconCalendar,
  IconClock,
  IconMapPin,
  IconEdit,
  IconTrash,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

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
            <div className="font-semibold text-gray-900 truncate">{event.name}</div>
            <div className="text-xs text-gray-500 line-clamp-1 mt-1">{event.description}</div>
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
        const startDate = new Date(parseInt(event.start_at));
        const endDate = new Date(parseInt(event.end_at));
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <IconCalendar size={14} className="text-gray-400" />
              <span>{startDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <IconClock size={14} className="text-gray-400" />
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
          <div className="flex items-center gap-1.5 text-sm text-gray-700">
            <IconMapPin size={16} className="text-gray-400" />
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
        if (!event.types || event.types.length === 0) return <span className="text-gray-400">-</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {event.types.slice(0, 2).map((type) => (
              <span
                key={type}
                className="px-2 py-0.5 bg-purple-50 text-[#7C3AED] text-xs font-medium rounded-full border border-purple-200"
              >
                {type}
              </span>
            ))}
            {event.types.length > 2 && (
              <span className="px-2 py-0.5 text-xs text-gray-500">+{event.types.length - 2}</span>
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
            <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full border border-yellow-200">
              Pending {event.pending_action}
            </span>
          );
        }
        return (
          <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">
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
              className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              title="Update"
            >
              <IconEdit size={16} />
            </button>
            <button
              onClick={() => openModal(event, "delete")}
              className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              title="Delete"
            >
              <IconTrash size={16} />
            </button>
            {event.pending_action === "create" && (
              <>
                <button
                  onClick={() => openModal(event, "approve-create")}
                  className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                  title="Approve Creation"
                >
                  <IconCheck size={16} />
                </button>
                <button
                  onClick={() => openModal(event, "reject-create")}
                  className="p-1.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
                  title="Reject Creation"
                >
                  <IconX size={16} />
                </button>
              </>
            )}
            {event.pending_action === "update" && (
              <>
                <button
                  onClick={() => openModal(event, "approve-update")}
                  className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                  title="Approve Update"
                >
                  <IconCheck size={16} />
                </button>
                <button
                  onClick={() => openModal(event, "reject-update")}
                  className="p-1.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
                  title="Reject Update"
                >
                  <IconX size={16} />
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

