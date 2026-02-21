"use client";

import { UseFormRegister, FieldError } from "react-hook-form";

type Department = {
  name: string;
  id: number;
};

type DepartmentFormFields = {
  department: string;
};

type DepartmentSelectProps = {
  register: UseFormRegister<DepartmentFormFields>;
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

export const DepartmentSelect = ({
  register,
  error,
  value,
  onChange,
}: DepartmentSelectProps) => {
  return (
    <label htmlFor="department" className="font-roberto text-[14px] ">
      <p className="ml-5">Choose Department</p>
      <select
        {...register("department", {
          required: "Please select a department",
          validate: (val) => val !== "" || "Please select a department",
        })}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-white w-full border-2 border-background px-[26px] h-[48px] pr-10 outline-none bg-foreground rounded-full text-gray-500 appearance-none 
    bg-[url('/FigmaFiles/down-arrow.svg')] bg-no-repeat bg-[length:1.25rem_1.25rem] bg-[position:right_1rem_center]
    ${error ? "border-red-500" : ""}`}
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
