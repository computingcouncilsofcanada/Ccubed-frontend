"use client";

import { useState } from "react";
import Image from "next/image";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";
import PreviewModal from "@/components/modals/PreviewModal";
import { Events } from "@/types/events";

import { PastEventsSection } from "./components/PastEventsSection";
import { EventsHeader } from "./components/EventsHeader";
import { CurrentEventsSection } from "./components/CurrentEventsSection";
import React from "react";
import { useEventsData } from "./hooks/useEventsData";
import { useEventsFilter } from "./hooks/useEventsFilter";

export default function EventsPage() {
  // Data fetching with custom hook
  const { currentEvents, pastEvents, error, isLoading } = useEventsData();

  // UI state
  const [eventType, setEventType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<string>("list");
  const [selectedEvent, setSelectedEvent] = useState<Events | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Modal handlers
  const handleShare = () => alert("Share link clicked");
  const handleInvite = () => alert("Invitation link clicked");

  // Filter logic with custom hook
  const { filteredCurrentEvents, showEmptyState, showFilterEmptyState } = 
    useEventsFilter({ currentEvents, eventType, isLoading });

  return (
    <div className="relative w-full overflow-hidden overflow-x-hidden -mt-30 pt-20">
      {/* Add the background component - limited height for events page */}
      <BgBoxMainPage maxHeight={100} />

      <div className="max-w-6xl w-full mx-auto py-10 px-5 relative z-10 mb-32">
        <div className="image relative flex justify-center flex-shrink-0">
          <motion.div className="relative w-[505px] h-[505px]">
            {/* Base Hero Image */}
            <Image
              src="/FigmaFiles/mainPageAssets/hero-img.svg"
              alt="Hero Image"
              width={505}
              height={505}
              className="w-full h-full object-contain select-none"
              priority
              draggable={false}
              style={{ userSelect: "none" }}
            />

            {/* Animated Overlay Image */}
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
                src="/FigmaFiles/mainPageAssets/hero-img-2.svg"
                alt="Hero Image with Texture"
                width={505}
                height={505}
                className="w-full h-full object-contain select-none"
                priority
                draggable={false}
                style={{ userSelect: "none" }}
              />
            </motion.div>
          </motion.div>
        </div>
        
        <div className="flex mb-4 ">
          <h1 className="text-white text-[40px] self-end font-extrabold ">
            Events
          </h1>
          <Image
            src="/FigmaFiles/eventPageAssets/bear-img.svg"
            alt="CCubed Bear Logo Animated"
            className="select-none  -ml-8"
            width={100}
            height={120}
            priority
            draggable={false}
            style={{ userSelect: "none" }}
          />
        </div>
        
        <p className=" mt-5 text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti qui
          officiis inventore, laborum porro debitis quae eius! A, ex ipsa quidem
          quasi error expedita earum beatae! Beatae quo delectus dignissimos
          dolorem fugit alias. Iusto eos non ad, dignissimos molestiae sunt.
        </p>
        
        {error && (
          <p className="mt-4 rounded-md border border-red-300 bg-red-100 p-4 text-center text-red-700">
            {error}
          </p>
        )}
        
        {/* Events Header - Filters and View Toggle */}
        <EventsHeader
          eventType={eventType}
          onEventTypeChange={setEventType}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
                />
        
        {/* Current Events Section */}
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

        {/* Past Events Section - Always show in list format, shows ALL past events */}
        <PastEventsSection
          pastEvents={pastEvents} // Show ALL past events, no filtering
          onSeeDetails={(event) => {
            setSelectedEvent(event);
            setIsModalOpen(true);
          }}
          onInvitationLink={handleInvite}
        />
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
