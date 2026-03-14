"use client";

import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IconChevronUp, IconChevronDown, IconArrowsSort } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useMemo, useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

// Optional types for pagination
type PaginationResponse<TData> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TData[];
};

interface SortableHeaderProps<TData> {
  column: Column<TData, unknown>;
  title: string;
}

function SortableHeader<TData>({ column, title }: SortableHeaderProps<TData>) {
  return (
    <button
      onClick={() => {
        const current = column.getIsSorted();
        if (!current) {
          column.toggleSorting(false); // asc
        } else if (current === "asc") {
          column.toggleSorting(true); // desc
        } else {
          column.clearSorting(); // reset
        }
      }}
      className="flex items-center gap-2 hover:bg-white/10 rounded-lg px-2 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1C26]"
    >
      <span className="font-semibold text-gray-200">{title}</span>
      <div className="text-gray-400 hover:text-cyan-400 transition-colors">
        {column.getIsSorted() === "asc" ? (
          <IconChevronUp size={16} />
        ) : column.getIsSorted() === "desc" ? (
          <IconChevronDown size={16} />
        ) : (
          <IconArrowsSort size={16} />
        )}
      </div>
    </button>
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  headerVariant?: "default" | "purple";
  checkbox?: boolean;
  sort?: boolean;
  onRowClick?: (rowData: TData) => void;
  loading?: boolean;
  loadingDelay?: number;
  pagination?: {
    paginationInfo: PaginationResponse<TData> | null;
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (url: string | null) => void;
    baseEndpoint?: string;
  };
}

export { SortableHeader };

export function DataTable<TData, TValue>({
  columns,
  data,
  headerVariant = "default",
  checkbox = false,
  sort = false,
  onRowClick,
  loading = false,
  loadingDelay,
  pagination,
}: DataTableProps<TData, TValue>) {
  const finalColumns = useMemo(() => {
    let processedColumns = columns;

    if (sort) {
      processedColumns = columns.map((column) => {
        if (column.enableSorting === false) {
          return column;
        }
        if (typeof column.header === "function") {
          return {
            ...column,
            enableSorting: true,
          };
        }

        const title =
          typeof column.header === "string"
            ? column.header
            : ("accessorKey" in column
                ? (column as { accessorKey: string }).accessorKey
                : "") || "Column";

        return {
          ...column,
          header: ({
            column: tableColumn,
          }: {
            column: Column<TData, unknown>;
          }) => <SortableHeader column={tableColumn} title={title} />,
          enableSorting: true,
        };
      }) as ColumnDef<TData, TValue>[];
    }

    if (!checkbox) return processedColumns;

    const checkboxColumn: ColumnDef<TData, TValue> = {
      id: "_checkbox",
      header: ({ table }) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            className="w-5 h-5 border-gray-500 cursor-pointer data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 text-gray-800"
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            checked={table.getIsAllRowsSelected?.()}
            aria-label="Select all rows"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            className="w-5 h-5 border-gray-500 cursor-pointer data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 text-gray-800"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={`Select row ${row.id}`}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 48,
    };

    return [checkboxColumn, ...processedColumns];
  }, [checkbox, sort, columns]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const table = useReactTable({
    data,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  useEffect(() => {
    if (loading) {
      // If delay = 0, skip skeleton
      if (loadingDelay === 0) {
        setShowSkeleton(false);
        setIsDataLoaded(false);
        return;
      }

      setShowSkeleton(true);
      setIsDataLoaded(false);
      return;
    }

    // When not loading anymore
    setIsDataLoaded(true);

    if (data.length > 0) {
      if (loadingDelay && loadingDelay > 0) {
        const timer = setTimeout(() => setShowSkeleton(false), loadingDelay);
        return () => clearTimeout(timer);
      } else {
        setShowSkeleton(false);
      }
    } else {
      // No data => turn off skeleton immediately
      setShowSkeleton(false);
    }
  }, [loading, data.length, loadingDelay]);

  // Show loading state
  if (showSkeleton) {
    return (
      <div className="rounded-xl overflow-hidden border border-white/20 shadow-lg bg-gray-800/40">
        <div className="w-full overflow-x-auto">
          <div className="animate-pulse">
            <div className={cn(
              "h-12",
              headerVariant === "purple"
                ? "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"
                : "bg-gray-700"
            )}></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-800/80 border-b border-gray-700"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border border-white/20 shadow-lg bg-gray-800/40">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead
            className={cn(
              "py-3",
              headerVariant === "purple"
                ? "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"
                : "bg-gray-800"
            )}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="hover:bg-transparent" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      minWidth: header.column.getSize()
                        ? `${header.column.getSize()}px`
                        : "150px",
                    }}
                    className={cn(
                      "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider",
                      headerVariant === "purple"
                        ? "text-gray-300"
                        : "text-gray-400"
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-gray-800/30 divide-y divide-gray-700">
            {isDataLoaded && table.getRowModel().rows?.length === 0 ? (
              <tr>
                <td colSpan={finalColumns.length}>
                  <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                    <div className="w-48 h-48 mb-3 opacity-70 flex items-center justify-center bg-gray-700/50 rounded-lg">
                      <IconArrowsSort size={64} className="text-gray-500" />
                    </div>
                    <p className="text-sm font-medium">
                      Không tìm thấy nội dung
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(
                    onRowClick && "cursor-pointer transition-colors",
                    row.getIsSelected()
                      ? "bg-cyan-500/20"
                      : onRowClick
                      ? "hover:bg-white/5"
                      : "hover:bg-white/5"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      style={{
                        minWidth: cell.column.getSize()
                          ? `${cell.column.getSize()}px`
                          : "150px",
                      }}
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-200"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination &&
        pagination.paginationInfo &&
        pagination.paginationInfo.count > 0 && (
          <div className="mt-4 px-6 py-4 border-t border-gray-700 bg-gray-800/50 flex items-center justify-between">
            <div className="text-sm text-gray-300">
              Showing page {pagination.currentPage} of{" "}
              {Math.ceil(pagination.paginationInfo.count / pagination.itemsPerPage)}
            </div>
            <div className="flex gap-2">
              {pagination.paginationInfo.previous && (
                <button
                  onClick={() => pagination.onPageChange(pagination.paginationInfo!.previous!)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 text-sm font-medium text-gray-200 transition-colors"
                >
                  Previous
                </button>
              )}
              {pagination.paginationInfo.next && (
                <button
                  onClick={() => pagination.onPageChange(pagination.paginationInfo!.next!)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg text-sm font-medium transition-all"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
    </div>
  );
}
