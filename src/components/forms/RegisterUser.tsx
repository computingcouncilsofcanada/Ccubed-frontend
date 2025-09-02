"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

import {
  registerUser,
  getAllSchools,
  getAllDepartments,
  getAllRoles,
} from "@/services/useApiAuth";
import { usePasswordGenerator } from "@/hooks/usePasswordGenerator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Form Fields Type Definition
 * Represents the structure of the user registration form
 */
type FormFields = {
  email: string;
  password: string;
  username: string;
  school_id: string;
  year_of_study: number;
  department: string;
  role: string;
};

interface School {
  id: string;
  name: string;
  code: string;
}

interface Department {
  id: string;
  name: string;
}

interface Roles {
  id: string;
  name: string;
}

export const RegisterUserForm = () => {
  const { generatePassword } = usePasswordGenerator();
  const router = useRouter();

  const [schools, setSchools] = useState<School[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [roles, setRoles] = useState<Roles[]>([]);

  const form = useForm<FormFields>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolsRes = await getAllSchools();
        const departmentsRes = await getAllDepartments();
        const rolesRes = await getAllRoles();
        setSchools(schoolsRes.data);
        setDepartments(departmentsRes.data);
        setRoles(rolesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCopyPassword = () => {
    const passwordInput = document.querySelector(
      'input[type="password"]'
    ) as HTMLInputElement | null;
    if (passwordInput && passwordInput.value.length > 0) {
      navigator.clipboard.writeText(passwordInput.value);
      alert("Password copied to clipboard!");
    }
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setValue("password", newPassword);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await registerUser(
        data.email,
        data.password,
        data.username,
        data.school_id,
        Number(data.year_of_study),
        data.department,
        data.role.toUpperCase()
      );
      if (res.status === 201) {
        console.log("Register success:", res.data);
        setTimeout(() => {
          router.push("/member/super-admin/users");
        }, 1000);
      }
    } catch (err: unknown) {
      const msg =
        isAxiosError(err) && typeof err.response?.data?.message === "string"
          ? err.response.data.message
          : isAxiosError(err)
          ? err.message
          : "Register failed";
      console.error("Register failed:", err);
      alert(msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 mx-auto border-white border-2 shadow-2xl flex flex-col gap-4 w-full max-w-md p-5"
    >
      {/* Form Header */}
      <h1 className="text-center">CCUBED</h1>
      <p className="text-center">Register a new user</p>

      {/* Username Input */}
      <label htmlFor="username" className="font-bold flex flex-col gap-2">
        Username
        <input
          {...register("username", {
            required: "Please enter a username",
            minLength: {
              value: 2,
              message: "Your username should be more than 2",
            },
          })}
          type="text"
          placeholder="username"
          className="font-normal text-foreground"
        />
        {errors.username && (
          <div className="text-red-600">{errors.username.message}</div>
        )}
      </label>

      {/* Email Input */}
      <label htmlFor="email" className="font-bold flex flex-col gap-2">
        Email
        <input
          {...register("email", {
            required: "Please provide an email",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },
          })}
          type="email"
          placeholder="email"
          className="font-normal text-foreground"
        />
        {errors.email && (
          <div className="text-red-600">{errors.email.message}</div>
        )}
      </label>

      {/* Password Input with Generation and Copy Options */}
      <label htmlFor="password" className="font-bold flex flex-col gap-2">
        Password
        <div className="flex gap-2 flex-col">
          <input
            {...register("password", {
              required: "Please enter a password",
              minLength: {
                value: 8,
                message: "Your password should be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character from @$!%*?&",
              },
            })}
            type="password"
            placeholder="password"
            className="font-normal text-foreground flex-1"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleGeneratePassword}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Generate
            </button>
            <button
              type="button"
              onClick={handleCopyPassword}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Copy
            </button>
          </div>
        </div>
        {errors.password && (
          <div className="text-red-600">{errors.password.message}</div>
        )}
      </label>

      {/* School Selection */}
      <div className="font-bold flex flex-col gap-2">
        <label htmlFor="school_id">School</label>
        <Select
          onValueChange={(value) => setValue("school_id", value)}
          {...register("school_id", {
            required: "Please select a school",
          })}
        >
          <SelectTrigger className="w-full border-2 border-gray-200 p-2 rounded-md outline-none bg-background text-foreground">
            <SelectValue placeholder="Select a school" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border-2 border-gray-200">
            {schools.map((school) => (
              <SelectItem
                key={school.id}
                value={school.id}
                className="cursor-pointer hover:bg-gray-100 text-black"
              >
                {school.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.school_id && (
          <div className="text-red-600">{errors.school_id.message}</div>
        )}
      </div>

      {/* Year of Study Input */}
      <label htmlFor="year_of_study" className="font-bold flex flex-col gap-2">
        Year of Study
        <input
          {...register("year_of_study", {
            required: "Please enter a year of study",
            valueAsNumber: true,
            min: { value: 1, message: "Year of study must be between 1 and 5" },
            max: { value: 5, message: "Year of study must be between 1 and 5" },
          })}
          type="number"
          placeholder="year of study"
          className="font-normal text-foreground"
        />
        {errors.year_of_study && (
          <div className="text-red-600">{errors.year_of_study.message}</div>
        )}
      </label>

      {/* Department Selection */}
      <div className="font-bold flex flex-col gap-2">
        <label htmlFor="department">Department</label>
        <Select
          onValueChange={(value) => setValue("department", value)}
          {...register("department", {
            required: "Please select a department",
          })}
        >
          <SelectTrigger className="w-full border-2 border-gray-200 p-2 rounded-md outline-none bg-background text-foreground">
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border-2 border-gray-200">
            {departments.map((department) => (
              <SelectItem
                key={department.id}
                value={department.id}
                className="cursor-pointer hover:bg-gray-100 text-black"
              >
                {department.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.department && (
          <div className="text-red-600">{errors.department.message}</div>
        )}
      </div>

      {/* Role Selection */}
      <div className="font-bold flex flex-col gap-2">
        <label htmlFor="role">Role</label>
        <Select
          onValueChange={(value) => setValue("role", value)}
          {...register("role", {
            required: "Please select a role",
          })}
        >
          <SelectTrigger className="w-full border-2 border-gray-200 p-2 rounded-md outline-none bg-background text-foreground">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border-2 border-gray-200">
            {roles.map((role) => (
              <SelectItem
                key={role.id}
                value={role.name}
                className="cursor-pointer hover:bg-gray-100 text-black"
              >
                {role.name.toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.role && (
          <div className="text-red-600">{errors.role.message}</div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
};
