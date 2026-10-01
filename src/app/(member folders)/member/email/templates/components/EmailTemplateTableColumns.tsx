import { ColumnDef } from "@tanstack/react-table";
import { EmailTemplate } from "@/types/email.interface";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatDateSmart } from "@/utils/dateUtils";

interface ColumnsParams {
  onDelete: (template: EmailTemplate) => void;
}

export function createEmailTemplateTableColumns({
  onDelete,
}: ColumnsParams): ColumnDef<EmailTemplate>[] {
  return [
    {
      accessorKey: "name",
      header: "Template",
      cell: ({ row }) => {
        const template = row.original;
        return (
          <div className="max-w-md">
            <div className="font-semibold text-white truncate">
              {template.name}
            </div>
            {template.description && (
              <div className="text-xs text-slate-400 line-clamp-2 mt-1">
                {template.description}
              </div>
            )}
          </div>
        );
      },
      size: 240,
    },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => (
        <div className="text-sm text-slate-200 max-w-[260px] truncate">
          {row.original.subject}
        </div>
      ),
      size: 260,
    },
    {
      accessorKey: "placeholders",
      header: "Merge fields",
      cell: ({ row }) => {
        const placeholders = row.original.placeholders ?? [];
        if (placeholders.length === 0) {
          return <span className="text-slate-500">—</span>;
        }
        return (
          <div className="flex flex-wrap gap-1 max-w-[260px]">
            {placeholders.slice(0, 4).map((p) => (
              <span
                key={p}
                className="px-2 py-0.5 rounded-full bg-brand/15 text-brand text-xs font-mono"
              >
                {`{{${p}}}`}
              </span>
            ))}
            {placeholders.length > 4 && (
              <span className="text-xs text-slate-400">
                +{placeholders.length - 4} more
              </span>
            )}
          </div>
        );
      },
      size: 280,
      enableSorting: false,
    },
    {
      accessorKey: "updated_at",
      header: "Updated",
      cell: ({ row }) => {
        const t = row.original.updated_at ?? row.original.created_at;
        return (
          <span className="text-sm text-slate-400 whitespace-normal">
            {t ? formatDateSmart(t, { format: "full" }) : "—"}
          </span>
        );
      },
      size: 180,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const template = row.original;
        return (
          <div
            className="flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href={`/member/email/templates/upsert?mode=update&id=${encodeURIComponent(template.id)}`}
              className="inline-flex p-1.5 bg-[#2e3f4f] text-white rounded-lg hover:bg-gray-800 transition-colors"
              title="Edit"
            >
              <Pencil size={16} />
            </Link>
            <button
              type="button"
              onClick={() => onDelete(template)}
              className="inline-flex p-1.5 bg-red-900/60 text-red-200 rounded-lg hover:bg-red-900 transition-colors"
              title="Delete"
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
