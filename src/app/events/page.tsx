"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";
import PreviewModal from "@/components/modals/PreviewModal";
import { Events } from "@/types/events";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";

import { PastEventsSection } from "./components/PastEventsSection";
import { EventsHeader } from "./components/EventsHeader";
import { CurrentEventsSection } from "./components/CurrentEventsSection";
import React from "react";
import { useEventsData } from "./hooks/useEventsData";
import { useEventsFilter } from "./hooks/useEventsFilter";
import { CalendarSection } from "./components/CalendarSection";

export default function EventsPage() {
  // Safari fallback for images
  const heroImgSrc = useSafariImageFallback(
    "/FigmaFiles/mainPageAssets/hero-img.svg",
    "/FigmaFiles/mainPageAssets/hero-img.png"
  );

  const heroImg2Src = useSafariImageFallback(
    "/FigmaFiles/mainPageAssets/hero-img-2.svg",
    "/FigmaFiles/mainPageAssets/hero-img-2.png"
  );

  const bearImgSrc = useSafariImageFallback(
    "/FigmaFiles/mainPageAssets/bear_form.svg",
    "/FigmaFiles/mainPageAssets/bear_form.png"
  );

  // Window width state for responsive design
  const [windowWidth, setWindowWidth] = useState(0);

  // Hydration state
  const [isHydrated, setIsHydrated] = useState(false);

  // Data fetching with custom hook
  const { currentEvents, pastEvents, error, isLoading } = useEventsData();

  // UI state
  const [eventType, setEventType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<string>("list");
  const [selectedEvent, setSelectedEvent] = useState<Events | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle hydration and window width
  useEffect(() => {
    setIsHydrated(true);

    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Modal handlers
  const handleShare = () => alert("Share link clicked");
  const handleInvite = () => alert("Invitation link clicked");

  // Filter logic with custom hook
  const { filteredCurrentEvents, showEmptyState, showFilterEmptyState } =
    useEventsFilter({ currentEvents, eventType, isLoading });

  return (
    <div className="relative w-full overflow-hidden overflow-x-hidden -mt-30 pt-20">
      {/* Add the background component - limited height for events page */}
      {isHydrated && <BgBoxMainPage maxHeight={400} />}

      <div className="max-w-6xl w-full mx-auto py-10 px-5 relative z-10 mb-32">
        <div className="image relative flex justify-center flex-shrink-0">
          <motion.div className="relative w-[200px] h-[200px] md:w-[220px] md:h-[220px] lg:w-[405px] lg:h-[405px]">
            {/* Base Hero Image */}
            <Image
              src={heroImgSrc}
              alt="Hero Image"
              width={505}
              height={505}
              className="w-full h-full object-contain select-none"
              priority
              quality={100}
              draggable={false}
              style={{ userSelect: "none" }}
            />

            {/* Animated Overlay Image */}
            {isHydrated && (
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
                  src={heroImg2Src}
                  alt="Hero Image with Texture"
                  width={505}
                  height={505}
                  className="w-full h-full object-contain select-none"
                  priority
                  quality={100}
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Header with title and logo */}
        <motion.div
          className="flex gap-2 sm:gap-3 items-end justify-start mb-4 relative z-10 max-w-full"
          style={{
            maxWidth: "806px",
            height:
              windowWidth < 640
                ? "50px"
                : windowWidth < 1024
                ? "100px"
                : "120px",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
            Events
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
              src={bearImgSrc}
              alt="Bear Form Logo"
              width={143}
              height={210}
              priority
              className="select-none"
              draggable={false}
              style={{ userSelect: "none" }}
            />
          </motion.div>
        </motion.div>

        <motion.p
          className=" mt-5 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti qui
          officiis inventore, laborum porro debitis quae eius! A, ex ipsa quidem
          quasi error expedita earum beatae! Beatae quo delectus dignissimos
          dolorem fugit alias. Iusto eos non ad, dignissimos molestiae sunt.
        </motion.p>

        {error && (
          <p className="mt-4 rounded-md border border-red-300 bg-red-100 p-4 text-center text-red-700">
            {error}
          </p>
        )}

        {/* Events Header - Filters and View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <EventsHeader
            eventType={eventType}
            onEventTypeChange={setEventType}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </motion.div>

        {/* Current Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        >
          <CurrentEventsSection
            viewMode={viewMode}
            filteredCurrentEvents={filteredCurrentEvents}
            showEmptyState={showEmptyState}
            showFilterEmptyState={showFilterEmptyState}
            eventType={eventType}
            onSeeDetails={(event) => {
              setSelectedEvent(event);
              setIsModalOpen(true);
            }}
            onInvitationLink={handleInvite}
          />
        </motion.div>

        {/* Past Events Section - Always show in list format, shows ALL past events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <PastEventsSection
            pastEvents={pastEvents} // Show ALL past events, no filtering
            onSeeDetails={(event) => {
              setSelectedEvent(event);
              setIsModalOpen(true);
            }}
            onInvitationLink={handleInvite}
          />
        </motion.div>

        {/* Calendar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
        >
          <CalendarSection events={[...currentEvents, ...pastEvents]} />
        </motion.div>
      </div>

      {/* Add the shared footer */}
      <Footer />

      {/* Event Details Modal */}
      <PreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        onShare={handleShare}
        onInvite={handleInvite}
      />
    </div>
  );
}
