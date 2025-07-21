"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type EventCardProps = {
  id: number;
  title: string;
  time: string;
  date: string;
  location: string;
  type: "Online" | "In Person";
  imageSrc: string;
  description: string;
};

export default function EventCard({
  id,
  title,
  time,
  date,
  location,
  type,
  imageSrc,
  description,
}: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const shouldShowExpanded = isExpanded || isHovered;

  return (
    <motion.div
      className="relative group cursor-pointer"
      style={{ width: "274px", height: "451px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-sm bg-gradient-to-br from-slate-800/40 to-slate-900/60 hover:from-slate-700/50 hover:to-slate-800/70 transition-all duration-300"
        style={{
          background: "rgba(30, 41, 59, 0.4)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          width: "274px",
        }}
        animate={{
          height: shouldShowExpanded ? "451px" : "320px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Event Type Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              type === "Online"
                ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                : "bg-green-500/20 text-green-300 border border-green-400/30"
            }`}
          >
            {type}
          </span>
        </div>

        <div className="p-2 h-full flex flex-col">
          {/* Event Image */}
          <div
            className="bg-slate-700/30 rounded-lg mb-2 border border-white/5"
            style={{ width: "258px", height: "176px" }}
          >
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover opacity-80 rounded-xl"
            />
          </div>
          <div className="px-2">
            {/* Event Title - Always Visible */}
                          <h3
                 className="text-white text-left mb-2 overflow-hidden w-full h-14"
                 style={{
                 fontFamily: "Roboto, sans-serif",
                 fontWeight: "bold",
                 fontSize: "24px",
                 lineHeight: "28px",
                 color: "#FFFFFF",
                 letterSpacing: "0%",
                 display: "-webkit-box",
                 WebkitLineClamp: 2,
                 WebkitBoxOrient: "vertical",
                 }}
              >
                {title}
            </h3>

            {/* Basic Info - Always Visible */}
            <div className="mb-3">
                <div className="flex items-center gap-2 text-white mb-1">
                <span className="text-xs">{time}</span>
                <span className="text-xs">{date}</span>
                </div>
                <div className="text-white text-xs">{location}</div>
            </div>

            {/* Expanded Content */}
            {shouldShowExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-1 flex flex-col justify-between"
            >
                {/* Description */}
                <p 
                  className="text-white mb-2"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: "300",
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.02em",
                    color: "#FFFFFF",
                  }}
                >
                    {description}
                </p>

                {/* Action Buttons - Side by Side - Fixed at bottom */}
                <div className="flex gap-2 mb-4 justify-center">
                    <button
                    className="text-white text-xs font-medium rounded-lg transition-all duration-200"
                    style={{
                      width: "117px",
                      height: "36px",
                      backgroundColor: "#FAA336",
                      borderRadius: "8px",
                      opacity: "100%",
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "20px",
                      letterSpacing: "0%",
                      color: "#152E3F",
                    }}
                    onClick={(e) => e.stopPropagation()}
                    >
                    Invitation Link
                    </button>
                    <button
                    className="text-white text-xs font-medium rounded-lg transition-all duration-200"
                    style={{
                      width: "117px",
                      height: "36px",
                      backgroundColor: "transparent",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      borderRadius: "8px",
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "20px",
                      letterSpacing: "0%",
                      color: "#FFFFFF",
                    }}
                    onClick={(e) => e.stopPropagation()}
                    >
                    See Details
                    </button>
                </div>
                </motion.div>
            )}
          </div>
        </div>

        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent rounded-xl pointer-events-none" />
      </motion.div>
    </motion.div>
  );
} 