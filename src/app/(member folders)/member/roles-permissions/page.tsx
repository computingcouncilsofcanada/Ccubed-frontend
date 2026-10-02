"use client";

import { privateAxios } from "@/lib/axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { isAxiosError } from "axios";
import { IconShield, IconCheck, IconX, IconDeviceFloppy } from "@tabler/icons-react";

// Types
type Role = {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
};

type Permission = {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  description: string | null;
};

type RolePermission = {
  id: string;
  role_id: string;
  permission_id: string;
  status: number; // 0 for not allowed, 1 for allowed
  role?: Role;
  permission?: Permission;
};

function RolesPage() {

  // State
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const [error, setError] = useState<string>("");
  const [pendingRolePermissions, setPendingRolePermissions] = useState<
    Record<string, number>
  >({});
  const [isSaving, setIsSaving] = useState(false);

  const getAxiosMessage = (err: unknown, fallback = "Request failed") => {
    if (isAxiosError(err)) {
      return err.response?.data?.message ?? err.message ?? fallback;
    }
    if (err instanceof Error) return err.message;
    return fallback;
  };

  // Data fetching
  const fetchAllData = useCallback(async () => {
    try {
      const [rolesRes, permissionsRes, rolePermissionsRes] = await Promise.all([
        privateAxios.get("/role"),
        privateAxios.get("/permission"),
        privateAxios.get("/role-permission"),
      ]);

      setRoles(rolesRes.data.data || rolesRes.data);
      setPermissions(permissionsRes.data.data || permissionsRes.data);
      setRolePermissions(
        rolePermissionsRes.data.data || rolePermissionsRes.data
      );
    } catch (err: unknown) {
      const msg = getAxiosMessage(err, "Failed to fetch data");
      setError(msg);
    }
  }, []);

  const groupedPermissions = useMemo(() => {
    if (permissions.length === 0) return {} as Record<string, Permission[]>;
    return permissions.reduce((acc, permission) => {
      const groupName = permission.name.split(".")[0];
      if (!acc[groupName]) acc[groupName] = [];
      acc[groupName].push(permission);
      return acc;
    }, {} as Record<string, Permission[]>);
  }, [permissions]);

  const displayableRoles = useMemo(
    () => roles.filter((role) => role.name !== "SUPER_ADMIN"),
    [roles]
  );

  const getKey = (roleId: string, permissionId: string) =>
    `${roleId}__${permissionId}`;

  const isChecked = (roleId: string, permissionId: string) => {
    const key = getKey(roleId, permissionId);
    if (Object.prototype.hasOwnProperty.call(pendingRolePermissions, key)) {
      return pendingRolePermissions[key] === 1;
    }
    return rolePermissions.some(
      (rp) =>
        rp.role_id === roleId &&
        rp.permission_id === permissionId &&
        rp.status === 1
    );
  };

  const handleCheckboxChange = (roleId: string, permissionId: string) => {
    const key = getKey(roleId, permissionId);
    const currentlyChecked = isChecked(roleId, permissionId);
    setPendingRolePermissions((prev) => ({
      ...prev,
      [key]: currentlyChecked ? 0 : 1,
    }));
  };

  const handleBulkUpdateLocal = (roleId: string, check: boolean) => {
    const newStatus = check ? 1 : 0;
    setPendingRolePermissions((prev) => {
      const updated = { ...prev };
      permissions.forEach((permission) => {
        const key = getKey(roleId, permission.id);
        // Only update if the current (pending or backend) status is different
        if (isChecked(roleId, permission.id) !== check) {
          updated[key] = newStatus;
        }
      });
      return updated;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    try {
      const payload = Object.entries(pendingRolePermissions).map(
        ([key, status]) => {
          const [role_id, permission_id] = key.split("__");
          return { role_id, permission_id, status };
        }
      );
      if (payload.length === 0) {
        setIsSaving(false);
        return;
      }
      await privateAxios.patch("/role-permission", payload);
      await fetchAllData();
      setPendingRolePermissions({});
    } catch (err: unknown) {
      setError(getAxiosMessage(err, "Failed to save changes"));
    } finally {
      setIsSaving(false);
    }
  };


  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const hasPendingChanges = Object.keys(pendingRolePermissions).length > 0;

  return (
    <div className="min-h-full p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
            <IconShield size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-200">
              Role & Permission Management
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage roles and their associated permissions
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-500/20 border-l-4 border-red-500/80 text-red-200 px-4 py-3 rounded-r-lg shadow-sm">
          <div className="flex items-center gap-2">
            <IconX size={20} />
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end mb-6">
        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 ${
            !hasPendingChanges || isSaving
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:shadow-xl transform hover:scale-105"
          }`}
          onClick={handleSave}
          disabled={!hasPendingChanges || isSaving}
        >
          <IconDeviceFloppy size={20} />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Table Container  */}
      <div className="bg-gray-800/40 rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <div className="max-h-[calc(100vh-14rem)] overflow-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky top-0 z-20 bg-gray-700 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white shadow-[0_1px_0_0_rgba(255,255,255,0.1)]"
                >
                  Permission
                </th>
                {displayableRoles.map((role) => (
                  <th
                    key={role.id}
                    scope="col"
                    className="sticky top-0 z-20 bg-gray-600 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-[0_1px_0_0_rgba(255,255,255,0.1)]"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-sm font-bold">{role.name}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleBulkUpdateLocal(role.id, true)}
                          className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 text-white font-semibold py-1.5 px-3 rounded-lg transition-all duration-200 backdrop-blur-sm"
                          type="button"
                        >
                          <IconCheck size={14} />
                          All
                        </button>
                        <button
                          onClick={() => handleBulkUpdateLocal(role.id, false)}
                          className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 text-white font-semibold py-1.5 px-3 rounded-lg transition-all duration-200 backdrop-blur-sm"
                          type="button"
                        >
                          <IconX size={14} />
                          All
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-800/30 divide-y divide-gray-700">
              {Object.keys(groupedPermissions).map((groupName) => (
                <React.Fragment key={groupName}>
                  <tr className="bg-gray-700/50">
                    <td
                      colSpan={displayableRoles.length + 1}
                      className="px-6 py-4"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full"></div>
                        <h3 className="text-base font-bold text-gray-200">
                          {groupName}
                        </h3>
                      </div>
                    </td>
                  </tr>
                  {groupedPermissions[groupName].map((permission, permIndex) => {
                    const isEven = permIndex % 2 === 0;
                    return (
                      <tr
                        key={permission.id}
                        className={`transition-colors ${
                          isEven ? "bg-gray-800/40" : "bg-gray-800/20"
                        } hover:bg-white/5`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-300">
                              {permission.description || permission.name.split(".").slice(1).join(".") || permission.name}
                            </span>
                          </div>
                        </td>
                        {displayableRoles.map((role) => {
                          return (
                            <td
                              key={role.id}
                              className="px-6 py-4 whitespace-nowrap text-center"
                            >
                              <div className="flex justify-center">
                                <Checkbox
                                  checked={isChecked(role.id, permission.id)}
                                  onCheckedChange={() =>
                                    handleCheckboxChange(role.id, permission.id)
                                  }
                                  id={`${role.id}-${permission.id}`}
                                  className="border-gray-500 text-gray-800 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                                />
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Changes Indicator */}
      {hasPendingChanges && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-amber-200 bg-amber-500/20 px-4 py-2 rounded-lg border border-amber-500/40">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          <span className="font-medium">
            You have unsaved changes. Don&apos;t forget to save!
          </span>
        </div>
      )}
    </div>
  );
}

export default RolesPage;
