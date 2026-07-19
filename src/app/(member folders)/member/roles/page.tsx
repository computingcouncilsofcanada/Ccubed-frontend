"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getAllRoles, updateRole, deleteRole, createRole } from "@/services/useApiRole";
import { useForm } from "react-hook-form";
import { IconPlus } from "@tabler/icons-react";
import { DataTable } from "@/components/data-table/data-table";
import { getErrMsg } from "@/utils/errorMessage";
import { Role } from "@/types/roles.interface";
import EmptyRolesState from "./components/EmptyRolesState";
import { createRoleTableColumns } from "./components/RoleTableColumns";
import UpdateRoleModal, { RoleForm } from "./components/modals/UpdateRoleModal";
import CreateRoleModal from "./components/modals/CreateRoleModal";
import DeleteRoleModal from "./components/modals/DeleteRoleModal";

const glassPanelStyle = {
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
};

function RolesPage() {
  const { user, isLoading } = useUser();
  const [roles, setRoles] = useState<Role[]>([]);
  const [, setError] = useState<string>("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();

  const {
    register: registerCreate,
    handleSubmit: handleCreateSubmit,
    reset: resetCreate,
    formState: { errors: createErrors },
  } = useForm<RoleForm>();

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

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  const handleCreateRole = async (data: RoleForm) => {
    setIsCreating(true);
    try {
      await createRole(data.name);
      setIsCreateModalOpen(false);
      resetCreate();
      await fetchRoles();
    } catch (err: unknown) {
      console.error("Error creating role:", err);
      alert(getErrMsg(err));
    } finally {
      setIsCreating(false);
    }
  };

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

  const openCreateModal = () => {
    resetCreate();
    setIsCreateModalOpen(true);
  };

  if (!user) {
    return null;
  }

  const columns = createRoleTableColumns(openModal);

  return (
    <div className="min-h-screen text-white p-6">
      <div className="relative rounded-3xl p-8" style={glassPanelStyle}>
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
              Roles
            </h1>
            <p className="text-slate-400">Manage roles</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-300 bg-white/10 border border-white/20 rounded-full px-4 py-2">
              {roles.length} {roles.length === 1 ? "Role" : "Roles"}
            </span>
            <button
              type="button"
              onClick={openCreateModal}
              style={{ backgroundColor: "#FAA336" }}
              className="px-6 py-3 text-black rounded-3xl hover:opacity-90 transition-all font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <IconPlus size={20} />
              Create Role
            </button>
          </div>
        </div>

        {roles.length === 0 ? (
          <EmptyRolesState onCreateClick={openCreateModal} />
        ) : (
          <DataTable
            columns={columns}
            data={roles}
            headerVariant="purple"
            sort={true}
          />
        )}
      </div>

      <CreateRoleModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetCreate();
        }}
        register={registerCreate}
        handleSubmit={handleCreateSubmit}
        onSubmit={handleCreateRole}
        errors={createErrors}
        isSubmitting={isCreating}
      />

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
