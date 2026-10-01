import EmptyState, { emptyStateDarkRoomy } from "@/components/shared/EmptyState";
import { IconUsers } from "@tabler/icons-react";

export default function EmptyUsersState() {
  return (
    <EmptyState
      {...emptyStateDarkRoomy}
      icon={IconUsers}
      title="No users found"
      description="Users will appear here once they are registered."
    />
  );
}
