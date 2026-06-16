import { IconShield, IconPlus } from "@tabler/icons-react";

type EmptyRolesStateProps = {
  onCreateClick: () => void;
};

export default function EmptyRolesState({ onCreateClick }: EmptyRolesStateProps) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/5 p-6">
      <div className="text-center py-16">
        <IconShield size={64} className="mx-auto text-slate-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No roles found</h3>
        <p className="text-slate-400 mb-6">Get started by creating your first role</p>
        <button
          type="button"
          onClick={onCreateClick}
          style={{ backgroundColor: "#FAA336" }}
          className="inline-flex items-center gap-2 px-6 py-3 text-black rounded-3xl hover:opacity-90 transition-all font-semibold shadow-lg"
        >
          <IconPlus size={20} />
          Create Role
        </button>
      </div>
    </div>
  );
}
