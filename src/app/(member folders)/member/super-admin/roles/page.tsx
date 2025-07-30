"use client";

import { useUser } from "@/context/UserContext";
import { privateAxios } from "@/lib/axios";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";

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
  const { user, isLoading: isUserLoading } = useUser();
  const router = useRouter();

  // State
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const [error, setError] = useState<string>("");
  const [pendingRolePermissions, setPendingRolePermissions] = useState<
    Record<string, number>
  >({});
  const [isSaving, setIsSaving] = useState(false);

  // Data fetching
  const fetchAllData = async () => {
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
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch data");
      console.error("Error fetching data:", err);
    }
  };

  const fetchRolePermissions = async () => {
    try {
      const response = await privateAxios.get("/role-permission");
      setRolePermissions(response.data.data || response.data);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Failed to fetch role permissions"
      );
      console.error("Error fetching role permissions:", error);
    }
  };

  const groupedPermissions = useMemo(() => {
    if (permissions.length === 0) return {};
    return permissions.reduce((acc, permission) => {
      const groupName = permission.name.split(".")[0];
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
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
    if (pendingRolePermissions.hasOwnProperty(key)) {
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
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.push("/");
      } else if (user.role !== "SUPER_ADMIN") {
        router.push("/member");
      }
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (!isUserLoading && user?.role === "SUPER_ADMIN") {
      fetchAllData();
    }
  }, [user, isUserLoading]);

  if (!user || user.role !== "SUPER_ADMIN") {
    return null;
  }

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Role and Permission Management
      </h1>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end mb-4">
        <button
          className={`px-6 py-2 rounded font-bold text-white ${
            Object.keys(pendingRolePermissions).length === 0 || isSaving
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          onClick={handleSave}
          disabled={
            Object.keys(pendingRolePermissions).length === 0 || isSaving
          }
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="bg-gray-800/50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/70">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Permission
                </th>
                {displayableRoles.map((role) => (
                  <th
                    key={role.id}
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span>{role.name}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleBulkUpdateLocal(role.id, true)}
                          className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                          type="button"
                        >
                          ✓ All
                        </button>
                        <button
                          onClick={() => handleBulkUpdateLocal(role.id, false)}
                          className="text-xs bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                          type="button"
                        >
                          ✕ All
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-800/50 divide-y divide-gray-700">
              {Object.keys(groupedPermissions).map((groupName) => (
                <React.Fragment key={groupName}>
                  <tr>
                    <td
                      colSpan={displayableRoles.length + 1}
                      className="px-6 py-4 bg-gray-900/50"
                    >
                      <h3 className="text-lg font-semibold">{groupName}</h3>
                    </td>
                  </tr>
                  {groupedPermissions[groupName].map((permission) => {
                    return (
                      <tr key={permission.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {permission.name}
                        </td>
                        {displayableRoles.map((role) => {
                          return (
                            <td
                              key={role.id}
                              className="px-6 py-4 whitespace-nowrap text-sm text-center"
                            >
                              <Checkbox
                                checked={isChecked(role.id, permission.id)}
                                onCheckedChange={() =>
                                  handleCheckboxChange(role.id, permission.id)
                                }
                                id={`${role.id}-${permission.id}`}
                              />
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
    </div>
  );
}

export default RolesPage;
