import React from "react";
import { motion } from "framer-motion";
import { CouncilSection } from "../../types/types";

type CouncilProps = {
  council: CouncilSection;
};

const MainSection = ({ council }: CouncilProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-24 pt-8"
    >
      <h1
        className="text-3xl sm:text-4xl md:text-[64px] leading-snug md:leading-[48px] tracking-[0.01em] font-extrabold text-white mb-6"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        {council.title}
      </h1>

      <p
        className="text-white text-center text-[15px] sm:text-[18px] font-light leading-relaxed w-full max-w-[845px] mx-auto mb-8 px-4"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        {council.shortDescription}
      </p>

      <div className="w-full max-w-[1152px] h-auto md:h-[485px] mx-auto opacity-[0.95] bg-[#D4D4D4]/10 backdrop-blur-[0.1px] rounded-[20px] relative px-4">
        <div className="absolute inset-0 border border-white/2 rounded-[20px] pointer-events-none"></div>

        <div className="absolute inset-[1px] border border-white/5 rounded-[19px] pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

export default MainSection;
