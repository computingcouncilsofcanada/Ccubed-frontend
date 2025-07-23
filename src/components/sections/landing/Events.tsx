"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Event types
type FileObject = {
  id: number;
  name: string;
  url: string;
};

type Events = {
  id: number;
  name: string;
  description: string;
  status: number;
  date: string;
  time: string;
  location: string;
  images: string;
  files: FileObject[];
  types: string[];
};

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
  id,
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
        className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-sm"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          width: "276px",
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
            className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              type === "Online"
                ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                : type === "In Person"
                ? "bg-green-500/20 text-green-300 border border-green-400/30"  
                : "bg-purple-500/20 text-purple-300 border border-purple-400/30"
            }`}
          >
            {type}
          </span>
        </div>

        <div className="p-2 h-full flex flex-col">
          {/* Event Image */}
          <div
            className="bg-slate-700/30 rounded-xl mb-2"
            style={{ width: "258px", height: "176px" }}
          >
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover opacity-80 rounded-xl"
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
            <div className="mb-2 space-y-1">
                {/* Time and Date in same row */}
                <div className="flex items-center gap-2 text-white">
                  <div className="flex items-center gap-1">
                    <img src="/FigmaFiles/eventsAssets/clock-2.svg" alt="Time" width={20} height={20} />
                    <span style={{ 
                      fontSize: '10px',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: '400',
                      letterSpacing: '0%'
                    }}>{time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src="/FigmaFiles/eventsAssets/calendar.svg" alt="Date" width={20} height={20} />
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
                  <img src="/FigmaFiles/eventsAssets/place.svg" alt="Location" width={20} height={20} />
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

  return (
    <section
      className="events relative z-10"
      style={{ marginTop: "-40px" }}
    >
      {/* Header with title and logo */}
      <div
        className="flex gap-3 items-end justify-center mb-4 mx-auto"
        style={{
          width: "706px",
          height: "214px",
        }}
      >
        <h1 className="text-white text-4xl font-extrabold">Events</h1>
        <motion.div className="relative" style={{ marginLeft: "-40px" }}>
          <Image
            src="/FigmaFiles/mainPageAssets/small-breathe-logo.svg"
            alt="Breathe Logo"
            width={143}
            height={210}
            priority
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
              src="/FigmaFiles/mainPageAssets/small-breathe-logo-2.svg"
              alt="Breathe Logo Animated"
              width={143}
              height={210}
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-5">
        {/* Description */}
        <p className="text-white font-thin w-full text-center px-50">
          Join us for a variety of indoor and outdoor events that bring
          computing students together beyond the screen. Whether it&apos;s a
          casual meetup or a collaborative workshop, there&apos;s always a
          way to connect and grow.
        </p>

        {/* Event Type Filter */}
        <div
          className="flex gap-1 rounded-lg p-1 bg-[#0B161E]"
          style={{ width: "352px", height: "56px" }}
        >
          {[
            { label: "All Events", value: "all" },
            { label: "In Person", value: "inperson" },
            { label: "Hybrid", value: "hybrid" },
            { label: "Online", value: "online" },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center justify-center flex-1 rounded-lg cursor-pointer transition-colors duration-150 text-white relative overflow-hidden`}
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                fontWeight: eventType === option.value ? "400" : "300",
                letterSpacing: "1%",
                backgroundColor:
                  eventType === option.value
                    ? "rgba(19, 40, 54, 0.6)"
                    : "transparent",
              }}
            >
              {/* Gradient border for selected state */}
              {eventType === option.value && (
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(61, 131, 178, 1) 0%, rgba(26, 56, 76, 0) 100%)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    padding: "1.5px",
                  }}
                />
              )}
              <input
                type="radio"
                name="eventType"
                value={option.value}
                checked={eventType === option.value}
                onChange={() => setEventType(option.value)}
                className="hidden"
              />
              <span className="relative z-10">{option.label}</span>
            </label>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-2 justify-items-center">
          {events.filter((event: Events) => event.status !== 0).length === 0 && (
            <p className="text-2xl font-bold text-center col-span-full">
              No events at this time
            </p>
          )}
          {events
            .filter((event: Events) => event.status !== 0)
            .filter((event: Events) => {
              if (eventType === "all") return true;
              if (!event.types || event.types.length === 0) return false;
              const eventTypeValue = event.types[0].toLowerCase();
              return (
                eventTypeValue === eventType ||
                (eventType === "inperson" && eventTypeValue === "in person") ||
                (eventType === "hybrid" && eventTypeValue === "hybrid") ||
                (eventType === "online" && eventTypeValue === "online")
              );
            })
            .map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.name}
                time={event.time}
                date={event.date}
                location={event.location}
                type={
                  event.types && event.types.length > 0
                    ? event.types[0] === "In person"
                      ? "In Person"
                      : event.types[0] === "Hybrid"
                      ? "Hybrid"
                      : "Online"
                    : "Online"
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

        {/* See More Button */}
        <div className="flex justify-center">
          <button
            className="border border-white rounded-lg"
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
          >
            See more
          </button>
        </div>
      </div>
    </section>
  );
} 