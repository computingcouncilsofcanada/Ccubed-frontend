"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Background boxes for coming-soon page with yellow glossy cubes and blue boxes
const bgImages = [
  // Top left corner - blue box
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltRight.png",
    alt: "Background Box Top Left Blue",
    style: { top: "1vh", left: "0%" },
    width: "40vw",
    height: "40vw",
    maxWidth: 400,
    maxHeight: 400,
    color: "blue"
  },
  // Top right corner - yellow box slightly visible
  {
    src: "/FigmaFiles/mainPageAssets/cube-yellow-glossy.png",
    alt: "Background Box Top Right Yellow",
    style: { top: "-5vh", right: "-5%" },
    width: "22vw",
    height: "22vw",
    maxWidth: 240,
    maxHeight: 240,
    color: "yellow"
  },
  // Middle upper left - yellow box
  {
    src: "/FigmaFiles/mainPageAssets/cube-yellow-glossy.png",
    alt: "Background Box Middle Left Yellow",
    style: { top: "35vh", left: "33%" },
    width: "17vw",
    height: "17vw",
    maxWidth: 170,
    maxHeight: 170,
    color: "yellow"
  },
  // Right middle - blue box
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltLeft.png",
    alt: "Background Box Middle Right Blue",
    style: { top: "17vh", right: "28%" },
    width: "28vw",
    height: "28vw",
    maxWidth: 280,
    maxHeight: 280,
    color: "blue"
  },
  // Bottom left corner - blue box
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltRight.png",
    alt: "Background Box Bottom Left Blue",
    style: { bottom: "0vh", left: "0%" },
    width: "26vw",
    height: "26vw",
    maxWidth: 280,
    maxHeight: 280,
    color: "blue"
  },
  // Bottom center right - yellow box
  {
    src: "/FigmaFiles/mainPageAssets/cube-yellow-glossy.png",
    alt: "Background Box Bottom Center Yellow",
    style: { bottom: "6vh", right: "30%" },
    width: "18vw",
    height: "18vw",
    maxWidth: 200,
    maxHeight: 200,
    color: "yellow"
  },
  // Bottom right corner - blue box
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltLeft.png",
    alt: "Background Box Bottom Right Blue",
    style: { bottom: "-6vh", right: "-3%" },
    width: "23vw",
    height: "23vw",
    maxWidth: 230,
    maxHeight: 230,
    color: "blue"
  },
];

const BgBoxComingSoon = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div 
      className="fixed inset-0"
      style={{
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 25,
      }}
    >
      {bgImages.map((img, index) => {
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              ...img.style,
              width: img.width,
              height: img.height,
              maxWidth: img.maxWidth,
              maxHeight: img.maxHeight,
              zIndex: 26,
              pointerEvents: "auto",
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.8,
            }}
            animate={{ 
              opacity: 0.7, 
              scale: 1,
            }}
            transition={{
              duration: 2.5 + index * 0.3,
              ease: "easeOut",
            }}
            whileHover={{
              rotate: 30,
              transition: {
                duration: 2,
                ease: "linear",
              },
            }}
          >
          
            <div 
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                zIndex: 27,
                filter: img.color === "yellow" ? "blur(8px)" : "none",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 25vw"
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

export default BgBoxComingSoon;