/**
 * Login Page Component
 *
 * This page handles user authentication and login functionality.
 * Features:
 * - Email and password form with validation
 * - Google sign-in option
 * - CSRF token management
 * - Role-based redirection after successful login
 * - Error handling and user feedback
 *
 * Security Features:
 * - CSRF protection
 * - Form validation
 * - Secure password handling
 * - Role-based access control
 */

"use client";

import React from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "@/services/useApiAuth";
import { useRouter } from "next/navigation";
import { useCsrf } from "@/context/CsrfContext";
import { useUser } from "@/context/UserContext";

/**
 * FormFields Type Definition
 *
 * @property {string} email - User's email address
 * @property {string} password - User's password
 *
 * This type defines the structure of the login form data
 * and is used with react-hook-form for type safety.
 */
type FormFields = {
  email: string;
  password: string;
};

/**
 * Login Component
 *
 * This component:
 * 1. Manages user authentication through email/password
 * 2. Provides Google sign-in option
 * 3. Handles CSRF token management
 * 4. Implements form validation
 * 5. Manages role-based navigation after successful login
 * 6. Provides user feedback for form submission states
 */
const Login = () => {
  // Initialize hooks for routing, CSRF token management, and user context
  const router = useRouter();
  const { csrfTokenState, setCsrfToken } = useCsrf();
  const { handleInitialLogin } = useUser();

  // Initialize form handling with react-hook-form
  const form = useForm<FormFields>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  /**
   * Handle form submission
   *
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
      console.log("Current CSRF token before login:", csrfTokenState);
      const res = await login(data.email, data.password);

      if (res.status === 201) {
        console.log("Login success:", res.data);

        // Update CSRF token if received from server
        if (res.data.csrfToken) {
          console.log("Received new CSRF token:", res.data.csrfToken);
          setCsrfToken(res.data.csrfToken);
        }

        // Handle user data and role-based navigation
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
      console.error("Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="">
      {/* Login Form Container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="mt-10 mx-auto border-white border-2 shadow-2xl flex flex-col gap-4 w-full max-w-md p-5"
      >
        {/* Form Header */}
        <h1 className="text-center">CCUBED</h1>
        <p className="text-center">Please sign in to ccubed.</p>

        {/* Google Sign-in Button */}
        <a
          href="#"
          className="text-center cursor-pointer border-2 border-gray-200 rounded-md py-2 flex justify-center items-center gap-2"
        >
          <Image
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            className="size-6"
            width={24}
            height={24}
          />
          Sign in with google
        </a>

        {/* Form Divider */}
        <div className="flex gap-1 w-full items-center">
          <div className="h-[0.5px] w-4/9 bg-gray-500"></div>
          <p className="w-1/9 text-center">OR</p>
          <div className="w-4/9 h-[0.5px] bg-gray-500"></div>
        </div>

        {/* Email Input Field with Validation */}
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

        {/* Password Input Field with Validation */}
        <label htmlFor="password" className="font-bold flex flex-col gap-2">
          Password
          <input
            {...register("password", {
              required: "Please enter a password",
              minLength: {
                value: 6,
                message: "Your password should be more than 8",
              },
            })}
            type="password"
            placeholder="password"
            className="font-normal text-foreground"
          />
          {errors.password && (
            <div className="text-red-600">{errors.password.message}</div>
          )}
        </label>

        {/* Submit Button with Loading State */}
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
