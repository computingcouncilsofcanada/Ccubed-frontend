"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function MissionVision() {
  const cardVariants = {
    initial: {},
    hover: {}
  };

  const titleVariants = {
    initial: { fontWeight: "400" },
    hover: { fontWeight: "700" }
  };

  const descriptionVariants = {
    initial: { fontWeight: "300" },
    hover: { fontWeight: "400" }
  };

  const hoverElementVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 }
  };

  const glowVariants90 = {
    initial: { opacity: 0 },
    hover: { opacity: 0.9 }
  };

  const glowVariants80 = {
    initial: { opacity: 0 },
    hover: { opacity: 0.8 }
  };

  const glowVariants75 = {
    initial: { opacity: 0 },
    hover: { opacity: 0.75 }
  };

  const glowVariants70 = {
    initial: { opacity: 0 },
    hover: { opacity: 0.7 }
  };

  const glowVariants45 = {
    initial: { opacity: 0 },
    hover: { opacity: 0.45 }
  };

  const transition = {
    duration: 0.8
  };

  const glowTransition = {
    duration: 0.6
  };

  return (
    <section className="mission-vision py-16 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-left mb-4">
        <h2
          className="text-white text-[40px] leading-[48px] mb-4 font-extrabold"
          style={{
            fontFamily: "Roboto, sans-serif",
            letterSpacing: "0%",
          }}
        >
          Connecting Students, Building Community
        </h2>
        <p
          className="text-white max-w-3xl text-base font-light"
          style={{
            fontFamily: "Roboto, sans-serif",
            letterSpacing: "1%",
          }}
        >
          We bring Canadian computing students together through engaging events
          and shared resources. Our goal is to create a supportive space where
          students feel connected, empowered, and never alone on their journey.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 justify-items-center">
        {/* Our Mission Card */}
        <motion.div
          className="mission-card relative group cursor-pointer"
          style={{ width: "566px", height: "431px" }}
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
        >
          {/* Hover Rectangle */}
          <motion.div
            className="absolute bottom-0 left-0 z-0"
            style={{
              width: "566px",
              height: "335px",
              background:
                "linear-gradient(to right, rgba(212, 212, 212, 0.05) 0%, transparent 100%)",
              borderRadius: "12px",
            }}
            variants={hoverElementVariants}
            transition={transition}
          >
            {/* Gradient border overlay - right to left */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, #CF8419 0%, rgba(207, 132, 25, 0.4) 25%, rgba(207, 132, 25, 0.1) 50%, transparent 60%)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "xor",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                padding: "3px",
              }}
            />
          </motion.div>

          {/* Bear Image - Positioned at top of card */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-15">
            <Image
              src="/FigmaFiles/mainPageAssets/bear_speaker.svg"
              alt="Bear with Speaker"
              width={165}
              height={165}
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
            />
          </div>

          {/* Card Content */}
          <div className="flex flex-col items-center px-4 pt-[59px] relative z-10">
            {/* Badge and Title Container */}
            <div className="flex flex-col items-center mb-8">
              {/* Badge Icon */}
              <div className="relative">
                {/* Orange glow effect - bottom left */}
                <motion.div
                  className="absolute -bottom-4 -left-4 w-24 h-24 z-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 100% 70% at center, rgba(207, 132, 25, 0.7) 0%, rgba(207, 132, 25, 0.4) 30%, transparent 60%)",
                    filter: "blur(8px)",
                  }}
                  variants={glowVariants90}
                  transition={glowTransition}
                />

                {/* Orange glow effect - left side */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 -left-5 w-20 h-20 z-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 100% 70% at center, rgba(207, 132, 25, 0.6) 0%, rgba(207, 132, 25, 0.3) 30%, transparent 60%)",
                    filter: "blur(8px)",
                  }}
                  variants={glowVariants70}
                  transition={glowTransition}
                />

                {/* White glow effect - top right */}
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 z-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 100% 70% at center, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.3) 30%, transparent 60%)",
                    filter: "blur(8px)",
                  }}
                  variants={glowVariants80}
                  transition={glowTransition}
                />

                {/* White glow effect - top side */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 -top-5 w-20 h-20 z-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 100% 70% at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.25) 30%, transparent 60%)",
                    filter: "blur(8px)",
                  }}
                  variants={glowVariants75}
                  transition={glowTransition}
                />

                <Image
                  src="/FigmaFiles/mainPageAssets/orange_badge.svg"
                  alt="Orange Badge"
                  width={127}
                  height={113}
                  className="relative z-10"
                />
              </div>

              {/* Mission Title */}
              <motion.div
                className="flex items-center justify-center text-white text-2xl rounded-lg mt-[-16px] relative overflow-hidden backdrop-blur-sm"
                style={{
                  width: "233px",
                  height: "64px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  fontFamily: "Inter, sans-serif",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
                variants={titleVariants}
                transition={transition}
              >
                {/* Gradient border overlay */}
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse 120% 80% at 20% 100%, rgba(212,212,212,0.4) 0%, rgba(212,212,212,0.25) 30%, rgba(212,212,212,0.1) 60%, transparent 100%)
                    `,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                  }}
                />

                {/* Background grid - visible by default */}
                <div
                  className="absolute inset-0 opacity-100 transition-opacity duration-600"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: "7.28px 4px",
                    maskImage:
                      "radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 70%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 70%)",
                    borderRadius: "8px",
                  }}
                />
                <span className="relative z-10">Our Mission</span>
              </motion.div>
            </div>

            {/* Mission Description */}
            <div className="text-center max-w-lg">
              <motion.p
                className="text-white text-lg leading-[21px] tracking-[0.01em] max-w-[460px]"
                style={{
                  fontFamily: "Roboto, sans-serif",
                }}
                variants={descriptionVariants}
                transition={transition}
              >
                To connect and support students through engaging events while
                building community amongst Canadian computing student groups.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Our Vision Card */}
        <motion.div
          className="vision-card relative group cursor-pointer"
          style={{ width: "566px", height: "431px" }}
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
        >
          {/* Hover Rectangle */}
          <motion.div
            className="absolute bottom-0 left-0 z-0"
            style={{
              width: "566px",
              height: "335px",
              background:
                "linear-gradient(to left, rgba(212, 212, 212, 0.05) 0%, transparent 100%)",
              borderRadius: "12px",
            }}
            variants={hoverElementVariants}
            transition={transition}
          >
            {/* Gradient border overlay - left to right */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, #FFF 0%, rgba(255, 255, 255, 0.4) 25%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "xor",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                padding: "3px",
              }}
            />
          </motion.div>

          {/* Bear Image - Positioned at top of card */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-15">
            <Image
              src="/FigmaFiles/mainPageAssets/bear_earth.svg"
              alt="Bear with Earth"
              width={165}
              height={165}
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
            />
          </div>

          {/* Card Content */}
          <div className="flex flex-col items-center px-4 pt-[59px] relative z-10">
            {/* Badge and Title Container */}
            <div className="flex flex-col items-center mt-1.5 mb-8">
              {/* Badge Icon */}
              <div className="relative">
                {/* Cyan glow effect - left side */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 -left-5 w-20 h-20 z-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 100% 70% at center, rgba(50, 184, 195, 0.6) 0%, rgba(50, 184, 195, 0.3) 30%, transparent 60%)",
                    filter: "blur(8px)",
                  }}
                  variants={glowVariants70}
                  transition={glowTransition}
                />

                {/* Cyan glow effect - bottom left */}
                <motion.div
                  className="absolute -bottom-4 -left-4 w-24 h-24 z-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 100% 70% at center, rgba(50, 184, 195, 0.7) 0%, rgba(50, 184, 195, 0.4) 30%, transparent 60%)",
                    filter: "blur(8px)",
                  }}
                  variants={glowVariants90}
                  transition={glowTransition}
                />

                {/* Cyan glow effect - bottom side */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 -bottom-5 w-20 h-20 z-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 100% 70% at center, rgba(50, 184, 195, 0.4) 0%, rgba(50, 184, 195, 0.25) 30%, transparent 60%)",
                    filter: "blur(8px)",
                  }}
                  variants={glowVariants75}
                  transition={glowTransition}
                />

                {/* Cyan glow effect - bottom right */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 z-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 100% 70% at center, rgba(50, 184, 195, 0.3) 0%, rgba(50, 184, 195, 0.15) 30%, transparent 60%)",
                    filter: "blur(8px)",
                  }}
                  variants={glowVariants45}
                  transition={glowTransition}
                />

                <Image
                  src="/FigmaFiles/mainPageAssets/green_badge.svg"
                  alt="Green Badge"
                  width={127}
                  height={113}
                  className="relative z-10"
                />
              </div>

              {/* Vision Title */}
              <motion.div
                className="flex items-center justify-center text-white text-2xl rounded-lg mt-[-16px] relative overflow-hidden backdrop-blur-sm"
                style={{
                  width: "233px",
                  height: "64px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  fontFamily: "Inter, sans-serif",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
                variants={titleVariants}
                transition={transition}
              >
                {/* Gradient border overlay */}
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse 120% 80% at 20% 100%, rgba(212,212,212,0.4) 0%, rgba(212,212,212,0.25) 30%, rgba(212,212,212,0.1) 60%, transparent 100%)
                    `,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                  }}
                />

                {/* Background grid - visible by default */}
                <div
                  className="absolute inset-0 opacity-100 transition-opacity duration-600"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: "7.28px 4px",
                    maskImage:
                      "radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 70%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 70%)",
                    borderRadius: "8px",
                  }}
                />
                <span className="relative z-10">Our Vision</span>
              </motion.div>
            </div>

            {/* Vision Description */}
            <div className="text-center max-w-lg">
              <motion.p
                className="text-white text-lg leading-[21px] tracking-[0.01em] max-w-[460px]"
                style={{
                  fontFamily: "Roboto, sans-serif",
                }}
                variants={descriptionVariants}
                transition={transition}
              >
                To create a welcoming space where students can share their
                experiences and computing student groups can share their
                resources and knowledge to contribute to the success of the
                community as a whole. We envision a future where networking is
                simpler, advice is easy to come by, and computing students
                don&apos;t have to feel alone in an increasingly virtual
                industry.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 