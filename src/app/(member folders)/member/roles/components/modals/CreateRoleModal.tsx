import Modal from "@/components/modals/Modal";
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { IconFileText, IconX } from "@tabler/icons-react";
import { RoleForm } from "./UpdateRoleModal";

interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  register: UseFormRegister<RoleForm>;
  handleSubmit: UseFormHandleSubmit<RoleForm>;
  onSubmit: (data: RoleForm) => void;
  errors: FieldErrors<RoleForm>;
  isSubmitting?: boolean;
}

export default function CreateRoleModal({
  isOpen,
  onClose,
  register,
  handleSubmit,
  onSubmit,
  errors,
  isSubmitting = false,
}: CreateRoleModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Role">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
              <IconFileText size={16} className="text-gray-400" />
              Role Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition-all bg-gray-700 text-white placeholder-gray-400"
              placeholder="e.g. ADMIN, MEMBER"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1.5 flex items-center gap-1">
                <IconX size={14} />
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-600">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border-2 border-brand text-brand rounded-xl hover:bg-gray-700 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-brand text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Role"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
