import Link from "next/link";
import { IconFileText, IconPlus } from "@tabler/icons-react";

export default function EmptyArticlesState() {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center">
      <IconFileText size={56} className="mx-auto text-slate-500 mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
      <p className="text-slate-400 mb-6">Create an article to see it listed here.</p>
      <Link
        href="/member/articles/upsert?mode=create"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-black transition-all shadow-lg hover:opacity-90"
        style={{ backgroundColor: "#FAA336" }}
      >
        <IconPlus size={20} />
        New article
      </Link>
    </div>
  );
}
