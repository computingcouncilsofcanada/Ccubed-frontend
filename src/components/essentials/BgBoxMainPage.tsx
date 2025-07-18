"use client";
import React from "react";
import { motion } from "framer-motion";

const bgImages = [
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltRight.png",
    alt: "Background Box Tilted Right Top Right",
    style: { top: 0, right: "10%", transform: "translate(0%, 10%)" },
    width: "25vw",
    height: "25vw",
    maxWidth: 250,
    maxHeight: 250,
  },
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltRight.png",
    alt: "Background Box Tilted Left Top Left",
    style: { top: 0, left: 0, transform: "translate(0%, 10%)" },
    width: "25vw",
    height: "25vw",
    maxWidth: 300,
    maxHeight: 300,
  },
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltLeft.png",
    alt: "Background Box Tilted Left Center",
    style: { top: "20%", left: "50%", transform: "translate(-50%, -50%)" },
    width: "22vw",
    height: "22vw",
    maxWidth: 260,
    maxHeight: 260,
  },
];

const BgBoxMainPage = () => {
  return (
    <>
      {bgImages.map((img, idx) => (
        <motion.div
          key={idx}
          style={{
            position: "absolute",
            zIndex: 3,
            width: img.width,
            height: img.height,
            maxWidth: img.maxWidth,
            maxHeight: img.maxHeight,
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
        >
          <img
            src={img.src}
            alt={img.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </motion.div>
      ))}
    </>
  );
};

export default BgBoxMainPage;
