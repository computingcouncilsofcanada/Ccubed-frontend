"use client";

import React from 'react';
import { motion } from 'framer-motion';
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";
import BackgroundTitle from "./BackgroundTitle";
import Image from 'next/image';

const CouncilPage = () => {
  const councilSections = [
    {
      title: "Cybersecurity",
      shortDescription:
        "Our goal is to facilitate the entry of newcomers and enthusiasts into one of Tech's most important fields: cybersecurity. We believe security should be taught sooner, more engagingly, and more enthusiastically.",
      fullDescription:
        "We and numerous Canadian universities have paired up to create this very council, one that facilitates the engagement of your local cyber club by introducing you with industry professionals, educational events tailored to you, and ready made content for your next cybersecurity workshops. No more need to spend countless hours swimming through LinkedIn contacts and Internet write-ups, we've got you.",
      icon: "/FigmaFiles/councilAssets/old_guy.png",
    },
    {
      title: "Cybersecurity",
      shortDescription:
        "Our goal is to facilitate the entry of newcomers and enthusiasts into one of Tech's most important fields: cybersecurity. We believe security should be taught sooner, more engagingly, and more enthusiastically.",
      fullDescription:
        "We and numerous Canadian universities have paired up to create this very council, one that facilitates the engagement of your local cyber club by introducing you with industry professionals, educational events tailored to you, and ready made content for your next cybersecurity workshops. No more need to spend countless hours swimming through LinkedIn contacts and Internet write-ups, we've got you.",
      icon: "/FigmaFiles/councilAssets/old_guy.png",
    },
    {
      title: "Cybersecurity",
      shortDescription:
        "Our goal is to facilitate the entry of newcomers and enthusiasts into one of Tech's most important fields: cybersecurity. We believe security should be taught sooner, more engagingly, and more enthusiastically.",
      fullDescription:
        "We and numerous Canadian universities have paired up to create this very council, one that facilitates the engagement of your local cyber club by introducing you with industry professionals, educational events tailored to you, and ready made content for your next cybersecurity workshops. No more need to spend countless hours swimming through LinkedIn contacts and Internet write-ups, we've got you.",
      icon: "/FigmaFiles/councilAssets/old_guy.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="min-h-screen relative w-full overflow-hidden overflow-x-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] -mt-30 pt-20">
      <BgBoxMainPage maxHeight={200} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 xl:px-2 w-[1160px] mt-4">
        {/* Header Section with Logo and Title Side by Side */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pt-8"
        >
          {/* Logo and Title Side by Side */}
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
            <h1 className="text-[40px] leading-[48px] tracking-[0.01em] font-extrabold text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Council
            </h1>
          </div>

          <p className="text-white text-center text-[20px] font-light leading-[27px] w-[720px] mx-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </motion.div>

        {/* Council Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 mb-32 flex flex-col items-center w-[1160px] mx-auto"
        >
          {councilSections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group flex items-start"
            >
              {/* Background Title for each card */}
              <BackgroundTitle title={section.title} />
              
              <div className="w-[1151px] h-[160px] group-hover:h-[230px] group-hover:w-[1011px] opacity-[0.95] bg-[#D4D4D4]/10 backdrop-blur-[0.1px] rounded-[20px] flex items-start transition-all duration-300 cursor-pointer relative z-10">
                {/* Outer border with higher opacity */}
                <div className="absolute inset-0 border border-white/2 rounded-[20px] pointer-events-none"></div>
                {/* Inner border with lower opacity */}
                <div className="absolute inset-[1px] border border-white/5 rounded-[19px] pointer-events-none"></div>
                {/* Left Side - Icon/Image */}
                <div className="flex-shrink-0 px-6 py-4 group-hover:py-6 transition-all duration-300">
                  <div className="w-[113px] h-[126px] group-hover:w-[134px] group-hover:h-[182px] rounded-[20px] overflow-hidden transition-all duration-300 ease-in-out opacity-100">
                    <Image
                      src={section.icon}
                      alt="Council Section Icon"
                      className="w-full h-full object-cover"
                      width={134}
                      height={182}
                    />
                  </div>
                </div>

                {/* Right Side - Text Content */}
                <div className="flex-1 py-4 group-hover:py-6 group-hover:flex-none group-hover:w-[820px] transition-all duration-300">
                                    <div className="relative">
                    {/* Default title */}
                    <h2 
                      className="text-[40px] tracking-[0.01em] font-normal transition-all duration-300 group-hover:opacity-0" 
                      style={{ 
                        fontFamily: 'Roboto, sans-serif',
                        color: 'white'
                      }}
                    >
                      {section.title}
                    </h2>
                    
                    {/* Gradient title on hover */}
                    <h2 
                      className="text-[40px] tracking-[0.01em] font-bold absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      style={{ 
                        fontFamily: 'Roboto, sans-serif',
                        background: 'linear-gradient(to right, #FFFFFF 0%, #394A8B 35%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent'
                      }}
                    >
                      {section.title}
                    </h2>
                  </div>
                  
                  <p className="text-white leading-relaxed group-hover:hidden w-[820px]">
                    {section.shortDescription}
                  </p>
                  <p className="text-white leading-relaxed hidden group-hover:block w-[820px]">
                    {section.fullDescription}
                  </p>
                </div>
                      
              </div>

              {/* View Details Button - appears on hover, positioned outside card */}
              <div className="w-[177px] h-[230px] hidden group-hover:block z-0 ml-[-36px]">
                <div className="relative group/button transition-all duration-300 h-full w-full cursor-pointer">
                  {/* Gradient border overlay - using the same technique as MissionVision */}
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      background: "linear-gradient(255deg, rgba(255, 255, 255, 0.9) 0%, transparent 60%)",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "xor",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      padding: "5px",
                    }}
                  />
                  
                  {/* Button content */}
                  <div className="w-full h-full rounded-xl flex items-center justify-center relative z-10 text-white pl-6">
                    <div className="text-center">
                      <div className="text-[24px] leading-[26px] tracking-[0.01em] font-light mb-[10px]" style={{ fontFamily: 'Roboto, sans-serif' }}>View</div>
                      <div className="text-[24px] leading-[26px] tracking-[0.01em] font-light" style={{ fontFamily: 'Roboto, sans-serif' }}>Details</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default CouncilPage;
