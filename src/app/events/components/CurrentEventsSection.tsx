import { Events } from "@/types/events";
import { EventCard } from "@/components/sections/landing/EventCard";
import { EventListCard } from "./EventListCard";
import { EmptyState } from "./EmptyState";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type CurrentEventsSectionProps = {
  viewMode: string;
  filteredCurrentEvents: Events[];
  showEmptyState: boolean;
  showFilterEmptyState: boolean;
  hasMoreEvents: boolean;
  eventType: string;
  onSeeDetails: (event: Events) => void;
  onInvitationLink: () => void;
};

export function CurrentEventsSection({
  viewMode,
  filteredCurrentEvents,
  showEmptyState,
  showFilterEmptyState,
  hasMoreEvents,
  eventType,
  onSeeDetails,
  onInvitationLink,
}: CurrentEventsSectionProps) {
  const [showMore, setShowMore] = useState<boolean>(false);

  if (viewMode === "grid") {
    return (
      <div
        className={`mb-2 ${
          showEmptyState || showFilterEmptyState
            ? "flex justify-center items-center h-[451px]"
            : ""
        }`}
      >
        {/* Empty states */}
        {showEmptyState && <EmptyState type="all" />}
        {showFilterEmptyState && (
          <EmptyState type={eventType as "inperson" | "hybrid" | "online"} />
        )}

        {/* Grid events */}
        {!showEmptyState && !showFilterEmptyState && (
          <div className="space-y-3">
            {/* First Row - Always visible */}
            <div className="grid grid-cols-4 gap-3 mt-10">
              {filteredCurrentEvents.slice(0, 4).map((event: Events) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.name}
                  time={event.time}
                  date={event.date}
                  location={event.location}
                  type={(() => {
                    if (!event.types || event.types.length === 0)
                      return "Online";

                    // Check for hybrid first - either multiple types OR contains "hybrid"
                    const hasHybridType = event.types.some(
                      (type) =>
                        type.toLowerCase() === "hybrid" ||
                        type.toLowerCase().includes("hybrid")
                    );
                    if (event.types.length > 1 || hasHybridType)
                      return "Hybrid";

                    // Otherwise return the single type
                    return event.types[0];
                  })()}
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
              {showMore && hasMoreEvents && (
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
                      ease: [0.25, 0.1, 0.25, 1],
                    },
                  }}
                >
                  {filteredCurrentEvents.slice(4, 8).map((event: Events) => (
                    <EventCard
                      key={event.id}
                      id={event.id}
                      title={event.name}
                      time={event.time}
                      date={event.date}
                      location={event.location}
                      type={(() => {
                        if (!event.types || event.types.length === 0)
                          return "Online";

                        const hasHybridType = event.types.some(
                          (type) =>
                            type.toLowerCase() === "hybrid" ||
                            type.toLowerCase().includes("hybrid")
                        );
                        if (event.types.length > 1 || hasHybridType)
                          return "Hybrid";

                        return event.types[0];
                      })()}
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

        {/* Show More Button */}
        {hasMoreEvents && !showEmptyState && !showFilterEmptyState && (
          <div className="flex justify-center mt-6">
            <motion.button
              className="rounded-lg border border-white border-opacity-10 px-6 py-3 text-white transition-all duration-300 ease-in-out hover:bg-[rgba(19,40,54,0.3)] hover:border-opacity-25"
              style={{
                fontFamily: "Roboto, sans-serif",
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
    );
  }

  // List view
  return (
    <div className="flex flex-col gap-10 mt-10">
      {/* Empty states */}
      {showEmptyState && <EmptyState type="all" height="234px" />}
      {showFilterEmptyState && (
        <EmptyState type={eventType as "inperson" | "hybrid" | "online"} height="234px" />
      )}

      {/* List events */}
      {!showEmptyState && !showFilterEmptyState && filteredCurrentEvents.length > 0 &&
        filteredCurrentEvents.map((event: Events) => (
          <EventListCard
            key={event.id}
            event={event}
            onSeeDetails={onSeeDetails}
            onInvitationLink={onInvitationLink}
            showInvitationButton={true}
          />
        ))}
    </div>
  );
} 