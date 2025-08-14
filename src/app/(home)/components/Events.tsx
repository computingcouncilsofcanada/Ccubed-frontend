"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IconCalendar } from "@tabler/icons-react";
import { Events } from "@/types/events";
import { useRouter } from "next/navigation";
import { EventCard } from "@/components/shared/EventCard";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";



// Main Events Section Component
type EventsSectionProps = {
  events: Events[];
};

export default function Events({ events }: EventsSectionProps) {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Use Safari-specific fallback for bear ccube image
  const bearCcubeSrc = useSafariImageFallback(
    "/FigmaFiles/mainPageAssets/bear_ccube.svg",
    "/FigmaFiles/mainPageAssets/bear_ccube.png"
  );
  
  // Show actual events instead of empty state
  const showEmptyState = false;

  // Sort events by date (most recent first) and filter out inactive events
  const recentEvents = events
    .filter((event: Events) => event.status !== 0)
    .sort((a: Events, b: Events) => {
      // Convert date strings to Date objects for comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    });

  // Check if there are more events to show
  const hasMoreEvents = recentEvents.length > 4;

  // Infinite loop scroll functionality
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let isScrolling = true;
    const scrollSpeed = 0.5; // pixels per frame
    let animationId: number;

    const autoScroll = () => {
      if (!isScrolling || !scrollContainer) return;

      // Calculate the width of one complete set of events (half of total width)
      const oneSetWidth = scrollContainer.scrollWidth / 2;
      const currentScroll = scrollContainer.scrollLeft;

      // Reset to beginning when reaching the end of first set for seamless loop
      if (currentScroll >= oneSetWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollSpeed;
      }

      animationId = requestAnimationFrame(autoScroll);
    };

    // Start auto scroll after a delay
    const startDelay = setTimeout(() => {
      autoScroll();
    }, 2000);

    // Pause on hover
    const handleMouseEnter = () => {
      isScrolling = false;
      if (animationId) cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      isScrolling = true;
      autoScroll();
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(startDelay);
      if (animationId) cancelAnimationFrame(animationId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [recentEvents]);



  return (
    <section className="events relative z-10">
      {/* Background handled globally in BgTextMainPage */}

      {/* Header with title and logo */}
      <motion.div
        className="flex items-end justify-center mb-4 mx-auto w-full max-w-[706px] h-[120px] sm:h-[160px] md:h-[214px] px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-white text-[28px] sm:text-[32px] md:text-[40px] font-extrabold">Events</h1>
        <Image
          src={bearCcubeSrc}
          alt="CCubed Bear Logo Animated"
          className="mb-[-10px] sm:mb-[-15px] md:mb-[-20px] select-none w-[100px] h-[112px] sm:w-[120px] sm:h-[134px] md:w-[143px] md:h-[160px]"
          width={143}
          height={160}
          priority
          draggable={false}
          style={{ userSelect: "none" }}
        />
      </motion.div>

      <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 px-4 md:px-0">
        {/* Description */}
        <motion.p
          className="text-white font-light w-full text-center text-sm sm:text-base px-2 sm:px-8 md:px-50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
        >
          Join us for a variety of indoor and outdoor events that bring
          computing students together beyond the screen. Whether it&apos;s a
          casual meetup or a collaborative workshop, there&apos;s always a way
          to connect and grow.
        </motion.p>

        {/* Recent Events Section Title */}
        <motion.div
          className="flex justify-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <h2 
            className="text-white text-left font-semibold text-lg sm:text-xl md:text-2xl"
            style={{
                fontFamily: "Roboto, sans-serif",
                letterSpacing: "0.24px", 
              }}
          >
            Recent Events
          </h2>
        </motion.div>

        {/* Events Grid */}
        <div className={`mb-6 ${showEmptyState ? 'flex justify-center items-center h-[451px]' : ''}`}>
          {!showEmptyState && (
            <div className="space-y-2 sm:space-y-3">
              {/* Mobile Horizontal Scroll View */}
              <div className="block sm:hidden" style={{ height: '452px' }}>
                <div 
                  ref={scrollContainerRef}
                  className="overflow-x-auto overflow-y-hidden h-full" 
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  <div className="flex gap-4 h-full items-start" style={{ width: 'max-content' }}>
                    {/* Original events */}
                    {recentEvents.slice(0, 4).map((event) => (
                      <div key={event.id} className="flex-shrink-0">
                        <EventCard
                          id={event.id}
                          title={event.name}
                          time={event.time}
                          date={event.date}
                          location={event.location}
                          type={
                            (() => {
                              if (!event.types || event.types.length === 0) return "Online";
                              
                              const hasHybridType = event.types.some(type => 
                                type.toLowerCase() === "hybrid" || type.toLowerCase().includes("hybrid")
                              );
                              if (event.types.length > 1 || hasHybridType) return "Hybrid";
                              
                              const eventType = event.types[0];
                              if (eventType === "In Person") return "In Person";
                              if (eventType === "Online") return "Online";
                              
                              return "Online";
                            })()
                          }
                          imageSrc={
                            event.files && event.files.length > 0
                              ? event.files[0].url
                              : "https://placehold.co/400"
                          }
                          description={event.description}
                        />
                      </div>
                    ))}
                    
                    {/* Duplicate events for seamless loop */}
                    {recentEvents.slice(0, 4).map((event) => (
                      <div key={`duplicate-${event.id}`} className="flex-shrink-0">
                        <EventCard
                          id={event.id}
                          title={event.name}
                          time={event.time}
                          date={event.date}
                          location={event.location}
                          type={
                            (() => {
                              if (!event.types || event.types.length === 0) return "Online";
                              
                              const hasHybridType = event.types.some(type => 
                                type.toLowerCase() === "hybrid" || type.toLowerCase().includes("hybrid")
                              );
                              if (event.types.length > 1 || hasHybridType) return "Hybrid";
                              
                              const eventType = event.types[0];
                              if (eventType === "In Person") return "In Person";
                              if (eventType === "Online") return "Online";
                              
                              return "Online";
                            })()
                          }
                          imageSrc={
                            event.files && event.files.length > 0
                              ? event.files[0].url
                              : "https://placehold.co/400"
                          }
                          description={event.description}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop/Tablet Grid View */}
              <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-6 justify-items-center">
                {recentEvents
                  .slice(0, 4)
                  .map((event, idx) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.15 }}
                    >
                      <EventCard
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
                    </motion.div>
                  ))}
              </div>


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
              onClick={() => router.push('/events')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              See more
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
} 