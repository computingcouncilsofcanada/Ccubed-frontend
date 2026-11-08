import EmptyState, { emptyStateDarkCompact } from "@/components/shared/EmptyState";
import { IconMail, IconPlus } from "@tabler/icons-react";

export default function EmptyEmailTemplatesState() {
  return (
    <EmptyState
      {...emptyStateDarkCompact}
      icon={IconMail}
      title="No email templates yet"
      description="Create a reusable template you can send to event registrants."
      action={{
        label: "New template",
        icon: IconPlus,
        href: "/member/email/templates/upsert?mode=create",
      }}
    />
  );
}
