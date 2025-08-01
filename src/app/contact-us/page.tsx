"use client";

//demo form for /contact-us route

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import { DepartmentSelect } from "@/components/forms/DepartmentSelection";
import Modal from "@/components/modals/Modal";
import { LucideLinkedin, Instagram, TwitterIcon } from "lucide-react";

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  message: string;
};

export default function ContactUs() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit = async (data: FormFields) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSuccessModalOpen(true);
    reset();
    setSelectedDepartment("");
    console.log(data)
  };

  return (
    <div className="min-h-screen relative w-full overflow-hidden overflow-x-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] -mt-30 pt-20">
      <BgBoxMainPage />

      <div className="flex-row bg-[#1B374C] w-1/2 m-auto px-10 pt-6 rounded-lg mt-20 relative z-10">
        <h1 className="text-white font-extrabold text-[48px] font-roboto mb-5">
          Contact Us
        </h1>

        <div
          className="absolute inset-0 rounded-[30px] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 45%, transparent 90%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "4px",
          }}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row lg:gap-3">
            <div className="flex-1">
              <label className="text-white text-lg font-normal">
                First Name <span className="text-[#2DBFC6]">*</span>
              </label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                  maxLength: { value: 50, message: "Less than 50 characters" },
                })}
                type="text"
                className={`bg-white mb-2 mt-2 w-full p-3 rounded-4xl ${
                  errors.firstName ? "border border-red-500" : ""
                }`}
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="text-white text-lg font-normal">
                Last Name <span className="text-[#2DBFC6]">*</span>
              </label>
              <input
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                  maxLength: { value: 50, message: "Less than 50 characters" },
                })}
                type="text"
                className={`bg-white mb-2 mt-2 w-full p-3 rounded-4xl ${
                  errors.lastName ? "border border-red-500" : ""
                }`}
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-white text-lg font-normal">
              Email Address <span className="text-[#2DBFC6]">*</span>
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              type="email"
              className={`bg-white mb-2 mt-2 w-full p-3 rounded-4xl ${
                errors.email ? "border border-red-500" : ""
              }`}
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6 mt-5 text-white text-lg font-normal">
            <DepartmentSelect
              register={register}
              error={errors.department}
              value={selectedDepartment}
              onChange={(val) => {
                setSelectedDepartment(val);
                setValue("department", val);
              }}
            />
          </div>

          <div>
            <h2 className="mt-6 mb-2 text-white text-lg font-normal">
              Message <span className="text-[#2DBFC6]">*</span>
            </h2>
            <textarea
              {...register("message", {
                required: "Message is required",
                minLength: { value: 10, message: "At least 10 characters" },
                maxLength: {
                  value: 1000,
                  message: "Less than 1000 characters",
                },
              })}
              className={`bg-white border-gray-400 border-1  w-full h-30 rounded p-3 ${
                errors.message ? "border border-red-500" : ""
              }`}
              placeholder="Your message"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          <div>
            <h1 className="text-white font-bold text-[20px] font-roboto mb-5">
              Visit Us
            </h1>
            <div className="icons flex items-center gap-10">
              <LucideLinkedin color="#fff" />
              <Instagram color="#fff" />
              <TwitterIcon color="#fff" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#FAA336] text-white text-center px-5 py-3 mt-10 mb-5 rounded-xl w-full disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>

        {/* Success Modal */}
        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          title="Message Sent Successfully!"
        >
          <div className="text-center">
            <div className="text-green-400 text-6xl mb-4">✓</div>
            <p className="text-lg mb-4">
              Thank you for your message! We have received your inquiry and will
              get back to you soon.
            </p>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="bg-blue-300 text-white px-6 py-2 rounded-md hover:bg-blue-200"
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
