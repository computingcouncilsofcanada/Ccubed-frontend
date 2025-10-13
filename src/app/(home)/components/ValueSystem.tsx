"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";

// Define the benefits data
const benefits = [
  {
    id: 1,
    number: "1",
    title: "Growth",
    description:
      "We foster a judgment-free space where learning and progress have no limits.",
  },
  {
    id: 2,
    number: "2",
    title: "Mentorship",
    description:
      "Guidance should be open and accessible, breaking barriers to career success.",
  },
  {
    id: 3,
    number: "3",
    title: "Collaboration",
    description:
      "Cross-organization engagement fuels innovation and shared achievements.",
  },
  {
    id: 4,
    number: "4",
    title: "Impact",
    description:
      "We uplift each other by giving back, mentoring, and creating opportunities.",
  },
];

export default function ValueSystem() {
  const [windowWidth, setWindowWidth] = useState(0);
  const isMobile = windowWidth < 768;

  // Use Safari-specific fallback for bear form image
  const bearFormSrc = useSafariImageFallback(
    "/FigmaFiles/mainPageAssets/bear_form.svg",
    "/FigmaFiles/mainPageAssets/bear_form.png"
  );

  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(window.innerWidth);
    };

    updateDimensions(); // Set initial dimensions
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (windowWidth === 0) return null;

  return (
    <section className="key-benefits relative z-10">
      {/* Background handled globally in BgTextMainPage */}

      {/* Header with title and logo */}
      <motion.div
        className="flex gap-2 sm:gap-3 items-end justify-start mb-4 relative z-10 max-w-full"
        style={{
          maxWidth: "806px",
          height:
            windowWidth < 640
              ? "120px"
              : windowWidth < 1024
              ? "160px"
              : "214px",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
          Our Value System
        </h1>
        <motion.div
          className="relative flex-shrink-0"
          style={{
            marginLeft: windowWidth < 640 ? "-70px" : "-60px",
            marginBottom: windowWidth < 640 ? "-40px" : "-25px",
            transform:
              windowWidth < 640
                ? "scale(0.5)"
                : windowWidth < 1024
                ? "scale(0.7)"
                : "scale(0.7)",
          }}
        >
          <Image
            src={bearFormSrc}
            alt="Bear Form Logo"
            width={143}
            height={210}
            priority
            className="select-none"
            draggable={false}
            style={{ userSelect: "none" }}
          />
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
              src={bearFormSrc}
              alt="Bear Form Logo Animated"
              width={143}
              height={210}
              priority
              className="select-none"
              draggable={false}
              style={{ userSelect: "none" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Description */}
      <motion.div
        className="text-left mb-8 sm:mb-12 max-w-4xl relative z-10 sm:px-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
      >
        <p
          className="text-white font-light text-sm sm:text-base leading-relaxed"
          style={{
            fontFamily: "Roboto, sans-serif",
            letterSpacing: "1%",
          }}
        >
          We value growth, mentorship, collaboration, and impact. These
          principles guide us in creating a supportive space where students
          learn, connect, and contribute to a stronger community.
        </p>
      </motion.div>

      {/* Benefits Cards - Cascading Layout */}
      <div
        className="relative max-w-6xl mx-auto px-4 z-10"
        style={{ height: "800px" }}
      >
        <AnimatePresence>
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{
                opacity: 0,
                y: 40,
                x: isMobile ? (index % 2 === 0 ? -80 : 80) : 0, // left for 1&3, right for 2&4
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                x: 0,
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: index * 0.25,
                ease: "easeOut",
              }}
              className={`group absolute rounded-2xl px-6 py-4 cursor-pointer overflow-hidden
                w-[280px] sm:w-[400px] lg:w-[634px]
                ${index % 2 === 0 ? "left-0" : "right-0"}
              `}
              style={{
                height: "222px",
                top: `${index * 160}px`,
                zIndex: 10 + index,
                opacity: 1.0,
              }}
            >
              {/* Grid Layout: 2x2 - Responsive */}
              <div
                className="grid gap-2 mb-6"
                style={{
                  marginTop: "20px",
                  gridTemplateColumns:
                    windowWidth < 768 ? "60px 1fr" : "80px 1fr",
                  gridTemplateRows: "auto 1fr",
                  alignItems: "baseline",
                }}
              >
                {/* Left Top: Number */}
                <div className="justify-self-start self-baseline relative">
                  <span
                    className="font-bold block transition-all duration-300"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize:
                        windowWidth < 768
                          ? "60px"
                          : windowWidth < 1024
                          ? "80px"
                          : "96px",
                      letterSpacing: "0.5%",
                      lineHeight: "1",
                      color: "rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    {benefit.number}.
                  </span>
                  {/* Gradient overlay for hover effect */}
                  <span
                    className="font-bold block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize:
                        windowWidth < 768
                          ? "60px"
                          : windowWidth < 1024
                          ? "80px"
                          : "96px",
                      letterSpacing: "0.5%",
                      lineHeight: "1",
                      background:
                        benefit.id === 1
                          ? "linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(173, 216, 230, 0.8) 100%)"
                          : benefit.id === 2
                          ? "linear-gradient(to left, rgba(255, 255, 255, 0.9) 0%, rgba(248, 176, 65, 0.8) 100%)"
                          : benefit.id === 3
                          ? "linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(255, 63, 51, 0.8) 100%)"
                          : "linear-gradient(to left, rgba(255, 255, 255, 0.9) 0%, rgba(57, 74, 139, 0.8) 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                    }}
                  >
                    {benefit.number}.
                  </span>
                </div>

                {/* Right Top: Title */}
                <div className="justify-self-start self-baseline relative">
                  <h3
                    className="font-bold transition-all duration-300"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize:
                        windowWidth < 768
                          ? "24px"
                          : windowWidth < 1024
                          ? "32px"
                          : "40px",
                      letterSpacing: "0.5%",
                      lineHeight: "1",
                      whiteSpace: "nowrap",
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  {/* Gradient overlay for hover effect */}
                  <h3
                    className={`font-bold absolute inset-0 transition-opacity duration-300 ${
                      isMobile
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize:
                        windowWidth < 768
                          ? "24px"
                          : windowWidth < 1024
                          ? "32px"
                          : "40px",
                      letterSpacing: "0.5%",
                      lineHeight: "1",
                      whiteSpace: "nowrap",
                      background:
                        benefit.id === 1
                          ? "linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(173, 216, 230, 0.8) 100%)"
                          : benefit.id === 2
                          ? "linear-gradient(to left, rgba(255, 255, 255, 0.9) 0%, rgba(248, 176, 65, 0.8) 100%)"
                          : benefit.id === 3
                          ? "linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(255, 63, 51, 0.8) 100%)"
                          : "linear-gradient(to left, rgba(255, 255, 255, 0.9) 0%, rgba(57, 74, 139, 0.8) 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                    }}
                  >
                    {benefit.title}
                  </h3>
                </div>

                {/* Left Bottom: Empty */}
                <div></div>

                {/* Right Bottom: Description (Only on Hover) */}
                <div className="justify-self-start self-start">
                  {windowWidth < 768 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                    >
                      <p
                        className="text-white/90 text-left"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "14px",
                          letterSpacing: "1%",
                          fontWeight: "300",
                          lineHeight: "1.3",
                          maxWidth: "200px",
                        }}
                      >
                        {benefit.description}
                      </p>
                    </motion.div>
                  ) : (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-800 ease-out delay-300">
                      <p
                        className="text-white/90 text-left"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: windowWidth < 1024 ? "16px" : "20px",
                          letterSpacing: "1%",
                          fontWeight: "300",
                          lineHeight: "1.3",
                          maxWidth: windowWidth < 1024 ? "300px" : "400px",
                        }}
                      >
                        {benefit.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Border Effect */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transform -translate-y-5 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style={{
                  background: `${
                    benefit.id === 1
                      ? "linear-gradient(135deg, rgba(173, 216, 230, 0.8) 0%, rgba(173, 216, 230, 0.6) 20%, rgba(173, 216, 230, 0.3) 40%, transparent 60%)"
                      : benefit.id === 2
                      ? "linear-gradient(305deg, rgba(248, 176, 65, 0.8) 0%, rgba(248, 176, 65, 0.6) 30%, rgba(248, 176, 65, 0.4) 50%, transparent 70%)"
                      : benefit.id === 3
                      ? "linear-gradient(135deg, rgba(255, 63, 51, 0.8) 0%, rgba(255, 63, 51, 0.6) 20%, rgba(255, 63, 51, 0.4) 40%, transparent 60%)"
                      : "linear-gradient(335deg, rgba(57, 74, 139, 0.8) 0%, rgba(57, 74, 139, 0.7) 25%, rgba(57, 74, 139, 0.5) 50%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 0.2) 65%, transparent 75%)"
                  }`,
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  padding: "3px",
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
