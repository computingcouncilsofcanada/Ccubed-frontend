"use client";

//demo form for /contact-us route

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BackgroundBoxes from "@/components/essentials/BackgroundBoxes";
import { DepartmentSelect } from "@/components/forms/DepartmentSelection";
import Modal from "@/components/modals/Modal";
import Footer from "@/components/shared/Footer";
import Image from "next/image";

type FormFields = {
  firstName: string;
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

    reset();
    setSelectedDepartment("");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) setIsSuccessModalOpen(true);
    } catch (err) {
      console.error(err);
    }
    console.log(data);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b  to-[#162C3D] overflow-hidden relative">
      <BackgroundBoxes />

      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-15 pt-10 flex-1 relative z-10 gap-24">
        <div className="md:w-1/2 w-full">
          <h1 className="text-white font-bold text-[48px] font-roboto mb-2">
            Let&apos;s Get in Touch
          </h1>
          <p className="text-gray-300 text-[16px] font-normal mb-8">
            Or just reach out manually to{" "}
            <span className="text-amber-400">executive@ccubed.dev</span>
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="text-white text-[14px] font-normal ml-5">
                Full Name <span>:</span>
              </label>

              <input
                {...register("firstName", {
                  required: "Name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                  maxLength: { value: 50, message: "Less than 50 characters" },
                })}
                type="text"
                className={`bg-white mb-2 mt-2 w-full h-[48px] p-3 rounded-4xl border transition-all duration-300 ease-in-out
                          focus:border-2 focus:border-[#FAA336] focus:shadow-md focus:outline-none
                          ${errors.firstName ? "border-red-500" : "border-transparent"}`}
                placeholder="Enter Your Full Name"
              />

              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="text-white text-[14px] font-normal ml-5">
                Email <span>:</span>
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                type="email"
                className={`bg-white mb-2 mt-2 w-full h-[48px] p-3 rounded-4xl border transition-all duration-300 ease-in-out
                          focus:border-2 focus:border-[#FAA336] focus:shadow-md focus:outline-none
                          ${errors.email ? "border-red-500" : "border-transparent"}`}
                placeholder="Yourmail@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-6 text-white text-lg font-normal">
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

            <div className="mb-5">
              <label className="text-white text-[14px] font-normal ml-5 block">
                Your Message <span>:</span>
              </label>
              <textarea
                {...register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "At least 10 characters" },
                  maxLength: {
                    value: 1000,
                    message: "Less than 1000 characters",
                  },
                })}
                className={`bg-white w-full box-border h-[100px] rounded-[20px] p-3 mt-2
                          transition-all duration-300 ease-in-out
                          focus:border-2 focus:border-[#FAA336] focus:shadow-md
                          focus:outline-none ${errors.message ? "border border-red-500" : ""}`}
                placeholder="Your text"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#FAA336] text-white text-center px-5 py-3 mt-4 mb-5 rounded-[30px] w-full disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        <div className="md:w-1/2 w-full flex items-center justify-center mb-12 md:mb-40">
          <Image
            src="/FigmaFiles/ccubed-icon.png"
            alt="CCubed Map"
            width={700}
            height={700}
            className="w-auto max-w-[300px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[700px] object-contain shadow-sm"
            priority
          />
        </div>
      </div>

      <div className="mt-8">
        <Footer />
      </div>

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
  );
}
