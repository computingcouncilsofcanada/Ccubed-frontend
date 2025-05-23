"use client";

import React from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "@/services/useApiAuth";
import { useRouter } from "next/navigation";

type FormFields = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const router = useRouter();
  const form = useForm<FormFields>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await login(data.email, data.password);

      // if (res.data.data.user.is_verified) {
      //   router.push("/login");
      // }
      console.log("Signup success:", res.data);
      // localStorage.setItem("csrf_token", res.data.data.csrfToken);
      alert("Signup successful! Check your email to verify.");
      // if (res.data.data.user.is_verified) {
      //   router.push("/login");
      // }
    } catch (err: any) {
      console.error("Signup failed:", err.response?.data || err.message);
      alert(err.response?.data?.detail || "Signup failed");
    }
  };
  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action="
    "
        className=" mt-10 mx-auto border-white border-2 shadow-2xl flex flex-col gap-4 w-full max-w-md p-5 "
      >
        <h1 className="text-center">CCUBED</h1>
        <p className="text-center">Please sign up to ccubed.</p>
        <a
          href="#"
          className="text-center cursor-pointer border-2 border-gray-200 rounded-md py-2  flex justify-center items-center gap-2"
        >
          <Image
            src="https://developers.google.com/identity/images/g-logo.png"
            alt=""
            className="size-6"
            width={24}
            height={24}
          />
          Sign up with google
        </a>
        <div className="flex gap-1 w-full items-center">
          <div className="h-[0.5px] w-4/9 bg-gray-500"></div>
          <p className="w-1/9 text-center">OR</p>
          <div className="w-4/9 h-[0.5px] bg-gray-500"></div>
        </div>
        <label
          htmlFor="
        username"
          className="font-bold flex flex-col gap-2"
        >
          Username
          <input
            {...register("username", {
              required: "Please provide a username",
            })}
            type="text"
            placeholder="@username"
            id="username"
            className="font-normal text-foreground"
          />
          {errors.username && (
            <div className="text-red-600">{errors.username.message}</div>
          )}
        </label>
        <label
          htmlFor="
        email"
          className="font-bold flex flex-col gap-2"
        >
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
        <label
          htmlFor="
        password"
          className="font-bold flex flex-col gap-2"
        >
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
        <label
          htmlFor="
        confirmpassword"
          className="font-bold flex flex-col gap-2"
        >
          Confirm Password
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => {
                if (value !== form.getValues("password")) {
                  return `Passwords do not match`;
                }
                return true;
              },
            })}
            type="password"
            placeholder="confirm password"
            className="font-normal text-foreground"
          />
          {errors.confirmPassword && (
            <div className="text-red-600">{errors.confirmPassword.message}</div>
          )}
        </label>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Signup;

function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}
