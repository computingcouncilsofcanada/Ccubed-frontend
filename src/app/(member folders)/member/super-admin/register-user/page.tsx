/**
 * User Registration Page
 *
 * This page provides a comprehensive interface for super admins to register new users in the system.
 * It includes functionality for creating user accounts with various roles and affiliations.
 * Access is restricted to super admin users only.
 *
 * Key Features:
 * - User registration form with validation
 * - School and department selection
 * - Password generation and copying
 * - Role assignment
 * - Form validation
 * - Role-based access control
 */

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  registerUser,
  getAllSchools,
  getAllDepartments,
} from "@/services/useApiAuth";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
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

/**
 * School Interface
 * Represents the structure of a school in the system
 */
interface School {
  id: string;
  name: string;
  code: string;
}

/**
 * Department Interface
 * Represents the structure of a department in the system
 */
interface Department {
  id: string;
  name: string;
}

/**
 * RegisterUser Component
 * Main component for user registration
 */
const RegisterUser = () => {
  // State management for user context and authentication
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { generatePassword } = usePasswordGenerator();

  // State for schools and departments data
  const [schools, setSchools] = useState<School[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  /**
   * Fetches schools and departments data on component mount
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolsRes = await getAllSchools();
        const departmentsRes = await getAllDepartments();
        setSchools(schoolsRes.data);
        setDepartments(departmentsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  /**
   * Copies the generated password to clipboard
   */
  const handleCopyPassword = () => {
    const passwordInput = document.querySelector(
      'input[type="password"]'
    ) as HTMLInputElement;
    if (passwordInput && passwordInput.value.length > 0) {
      navigator.clipboard.writeText(passwordInput.value);
      alert("Password copied to clipboard!");
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

  // Return null if user is not authorized
  if (!user || user.role !== "SUPER_ADMIN") {
    return null;
  }

  // Form handling
  const form = useForm<FormFields>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  /**
   * Generates a new password and sets it in the form
   */
  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setValue("password", newPassword);
  };

  /**
   * Handles form submission
   * Registers a new user and redirects to users list on success
   */
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await registerUser(
        data.email,
        data.password,
        data.username,
        data.school_id,
        parseInt(data.year_of_study.toString()),
        data.department,
        data.role.toUpperCase()
      );
      if (res.status === 201) {
        console.log("Register success:", res.data);
        setTimeout(() => {
          router.push("/member/super-admin/users");
        }, 1000);
      }
    } catch (err: any) {
      console.error("Register failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="">
      {/* Registration Form */}
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
                    "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character from the following: @$!%*?&",
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
        <label
          htmlFor="year_of_study"
          className="font-bold flex flex-col gap-2"
        >
          Year of Study
          <input
            {...register("year_of_study", {
              required: "Please enter a year of study",
              minLength: {
                value: 1,
                message: "Please enter a valid year of study",
              },
              maxLength: {
                value: 1,
                message: "Please enter a valid year of study",
              },
              pattern: {
                value: /^[1-5]$/,
                message: "Year of study must be between 1 and 5",
              },
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
              <SelectItem
                value="STUDENT"
                className="cursor-pointer hover:bg-gray-100 text-black"
              >
                Student
              </SelectItem>
              <SelectItem
                value="STAFF"
                className="cursor-pointer hover:bg-gray-100 text-black"
              >
                Staff
              </SelectItem>
              <SelectItem
                value="ADMIN"
                className="cursor-pointer hover:bg-gray-100 text-black"
              >
                Admin
              </SelectItem>
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
    </div>
  );
};

export default RegisterUser;
