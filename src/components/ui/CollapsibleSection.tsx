import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = true,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full text-left focus:outline-none"
      >
        <span className="text-xl font-normal font-patrick">{title}</span>
        <ChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>
      {open && <div className="mt-2 pl-2">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
