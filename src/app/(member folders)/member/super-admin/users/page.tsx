"use client";

import { useUser } from "@/context/UserContext";
import { privateAxios } from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { banUser, unBanUser, changeRole, changePassword } from "@/services/useApiAuth";
import Modal from "@/components/modals/Modal";
import { useForm } from "react-hook-form";
import { usePasswordGenerator } from "@/hooks/usePasswordGenerator";
import { isAxiosError } from "axios";
import {
  IconUsers,
  IconUser,
  IconMail,
  IconShield,
  IconCheck,
  IconX,
  IconKey,
  IconBan,
  IconUserCheck,
  IconBuilding,
  IconCalendar,
  IconCopy,
  IconRefresh,
  IconAlertTriangle,
} from "@tabler/icons-react";

type AllUsers = {
  username: string;
  email: string;
  role: string;
  is_verified: boolean;
  year_of_study: string;
  department: string;
  id: string;
  school_id: string;
  status: number;
  verify_token: string;
};

type ChangePasswordForm = {
  password: string;
};

type ChangeRoleForm = {
  role: string;
};

function UsersPage() {
  const { user, isLoading } = useUser();
  const [allUsers, setAllUsers] = useState<AllUsers[]>([]);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AllUsers | null>(null);
  const router = useRouter();
  const { generatePassword } = usePasswordGenerator();

  const handleCopyPassword = () => {
    const passwordInput = document.querySelector(
      'input[type="password"]'
    ) as HTMLInputElement;
    if (passwordInput && passwordInput.value.length > 0) {
      navigator.clipboard.writeText(passwordInput.value);
      // Could add toast notification here
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-gradient-to-r from-purple-600 to-indigo-600";
      case "ADMIN":
        return "bg-gradient-to-r from-blue-600 to-cyan-600";
      case "STAFF":
        return "bg-gradient-to-r from-green-600 to-emerald-600";
      default:
        return "bg-gray-500";
    }
  };

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    setValue: setPasswordValue,
    formState: { errors: passwordErrors },
  } = useForm<ChangePasswordForm>();

  const {
    register: registerRole,
    handleSubmit: handleRoleSubmit,
    reset: resetRole,
    formState: { errors: roleErrors },
  } = useForm<ChangeRoleForm>();

  const fetchUsers = useCallback(async () => {
    try {
      const res = await privateAxios.get("/users");
      setAllUsers(res.data.data);
    } catch {
      // Error handling
    }
  }, []);

  const handleBanUser = async () => {
    if (!selectedUser) return;
    try {
      const res = await banUser(selectedUser.id);
      if (res.status == 200) {
        console.log(res.message);
        await fetchUsers();
        setIsBanModalOpen(false);
      }
    } catch (err: unknown) {
      console.error("Error banning user:", err);
      const message = isAxiosError(err)
        ? err.response?.data?.message ?? err.message
        : err instanceof Error
        ? err.message
        : "Error banning user";
      alert(message);
    }
  };

  const handleUnbanUser = async () => {
    if (!selectedUser) return;
    try {
      const res = await unBanUser(selectedUser.id);
      if (res.status == 200) {
        console.log(res.message);
        await fetchUsers();
        setIsBanModalOpen(false);
      }
    } catch (err: unknown) {
      console.error("Error unbanning user:", err);
      const message = isAxiosError(err)
        ? err.response?.data?.message ?? err.message
        : err instanceof Error
        ? err.message
        : "Error unbanning user";
      alert(message);
    }
  };

  const handleChangeRole = async (data: ChangeRoleForm) => {
    if (!selectedUser) return;
    try {
      const res = await changeRole(selectedUser.id, data.role);
      if (res.status === 200) {
        alert(res.message);
        await fetchUsers();
        setIsRoleModalOpen(false);
        resetRole();
      }
    } catch (err: unknown) {
      console.error("Error changing user role:", err);
      const message = isAxiosError(err)
        ? err.response?.data?.message ?? err.message
        : err instanceof Error
        ? err.message
        : "Error changing user role";
      alert(message);
    }
  };

  const handleChangePassword = async (data: ChangePasswordForm) => {
    if (!selectedUser) return;
    try {
      const res = await changePassword(selectedUser.id, data.password);
      if (res.status === 200) {
        alert(res.message);
        setIsPasswordModalOpen(false);
        resetPassword();
      }
    } catch (err: unknown) {
      console.error("Error changing password:", err);
      let message = "Error changing password";
      if (isAxiosError(err)) {
        // Try to extract detailed constraint message if present
        const dataUnknown = err.response?.data as unknown;
        const matchesConstraint =
          (dataUnknown as { errors?: Array<{ constraints?: { matches?: string } }> })
            ?.errors?.[0]?.constraints?.matches;
        message =
          matchesConstraint ??
          (err.response?.data as { message?: string })?.message ??
          err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      alert(message);
    }
  };

  const openModal = (
    userParam: AllUsers,
    modalType: "password" | "ban" | "role"
  ) => {
    setSelectedUser(userParam);
    switch (modalType) {
      case "password":
        setIsPasswordModalOpen(true);
        break;
      case "ban":
        setIsBanModalOpen(true);
        break;
      case "role":
        setIsRoleModalOpen(true);
        break;
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      } else if (user.role !== "SUPER_ADMIN") {
        router.push("/member");
      }
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (!user || user.role !== "SUPER_ADMIN") {
    return null;
  }

  return (
    <div className="min-h-full p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#6d28d9] flex items-center justify-center shadow-lg">
              <IconUsers size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage user accounts, roles, and permissions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <IconUsers size={20} className="text-[#7C3AED]" />
            <span className="text-sm font-semibold text-gray-700">
              {allUsers.length} {allUsers.length === 1 ? "User" : "Users"}
            </span>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allUsers.map((u) => (
          <div
            key={u.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
          >
            {/* User Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6d28d9] flex items-center justify-center shadow-md">
                  <IconUser size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{u.username}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold text-white ${getRoleBadgeColor(u.role)}`}
                    >
                      {u.role.replace("_", " ")}
                    </span>
                    {u.status === 1 ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1">
                        <IconCheck size={12} />
                        Active
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 flex items-center gap-1">
                        <IconBan size={12} />
                        Banned
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <IconMail size={18} className="text-[#7C3AED]" />
                <span className="truncate">{u.email}</span>
              </div>
              {u.department && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <IconBuilding size={18} className="text-[#7C3AED]" />
                  <span>{u.department}</span>
                </div>
              )}
              {u.year_of_study && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <IconCalendar size={18} className="text-[#7C3AED]" />
                  <span>Year {u.year_of_study}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                {u.is_verified ? (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <IconUserCheck size={18} />
                    Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-600 font-medium">
                    <IconAlertTriangle size={18} />
                    Unverified
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
              <button
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  u.status === 1
                    ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                    : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
                }`}
                onClick={() => openModal(u, "ban")}
              >
                {u.status === 1 ? (
                  <>
                    <IconBan size={18} />
                    Ban User
                  </>
                ) : (
                  <>
                    <IconUserCheck size={18} />
                    Unban User
                  </>
                )}
              </button>
              <button
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-purple-50 text-[#7C3AED] hover:bg-purple-100 border border-purple-200 transition-all duration-200"
                onClick={() => openModal(u, "role")}
              >
                <IconShield size={18} />
                Change Role
              </button>
              <button
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 transition-all duration-200"
                onClick={() => openModal(u, "password")}
              >
                <IconKey size={18} />
                Change Password
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Password Change Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          resetPassword();
        }}
        title="Change Password"
      >
        <form
          onSubmit={handlePasswordSubmit(handleChangePassword)}
          className="space-y-6"
        >
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              New Password for {selectedUser?.username}
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                id="password"
                {...registerPassword("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character (@$!%*?&)",
                  },
                })}
                className="flex-1 border-2 border-gray-300 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => {
                  const newPassword = generatePassword();
                  setPasswordValue("password", newPassword);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
              >
                <IconRefresh size={18} />
                Generate
              </button>
              <button
                type="button"
                onClick={handleCopyPassword}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 hover:shadow-lg transition-all duration-200 font-semibold"
              >
                <IconCopy size={18} />
                Copy
              </button>
            </div>
            {passwordErrors.password && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <IconX size={16} />
                {passwordErrors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setIsPasswordModalOpen(false);
                resetPassword();
              }}
              className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] text-white rounded-xl hover:shadow-lg font-semibold transition-all duration-200 flex items-center gap-2"
            >
              <IconKey size={18} />
              Change Password
            </button>
          </div>
        </form>
      </Modal>

      {/* Ban/Unban Modal */}
      <Modal
        isOpen={isBanModalOpen}
        onClose={() => setIsBanModalOpen(false)}
        title={selectedUser?.status === 1 ? "Ban User" : "Unban User"}
      >
        <div className="space-y-6">
          <div className={`p-4 rounded-xl ${
            selectedUser?.status === 1 
              ? "bg-red-50 border border-red-200" 
              : "bg-green-50 border border-green-200"
          }`}>
            <p className="text-gray-700 font-medium">
              Are you sure you want to{" "}
              <span className="font-bold">
                {selectedUser?.status === 1 ? "ban" : "unban"}
              </span>{" "}
              <span className="font-semibold text-[#7C3AED]">
                {selectedUser?.username}
              </span>
              ?
            </p>
            {selectedUser?.status === 1 && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                <IconAlertTriangle size={16} />
                This action will prevent the user from accessing the system.
              </p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsBanModalOpen(false)}
              className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={
                selectedUser?.status === 1 ? handleBanUser : handleUnbanUser
              }
              className={`px-6 py-2.5 text-white rounded-xl hover:shadow-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                selectedUser?.status === 1
                  ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                  : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              }`}
            >
              {selectedUser?.status === 1 ? (
                <>
                  <IconBan size={18} />
                  Ban User
                </>
              ) : (
                <>
                  <IconUserCheck size={18} />
                  Unban User
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Role Change Modal */}
      <Modal
        isOpen={isRoleModalOpen}
        onClose={() => {
          setIsRoleModalOpen(false);
          resetRole();
        }}
        title="Change Role"
      >
        <form
          onSubmit={handleRoleSubmit(handleChangeRole)}
          className="space-y-6"
        >
          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
              Select New Role for {selectedUser?.username}
            </label>
            <select
              id="role"
              {...registerRole("role", {
                required: "Role is required",
              })}
              className="w-full border-2 border-gray-300 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all font-medium"
              defaultValue={selectedUser?.role}
            >
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="ADMIN">Admin</option>
              <option value="STAFF">Staff</option>
            </select>
            {roleErrors.role && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <IconX size={16} />
                {roleErrors.role.message}
              </p>
            )}
            <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-xs text-gray-600">
                <strong>Current Role:</strong>{" "}
                <span className="font-semibold text-[#7C3AED]">
                  {selectedUser?.role.replace("_", " ")}
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setIsRoleModalOpen(false);
                resetRole();
              }}
              className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] text-white rounded-xl hover:shadow-lg font-semibold transition-all duration-200 flex items-center gap-2"
            >
              <IconShield size={18} />
              Change Role
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default UsersPage;
