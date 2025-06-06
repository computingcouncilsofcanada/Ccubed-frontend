import { privateAxios, publicAxios } from "@/lib/axios";

export const registerUser = async (
  email: string,
  password: string,
  username: string,
  school_id: string,
  year_of_study: number,
  department: string,
  role: string
) => {
  const res = await privateAxios.post("/auth/register", {
    username: username,
    email: email,
    password: password,
    school_id: school_id,
    year_of_study: year_of_study,
    department: department,
    role: role,
  });
  return res.data;
};

export const verifyUserRoute = async (email: string, verify_token: string) => {
  const res = await privateAxios.post("/auth/verify-email", {
    email: email,
    token: verify_token,
  });
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await publicAxios.post("/auth/login", {
    email: email,
    password: password,
  });
  return res.data;
};

export const banUser = async (id: string) => {
  const res = await privateAxios.patch(`/users/ban/${id}`, {
    id: id,
  });
  return res.data;
};
export const unBanUser = async (id: string) => {
  const res = await privateAxios.patch(`/users/unban/${id}`, {
    id: id,
  });
  return res.data;
};

export const changeRole = async (id: string, newRole: string) => {
  const res = await privateAxios.patch(`/users/change-role/${id}`, {
    role: newRole,
  });
  return res.data;
};

export const changePassword = async (id: string, password: string) => {
  const res = await privateAxios.patch(`/users/change-password/${id}`, {
    password: password,
  });
  return res.data;
};

export const getAllSchools = async () => {
  const res = await privateAxios.get("/school");
  return res.data;
};

export const createSchool = async (formData: FormData) => {
  const res = await privateAxios.post("/school", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateSchool = async (id: string, formData: FormData) => {
  const res = await privateAxios.patch(`/school/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteSchool = async (id: string) => {
  const res = await privateAxios.delete(`/school/${id}`);
  return res.data;
};

export const getAllDepartments = async () => {
  const res = await privateAxios.get("/department");
  return res.data;
};

export const createDepartment = async (name: string) => {
  const res = await privateAxios.post("/department", { name });
  return res.data;
};

export const updateDepartment = async (id: string, name: string) => {
  const res = await privateAxios.patch(`/department/${id}`, { name });
  return res.data;
};

export const deleteDepartment = async (id: string) => {
  const res = await privateAxios.delete(`/department/${id}`);
  return res.data;
};

export const getAllEvents = async (limit: number, offset: number) => {
  const res = await privateAxios.get(`/events?limit=${limit}&offset=${offset}`);
  return res.data;
};

export const getEventById = async (id: string) => {
  const res = await privateAxios.get(`/events/${id}`);
  return res.data;
};

export const createEvent = async (formData: FormData) => {
  const res = await privateAxios.post("/events", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateEvent = async (
  id: string,
  data: {
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    location: string;
  }
) => {
  const res = await privateAxios.patch(`/events/${id}`, data);
  return res.data;
};

export const deleteEvent = async (id: string) => {
  const res = await privateAxios.delete(`/events/${id}`);
  return res.data;
};
