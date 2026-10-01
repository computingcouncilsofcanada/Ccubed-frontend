"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";

// Hero Section Component
export default function Hero() {
  // Use Safari-specific fallback for hero images
  const heroImgSrc = useSafariImageFallback(
    "/FigmaFiles/mainPageAssets/hero-img.svg",
    "/FigmaFiles/mainPageAssets/hero-img.png"
  );
  
  const heroImg2Src = useSafariImageFallback(
    "/FigmaFiles/mainPageAssets/hero-img-2.svg",
    "/FigmaFiles/mainPageAssets/hero-img-2.png"
  );

  return (
    <section className="hero flex gap-4 flex-col-reverse md:flex-row items-center justify-center relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 xl:px-0">
      {/* Text Content */}
      <div className="text flex flex-col gap-4 md:max-w-sm lg:max-w-lg">
        <h1 className="text-white font-extrabold text-2xl sm:text-3xl md:text-2xl lg:text-4xl">
          Computing Councils of Canada (CCubed)
        </h1>
        <p 
          className="text-white max-w-xl sm:text-lg sm:leading-6 lg:text-xl lg:leading-7"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "300",
            fontSize: "16px",
            lineHeight: "22px",
            letterSpacing: "0%"
          }}
        >
          Canada’s largest student run not for profit organization for computer science students 
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex items-center gap-x-6 mt-4">
          <div 
            className="relative group transition-all duration-300"
            style={{
              width: "125px",
              height: "44px",
              borderRadius: "8px",
              background: "var(--color-brand)"
            }}
          >
            {/* Hover gradient border effect */}
            <div 
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(102, 102, 102, 0) 100%)",
                padding: "2px",
                borderRadius: "8px"
              }}
            >
              <div 
                className="w-full h-full rounded-lg"
                style={{
              backgroundColor: "var(--color-brand)",
                  borderRadius: "6px"
                }}
              />
            </div>
            
            <Link
              href="/events"
              className="absolute inset-0 flex items-center justify-center rounded-lg z-10"
              style={{
              color: "#0E1E29",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "1%"
            }}
          >
            View Events
          </Link>
          </div>
          <Link
            href="/teams"
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
            Team
          </Link>
        </div>
      </div>

      {/* Hero Image with Animation */}
      <div className="image relative flex justify-center flex-shrink-0">
        <motion.div className="relative w-[300px] h-[300px] md:w-[320px] md:h-[320px] lg:w-[505px] lg:h-[505px]">
          {/* Base Hero Image */}
          <Image
            src={heroImgSrc}
            alt="Hero Image"
            width={505}
            height={505}
            className="w-full h-full object-contain select-none"
            priority
            quality={100}
            draggable={false}
            style={{ userSelect: "none" }}
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
              src={heroImg2Src}
              alt="Hero Image with Texture"
              width={505}
              height={505}
              className="w-full h-full object-contain select-none"
              priority
              quality={100}
              draggable={false}
              style={{ userSelect: "none" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 