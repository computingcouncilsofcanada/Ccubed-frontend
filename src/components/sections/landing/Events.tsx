"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCalendar } from "@tabler/icons-react";
import { Events } from "@/types/events";

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
function EventCard({
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

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const shouldShowExpanded = isExpanded || isHovered;

  // Format date from "2025-08-10" to "Aug 10, 2025"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      className="relative group cursor-pointer"
      style={{ width: "276px", height: "451px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <motion.div
        className="relative overflow-hidden border border-white/10 backdrop-blur-sm"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          width: "276px",
          borderRadius: "20px",
        }}
        animate={{
          height: shouldShowExpanded ? "451px" : "320px",
        }}
        transition={{ 
          duration: 0.8, 
          ease: [0.25, 0.1, 0.25, 1],
          type: "tween"
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
              filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))"
            }}
          >
            {type}
          </span>
        </div>

        <div className="p-2 h-full flex flex-col">
          {/* Event Image */}
          <div
            className="bg-slate-700/30 rounded-xl mb-2 flex-shrink-0"
            style={{ width: "258px", height: "176px" }}
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
                 className="text-white text-left mb-2 overflow-hidden w-full h-14"
                 style={{
                 fontFamily: "Roboto, sans-serif",
                 fontWeight: "bold",
                 fontSize: "24px",
                 lineHeight: "28px",
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
            <div className="mb-2 space-y-1 h-12">
                {/* Time and Date in same row */}
                <div className="flex items-center gap-2 text-white">
                  <div className="flex items-center gap-1">
                    <Image src="/FigmaFiles/eventsAssets/clock-2.svg" alt="Time" width={20} height={20} className="select-none" draggable={false} style={{ userSelect: "none" }} />
                    <span style={{ 
                      fontSize: '10px',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: '400',
                      letterSpacing: '0%'
                    }}>{time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                                          <Image src="/FigmaFiles/eventsAssets/calendar.svg" alt="Date" width={20} height={20} className="select-none" draggable={false} style={{ userSelect: "none" }} />
                    <span style={{ 
                      fontSize: '10px',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: '400',
                      letterSpacing: '0%'
                    }}>{formatDate(date)}</span>
                  </div>
                </div>
                
                {/* Location in second row */}
                <div className="flex items-center gap-1 text-white">
                  <Image src="/FigmaFiles/eventsAssets/place.svg" alt="Location" width={20} height={20} className="select-none" draggable={false} style={{ userSelect: "none" }} />
                  <span style={{ 
                    fontSize: '10px',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: '400',
                    letterSpacing: '0%'
                  }}>{location}</span>
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
                    delay: 0.4
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
                <div className="flex gap-2 mb-4 justify-center mt-auto">
                    <button
                    className="text-white text-xs font-medium rounded-lg transition-all duration-200"
                    style={{
                      width: "117px",
                      height: "36px",
                      backgroundColor: "#FAA336",
                      borderRadius: "8px",
                      opacity: "100%",
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "20px",
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
                      width: "117px",
                      height: "36px",
                      backgroundColor: "transparent",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      borderRadius: "8px",
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "20px",
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