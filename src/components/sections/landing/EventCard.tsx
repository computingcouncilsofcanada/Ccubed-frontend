import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { formatDateSmart } from "@/utils/dateUtils";




type EventCardProps = {
    id: number;
    title: string;
    time: string;
    date: string;
    location: string;
    type: "Online" | "In Person" | "Hybrid";
    imageSrc: string;
    description: string;
  };
  
  // EventCard component - integrated into this section
  export function EventCard({
    // id,
    title,
    time,
    date,
    location,
    type,
    imageSrc,
    description,
  }: EventCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
      const updateWidth = () => setWindowWidth(window.innerWidth);
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }, []);
  
    const handleClick = () => {
      setIsExpanded(!isExpanded);
    };
  
    const shouldShowExpanded = isExpanded || isHovered;
  
    // Use smart date formatting with timezone awareness
    const formatDate = (dateString: string) => {
      return formatDateSmart(dateString, { format: 'medium' });
    };
  
    return (
      <motion.div
        className="relative group cursor-pointer w-full max-w-[276px] mx-auto h-[380px] sm:h-[420px] lg:h-[451px]"
        style={{ 
          width: "100%", 
          minWidth: "240px"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <motion.div
          className="relative overflow-hidden border border-white/10 backdrop-blur-sm w-full"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "20px",
          }}
          animate={{
            height: shouldShowExpanded ? "451px" : "320px",
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
            type: "tween",
          }}
        >
          {/* Event Type Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span
              className="flex items-center justify-center"
              style={{
                height: "28px",
                paddingLeft: "12px",
                paddingRight: "12px",
                borderRadius: "20px",
                backgroundColor: "rgba(212, 212, 212, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                opacity: "0.99",
                color: "#FFFFFF",
                fontFamily: "Roboto, sans-serif",
                fontWeight: "400",
                fontSize: "10px",
                lineHeight: "auto",
                letterSpacing: "0%",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))",
              }}
            >
              {type}
            </span>
          </div>
  
          <div className="p-2 h-full flex flex-col">
            {/* Event Image */}
            <div
              className="bg-slate-700/30 rounded-xl mb-2 flex-shrink-0 w-full aspect-[258/176] overflow-hidden"
            >
              <Image
                src={imageSrc}
                alt={title}
                width={258}
                height={176}
                className="w-full h-full object-cover opacity-80 rounded-xl select-none"
                draggable={false}
                style={{ userSelect: "none" }}
                priority={false}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
            <div className="px-2">
              {/* Event Title - Always Visible */}
              <h3
                className="text-white text-left mb-1.5 sm:mb-2 overflow-hidden w-full"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "bold",
                  fontSize: windowWidth < 640 ? "20px" : windowWidth < 1024 ? "22px" : "24px",
                  lineHeight: windowWidth < 640 ? "24px" : windowWidth < 1024 ? "26px" : "28px",
                  height: windowWidth < 640 ? "48px" : "56px",
                  color: "#FFFFFF",
                  letterSpacing: "0%",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {title}
              </h3>
  
              {/* Basic Info - Always Visible */}
              <div className="mb-1.5 sm:mb-2 space-y-1" style={{ height: windowWidth < 640 ? "40px" : "48px" }}>
                {/* Time and Date in same row */}
                <div className="flex items-center gap-2 text-white">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/FigmaFiles/eventsAssets/clock-2.svg"
                      alt="Time"
                      width={windowWidth < 640 ? 16 : 20}
                      height={windowWidth < 640 ? 16 : 20}
                      className="select-none"
                      draggable={false}
                      style={{ userSelect: "none" }}
                    />
                    <span
                      style={{
                        fontSize: windowWidth < 640 ? "9px" : "10px",
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: "400",
                        letterSpacing: "0%",
                      }}
                    >
                      {time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/FigmaFiles/eventsAssets/calendar.svg"
                      alt="Date"
                      width={windowWidth < 640 ? 16 : 20}
                      height={windowWidth < 640 ? 16 : 20}
                      className="select-none"
                      draggable={false}
                      style={{ userSelect: "none" }}
                    />
                    <span
                      style={{
                        fontSize: windowWidth < 640 ? "9px" : "10px",
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: "400",
                        letterSpacing: "0%",
                      }}
                    >
                      {formatDate(date)}
                    </span>
                  </div>
                </div>
  
                {/* Location in second row */}
                <div className="flex items-center gap-1 text-white">
                  <Image
                    src="/FigmaFiles/eventsAssets/place.svg"
                    alt="Location"
                    width={20}
                    height={20}
                    className="select-none"
                    draggable={false}
                    style={{ userSelect: "none" }}
                  />
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: "400",
                      letterSpacing: "0%",
                    }}
                  >
                    {location}
                  </span>
                </div>
              </div>
  
              {/* Expanded Content */}
              <AnimatePresence>
                {shouldShowExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      delay: 0.4,
                    }}
                    className="flex-1 flex flex-col"
                  >
                    {/* Description - Fixed Height */}
                    <div className="h-20 mb-2 overflow-hidden">
                      <p
                        className="text-white h-full overflow-hidden"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontWeight: "300",
                          fontSize: "14px",
                          lineHeight: "20px",
                          letterSpacing: "-0.02em",
                          color: "#FFFFFF",
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {description}
                      </p>
                    </div>
  
                    {/* Action Buttons - Side by Side - Fixed at bottom */}
                    <div className="flex gap-1.5 sm:gap-2 mb-2 sm:mb-3 lg:mb-4 justify-between mt-auto">
                      <button
                        className="text-white text-xs font-medium rounded-lg transition-all duration-200"
                        style={{
                          flex: "1",
                          height: windowWidth < 640 ? "30px" : windowWidth < 1024 ? "33px" : "36px",
                          backgroundColor: "#FAA336",
                          borderRadius: "8px",
                          opacity: "100%",
                          fontFamily: "Roboto, sans-serif",
                          fontWeight: "400",
                          fontSize: windowWidth < 640 ? "12px" : "14px",
                          lineHeight: windowWidth < 640 ? "16px" : "20px",
                          letterSpacing: "0%",
                          color: "#152E3F",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Invitation Link
                      </button>
                      <button
                        className="text-white text-xs font-medium rounded-lg transition-all duration-200"
                        style={{
                          flex: "1",
                          height: windowWidth < 640 ? "30px" : windowWidth < 1024 ? "33px" : "36px",
                          backgroundColor: "transparent",
                          border: "1px solid rgba(255, 255, 255, 0.5)",
                          borderRadius: "8px",
                          fontFamily: "Roboto, sans-serif",
                          fontWeight: "400",
                          fontSize: windowWidth < 640 ? "12px" : "14px",
                          lineHeight: windowWidth < 640 ? "16px" : "20px",
                          letterSpacing: "0%",
                          color: "#FFFFFF",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        See Details
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
  
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent rounded-xl pointer-events-none" />
        </motion.div>
      </motion.div>
    );
  }