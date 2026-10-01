import ConfirmActionModal from "@/components/modals/ConfirmActionModal";
import { useState, useEffect } from "react";
import { IconX, IconAlertTriangle } from "@tabler/icons-react";

interface RejectEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  rejectType: "create" | "update";
}

export default function RejectEventModal({
  isOpen,
  onClose,
  onConfirm,
  rejectType,
}: RejectEventModalProps) {
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setRejectReason("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (rejectReason.trim()) {
      onConfirm(rejectReason);
    }
  };

  return (
    <ConfirmActionModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
      title={`Reject Event ${rejectType === "create" ? "Creation" : "Update"}`}
      tone="warning"
      icon={IconAlertTriangle}
      confirmLabel="Reject"
      confirmIcon={IconX}
      confirmDisabled={!rejectReason.trim()}
      contentClassName="flex flex-col items-center gap-3 py-2"
      extra={
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Rejection Reason <span className="text-red-400">*</span>
          </label>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Enter a detailed reason for rejection..."
            className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none bg-gray-700 text-white placeholder-gray-400"
            rows={5}
            required
          />
          {!rejectReason.trim() && (
            <p className="text-gray-400 text-xs mt-1.5">
              A rejection reason is required to proceed.
            </p>
          )}
        </div>
      }
    >
      <p className="text-center text-gray-300 text-sm max-w-md">
        Please provide a reason for rejection. This will help improve future submissions.
      </p>
    </ConfirmActionModal>
  );
}
