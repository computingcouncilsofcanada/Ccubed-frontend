import Modal from "@/components/modals/Modal";
import { IconTrash, IconX } from "@tabler/icons-react";

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
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Role">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-rose-500/20 border-2 border-red-400/30 flex items-center justify-center">
            <IconTrash size={32} className="text-red-400" strokeWidth={2.5} />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-white mb-2">
              Are you sure you want to delete this role?
            </p>
            <p className="text-sm text-gray-400 max-w-md">
              This action cannot be undone. The role will be permanently removed.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-600">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border-2 border-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium text-gray-300 hover:border-gray-500 flex items-center gap-2"
          >
            <IconX size={18} />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <IconTrash size={18} />
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
