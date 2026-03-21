import Link from "next/link";
import { IconCalendar, IconPlus } from "@tabler/icons-react";

export default function EmptyEventsState() {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="text-center py-16">
        <IconCalendar size={64} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
        <p className="text-gray-500 mb-6">Get started by creating your first event</p>
        <Link
          href="/member/events/create"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 hover:shadow-lg transition-all font-semibold"
        >
          <IconPlus size={20} />
          Create Event
        </Link>
      </div>
    </div>
  );
}


