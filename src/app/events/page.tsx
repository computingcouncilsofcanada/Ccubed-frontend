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
import { useEventsData } from "./hooks/useEventsData";
import { useEventsFilter } from "./hooks/useEventsFilter";
import { CalendarSection } from "./components/CalendarSection";

export default function EventsPage() {
  // Event page hero assets (orbit design)
  const ccubedIconSrc = useSafariImageFallback(
    "/FigmaFiles/eventPageAssets/CCubed_icon.png",
    "/FigmaFiles/eventPageAssets/CCubed_icon.png"
  );

  const bearImgSrc = useSafariImageFallback(
    "/FigmaFiles/eventPageAssets/bear-img.svg",
    "/FigmaFiles/eventPageAssets/bear-img.svg"
  );

  // Orbiting company icons — left/top are percentages (tweak to reposition)
  const orbitIcons: { src: string; alt: string; left: number; top: number }[] =
    [
      // { src: "/FigmaFiles/eventPageAssets/iconsAroundGlobe/Apple Inc..png", alt: "Apple", left: 61, top: 3 },
      // { src: "/FigmaFiles/eventPageAssets/iconsAroundGlobe/Starbucks Corporation.png", alt: "Starbucks", left: 77, top: 18 },
      // { src: "/FigmaFiles/eventPageAssets/iconsAroundGlobe/adobe.png", alt: "Adobe", left: 94, top: 38 },
      // { src: "/FigmaFiles/eventPageAssets/iconsAroundGlobe/International Business Machines Corporation.png", alt: "IBM", left: 94, top: 62 },
      // { src: "/FigmaFiles/eventPageAssets/iconsAroundGlobe/Best Buy Co., Inc..png", alt: "Best Buy", left: 77, top: 82 },
      {
        src: "/FigmaFiles/eventPageAssets/iconsAroundGlobe/Royal_Bank_of_Canada-Logo.wine 1.png",
        alt: "RBC",
        left: 50,
        top: 90,
      },
      {
        src: "/FigmaFiles/eventPageAssets/iconsAroundGlobe/meta.png",
        alt: "Meta",
        left: 93,
        top: 66,
      },
      {
        src: "/FigmaFiles/eventPageAssets/iconsAroundGlobe/amazon.png",
        alt: "Amazon",
        left: 4,
        top: 63,
      },
      {
        src: "/FigmaFiles/eventPageAssets/iconsAroundGlobe/playstation-png-logo-pic-4625 1.png",
        alt: "PlayStation",
        left: 17,
        top: 16,
      },
      {
        src: "/FigmaFiles/eventPageAssets/iconsAroundGlobe/windows.png",
        alt: "Windows",
        left: 61,
        top: 4,
      },
      {
        src: "/FigmaFiles/eventPageAssets/iconsAroundGlobe/cineplex.png",
        alt: "Cineplex",
        left: 21,
        top: 42,
      },
      {
        src: "/FigmaFiles/eventPageAssets/iconsAroundGlobe/tesla.png",
        alt: "Tesla",
        left: 71,
        top: 30,
      },
      {
        src: "/FigmaFiles/eventPageAssets/iconsAroundGlobe/pandg.png",
        alt: "P&G",
        left: 16,
        top: 80,
      },
      {
        src: "/FigmaFiles/eventPageAssets/iconsAroundGlobe/autodesk.png",
        alt: "Autodesk",
        left: 95,
        top: 38,
      },
    ];

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
        <div className="image relative flex justify-center shrink-0 my-6">
          <motion.div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[480px] lg:h-[480px]">
            {/* Orbital lines (faint layer)*/}
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <Image
                src="/FigmaFiles/eventPageAssets/hero-lines-faint.png"
                alt=""
                width={480}
                height={480}
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                priority
                quality={100}
                draggable={false}
                aria-hidden
              />
            </motion.div>
            {/* Orbital lines (bold layer) */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <Image
                src="/FigmaFiles/eventPageAssets/hero-lines-bold.png"
                alt=""
                width={480}
                height={480}
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none rotate-30"
                priority
                quality={100}
                draggable={false}
                aria-hidden
              />
            </motion.div>
            {/* Orbital lines (bold layer) */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <Image
                src="/FigmaFiles/eventPageAssets/hero-lines-bold.png"
                alt=""
                width={480}
                height={480}
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none rotate-150"
                priority
                quality={100}
                draggable={false}
                aria-hidden
              />
            </motion.div>
            {/* Central CCubed icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={ccubedIconSrc}
                alt="CCubed"
                width={140}
                height={140}
                className="w-[22%] h-[22%] min-w-[80px] min-h-[80px] max-w-[140px] max-h-[140px] object-contain select-none"
                priority
                quality={100}
                draggable={false}
                style={{ userSelect: "none" }}
              />
            </div>
            {/* Orbiting company icons */}
            {orbitIcons.map((icon) => (
              <div
                key={icon.alt}
                className="absolute w-[10%] h-[10%] min-w-[24px] min-h-[24px] max-w-[44px] max-h-[44px] flex items-center justify-center rounded-full bg-[#d4d4d4]/10 p-2"
                style={{
                  left: `${icon.left}%`,
                  top: `${icon.top}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={44}
                  height={44}
                  className="w-full h-full object-contain select-none"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
              </div>
            ))}
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
            className="relative shrink-0"
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
          <CalendarSection
            events={[...currentEvents, ...pastEvents]}
            onEventClick={(event) => {
              setSelectedEvent(event);
              setIsModalOpen(true);
            }}
          />
        </motion.div>
      </div>

      <Footer />

      <PreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        onShare={handleShare}
        onInvite={() =>
          handleInvite(
            selectedEvent?.registration_link ?? selectedEvent?.url ?? null
          )
        }
      />
    </div>
  );
}
