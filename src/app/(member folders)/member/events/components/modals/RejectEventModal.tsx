import Modal from "@/components/modals/Modal";
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Reject Event ${rejectType === "create" ? "Creation" : "Update"}`}
    >
      <div className="flex flex-col gap-6">
        {/* Icon and Warning */}
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-2 border-orange-400/30 flex items-center justify-center">
            <IconAlertTriangle size={32} className="text-orange-400" strokeWidth={2.5} />
          </div>
          <p className="text-center text-gray-300 text-sm max-w-md">
            Please provide a reason for rejection. This will help improve future submissions.
          </p>
        </div>

        {/* Rejection Reason Input */}
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
            onClick={handleSubmit}
            disabled={!rejectReason.trim()}
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
          >
            <IconX size={18} />
            Reject
          </button>
        </div>
      </div>
    </Modal>
  );
}
