"use client";

import { useUser } from "@/context/UserContext";
import { privateAxios } from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { banUser, unBanUser, changeRole, changePassword } from "@/services/useApiAuth";
import Modal from "@/components/modals/Modal";
import { useForm } from "react-hook-form";
import { usePasswordGenerator } from "@/hooks/usePasswordGenerator";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
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
  IconLock,
  IconMapPin,
  IconSquareCheck,
  IconSquareX,
  IconCircleX
  
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
        return "bg-gradient-to-r from-[#152E3F] via-[#1E3F57] to-[#152E3F] text-white border border-gray-500/30 rounded-3xl text-sm transition-all duration-200 hover:from-[#1B3B52] hover:via-[#224A68] hover:to-[#1B3B52]";

      case "ADMIN":
        return "bg-gradient-to-r from-blue-600 to-cyan-600";
      case "STAFF":
        return "bg-[#FAA336]";
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
    <div className="relative w-full overflow-hidden overflow-x-hidden min-h-full p-6 md:p-8">
      <div className="absolute inset-2 z-0">
        <BgBoxMainPage maxHeight={400}  />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
           
              <div>
                <h1 className="text-5xl font-bold text-white">User Management</h1>
                <p className="text-sm text-gray-300 mt-2">
                  Manage user accounts, roles, and permissions
                </p>
              </div>
            </div>
            <div className="flex items-center   rounded-sm bg-[#FAA336] ">
           
              <span className="text-sm font-semibold text-black px-7 py-2 text-md">
                {allUsers.length} {allUsers.length === 1 ? "User" : "Users"}
              </span>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {allUsers.map((u) => (
            <div
              key={u.id}
             className="bg-gray-500/20 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 p-6 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
  style={{ minHeight: "360px" }}
            >
              {/* User Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 rounded-md border border-white/30 bg-white/8  flex items-center justify-center">
                    <IconUser size={30} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{u.username}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-8 py-1 rounded-full text-xs font-semibold  text-black ${getRoleBadgeColor(u.role)}`}
                      >
                        {u.role.replace("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}

                      </span>
                      {u.status === 1 ? (
                        <span className="px-8 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 flex items-center gap-1 border border-green-500/30">
                       
                          Active
                        </span>
                      ) : (
                        <span className="px-8 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 flex items-center gap-1 border border-red-500/30">
                      
                          Banned
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <IconMail size={18} />
                  <span className="truncate">{u.email}</span>
                </div>
                {u.department && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <IconMapPin size={18} />
                    <span>{u.department}</span>
                  </div>
                )}
                {u.year_of_study && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <IconCalendar size={18}/>
                    <span>Year {u.year_of_study}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  {u.is_verified ? (
                    <span className="flex items-center gap-1 text-green-400 font-medium">
                      <IconSquareCheck size={18} />
                      Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-500 font-medium">
                      <IconSquareX size={18} />
                      Unverified
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-4">
                <button
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-3xl text-sm 
                bg-blue-500 text-white border border-blue-500/30 
                hover:bg-blue-400/90 
                transition-colors duration-200"



                  onClick={() => openModal(u, "password")}
                >
                  <IconLock size={18} />
                  Change Password
                </button>
                <button
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-3xl text-sm 
                    bg-[#152E3F] text-white border border-gray-500/30 
                    hover:bg-[#1B3B52] 
                    transition-colors duration-200"

                  onClick={() => openModal(u, "role")}
                >
                  <IconUser size={18} />
                  Change Role
                </button>
                <button
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-3xl font-semibold text-sm transition-all duration-200 backdrop-blur-sm ${
                    u.status === 1
                      ? " text-white hover:bg-[#FAA336]/30 border-2 border-[#FAA336]"
                      : "bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-500/30"
                  }`}
                  onClick={() => openModal(u, "ban")}
                >
                  {u.status === 1 ? (
                    <>
                      <IconBan size={18} />
                      Deactivate User
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
          ))}
        </div>
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
          <div className="bg-[#45505a] p-3">
            <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
              New Password for {selectedUser?.username}
            </label>
            <div>
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
                className="flex-1 border-2 text-black bg-white border-gray-300 px-4 py-2.5 rounded-lg  transition-all"
                placeholder="Enter new password"
              />
              <div className="flex justify-center gap-10 pt-2">

           
              <button
                type="button"
                onClick={() => {
                  const newPassword = generatePassword();
                  setPasswordValue("password", newPassword);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#152E3F] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
              >
                <IconRefresh size={18} />
                Generate
              </button>
              <button
                type="button"
                onClick={handleCopyPassword}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#152E3F] text-white rounded-xl  hover:shadow-lg transition-all duration-200 font-semibold"
              >
                <IconCopy size={18} />
                Copy
              </button>
                 </div>
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
              className="px-10 py-2 border-2 border-[#FAA336] text-[#FAA336] rounded-xl hover:bg-gray-50 font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-10 py-2  bg-[#FAA336] text-white rounded-xl hover:shadow-lg font-semibold transition-all duration-200 flex items-center gap-2"
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
        title={selectedUser?.status === 1 ? "Deactivate User" : "Unban User"}
      >
        <div className="space-y-6">
          <div className={`p-4 ${
            selectedUser?.status === 1 
              ? "bg-white" 
              : "bg-green-50 border border-green-200"
          }`}>
            <p className="text-gray-700 font-medium">
              Are you sure you want to{" "}
              <span className="font-bold">
                {selectedUser?.status === 1 ? "deactivate" : "unban"}
              </span>{" "}
              <span className="font-semibold text-[#FAA336]">
                {selectedUser?.username}
              </span>
              ?
            </p>
            {selectedUser?.status === 1 && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                This action will prevent the user from accessing the system.
              </p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsBanModalOpen(false)}
              className="px-10 py-2 border-2 border-[#FAA336] text-[#FAA336] rounded-xl hover:bg-gray-50 font-semibold transition-all duration-200"
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
              
                  Proceed
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
          <div className="bg-[#45505a] p-3 rounded">
            <label htmlFor="role" className="block text-sm font-semibold mb-2">
              Select New Role for {selectedUser?.username}
            </label>
            <select
              id="role"
              {...registerRole("role", {
                required: "Role is required",
              })}
              className="w-full text-black border-2 bg-white border-gray-300 px-4 py-2.5 rounded-lg font-medium"
              defaultValue={selectedUser?.role}
            >
              <option value="SUPER_ADMIN" className="text-black">Super Admin</option>
              <option value="ADMIN" className="text-black">Admin</option>
              <option value="STAFF" className="text-black">Staff</option>
            </select>
            {roleErrors.role && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <IconX size={16} />
                {roleErrors.role.message}
              </p>
            )}
            <div className="mt-3 p-3 bg-[#152E3F] rounded-lg">
              <p className="text-xs text-white">
                <strong>Current Role:</strong>{" "}
                <span className="font-semibold text-[#FAA336]">
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
              className="px-10 py-2 border-2 border-[#FAA336] text-[#FAA336] rounded-xl hover:bg-gray-50 font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-10 py-2 bg-[#FAA336] text-white rounded-xl hover:shadow-lg font-semibold transition-all duration-200 flex items-center gap-2"
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