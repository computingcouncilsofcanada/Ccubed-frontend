import React from 'react';
import { motion } from 'framer-motion';

const MainSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-24 pt-8"
    >
      <h1 className="text-[64px] leading-[48px] tracking-[0.01em] font-extrabold text-white mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
        Cybersecurity
      </h1>
      
      <p className="text-white text-center text-[18px] font-light leading-[24px] w-[845px] mx-auto mb-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
        Our goal is to facilitate the entry of newcomers and enthusiasts into one of Tech&apos;s most important fields: cybersecurity. We believe security should be taught sooner, more engagingly, and more enthusiastically.
      </p>

                {/* Main Content Placeholder */}
          <div className="w-[1152px] h-[485px] mx-auto opacity-[0.95] bg-[#D4D4D4]/10 backdrop-blur-[0.1px] rounded-[20px] relative">
            {/* Outer border with higher opacity */}
            <div className="absolute inset-0 border border-white/2 rounded-[20px] pointer-events-none"></div>
            {/* Inner border with lower opacity */}
            <div className="absolute inset-[1px] border border-white/5 rounded-[19px] pointer-events-none"></div>
            {/* Content placeholder */}
          </div>
    </motion.div>
  );
};

export default MainSection;
