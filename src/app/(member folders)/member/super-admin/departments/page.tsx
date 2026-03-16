"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/services/useApiAuth";
import Modal from "@/components/modals/Modal";
import { useForm } from "react-hook-form";

type Department = {
  id: string;
  name: string;
  created_at: string;
  created_by: string;
  updated_at: string | null;
  updated_by: string | null;
};

type DepartmentForm = {
  name: string;
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

function DepartmentsPage() {
  const { user, isLoading } = useUser();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [, setError] = useState<string>(""); // setter-only to avoid unused var error

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  const {
    register: registerCreate,
    handleSubmit: handleCreateSubmit,
    reset: resetCreate,
    formState: { errors: createErrors },
  } = useForm<DepartmentForm>();

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    reset: resetUpdate,
    formState: { errors: updateErrors },
  } = useForm<DepartmentForm>();

  const fetchDepartments = async () => {
    try {
      const res = await getAllDepartments();
      setDepartments(res.data);
    } catch (err: unknown) {
      setError(getErrMsg(err));
      console.log(err);
    }
  };

  const handleCreateDepartment = async (data: DepartmentForm) => {
    try {
      const res = await createDepartment(data.name);
      if (res.status === 201) {
        alert(res.message);
        await fetchDepartments();
        setIsCreateModalOpen(false);
        resetCreate();
      }
    } catch (err: unknown) {
      console.error("Error creating department:", err);
      alert(getErrMsg(err));
    }
  };

  const handleUpdateDepartment = async (data: DepartmentForm) => {
    if (!selectedDepartment) return;
    try {
      const res = await updateDepartment(selectedDepartment.id, data.name);
      if (res.status === 200) {
        alert(res.message);
        await fetchDepartments();
        setIsUpdateModalOpen(false);
        resetUpdate();
      }
    } catch (err: unknown) {
      console.error("Error updating department:", err);
      alert(getErrMsg(err));
    }
  };

  const handleDeleteDepartment = async () => {
    if (!selectedDepartment) return;
    try {
      const res = await deleteDepartment(selectedDepartment.id);
      if (res.status === 200) {
        alert(res.message);
        await fetchDepartments();
        setIsDeleteModalOpen(false);
      }
    } catch (err: unknown) {
      console.error("Error deleting department:", err);
      alert(getErrMsg(err));
    }
  };

  const openModal = (
    department: Department | null,
    modalType: "create" | "update" | "delete"
  ) => {
    setSelectedDepartment(department);
    switch (modalType) {
      case "create":
        setIsCreateModalOpen(true);
        break;
      case "update":
        setIsUpdateModalOpen(true);
        break;
      case "delete":
        setIsDeleteModalOpen(true);
        break;
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Return null if user is not authorized
  if (!user) {
    return null;
  }

  return (
    <div className="flex mt-10 gap-3 flex-col">
      {/* Page Title */}
      <h1 className="text-3xl text-center w-full">Departments</h1>

      {/* Create Department Button */}
      <div className="flex justify-end px-5">
        <button
          onClick={() => openModal(null, "create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New Department
        </button>
      </div>

      {/* Departments Grid Display */}
      <div className="grid grid-cols-3 gap-5 p-5">
        {departments.map((department) => (
          <div key={department.id} className="border-2 border-blue-200 p-4">
            {/* Department Details */}
            <h1 className="font-bold">Department Name: {department.name}</h1>
            <h1>
              Created At:{" "}
              {new Date(parseInt(department.created_at)).toLocaleDateString()}
            </h1>
            <h1>Created By: {department.created_by}</h1>
            {department.updated_at && (
              <h1>
                Last Updated:{" "}
                {new Date(parseInt(department.updated_at)).toLocaleDateString()}
              </h1>
            )}
            {/* Department Action Buttons */}
            <div className="flex flex-col gap-2 mt-2">
              <button
                className="border-2 border-blue-600 px-2 py-1 w-30"
                onClick={() => openModal(department, "update")}
              >
                Update Department
              </button>
              <button
                className="border-2 border-red-600 px-2 py-1 w-30"
                onClick={() => openModal(department, "delete")}
              >
                Delete Department
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Department Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetCreate();
        }}
        title="Create New Department"
      >
        <form
          onSubmit={handleCreateSubmit(handleCreateDepartment)}
          className="space-y-4"
        >
          {/* Department Name Input */}
          <div>
            <label htmlFor="name" className="block font-bold mb-2">
              Department Name
            </label>
            <input
              type="text"
              id="name"
              {...registerCreate("name", {
                required: "Department name is required",
              })}
              className="w-full border-2 border-gray-300 px-2 py-1 rounded"
            />
            {createErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                {createErrors.name.message}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsCreateModalOpen(false);
                resetCreate();
              }}
              className="border-2 border-gray-300 px-4 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Create Department
            </button>
          </div>
        </form>
      </Modal>

      {/* Update Department Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          resetUpdate();
        }}
        title="Update Department"
      >
        <form
          onSubmit={handleUpdateSubmit(handleUpdateDepartment)}
          className="space-y-4"
        >
          {/* Department Name Input */}
          <div>
            <label htmlFor="update-name" className="block font-bold mb-2">
              Department Name
            </label>
            <input
              type="text"
              id="update-name"
              defaultValue={selectedDepartment?.name}
              {...registerUpdate("name", {
                required: "Department name is required",
              })}
              className="w-full border-2 border-gray-300 px-2 py-1 rounded"
            />
            {updateErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                {updateErrors.name.message}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsUpdateModalOpen(false);
                resetUpdate();
              }}
              className="border-2 border-gray-300 px-4 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Update Department
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Department Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Department"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this department?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="border-2 border-gray-300 px-4 py-1 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteDepartment}
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DepartmentsPage;
