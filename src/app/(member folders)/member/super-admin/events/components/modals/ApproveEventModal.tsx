import Modal from "@/components/modals/Modal";
import { IconCheck, IconX } from "@tabler/icons-react";

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
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col gap-6">
        {/* Icon and Message */}
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-400/30 flex items-center justify-center">
            <IconCheck size={32} className="text-blue-400" strokeWidth={2.5} />
          </div>
          <p className="text-center text-gray-300 text-base leading-relaxed max-w-md">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-600">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border-2 border-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium text-gray-300 hover:border-gray-500 flex items-center gap-2"
          >
            <IconX size={18} />
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              onConfirm();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <IconCheck size={18} />
            Approve
          </button>
        </div>
      </div>
    </Modal>
  );
}
