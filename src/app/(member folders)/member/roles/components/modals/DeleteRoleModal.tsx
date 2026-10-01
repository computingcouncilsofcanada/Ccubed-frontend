import ConfirmActionModal from "@/components/modals/ConfirmActionModal";
import { IconTrash } from "@tabler/icons-react";

interface DeleteRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteRoleModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteRoleModalProps) {
  return (
    <ConfirmActionModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Role"
      tone="danger"
      icon={IconTrash}
      confirmLabel="Delete"
      confirmIcon={IconTrash}
    >
      <div className="text-center">
        <p className="text-lg font-semibold text-white mb-2">
          Are you sure you want to delete this role?
        </p>
        <p className="text-sm text-gray-400 max-w-md">
          This action cannot be undone. The role will be permanently removed.
        </p>
      </div>
    </ConfirmActionModal>
  );
}
