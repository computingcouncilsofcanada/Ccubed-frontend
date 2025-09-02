"use client";

// This is the schools Page

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  getAllSchools,
  createSchool,
  updateSchool,
  deleteSchool,
} from "@/services/useApiAuth";
import Modal from "@/components/modals/Modal";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";

type School = {
  id: string;
  code: string;
  name: string;
  city: string;
  province: string;
  country: string;
  logo: string | null;
  created_at: string;
  created_by: string;
  updated_at: string | null;
  updated_by: string | null;
};

type SchoolForm = {
  code: string;
  name: string;
  city: string;
  province: string;
  country: string;
  logo?: FileList;
};

function SchoolsPage() {
  const { user, isLoading } = useUser();
  const [schools, setSchools] = useState<School[]>([]);

  // Modal state management
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const router = useRouter();

  // Form handling for create and update operations
  const {
    register: registerCreate,
    handleSubmit: handleCreateSubmit,
    reset: resetCreate,
    formState: { errors: createErrors },
  } = useForm<SchoolForm>();

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    reset: resetUpdate,
    formState: { errors: updateErrors },
  } = useForm<SchoolForm>();

  const fetchSchools = async () => {
    try {
      const res = await getAllSchools();
      setSchools(res.data);
    } catch (err: unknown) {
      // Errors are logged for debugging; no unused state
      console.error("Error fetching schools:", err);
    }
  };

  const handleCreateSchool = async (data: SchoolForm) => {
    try {
      const formData = new FormData();
      formData.append("code", data.code);
      formData.append("name", data.name);
      formData.append("city", data.city);
      formData.append("province", data.province);
      formData.append("country", data.country);
      if (data.logo?.[0]) {
        formData.append("file", data.logo[0]);
      }

      const res = await createSchool(formData);
      setIsCreateModalOpen(false);
      resetCreate();
      if (res.status === 201) {
        alert(res.message);
        await fetchSchools();
      }
    } catch (err: unknown) {
      console.error("Error creating school:", err);
      const message = isAxiosError(err)
        ? err.response?.data?.message ?? err.message
        : err instanceof Error
        ? err.message
        : "Error creating school";
      alert(message);
    }
  };

  const handleUpdateSchool = async (data: SchoolForm) => {
    if (!selectedSchool) return;
    try {
      const formData = new FormData();
      formData.append("code", data.code);
      formData.append("name", data.name);
      formData.append("city", data.city);
      formData.append("province", data.province);
      formData.append("country", data.country);
      if (data.logo?.[0]) {
        formData.append("file", data.logo[0]);
      }

      const res = await updateSchool(selectedSchool.id, formData);
      setIsUpdateModalOpen(false);
      resetUpdate();
      await fetchSchools();
      if (res.status === 201) {
        alert(res.message);
      }
    } catch (err: unknown) {
      console.error("Error updating school:", err);
      const message = isAxiosError(err)
        ? err.response?.data?.message ?? err.message
        : err instanceof Error
        ? err.message
        : "Error updating school";
      alert(message);
    }
  };

  const handleDeleteSchool = async () => {
    if (!selectedSchool) return;
    try {
      const res = await deleteSchool(selectedSchool.id);
      if (res.status === 200) {
        alert(res.message);
        await fetchSchools();
        setIsDeleteModalOpen(false);
      }
    } catch (err: unknown) {
      console.error("Error deleting school:", err);
      const message = isAxiosError(err)
        ? err.response?.data?.message ?? err.message
        : err instanceof Error
        ? err.message
        : "Error deleting school";
      alert(message);
    }
  };

  const openModal = (
    school: School | null,
    modalType: "create" | "update" | "delete"
  ) => {
    setSelectedSchool(school);
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

  // Role-based access control
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      } else if (user.role !== "SUPER_ADMIN") {
        router.push("/member");
      }
    }
  }, [user, isLoading, router]);

  // Fetch schools on component mount
  useEffect(() => {
    fetchSchools();
  }, []);

  // Return null if user is not authorized
  if (!user || user.role !== "SUPER_ADMIN") {
    return null;
  }

  return (
    <div className="flex mt-10 gap-3 flex-col">
      {/* Page Title */}
      <h1 className="text-3xl text-center w-full">Schools</h1>

      {/* Create School Button */}
      <div className="flex justify-end px-5">
        <button
          onClick={() => openModal(null, "create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New School
        </button>
      </div>

      {/* Schools Grid Display */}
      <div className="grid grid-cols-3 gap-5 p-5">
        {schools.map((school) => (
          <div key={school.id} className="border-2 border-blue-200 p-4">
            <h1 className="font-bold">School Name: {school.name}</h1>
            <h1>School Code: {school.code}</h1>
            <h1>
              Location: {school.city}, {school.province}, {school.country}
            </h1>
            <h1>
              Created At:{" "}
              {new Date(parseInt(school.created_at)).toLocaleDateString()}
            </h1>
            <h1>Created By: {school.created_by}</h1>
            {school.updated_at && (
              <h1>
                Last Updated:{" "}
                {new Date(parseInt(school.updated_at)).toLocaleDateString()}
              </h1>
            )}
            {/* School Logo Display */}
            {school.logo && (
              <div className="mt-2">
                <img
                  src={school.logo}
                  alt={`${school.name} logo`}
                  className="w-20 h-20 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            {/* School Action Buttons */}
            <div className="flex flex-col gap-2 mt-2">
              <button
                className="border-2 border-blue-600 px-2 py-1 w-30"
                onClick={() => openModal(school, "update")}
              >
                Update School
              </button>
              <button
                className="border-2 border-red-600 px-2 py-1 w-30"
                onClick={() => openModal(school, "delete")}
              >
                Delete School
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create School Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetCreate();
        }}
        title="Create New School"
      >
        <form
          onSubmit={handleCreateSubmit(handleCreateSchool)}
          className="space-y-4"
        >
          {/* School Code Input */}
          <div>
            <label htmlFor="code" className="block font-bold mb-2">
              School Code
            </label>
            <input
              type="text"
              id="code"
              {...registerCreate("code", {
                required: "School code is required",
              })}
              className="w-full border-2 border-gray-300 px-2 py-1 rounded"
            />
            {createErrors.code && (
              <p className="text-red-500 text-sm mt-1">
                {createErrors.code.message}
              </p>
            )}
          </div>

          {/* School Name Input */}
          <div>
            <label htmlFor="name" className="block font-bold mb-2">
              School Name
            </label>
            <input
              type="text"
              id="name"
              {...registerCreate("name", {
                required: "School name is required",
              })}
              className="w-full border-2 border-gray-300 px-2 py-1 rounded"
            />
            {createErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                {createErrors.name.message}
              </p>
            )}
          </div>

          {/* City Input */}
          <div>
            <label htmlFor="city" className="block font-bold mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              {...registerCreate("city", {
                required: "City is required",
              })}
              className="w-full border-2 border-gray-300 px-2 py-1 rounded"
            />
            {createErrors.city && (
              <p className="text-red-500 text-sm mt-1">
                {createErrors.city.message}
              </p>
            )}
          </div>

          {/* Province Input */}
          <div>
            <label htmlFor="province" className="block font-bold mb-2">
              Province
            </label>
            <input
              type="text"
              id="province"
              {...registerCreate("province", {
                required: "Province is required",
              })}
              className="w-full border-2 border-gray-300 px-2 py-1 rounded"
            />
            {createErrors.province && (
              <p className="text-red-500 text-sm mt-1">
                {createErrors.province.message}
              </p>
            )}
          </div>

          {/* Country Input */}
          <div>
            <label htmlFor="country" className="block font-bold mb-2">
              Country
            </label>
            <input
              type="text"
              id="country"
              {...registerCreate("country", {
                required: "Country is required",
              })}
              className="w-full border-2 border-gray-300 px-2 py-1 rounded"
            />
            {createErrors.country && (
              <p className="text-red-500 text-sm mt-1">
                {createErrors.country.message}
              </p>
            )}
          </div>

          {/* School Logo Upload */}
          <div>
            <label htmlFor="logo" className="block font-bold mb-2">
              School Logo
            </label>
            <input
              type="file"
              id="logo"
              accept="image/*"
              {...registerCreate("logo")}
              className="w-full border-2 border-gray-300 px-2 py-1 rounded"
            />
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
              Create School
            </button>
          </div>
        </form>
      </Modal>

      {/* Update School Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          resetUpdate();
        }}
        title="Update School"
      >
        <form
          onSubmit={handleUpdateSubmit(handleUpdateSchool)}
          className="space-y-4"
        >
          {/* School Code Input */}
          <div>
            <label htmlFor="update-code" className="block font-bold mb-2">
              School Code
            </label>
            <input
              type="text"
              id="update-code"
              defaultValue={selectedSchool?.code}
              {...registerUpdate("code", {
                required: "School code is required",
              })}
              className="w-full border-2 border-gray-300 px-2 py-1 rounded"
            />
            {updateErrors.code && (
              <p className="text-red-500 text-sm mt-1">
                {updateErrors.code.message}
              </p>
            )}
          </div>

          {/* School Name Input */}
          <div>
            <label htmlFor="update-name" className="block font-bold mb-2">
              School Name
            </label>
            <input
              type="text"
              id="update-name"
              defaultValue={selectedSchool?.name}
              {...registerUpdate("name", {
                required: "School name is required",
              })}
              className="w-full border-2 border-gray-300 px-2 py-1 rounded"
            />
            {updateErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                {updateErrors.name.message}
              </p>
            )}
          </div>

          {/* City Input */}
          <div>
            <label htmlFor="update-city" className="block font-bold mb-2">
              City
            </label>
            <input
              type="text"
              id="update-city"
              defaultValue={selectedSchool?.city}
              {...registerUpdate("city", {
                required: "City is required",
              })}
              className="w-full border-2 border-gray-300 px-2 py-1 rounded"
            />
            {updateErrors.city && (
              <p className="text-red-500 text-sm mt-1">
                {updateErrors.city.message}
              </p>
            )}
          </div>

          {/* Province Input */}
          <div>
            <label htmlFor="update-province" className="block font-bold mb-2">
              Province
            </label>
            <input
              type="text"
              id="update-province"
              defaultValue={selectedSchool?.province}
              {...registerUpdate("province", {
                required: "Province is required",
              })}
              className="w-full border-2 border-gray-300 px-2 py-1 rounded"
            />
            {updateErrors.province && (
              <p className="text-red-500 text-sm mt-1">
                {updateErrors.province.message}
              </p>
            )}
          </div>

          {/* Country Input */}
          <div>
            <label htmlFor="update-country" className="block font-bold mb-2">
              Country
            </label>
            <input
              type="text"
              id="update-country"
              defaultValue={selectedSchool?.country}
              {...registerUpdate("country", {
                required: "Country is required",
              })}
              className="w-full border-2 border-gray-300 px-2 py-1 rounded"
            />
            {updateErrors.country && (
              <p className="text-red-500 text-sm mt-1">
                {updateErrors.country.message}
              </p>
            )}
          </div>

          {/* School Logo Upload */}
          <div>
            <label htmlFor="update-logo" className="block font-bold mb-2">
              School Logo
            </label>
            <input
              type="file"
              id="update-logo"
              accept="image/*"
              {...registerUpdate("logo")}
              className="w-full border-2 border-gray-300 px-2 py-1 rounded"
            />
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
              Update School
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete School Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete School"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this school?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="border-2 border-gray-300 px-4 py-1 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteSchool}
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

export default SchoolsPage;
