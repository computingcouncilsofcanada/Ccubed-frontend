<<<<<<< HEAD
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";
import BackgroundTitle from "./BackgroundTitle";
import Image from 'next/image';

const CouncilPage = () => {
  const [hovered, setHovered] = React.useState<number | null>(null);

  const councilSections = [
    {
      title: "Cybersecurity Council",
      shortDescription:
        "Our goal is to facilitate the entry of newcomers and enthusiasts into one of Tech's most important fields: cybersecurity. We believe security should be taught sooner, more engagingly, and more enthusiastically.",
      fullDescription:
        " Our goal is to facilitate the entry of newcomers and enthusiasts into one of Tech's most important fields: cybersecurity. We believe security should be taught sooner, more engagingly, and more enthusiastically. We and numerous Canadian universities have paired up to create this very council, one that facilitates the engagement of your local cyber club by introducing you with industry professionals, educational events tailored to you, and ready made content for your next cybersecurity workshops. No more need to spend countless hours swimming through LinkedIn contacts and Internet write-ups, we've got you.",
      icon: "/FigmaFiles/councilAssets/Cybersecurity_council.png",
    },
    {
      title: "Artificial Intelligence Council",
      shortDescription: "Comming Soon",
      fullDescription: "Comming Soon",
      icon: "/FigmaFiles/councilAssets/CCubed_icon.png",
    },
    {
      title: "Women in Tech Council",
      shortDescription: "Comming Soon",
      fullDescription: "Comming Soon",
      icon: "/FigmaFiles/councilAssets/CCubed_icon.png",
    },
  ];

  return (
    // allow vertical growth; keep x hidden for aesthetics
    <div className="min-h-screen relative w-full overflow-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] -mt-30 pt-20">
      
   
      
      <BgBoxMainPage maxHeight={200} />

    

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 xl:px-2 w-full max-w-[1152px] mt-4">
        {/* Header */}
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
              className="text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] tracking-[0.01em] font-extrabold text-white" style={{ fontFamily: 'Roboto, sans-serif' }} > Council </h1> </div> <p className="text-white text-center text-[16px] sm:text-[20px] font-light leading-[24px] sm:leading-[27px] w-full max-w-[60ch] mx-auto px-4"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            Where students, clubs, and community partners team up across Canada to build skills, run events, and share resources. Join a council, lead an initiative, or partner with us to bring real impact to your campus and beyond.
          </p>
        </motion.div>

        {/* Council Sections */}
        <motion.div className="space-y-6 mb-32 flex flex-col items-center w-full max-w-[1152px] mx-auto">
          {councilSections.map((section, index) => (
            <div key={index} className="relative w-full">

              <div className="hidden md:block">
                <BackgroundTitle title={section.title} />
              </div>

              {/* Card */}
              <motion.div
                className="group w-full max-w-[1151px] opacity-[0.95] bg-[#D4D4D4]/10 backdrop-blur-[0.1px] rounded-[20px] cursor-pointer relative z-10
                           flex flex-col md:flex-row md:items-start"
                // Bring back a hover "growth" feel without fixed heights
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                // Animate height/position changes smoothly when content swaps
                layout
                onHoverStart={() => setHovered(index)}
                onHoverEnd={() => setHovered((h) => (h === index ? null : h))}
              >
                {/* Borders */}
                <div className="absolute inset-0 border border-white/20 rounded-[20px] pointer-events-none"></div> <div className="absolute inset-[1px] border border-white/10 rounded-[19px] pointer-events-none"></div>
                <div className="flex-shrink-0 px-6 py-4 md:py-6 transition-all duration-300 ease-out
                                flex justify-center md:block">
                  <motion.div
                    className="rounded-[20px] overflow-hidden"
                    layout
                  >
                    <Image
                      src={section.icon}
                      alt="Council Section Icon"
                      className="w-full h-full object-cover"
                      width={hovered === index ? 150 : 130}
                      height={hovered === index ? 180 : 150}
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="flex-1 py-4 md:py-6 px-6 md:pr-6 md:pl-0"
                  layout
                  transition={{ layout: { duration: 0.28, ease: "easeOut" } }}
                >
                  <div className="relative text-center md:text-left">
                    {/* Default title */}
                    <h2
                      className="text-[28px] sm:text-[32px] md:text-[40px] leading-[36px] sm:leading-[40px] md:leading-[48px] tracking-[0.01em] font-normal transition-all duration-300 group-hover:opacity-0"
                      style={{ fontFamily: 'Roboto, sans-serif', color: 'white' }}
                    >
                      {section.title}
                    </h2>

                    {/* Gradient title on hover */}
                    <h2
                      className="text-[28px] sm:text-[32px] md:text-[40px] leading-[36px] sm:leading-[40px] md:leading-[48px] tracking-[0.01em] font-bold absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                        background: 'linear-gradient(to right, #FFFFFF 0%, #394A8B 35%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent',
                      }}
                    >
                      {section.title}
                    </h2>
                  </div>

                  {/* Animated description swap */}
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
                </motion.div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default CouncilPage;
=======
"use client";

import React from "react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";
import { CouncilHeader } from "./components/CouncilComponents";
import { CouncilSections } from "./components/CouncilComponents";

const CouncilPage = () => {

  return (
    // allow vertical growth; keep x hidden for aesthetics
    <div className="min-h-screen relative w-full overflow-hidden bg-linear-to-b from-[#10212E] to-[#162C3D] -mt-30 pt-20">
      <BgBoxMainPage maxHeight={200} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 xl:px-2 w-full max-w-6xl mt-4">
        <CouncilHeader />

        {/* Council Sections */}
        <CouncilSections />
      </div>

      <Footer />
    </div>
  );
};

export default CouncilPage;
>>>>>>> develop
