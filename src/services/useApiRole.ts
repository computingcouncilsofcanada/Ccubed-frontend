import { privateAxios } from "@/lib/axios";

export const getAllRoles = async () => {
  const res = await privateAxios.get("/role");
  return res.data;
};

export const getRoleById = async (id: string) => {
  const res = await privateAxios.get(`/role/${id}`);
  return res.data;
};

export const createRole = async (name: string) => {
    const res = await privateAxios.post("/role", { name });
    return res.data;
};

export const updateRole = async (id: string, name: string) => {
    const res = await privateAxios.patch(`/role/${id}`, { name });
    return res.data;
};

export const deleteRole = async (id: string) => {
    const res = await privateAxios.delete(`/role/${id}`);
    return res.data;
};