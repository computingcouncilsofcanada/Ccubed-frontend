"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { privateAxios } from "@/lib/axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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
};

type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
};

const page = () => {
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

  const fetchUserData = async () => {
    try {
      const response = await privateAxios.get("/users/me");
      if (response.data.result) {
        setUserData(response.data.data);
        setUser(response.data.data);
      }
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      setError(error.response?.data?.message || "Error fetching user data");
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);


  // Role-based access control check
  useEffect(() => {
    if (!isLoading) {
      // Redirect to home if user is not authenticated
      if (!user) {
        router.push("/login");
      }
      // Redirect to member page if user is not a super admin
      else if (user.role !== "SUPER_ADMIN") {
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
    } catch (error: any) {
      console.error("Error changing password:", error);
      if (
        error.response?.data?.message ===
        "New password cannot be the same as the old password"
      ) {
        setFormError("newPassword", {
          type: "manual",
          message: "New password cannot be the same as the old password",
        });
      } else {
        setFormError("newPassword", {
          type: "manual",
          message: error.response?.data?.message || "Error changing password",
        });
      }
    }
  };


  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      {/* Profile Information Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header with Change Password Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center text-black">
            Profile Information
          </h1>
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Change Password
          </button>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Profile Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Basic Information */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Username</h2>
              <p className="text-xl text-blue-500">{userData?.username}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-600">Email</h2>
              <p className="text-xl text-blue-500">{userData?.email}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-600">Role</h2>
              <p className="text-xl text-blue-500">{userData?.role}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-600">Status</h2>
              <p className="text-xl text-blue-500">
                {userData?.status === 1 ? "Active" : "Banned"}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-600">School ID</h2>
              <p className="text-xl text-blue-500">
                {userData?.school_id || "Not provided"}
              </p>
            </div>
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">
                Account Status
              </h2>
              <p className="text-xl text-blue-500">
                {userData?.is_verified ? "Verified" : "Not Verified"}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-600">
                Year of Study
              </h2>
              <p className="text-xl text-blue-500">
                {userData?.year_of_study || "Not provided"}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-600">
                Department
              </h2>
              <p className="text-xl text-blue-500">
                {userData?.department || "Not provided"}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-600">
                Member Since
              </h2>
              <p className="text-xl text-blue-500">
                {formatDate(userData?.created_at)}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-600">
                Last Updated
              </h2>
              <p className="text-xl text-blue-500">
                {formatDate(userData?.updated_at)}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-600">User ID</h2>
              <p className="text-xl font-mono text-blue-500">{userData?.id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Change Password
            </h2>
            <form
              onSubmit={handleSubmit(handleChangePassword)}
              className="space-y-4"
            >
              {/* Old Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                />
                {errors.oldPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>

              {/* New Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                />
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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

export default page;
