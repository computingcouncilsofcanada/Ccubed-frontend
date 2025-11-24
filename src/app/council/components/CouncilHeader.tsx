import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";

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
          className="text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] tracking-[0.01em] font-extrabold text-white"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Council
        </h1>
      </div>

      <p
        className="text-white text-center text-[16px] sm:text-[20px] font-light leading-[24px] sm:leading-[27px] w-full max-w-[60ch] mx-auto px-4"
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
