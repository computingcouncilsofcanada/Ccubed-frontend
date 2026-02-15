import { ColumnDef } from "@tanstack/react-table";
import { Role } from "@/types/roles.interface";
import { Edit, Trash } from "lucide-react";

export function createRoleTableColumns(
  openModal: (role: Role | null, type: "update" | "delete") => void
): ColumnDef<Role>[] {
  return [
    {
      accessorKey: "name",
      header: "Role Name",
      cell: ({ row }) => {
        const role = row.original;
        return (
          <div className="font-semibold text-gray-900">{role.name}</div>
        );
      },
      size: 250,
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => {
        const role = row.original;
        if (!role.created_at) return <span className="text-gray-400">-</span>;
        const date = new Date(Number(role.created_at));
        return (
          <span className="text-sm text-gray-700">
            {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        );
      },
      size: 180,
    },
    {
      accessorKey: "updated_at",
      header: "Updated",
      cell: ({ row }) => {
        const role = row.original;
        if (!role.updated_at) return <span className="text-gray-400">-</span>;
        const date = new Date(Number(role.updated_at));
        return (
          <span className="text-sm text-gray-700">
            {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        );
      },
      size: 180,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const role = row.original;
        return (
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => openModal(role, "update")}
              className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              title="Edit"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => openModal(role, "delete")}
              className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
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
