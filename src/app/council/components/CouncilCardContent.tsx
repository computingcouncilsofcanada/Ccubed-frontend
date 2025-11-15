import { motion, AnimatePresence, hover } from "framer-motion";
import { CouncilCardIconProps } from "../types/types";
import { CouncilCardTitle } from "./CouncilCardTitle";
import { CouncilCardDescription } from "./CouncilCardDescription";

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
