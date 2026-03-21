import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

interface PaginationControlsProps {
  page: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
}

export default function PaginationControls({
  page,
  onPageChange,
  hasNextPage,
}: PaginationControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-4 py-2 border-2 border-slate-600 rounded-lg hover:bg-slate-700 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium text-slate-200"
      >
        <IconArrowLeft size={18} />
        Previous
      </button>
      <span className="px-6 py-2 bg-slate-800 rounded-lg font-semibold text-white border border-slate-700">
        Page {page}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        className="px-4 py-2 border-2 border-slate-600 rounded-lg hover:bg-slate-700 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium text-slate-200"
      >
        Next
        <IconArrowRight size={18} />
      </button>
    </div>
  );
}


