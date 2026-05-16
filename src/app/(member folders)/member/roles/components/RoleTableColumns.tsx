import { ColumnDef } from "@tanstack/react-table";
import { Role } from "@/types/roles.interface";
import { Edit, Trash } from "lucide-react";

function formatTimestamp(value: string | undefined) {
  if (!value) return null;
  const date = new Date(Number(value));
  if (Number.isNaN(date.getTime())) return null;
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export function createRoleTableColumns(
  openModal: (role: Role | null, type: "update" | "delete") => void
): ColumnDef<Role>[] {
  return [
    {
      accessorKey: "name",
      header: "Role Name",
      cell: ({ row }) => (
        <div className="font-semibold text-white">{row.original.name}</div>
      ),
      size: 250,
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => {
        const formatted = formatTimestamp(row.original.created_at);
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
        const formatted = formatTimestamp(row.original.updated_at);
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
        const role = row.original;
        return (
          <div
            className="flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => openModal(role, "update")}
              className="p-1.5 bg-[#2e3f4f] text-white rounded-lg hover:bg-gray-800 transition-colors"
              title="Edit"
            >
              <Edit size={16} />
            </button>
            <button
              type="button"
              onClick={() => openModal(role, "delete")}
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
