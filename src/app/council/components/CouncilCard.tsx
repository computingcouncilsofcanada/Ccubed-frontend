import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { CouncilCardProps } from "../types/types";
import { CouncilCardIcon } from "./CouncilCardIcon";
import { CouncilCardContent } from "./CouncilCardContent";
import { useRouter } from "next/navigation";
import { useCanHover } from "@/hooks/useCanHover";
export const CouncilCard = ({ section, index }: CouncilCardProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const router = useRouter();
  const canHover = useCanHover();

  const handleClick = (section: any) => {
    const cleanTitle = section.title.toLowerCase().replace(/\s+/g, "");
    router.push(`/council/${cleanTitle}`);
  };
  return (
    <div className="group w-full">
      <motion.div
        className={`group w-full md:group-hover:w-250 max-w-[1151px] opacity-[0.95] bg-[#D4D4D4]/10 backdrop-blur-[0.1px] rounded-[20px] ${canHover ? "cursor-default" : "cursor-pointer"} relative z-10
                 flex flex-col md:flex-row md:items-start md:h-72 transition-all duration-300`}
        // Bring back a hover "growth" feel without fixed heights
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        // Animate height/position changes smoothly when content swaps
        layout
        onHoverStart={() => setHovered(index)}
        onHoverEnd={() => setHovered((h) => (h === index ? null : h))}
        onClick={canHover ? undefined : () => handleClick(section)}
      >
        {/* Borders */}
        <div className="absolute inset-0 border border-white/20 rounded-[20px] pointer-events-none"></div>
        <div className="absolute inset-[1px] border border-white/10 rounded-[19px] pointer-events-none"></div>
        <CouncilCardIcon section={section} hovered={hovered} index={index} />
        <CouncilCardContent section={section} hovered={hovered} index={index} />
      </motion.div>
      <motion.div
        className="cursor-pointer"
        onClick={canHover ? () => handleClick(section) : undefined}
      >
        {/* Gradient Border Effect */}

        <motion.div className="hidden md:group-hover:flex flex-col justify-center items-center pr-6 gap-4 text-white text-center absolute right-6 top-0 h-full">
          <span className="text-[18px] leading-none">View</span>
          <span className="text-[18px] leading-none">Details</span>
        </motion.div>
        <div
          className="hidden md:block md:opacity-0 md:group-hover:opacity-100 absolute inset-0 rounded-[30px] pointer-events-none transition-all duration-500 "
          style={{
            background:
              "linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.3) 8%, transparent 12%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "4px",
          }}
        ></div>
      </motion.div>
    </div>
  );
};
