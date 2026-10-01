import EmptyState from "@/components/shared/EmptyState";
import { IconUserEdit } from "@tabler/icons-react";

export default function EmptyUpdateUserRequestState() {
  return (
    <EmptyState
      icon={IconUserEdit}
      title="No update requests"
      description="When users request profile updates, they will appear here for review."
    />
  );
}
