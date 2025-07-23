"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Hero Section Component
export default function Hero() {
  return (
    <section className="hero flex gap-4 flex-col md:flex-row items-center justify-center relative z-10 max-w-6xl mx-auto">
      {/* Text Content */}
      <div className="text flex flex-col gap-4 md:max-w-lg">
        <h1 className="text-white font-extrabold text-4xl">
          Connecting Canada&apos;s computing students through community and
          events.
        </h1>
        <p 
          className="text-white max-w-xl"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "300",
            fontSize: "20px",
            lineHeight: "26px",
            letterSpacing: "0%"
          }}
        >
          To connect and support students through engaging events while
          building community amongst Canadian computing student groups. 
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex items-center gap-x-6">
          <a
            href=""
            className="flex items-center justify-center rounded-lg"
            style={{
              width: "125px",
              height: "44px",
              borderRadius: "8px",
              backgroundColor: "#FAA336",
              color: "#0E1E29",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "1%"
            }}
          >
            Get Started
          </a>
          <a
            href=""
            className="flex items-center justify-center rounded-lg"
            style={{
              width: "125px",
              height: "44px",
              borderRadius: "8px",
              backgroundColor: "transparent",
              border: "1px solid #FFFFFF",
              color: "#FFFFFF",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "1%"
            }}
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Hero Image with Animation */}
      <div className="image relative flex justify-center flex-shrink-0">
        <motion.div className="relative w-[505px] h-[505px]">
          {/* Base Hero Image */}
          <Image
            src="/FigmaFiles/mainPageAssets/hero-img.svg"
            alt="Hero Image"
            width={505}
            height={505}
            className="w-full h-full object-contain"
            priority
          />
          
          {/* Animated Overlay Image */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/FigmaFiles/mainPageAssets/hero-img-2.svg"
              alt="Hero Image with Texture"
              width={505}
              height={505}
              className="w-full h-full object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 