import { motion } from "framer-motion";
import { CouncilCardIconProps } from "../types/types";
import Image from "next/image";

export const CouncilCardIcon = ({
  section,
  hovered,
  index,
}: CouncilCardIconProps) => {
  return (
    <div
      className="flex-shrink-0 px-6 py-4 md:py-6 transition-all duration-300 ease-out
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
