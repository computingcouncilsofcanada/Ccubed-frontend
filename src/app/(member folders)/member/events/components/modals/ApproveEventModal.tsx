import ConfirmActionModal from "@/components/modals/ConfirmActionModal";
import { IconCheck } from "@tabler/icons-react";

interface ApproveEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function ApproveEventModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Approve Event Creation",
  message = "Are you sure you want to approve this event creation?",
}: ApproveEventModalProps) {
  return (
    <ConfirmActionModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {
        onClose();
        onConfirm();
      }}
      title={title}
      tone="info"
      icon={IconCheck}
      confirmLabel="Approve"
      confirmIcon={IconCheck}
    >
      <p className="text-center text-gray-300 text-base leading-relaxed max-w-md">
        {message}
      </p>
    </ConfirmActionModal>
  );
}
