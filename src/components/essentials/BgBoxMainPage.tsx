"use client";
import React from "react";
import { motion } from "framer-motion";

const bgImages = [
  // Top section boxes
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
    width: "30vw",
    height: "30vw",
    maxWidth: 350,
    maxHeight: 350,
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
  // Mid section boxes with varied sizes
  {
    src: "/FigmaFiles/mainPageAssets/boxTiltLeft.png",
    alt: "Background Box Mid Left Large",
    style: { top: "45%", left: "8%", transform: "translate(0%, 0%)" },
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
