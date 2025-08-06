"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const bgImages = [
  // Top section boxes
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltRight.png",
    alt: "Background Box Tilted Right Top Right",
    style: { top: "2%", right: "10%", transform: "translate(0%, 10%)" },
    width: "25vw",
    height: "25vw",
    maxWidth: 250,
    maxHeight: 250,
  },
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltRight.png",
    alt: "Background Box Tilted Left Top Left",
    style: { top: "5%", left: 0, transform: "translate(0%, 10%)" },
    width: "30vw",
    height: "30vw",
    maxWidth: 350,
    maxHeight: 350,
  },
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltLeft.png",
    alt: "Background Box Tilted Left Center",
    style: { top: "15%", left: "50%", transform: "translate(-50%, -50%)" },
    width: "22vw",
    height: "22vw",
    maxWidth: 260,
    maxHeight: 260,
  },
  // New box below center, to the right - same size as top left
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltLeft.png",
    alt: "Background Box Below Center Right",
    style: { top: "25%", right: "-9%", transform: "translate(0%, 0%)" },
    width: "55vw",
    height: "55vw",
    maxWidth: 600,
    maxHeight: 600,
  },
  // Mid section boxes with varied sizes
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltLeft.png",
    alt: "Background Box Mid Left Large",
    style: { top: "35%", left: "8%", transform: "translate(0%, 0%)" },
    width: "32vw",
    height: "32vw",
    maxWidth: 380,
    maxHeight: 380,
  },
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltRight.png",
    alt: "Background Box Mid Right Small",
    style: { top: "55%", right: "12%", transform: "translate(0%, 0%)" },
    width: "16vw",
    height: "16vw",
    maxWidth: 180,
    maxHeight: 180,
  },
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltLeft.png",
    alt: "Background Box Lower Center Large",
    style: { top: "70%", left: "35%", transform: "translate(0%, 0%)" },
    width: "28vw",
    height: "28vw",
    maxWidth: 320,
    maxHeight: 320,
  },
  // Bottom section boxes
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltRight.png",
    alt: "Background Box Bottom Left Medium",
    style: { top: "85%", left: "15%", transform: "translate(0%, 0%)" },
    width: "19vw",
    height: "19vw",
    maxWidth: 210,
    maxHeight: 210,
  },
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltLeft.png",
    alt: "Background Box Bottom Right Large",
    style: { top: "90%", right: "8%", transform: "translate(0%, 0%)" },
    width: "35vw",
    height: "35vw",
    maxWidth: 400,
    maxHeight: 400,
  },
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltRight.png",
    alt: "Background Box Very Bottom Center Medium",
    style: { top: "105%", left: "60%", transform: "translate(0%, 0%)" },
    width: "21vw",
    height: "21vw",
    maxWidth: 230,
    maxHeight: 230,
  },
];

interface BgBoxMainPageProps {
  maxHeight?: number; // Maximum height percentage to show boxes (default: 100 for full page)
}

const BgBoxMainPage: React.FC<BgBoxMainPageProps> = ({ maxHeight = 100 }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [visibleBoxes, setVisibleBoxes] = useState(bgImages);

  useEffect(() => {
    setIsHydrated(true);
    // Filter boxes based on maxHeight - only show boxes that start within the visible area
    const filtered = bgImages.filter((img) => {
      const topPosition = parseFloat(img.style.top.replace('%', ''));
      return topPosition <= maxHeight;
    });
    setVisibleBoxes(filtered);
  }, [maxHeight]);

  // Don't render anything until hydrated to prevent mismatches
  if (!isHydrated) {
    return null;
  }

  return (
    <>
      {visibleBoxes.map((img) => {
        // Find original index for isTopLeftBox check
        const originalIdx = bgImages.findIndex(original => original === img);
        const isTopLeftBox = originalIdx === 1;
        
        return (
          <motion.div
            key={originalIdx}
            className={isTopLeftBox ? "group select-none" : "select-none"}
            style={{
              position: "absolute",
              zIndex: 3,
              width: img.width,
              height: img.height,
              maxWidth: img.maxWidth,
              maxHeight: img.maxHeight,
              userSelect: "none",
              pointerEvents: "auto",
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
            {/* White breathing glow effect - only for top left box (index 1) */}
            {isTopLeftBox && (
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
    </>
  );
};

export default BgBoxMainPage;
