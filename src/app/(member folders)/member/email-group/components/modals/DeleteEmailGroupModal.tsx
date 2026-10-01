import ConfirmActionModal from "@/components/modals/ConfirmActionModal";
import { IconTrash } from "@tabler/icons-react";

interface DeleteEmailGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  groupName?: string;
}

export default function DeleteEmailGroupModal({
  isOpen,
  onClose,
  onConfirm,
  groupName,
}: DeleteEmailGroupModalProps) {
  return (
    <ConfirmActionModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Email Group"
      tone="danger"
      icon={IconTrash}
      confirmLabel="Delete"
      confirmIcon={IconTrash}
    >
      <div className="text-center">
        <p className="text-lg font-semibold text-white mb-2">
          Are you sure you want to delete
          {groupName ? ` "${groupName}"` : " this email group"}?
        </p>
        <p className="text-sm text-gray-400 max-w-md">
          This action cannot be undone. The group and all its members will be
          permanently removed.
        </p>
      </div>
    </ConfirmActionModal>
  );
}
