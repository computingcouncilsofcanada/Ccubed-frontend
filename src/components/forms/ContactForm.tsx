"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Modal from "@/components/modals/Modal";

type FormFields = {
  name: string;
  email: string;
  department: string;
  message: string;
};

type Department = {
  name: string;
  id: number;
};

// Department descriptions mapping
const departmentDescriptions: Record<string, string> = {
  "system administration":
    "Connect with our system administration team for technical support, account management, and system-related inquiries.",
  communications:
    "Get in touch with our communications team for media inquiries, press releases, and public relations matters.",
  outreach:
    "Reach out to our outreach team for community engagement, external partnerships, and public awareness initiatives.",
  events:
    "Contact our events team for information about upcoming events, event registration, and event-related questions.",
  partnerships:
    "Connect with our partnerships team for collaboration opportunities, sponsorship inquiries, and strategic alliances.",
  default:
    "Please select a department to get specific information about how we can help you.",
};

// Use a constant list (no state setter = no unused-var lint error)
const departments: Department[] = [
  { name: "System Administration", id: 1 },
  { name: "Communications", id: 2 },
  { name: "Outreach", id: 3 },
  { name: "Events", id: 4 },
  { name: "Partnerships", id: 5 },
];

export const ContactForm = () => {
  const [selectedDepartmentName, setSelectedDepartmentName] = useState<string>("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const form = useForm<FormFields>({
    defaultValues: {
      department: "", // force the user to choose
    },
  });

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onsubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success modal
    setIsSuccessModalOpen(true);

    // Reset form
    reset();
    setSelectedDepartmentName("");
  };

  const getDepartmentDescription = (departmentName: string) => {
    const normalizedName = departmentName.toLowerCase();
    return (
      departmentDescriptions[normalizedName] || departmentDescriptions.default
    );
  };

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit(onsubmit)}
        className="font-patrick mt-5 flex flex-col gap-4"
        noValidate
      >
        <label htmlFor="name" className="font-patrick">
          <p>Name:</p>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters long",
              },
              maxLength: {
                value: 50,
                message: "Name must be less than 50 characters",
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Name can only contain letters and spaces",
              },
            })}
            type="text"
            placeholder="Enter your full name"
            className={`border-2 border-background p-2 rounded-md outline-none w-full ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </label>

        <label htmlFor="email" className="font-patrick">
          <p>Email:</p>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            type="email"
            placeholder="Enter your email address"
            className={`border-2 border-background p-2 rounded-md outline-none w-full ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </label>

        <div>
          <label htmlFor="department" className="font-patrick">
            <p>Choose Department</p>
            <p>
              {selectedDepartmentName
                ? getDepartmentDescription(selectedDepartmentName)
                : departmentDescriptions.default}
            </p>
            <select
              {...register("department", {
                required: "Please select a department",
                validate: (value) =>
                  value !== "" || "Please select a department",
              })}
              onChange={(e) => {
                setValue("department", e.target.value);
                setSelectedDepartmentName(e.target.value);
              }}
              className={`w-full border-2 border-background p-2 rounded-md outline-none bg-foreground text-background ${
                errors.department ? "border-red-500" : ""
              }`}
            >
              <option value="">Select a department</option>
              {departments.map(({ name, id }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">
                {errors.department.message}
              </p>
            )}
          </label>
        </div>

        <label htmlFor="message" className="font-patrick">
          <p>Message:</p>
          <textarea
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters long",
              },
              maxLength: {
                value: 1000,
                message: "Message must be less than 1000 characters",
              },
            })}
            name="message"
            placeholder="Enter your message here..."
            className={`border-2 border-background focus:outline-none active:outline-none w-full h-50 resize-none p-2 rounded-md ${
              errors.message ? "border-red-500" : ""
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-background text-foreground py-2 px-4 rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Send Message"}
        </button>
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
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};
