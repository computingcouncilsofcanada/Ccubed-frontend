"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "@/services/useApiAuth";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Eye, EyeOff } from "lucide-react";
import { setAxiosCsrfToken } from "@/lib/axios";

type FormFields = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const { handleInitialLogin } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  // Initialize form handling with react-hook-form
  const form = useForm<FormFields>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  /**
   * @param {FormFields} data - Form data containing email and password
   *
   * This function:
   * 1. Attempts to log in the user with provided credentials
   * 2. Updates CSRF token if received from server
   * 3. Handles user data and role-based navigation
   * 4. Provides error handling and user feedback
   */
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await login(data.email, data.password);

      if (res.status === 201) {
        console.log("Login success:", res.data);
        setFormError("");

        if (res.data.csrfToken) {
          setAxiosCsrfToken(res.data.csrfToken);
        }

        if (res.data.user) {
          handleInitialLogin(res.data.user);

          // Redirect user based on their role
          if (res.data.user.role === "ADMIN") {
            router.push("/member/admin");
          } else if (res.data.user.role === "SUPER_ADMIN") {
            router.push("/member/super-admin");
          } else if (res.data.user.role === "STAFF") {
            router.push("/member/staff");
          } else {
            router.push("/member/staff");
          }
        }
      }
    } catch (err: any) {
      setFormError(err.response?.data?.message || err.message);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        noValidate
        className="  bg-transparent  flex justify-center flex-col gap-2 w-1/2  py-8 px-20 rounded-md"
      >
        {/* Form Header */}
        <h1 className="text-[#B8DFCF] font-extrabold  text-2xl">
          Hello Again!
        </h1>
        <h1 className="text-[#B8DFCF] font-extrabold  text-md">Welcome Back</h1>

        {formError && (
          <div className="flex items-center ">
            <img src="/FigmaFiles/LoginFormAssets/error-circle.svg" alt="error image" />
            <p>{formError}</p>
          </div>
        )}

        {/* Email Input Field with Validation */}
        <label
          htmlFor="email"
          className=" font-bold flex flex-col gap-2 text-[#354052]"
        >
          <div className="relative">
            <img
              src={
                form.watch("email")
                  ? "/FigmaFiles/LoginFormAssets/mail.svg"
                  : "/FigmaFiles/LoginFormAssets/mail-inactive.svg"
              }
              alt=""
              className="absolute left-5 top-1/2  -translate-y-1/2 "
            />
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
              className={`font-normal bg-white py-4 rounded-full pl-12 pr-12 ${
                form.watch("email")
                  ? "placeholder-gray-900"
                  : "placeholder-gray-400"
              }`}
            />
            {form.watch("email") && (
              <img
                src={
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    form.watch("email")
                  )
                    ? "/FigmaFiles/LoginFormAssets/mail-correct.svg"
                    : "/FigmaFiles/LoginFormAssets/mail-wrong.svg"
                }
                alt=""
                className="absolute right-5 top-1/2 -translate-y-1/2"
              />
            )}
          </div>
          {errors.email && (
            <div className="text-white">{errors.email.message}</div>
          )}
        </label>

        {/* Password Input Field with Validation */}
        <label
          htmlFor="password"
          className="font-bold mt-3  flex flex-col gap-2 text-[#354052]"
        >
          <div className="relative">
            <img
              src={
                form.watch("password")
                  ? "/FigmaFiles/LoginFormAssets/lock.svg"
                  : "/FigmaFiles/LoginFormAssets/lock-inactive.svg"
              }
              alt=""
              className="absolute left-5 top-1/2  -translate-y-1/2"
            />
            <input
              {...register("password", {
                required: "Please enter a password",
                minLength: {
                  value: 6,
                  message: "Your password should be more than 8",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className={`font-normal text-gray-900 rounded-full pl-12 pr-2 password-asterisk w-full border-none bg-white py-4 ${
                form.watch("password")
                  ? "placeholder-gray-900"
                  : "placeholder-gray-400"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 w-10 top-1/2 transform -translate-y-1/2 text-background hover:text-gray-600 transition-colors border-none"
            >
              {showPassword ? (
                <EyeOff
                  size={20}
                  className={`${
                    form.watch("password") ? "text-gray-900" : "text-gray-400"
                  }`}
                />
              ) : (
                <Eye
                  size={20}
                  className={`${
                    form.watch("password") ? "text-gray-900" : "text-gray-400"
                  }`}
                />
              )}
            </button>
          </div>
          {errors.password && (
            <div className="text-white">{errors.password.message}</div>
          )}
        </label>
        <label htmlFor=""></label>

        {/* Submit Button with Loading State */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-[#FAA336] text-white rounded-full z-20 px-2 py-4 cursor-pointer"
        >
          {isSubmitting ? "Login in..." : "Login"}
        </button>
        <p 
          className="text-center mt-2"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "400",
            fontSize: "14px",
            color: "#FFFFFF",
            opacity: "100%"
          }}
        >
          Forgot Password ?
        </p>
      </form>
    </>
  );
};

export default LoginForm;
