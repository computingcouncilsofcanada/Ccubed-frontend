import { motion, AnimatePresence } from "framer-motion";
import { CouncilCardIconProps } from "../types/types";

export const CouncilCardDescription = ({
  section,
  hovered,
  index,
}: CouncilCardIconProps) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {hovered === index ? (
          <motion.p
            key="full"
            className="text-white leading-relaxed max-w-[900px] text-[14px] sm:text-[16px] mt-4 text-center md:text-left"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {section.fullDescription}
          </motion.p>
        ) : (
          <motion.p
            key="short"
            className="text-white leading-relaxed max-w-[900px] text-[14px] sm:text-[16px] mt-4 text-center md:text-left"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {section.shortDescription}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
};
