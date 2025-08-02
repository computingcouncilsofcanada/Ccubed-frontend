"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCalendar } from "@tabler/icons-react";
import { Events } from "@/types/events";
import { EventCard } from "./EventCard";



// Main Events Section Component
type EventsSectionProps = {
  events: Events[];
};

export default function Events({ events }: EventsSectionProps) {
  const [eventType, setEventType] = useState<string>("all");
  const [showMore, setShowMore] = useState<boolean>(false);
  
  // Show actual events instead of empty state
  const showEmptyState = false;

  // Filter events based on selected type
  const filteredEvents = events
    .filter((event: Events) => event.status !== 0)
    .filter((event: Events) => {
      if (eventType === "all") return true;
      if (!event.types || event.types.length === 0) return eventType === "online";
      
      // Handle hybrid filter - events with multiple types OR events specifically marked as hybrid
      if (eventType === "hybrid") {
        return event.types.length > 1 || event.types.some(type => type.toLowerCase().includes("hybrid"));
      }
      
      // Handle single type filters
      if (eventType === "inperson") {
        return event.types.length === 1 && event.types[0] === "In Person";
      }
      
      if (eventType === "online") {
        return event.types.length === 1 && event.types[0] === "Online";
      }
      
      return false;
    });

  // Check if no events found for specific filter
  const showNoEventsForFilter = !showEmptyState && eventType !== "all" && filteredEvents.length === 0;

  // Check if there are more events to show
  const hasMoreEvents = filteredEvents.length > 4;
  
  // Get display name for current filter
  const getFilterDisplayName = (type: string) => {
    switch(type) {
      case "inperson": return "In Person";
      case "hybrid": return "Hybrid"; 
      case "online": return "Online";
      default: return type;
    }
  };

  return (
    <section className="events relative z-10">
      {/* Background Events Text - Upper Left */}
      <div 
        className="absolute pointer-events-none overflow-hidden"
        style={{ 
          zIndex: 0,
          left: "calc(-50vw + 50%)",
          top: "45%",
          transform: "translateY(-50%)",
          width: "100vw",
          height: "100%",
        }}
      >
        <span 
          className="text-white select-none absolute inset-0 flex items-center justify-start"
          style={{
            fontSize: "350px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: "900",
            opacity: "0.12",
            letterSpacing: "0em",
            userSelect: "none",
            whiteSpace: "nowrap",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 25%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 60%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 25%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 60%, transparent 75%)",
          }}
        >
          Events
        </span>
      </div>

      {/* Background Events Text - Lower Right */}
      <div 
        className="absolute pointer-events-none overflow-hidden"
        style={{ 
          zIndex: 0,
          left: "calc(-50vw + 50%)",
          top: "75%",
          transform: "translateY(-50%)",
          width: "100vw",
          height: "100%",
        }}
      >
        <span 
          className="text-white select-none absolute inset-0 flex items-center justify-end pr-8"
          style={{
            fontSize: "350px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: "900",
            opacity: "0.08",
            letterSpacing: "0em",
            userSelect: "none",
            whiteSpace: "nowrap",
            maskImage: "radial-gradient(ellipse 70% 60% at 75% 60%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.1) 50%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 75% 60%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.1) 50%, transparent 70%)",
          }}
        >
          Events
        </span>
      </div>

      {/* Header with title and logo */}
      <div
        className="flex items-end justify-center mb-4 mx-auto"
        style={{
          width: "706px",
          height: "214px",
        }}
      >
        <h1 className="text-white text-[40px] font-extrabold">Events</h1>
        <Image
          src="/FigmaFiles/mainPageAssets/bear_ccube.svg"
          alt="CCubed Bear Logo Animated"
          className="mb-[-20px] select-none"
          width={143}
          height={160}
          priority
          draggable={false}
          style={{ userSelect: "none" }}
        />
      </div>

      <div className="flex flex-col gap-5">
        {/* Description */}
        <p className="text-white font-light w-full text-center px-50">
          Join us for a variety of indoor and outdoor events that bring
          computing students together beyond the screen. Whether it&apos;s a
          casual meetup or a collaborative workshop, there&apos;s always a way
          to connect and grow.
        </p>

        {/* Event Type Filter */}
        <div
          className="flex gap-1 rounded-lg p-1 bg-[#0B161E] relative"
          style={{ width: "352px", height: "56px" }}
        >
          {/* Sliding Background Indicator */}
          <motion.div
            className="absolute top-1 rounded-lg"
            style={{
              height: "48px",
              width: "84px", // (352-8-3)/4 = width per option
              backgroundColor: "rgba(19, 40, 54, 0.8)",
            }}
            animate={{
              x: ["all", "inperson", "hybrid", "online"].indexOf(eventType) * 87, // 84px width + 3px gap
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
          />

          {/* Sliding Gradient Border */}
          <motion.div
            className="absolute top-1 rounded-lg pointer-events-none"
            style={{
              height: "48px",
              width: "84px",
              background: "linear-gradient(to top, rgba(61, 131, 178, 1) 0%, rgba(26, 56, 76, 0) 100%)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "xor",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              padding: "1.5px",
            }}
            animate={{
              x: ["all", "inperson", "hybrid", "online"].indexOf(eventType) * 87,
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
          />

          {[
            { label: "All Events", value: "all" },
            { label: "In Person", value: "inperson" },
            { label: "Hybrid", value: "hybrid" },
            { label: "Online", value: "online" },
          ].map((option) => (
            <motion.label
              key={option.value}
              className={`flex items-center justify-center flex-1 rounded-lg cursor-pointer text-white relative z-10`}
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                fontWeight: eventType === option.value ? "400" : "300",
                letterSpacing: "1%",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="radio"
                name="eventType"
                value={option.value}
                checked={eventType === option.value}
                onChange={() => setEventType(option.value)}
                className="hidden"
              />
              <span className="relative z-10">{option.label}</span>
            </motion.label>
          ))}
        </div>

        {/* Events Grid */}
        <div className={`mb-2 ${showEmptyState || showNoEventsForFilter ? 'flex justify-center items-center h-[451px]' : ''}`}>
          {!showEmptyState && !showNoEventsForFilter && (
            <div className="space-y-3">
              {/* First Row - Always visible */}
              <div className="grid grid-cols-4 gap-3">
                {filteredEvents
                  .slice(0, 4)
                  .map((event) => (
                    <EventCard
                      key={event.id}
                      id={event.id}
                      title={event.name}
                      time={event.time}
                      date={event.date}
                      location={event.location}
                      type={
                        (() => {
                          if (!event.types || event.types.length === 0) return "Online";
                          
                          // Check for hybrid first - either multiple types OR contains "hybrid"
                          const hasHybridType = event.types.some(type => 
                            type.toLowerCase() === "hybrid" || type.toLowerCase().includes("hybrid")
                          );
                          if (event.types.length > 1 || hasHybridType) return "Hybrid";
                          
                          // Single type matching
                          const eventType = event.types[0];
                          if (eventType === "In Person") return "In Person";
                          if (eventType === "Online") return "Online";
                          
                          return "Online"; // Default fallback
                        })()
                      }
                      imageSrc={
                        event.files && event.files.length > 0
                          ? event.files[0].url
                          : "https://placehold.co/400"
                      }
                      description={event.description}
                    />
                  ))}
              </div>

              {/* Second Row - Animated */}
              <AnimatePresence>
                {showMore && filteredEvents.length > 4 && (
                  <motion.div
                    className="grid grid-cols-4 gap-3"
                    initial={{ opacity: 0, y: -30, height: 0 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      height: "auto",
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -30, 
                      height: 0,
                    }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.25, 0.1, 0.25, 1],
                      height: { 
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1]
                      }
                    }}
                  >
                    {filteredEvents
                      .slice(4, 8)
                      .map((event) => (
                        <EventCard
                          key={event.id}
                          id={event.id}
                          title={event.name}
                          time={event.time}
                          date={event.date}
                          location={event.location}
                          type={
                            (() => {
                              if (!event.types || event.types.length === 0) return "Online";
                              
                              // Check for hybrid first - either multiple types OR contains "hybrid"
                              const hasHybridType = event.types.some(type => 
                                type.toLowerCase() === "hybrid" || type.toLowerCase().includes("hybrid")
                              );
                              if (event.types.length > 1 || hasHybridType) return "Hybrid";
                              
                              // Single type matching
                              const eventType = event.types[0];
                              if (eventType === "In Person") return "In Person";
                              if (eventType === "Online") return "Online";
                              
                              return "Online"; // Default fallback
                            })()
                          }
                          imageSrc={
                            event.files && event.files.length > 0
                              ? event.files[0].url
                              : "https://placehold.co/400"
                          }
                          description={event.description}
                        />
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          {showEmptyState && (
            <motion.div 
              className="flex flex-col items-center justify-center py-16 px-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Background decoration - subtle glow */}
                <div 
                  className="absolute rounded-full"
                  style={{
                    top: "-8px",
                    left: "-8px",
                    width: "80px",
                    height: "80px",
                    background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 50%, transparent 80%)",
                    filter: "blur(1px)",
                  }}
                />
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      boxShadow: "0 4px 12px rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <IconCalendar 
                      size={32} 
                      stroke={1.5} 
                      color="rgba(255, 255, 255, 0.7)" 
                    />
                  </div>
                </div>
              </div>
              
              {/* Text */}
              <h3 
                className="text-white text-center mb-2"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "600",
                  fontSize: "24px",
                  lineHeight: "32px",
                  letterSpacing: "-0.01em",
                }}
              >
                No Events Available
              </h3>
              <p 
                className="text-white text-center opacity-70"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "300",
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0%",
                  maxWidth: "300px",
                }}
              >
                Check back soon for exciting upcoming events and workshops!
              </p>
            </motion.div>
          )}
          
          {/* No events found for specific filter */}
          {showNoEventsForFilter && (
            <motion.div 
              className="flex flex-col items-center justify-center py-16 px-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Background decoration - subtle glow */}
                <div 
                  className="absolute rounded-full"
                  style={{
                    top: "-8px",
                    left: "-8px",
                    width: "80px",
                    height: "80px",
                    background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 50%, transparent 80%)",
                    filter: "blur(1px)",
                  }}
                />
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      boxShadow: "0 4px 12px rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <IconCalendar 
                      size={32} 
                      stroke={1.5} 
                      color="rgba(255, 255, 255, 0.7)" 
                    />
                  </div>
                </div>
              </div>
              
              {/* Text */}
              <h3 
                className="text-white text-center mb-2"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "600",
                  fontSize: "24px",
                  lineHeight: "32px",
                  letterSpacing: "-0.01em",
                }}
              >
                No {getFilterDisplayName(eventType)} Events
              </h3>
              <p 
                className="text-white text-center opacity-70"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "300",
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0%",
                  maxWidth: "350px",
                }}
              >
                We don&apos;t have any {getFilterDisplayName(eventType).toLowerCase()} events available right now. Try checking &quot;All Events&quot; or other event types!
              </p>
            </motion.div>
          )}
                  </div>

        {/* See More Button - Only show if there are more events */}
        {hasMoreEvents && (
          <div className="flex justify-center">
            <motion.button
              className="border border-white rounded-lg hover:bg-white/10 transition-colors duration-200"
              style={{
                width: "110px",
                height: "44px",
                borderRadius: "8px",
                borderWidth: "1px",
                borderColor: "#FFFFFF",
                backgroundColor: "transparent",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "1%",
                color: "#FFFFFF",
              }}
              onClick={() => setShowMore(!showMore)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {showMore ? "Show less" : "See more"}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
} 