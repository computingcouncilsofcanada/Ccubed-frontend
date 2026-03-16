"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createRole } from "@/services/useApiRole";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { getErrMsg } from "@/utils/errorMessage";

type CreateRoleForm = { name: string };

export default function CreateRolePage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRoleForm>();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      } else if (user.role !== "SUPER_ADMIN") {
        router.push("/member");
      }
    }
  }, [user, isLoading, router]);

  const onSubmit = async (data: CreateRoleForm) => {
    setIsSubmitting(true);
    try {
      await createRole(data.name);
      router.push("/member/super-admin/roles");
    } catch (err: unknown) {
      console.error("Error creating role:", err);
      alert(getErrMsg(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || user.role !== "SUPER_ADMIN") {
    return null;
  }

  return (
    <div className="p-6">
      <Link
        href="/member/super-admin/roles"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <IconArrowLeft size={20} />
        <span className="font-medium">Back to Roles</span>
      </Link>

      <div className="max-w-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Role</h1>
        <p className="text-gray-600 mb-8">Add a new role.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Role Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              placeholder="e.g. ADMIN, MEMBER"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Link
              href="/member/super-admin/roles"
              className="px-6 py-2.5 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all font-semibold shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
