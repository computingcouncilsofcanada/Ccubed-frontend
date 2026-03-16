import Modal from "@/components/modals/Modal";
import { Role } from "@/types/roles.interface";
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { IconFileText, IconX } from "@tabler/icons-react";

export type RoleForm = { name: string };

interface UpdateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: Role | null;
  register: UseFormRegister<RoleForm>;
  handleSubmit: UseFormHandleSubmit<RoleForm>;
  onSubmit: (data: RoleForm) => void;
  errors: FieldErrors<RoleForm>;
}

export default function UpdateRoleModal({
  isOpen,
  onClose,
  selectedRole,
  register,
  handleSubmit,
  onSubmit,
  errors,
}: UpdateRoleModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Role">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
              <IconFileText size={16} className="text-gray-400" />
              Role Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              defaultValue={selectedRole?.name}
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-700 text-white placeholder-gray-400"
              placeholder="Enter role name"
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
              className="px-6 py-2.5 border-2 border-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium text-gray-300 hover:border-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Update Role
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
