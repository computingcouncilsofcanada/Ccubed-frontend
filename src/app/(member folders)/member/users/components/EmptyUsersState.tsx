import { IconUsers } from "@tabler/icons-react";

export default function EmptyUsersState() {
  return (
    <div className="rounded-xl border border-white/20 bg-white/5 p-6">
      <div className="text-center py-16">
        <IconUsers size={64} className="mx-auto text-slate-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No users found</h3>
        <p className="text-slate-400">Users will appear here once they are registered.</p>
      </div>
    </div>
  );
}
