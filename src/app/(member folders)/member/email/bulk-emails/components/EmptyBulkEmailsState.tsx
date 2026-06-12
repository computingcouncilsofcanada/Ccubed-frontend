import Link from "next/link";
import { IconSend, IconPlus } from "@tabler/icons-react";

export default function EmptyBulkEmailsState() {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center">
      <IconSend size={56} className="mx-auto text-slate-500 mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">
        No bulk emails yet
      </h3>
      <p className="text-slate-400 mb-6">
        Start a new bulk email to send to a list of registrants.
      </p>
      <Link
        href="/member/email/bulk-emails/new"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-black transition-all shadow-lg hover:opacity-90"
        style={{ backgroundColor: "#FAA336" }}
      >
        <IconPlus size={20} />
        Send New Email
      </Link>
    </div>
  );
}
