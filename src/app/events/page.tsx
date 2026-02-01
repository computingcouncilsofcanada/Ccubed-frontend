"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";
import PreviewModal from "@/components/modals/PreviewModal";
import { Event as EventType } from "@/types/events";
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

  const [windowWidth, setWindowWidth] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  const { currentEvents, pastEvents, error, isLoading } = useEventsData();

  const [eventType, setEventType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<string>("list");
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleShare = () => alert("Share link clicked");

  const handleInvite = (url: string | null | undefined) => {
  if (!url) {
    console.warn("No registration URL for this event");
    return;
  }

    window.open(url, "_blank");
  };

  const { filteredCurrentEvents, showEmptyState, showFilterEmptyState } =
    useEventsFilter({ currentEvents, eventType, isLoading });

  return (
    <div className="relative w-full overflow-hidden overflow-x-hidden -mt-30 pt-20">
      {isHydrated && <BgBoxMainPage maxHeight={400} />}

      <div className="max-w-6xl w-full mx-auto py-10 px-5 relative z-10 mb-32">
        <div className="image relative flex justify-center flex-shrink-0">
          <motion.div className="relative w-[200px] h-[200px] md:w-[220px] md:h-[220px] lg:w-[405px] lg:h-[405px]">
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
          Discover, connect, and move forward—CCubed brings more events that
          make a difference.
        </motion.p>

        {error && (
          <p className="mt-4 rounded-md border border-red-300 bg-red-100 p-4 text-center text-red-700">
            {error}
          </p>
        )}

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

        {/* Past Events Section - list format */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <PastEventsSection
            pastEvents={pastEvents}
            onSeeDetails={(event) => {
              setSelectedEvent(event);
              setIsModalOpen(true);
            }}
            onInvitationLink={() => {}}
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

      <Footer />

      <PreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        onShare={handleShare}
        onInvite={() => handleInvite(selectedEvent?.registration_link ?? selectedEvent?.url ?? null)}
      />
    </div>
  );
}
