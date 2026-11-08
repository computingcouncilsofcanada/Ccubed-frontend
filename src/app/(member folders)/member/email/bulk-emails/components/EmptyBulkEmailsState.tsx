import EmptyState, { emptyStateDarkCompact } from "@/components/shared/EmptyState";
import { IconSend, IconPlus } from "@tabler/icons-react";

export default function EmptyBulkEmailsState() {
  return (
    <EmptyState
      {...emptyStateDarkCompact}
      icon={IconSend}
      title="No bulk emails yet"
      description="Start a new bulk email to send to a list of registrants."
      action={{
        label: "Send New Email",
        icon: IconPlus,
        href: "/member/email/bulk-emails/new",
      }}
    />
  );
}
