"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { privateAxios } from "@/lib/axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import UpdateUserForm from "./components/UpdateUserForm";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";

type UserData = {
  school_id: string | null;
  year_of_study: number | null;
  department: string | null;
  email: string;
  username: string;
  role: string;
  status: number;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
  verify_token: string;
  number_of_login_failed: number;
  id: string;
  // Profile fields (if returned by /users/me)
  instagram_url?: string;
  twitter_url?: string;
  avatar_url?: string;
  about_me?: string;
  fun_fact?: string;
  linkedin_url?: string;
  domains?: string[];
  hobbies?: string[];
  favorite_song?: string;
  journey_at_ccubed?: string;
  favorite_quote?: string;
  discord_url?: string;
};

type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
};

// ---- helpers to avoid `any` while preserving messages ----
type ErrWithMessage = { message?: string };
type AxiosErrLike = { response?: { data?: { message?: string } } };
const getErrMsg = (err: unknown): string => {
  if (typeof err === "object" && err !== null) {
    const ax = err as AxiosErrLike;
    if (ax.response?.data?.message) return String(ax.response.data.message);
    const m = err as ErrWithMessage;
    if (m.message) return String(m.message);
  }
  return "Something went wrong";
};

const Page = () => {
  // User context and state management
  const { user, setUser, isLoading } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setError: setFormError,
    formState: { errors },
  } = useForm<ChangePasswordForm>();

  const fetchUserData = useCallback(async () => {
    try {
      const response = await privateAxios.get("/users/me");
      if (response.data.result) {
        setUserData(response.data.data as UserData);
        setUser(response.data.data as UserData);
      }
    } catch (err: unknown) {
      console.error("Error fetching user data:", err);
      setError(getErrMsg(err));
    }
  }, [setUser]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Role-based access control check
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (user.role !== "SUPER_ADMIN") {
        router.push("/member");
      }
    }
  }, [user, isLoading, router]);

  // Return null if user is not authenticated or authorized
  if (!user || user.role !== "SUPER_ADMIN") {
    return null;
  }

  const formatDate = (timestamp: string | null | undefined) => {
    if (!timestamp) return "Not available";
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleChangePassword = async (data: ChangePasswordForm) => {
    try {
      const response = await privateAxios.patch(
        "/users/me/change-password",
        data
      );
      if (response.data.result) {
        alert("Password changed successfully");
        setIsPasswordModalOpen(false);
        reset();
      }
    } catch (err: unknown) {
      console.error("Error changing password:", err);
      const serverMsg = (err as AxiosErrLike).response?.data?.message;
      if (serverMsg === "New password cannot be the same as the old password") {
        setFormError("newPassword", {
          type: "manual",
          message: serverMsg,
        });
      } else {
        setFormError("newPassword", {
          type: "manual",
          message: serverMsg || getErrMsg(err),
        });
      }
    }
  };

  const displayName =
    userData?.username ?? userData?.email?.split("@")[0] ?? "User";

  return (
    <div className="relative w-full overflow-hidden overflow-x-hidden min-h-full p-6 md:p-8 bg-gradient-to-b from-[#10212E] to-[#162C3D]">
      <div className="absolute inset-2 z-0">
        <BgBoxMainPage maxHeight={400} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-6">
        {/* User header card */}
        <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-neutral-700 flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-white truncate">
                {displayName}
              </h2>
              <p className="text-sm text-gray-400 truncate">{userData?.email}</p>
            </div>
            <span className="px-3 py-1.5 rounded-lg bg-neutral-700 text-white text-sm font-medium">
              {userData?.role?.replace(/_/g, " ") ?? "—"}
            </span>
          </div>
        </div>

        {/* Profile Information Card */}
        <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
          {/* Header with Change Password Button */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              Profile Information
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
              </svg>
            </h1>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="bg-[#FAA336] text-white px-4 py-2 rounded-lg hover:bg-[#e8922a] transition-colors font-medium"
            >
              Change Password
            </button>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="bg-red-500/20 border border-red-400/50 text-red-200 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Profile Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Basic Information */}
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-400 mb-1">
                  Username
                </h2>
                <div className="px-3 py-2 rounded-lg bg-neutral-800 text-white text-sm">
                  {userData?.username ?? "—"}
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-400 mb-1">
                  Email
                </h2>
                <div className="px-3 py-2 rounded-lg bg-neutral-800 text-white text-sm">
                  {userData?.email ?? "—"}
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-400 mb-1">Role</h2>
                <div className="px-3 py-2 rounded-lg bg-neutral-800 text-white text-sm">
                  {userData?.role ?? "—"}
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-400 mb-1">
                  Status
                </h2>
                <div className="px-3 py-2 rounded-lg bg-neutral-800 text-white text-sm">
                  {userData?.status === 1 ? "Active" : "Banned"}
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-400 mb-1">
                  School ID
                </h2>
                <div className="px-3 py-2 rounded-lg bg-neutral-800 text-white text-sm">
                  {userData?.school_id || "Not provided"}
                </div>
              </div>
            </div>

            {/* Right Column - Additional Information */}
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-400 mb-1">
                  Account Status
                </h2>
                <div className="px-3 py-2 rounded-lg bg-neutral-800 text-white text-sm">
                  {userData?.is_verified ? "Verified" : "Not Verified"}
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-400 mb-1">
                  Year of Study
                </h2>
                <div className="px-3 py-2 rounded-lg bg-neutral-800 text-white text-sm">
                  {userData?.year_of_study ?? "Not provided"}
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-400 mb-1">
                  Department
                </h2>
                <div className="px-3 py-2 rounded-lg bg-neutral-800 text-white text-sm">
                  {userData?.department || "Not provided"}
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-400 mb-1">
                  Member Since
                </h2>
                <div className="px-3 py-2 rounded-lg bg-neutral-800 text-white text-sm">
                  {formatDate(userData?.created_at)}
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-400 mb-1">
                  Last Updated
                </h2>
                <div className="px-3 py-2 rounded-lg bg-neutral-800 text-white text-sm">
                  {formatDate(userData?.updated_at)}
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-400 mb-1">
                  User ID
                </h2>
                <div className="px-3 py-2 rounded-lg bg-neutral-800 text-white text-sm font-mono">
                  {userData?.id ?? "—"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Update profile (social, about, domains, hobbies) */}
        <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
          <h1 className="text-3xl font-bold text-white mb-6">
            Update profile
          </h1>
          <UpdateUserForm
          key={userData?.id ?? "loading"}
          initialData={{
            username: userData?.username ?? "",
            instagram_url: userData?.instagram_url ?? "",
            twitter_url: userData?.twitter_url ?? "",
            avatar_url: userData?.avatar_url ?? "",
            about_me: userData?.about_me ?? "",
            fun_fact: userData?.fun_fact ?? "",
            linkedin_url: userData?.linkedin_url ?? "",
            discord_url: userData?.discord_url ?? "",
            domains: userData?.domains ?? [],
            hobbies: userData?.hobbies ?? [],
            favorite_song: userData?.favorite_song ?? "",
            journey_at_ccubed: userData?.journey_at_ccubed ?? "",
            favorite_quote: userData?.favorite_quote ?? "",
          }}
          onSuccess={fetchUserData}
        />
        </div>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-white/20 rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Change Password
            </h2>
            <form
              onSubmit={handleSubmit(handleChangePassword)}
              className="space-y-4"
            >
              {/* Old Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Old Password
                </label>
                <input
                  type="password"
                  {...register("oldPassword", {
                    required: "Old password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="block w-full rounded-lg border border-gray-600 bg-neutral-800 px-3 py-2 text-white placeholder-gray-500 focus:border-[#FAA336] focus:ring-1 focus:ring-[#FAA336]"
                />
                {errors.oldPassword && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>

              {/* New Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="block w-full rounded-lg border border-gray-600 bg-neutral-800 px-3 py-2 text-white placeholder-gray-500 focus:border-[#FAA336] focus:ring-1 focus:ring-[#FAA336]"
                />
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 border border-[#FAA336] text-[#FAA336] rounded-lg hover:bg-[#FAA336]/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FAA336] text-white rounded-lg hover:bg-[#e8922a] transition-colors font-medium"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
