import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Representative {
  name: string;
  title: string;
  image: string;
  role: string;
}

const RepresentativesSection = () => {
  const [activeFilter, setActiveFilter] = useState("Management");

  const councilRepresentatives: Representative[] = [
    {
      name: "Parth Doshi",
      title: "President",
      image: "/FigmaFiles/councilAssets/guy.png",
      role: "Management"
    },
    // Add more representatives as needed
  ];

  const filterOptions = ["Management", "Product", "Operation", "Design", "Marketing", "Customer service"];



  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-24"
    >
      <div className="text-center mb-8">
        <h2 className="text-[36px] font-extrabold leading-[48px] tracking-[0.01em] text-white mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Council Representatives
        </h2>
        <p className="text-white font-light text-[18px] leading-[26px] w-[845px] mx-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Meet the key members of our council, including main directors and representatives from our partnered societies and clubs. Each profile offers a glimpse into their role and contribution, helping you get to know the people shaping our community.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-24 h-[51px]">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`transition-all duration-300 ease-out h-[51px] px-4 py-2 rounded-[20px] relative ${
              activeFilter === filter ? 'font-medium' : 'font-light'
            }`}
            style={{ 
              fontFamily: 'Roboto, sans-serif',
              lineHeight: '27px',
              letterSpacing: '0%'
            }}
          >
            {/* Gradient border overlay - only visible when active */}
            {activeFilter === filter && (
              <motion.div
                className="absolute inset-0 rounded-[20px] pointer-events-none"
                style={{
                  background: "linear-gradient(120deg, rgba(51, 186, 197, 1) 0%, rgba(255, 255, 255, 0.1) 35%, transparent 65%)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  padding: "2px",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            
            {/* Text content */}
            <span className={`relative z-10 ${
              activeFilter === filter 
                ? 'text-transparent' 
                : 'text-white'
            }`}>
              {activeFilter === filter ? (
                <span
                  style={{
                    background: 'linear-gradient(to right, #FFFFFF 0%, #33BAC5 85%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent'
                  }}
                >
                  {filter}
                </span>
              ) : (
                filter
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Representative Cards */}
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-6 max-w-[845px]">
          {councilRepresentatives.map((rep, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
              className="text-center flex-shrink-0"
            >
              <div className="relative mb-4">
                <div className="w-[169px] h-[169px] mx-auto rounded-full overflow-hidden">
                  <Image
                    src={rep.image}
                    alt={rep.name}
                    width={169}
                    height={169}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-[20px] font-bold text-white mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {rep.name}
              </h3>
              <p className="text-[16px] text-white/80" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {rep.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RepresentativesSection;
