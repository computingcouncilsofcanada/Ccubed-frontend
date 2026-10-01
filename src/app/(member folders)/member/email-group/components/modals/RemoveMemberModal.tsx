import ConfirmActionModal from "@/components/modals/ConfirmActionModal";
import { EmailGroupMember } from "@/types/email-group.interface";
import { IconTrash } from "@tabler/icons-react";

interface RemoveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  member: EmailGroupMember | null;
}

export default function RemoveMemberModal({
  isOpen,
  onClose,
  onConfirm,
  member,
}: RemoveMemberModalProps) {
  return (
    <ConfirmActionModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Remove Member"
      tone="danger"
      icon={IconTrash}
      confirmLabel="Remove"
      confirmIcon={IconTrash}
    >
      <div className="text-center">
        <p className="text-lg font-semibold text-white mb-2">
          Remove {member?.email ?? "this member"}?
        </p>
        <p className="text-sm text-gray-400 max-w-md">
          This member will be removed from the email group.
        </p>
      </div>
    </ConfirmActionModal>
  );
}
