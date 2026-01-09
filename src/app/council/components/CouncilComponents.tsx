"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCanHover } from "@/hooks/useCanHover";
import Image from "next/image";
import { CouncilCardIconProps, CouncilContentProps, CouncilCardProps } from "../types/types";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";
import { councilSections } from "@/data/councilSections";

interface BackgroundTitleProps {
    title: string;
    className?: string;
  }

// =============================================================================
// MAIN COUNCIL CARD COMPONENT
// =============================================================================

export const CouncilCard = ({ section, index }: CouncilCardProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const router = useRouter();
  const canHover = useCanHover();

  const handleClick = (section: { title: string }) => {
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
        <div className="absolute inset-px border border-white/10 rounded-[19px] pointer-events-none"></div>
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

// =============================================================================
// COUNCIL CARD CONTENT COMPONENT
// =============================================================================

export const CouncilCardContent = ({
  section,
  hovered,
  index,
}: CouncilCardIconProps) => {
  return (
    <motion.div
      className="flex-1 py-4 md:py-6 px-6 md:pr-6 md:pl-0"
      layout
      transition={{ layout: { duration: 0.28, ease: "easeOut" } }}
    >
      <CouncilCardTitle section={section} />
      {/* Animated description swap */}
      <CouncilCardDescription
        section={section}
        hovered={hovered}
        index={index}
      />
    </motion.div>
  );
};

// =============================================================================
// COUNCIL CARD DESCRIPTION COMPONENT
// =============================================================================

export const CouncilCardDescription = ({
  section,
  hovered,
  index,
}: CouncilCardIconProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={hovered === index ? "full" : "short"}
        layout
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <p className="text-white leading-relaxed max-w-[900px] text-[14px] sm:text-[16px] mt-4 text-center md:text-left">
          {hovered === index
            ? section.fullDescription
            : section.shortDescription}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

// =============================================================================
// COUNCIL CARD ICON COMPONENT
// =============================================================================

export const CouncilCardIcon = ({
  section,
  hovered,
  index,
}: CouncilCardIconProps) => {
  return (
    <div
      className="shrink-0 px-6 py-4 md:py-6 transition-all duration-300 ease-out
                  flex justify-center md:block"
    >
      <motion.div className="rounded-[20px] overflow-hidden" layout>
        <Image
          src={section.icon}
          alt="Council Section Icon"
          className="w-full h-full object-cover"
          width={hovered === index ? 150 : 130}
          height={hovered === index ? 180 : 150}
        />
      </motion.div>
    </div>
  );
};

// =============================================================================
// COUNCIL CARD TITLE COMPONENT
// =============================================================================

export const CouncilCardTitle = ({ section }: CouncilContentProps) => {
  return (
    <div className="relative text-center md:text-left">
      {/* Default title */}
      <h2
        className="text-[28px] sm:text-[32px] md:text-[40px] leading-9 sm:leading-10 md:leading-12 tracking-[0.01em] font-normal transition-all duration-300 group-hover:opacity-0"
        style={{
          fontFamily: "Roboto, sans-serif",
          color: "white",
        }}
      >
        {section.title}
      </h2>

      {/* Gradient title on hover */}
      <h2
        className="text-[28px] sm:text-[32px] md:text-[40px] leading-9 sm:leading-10 md:leading-12 tracking-[0.01em] font-bold absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          fontFamily: "Roboto, sans-serif",
          background: "linear-gradient(to right, #FFFFFF 0%, #394A8B 35%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
      >
        {section.title}
      </h2>
    </div>
  );
};

// =============================================================================
// COUNCIL HEADER COMPONENT
// =============================================================================

export const CouncilHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-16 pt-8"
    >
      <div className="flex items-end justify-center mb-6">
        <div className="w-[91px] h-[131px] -mb-2 -mr-4">
          <Image
            src={useSafariImageFallback(
              "/FigmaFiles/councilAssets/bear_heart.svg",
              "/FigmaFiles/councilAssets/bear_heart.png"
            )}
            alt="CCubed Bear Heart"
            width={91}
            height={131}
            className="w-full h-full object-contain"
          />
        </div>
        <h1
          className="text-[32px] sm:text-[40px] leading-10 sm:leading-12 tracking-[0.01em] font-extrabold text-white"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Council
        </h1>
      </div>

      <p
        className="text-white text-center text-[16px] sm:text-[20px] font-light leading-6 sm:leading-[27px] w-full max-w-[60ch] mx-auto px-4"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        Where students, clubs, and community partners team up across Canada to
        build skills, run events, and share resources. Join a council, lead an
        initiative, or partner with us to bring real impact to your campus and
        beyond.
      </p>
    </motion.div>
  );
};

// =============================================================================
// COUNCIL SECTIONS COMPONENT
// =============================================================================

export const CouncilSections = () => {
  return (
    <motion.div className="space-y-6 mb-32 flex flex-col items-center w-full max-w-6xl mx-auto">
      {councilSections.map((section, index) => (
        <div key={index} className="relative w-full ">
          <div className="hidden md:block">
            <BackgroundTitle title={section.title} />
          </div>

          {/* Card */}
          <CouncilCard section={section} index={index} />
        </div>
      ))}
    </motion.div>
  );
};

// =============================================================================
// BACKGROUND TITLE COMPONENT
// =============================================================================

const BackgroundTitle: React.FC<BackgroundTitleProps> = ({ title, className = "" }) => {
  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0 ${className}`}>
      <h1 
        className="text-[100px] font-black text-white/20 select-none"
        style={{ 
          fontFamily: 'Roboto, sans-serif',
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0.2) 100%)",
          maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0.2) 100%)"
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default BackgroundTitle;
