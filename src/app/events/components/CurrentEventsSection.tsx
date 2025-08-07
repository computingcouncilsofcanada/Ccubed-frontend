import { Events } from "@/types/events";
import { EventCard } from "@/components/shared/EventCard";
import { EventListCard } from "./EventListCard";
import { EmptyState } from "./EmptyState";
import { useEffect, useRef, useState } from "react";

type CurrentEventsSectionProps = {
  viewMode: string;
  filteredCurrentEvents: Events[];
  showEmptyState: boolean;
  showFilterEmptyState: boolean;
  eventType: string;
  onSeeDetails: (event: Events) => void;
  onInvitationLink: () => void;
};

export function CurrentEventsSection({
  viewMode,
  filteredCurrentEvents,
  showEmptyState,
  showFilterEmptyState,
  eventType,
  onSeeDetails,
  onInvitationLink,
}: CurrentEventsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  // Monitor window width for responsive behavior with debounce to prevent jittery layout switches
  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    
    // Debounce resize events to prevent excessive layout changes
    let timeoutId: NodeJS.Timeout;
    const debouncedUpdateWidth = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateWidth, 150);
    };
    
    window.addEventListener("resize", debouncedUpdateWidth);
    return () => {
      window.removeEventListener("resize", debouncedUpdateWidth);
      clearTimeout(timeoutId);
    };
  }, []);

  // Determine if we should show horizontal scroll (on small screens with single column)
  // Use hysteresis to prevent jittery switching at the 640px boundary
  const [isHorizontalMode, setIsHorizontalMode] = useState(false);
  
  useEffect(() => {
    if (windowWidth < 620) {
      setIsHorizontalMode(true);
    } else if (windowWidth > 660) {
      setIsHorizontalMode(false);
    }
    // Between 620-660px, maintain current state to prevent jittering
  }, [windowWidth]);
  
  const shouldShowHorizontalScroll = viewMode === "grid" && 
    !showEmptyState && 
    !showFilterEmptyState && 
    isHorizontalMode && 
    filteredCurrentEvents.length > 0;

  // Infinite loop scroll functionality (only for horizontal scroll view)
  useEffect(() => {
    if (!shouldShowHorizontalScroll) return;
    
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
  }, [filteredCurrentEvents, shouldShowHorizontalScroll, windowWidth]);

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

        {/* Grid events - Show all events */}
        {!showEmptyState && !showFilterEmptyState && (
          <>
            {/* Horizontal scroll view for small screens (< 640px) */}
            {shouldShowHorizontalScroll && (
              <div className="mt-10" style={{ height: '452px' }}>
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
                    {filteredCurrentEvents.map((event: Events) => (
                      <div key={event.id} className="flex-shrink-0">
                        <EventCard
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
                            return event.types[0] as "Hybrid" | "Online" | "In Person";
                          })()}
                          imageSrc={
                            event.files && event.files.length > 0
                              ? event.files[0].url
                              : "https://placehold.co/400"
                          }
                          description={event.description}
                        />
                      </div>
                    ))}
                    
                    {/* Duplicate events for seamless loop if we have events */}
                    {filteredCurrentEvents.length > 0 && filteredCurrentEvents.map((event: Events) => (
                      <div key={`duplicate-${event.id}`} className="flex-shrink-0">
                        <EventCard
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
                            return event.types[0] as "Hybrid" | "Online" | "In Person";
                          })()}
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
            )}

            {/* Regular grid view for larger screens (≥ 640px) */}
            {!shouldShowHorizontalScroll && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-10 justify-items-center sm:justify-items-stretch transition-all duration-300 ease-in-out">
                {filteredCurrentEvents.map((event: Events) => (
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
                      return event.types[0] as "Hybrid" | "Online" | "In Person";
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
            )}
          </>
        )}
      </div>
    );
  }

  // List view
  return (
    <div className="flex flex-col gap-4 mt-10">
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