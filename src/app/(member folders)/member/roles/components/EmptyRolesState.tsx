import EmptyState, { emptyStateDarkRoomy } from "@/components/shared/EmptyState";
import { IconShield, IconPlus } from "@tabler/icons-react";

type EmptyRolesStateProps = {
  onCreateClick: () => void;
};

export default function EmptyRolesState({ onCreateClick }: EmptyRolesStateProps) {
  return (
    <EmptyState
      {...emptyStateDarkRoomy}
      icon={IconShield}
      title="No roles found"
      description="Get started by creating your first role"
      action={{
        label: "Create Role",
        icon: IconPlus,
        onClick: onCreateClick,
        className:
          "inline-flex items-center gap-2 px-6 py-3 bg-brand text-black rounded-3xl hover:opacity-90 transition-all font-semibold shadow-lg",
      }}
    />
  );
}
