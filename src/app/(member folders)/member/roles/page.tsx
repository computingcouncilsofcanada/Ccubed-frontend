"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { getAllRoles, updateRole, deleteRole } from "@/services/useApiRole";
import { useForm } from "react-hook-form";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { DataTable } from "@/components/data-table/data-table";
import { getErrMsg } from "@/utils/errorMessage";
import { Role } from "@/types/roles.interface";
import EmptyRolesState from "./components/EmptyRolesState";
import { createRoleTableColumns } from "./components/RoleTableColumns";
import UpdateRoleModal, { RoleForm } from "./components/modals/UpdateRoleModal";
import DeleteRoleModal from "./components/modals/DeleteRoleModal";

function RolesPage() {
  const { user, isLoading } = useUser();
  const [roles, setRoles] = useState<Role[]>([]);
  const [, setError] = useState<string>("");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const router = useRouter();

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    reset: resetUpdate,
    formState: { errors: updateErrors },
  } = useForm<RoleForm>();

  const fetchRoles = useCallback(async () => {
    try {
      const res = await getAllRoles();
      const data = Array.isArray(res) ? res : (res as { data?: Role[] })?.data ?? [];
      setRoles(data);
    } catch (err: unknown) {
      setError(getErrMsg(err));
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleUpdateRole = async (data: RoleForm) => {
    if (!selectedRole) return;

    try {
      await updateRole(selectedRole.id, data.name);
      setIsUpdateModalOpen(false);
      setSelectedRole(null);
      resetUpdate();
      await fetchRoles();
    } catch (err: unknown) {
      console.error("Error updating role:", err);
      alert(getErrMsg(err));
    }
  };

  const handleDeleteRole = async () => {
    if (!selectedRole) return;

    try {
      await deleteRole(selectedRole.id);
      setIsDeleteModalOpen(false);
      setSelectedRole(null);
      await fetchRoles();
    } catch (err: unknown) {
      console.error("Error deleting role:", err);
      alert(getErrMsg(err));
    }
  };

  const openModal = (role: Role | null, type: "update" | "delete") => {
    setSelectedRole(role);
    switch (type) {
      case "update":
        setIsUpdateModalOpen(true);
        break;
      case "delete":
        setIsDeleteModalOpen(true);
        break;
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      }
    }
  }, [user, isLoading, router]);

  if (!user ) {
    return null;
  }

  const columns = createRoleTableColumns(openModal);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Roles</h1>
          <p className="text-gray-600">Manage roles</p>
        </div>
        <Link
          href="/member/roles/create"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
        >
          <IconPlus size={20} />
          Create Role
        </Link>
      </div>

      {roles.length === 0 ? (
        <EmptyRolesState />
      ) : (
        <DataTable
          columns={columns}
          data={roles}
          headerVariant="purple"
          sort={true}
        />
      )}

      <UpdateRoleModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedRole(null);
          resetUpdate();
        }}
        selectedRole={selectedRole}
        register={registerUpdate}
        handleSubmit={handleUpdateSubmit}
        onSubmit={handleUpdateRole}
        errors={updateErrors}
      />

      <DeleteRoleModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRole(null);
        }}
        onConfirm={handleDeleteRole}
      />
    </div>
  );
}

export default RolesPage;
