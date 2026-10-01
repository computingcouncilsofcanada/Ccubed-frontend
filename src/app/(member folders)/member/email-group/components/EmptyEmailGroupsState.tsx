import EmptyState from "@/components/shared/EmptyState";
import { IconMail, IconPlus } from "@tabler/icons-react";

export default function EmptyEmailGroupsState() {
  return (
    <EmptyState
      icon={IconMail}
      title="No email groups found"
      description="Get started by creating your first email group"
      action={{
        label: "Create Email Group",
        icon: IconPlus,
        href: "/member/email-group/create",
        className:
          "inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 hover:shadow-lg transition-all font-semibold",
      }}
    />
  );
}
