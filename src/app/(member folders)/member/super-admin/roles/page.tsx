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

  // Grouped Permissions
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

  // Role-Permission operations
  const handleToggleRolePermission = async (
    roleId: string,
    permissionId: string
  ) => {
    const current = rolePermissions.find(
      (rp) => rp.role_id === roleId && rp.permission_id === permissionId
    );
    const currentStatus = current ? current.status : 0;
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      await privateAxios.patch(`/role-permission/${roleId}/${permissionId}`, {
        status: newStatus,
      });
      if (current) {
        setRolePermissions(
          rolePermissions.map((rp) =>
            rp.id === current.id ? { ...rp, status: newStatus } : rp
          )
        );
      } else {
        await fetchRolePermissions();
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Failed to update role permission"
      );
      console.error("Error updating role permission:", error);
    }
  };

  const handleBulkUpdate = async (roleId: string, check: boolean) => {
    const newStatus = check ? 1 : 0;
    const updates: Promise<any>[] = [];

    permissions.forEach((permission) => {
      const currentStatus =
        rolePermissions.find(
          (rp) => rp.role_id === roleId && rp.permission_id === permission.id
        )?.status ?? 0;

      if (currentStatus !== newStatus) {
        updates.push(
          privateAxios.patch(`/role-permission/${roleId}/${permission.id}`, {
            status: newStatus,
          })
        );
      }
    });

    if (updates.length > 0) {
      try {
        await Promise.all(updates);
        await fetchRolePermissions();
      } catch (error: any) {
        alert(error.response?.data?.message || "Bulk update failed");
      }
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

  // Initial data fetch
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
                          onClick={() => handleBulkUpdate(role.id, true)}
                          className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        >
                          ✓ All
                        </button>
                        <button
                          onClick={() => handleBulkUpdate(role.id, false)}
                          className="text-xs bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
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
                          const isChecked = rolePermissions.some(
                            (rp) =>
                              rp.role_id === role.id &&
                              rp.permission_id === permission.id &&
                              rp.status === 1
                          );
                          return (
                            <td
                              key={role.id}
                              className="px-6 py-4 whitespace-nowrap text-sm text-center"
                            >
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={() =>
                                  handleToggleRolePermission(
                                    role.id,
                                    permission.id
                                  )
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
