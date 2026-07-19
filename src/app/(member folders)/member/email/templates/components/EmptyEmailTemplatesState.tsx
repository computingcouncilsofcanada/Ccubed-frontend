import Link from "next/link";
import { IconMail, IconPlus } from "@tabler/icons-react";

export default function EmptyEmailTemplatesState() {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center">
      <IconMail size={56} className="mx-auto text-slate-500 mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">
        No email templates yet
      </h3>
      <p className="text-slate-400 mb-6">
        Create a reusable template you can send to event registrants.
      </p>
      <Link
        href="/member/email/templates/upsert?mode=create"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-black transition-all shadow-lg hover:opacity-90"
        style={{ backgroundColor: "#FAA336" }}
      >
        <IconPlus size={20} />
        New template
      </Link>
    </div>
  );
}
