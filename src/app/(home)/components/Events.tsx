"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconCalendar } from "@tabler/icons-react";
import type { Events } from "@/types/events";
import { useRouter } from "next/navigation";
import { EventCard } from "@/components/shared/EventCard";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";
import PreviewModal from "@/components/modals/PreviewModal";

import {  IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
// Main Events Section Component
type EventsSectionProps = {
  events: Events[];
};

export default function Events({ events }: EventsSectionProps) {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Events | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);



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
    .filter((event: Events) => {
      // Filter out past recurring events (same logic as separateEventsByTime)
      const dateStr = (event.date || "").trim().toUpperCase();
      // const timeStr = (event.time || "").trim().toUpperCase();

      // If it's a recurring event, check if it's past
      if (dateStr.includes("EVERY")) {
        const endTimestamp = parseInt(event.time);
        if (!isNaN(endTimestamp)) {
          const endDate = new Date(endTimestamp);
          const now = new Date();
          // If the recurring event has ended, exclude it from recent events
          if (endDate < now) {
            return false;
          }
        }
      }

      return true;
    })
    .sort((a: Events, b: Events) => {
      // Convert date strings to Date objects for comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    });

  // Check if there are more events to show
  const hasMoreEvents = recentEvents.length > 4;

  
  const handleInvite = () => alert("Registration link clicked");


  //functionality for the arrows on events for small screens

    const handlePrevious = () => {
  const maxIndex = Math.max(0, recentEvents.length - 1);
  setCurrentIndex(prev => prev > 0 ? prev - 1 : maxIndex);
};

const handleNext = () => {
  const maxIndex = Math.max(0, recentEvents.length - 1);
  setCurrentIndex(prev => prev < maxIndex ? prev + 1 : 0);
};


useEffect(() => {
  const scrollContainer = scrollContainerRef.current;
  if (!scrollContainer || recentEvents.length === 0) return;

  // Calculate card width + gap (assuming 280px card + 16px gap)
  const cardWidth = 296; // EventCard width + gap
  const scrollPosition = currentIndex * cardWidth;
  
  scrollContainer.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
  });
}, [currentIndex, recentEvents.length]);




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
        <h1 className="text-white text-[28px] sm:text-[32px] md:text-[40px] font-extrabold">
          Events
        </h1>
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
          className="flex justify-between items-center"
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

          {recentEvents.length > 1 && (
          <div className="flex sm:hidden gap-2">
            <button
              onClick={handlePrevious}
              className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
              aria-label="Previous event"
            >
              <IconChevronLeft size={16} color="white" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
              aria-label="Next event"
            >
              <IconChevronRight size={16} color="white" />
            </button>
          </div>
        )}
        </motion.div>

        {/* Events Grid */}
        <div
          className={`mb-6 ${
            showEmptyState ? "flex justify-center items-center h-[451px]" : ""
          }`}
        >
          {!showEmptyState && (
            <div className="space-y-2 sm:space-y-3">
              {/* Mobile Horizontal Scroll View */}
              <div className="block sm:hidden" style={{ height: "452px" }}>
                <div
                  ref={scrollContainerRef}
                  className="overflow-x-auto overflow-y-hidden h-full"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  <div
                    className="flex gap-4 h-full items-start"
                    style={{ width: "max-content" }}
                  >
                    {/* Original events */}
                   

                    {/* Duplicate events for seamless loop */}
                    {recentEvents.slice(0, 4).map((event) => (
                      <div
                        key={`duplicate-${event.id}`}
                        className="flex-shrink-0"
                      >
                        <EventCard
                          id={event.id}
                          title={event.name}
                          time={event.time}
                          date={event.date}
                          location={event.location}
                          type={(() => {
                            if (!event.types || event.types.length === 0)
                              return "Online";

                            // Return the first type or default to Online, ensuring it's the correct type
                            const eventType = event.types[0];
                            if (eventType === "In Person") return "In Person";
                            return "Online";
                          })()}
                          imageSrc={
                            event.files && event.files.length > 0
                              ? event.files[0].url
                              : "https://placehold.co/400"
                          }
                          description={event.description}
                          onseeDetails={(event) => {
                            setSelectedEvent(event);
                            setIsModalOpen(true);
                          }}
                          onInvitationLink={handleInvite}
                          originalEvent={event}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop/Tablet Grid View */}
              <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-6 justify-items-center">
                {recentEvents.slice(0, 4).map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: idx * 0.15,
                    }}
                  >
                    <EventCard
                      id={event.id}
                      title={event.name}
                      time={event.time}
                      date={event.date}
                      location={event.location}
                      type={(() => {
                        if (!event.types || event.types.length === 0)
                          return "Online";

                        // Return the first type or default to Online, ensuring it's the correct type
                        const eventType = event.types[0];
                        if (eventType === "In Person") return "In Person";
                        return "Online";
                      })()}
                      imageSrc={
                        event.files && event.files.length > 0
                          ? event.files[0].url
                          : "https://placehold.co/400"
                      }
                      description={event.description}
                      onseeDetails={(event) => {
                        setSelectedEvent(event);
                        setIsModalOpen(true);
                      }}
                      onInvitationLink={handleInvite}
                      originalEvent={event}
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
                    background:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 50%, transparent 80%)",
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
              onClick={() => router.push("/events")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              See more
            </motion.button>
          </div>
        )}
      </div>
      <PreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        onInvite={handleInvite}
      />
    </section>
  );
}
