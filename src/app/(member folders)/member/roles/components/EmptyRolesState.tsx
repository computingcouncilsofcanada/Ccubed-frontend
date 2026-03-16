import Link from "next/link";
import { IconShield, IconPlus } from "@tabler/icons-react";

export default function EmptyRolesState() {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="text-center py-16">
        <IconShield size={64} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No roles found</h3>
        <p className="text-gray-500 mb-6">Get started by creating your first role</p>
        <Link
          href="/member/super-admin/roles/create"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 hover:shadow-lg transition-all font-semibold"
        >
          <IconPlus size={20} />
          Create Role
        </Link>
      </div>
    </div>
  );
}
