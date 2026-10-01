import ConfirmActionModal from "@/components/modals/ConfirmActionModal";
import { IconTrash } from "@tabler/icons-react";

interface DeleteEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteEventModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteEventModalProps) {
  return (
    <ConfirmActionModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Event"
      tone="danger"
      icon={IconTrash}
      confirmLabel="Delete"
      confirmIcon={IconTrash}
    >
      <div className="text-center">
        <p className="text-lg font-semibold text-white mb-2">
          Are you sure you want to delete this event?
        </p>
        <p className="text-sm text-gray-400 max-w-md">
          This action cannot be undone. All event data will be permanently removed.
        </p>
      </div>
    </ConfirmActionModal>
  );
}
