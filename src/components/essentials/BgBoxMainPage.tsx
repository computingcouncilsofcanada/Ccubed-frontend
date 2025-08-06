"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Ultra-long background poster with fixed box positions
// These boxes are positioned across a much longer virtual poster space
// The poster scrolls normally, but box positions on the poster never change
const bgImages = [
  // First screen boxes - clean and minimal
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltRight.png",
    alt: "Background Box Left Top",
    style: { top: "8vh", left: "5%" },
    width: "30vw",
    height: "30vw",
    maxWidth: 350,
    maxHeight: 350,
  },
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltLeft.png",
    alt: "Background Box Right Top", 
    style: { top: "5vh", right: "10%" },
    width: "25vw",
    height: "25vw",
    maxWidth: 250,
    maxHeight: 250,
  },
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltRight.png",
    alt: "Background Box Center Bottom",
    style: { top: "70vh", left: "50%", transform: "translate(-50%, 0%)" },
    width: "28vw",
    height: "28vw",
    maxWidth: 320,
    maxHeight: 320,
  },
  
  // Second screen - more spaced out
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltLeft.png",
    alt: "Background Box Upper Right Large",
    style: { top: "110vh", right: "-5%" },
    width: "55vw",
    height: "55vw",
    maxWidth: 600,
    maxHeight: 600,
  },
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltRight.png",
    alt: "Background Box Upper Right Small",
    style: { top: "160vh", right: "12%" },
    width: "16vw",
    height: "16vw",
    maxWidth: 180,
    maxHeight: 180,
  },
  // New left side box for better balance
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltLeft.png",
    alt: "Background Box Left Side",
    style: { top: "140vh", left: "5%" },
    width: "28vw",
    height: "28vw",
    maxWidth: 320,
    maxHeight: 320,
  },
  
  // Third section - even more spaced
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltLeft.png",
    alt: "Background Box Middle Right Large",
    style: { top: "200vh", right: "8%" },
    width: "35vw",
    height: "35vw",
    maxWidth: 400,
    maxHeight: 400,
  },
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltLeft.png",
    alt: "Background Box Lower Left",
    style: { top: "250vh", left: "5%" },
    width: "26vw",
    height: "26vw",
    maxWidth: 300,
    maxHeight: 300,
  },
  
  // Extended sections - very sparse
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltRight.png",
    alt: "Background Box Extended Left",
    style: { top: "300vh", left: "20%" },
    width: "18vw",
    height: "18vw",
    maxWidth: 200,
    maxHeight: 200,
  },
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltLeft.png",
    alt: "Background Box Extended Center Large",
    style: { top: "350vh", left: "40%" },
    width: "33vw",
    height: "33vw",
    maxWidth: 380,
    maxHeight: 380,
  },
  
  // Far extended sections
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltRight.png",
    alt: "Background Box Far Right",
    style: { top: "400vh", right: "5%" },
    width: "29vw",
    height: "29vw",
    maxWidth: 330,
    maxHeight: 330,
  },
];

interface BgBoxMainPageProps {
  maxHeight?: number; // Maximum height in vh to show boxes (default: 400 for full poster)
  enableGlow?: boolean; // Whether to enable glow effect (default: false, only true for landing page)
}

const BgBoxMainPage: React.FC<BgBoxMainPageProps> = ({ maxHeight = 400, enableGlow = false }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [visibleBoxes, setVisibleBoxes] = useState(bgImages);

  useEffect(() => {
    setIsHydrated(true);
    // Filter boxes based on maxHeight - only show boxes that start within the visible area
    const filtered = bgImages.filter((img) => {
      const topPosition = parseFloat(img.style.top.replace('vh', ''));
      return topPosition <= maxHeight;
    });
    setVisibleBoxes(filtered);
  }, [maxHeight]);

  // Don't render anything until hydrated to prevent mismatches
  if (!isHydrated) {
    return null;
  }

  return (
    // This is the scrollable ultra-long poster background
    // Different page heights will naturally show different portions of this poster
    // Only render boxes within the specified height limit to avoid stretching short pages
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        width: "100%",
        zIndex: 1, // Behind content but above page background
      }}
    >
      {visibleBoxes.map((img) => {
        // Find original index for isTopLeftBox check
        const originalIdx = bgImages.findIndex(original => original === img);
        const isTopLeftBox = originalIdx === 0; // First box (left top) should glow
        
        return (
          <motion.div
            key={originalIdx}
            className={isTopLeftBox ? "group select-none pointer-events-auto" : "select-none pointer-events-auto"}
            style={{
              position: "absolute",
              zIndex: 3,
              width: img.width,
              height: img.height,
              maxWidth: img.maxWidth,
              maxHeight: img.maxHeight,
              userSelect: "none",
              ...img.style,
            }}
            initial={{ rotate: 0 }}
            whileHover={{
              rotate: 30,
              transition: {
                duration: 2,
                ease: "linear",
              },
            }}
            onDragStart={(e) => e.preventDefault()}
          >
            {/* White breathing glow effect - only for top left box and only when enabled */}
            {isTopLeftBox && enableGlow && (
              <motion.div
                className="absolute inset-0 pointer-events-none invisible group-hover:visible"
                style={{
                  background: "radial-gradient(ellipse 100% 100% at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 80%)",
                  filter: "blur(30px)",
                  transform: "scale(1.6)",
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          
            <div 
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                zIndex: 2,
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                style={{
                  objectFit: "contain",
                  userSelect: "none",
                }}
                draggable={false}
                unoptimized={img.src.endsWith('.png')}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BgBoxMainPage;
