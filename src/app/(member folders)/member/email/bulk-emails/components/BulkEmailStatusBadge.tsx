import { BulkEmailStatus } from "@/types/email.interface";

const STATUS_LABELS: Record<BulkEmailStatus, string> = {
  pending: "Pending",
  sending: "Sending…",
  sent: "Sent",
  partial_failure: "Partial failure",
  cancelled: "Cancelled",
};

const STATUS_CLASSES: Record<BulkEmailStatus, string> = {
  pending:
    "bg-amber-900/50 text-amber-200 border-amber-700/60",
  sending:
    "bg-sky-900/50 text-sky-200 border-sky-700/60",
  sent: "bg-green-900/60 text-green-200 border-green-700/60",
  partial_failure:
    "bg-orange-900/50 text-orange-200 border-orange-700/60",
  cancelled:
    "bg-slate-700/60 text-slate-300 border-slate-600",
};

export function BulkEmailStatusBadge({ status }: { status: BulkEmailStatus }) {
  const label = STATUS_LABELS[status] ?? status;
  const cls = STATUS_CLASSES[status] ?? STATUS_CLASSES.pending;
  return (
    <span
      className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${cls}`}
    >
      {label}
    </span>
  );
}
