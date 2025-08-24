import React from "react";
import { motion } from "framer-motion";

type TeamFilterBarProps = {
  teamType: string;
  onTeamTypeChange: (type: string) => void;
};

const TeamFilterBar = ({ teamType, onTeamTypeChange }: TeamFilterBarProps) => {
  return (
    <div className="flex gap-3 justify-center relative w-full max-w-5xl mx-auto mt-5">
      {[
        { label: "Management", value: "management" },
        { label: "Product", value: "product" },
        { label: "Operation", value: "operation" },
        { label: "Design", value: "design" },
        { label: "Marketing", value: "marketing" },
        { label: "Customer Service", value: "customerservice" },
      ].map((option) => (
        <motion.label
          key={option.value}
          className={`flex items-center justify-center w-fit rounded-[20px] cursor-pointer text-white font-light relative z-10 px-4 py-2`}
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "18px",
            fontWeight: teamType === option.value ? "500" : "300",
            letterSpacing: "1%",
          }}
        >
          {/* gradient border */}
          {teamType === option.value && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 drop-shadow-[0_9px_21px] drop-shadow-[#F6A427]/75"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(90deg,#33BAC5 0%, #fff 55%, transparent 57% )",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "xor",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                padding: "2px",
              }}
            ></motion.div>
          )}

          <input
            type="radio"
            name="teamType"
            className="hidden"
            value={option.value}
            checked={teamType === option.value}
            onChange={() => onTeamTypeChange(option.value)}
          />
          <span
            className="relative z-10"
            style={
              teamType === option.value
                ? {
                    background: "linear-gradient(90deg, #fff 0%, #33BAC5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }
                : {}
            }
          >
            {option.label}
          </span>
        </motion.label>
      ))}
    </div>
  );
};

export default TeamFilterBar;
