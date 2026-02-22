"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { isAxiosError } from "axios";

import {
  registerUser,
  getAllSchools,
  getAllDepartments,
  getAllRoles,
} from "@/services/useApiAuth";
import { usePasswordGenerator } from "@/hooks/usePasswordGenerator";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";
import BackgroundBoxes from "@/components/essentials/BackgroundBoxes";
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
  const logoSrc = useSafariImageFallback(
    "/FigmaFiles/ccubed-icon.svg",
    "/FigmaFiles/ccubed-icon.png"
  );

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
    <div className="relative w-full h-screen flex items-center justify-center">
     
      <BackgroundBoxes />
   
      <div className="absolute top-8 left-50 flex items-center gap-3 z-20">
        <Image src={logoSrc}
          alt="CCubed Icon"
          width={40}
          height={40}
          quality={100}
          draggable={false}
          style={{ userSelect: "none" }}
        />
        <h1 className="text-white font-bold">CCUBED</h1>
      </div>

      <h1 
        className="absolute bottom-8 left-50 z-20"
        style={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: "600",
          fontSize: "15px",
          letterSpacing: "0%",
          color: "#FFFFFF",
          opacity: "40%"
        }}
      >
        COMPUTING COUNCILS OF CANADA
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 flex flex-col gap-4 w-full max-w-lg p-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl"
      >
      {/* Form Header */}
      <h1 className="text-white font-bold text-4xl mb-4">Register</h1>

      {/* Username Input */}
      <label htmlFor="username" className="font-bold flex flex-col gap-2 text-white">
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
          placeholder="Username"
          className="font-normal bg-white text-foreground rounded-full py-2 px-3 placeholder-gray-400 text-sm"
        />
        {errors.username && (
          <div className="text-white text-sm">{errors.username.message}</div>
        )}
      </label>

      {/* Email Input */}
      <label htmlFor="email" className="font-bold flex flex-col gap-2 text-white">
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
          placeholder="Email Address"
          className="font-normal bg-white text-foreground rounded-full py-2 px-3 placeholder-gray-400 text-sm"
        />
        {errors.email && (
          <div className="text-white text-sm">{errors.email.message}</div>
        )}
      </label>

      {/* Password Input with Generation and Copy Options */}
      <label htmlFor="password" className="font-bold flex flex-col gap-2 text-white">
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
            placeholder="Password"
            className="font-normal bg-white text-foreground rounded-full py-2 px-3 placeholder-gray-400 flex-1 text-sm"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleGeneratePassword}
              className="px-3 py-1 bg-gray-600 text-white rounded-full hover:bg-gray-700 text-xs"
            >
              Generate
            </button>
            <button
              type="button"
              onClick={handleCopyPassword}
              className="px-3 py-1 bg-gray-600 text-white rounded-full hover:bg-gray-700 text-xs"
            >
              Copy
            </button>
          </div>
        </div>
        {errors.password && (
          <div className="text-white text-sm">{errors.password.message}</div>
        )}
      </label>

      {/* School and Year of Study - Side by Side */}
      <div className="flex gap-4">
        {/* School Selection */}
        <div className="font-bold flex flex-col gap-2 flex-1">
          <label htmlFor="school_id" className="text-white">School</label>
          <Select
            onValueChange={(value) => setValue("school_id", value)}
            {...register("school_id", {
              required: "Please select a school",
            })}
          >
            <SelectTrigger className="w-full bg-white text-gray-400 rounded-full py-2 px-3 outline-none text-sm">
              <SelectValue placeholder="Select a school" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
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
            <div className="text-white text-sm">{errors.school_id.message}</div>
          )}
        </div>

        {/* Year of Study Input */}
        <div className="font-bold flex flex-col gap-2 flex-1">
          <label htmlFor="year_of_study" className="text-white">Year of Study</label>
          <input
            {...register("year_of_study", {
              required: "Please enter a year of study",
              valueAsNumber: true,
              min: { value: 1, message: "Year of study must be between 1 and 5" },
              max: { value: 5, message: "Year of study must be between 1 and 5" },
            })}
            type="number"
            placeholder="Select a year"
            className="font-normal bg-white text-foreground rounded-full py-2 px-3 placeholder-gray-400 text-sm"
          />
          {errors.year_of_study && (
            <div className="text-white text-sm">{errors.year_of_study.message}</div>
          )}
        </div>
      </div>

      {/* Department Selection */}
      <div className="font-bold flex flex-col gap-2">
        <label htmlFor="department" className="text-white ">Department</label>
        <Select
          onValueChange={(value) => setValue("department", value)}
          {...register("department", {
            required: "Please select a department",
          })}
        >
          <SelectTrigger className="w-full bg-white text-gray-400 rounded-full py-2 px-3 outline-none text-sm">
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black">
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
          <div className="text-white text-sm">{errors.department.message}</div>
        )}
      </div>

      {/* Role Selection */}
      <div className="font-bold flex flex-col gap-2">
        <label htmlFor="role" className="text-white">Role</label>
        <Select
          onValueChange={(value) => setValue("role", value)}
          {...register("role", {
            required: "Please select a role",
          })}
        >
          <SelectTrigger className="w-full bg-white text-gray-400 rounded-full py-2 px-3 outline-none text-sm">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black">
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
          <div className="text-white text-sm">{errors.role.message}</div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-[#FAA336] text-white px-4 py-3 rounded-full hover:bg-[#f39522] disabled:opacity-50 font-semibold text-lg mt-4"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
      </form>
      
    </div>
  );
};
