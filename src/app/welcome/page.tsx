"use client";

import React from "react";
import Link from "next/link";
import BgBoxComingSoon from "@/components/essentials/BgBoxComingSoon";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";



const ComingSoon = () => {

  return (
    <div className="h-screen w-full overflow-y-auto flex flex-col bg-gradient-to-b from-[#0D1C26] to-[#1A384C]">
      {/* Background layer */}
      <BgBoxComingSoon />

      {/* Header */}

      {/* Main content */}
      <section className="relative flex-1 flex items-start justify-center px-6">
        <div className="relative z-30   w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl rounded-[20px]  flex flex-col items-center justify-center gap-4 md:gap-6 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-[60px] py-10 ">
          {/* Greeting Bear */}
          <div className="pointer-events-none">
            <Image
              src={useSafariImageFallback(
                "/FigmaFiles/mainPageAssets/bear_greeting.svg",
                "/FigmaFiles/mainPageAssets/bear_greeting.png",
              )}
              alt="Greeting Bear"
              width={200}
              height={200}
              quality={100}
              draggable={false}
              style={{
                userSelect: "none",
                width: "12vh",
                height: "12vh",
                minWidth: "80px",
                minHeight: "80px",
                maxWidth: "160px",
                maxHeight: "160px",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Welcome text */}
          <div className="relative select-none cursor-default">
            <motion.p
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-center text-white leading-none"
              style={{ lineHeight: "1.2" }}
              initial={{ opacity: 1 }}
              whileHover={{
                opacity: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeInOut",
                },
              }}
            >
              Welcome To Ccubed!
            </motion.p>
            <motion.p
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-center absolute inset-0 leading-none"
              style={{
                background: "linear-gradient(90deg, #FFFFFF 0%, #F7A527 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                lineHeight: "1.2",
              }}
              initial={{ opacity: 0 }}
              whileHover={{
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: "easeInOut",
                },
              }}
            >
              Welcome To Ccubed!
            </motion.p>
          </div>

          {/* Notify button */}
          <Link
            href="/login"
            className="w-fit bg-[#FAA336] px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full text-white text-sm sm:text-base font-medium"
          >
            Go to Login Page
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ComingSoon;
