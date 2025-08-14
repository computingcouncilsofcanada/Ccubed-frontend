"use client";

//demo form for /contact-us route

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BackgroundBoxes from "@/components/essentials/BackgroundBoxes";
import { DepartmentSelect } from "@/components/forms/DepartmentSelection";
import Modal from "@/components/modals/Modal";

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
    setIsSuccessModalOpen(true);
    reset();
    setSelectedDepartment("");
    console.log(data);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b  to-[#162C3D] overflow-hidden relative">
      <BackgroundBoxes />

      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-15 pt-10 flex-1 relative z-10 gap-24">
 
        <div className="md:w-1/2 w-full">
          <h1 className="text-white font-medium text-[40px] font-roboto mb-2">
            Let's Get in Touch
          </h1>
          <p className="text-gray-300 mb-8">Or just reach out manually to <span className="text-amber-400">your.mail@gmail.com</span></p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="text-white text-lg font-normal">
                Full Name <span >*</span>
              </label>
              <input
                {...register("firstName", {
                  required: "Name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                  maxLength: { value: 50, message: "Less than 50 characters" },
                })}
                type="text"
                className={`bg-white mb-2 mt-2 w-full p-3 rounded-4xl ${
                  errors.firstName ? "border border-red-500" : ""
                }`}
                placeholder="Enter Your Full Name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="text-white text-lg font-normal">
                Email <span >*</span> 
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
              <label className="text-white text-lg font-normal">
                Your Message <span >*</span>
              </label>
              <textarea
                {...register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "At least 10 characters" },
                  maxLength: { value: 1000, message: "Less than 1000 characters" },
                })}
                className={`bg-white border-gray-400 border-1 w-full h-32 rounded p-3 mt-2 ${
                  errors.message ? "border border-red-500" : ""
                }`}
                placeholder="Your message"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#FAA336] text-white text-center px-5 py-3 mt-4 mb-5 rounded-xl w-full disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        <div className="md:w-1/2 w-full flex flex-col items-start ">
          <img
            src="/FigmaFiles/map.svg"
            alt="CCubed Map"
            width={800}
            height={800}
            className="mb-3"
          />
          <h1 className="text-white font-medium text-[24px] font-roboto mb-3">
            Visit Us
          </h1>
          <p className="mb-5 text-white">Address: <span className="font-extralight">Lorem ipsum dolor sit amet consectetur.  scelerisque tortor amet lacus dolor interdum. Leo</span></p>
          <p className=" text-white">Phone: (+1) 123 234 1234</p>
         
        </div>
      </div>

      <div className="footer flex flex-col md:flex-row md:justify-center md:items-center py-4 w-full px-4 mt-auto gap-200">
        <h1
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "400",
            fontSize: "20px",
            letterSpacing: "0%",
            color: "#FFFFFF",
            opacity: "40%",
            textAlign: "center",
          }}
        >
          COMPUTING COUNCILS OF CANADA
        </h1>
        <div className="social-icons flex items-center gap-3 justify-center mt-2 md:mt-0">
          <img src="/FigmaFiles/social-icons/brand-discord.svg" alt="Discord" />
          <img src="/FigmaFiles/social-icons/brand-linkedin.svg" alt="LinkedIn" />
          <img src="/FigmaFiles/social-icons/brand-instagram.svg" alt="Instagram" />
          <img src="/FigmaFiles/social-icons/brand-facebook.svg" alt="Facebook" />
          <img src="/FigmaFiles/social-icons/brand-twitter.svg" alt="Twitter" />
        </div>
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
