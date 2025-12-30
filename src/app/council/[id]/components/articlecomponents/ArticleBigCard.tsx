import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ArticleBigcard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [windowWidth, setWindowWidth] = useState(() => {
    // Initialize with current window width if available, fallback to desktop size
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 1024; // Default to desktop size for SSR
  });

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    // Ensure window width is correctly set after hydration
    if (typeof window !== "undefined") {
      updateWidth();
    }
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const shouldShowExpanded = isExpanded || isHovered;

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="[@media(min-width:1054px)]:w-1/2  relative flex flex-col cursor-pointer gap-4 "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <motion.div
        className={` rounded-4xl `}
        animate={{
          height: shouldShowExpanded
            ? windowWidth > 600
              ? "428px"
              : "500px"
            : "330px",
          backgroundColor: shouldShowExpanded ? "#D4D4D41A" : "transparent",
        }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          type: "tween",
        }}
      >
        <div className="relative w-full h-50 rounded-4xl overflow-hidden">
          <Image
            src={"/ArticlePics/ArticleImage.png"}
            alt="Article Image"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col  md:gap-0 gap-4">
          <div className="flex flex-col md:flex-row justify-between md:items-center items-start md:gap-0 leading-12 tracking-[0.01em] text-white px-4">
            <div className="flex gap-4">
              <p>Information Security</p>
              <p>7 min read</p>
            </div>
            <p>July 20, 2025</p>
          </div>
          <p className=" tracking-[0.01em] text-white font-extrabold text-xl px-4">
            The State of Cybersecurity in 2025: What You Need to Know
          </p>
        </div>
        <AnimatePresence>
          {shouldShowExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className=""
            >
              {/* Description - Fixed Height */}
              <div className="h-25 mt-4 px-4  overflow-hidden">
                <p
                  className="text-white h-full overflow-hidden font-bold"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  Cybersecurity in 2025 is revolving faster than ever, with AI
                  Driven attacks becoming more sophisticated and harder to
                  detect. New Global Resolutions and Security frameworks are
                  pushing organizations...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
