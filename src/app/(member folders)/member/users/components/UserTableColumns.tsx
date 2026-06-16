import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user.interface";
import { IconBan, IconKey, IconShield, IconUserCheck } from "@tabler/icons-react";
import { formatDateSmart } from "@/utils/dateUtils";

type OpenUserModal = (user: User, modalType: "password" | "ban" | "role") => void;

function formatRole(role: string) {
  return role.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export function createUserTableColumns(
  openModal: OpenUserModal
): ColumnDef<User>[] {
  return [
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="font-mono text-sm text-slate-100 truncate max-w-[220px] block">
          {row.original.email}
        </span>
      ),
      size: 220,
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => (
        <span className="font-mono text-sm text-slate-100 truncate max-w-[220px] block">
          {row.original.username}
        </span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <span className="text-sm font-semibold text-white">
          {formatRole(row.original.role)}
        </span>
      ),
      size: 140,
    },
    {
      accessorKey: "position",
      header: "Position",
      cell: ({ row }) => (
        <span className="text-sm font-semibold text-white">
          {row.original.position}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="text-sm font-semibold text-white">
          {row.original.status === 1 ? "Active" : "Inactive"}
        </span>
      ),
      size: 100,
    },
    {
      accessorKey: "created_at",
      header: "Date Joined",
      cell: ({ row }) => (
        <span className="text-sm font-semibold text-white">
          {formatDateSmart(row.original.created_at)}
        </span>
      ),
      size: 100,
    },  
    {
      accessorKey: "is_verified",
      header: "Verified",
      cell: ({ row }) => {
        const verified = row.original.is_verified;
        return verified ? (
          <span className="px-2.5 py-1 bg-green-900 text-green-300 text-xs font-semibold rounded-full border border-green-700">
            Yes
          </span>
        ) : (
          <span className="px-2.5 py-1 bg-red-900 text-red-300 text-xs font-semibold rounded-full border border-red-700">
            No
          </span>
        );
      },
      size: 100,
    },
    {
      id: "actions",
      header: "actions",
      cell: ({ row }) => {
        const u = row.original;
        return (
          <div
            className="flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => openModal(u, "password")}
              className="p-1.5 bg-[#2e3f4f] text-white rounded-lg hover:bg-gray-800 transition-colors"
              title="Change password"
            >
              <IconKey size={16} />
            </button>
            <button
              type="button"
              onClick={() => openModal(u, "role")}
              className="p-1.5 bg-[#2e3f4f] text-white rounded-lg hover:bg-gray-800 transition-colors"
              title="Change role"
            >
              <IconShield size={16} />
            </button>
            <button
              type="button"
              onClick={() => openModal(u, "ban")}
              className={`p-1.5 rounded-lg transition-colors ${
                u.status === 1
                  ? "bg-red-900 text-red-400 hover:bg-red-800"
                  : "bg-green-900 text-green-400 hover:bg-green-800"
              }`}
              title={u.status === 1 ? "Ban user" : "Unban user"}
            >
              {u.status === 1 ? <IconBan size={16} /> : <IconUserCheck size={16} />}
            </button>
          </div>
        );
      },
      enableSorting: false,
      size: 140,
    },
  ];
}
