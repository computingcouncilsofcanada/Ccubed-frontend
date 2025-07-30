"use client";

//demo form for contact us

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import { DepartmentSelect } from "@/components/forms/DepartmentSelection";
import {
  Linkedin,
  InstagramIcon,
  TwitterIcon,
  Instagram,
  LinkedinIcon,
  LucideLinkedin,
} from "lucide-react";
function ContactUs() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedDepartment, setSelectedDepartment] = useState("");

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

        <form>
          <div className="flex flex-col lg:flex-row lg:gap-3">
            <div className="flex-1">
              <label htmlFor="" className="text-white text-lg font-normal">
                First Name <span className="text-[#2DBFC6]">*</span>
              </label>

              <input
                type="text"
                className="bg-white  mb-6 mt-2 w-full p-3 rounded-4xl"
                placeholder="First Name"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="" className="text-white text-lg font-normal">
                Last Name <span className="text-[#2DBFC6]">*</span>
              </label>

              <input
                type="text"
                className="bg-white  mb-6 mt-2 w-full p-3 rounded-4xl"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="" className="text-white text-lg font-normal">
              Email Address <span className="text-[#2DBFC6]">*</span>
            </label>
            <input
              type="text"
              className="bg-white  mb-6 mt-2 w-full p-3 rounded-4xl"
              placeholder="Email Address"
            />
          </div>

          <div className="mb-6 text-white text-lg font-normal">
            <DepartmentSelect
              register={register}
              //  error={errors.department}
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
            <textarea className="bg-white border-gray-400 border-1 mb-6 w-full h-30 rounded p-3"></textarea>
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
              className="bg-[#FAA336] text-white text-center px-5 py-3 mt-10 mb-5 rounded-xl w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
