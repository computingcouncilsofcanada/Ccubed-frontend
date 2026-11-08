import EmptyState from "@/components/shared/EmptyState";
import { IconCalendar, IconPlus } from "@tabler/icons-react";

export default function EmptyEventsState() {
  return (
    <EmptyState
      icon={IconCalendar}
      title="No events found"
      description="Get started by creating your first event"
      action={{
        label: "Create Event",
        icon: IconPlus,
        href: "/member/events/create",
        className:
          "inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 hover:shadow-lg transition-all font-semibold",
      }}
    />
  );
}
