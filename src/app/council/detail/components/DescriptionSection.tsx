"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DescriptionSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    { id: 0, image: "/FigmaFiles/councilAssets/bear_heart.png" },
    { id: 1, image: "/FigmaFiles/councilAssets/CCubed_icon.png" },
    { id: 2, image: "/FigmaFiles/councilAssets/Cybersecurity_council.png" },
    { id: 3, image: "/FigmaFiles/councilAssets/guy.png" },
    { id: 4, image: "/FigmaFiles/councilAssets/bear_heart.png" },
    { id: 5, image: "/FigmaFiles/councilAssets/CCubed_icon.png" },
  ];

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 1,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-24 px-4"
    >

      <div className="w-full max-w-[1152px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-6">

        <div className="w-full md:w-1/2 flex-shrink-0">
          <h2
            className="text-[28px] sm:text-[34px] md:text-[36px] font-extrabold leading-tight tracking-[0.01em] text-white mb-4"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Description
          </h2>

          <p
            className="text-white font-light text-[15px] sm:text-[16px] md:text-[18px] leading-[1.6] tracking-[0.01em] w-full max-w-none"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            We and numerous Canadian universities have paired up to create this
            very council, one that facilitates the engagement of your local
            cyber club by introducing you with industry professionals,
            educational events tailored to you, and ready made content for your
            next cybersecurity workshops. No more need to spend countless hours
            swimming through LinkedIn contacts and Internet write-ups, we've
            got you.
          </p>
        </div>


        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="relative w-full max-w-[550px] md:h-[331px] h-[220px] overflow-hidden rounded-[20px] bg-[#D4D4D4]/10 backdrop-blur-sm">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 800, damping: 50 },
                  opacity: { duration: 0.15 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    nextSlide();
                  } else if (swipe > swipeConfidenceThreshold) {
                    prevSlide();
                  }
                }}
                className="absolute inset-0 flex items-center justify-center rounded-[20px] cursor-grab active:cursor-grabbing"
              >
                <img
                  src={slides[activeIndex].image}
                  alt={`Slide ${activeIndex + 1}`}
                  className="w-full h-full object-contain rounded-[20px] pointer-events-none select-none"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

      
            <div className="absolute inset-0 border border-white/10 rounded-[20px] pointer-events-none z-20"></div>


            <button
              onClick={prevSlide}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 transition-colors px-3 py-1 md:px-4 md:py-2 rounded-full text-white text-lg md:text-xl font-bold z-10"
              aria-label="Previous slide"
            >
              ‹
            </button>

      
            <button
              onClick={nextSlide}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 transition-colors px-3 py-1 md:px-4 md:py-2 rounded-full text-white text-lg md:text-xl font-bold z-10"
              aria-label="Next slide"
            >
              ›
            </button>
          </div>


          <div className="flex gap-2 mt-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                  activeIndex === idx ? "bg-yellow-400" : "bg-gray-500"
                }`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DescriptionSection;