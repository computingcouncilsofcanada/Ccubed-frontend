import React from 'react';
import { motion } from 'framer-motion';

const DescriptionSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-24"
    >
      <div className="flex items-center justify-between h-[331px]">
        {/* Left Side - Description Text */}
        <div className="flex-shrink-0">
          <h2 className="text-[36px] font-extrabold leading-[48px] tracking-[0.01em] text-white mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Description
          </h2>
          
          <p className="text-white font-light text-[18px] leading-[26px] w-[569px] tracking-[0.01em]" style={{ fontFamily: 'Roboto, sans-serif' }}>
            We and numerous Canadian universities have paired up to create this very council, one that facilitates the engagement of your local cyber club by introducing you with industry professionals, educational events tailored to you, and ready made content for your next cybersecurity workshops. No more need to spend countless hours swimming through LinkedIn contacts and Internet write-ups, we&apos;ve got you.
          </p>
        </div>
        
        {/* Right Side - Image */}
        <div className="flex-shrink-0">
          <div className="flex gap-2">
            {/* Large rectangle */}
            <div className="w-[373px] h-[331px] opacity-[0.95] bg-[#D4D4D4]/10 backdrop-blur-[0.1px] rounded-[20px] relative">
              {/* Outer border with higher opacity */}
              <div className="absolute inset-0 border border-white/2 rounded-[20px] pointer-events-none"></div>
              {/* Inner border with lower opacity */}
              <div className="absolute inset-[1px] border border-white/5 rounded-[19px] pointer-events-none"></div>
            </div>
            
            {/* Three small rectangles */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="w-[57px] h-[331px] opacity-[0.95] bg-[#D4D4D4]/10 backdrop-blur-[0.1px] rounded-[20px] relative">
                {/* Outer border with higher opacity */}
                <div className="absolute inset-0 border border-white/2 rounded-[20px] pointer-events-none"></div>
                {/* Inner border with lower opacity */}
                <div className="absolute inset-[1px] border border-white/5 rounded-[19px] pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DescriptionSection;
