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
  { name: "System Administration", id: 1 },
  { name: "Communications", id: 2 },
  { name: "Outreach", id: 3 },
  { name: "Events", id: 4 },
  { name: "Partnerships", id: 5 },
];

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

const getDepartmentDescription = (name: string) => {
  const normalized = name.toLowerCase();
  return departmentDescriptions[normalized] || departmentDescriptions.default;
};

export const DepartmentSelect = ({
  register,
  error,
  value,
  onChange,
}: DepartmentSelectProps) => {
  return (
    <label htmlFor="department" className="font-roberto">
      <p>Choose Department</p>
      <p className="mb-2">{getDepartmentDescription(value)}</p>
      <select
        {...register("department", {
          required: "Please select a department",
          validate: (val) => val !== "" || "Please select a department",
        })}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border-2 border-background p-2 rounded-md outline-none bg-foreground text-background ${
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
