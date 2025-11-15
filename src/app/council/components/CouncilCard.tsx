import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { CouncilCardProps } from "../types/types";
import { CouncilCardIcon } from "./CouncilCardIcon";
import { CouncilCardContent } from "./CouncilCardContent";

export const CouncilCard = ({ section, index }: CouncilCardProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      className="group w-full max-w-[1151px] opacity-[0.95] bg-[#D4D4D4]/10 backdrop-blur-[0.1px] rounded-[20px] cursor-pointer relative z-10
                 flex flex-col md:flex-row md:items-start"
      // Bring back a hover "growth" feel without fixed heights
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      // Animate height/position changes smoothly when content swaps
      layout
      onHoverStart={() => setHovered(index)}
      onHoverEnd={() => setHovered((h) => (h === index ? null : h))}
    >
      {/* Borders */}
      <div className="absolute inset-0 border border-white/20 rounded-[20px] pointer-events-none"></div>
      <div className="absolute inset-[1px] border border-white/10 rounded-[19px] pointer-events-none"></div>
      <CouncilCardIcon section={section} hovered={hovered} index={index} />
      <CouncilCardContent section={section} hovered={hovered} index={index} />
    </motion.div>
  );
};
