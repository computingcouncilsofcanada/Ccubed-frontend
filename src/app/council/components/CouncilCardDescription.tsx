import { motion, AnimatePresence } from "framer-motion";
import { CouncilCardIconProps } from "../types/types";

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
        <p className="text-white leading-relaxed max-w-[900px]text-[14px] sm:text-[16px] mt-4 text-center md:text-left">
          {hovered === index
            ? section.fullDescription
            : section.shortDescription}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};
