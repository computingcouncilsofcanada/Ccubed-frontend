import { ColumnDef } from "@tanstack/react-table";
import { Article } from "@/types/article.interface";
import { FileText, Pencil } from "lucide-react";
import Link from "next/link";
import { formatDateSmart } from "@/utils/dateUtils";

function formatDate(iso: string | undefined) {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString();
}

export function createArticleTableColumns(): ColumnDef<Article>[] {
  return [
    {
      accessorKey: "title",
      header: "Article",
      cell: ({ row }) => {
        const article = row.original;
        return (
          <div className="max-w-md">
            <div className="font-semibold text-white truncate">{article.title}</div>
            <div className="text-xs text-slate-400 line-clamp-2 mt-1">{article.description}</div>
          </div>
        );
      },
      size: 280,
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-sm text-slate-300 max-w-[180px]">
          <FileText size={14} className="text-slate-500 shrink-0" />
          <span className="truncate font-mono text-xs">{row.original.slug}</span>
        </div>
      ),
      size: 200,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        row.original.status === 1 ? (
          <span className="px-2.5 py-1 bg-green-900 text-green-300 text-xs font-semibold rounded-full border border-green-700">
            Published
          </span>
        ) : (
          <span className="px-2.5 py-1 bg-slate-700 text-slate-200 text-xs font-semibold rounded-full border border-slate-600">
            Unpublished
          </span>
        )
    
      ),
      size: 100,
    },
    {
      accessorKey: "authors",
      header: "Authors",
      cell: ({ row }) => {
        const authors = row.original.authors;
        if (!authors?.length) return <span className="text-slate-500">—</span>;
        return (
          <div className="text-sm text-slate-200 max-w-[200px] truncate" title={authors.join(", ")}>
            {authors.join(", ")}
          </div>
        );
      },
      size: 200,
    },
    {
      accessorKey: "updated_at",
      header: "Updated",
      cell: ({ row }) => (
        <span className="text-sm text-slate-400 whitespace-normal">
          {row.original.updated_at ? formatDateSmart(row.original.updated_at, { format: "full" }) : "—"}
        </span>
      ),
      size: 180,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const article = row.original;
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <Link
              href={`/member/articles/upsert?mode=update&id=${encodeURIComponent(article.id)}`}
              className="inline-flex p-1.5 bg-[#2e3f4f] text-white rounded-lg hover:bg-gray-800 transition-colors"
              title="Edit"
            >
              <Pencil size={16} />
            </Link>
          </div>
        );
      },
      enableSorting: false,
      size: 56,
    },
  ];
}
