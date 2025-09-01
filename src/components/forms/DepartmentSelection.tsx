"use client";


import { UseFormRegister, FieldError } from "react-hook-form";

type Department = {
  name: string;
  id: number;
};

type DepartmentSelectProps = {
  register: UseFormRegister<any>;
  error?: FieldError;
  value: string;
  onChange: (value: string) => void;
};

const departments: Department[] = [
  { name: "Finance/Sponsorship", id: 1 },
  { name: "Social Media Collabs", id: 2 },
  { name: "General Queries", id: 3 },
  { name: "Partnership/Hiring", id: 4 },
];

// const departmentDescriptions: Record<string, string> = {
//   "finance/sponsorship": "Finance/Sponsorship questions - finance@ccubed.dev",
//   "social media collabs": "Get in touch with our communications team for media inquiries, press releases, and public relations matters - communications@ccubed.dev",
//   "general queries": "General questions - executivesccubed@gmail.com",
//   "partnership/hiring": "Connect with our partnerships team for collaboration opportunities, sponsorship inquiries, and strategic alliances - outreach@ccubed.dev",
//   default: "",
// };

// const getDepartmentDescription = (name: string) => {
//   const normalized = name.toLowerCase();
//   return departmentDescriptions[normalized] || departmentDescriptions.default;
// };

export const DepartmentSelect = ({
  register,
  error,
  value,
  onChange,
}: DepartmentSelectProps) => {
  return (
    <label htmlFor="department" className="font-roberto text-[14px] ">
      <p className="ml-5">Choose Department</p>
      {/* <p className="mb-2 ml-5">{getDepartmentDescription(value)}</p> */}
      <select
        {...register("department", {
          required: "Please select a department",
          validate: (val) => val !== "" || "Please select a department",
        })}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-white w-full border-2 border-background px-[26px] h-[48px] outline-none bg-foreground  rounded-5xl text-gray-500 ${
          error ? "border-red-500" : ""
        }`}
      >
        <option value="">Select a department</option>
        {departments.map(({ name, id }) => (
          <option key={id} value={name}>
            {name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </label>
  );
};


