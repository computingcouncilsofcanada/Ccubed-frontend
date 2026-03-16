import { IconUserEdit } from "@tabler/icons-react";

export default function EmptyUpdateUserRequestState() {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="text-center py-16">
        <IconUserEdit size={64} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No update requests
        </h3>
        <p className="text-gray-500">
          When users request profile updates, they will appear here for review.
        </p>
      </div>
    </div>
  );
}
