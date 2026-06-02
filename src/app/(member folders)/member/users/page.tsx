"use client";

import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { banUser, unBanUser, changeRole, changePassword } from "@/services/useApiAuth";
import { getAllRoles } from "@/services/useApiRole";
import { getUsers } from "@/services/useApiUser";
import Modal from "@/components/modals/Modal";
import { useForm } from "react-hook-form";
import { usePasswordGenerator } from "@/hooks/usePasswordGenerator";
import { useDebounce } from "@/hooks/useDebounce";
import { DataTable } from "@/components/data-table/data-table";
import { Pagination } from "@/components/shared/Pagination";
import { getErrMsg } from "@/utils/errorMessage";
import { isAxiosError } from "axios";
import {
  IconX,
  IconKey,
  IconUserCheck,
  IconShield,
  IconCopy,
  IconRefresh,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import { User } from "@/types/user.interface";
import { Role } from "@/types/roles.interface";
import EmptyUsersState from "./components/EmptyUsersState";
import { createUserTableColumns } from "./components/UserTableColumns";
import UserFiltersBar, { UserFiltersState } from "./components/UserFiltersBar";

const PAGE_SIZE = 10;

const INITIAL_FILTERS: UserFiltersState = {
  role: "",
  status: "",
  isVerified: "",
  search: "",
};

type ChangePasswordForm = {
  password: string;
};

type ChangeRoleForm = {
  role: string;
};

function UsersPage() {
  const { user } = useUser();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [filters, setFilters] = useState<UserFiltersState>(INITIAL_FILTERS);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const { generatePassword } = usePasswordGenerator();

  const debouncedSearch = useDebounce(filters.search, 400);

  const handleCopyPassword = () => {
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    if (passwordInput?.value.length > 0) {
      navigator.clipboard.writeText(passwordInput.value);
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
    setLoading(true);
    setFetchError(null);
    try {
      const offset = (page - 1) * PAGE_SIZE;
      const res = await getUsers({
        limit: PAGE_SIZE,
        offset,
        role: filters.role || undefined,
        status: filters.status === "" ? undefined : Number(filters.status),
        is_verified:
          filters.isVerified === ""
            ? undefined
            : filters.isVerified === "true",
        username: debouncedSearch || undefined,
        email: debouncedSearch || undefined,
      });
      setAllUsers(res.data ?? []);
      setTotalRecord(res.totalRecord ?? 0);
      setTotalPage(res.totalPage ?? 0);
    } catch (err: unknown) {
      setFetchError(getErrMsg(err));
      setAllUsers([]);
      setTotalRecord(0);
      setTotalPage(0);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    filters.role,
    filters.status,
    filters.isVerified,
    debouncedSearch,
  ]);

  const fetchRoles = useCallback(async () => {
    try {
      const res = await getAllRoles();
      const data = Array.isArray(res) ? res : (res as { data?: Role[] })?.data ?? [];
      setRoles(data);
    } catch {
      // Error handling
    }
  }, []);

  const handleFilterChange = <K extends keyof UserFiltersState>(
    key: K,
    value: UserFiltersState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleBanUser = async () => {
    if (!selectedUser) return;
    try {
      const res = await banUser(selectedUser.id);
      if (res.status == 200) {
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
        setShowPassword(false);
        resetPassword();
      }
    } catch (err: unknown) {
      console.error("Error changing password:", err);
      let message = "Error changing password";
      if (isAxiosError(err)) {
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

  const openModal = (userParam: User, modalType: "password" | "ban" | "role") => {
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

  if (!user) {
    return null;
  }

  const columns = createUserTableColumns(openModal);
  const showEmpty = !loading && totalRecord === 0;

  return (
    <div className="min-h-screen text-white p-6">
      <div
        className="relative rounded-3xl p-8"
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(28px) saturate(120%)",
          WebkitBackdropFilter: "blur(28px) saturate(120%)",
          borderRadius: "22px",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          boxShadow: `
    0 20px 40px rgba(0,0,0,0.18),
    inset 0 1px 0 rgba(255,255,255,0.6),
    inset 0 -1px 0 rgba(255,255,255,0.15)
  `,
        }}
      >
        <div
          className="absolute top-0 left-6 right-6 h-px rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
          }}
        />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <Image
                src="/FigmaFiles/ccubed-icon.svg"
                alt=""
                width={30}
                height={30}
                draggable={false}
                className="select-none"
              />
              User Management
            </h1>
            <p className="text-slate-400">Manage user accounts, roles, and permissions</p>
          </div>
          <span className="text-sm font-semibold text-slate-300 bg-white/10 border border-white/20 rounded-full px-4 py-2">
            {totalRecord} {totalRecord === 1 ? "User" : "Users"}
          </span>
        </div>

        <UserFiltersBar
          filters={filters}
          roles={roles}
          onFilterChange={handleFilterChange}
        />

        {fetchError && (
          <div className="mb-4 rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
            {fetchError}
          </div>
        )}

        {showEmpty ? (
          <EmptyUsersState />
        ) : (
          <>
            <DataTable
              columns={columns}
              data={allUsers}
              headerVariant="purple"
              sort={true}
              loading={loading}
              loadingDelay={0}
            />
            {totalRecord > 0 && (
              <Pagination
                page={page}
                pageSize={PAGE_SIZE}
                totalRecords={totalRecord}
                itemCountOnPage={allUsers.length}
                totalPages={totalPage}
                onPageChange={setPage}
                summaryText={`Showing ${allUsers.length} of ${totalRecord} records`}
                resultsLabel="records"
              />
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setShowPassword(false);
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
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
                className="w-full border-2 text-black bg-white border-gray-300 px-4 py-2.5 pr-11 rounded-lg transition-all"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 translate-y-1/2 top-1 text-gray-500 hover:text-gray-800 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
              </button>
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
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#152E3F] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
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
                setShowPassword(false);
                resetPassword();
              }}
              className="px-10 py-2 border-2 border-[#FAA336] text-[#FAA336] rounded-xl hover:bg-gray-50 font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-10 py-2 bg-[#FAA336] text-white rounded-xl hover:shadow-lg font-semibold transition-all duration-200 flex items-center gap-2"
            >
              <IconKey size={18} />
              Change Password
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isBanModalOpen}
        onClose={() => setIsBanModalOpen(false)}
        title={selectedUser?.status === 1 ? "Ban User" : "Unban User"}
      >
        <div className="space-y-6">
          <div
            className={`p-4 ${
              selectedUser?.status === 1
                ? "bg-white"
                : "bg-green-50 border border-green-200"
            }`}
          >
            <p className="text-gray-700 font-medium">
              Are you sure you want to{" "}
              <span className="font-bold">
                {selectedUser?.status === 1 ? "ban" : "unban"}
              </span>{" "}
              <span className="font-semibold text-[#FAA336]">{selectedUser?.username}</span>?
            </p>
            {selectedUser?.status === 1 && (
              <p className="text-sm text-red-600 mt-2">
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
              onClick={selectedUser?.status === 1 ? handleBanUser : handleUnbanUser}
              className={`px-6 py-2.5 text-white rounded-xl hover:shadow-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                selectedUser?.status === 1
                  ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                  : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              }`}
            >
              {selectedUser?.status === 1 ? (
                "Proceed"
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

      <Modal
        isOpen={isRoleModalOpen}
        onClose={() => {
          setIsRoleModalOpen(false);
          resetRole();
        }}
        title="Change Role"
      >
        <form onSubmit={handleRoleSubmit(handleChangeRole)} className="space-y-6">
          <div className="bg-[#45505a] p-3 rounded">
            <label htmlFor="role" className="block text-sm font-semibold mb-2">
              Select New Role for {selectedUser?.username}
            </label>
            <select
              id="role"
              {...registerRole("role", { required: "Role is required" })}
              className="w-full text-black border-2 bg-white border-gray-300 px-4 py-2.5 rounded-lg font-medium"
              defaultValue={selectedUser?.role}
            >
              {roles.map((role) => (
                <option key={role.id} value={role.name} className="text-black">
                  {role.name.replace(/_/g, " ")}
                </option>
              ))}
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
