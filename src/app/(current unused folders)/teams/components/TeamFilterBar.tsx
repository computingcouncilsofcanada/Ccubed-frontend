import React from "react";
import { motion } from "framer-motion";

type TeamFilterBarProps = {
  teamType: string;
  onTeamTypeChange: (type: string) => void;
};

const TeamFilterBar = ({ teamType, onTeamTypeChange }: TeamFilterBarProps) => {
  return (
    <div className="flex  flex-wrap gap-3 justify-center relative w-full max-w-5xl mx-auto mt-5">
      
      {[
        { label: "Full Team", value: "fullteam" },
        { label: "Directors", value: "directors" },
        { label: "System Admin", value: "sysadmin" },
        { label: "Communications", value: "communications" },
        { label: "Events", value: "events" },
        { label: "Finance", value: "finance" },
        { label: "Outreach", value: "outreach" },
        { label: "HR", value: "hr" }
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
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(90deg, rgba(51,186,197,0.8) 0%, rgba(51,186,197,0.2) 60%, transparent 100%)",
              padding: "2px",
              borderRadius: "20px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.35)"

            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "18px",
                backgroundColor: "#0b0f17", 
              }}
            ></div>
          </motion.div>
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
