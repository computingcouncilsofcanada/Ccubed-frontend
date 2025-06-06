"use client";

// This is the users Page

import { useUser } from "@/context/UserContext";
import { privateAxios, publicAxios } from "@/lib/axios";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  verifyUserRoute,
  banUser,
  unBanUser,
  changeRole,
  changePassword,
} from "@/services/useApiAuth";
import Modal from "@/components/Modal";
import { useForm } from "react-hook-form";
import { usePasswordGenerator } from "@/hooks/usePasswordGenerator";

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
  const [error, setError] = useState<string>("");
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
      alert("Password copied to clipboard!");
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

  const fetchUsers = async () => {
    try {
      const res = await privateAxios.get("/users");
      setAllUsers(res.data.data);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
  };

  const handleBanUser = async () => {
    if (!selectedUser) return;
    try {
      const res = await banUser(selectedUser.id);
      if (res.status == 200) {
        console.log(res.message);
        await fetchUsers();
        setIsBanModalOpen(false);
      }
    } catch (error: any) {
      console.error("Error banning user:", error);
      alert(error?.response?.data?.message);
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
    } catch (error: any) {
      console.error("Error unbanning user:", error);
      alert(error?.response?.data?.message);
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
    } catch (error: any) {
      console.error("Error changing user role:", error);
      alert(error?.response?.data?.message);
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
    } catch (error: any) {
      console.error("Error changing password:", error);
      alert(error?.response?.data?.errors[0].constraints.matches);
    }
  };

  const openModal = (
    user: AllUsers,
    modalType: "password" | "ban" | "role"
  ) => {
    setSelectedUser(user);
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
  }, []);

  if (!user || user.role !== "SUPER_ADMIN") {
    return null;
  }

  return (
    <div className="flex mt-10 gap-3 flex-col">
      <h1 className="text-3xl text-center w-full">Users Page</h1>
      <div className="grid grid-cols-3 gap-5 p-5">
        {allUsers.map((user) => (
          <div key={user.id} className="border-2 border-blue-200 p-4">
            <h1>UserName: {user.username}</h1>
            <h1>User Email: {user.email}</h1>
            <h1>User role: {user.role}</h1>
            <h1>is verified: {user.is_verified ? "true" : "false"}</h1>
            <h1>
              Year of study:{" "}
              {user.year_of_study ? user.year_of_study : "not stated"}
            </h1>
            <h1>Department: {user.department}</h1>
            <h1>User Id: {user.id}</h1>
            <h1>School ID: {user.school_id}</h1>
            <h1>Status: {user.status == 1 ? "No Issues" : "Banned"}</h1>
            <div className="flex flex-col gap-2 mt-2">
              <button
                className="border-2 border-red-600 px-2 py-1 w-30"
                onClick={() => openModal(user, "ban")}
              >
                {user.status == 1 ? "Ban" : "Unban"} User
              </button>
              <button
                className="border-2 border-blue-600 px-2 py-1 w-30"
                onClick={() => openModal(user, "role")}
              >
                Change Role
              </button>
              <button
                className="border-2 border-blue-600 px-2 py-1 w-30"
                onClick={() => openModal(user, "password")}
              >
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
          className="space-y-4"
        >
          <div>
            <label htmlFor="password" className="block font-bold mb-2">
              New Password
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
                className="w-full border-2 border-gray-300 px-2 py-1 rounded"
              />
              <button
                type="button"
                onClick={() => {
                  const newPassword = generatePassword();
                  setPasswordValue("password", newPassword);
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Generate
              </button>
              <button
                type="button"
                onClick={handleCopyPassword}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Copy
              </button>
            </div>
            {passwordErrors.password && (
              <p className="text-red-500 text-sm mt-1">
                {passwordErrors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsPasswordModalOpen(false);
                resetPassword();
              }}
              className="border-2 border-gray-300 px-4 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
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
        <div className="space-y-4">
          <p>
            Are you sure you want to{" "}
            {selectedUser?.status === 1 ? "ban" : "unban"}{" "}
            {selectedUser?.username}?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsBanModalOpen(false)}
              className="border-2 border-gray-300 px-4 py-1 rounded"
            >
              Cancel
            </button>
            <button
              onClick={
                selectedUser?.status === 1 ? handleBanUser : handleUnbanUser
              }
              className={`${
                selectedUser?.status === 1 ? "bg-red-600" : "bg-green-600"
              } text-white px-4 py-1 rounded`}
            >
              {selectedUser?.status === 1 ? "Ban" : "Unban"}
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
          className="space-y-4"
        >
          <div>
            <label htmlFor="role" className="block font-bold mb-2">
              Select New Role
            </label>
            <select
              id="role"
              {...registerRole("role", {
                required: "Role is required",
              })}
              className="w-full border-2 border-gray-300 px-2 py-1 rounded"
              defaultValue={selectedUser?.role}
            >
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="ADMIN">Admin</option>
              <option value="STAFF">Staff</option>
            </select>
            {roleErrors.role && (
              <p className="text-red-500 text-sm mt-1">
                {roleErrors.role.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsRoleModalOpen(false);
                resetRole();
              }}
              className="border-2 border-gray-300 px-4 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Change Role
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default UsersPage;
