"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function getPaginationTotalPages(totalRecords: number, pageSize: number): number {
  if (totalRecords <= 0 || pageSize <= 0) return 0;
  return Math.ceil(totalRecords / pageSize);
}

/**
 * Compact page list with ellipses, e.g. 1, 2, 3, …, 18, 19, 20.
 */
export function getPaginationVisiblePages(
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] {
  if (totalPages <= 0) return [];
  if (totalPages <= 9) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];
  const showLeft = currentPage <= 4;
  const showRight = currentPage >= totalPages - 3;

  if (showLeft) {
    for (let i = 1; i <= 5; i++) pages.push(i);
    pages.push("ellipsis");
    pages.push(totalPages);
  } else if (showRight) {
    pages.push(1);
    pages.push("ellipsis");
    for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push("ellipsis");
    for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
    pages.push("ellipsis");
    pages.push(totalPages);
  }
  return pages;
}

export type PaginationProps = {
  /** 1-based current page */
  page: number;
  /** Items per page (used with totalRecords to compute page count and range) */
  pageSize: number;
  totalRecords: number;
  /** Rows actually rendered on this page (for “showing X–Y”) */
  itemCountOnPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  /** Word after the total count, default “results” */
  resultsLabel?: string;
  /** Hide the “Showing …” summary line */
  showSummary?: boolean;
  /** Use API total page count instead of computing from totalRecords / pageSize */
  totalPages?: number;
  /** Custom summary line (replaces default range summary when set) */
  summaryText?: string;
  /** Override active page button styles */
  activePageClassName?: string;
  inactivePageClassName?: string;
};

export function Pagination({
  page,
  pageSize,
  totalRecords,
  itemCountOnPage,
  onPageChange,
  className,
  resultsLabel = "results",
  showSummary = true,
  totalPages: totalPagesProp,
  summaryText,
  activePageClassName,
  inactivePageClassName,
}: PaginationProps) {
  const totalPages =
    totalPagesProp ?? getPaginationTotalPages(totalRecords, pageSize);
  const hasNextPage = totalPages > 0 && page < totalPages;
  const visiblePages = getPaginationVisiblePages(page, totalPages);

  const start = totalRecords === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = (page - 1) * pageSize + itemCountOnPage;

  const pageButtonClass = (isActive: boolean) =>
    cn(
      "min-w-[2.5rem] px-3 py-2 rounded-lg text-sm font-semibold transition-colors border",
      isActive
        ? activePageClassName ??
          "border-[#FAA336] bg-[#FAA336] text-black"
        : inactivePageClassName ??
          "border-slate-600 bg-slate-800/80 text-slate-200 hover:bg-slate-700 hover:border-slate-500"
    );

  const navBtnClass =
    "px-3 py-2 sm:px-4 border-2 border-slate-600 rounded-lg hover:bg-slate-700 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 font-medium text-slate-200 text-sm";

  return (
    <div className={cn("mt-6 space-y-4", className)}>
      {showSummary && (
        <p className="text-center text-sm text-slate-400">
          {summaryText != null && summaryText !== "" ? (
            summaryText
          ) : totalRecords === 0 ? (
            <>No {resultsLabel}</>
          ) : (
            <>
              Showing <span className="font-semibold text-slate-200">{start}</span>
              {"–"}
              <span className="font-semibold text-slate-200">{end}</span> of{" "}
              <span className="font-semibold text-slate-200">{totalRecords}</span> {resultsLabel}
              {totalPages > 0 && (
                <span className="text-slate-500">
                  {" "}
                  · {totalPages} {totalPages === 1 ? "page" : "pages"}
                </span>
              )}
            </>
          )}
        </p>
      )}

      {totalPages > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page <= 1}
            className={navBtnClass}
          >
            <IconArrowLeft size={18} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {visiblePages.map((item, idx) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-1.5 text-slate-500 select-none"
                  aria-hidden
                >
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => onPageChange(item)}
                  className={pageButtonClass(page === item)}
                  aria-label={`Page ${item}`}
                  aria-current={page === item ? "page" : undefined}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={!hasNextPage}
            className={navBtnClass}
          >
            <span className="hidden sm:inline">Next</span>
            <IconArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
